# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

A collection of Claude Code **skills** (reference documentation distilled from official library/framework docs into structured markdown) and **agent definitions** for creating new skills. Skills are installed into projects via the [vercel-labs/skills](https://github.com/vercel-labs/skills) CLI (`npx skills add`).

All skill descriptions and the agent definition are written in **Japanese**, while the reference content itself is in the **source language of the official docs** (typically English).

## Installation

```bash
# List available skills
npx skills add <owner>/<repo> --list

# Add specific skills to a project
npx skills add <owner>/<repo> --skill vitest --skill zod

# Add all skills
npx skills add <owner>/<repo> --all

# Add globally (available across all projects)
npx skills add <owner>/<repo> --skill react-router-v7 -g
```

Default: symlink into `.claude/skills/`. Use `--copy` for file copies.

## Repository Structure

```text
.claude/
  settings.json              ← SessionStart hook reminding the core rules
  agents/                    ← Purpose-specific sub-agents (see "Agents & Delegation")
    research/
      reference-researcher.md     ← Crawl official docs → write references (sonnet)
      reference-updater.md        ← Diff existing skill vs latest docs, update (sonnet)
      skill-coverage-analyzer.md  ← Cross-skill gap analysis, propose additions (opus, read-only)
    author/
      skill-author.md             ← Author SKILL.md (frontmatter, tree, mapping table) (sonnet)
      description-optimizer.md     ← Optimize the `description` for hit-rate & length (sonnet)
      readme-indexer.md           ← Regenerate README index tables (haiku)
      sample-curator.md           ← Curate working samples into samples/ (sonnet)
      script-collector.md         ← Collect runnable commands into scripts/ (sonnet)
    quality/
      skill-structure-validator.md ← Structural integrity check (haiku, read-only)
      reference-linter.md          ← Per-file template & frontmatter lint (haiku, read-only)
      plan-verifier.md            ← Plan completion verification (sonnet, read-only)
  rules/
    delegation.md            ← Main delegates to sub-agents; task→agent map
    skill-anatomy.md         ← Skill layout, SKILL.md structure, content types
    reference-template.md    ← Per-page template & README index format
    description-style.md     ← Hit-rate/length rules, YAML `#` pitfall
    japanese-style.md        ← Japanese writing style
    dotclaude-via-temp.md    ← Write to _/dotclaude/ then mv to .claude/
  skills/                    ← Workflow skills for this repo's own development
    create-skill/            ← /create-skill — orchestrate new-skill creation
    update-skill/            ← /update-skill — refresh a skill against latest docs
    create-commit/           ← Conventional Commits
    create-pr/               ← PR creation
    create-issue/            ← Issue creation (sub-issues)
    create-plan/             ← Implementation planning
    implement-issue/         ← Issue implementation
    implement-review/        ← Code review
    implement-review-pr/     ← PR review
    update-docs/             ← CLAUDE.md update
    contribute-skill/        ← Contribute a local skill to an upstream repo via PR
    sync-skills-lock/        ← Sync skills-lock.json computedHash with upstream
skills/
  <library-name>/
    SKILL.md                 ← Entry point with YAML frontmatter (name, description, user-invocable)
    references/              ← API reference distilled from official docs
      <category>/
        README.md            ← Index table linking to individual pages
        <page>.md            ← Individual API/concept reference
    samples/                 ← (optional) Working examples for Claude's operation reference
      README.md              ← Index table
      <use-case>.md          ← One use-case per file
    scripts/                 ← (optional) Runnable command collections (install/CLI/test/...)
      README.md              ← Index table
      <category>.md          ← Commands grouped by purpose
    rules/                   ← (optional) Enforcement rules (e.g., feature-sliced-design)
```

**Two kinds of skills exist:**

- `skills/` — Library/framework reference skills, distributed via `npx skills add`
- `.claude/skills/` — Workflow skills for this repo's own development (not distributed)

## Agents & Delegation

The main agent stays focused on **dialogue, planning, delegation, and reporting**. Every token-heavy task (doc research, reference authoring, SKILL.md creation, validation, lint, coverage analysis) is delegated to a purpose-specific sub-agent. See `.claude/rules/delegation.md` for the full policy and the task→agent map.

**Model strategy:** `opus` = cross-skill analysis only (cost-gated, e.g. coverage analysis) / `sonnet` = research, authoring, verification / `haiku` = judgment-free mechanical checks & indexing.

| Category | Agent | Model | Role |
|----------|-------|-------|------|
| research | `reference-researcher` | sonnet | Crawl official docs → write `references/` (parallel per scope) |
| research | `reference-updater` | sonnet | Diff a skill against latest docs; `check` or `apply` |
| research | `skill-coverage-analyzer` | opus | Read-only gap analysis; propose new/under-covered skills |
| author | `skill-author` | sonnet | Author/update `SKILL.md` after references exist |
| author | `description-optimizer` | sonnet | Optimize the `description` field only |
| author | `readme-indexer` | haiku | Regenerate a category's README index table |
| author | `sample-curator` | sonnet | Curate working examples into `samples/` |
| author | `script-collector` | sonnet | Collect runnable commands into `scripts/` |
| quality | `skill-structure-validator` | haiku | Read-only structural integrity check |
| quality | `reference-linter` | haiku | Read-only per-file template & frontmatter lint |
| quality | `plan-verifier` | sonnet | Read-only plan-completion verification |

Read-only agents (`skill-coverage-analyzer`, `skill-structure-validator`, `reference-linter`, `plan-verifier`) have no Write/Edit/Bash — they report and hand back.

## Rules

`.claude/rules/` holds enforceable conventions, referenced from CLAUDE.md and each agent's `## 参照ルール`.

| Rule | Scope | Purpose |
|------|-------|---------|
| `delegation.md` | all | Main delegates; do/don't lists; task→agent map; model strategy |
| `skill-anatomy.md` | `skills/**` | Directory layout, SKILL.md structure, content types |
| `reference-template.md` | `skills/**/*.md` | Per-page template & README index format |
| `description-style.md` | authoring agents | Hit-rate/length rules; YAML `#` comment pitfall |
| `japanese-style.md` | all agents | Japanese writing style |
| `dotclaude-via-temp.md` | `.claude/**` | Stage in `_/dotclaude/`, then `mv` into `.claude/` |

## Skill Anatomy

Every distributable skill has a `SKILL.md` with YAML frontmatter:

```yaml
---
name: <library-name>
description: >
  Japanese description with key APIs/concepts listed
user-invocable: false
---
```

The body contains: a directory tree, a lookup procedure ("探索手順"), and a task→category→README mapping table that covers `references/`, `samples/`, and `scripts/`. See `.claude/rules/skill-anatomy.md`.

**Content types** — three complementary kinds of content (full definitions in `.claude/rules/skill-anatomy.md`):

- `references/` — API reference distilled from official docs ("what it is")
- `samples/` — working examples for Claude's operation reference ("how to use it")
- `scripts/` — runnable command collections ("how to run it")

## Adding a New Skill

Run `/create-skill <library> [base_url]` — it orchestrates the whole flow via delegation, so the main agent never crawls docs itself:

1. (optional) `skill-coverage-analyzer` confirms the skill is worth adding and scopes it
2. `create-plan` writes `_/local-plans/<library>-skill.md`
3. `reference-researcher` runs **in parallel per scope** → `references/`; `sample-curator` → `samples/`; `script-collector` → `scripts/`
4. `skill-author` writes `SKILL.md` (`description` refined by `description-optimizer` if needed)
5. `reference-linter` + `skill-structure-validator` validate; findings are handed back to the relevant agent
6. `update-docs` reflects the new skill into CLAUDE.md

`reference-researcher` takes four parameters: `library`, `base_url`, `scope`, `output_dir`, and never creates `SKILL.md` itself. To refresh an existing skill against the latest docs, run `/update-skill <library> [check|apply]` (driven by `reference-updater`).

## Conventions

The authoritative, enforceable versions of these live in `.claude/rules/` (`reference-template.md`, `description-style.md`, `japanese-style.md`); the summary below is for quick orientation.

- **Individual reference files** follow a consistent template: `# Name` → `## Signature / Usage` → `## Options / Props` (table) → `## Notes` → `## Related`
- **README.md** files per category are simple index tables: `| Name | Description | Path |`
- Empty sections are omitted; code examples are kept to one minimal snippet
- Skills with `rules/` directories (like `feature-sliced-design`) separate "what it is" (references) from "how to enforce it" (rules)
- The `tsdoc` skill is a guideline/template skill rather than an API reference — it has no `references/` subdirectory and embeds all content directly in `SKILL.md`
- When editing `.claude/` files, use the `_/dotclaude/` staging pattern (write there first, then `mv` to `.claude/`)

## Current Skills (43)

better-auth, biome, blender, bullmq, cadquery, chakra-ui, commitlint, dayjs, driverjs, editorconfig, ergogen, feature-sliced-design, figma, github-docs, gws, hermes-agent, hono, inngest, kicad_10, knip, kubb, lefthook, motion, nuqs, pino, playwright, react-flow, react-hook-form, react-router-v7, rive, rust, storybook, supabase, syncpack, threejs, tsdoc, turborepo, typedoc, upstash, vercel, vitest, zmk, zod
