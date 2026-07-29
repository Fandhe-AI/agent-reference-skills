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
    create-issue-tree/       ← Phase-split issue tree creation
    update-issue-tree/       ← Issue tree audit & refresh
    create-plan/             ← Implementation planning
    implement-issue/         ← Issue implementation
    implement-issue-tree/    ← Parallel worktree implementation of an issue tree
    implement-review/        ← Code review
    implement-review-pr/     ← PR review
    update-docs/             ← CLAUDE.md update
    init-claude/             ← Bootstrap .claude/ into a target repo
    update-claude/           ← Audit & extend an existing .claude/ setup
    project-init/            ← GitHub Project v2 setup
    project-add-items/       ← Bulk-create project items
    project-create-issues/   ← Convert draft items into issues
    project-update-items/    ← Bulk-update project item fields
    project-view-status/     ← Project progress report
    project-sync-issues/     ← Issue/PR ↔ project status sync
    project-archive-done/    ← Archive completed project items
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
- `ark-ui` and `chakra-ui` intentionally overlap: Ark UI is the headless/unstyled Zag.js layer, Chakra UI v3 is the styled implementation on top of it. Ark pages carry a `## Notes` line pointing at the Chakra import difference so agents don't mix `@ark-ui/react` and `@chakra-ui/react` APIs
- `fandhe-frontend` is a third member of that family with near-identical component names but **Rust** APIs (`references/primitives/` ≈ Ark UI, `references/themes/` ≈ Chakra UI v3). Every primitives/themes page carries a `## Notes` line stating it is distinct from the JS `@ark-ui/react` / `@chakra-ui/react` API, and its `description` leads with "Rust 製フロントエンドフレームワーク" to avoid keyword collision with the two skills above
- `fandhe-frontend` is also the repository's first **Japanese-source** skill: its official docs are written in Japanese, so its reference bodies are in Japanese (per the "source language of the official docs" rule) rather than English. Its docs pages contain no Rust code examples, so signatures were taken from the crate sources (`crates/headless-ui/src/`, `crates/pre-styled-ui/src/`) rather than the rendered pages
- `fandhe-backend` is the backend counterpart of `fandhe-frontend` — a **Rust** HTTP server framework, and the repository's second Japanese-source skill. Its docs site carries no code examples at all, so every signature was read from the published crate sources on docs.rs (`docs.rs/crate/<name>/0.1.0/source/`) rather than from the rendered pages. Its `description` leads with "Rust 製バックエンド HTTP サーバーフレームワーク" because `Server` / `Router` / `Middleware` / `CORS` / `WebSocket` collide as search keywords with `hono` (JS/TS) and `go-echo` (Go); the `## Notes` distinction line is applied only to the generically-named plugin pages (cors / compression / static / websocket / graphql / tracing), not to every page
- The `android-*` family (12 skills) is split by developer.android.com's own doc IA rather than mirroring `apple-*` one-for-one. Every skill's `description` **leads** with a disambiguator — `Android Jetpack Compose (Kotlin) の` for the three Compose skills, `Android アプリ開発 (Kotlin) の` for the rest, `Wear OS (Kotlin) の` for `android-wear` — because `Button` / `Text` / `Column` / `State` / `Navigation` / `Animation` collide with `apple-swiftui`, `ark-ui`, `chakra-ui`, `fandhe-frontend`, and `react-*`. The `## Notes` distinction line is applied at **category-README level** where the collision is systematic (`android-compose-components/*`, `android-compose-ui/layout`, `android-wear/wear-compose`, `android-platform-core/glance-widgets`) and per-page only for scattered hits
- Three `android-*` skills own same-named-but-different APIs and must not be merged: mobile Compose (`androidx.compose.*`) in `android-compose-ui` / `android-compose-components`, Wear Compose (`androidx.wear.compose.*`) in `android-wear`, and Glance (`androidx.glance.*`, compiles to `RemoteViews`) in `android-platform-core`. Same for `pager.md` (Compose `HorizontalPager` vs Paging 3 `Pager`) and `dialog.md` (Material3 `Dialog` vs `NavGraphBuilder.dialog`)
- `developer.android.com/reference/**` **cannot be fetched** — its left nav is huge and the body is truncated before it is reached (this is not a JS shell; a headless browser does not help). Reference bodies came from guide pages plus androidx sources on `raw.githubusercontent.com`, with directory listings taken via authenticated `gh api` (the unauthenticated Contents API 403s under parallel agents, and WebFetch silently summarizes the JSON away). Platform `android.*` classes have no androidx source; AOSP Gitiles `?format=TEXT` works for small ones. Note `androidx-main` can diverge from released artifacts — Room is `room3-*` / `androidx.room3` there, so Room pages follow the guides instead
- The `windows-*` family (11 skills) covers **Windows app development only** — IT-pro (`/windows/resources/`), Windows Server, IoT, hardware drivers, and Windows 365 are deliberately out of scope. Every skill's `description` **leads** with a disambiguator (`Windows アプリ開発 (WinUI 3 / Windows App SDK) の`, `... (Fluent Design / WinUI 3) の`, `... (DirectX / WinRT メディア) の`, `... (MSIX / Microsoft Store) の`, `... (Windows AI Foundry) の`, `... (Win32 / WPF / WinForms 相互運用) の`) because `Button` / `Grid` / `StackPanel` / `Window` / `Page` / `NavigationView` / `Style` / `Color` / `Motion` collide with `apple-swiftui`, `ark-ui`, `chakra-ui`, `fandhe-frontend`, and `android-compose-*`
- Windows has an **internal fork** of the same control names that must not be merged: `Microsoft.UI.Xaml.Controls.Button` (WinUI 3, in `windows-winui-controls`) vs `System.Windows.Controls.Button` (WPF) vs `System.Windows.Forms.Button` (WinForms) — the latter two are covered by `windows-interop-modernize/references/wpf-winforms-interop/` (`wpf-basic-controls.md`, `winforms-form-control.md`, `wpf-vs-winui3.md`), not by per-control pages. Same pattern as the mobile-Compose / Wear-Compose / Glance split in `android-*`. Unlike `android-*`, the distinction line is applied **per-page** in `## Notes` (category READMEs here are strictly H1 + index table, so there is no README-level place for it) — verified on `button.md`, `grid.md`, `stackpanel.md`, `navigationview.md`, `list-view.md`, `text-box.md`, `app-window.md`
- Unlike `developer.android.com/reference/**`, learn.microsoft.com's **auto-generated API reference pages are fully fetchable** via WebFetch (`/windows/windows-app-sdk/api/winrt/...`, `/windows/win32/api/...`, `/uwp/api/...`) — the body is not truncated by the large left nav, so no GitHub-source fallback is needed. Category listings come from `<path>/toc.json`. The `ja-jp` locale is `ms.translationtype: MT` (machine-translated), so **`en-us` is the source of truth** and `windows-*` reference bodies are in English
- `nvidia-cuda` は CUDA プログラミングスタック（CUDA C++/Python・PTX ISA・Blackwell チューニング・CUTLASS/CuTe）を担当し、`dgx-spark`（GB10 実機仕様・DGX OS・運用 playbook）・`nvidia-sync`（リモート接続アプリ）とは検索キーワードで棲み分ける。`description` は「NVIDIA CUDA」始まりで CUDA / PTX / CUTLASS 主導の語を優先する（`GEMM` / `kernel` は他分野でも汎用的な語のため）。参照本文は英語（docs.nvidia.com が英語のため）
- Cross-skill relative links (`../../../<other-skill>/...`) must never be used — skills are installed individually via `npx skills add`, so such links always break. Reference the other skill by name in plain text instead
- When editing `.claude/` files, use the `_/dotclaude/` staging pattern (write there first, then `mv` to `.claude/`)

## Current Skills (88)

android-architecture, android-background-work, android-build-gradle, android-compose-components, android-compose-graphics-animation, android-compose-ui, android-data, android-media-camera, android-navigation, android-platform-core, android-testing, android-wear, apple-app-services, apple-appkit, apple-data, apple-distribution, apple-graphics, apple-media, apple-ml, apple-spatial, apple-swift, apple-swiftui, apple-uikit, ark-ui, better-auth, biome, blender, bullmq, cadquery, chakra-ui, commitlint, dayjs, dgx-spark, driverjs, editorconfig, ergogen, fandhe-backend, fandhe-frontend, feature-sliced-design, figma, github-docs, go-echo, gws, hermes-agent, hono, inngest, kicad_10, knip, kubb, lefthook, motion, nextjs-app, nuqs, nvidia-cuda, nvidia-sync, pino, playwright, proxmox-ve, react-flow, react-hook-form, react-router-v7, rive, rust, storybook, stripe, supabase, syncpack, theatrejs, threejs, tsdoc, turborepo, typedoc, upstash, vercel, vitest, windows-ai, windows-app-sdk, windows-data-storage, windows-design, windows-graphics-media, windows-interop-modernize, windows-packaging-publish, windows-platform-integration, windows-testing-performance, windows-winui-controls, windows-winui-ui, zmk, zod
