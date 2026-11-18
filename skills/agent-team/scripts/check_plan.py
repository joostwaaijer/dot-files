#!/usr/bin/env python3
"""Statically validate a declared agent-team plan without executing its actions."""

import argparse
import json
import re
from pathlib import Path, PurePosixPath


class InvalidPlan(ValueError):
    """A plan violates the documented declarative contract."""


ACTIONS = {
    "read", "edit", "write_tests", "run_tests", "commit", "push", "publish_pr",
    "merge", "deploy", "message_chat", "external_message",
}
KINDS = {"decide", "analyze", "implement", "write", "review"}
WRITERS = {"implement", "write"}
READ_ONLY_ACTIONS = {"read", "run_tests", "message_chat"}
QUALIFIER = {
    "write_tests": "test_family", "run_tests": "test_family", "push": "destination",
    "publish_pr": "destination", "merge": "destination", "deploy": "destination",
    "message_chat": "destination", "external_message": "destination",
}


def require(condition, message):
    if not condition:
        raise InvalidPlan(message)


def label(value, field):
    require(isinstance(value, str) and bool(value.strip()), f"{field}: expected non-empty text")
    require(value == value.strip(), f"{field}: leading or trailing whitespace is not allowed")
    return value


def string_list(value, field, nonempty=False):
    require(isinstance(value, list), f"{field}: expected an array")
    result = [label(item, field) for item in value]
    require(len(set(result)) == len(result), f"{field}: duplicate entries")
    require(not nonempty or bool(result), f"{field}: must not be empty")
    return result


def integer(value, field, minimum):
    require(type(value) is int and value >= minimum, f"{field}: expected integer >= {minimum}")
    return value


def action_scope(action, fields, where):
    require(isinstance(action, str) and action in ACTIONS, f"{where}: unknown action")
    qualifier = QUALIFIER.get(action)
    if qualifier:
        require(set(fields) == {qualifier}, f"{where}: scope {action} with exactly {qualifier} (see contracts.md)")
        return label(fields[qualifier], f"{where}.{qualifier}")
    require(not fields, f"{where}: unexpected qualifier for {action}")
    return None


def requested_actions(package):
    where = f"{package['id']}.actions"
    require(isinstance(package.get("actions"), list), f"{where}: expected an array")
    result = set()
    for item in package["actions"]:
        if isinstance(item, dict):
            action = item.get("action")
            fields = {key: value for key, value in item.items() if key != "action"}
        else:
            action, fields = item, {}
        scope = action_scope(action, fields, where)
        require((action, scope) not in result, f"{where}: duplicate {action} request")
        result.add((action, scope))
    return result


def check_authorization(authority, packages, requested):
    require(isinstance(authority, dict), "authorization: expected an object")
    grants = set()
    for action, entries in authority.items():
        require(action in ACTIONS, f"authorization: unknown action {action}")
        where = f"authorization.{action}"
        if isinstance(entries, str):
            label(entries, where)
            if action == "read":
                grants.update(key for key in requested if key[2] == action)
            else:
                require(all(key[2] != action for key in requested),
                        f"{where}: replace legacy plan-wide text with package/repository grants before delegation")
            continue
        require(isinstance(entries, list), f"{where}: expected an array of grants")
        for entry in entries:
            require(isinstance(entry, dict), f"{where}: expected a grant object")
            pid = label(entry.get("package"), f"{where}.package")
            repo = label(entry.get("repository"), f"{where}.repository")
            label(entry.get("reference"), f"{where}.reference")
            require(pid in packages, f"{where}: unknown package {pid}")
            target_read = action == "read" and (pid, repo, "read", None) in requested
            require(packages[pid]["repository"] == repo or target_read,
                    f"{where}: {repo} is outside {pid}'s declared scope for {action}")
            fields = {k: v for k, v in entry.items() if k not in {"package", "repository", "reference"}}
            grants.add((pid, repo, action, action_scope(action, fields, where)))
    missing = requested - grants
    if missing:
        pid, repo, action, scope = min(missing)
        detail = f" ({scope})" if scope else ""
        raise InvalidPlan(f"{pid} ({repo}): missing matching authorization for {action}{detail}")


def revision(value, field, allow_abbreviated=False):
    value = label(value, field)
    lengths = range(4, 65) if allow_abbreviated else (40, 64)
    expected = "Git commit ID" if allow_abbreviated else "full Git commit ID"
    require(len(value) in lengths and re.fullmatch(r"[0-9a-fA-F]+", value), f"{field}: expected a {expected}")


def review_snapshots(package, targets):
    snapshots = package.get("review_snapshots", {})
    where = f"{package['id']}.review_snapshots"
    require(isinstance(snapshots, dict) and set(snapshots) <= set(targets),
            f"{where}: expected a map keyed by review target")
    for target, snapshot in snapshots.items():
        field = f"{where}.{target}"
        require(isinstance(snapshot, dict), f"{field}: expected an object")
        if set(snapshot) == {"revision"}:
            revision(snapshot["revision"], f"{field}.revision")
        else:
            require(set(snapshot) == {"base", "artifact", "sha256"},
                    f"{field}: provide revision, or base, artifact and sha256")
            revision(snapshot["base"], f"{field}.base")
            label(snapshot["artifact"], f"{field}.artifact")
            require(re.fullmatch(r"[0-9a-fA-F]{64}", label(snapshot["sha256"], f"{field}.sha256")),
                    f"{field}.sha256: expected a SHA-256 digest")


def write_path(value):
    label(value, "writes")
    require(not any(char in value for char in "\\*?[]:\x00"), "writes: unsupported path syntax")
    path = PurePosixPath(value)
    require(not path.is_absolute() and ".." not in path.parts, "writes: paths must remain repository-relative")
    normalized = str(path).casefold()
    return normalized, value.endswith("/") or normalized == "."


def overlap(left, right):
    a, a_directory = left
    b, b_directory = right
    return (
        a == b or a == "." or b == "."
        or (a_directory and b.startswith(a + "/"))
        or (b_directory and a.startswith(b + "/"))
    )


def validate(plan):
    require(isinstance(plan, dict), "plan: expected an object")
    require(plan.get("schema") == "agent-team-plan/1", "schema: unsupported plan format")
    label(plan.get("objective"), "objective")
    limits = plan.get("limits")
    require(isinstance(limits, dict), "limits: expected an object")
    cap = integer(limits.get("max_parallel"), "max_parallel", 1)
    integer(limits.get("max_retries"), "max_retries", 0)
    integer(limits.get("max_rework_cycles"), "max_rework_cycles", 0)
    require(type(limits.get("delegation_depth")) is int and limits["delegation_depth"] == 1,
            "delegation_depth: must be 1")
    independent = plan.get("independent_review", True)
    require(type(independent) is bool, "independent_review: expected a boolean")

    repositories = plan.get("repositories")
    require(isinstance(repositories, list) and bool(repositories), "repositories: expected a non-empty array")
    repository_by_id = {}
    for repository in repositories:
        require(isinstance(repository, dict), "repository: expected an object")
        repository_id = label(repository.get("id"), "repository.id")
        require(repository_id not in repository_by_id, "repository.id: duplicate ID")
        label(repository.get("root"), "repository.root")
        repository_by_id[repository_id] = repository

    existing = set(string_list(plan.get("contracts_existing", []), "contracts_existing"))
    raw_packages = plan.get("packages")
    require(isinstance(raw_packages, list) and bool(raw_packages), "packages: expected a non-empty array")
    packages = {}
    criterion_owners = set()
    producers = {}
    normalized_writes = {}
    requested = set()
    for package in raw_packages:
        require(isinstance(package, dict), "package: expected an object")
        package_id = label(package.get("id"), "package.id")
        require(package_id not in packages, "package.id: duplicate ID")
        label(package.get("owner"), "package.owner")
        kind = package.get("kind")
        require(isinstance(kind, str) and kind in KINDS, f"{package_id}: unknown kind")
        repo = label(package.get("repository"), f"{package_id}.repository")
        require(repo in repository_by_id, f"{package_id}: unknown repository")
        require(package.get("may_delegate", False) is False, f"{package_id}: nested delegation is not allowed")
        for field in ("writes", "depends_on", "produces", "consumes", "criteria", "skills"):
            string_list(package.get(field), f"{package_id}.{field}", field in {"criteria", "skills"})
        reviews = string_list(package.get("reviews", []), f"{package_id}.reviews")
        require(not reviews or kind == "review", f"{package_id}: only review packages declare reviews")
        require(kind != "review" or bool(reviews), f"{package_id}: review packages must identify their targets")
        review_snapshots(package, reviews)
        scopes = requested_actions(package)
        requested.update((package_id, repo, action, scope) for action, scope in scopes)
        actions = {action for action, scope in scopes}
        require(kind != "review" or "read" in actions, f"{package_id}: reviewing targets requires read authority")
        require("write_tests" not in actions or "edit" in actions, f"{package_id}: test edits also require edit authority")
        writes = package["writes"]
        require(not writes or kind in WRITERS, f"{package_id}: read-only package declares writes")
        require(kind not in WRITERS or bool(writes), f"{package_id}: writing package has no write set")
        require(not writes or "edit" in actions, f"{package_id}: write set lacks edit authority")
        if kind in WRITERS:
            checkout = repository_by_id[repo]
            label(checkout.get("branch") or checkout.get("worktree"), f"{repo}.branch or worktree")
            revision(checkout.get("base"), f"{repo}.base", allow_abbreviated=True)
            label(checkout.get("local_changes"), f"{repo}.local_changes")
        else:
            incompatible = actions - READ_ONLY_ACTIONS
            require(not incompatible, f"{package_id}: incompatible read-only actions {sorted(incompatible)}")
        normalized_writes[package_id] = [write_path(path) for path in writes]
        for criterion in package["criteria"]:
            require(criterion not in criterion_owners, "criteria: duplicate criterion ownership")
            criterion_owners.add(criterion)
        for contract in package["produces"]:
            require(contract not in producers and contract not in existing, "contracts: duplicate producer or existing contract")
            producers[contract] = package_id
        packages[package_id] = package

    for package_id, package in packages.items():
        for dependency in package["depends_on"]:
            require(dependency in packages, f"{package_id}: unknown dependency")
            require(dependency != package_id, f"{package_id}: self-dependency")

    ancestors = {}
    visiting = set()

    def dependencies(package_id):
        if package_id in ancestors:
            return ancestors[package_id]
        require(package_id not in visiting, "depends_on: dependency cycle")
        visiting.add(package_id)
        result = set()
        for dependency in packages[package_id]["depends_on"]:
            result.add(dependency)
            result.update(dependencies(dependency))
        visiting.remove(package_id)
        ancestors[package_id] = result
        return result

    for package_id in packages:
        dependencies(package_id)

    reviewers = {package_id: set() for package_id in packages}
    for package_id, package in packages.items():
        for contract in package["consumes"]:
            require(contract in existing or contract in producers, f"{package_id}: unknown consumed contract")
            if contract in producers:
                require(producers[contract] in ancestors[package_id], f"{package_id}: consumer must wait for contract producer")
        for target in package.get("reviews", []):
            require(target in packages, f"{package_id}: unknown review target")
            require(target in ancestors[package_id], f"{package_id}: reviewer must wait for its target")
            require(package["owner"].casefold() != packages[target]["owner"].casefold(),
                    f"{package_id}: self-review is not independent")
            reviewers[target].add(package_id)
            requested.add((package_id, packages[target]["repository"], "read", None))
            if target in package.get("review_snapshots", {}):
                continue
            for writer, paths in normalized_writes.items():
                if writer == target or packages[writer]["repository"] != packages[target]["repository"]:
                    continue
                if writer in ancestors[target] or package_id in ancestors[writer]:
                    continue
                require(not any(overlap(a, b) for a in paths for b in normalized_writes[target]),
                        f"{package_id}: freeze {target} or order {writer} before {target} or after its live review")

    check_authorization(plan.get("authorization"), packages, requested)

    ids = list(packages)
    for index, left in enumerate(ids):
        if independent and packages[left]["kind"] in WRITERS:
            require(bool(reviewers[left]), f"{left}: missing independent review package")
        for right in ids[index + 1:]:
            if packages[left]["repository"] != packages[right]["repository"]:
                continue
            if left in ancestors[right] or right in ancestors[left]:
                continue
            require(not any(overlap(a, b) for a in normalized_writes[left] for b in normalized_writes[right]),
                    f"{left}, {right}: unordered write sets overlap")

    remaining = set(ids)
    done = set()
    waves = []
    while remaining:
        wave = []
        owners = set()
        for package_id in ids:
            if package_id not in remaining or not set(packages[package_id]["depends_on"]) <= done:
                continue
            owner = packages[package_id]["owner"].casefold()
            if owner not in owners and len(wave) < cap:
                wave.append(package_id)
                owners.add(owner)
        require(bool(wave), "schedule: no runnable package")
        waves.append(wave)
        remaining.difference_update(wave)
        done.update(wave)

    return {"status": "VALID_PLAN", "waves": waves, "package_count": len(packages),
            "scope": "declarative structure only; no actions, artifacts, permissions, or delivery states verified"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    args = parser.parse_args()
    try:
        with args.plan.open(encoding="utf-8") as source:
            plan = json.load(source)
        report = validate(plan)
    except (OSError, ValueError, TypeError, RecursionError) as error:
        print(json.dumps({"status": "INVALID_PLAN", "reason": str(error)}, ensure_ascii=False))
        return 1
    print(json.dumps(report, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
