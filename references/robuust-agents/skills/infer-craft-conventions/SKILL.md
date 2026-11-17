---
name: infer-craft-conventions
description: Analyze a Craft/Twig project’s actual conventions and propose short, path-scoped local rules without changing code.
---

# Infer Craft conventions

Document reality, never an aspirational standard. Complete the requested analysis before seeking approval to record proposed rules; reuse approval already given for an unchanged candidate.

## 1. Orient

Call `list-rules` through the [`craft_twig_rules` MCP](/Users/joostwaaijer/Documents/workspace/robuust-agents/mcp/craft-twig-rules/README.md). Inspect manifests, relevant tooling configuration, and paths for the requested dimensions; map the whole project only for a repository-wide convention audit. Reading test configuration is evidence gathering, not permission to run tests. Do not read `.ai/rules` directly. Existing returned rules mark their dimension as `already-recorded`.

## 2. Sweep

Inspect only applicable dimensions: Craft/Yii module organization, controllers and response contracts, services, events, queue jobs, Element Queries and eager loading, project config, Twig composition and translation style, Turbo Frames/Streams, Stimulus boundaries, Tailwind/CSS architecture, and tests.

Give every inspected dimension one verdict:

- `pattern`: at least three consistent, deliberate examples and no meaningful rival;
- `conflict`: meaningful competing styles; report both, do not choose;
- `default`: framework or common-practice behavior;
- `no signal`: insufficient or absent evidence;
- `tooling-owned`: active tooling can produce the result;
- `already-recorded`: covered by `.ai/rules`.

Never infer a rule from formatter output, framework defaults, generated code, or a raw count. A pattern must be a choice a competent contributor might otherwise make differently.

## 3. Confirm before record

Present candidates in one batch with the dimension, verdict, evidence (three example paths), proposed glob, title, and exact one- or two-line rule. Present conflicts as context-boundary questions. Obtain approval for each candidate before recording it; one approval can cover the batch.

## 4. Record

For each approved candidate, call `record-rule` once per specific matching glob through the `craft_twig_rules` MCP. Do not edit `.ai/rules` by hand. Keep detection evidence out of the stored rule and rely on duplicate prevention in the MCP.

## Documentation

Documentation is conditional evidence, not a mandatory orientation step. Do not fetch documentation merely because the repository uses Craft or Tailwind.

- For a concrete Craft CMS, Yii, or Craft/Twig API question, call `search-craft-docs` through the `craft_twig_rules` MCP with the project root and a targeted query.
- For a concrete Tailwind CSS v4 syntax or recommendation question, call `search-tailwind-docs` through the MCP. Do not apply v4 guidance when the project's Tailwind major cannot be verified as v4.
- Call both only when the same question genuinely spans both framework surfaces.
- Call neither when repository evidence is sufficient, such as duplication, naming, file ownership, or existing usage.

Documentation determines API validity and framework defaults; only project evidence can establish a local convention. Never embed complete documentation in a rule or skill.

For implementation after the audit, use the relevant [`be-craft`](../../../../skills/be-craft/SKILL.md), [`fe-craft`](../../../../skills/fe-craft/SKILL.md), or [`tailwind-patterns-twig`](../tailwind-patterns-twig/SKILL.md) skill. Proposing conventions alone does not authorize code changes.
