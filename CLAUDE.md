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
npx skills add <owner>/<repo> --skill react-router -g
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
    delegation-impl.md       ← Create/edit-phase delegation map (adjusted to this repo's agents)
    agent-authoring.md       ← Agent file authoring conventions
    conventional-commits.md  ← Conventional Commits detailed conventions
    security.md              ← OWASP Top 10 / secret-detection checklist
    verification.md          ← Completion gate (evidence-based completion claims)
    debugging.md             ← Root-cause debugging conventions
    code-comment-style.md    ← Code comment / doc-comment conventions
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
| `delegation-impl.md` | create/edit work | Delegation map for the create/edit phase, adjusted to this repo's agents |
| `agent-authoring.md` | `.claude/agents/**` | Agent file format, model criteria, minimal tool permissions |
| `conventional-commits.md` | commit/PR skills | Conventional Commits detailed conventions (`--no-verify` forbidden) |
| `security.md` | commit/PR/review work | OWASP Top 10 checklist, hardcoded-secret detection |
| `verification.md` | side-effecting skills/agents | Completion gate — no completion claims without evidence; 5-step verification |
| `debugging.md` | implementation work | Root-cause-first debugging; escalate after 3 failed fixes |
| `code-comment-style.md` | implementation work / author agents | Code comment & documentation comment conventions |

## Current Skills (111)

amd-rocm, android-architecture, android-background-work, android-build-gradle, android-compose-components, android-compose-graphics-animation, android-compose-ui, android-data, android-media-camera, android-navigation, android-platform-core, android-testing, android-wear, anthropic-admin-platform, anthropic-agent-sdk, anthropic-api-core, anthropic-api-tools-mcp, anthropic-claude-code, anthropic-claude-code-admin, anthropic-claude-code-deploy, anthropic-claude-code-extend, anthropic-claude-code-surfaces, anthropic-managed-agents, anthropic-models-sdks, anthropic-prompt-eval, apple-app-services, apple-appkit, apple-data, apple-distribution, apple-graphics, apple-media, apple-ml, apple-silicon, apple-spatial, apple-swift, apple-swiftui, apple-uikit, ark-ui, better-auth, biome, blender, bullmq, cadquery, chakra-ui, commitlint, dayjs, dgx-spark, driverjs, editorconfig, ergogen, fandhe-ai, fandhe-backend, fandhe-frontend, feature-sliced-design, figma, github-docs, go-echo, gws, hermes-agent, hono, inngest, kicad_10, knip, kubb, lefthook, motion, nextjs-app, nuqs, nvidia-cuda, nvidia-sync, openai-agents, openai-api-core, openai-apps-sdk, openai-codex, openai-evals-tuning, openai-images-video, openai-platform-ops, openai-realtime-audio, pino, playwright, proxmox-ve, react-flow, react-hook-form, react-router, rive, rust, storybook, stripe, supabase, syncpack, theatrejs, threejs, tsdoc, turborepo, typedoc, upstash, vercel, vitest, windows-ai, windows-app-sdk, windows-data-storage, windows-design, windows-graphics-media, windows-interop-modernize, windows-packaging-publish, windows-platform-integration, windows-testing-performance, windows-winui-controls, windows-winui-ui, zmk, zod

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
- `fandhe-backend` is the backend counterpart of `fandhe-frontend` — a **Rust** HTTP server framework, and the repository's second Japanese-source skill. Its docs site carries no code examples at all, so every signature was read from the published crate sources on docs.rs (`docs.rs/crate/<name>/<version>/source/`; v0.3.0 as of 2026-08) rather than from the rendered pages. Its `description` leads with "Rust 製バックエンド HTTP サーバーフレームワーク" because `Server` / `Router` / `Middleware` / `CORS` / `WebSocket` collide as search keywords with `hono` (JS/TS) and `go-echo` (Go); the `## Notes` distinction line is applied only to the generically-named plugin pages (cors / compression / static / websocket / graphql / tracing), not to every page
- `fandhe-ai` is the third member of the fandhe family — a **Rust** AI/ML library (from-scratch tensor / dynamic-tape autodiff / kernel fusion / CPU・CUDA・Metal backends, no Burn / candle / tch dependency) and the repository's third Japanese-source skill. Its `description` leads with "Rust 製 AI/ML ライブラリ fandhe-ai の" (same shape as the other two). Only the `fandhe-ai` crate (`crates/facade/` in the repo) is the supported public API surface — the official docs declare direct use of internal crates unsupported, so `references/internals/` is one page per crate at architecture granularity (never per-item), each with a `## Notes` line saying so. Unlike `fandhe-backend`, the docs site has code examples and docs.rs **rendered** API pages are fetchable via WebFetch (`docs.rs/fandhe-ai/0.3.0/fandhe_ai/`, pinned to 0.3.0); only the 4 unpublished crates (`guardrail` / `self-repair` / `onnx-interop` / `bench-harness`) are read from GitHub raw sources. Real keyword collisions are with the GPU-compute family (`nvidia-cuda` / `apple-silicon` / `amd-rocm` — `Device::Cuda` / `Device::Metal` / GEMM), so `description` never uses CUDA / Metal / GEMM as standalone lead words and README-level distance lines sit on `api/` / `internals/` / `tooling/`. `guardrail` here is a CI changeset-judgment CLI (exit 0 / 10 / 20 / 1) and `guardrail eval` a classifier eval — both explicitly distinguished in `tooling/` from the LLM guardrails / evals of `openai-agents` / `anthropic-prompt-eval` / `openai-evals-tuning`. Agent / MCP / streaming / LLM-provider concepts do not exist in this library, so no distance line to `anthropic-*` / `openai-*` / `hermes-agent` is needed
- The `android-*` family (12 skills) is split by developer.android.com's own doc IA rather than mirroring `apple-*` one-for-one. Every skill's `description` **leads** with a disambiguator — `Android Jetpack Compose (Kotlin) の` for the three Compose skills, `Android アプリ開発 (Kotlin) の` for the rest, `Wear OS (Kotlin) の` for `android-wear` — because `Button` / `Text` / `Column` / `State` / `Navigation` / `Animation` collide with `apple-swiftui`, `ark-ui`, `chakra-ui`, `fandhe-frontend`, and `react-*`. The `## Notes` distinction line is applied at **category-README level** where the collision is systematic (`android-compose-components/*`, `android-compose-ui/layout`, `android-wear/wear-compose`, `android-platform-core/glance-widgets`) and per-page only for scattered hits
- Three `android-*` skills own same-named-but-different APIs and must not be merged: mobile Compose (`androidx.compose.*`) in `android-compose-ui` / `android-compose-components`, Wear Compose (`androidx.wear.compose.*`) in `android-wear`, and Glance (`androidx.glance.*`, compiles to `RemoteViews`) in `android-platform-core`. Same for `pager.md` (Compose `HorizontalPager` vs Paging 3 `Pager`) and `dialog.md` (Material3 `Dialog` vs `NavGraphBuilder.dialog`)
- `developer.android.com/reference/**` **cannot be fetched** — its left nav is huge and the body is truncated before it is reached (this is not a JS shell; a headless browser does not help). Reference bodies came from guide pages plus androidx sources on `raw.githubusercontent.com`, with directory listings taken via authenticated `gh api` (the unauthenticated Contents API 403s under parallel agents, and WebFetch silently summarizes the JSON away). Platform `android.*` classes have no androidx source; AOSP Gitiles `?format=TEXT` works for small ones. Note `androidx-main` can diverge from released artifacts — Room is `room3-*` / `androidx.room3` there, so Room pages follow the guides instead
- The `windows-*` family (11 skills) covers **Windows app development only** — IT-pro (`/windows/resources/`), Windows Server, IoT, hardware drivers, and Windows 365 are deliberately out of scope. Every skill's `description` **leads** with a disambiguator (`Windows アプリ開発 (WinUI 3 / Windows App SDK) の`, `... (Fluent Design / WinUI 3) の`, `... (DirectX / WinRT メディア) の`, `... (MSIX / Microsoft Store) の`, `... (Windows AI Foundry) の`, `... (Win32 / WPF / WinForms 相互運用) の`) because `Button` / `Grid` / `StackPanel` / `Window` / `Page` / `NavigationView` / `Style` / `Color` / `Motion` collide with `apple-swiftui`, `ark-ui`, `chakra-ui`, `fandhe-frontend`, and `android-compose-*`
- Windows has an **internal fork** of the same control names that must not be merged: `Microsoft.UI.Xaml.Controls.Button` (WinUI 3, in `windows-winui-controls`) vs `System.Windows.Controls.Button` (WPF) vs `System.Windows.Forms.Button` (WinForms) — the latter two are covered by `windows-interop-modernize/references/wpf-winforms-interop/` (`wpf-basic-controls.md`, `winforms-form-control.md`, `wpf-vs-winui3.md`), not by per-control pages. Same pattern as the mobile-Compose / Wear-Compose / Glance split in `android-*`. Unlike `android-*`, the distinction line is applied **per-page** in `## Notes` (category READMEs here are strictly H1 + index table, so there is no README-level place for it) — verified on `button.md`, `grid.md`, `stackpanel.md`, `navigationview.md`, `list-view.md`, `text-box.md`, `app-window.md`
- Unlike `developer.android.com/reference/**`, learn.microsoft.com's **auto-generated API reference pages are fully fetchable** via WebFetch (`/windows/windows-app-sdk/api/winrt/...`, `/windows/win32/api/...`, `/uwp/api/...`) — the body is not truncated by the large left nav, so no GitHub-source fallback is needed. Category listings come from `<path>/toc.json`. The `ja-jp` locale is `ms.translationtype: MT` (machine-translated), so **`en-us` is the source of truth** and `windows-*` reference bodies are in English
- `nvidia-cuda` は CUDA プログラミングスタック（CUDA C++/Python・PTX ISA・Blackwell チューニング・CUTLASS/CuTe）を担当し、`dgx-spark`（GB10 実機仕様・DGX OS・運用 playbook）・`nvidia-sync`（リモート接続アプリ）とは検索キーワードで棲み分ける。`description` は「NVIDIA CUDA」始まりで CUDA / PTX / CUTLASS 主導の語を優先する（`GEMM` / `kernel` は他分野でも汎用的な語のため）。参照本文は英語（docs.nvidia.com が英語のため）
- `amd-rocm` は AMD の GPU コンピューティングスタック（ROCm ライブラリ群・HIP プログラミングモデル/ランタイム API・CDNA/RDNA アーキテクチャ）を担当し、`nvidia-cuda`（CUDA / PTX / CUTLASS）とは `description` の先頭 disambiguator と主導語（HIP / ROCm / CDNA / RDNA vs CUDA / PTX / CUTLASS）で棲み分ける。HIP は CUDA API と 1:1 に近い命名（`hipMalloc` ↔ `cudaMalloc`）を持つため、`references/hip/cuda-to-hip-api-comparison.md` と `porting-cuda-to-hip.md`、および `samples/` 各ファイルの `## Notes` に CUDA との距離線を置く。参照本文は英語（rocm.docs.amd.com / gpuopen.com が英語のため）
- `apple-silicon` は Apple Silicon 上の GPU コンピュート／数値計算スタック（MSL 言語仕様・compute dispatch と unified memory 最適化・MPS/MPSGraph・MLX）を担当し、`apple-graphics`（Metal **レンダリング** API と Core Animation / Core Graphics / Core Image / SpriteKit / SceneKit）・`apple-ml`（Core ML / Create ML / Vision による `.mlmodel` 実行）とは `description` の先頭 disambiguator と主導語（MSL / MPSGraph / MLX / unified memory vs Metal / CALayer / CIFilter vs MLModel / MLMultiArray）で棲み分ける。`## Notes` の距離線は衝突が systematic な `references/metal-compute/`（9 ページ全件）と `samples/`（13 件全件）は全ページ、`references/msl/` `references/mps/` `references/mlx/` は API 名が実際に衝突するページのみ per-page で置く（`scripts/` はコマンド集のため対象外）。MLX のみ出典が developer.apple.com ではなく OSS の ml-explore.github.io。参照本文は英語。MSL Specification は PDF 配布（約 14.5MB）のため **WebFetch 不可**（10MB 上限超過）— `curl -o` でダウンロードし Read ツールの `pages` 指定（1 リクエスト最大 20 ページ、全 383 ページ）で章単位に分割して読む。`Accept-Ranges: bytes` 対応のため `curl --range` のチャンク取得も可
- `openai-*` ファミリー（8 スキル）は OpenAI のドキュメントを 3 系統でカバーする: `openai-api-core`（Responses API / structured outputs / streaming / webhooks / 公式 SDK）・`openai-agents`（Agents SDK / built-in tools / MCP / handoffs・guardrails・tracing）・`openai-realtime-audio`（Realtime API WebRTC/WebSocket/SIP・STT/TTS）・`openai-images-video`（gpt-image / vision / Sora）・`openai-evals-tuning`（Evals / graders / SFT・DPO・RFT — セルフサービス fine-tuning は 2026〜2027 に段階的廃止進行中で各ページ Notes に記載）・`openai-platform-ops`（Administration API / RBAC / Terraform / WIF / safety・production ガイド）は `developers.openai.com/api/docs`（`platform.openai.com/docs` はここへ 301）、`openai-codex`（CLI / IDE / cloud / AGENTS.md / rules / subagents / approvals / sandbox / config.toml / administration / Codex Security 脆弱性スキャン）は `learn.chatgpt.com/docs` が出典、`openai-apps-sdk`（ChatGPT 内で動くアプリを MCP サーバーとして**公開する側**の SDK — `window.openai` / `useOpenAiGlobal` / `registerAppTool` / `ui://` component resource / tool descriptor `_meta` / Checkout / 審査・申請）は `developers.openai.com/plugins` が出典（**Apps SDK → plugins にリブランド済み**。`/apps-sdk` は同一内容に解決されるため出典 URL は `/plugins/` 系で記録。公式サンプルは `openai/openai-apps-sdk-examples`）。`openai-agents` の MCP（消費側 = Agents SDK から接続）と `openai-apps-sdk` の MCP（公開側）は消費/公開の軸で棲み分け、両者の mcp 系 README に相互距離線を置く。Apps SDK の "skills"（プラグインのワークフロー概念）は本リポジトリ・Claude Code Skills の語彙と正面衝突するため description には入れず、`concepts/plugin-skills.md`・`build/build-skills.md` の Notes 距離線のみで扱う。`description` の先頭 disambiguator は「OpenAI API (developers.openai.com) の」／「OpenAI Codex (CLI / IDE / cloud) の」／「OpenAI Apps SDK / ChatGPT plugins (developers.openai.com/plugins) の」— `Agent` / `MCP` / `tools` / `streaming` / `webhooks` / `subagents` が `hermes-agent`・`supabase`・`upstash`・`stripe`・`inngest` および Claude Code 自身の概念と衝突するため。衝突が systematic な README には冒頭距離線を置く（`android-*` の README レベル距離線の先例に従う）。取得は容易: 両サイトとも SSR で全ページに `<slug>.md` の Markdown twin があり、階層化された `llms.txt` で列挙できる。ただし **WebFetch の要約器が大きな索引・長いページを畳み、時に他社ブランド名を混入させる幻覚を起こす**ため、`.md` twin を 1 ページずつ取得し「セクション X の行だけ verbatim」で範囲を絞るのが定石（verbatim 判定は末尾の llms.txt boilerplate 行の有無で行う）。Codex の公式 use-cases（`learn.chatgpt.com/codex/use-cases/<slug>`、70+ 件、`llms.txt` 未掲載）は API 定義を含まない実例集のため `references/` ではなく `samples/` の情報源とし、開発系に絞って curate した。deprecated サーフェス（Assistants / Chat Completions）は first-class にせず `openai-api-core/references/legacy-migration/` に集約。`developers.openai.com/api/reference/resources/**` の深い階層（Administration 系・一部 videos メソッド）は Stainless 生成のスタブで `.md` twin が本文を含まないため、ガイドページを一次情報源にする。Apps SDK の guides 配下の conversion specs 3 件（product-checkout / restaurant-reservation / local-services-request-quote）は業種別の商流契約仕様のため未収録（将来 Agentic Commerce Protocol を棚卸しする際の候補）
- `anthropic-*` ファミリー（12 スキル）は Anthropic 公式ドキュメントを 2 サイト・3 系統でカバーする。**Claude Code 系**（出典 `code.claude.com/docs`）: `anthropic-claude-code`（CLI 基礎・設定・メモリ・環境変数）・`anthropic-claude-code-surfaces`（Desktop / VS Code / JetBrains / web / mobile）・`anthropic-claude-code-extend`（skills / subagents / hooks / MCP / plugins / routines）・`anthropic-claude-code-admin`（permissions / sandboxing / enterprise 設定 / analytics）・`anthropic-claude-code-deploy`（Bedrock / Vertex / Foundry 経由・apps gateway・LLM gateway・GitHub Actions / GitLab CI/CD・headless / devcontainer）・`anthropic-agent-sdk`（Claude Agent SDK TypeScript / Python）。**Claude API 系**（出典 `platform.claude.com/docs`。`docs.claude.com` はここへ解決、旧 `docs.anthropic.com` は source URL に使用禁止）: `anthropic-api-core`（Messages API / streaming / batches / files / structured outputs）・`anthropic-api-tools-mcp`（tool use / server tools / Agent Skills API / MCP connector）・`anthropic-managed-agents`（Managed Agents beta — sessions / environments / vaults / deployments）・`anthropic-admin-platform`（Admin API / Compliance API / organization 管理）・`anthropic-prompt-eval`（prompt engineering / evals / guardrails / use cases）・`anthropic-models-sdks`(モデル・pricing・SDK 7 言語・Claude API 用 CLI `ant`)。**統合禁止の三重衝突**: 「Skills」（Claude Code の Agent Skills = SKILL.md / Skills API / 本リポジトリのスキル概念）・「MCP」（Claude Code から接続 / API の MCP connector）・「Agent (SDK)」（Agent SDK 自前ホスト / Managed Agents ホスト型）が別物として複数スキルに現れるため、`description` は先頭ホストレベル disambiguator（「Claude Code (code.claude.com) の」／「Claude API (platform.claude.com) の」形）で始め、裸の「skills」を避け「Agent Skills (SKILL.md)」「Skills API」形で書く。距離線は README レベル（日本語）+ per-page `## Notes`（本文内は英語）の 2 層で、`android-*` の README レベル前例に従う。**エンドポイント粒度**: `anthropic-api-core` / `anthropic-api-tools-mcp` は per-endpoint ページ（Stainless 生成 `.md` twin に完全な本文あり）、`anthropic-managed-agents`（約 87 EP）・`anthropic-admin-platform`（admin 98 + compliance 31 EP）は分量過大のため**リソース単位の集約ページ**（1 リソース 1 ファイル、Method/Path 表 + 代表 curl）。取得は両サイトとも URL 末尾 `.md` の Markdown twin から verbatim（`llms.txt` で列挙可能）。WebFetch は長い表の途中で切断・要約器の幻覚があるため、切断時は `curl -sL -o` で `.md` twin を保存し Read で補完する。`developer.android.com` 型の fetch 不可問題はない。モデル別ガイド等に現れるモデル ID・価格・日付は原文どおり転記し正規化しない
- `react-router` は旧 `react-router-v7` を改名したスキルで、React Router v8 (現行安定版) に追随する。v8 で削除・改名された API のページは残し、`## Notes` に v8 での扱い (removed/renamed) を明記する
- Cross-skill relative links (`../../../<other-skill>/...`) must never be used — skills are installed individually via `npx skills add`, so such links always break. Reference the other skill by name in plain text instead
- When editing `.claude/` files, use the `_/dotclaude/` staging pattern (write there first, then `mv` to `.claude/`)

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
