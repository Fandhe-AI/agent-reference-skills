# Agent Reference Skills

Claude Code 用のスキル（リファレンスドキュメント）とエージェント定義のコレクション。

公式ドキュメントから抽出・構造化した markdown をスキルとして提供する。Claude Code がコード作成・レビュー時に自動でライブラリの API リファレンスを参照できるようになる。

[vercel-labs/skills](https://github.com/vercel-labs/skills) CLI を使用してインストールする。

## 使い方

### スキルの追加

```bash
# すべてのスキルを一覧表示
npx skills add Fandhe-AI/agent-reference-skills --list

# 特定のスキルを追加（例: vitest）
npx skills add Fandhe-AI/agent-reference-skills --skill vitest

# 複数のスキルを追加
npx skills add Fandhe-AI/agent-reference-skills --skill vitest --skill zod --skill biome

# すべてのスキルを追加
npx skills add Fandhe-AI/agent-reference-skills --all
```

デフォルトではプロジェクトの `.claude/skills/` にシンボリックリンクで追加される。`--copy` フラグでファイルコピーに変更可能。

### グローバルインストール

`-g` フラグで `~/.claude/skills/` にインストールすると、すべてのプロジェクトで利用できる。

```bash
npx skills add Fandhe-AI/agent-reference-skills --skill react-router-v7 -g
```

## リポジトリ構成

```text
.claude/
  agents/                    ← 用途別サブエージェント
    research/                ← reference-researcher / reference-updater / skill-coverage-analyzer
    author/                  ← skill-author / description-optimizer / readme-indexer / sample-curator / script-collector
    quality/                 ← skill-structure-validator / reference-linter / plan-verifier
  rules/                     ← 強制ルール（delegation / skill-anatomy / reference-template ほか）
  skills/                    ← 本リポジトリ開発用のワークフロースキル
    create-skill/            ← 新スキル作成のオーケストレーション
    update-skill/            ← 既存スキルを最新ドキュメントへ追従
    create-commit/           ← Conventional Commits 形式でコミット
    create-pr/               ← PR 作成
    create-issue/            ← Issue 作成（sub-issues 対応）
    create-plan/             ← 実装計画作成
    implement-issue/         ← Issue 実装
    implement-review/        ← コードレビュー
    implement-review-pr/     ← PR レビュー
    update-docs/             ← CLAUDE.md 更新
    contribute-skill/        ← upstream リポジトリへスキルを PR 投稿
    sync-skills-lock/        ← skills-lock.json の computedHash 同期
skills/
  <library-name>/
    SKILL.md                 ← エントリーポイント（YAML frontmatter + 探索手順）
    references/              ← カテゴリ別 API リファレンス（「何か」）
      <category>/
        README.md            ← インデックステーブル
        <page>.md            ← 個別 API / コンセプト
    samples/                 ← (任意) 動く実例・典型ワークフロー（「どう使うか」）
    scripts/                 ← (任意) 実行可能コマンド集（「どう実行するか」）
    rules/                   ← (任意) 適用ルール
```

## スキル一覧（全 44 スキル）

### フレームワーク / ライブラリ

| スキル | 説明 |
| -------- | ------ |
| [react-router-v7](skills/react-router-v7/) | React Router v7 Framework Mode — loader, action, hooks, middleware, SSR/SPA |
| [react-hook-form](skills/react-hook-form/) | React Hook Form v7 — useForm, register, Controller, バリデーション |
| [react-flow](skills/react-flow/) | React Flow — ノード, エッジ, カスタムノード, レイアウト |
| [chakra-ui](skills/chakra-ui/) | Chakra UI v3 — コンポーネント, テーマ, レシピ, スタイルプロップ |
| [storybook](skills/storybook/) | Storybook — CSF, args, decorators, play function, autodocs |
| [better-auth](skills/better-auth/) | Better Auth — 認証, OAuth, passkey, twoFactor, プラグイン |
| [supabase](skills/supabase/) | Supabase — database, auth, storage, edge-functions, realtime, RLS |
| [driverjs](skills/driverjs/) | Driver.js — プロダクトツアー, 要素ハイライト, ポップオーバー |
| [hermes-agent](skills/hermes-agent/) | Hermes Agent — AI CLI エージェント, MCP, Voice Mode, Messaging Gateway |
| [hono](skills/hono/) | Hono — 軽量 Web フレームワーク, Middleware, Helpers, マルチランタイム |
| [nuqs](skills/nuqs/) | nuqs — URL search params state manager |
| [inngest](skills/inngest/) | Inngest — イベント駆動 Durable Execution, createFunction, step, フロー制御 |

### ビルド / テスト / 品質

| スキル | 説明 |
| -------- | ------ |
| [playwright](skills/playwright/) | Playwright — E2E テスト, page, locator, fixtures, trace, auth |
| [vitest](skills/vitest/) | Vitest — test, expect, vi.fn, vi.mock, coverage, snapshot |
| [biome](skills/biome/) | Biome — formatter/linter, ルール設定, ESLint/Prettier 移行 |
| [turborepo](skills/turborepo/) | Turborepo — turbo.json, キャッシュ, タスク依存, workspaces |
| [knip](skills/knip/) | Knip — 未使用コード検出, auto-fix, monorepos |
| [commitlint](skills/commitlint/) | commitlint — コミットメッセージ検証, Conventional Commits |
| [lefthook](skills/lefthook/) | Lefthook — Git hooks マネージャー, pre-commit, pre-push |
| [editorconfig](skills/editorconfig/) | EditorConfig — .editorconfig ファイルフォーマット |
| [syncpack](skills/syncpack/) | Syncpack — モノレポ依存関係管理, versionGroups, semverGroups |

### コード生成 / ドキュメント

| スキル | 説明 |
| -------- | ------ |
| [kubb](skills/kubb/) | Kubb — OpenAPI コードジェネレーター, TypeScript / Zod / TanStack Query 生成 |
| [typedoc](skills/typedoc/) | TypeDoc — TypeScript ドキュメントジェネレーター |
| [tsdoc](skills/tsdoc/) | TSDoc — コメント記述ガイドライン, TypeDoc 互換タグ |

### 3D / グラフィックス / アニメーション / デザイン

| スキル | 説明 |
| -------- | ------ |
| [threejs](skills/threejs/) | Three.js — WebGL / WebGPU 3D グラフィックス, Scene, Mesh, Material, Loader |
| [blender](skills/blender/) | Blender — Python API (bpy / bmesh), モデリング, レンダリング, add-on, MCP Server |
| [cadquery](skills/cadquery/) | CadQuery — Python 製 3D CAD スクリプティング, Workplane, Sketch, Assemblies |
| [motion](skills/motion/) | Motion (旧 Framer Motion) — animate, scroll, gestures, layout, hooks |
| [rive](skills/rive/) | Rive — アニメーションランタイム, State Machine, Data Binding, useRive |
| [theatrejs](skills/theatrejs/) | Theatre.js — アニメーションツールキット, Sheet, Sequence, R3F 統合, studio |
| [figma](skills/figma/) | Figma — REST API / Plugin API / Widget API / Code Connect / MCP Server |

### ハードウェア / EDA

| スキル | 説明 |
| -------- | ------ |
| [kicad_10](skills/kicad_10/) | KiCad 10.0 — EDA スイート, 回路図設計, 基板設計, kicad-cli, ガーバー出力 |
| [ergogen](skills/ergogen/) | Ergogen — 自作キーボード設計, YAML 設定, points / outlines / cases / pcbs |
| [zmk](skills/zmk/) | ZMK Firmware — キーボードファームウェア, keymap, behaviors, bluetooth, split |

### 言語

| スキル | 説明 |
| -------- | ------ |
| [rust](skills/rust/) | Rust — 所有権, ライフタイム, トレイト, async/await, Cargo, 標準ライブラリ |

### ユーティリティ / インフラ

| スキル | 説明 |
| -------- | ------ |
| [zod](skills/zod/) | Zod — TypeScript スキーマバリデーション |
| [dayjs](skills/dayjs/) | Day.js — 軽量日付ライブラリ |
| [pino](skills/pino/) | Pino — JSON ロガー, transport, redaction |
| [bullmq](skills/bullmq/) | BullMQ — Redis ジョブキュー, Worker, FlowProducer |
| [github-docs](skills/github-docs/) | GitHub — REST API, Actions, Webhooks, gh CLI |
| [gws](skills/gws/) | Google Workspace CLI (gws) — Rust 製, Gmail / Drive / Calendar 等 19 サービス統一操作 |
| [upstash](skills/upstash/) | Upstash — サーバーレスデータ, @upstash/redis / ratelimit / QStash / vector / workflow |
| [vercel](skills/vercel/) | Vercel — CLI, vercel.json, Functions, Blob, Edge Config, デプロイメント管理 |

### アーキテクチャ

| スキル | 説明 |
| -------- | ------ |
| [feature-sliced-design](skills/feature-sliced-design/) | Feature-Sliced Design — レイヤー構成, 依存方向, Public API パターン |

## エージェント

main エージェントは「対話・計画・委譲・報告」に徹し、token を消費する実作業（ドキュメント調査、references 作成、SKILL.md 作成、検証、lint、棚卸し）はすべて用途別サブエージェントへ委譲する。詳細は `.claude/rules/delegation.md` を参照。

| カテゴリ | エージェント | model | 役割 |
| -------- | ------------ | ----- | ---- |
| research | `reference-researcher` | sonnet | 公式ドキュメントをクロールして `references/` を作成（scope 毎に並列） |
| research | `reference-updater` | sonnet | 既存スキルを最新ドキュメントと差分比較・更新（check / apply） |
| research | `skill-coverage-analyzer` | opus | 読み取り専用のギャップ分析・新スキル提案 |
| author | `skill-author` | sonnet | references 完成後に `SKILL.md` を作成・更新 |
| author | `description-optimizer` | sonnet | `description` フィールドのヒット率・長さ最適化 |
| author | `readme-indexer` | haiku | カテゴリ README の索引表を再生成 |
| author | `sample-curator` | sonnet | 動く実例を `samples/` に整備 |
| author | `script-collector` | sonnet | 実行可能コマンドを `scripts/` に収集 |
| quality | `skill-structure-validator` | haiku | 読み取り専用の構造整合性チェック |
| quality | `reference-linter` | haiku | 読み取り専用のファイル・frontmatter lint |
| quality | `plan-verifier` | sonnet | 読み取り専用の計画完了検証 |

## 新しいスキルの追加手順

`/create-skill <library> [base_url]` を実行すると、委譲ベースで以下のフローを自動でオーケストレーションする（main エージェントは自分でドキュメントをクロールしない）。

1. (任意) `skill-coverage-analyzer` が追加価値とスコープを確認
2. `create-plan` が `_/local-plans/<library>-skill.md` を作成
3. `reference-researcher` を **scope 毎に並列実行** → `references/`、`sample-curator` → `samples/`、`script-collector` → `scripts/`
4. `skill-author` が `SKILL.md` を作成（必要に応じ `description-optimizer` が description を最適化）
5. `reference-linter` + `skill-structure-validator` が検証し、指摘を該当エージェントへ差し戻し
6. `update-docs` が新スキルを CLAUDE.md / README.md に反映

既存スキルを最新ドキュメントへ追従させる場合は `/update-skill <library> [check|apply]`（`reference-updater` が駆動）を実行する。
