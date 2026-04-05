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
  agents/
    reference-researcher.md  ← Skill reference creation agent
    plan-verifier.md         ← Plan verification agent (read-only)
  rules/
    dotclaude-via-temp.md    ← Rule: write to _/dotclaude/ then mv to .claude/
  skills/                    ← Workflow skills for this repo's own development
    create-commit/           ← Conventional Commits
    create-pr/               ← PR creation
    create-issue/            ← Issue creation (sub-issues)
    create-plan/             ← Implementation planning
    implement-issue/         ← Issue implementation
    implement-review/        ← Code review
    implement-review-pr/     ← PR review
    update-docs/             ← CLAUDE.md update
skills/
  <library-name>/
    SKILL.md                 ← Entry point with YAML frontmatter (name, description, user-invocable)
    references/              ← Categorized markdown files distilled from official docs
      <category>/
        README.md            ← Index table linking to individual pages
        <page>.md            ← Individual API/concept reference
    rules/                   ← (optional) Enforcement rules (e.g., feature-sliced-design)
```

**Two kinds of skills exist:**

- `skills/` — Library/framework reference skills, distributed via `npx skills add`
- `.claude/skills/` — Workflow skills for this repo's own development (not distributed)

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

The body contains: a directory tree, a lookup procedure ("探索手順"), and a task→category→README mapping table.

## Adding a New Skill

Use the `reference-researcher` agent (`.claude/agents/reference-researcher.md`). It takes four parameters: `library`, `base_url`, `scope`, `output_dir`. Multiple instances run in parallel for different scopes. The agent:

1. Fetches the official docs site navigation
2. Crawls each page and extracts API signatures, options, code examples, and notes
3. Writes one markdown file per page plus a `README.md` index per category
4. Does **not** create `SKILL.md` — that is created manually after all scopes are complete

## Conventions

- **Individual reference files** follow a consistent template: `# Name` → `## Signature / Usage` → `## Options / Props` (table) → `## Notes` → `## Related`
- **README.md** files per category are simple index tables: `| Name | Description | Path |`
- Empty sections are omitted; code examples are kept to one minimal snippet
- Skills with `rules/` directories (like `feature-sliced-design`) separate "what it is" (references) from "how to enforce it" (rules)
- The `tsdoc` skill is a guideline/template skill rather than an API reference — it has no `references/` subdirectory and embeds all content directly in `SKILL.md`
- When editing `.claude/` files, use the `_/dotclaude/` staging pattern (write there first, then `mv` to `.claude/`)

## Current Skills (28)

better-auth, biome, bullmq, chakra-ui, commitlint, dayjs, driverjs, editorconfig, feature-sliced-design, github-docs, hono, knip, kubb, lefthook, nuqs, pino, playwright, react-flow, react-hook-form, react-router-v7, storybook, supabase, syncpack, tsdoc, turborepo, typedoc, vitest, zod
