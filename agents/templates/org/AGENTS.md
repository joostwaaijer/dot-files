# Org Agent Rules (Robuust)

## Task Execution

- Answer advice and evaluation requests as advice. Once implementation is requested, complete the authorized work and relevant checks without pausing after the first edit or asking again for decisions already settled in the session.
- Explicit user instructions take precedence over skill guidance. Apply repository rules within their scope; load related skills and references only when they change a decision needed for the task.
- Resolve routine gaps from the request and project evidence. Ask only when a missing answer materially changes correctness, scope, or authorization, and continue independent authorized work while waiting.
- Ground material product/domain/contract choices in exact project sources. If they remain unresolved, ask the user before dependent work and offer a user-chosen, authorized decision issue; use the standalone [project decision procedure](../../references/project-decisions.md) for source reconciliation and issue escalation.
- Prepare a concrete, reviewable result before requesting any still-needed approval for an external action. Commit, push, publish, deploy, merge, send messages, or perform destructive operations only when authorized for that action.
- If an instruction causes a pause or prevents completion, link to the exact file, quote the relevant instruction, and explain why it applies. Distinguish an explicit requirement from your interpretation.
- Incorporate follow-up corrections while preserving the original objective and completed work unless the user cancels or replaces the task.
- When delegation is available and permitted, use subagents for bounded, independent work that saves time or improves review quality. Define ownership and expected evidence, avoid overlapping edits, and reconcile results before finishing.

## Execution Defaults
- Follow the project's documented workflow. When none is specified and a Compose configuration exists, use it for application runtime commands; start containers only when the task needs them.
- In the selected local checkout, reuse the project's existing Docker Compose containers by default; use the [temporary test container lifecycle](#temporary-test-containers) for disposable test infrastructure. Before running application or Compose commands, discover the existing project and services from Docker Compose labels and confirm that their bind mounts point to the selected checkout. Use that actual project name with `docker compose --project-name <name>` and its configuration files where needed; do not create a separate stack merely because this is a new Codex thread.
- For separate worktrees or genuinely conflicting concurrent environments, use an isolated Compose project with one unique, stable name for the thread (for example, `<repo>-<thread>-<random-suffix>`) and pass it to every Compose command. Work within the same thread, including its subagents, may reuse that environment; never reuse, `exec` into, stop, or remove another thread's isolated containers or containers bound to a different checkout.
- A Compose project name does not isolate bind-mounted host files, hard-coded `container_name` values or host ports, or external/explicitly named volumes and networks. Before starting an isolated stack, inspect its resolved Compose configuration for those shared resources; use a thread-specific override where practical, and do not mutate a resource shared with another environment.
- Never stop or remove the user's existing stack as task cleanup. Limit cleanup to isolated resources created for the task.
- For local browser previews, use the project's existing web URL. When OrbStack is in use, resolve the actual `.orb.local` hostname from container metadata and project configuration, and confirm it reaches the matching web service. Do not invent a localhost port, hard-code a hostname from the repository spelling, or create another stack solely for a preview; use localhost only when the project's documented setup or the user requires it.
- Respect the checkout selected for the Codex session. Decide whether to use a separate Git worktree only at session start, before making changes, when another active session is already working in the same local checkout. Otherwise, stay in the selected checkout; do not create a worktree automatically.
- Once the session starts working in its chosen checkout, never autonomously create or switch to another worktree, including during follow-up requests or PR feedback. If conflicting concurrent work appears later, coordinate in the existing checkout or report the conflict without relocating the session.
- Run linters, formatters, and package manager commands on the host unless the project's documented CI workflow runs them in Docker; follow the container reuse and isolation rules above for Docker lint and build commands.
- On entering a Git worktree, including one created by Codex, check for `.env` before beginning implementation or running application commands. If it is missing and the primary worktree has one, copy it into the session worktree. Preserve an existing `.env`; never stage or commit the copied file.
- Assume macOS as the execution environment; prefer macOS-compatible commands and use `python3` (not `python`) when invoking Python.
- For code-to-production workflows, prefer authenticated local CLIs when available, such as GitHub (`gh`), Buildkite (`bk`), Heroku (`heroku`), and AWS (`aws`). Use an available alternative if the needed CLI is missing; do not install tools without a request.

## Tool Selection

- For browser interaction, use the in-app Browser (`iab`) by default. Honor explicit user browser choices; use another browser (such as Edge, Chrome, or Safari) only when the user explicitly requests it for the current task.
- If authentication is needed in Browser, ask the user to log in there and continue in Browser. Do not check another browser for an existing login or switch browsers to bypass login.
- For Sentry projects connected through a Heroku add-on, open the correct Heroku app in the selected browser and click its Sentry add-on under Installed Add-ons or Resources. Continue in the Sentry tab opened by Heroku single sign-on, then navigate to the issue URL. A direct Sentry login page or connector permission error does not establish that access is unavailable: try this route before asking the user to log in. Keep the route in the same browser.
- Prefer `ast-grep` for syntax-aware code searches and structural rewrites in supported languages. Use `rg` for plain-text searches and unsupported formats such as Twig.
- Prefer `fd` for filename searches. `rg --files` remains appropriate when combining file discovery with ripgrep filtering or when `fd` is unavailable.
- Prefer `yq` when querying or modifying YAML.
- Prefer `sd` over `sed` for straightforward text replacement.
- Treat these tools as optional. If a preferred tool is unavailable, use an available fallback and briefly mention the installation option when it would materially improve future work; do not install it unless the user asks.

## 1Password Access

- When using the 1Password CLI (`op`) interactively, start one persistent PTY shell and reuse that same session for every `op` command in the current task. Authenticate once on the first command; do not start a separate command session for each secret lookup.
- Resolve all required secret references in as few commands as practical, preferring a single `op run` or `op inject` invocation when appropriate, and keep the session open until the secret-dependent work is complete.
- Never print resolved secrets, include them in agent output, or persist them in repository files, `.env` files, or temporary files unless the user explicitly requests storage in an intended secret location.
- If 1Password locks or the authorization expires, request reauthorization instead of bypassing it by storing a personal session credential or token in plaintext. For unattended access, propose a dedicated least-privilege service account scoped to the required vault and wait for explicit authorization before configuring it.

## Change Policy
- Keep changes minimal. Only modify what is necessary and avoid unrelated refactoring.
- Fix behavior at the layer that owns it. Avoid speculative guards, silent fallbacks, and duplicate validation for states excluded by the established contract; validate untrusted inputs at their boundary.
- Before adding non-obvious defensive behavior, explain the evidenced failure mode, proposed behavior, and added complexity and agree on the approach with the user. Necessary validation at untrusted boundaries is part of authorized implementation.
- After code changes, run relevant linters, apply only relevant and safe fixes, and review the resulting diff.
- For affected functionality or frontend contracts/structure, use the standalone [preservation comparison](../../references/behavior-preservation.md). Keep intentional changes and verification limits explicit; this does not require a team workflow.
- Prefer lint commands defined in `buildkite.yml`, if available. When running Buildkite commands in Docker, reuse the selected checkout's discovered `web` container, or the thread's isolated `web` container when isolation applies; start a required container in that Compose project only when needed.
- Only run linters relevant to the files that changed (PHP for PHP, JS/TS for JavaScript/TypeScript, CSS for CSS/SCSS).
- If `buildkite.yml` does not contain suitable lint commands, install dependencies as needed (for example `composer install` and/or `yarn install`) and run the project’s standard lint commands.
- If a PHP command fails due to a major version mismatch, use the repository-supported container, runtime, or version manager. Change the system-wide PHP version only when explicitly requested.
- When a changelog update is in scope, follow the existing convention: use `Unreleased` when present, otherwise the targeted release, with releases ordered newest first.

## Dependency Defects

- For evidenced defects in frameworks, plugins, or libraries, fix upstream first and consume the corrected fork while awaiting an official release. Use `upstream-dependency-fixes` for the workflow; preserve the task's authorization and test-execution boundaries.

## Testing and Verification

- Writing, modifying, fixing, deleting or running tests requires an explicit user request covering that work for the active objective. Implementation, refactoring, verification, a failing CI check, publication or a skill recommendation alone grants no test-work authorization. Preserve separate authoring/execution limits; authorization for one does not imply the other. This rule takes precedence over generated guidance and ordinary definitions of done.
- Existing test-work authorization persists across follow-up corrections within the same objective unless the user withdraws it or replaces the objective. Preserve its scope and any explicit deferral; omission of a repeated test request does not revoke authorization. Reuse valid authorization without asking again. If a required next step lacks authority, ask only for that step and continue independent authorized work; a missing permission is not a waiver.
- For test-only work, keep application code intact. Report a necessary production correction and its cause instead of implementing it without actual implementation authorization or changing a test to bless a defect.
- Before writing, modifying, or running tests and before publication, inspect the project's CI configuration, test scripts, and test configuration for the actual coverage requirements: metrics, scope, and thresholds. Passing tests alone are insufficient when CI also requires a coverage threshold.
- When test execution is authorized, measure the relevant coverage and verify it against the required metrics, scope, and thresholds. Use the full suite when the threshold applies to the full suite. Never lower thresholds or add coverage exclusions to hide a shortfall.
- Continue relevant linting, formatting, static analysis, builds, and direct inspection unless the user defers or excludes them. Inspect combined scripts before running them so a lint or build command does not implicitly run tests.
- When test execution is authorized, use the smallest scope that verifies the requested behavior and applicable coverage requirements. Expand or repeat checks only for new changes, failures, or a concrete unresolved concern; stop when the requested behavior and required checks are satisfied.
- Report checks actually performed and their limits, including any unverified coverage requirement as a verification gap. If tests need to be run for confidence but test execution is not authorized, explain the gap without running them. Coverage measurement within authorized test execution does not require separate approval.

## Temporary Test Containers

- Treat containers, volumes, and networks created solely for an authorized test run as disposable. Removing these owned resources after the run is part of that run and needs no separate cleanup approval. Preserve them only when the user explicitly requests it; retain logs, coverage, and other required evidence on the host before teardown.
- Inspect the existing test runner and prefer its cleanup hooks. When temporary infrastructure is needed, use the project's test-only configuration with one unique, stable Compose project name or ownership label for the run. Verify that its storage is isolated from ordinary project databases, existing stacks, other runs, external resources, and shared host data; override fixed resource names where needed. Keep the Docker context, resolved configuration inputs, and exact created resource identities available until cleanup completes.
- Register cleanup before startup in the same shell or process that owns the run: use a shell `trap` or a language `finally` block, or the CI system's unconditional teardown step. Cover success, failed tests, partial startup, and catchable interruption. Cleanup must be idempotent and run after the last consumer when parallel workers share the run's resources. Preserve the test exit status, surface cleanup errors, and fail an otherwise successful run if cleanup fails; a later agent tool call alone is not automatic teardown.
- For a run-owned Compose project, use `docker compose run --rm` for one-off test commands and finish with `docker compose ... down --volumes --remove-orphans` using the same context, project name, configuration files, and configuration environment as startup. Include anonymous database volumes and run-owned named volumes in teardown before their container association is lost. Stopping containers or removing only the test runner leaves dependencies and volumes behind. [Docker Compose teardown](https://docs.docker.com/reference/cli/docker/compose/down/)
- For standalone containers, use `docker run --rm`; this removes the container and its anonymous volumes on exit, but not named volumes. Stop detached test services in the finalizer, explicitly remove any remaining owned containers with their anonymous volumes, then remove the run's explicitly created named volumes and networks by their recorded identities. Never infer ownership from an unused state, a name prefix, or a shared image alone. [Docker automatic container removal](https://docs.docker.com/reference/cli/docker/container/run/#clean-up---rm)
- Verify that the run's containers, volumes, and networks are gone, including stopped containers, and report any leftovers with their exact identities. Keep cleanup scoped to the run; never use global container, volume, image, or system pruning as test teardown, and never delete an existing development stack or ordinary project database.
- A forced process kill, host shutdown, or unavailable Docker daemon can prevent teardown. Keep the owned resource identities in the task's existing scratch or run state, retry the scoped cleanup when the task resumes, and report unresolved cleanup instead of claiming it completed. Do not retain a temporary database merely for an agent handoff or review.

## Code Documentation
- Add a docblock to every non-test PHP and JavaScript class, and to every PHP and JavaScript method, function, and constant.
- Document every parameter and non-void return value with its type in PHPDoc or JSDoc, even when the type is also declared in code.
- Omit PHPDoc `@return void` and JSDoc `@return {void}` / `@returns {void}`; retain the descriptive docblock and parameter documentation.
- For an inherited PHP method or constant, a docblock containing only `@inheritdoc` is sufficient.
- Treat the project's existing PHP CS Fixer configuration and output as authoritative. If it rejects or removes a docblock tag, follow the fixer and do not change its configuration to preserve the tag.

## Communication

- Lead with the outcome and use concise, plain language. Prefer paragraphs; use lists and tables when they make steps or comparisons easier to read.
- Scale plans and final reports to the task. Include what changed, why, relevant verification, and material limitations; avoid mandatory status blocks for trivial edits.
- Keep technical details useful to the reader and messages between agents legible.

## Git Safety
- Before committing or pushing to a branch, check whether that branch already has a closed or merged PR.
- If it does, do not commit or push to that branch. Create a new branch instead. If requested, open a new PR from that branch.
- Never commit or push additional changes to a branch whose PR has already been closed or merged.
- Never use commit squashing (both locally and on GitHub, including when merging PRs).
- Never run git stage/commit/push commands in parallel. Run them strictly in sequence and wait for each command to complete successfully before starting the next one.

## Commits and Pull Requests

- Before creating or updating a pull request, find the repository’s existing pull request template without assuming a specific filename or location, and preserve its structure.
- When supplying a pull request body through a shell command, prevent interpolation of backticks and other shell syntax. Prefer a safely quoted body file or standard input over an inline argument.
- Default to `feature/<short-kebab-description>` for new branches.
- If a repository has an explicit branch naming convention, follow the repository convention.
- Never add Co-Authors for Claude or Codex; use only the logged-in Git user as author
- When writing commit messages or pull request titles and descriptions, read and follow the relevant `commit-instructions.md` or `pr-instructions.md` in your agent home's `git-instructions/` directory (`$AGENT_HOME`, otherwise `$CODEX_HOME`, otherwise `~/.codex`). These shared formatting rules are also synchronized into the Codex app's Git settings.

## Updating `CHANGELOG.md` entries

- Keep changelog entries concise and user-facing. Group related changes into one short bullet; omit implementation details and field-by-field summaries.
