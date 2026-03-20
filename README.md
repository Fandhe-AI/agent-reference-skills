# Agent Reference Skills

Claude Code 用のスキル（リファレンスドキュメント）とエージェント定義のコレクション。

公式ドキュメントから抽出・構造化した markdown をスキルとして提供する。Claude Code がコード作成・レビュー時に自動でライブラリの API リファレンスを参照できるようになる。

[vercel-labs/skills](https://github.com/vercel-labs/skills) CLI を使用してインストールする。

## 使い方

### スキルの追加

```bash
# すべてのスキルを一覧表示
npx skills add <owner>/<repo> --list

# 特定のスキルを追加（例: vitest）
npx skills add <owner>/<repo> --skill vitest

# 複数のスキルを追加
npx skills add <owner>/<repo> --skill vitest --skill zod --skill biome

# すべてのスキルを追加
npx skills add <owner>/<repo> --all
```

デフォルトではプロジェクトの `.claude/skills/` にシンボリックリンクで追加される。`--copy` フラグでファイルコピーに変更可能。

### グローバルインストール

`-g` フラグで `~/.claude/skills/` にインストールすると、すべてのプロジェクトで利用できる。

```bash
npx skills add <owner>/<repo> --skill react-router-v7 -g
```

## リポジトリ構成

```text
.claude/
  agents/
    reference-researcher.md  ← スキルリファレンス作成用エージェント
    plan-verifier.md         ← 計画検証エージェント（読み取り専用）
  skills/                    ← 本リポジトリ開発用のワークフロースキル
    create-commit/           ← Conventional Commits 形式でコミット
    create-pr/               ← PR 作成
    create-issue/            ← Issue 作成（sub-issues 対応）
    create-plan/             ← 実装計画作成
    implement-issue/         ← Issue 実装
    implement-review/        ← コードレビュー
    implement-review-pr/     ← PR レビュー
    update-docs/             ← CLAUDE.md 更新
skills/
  <library-name>/
    SKILL.md                 ← エントリーポイント（YAML frontmatter + 探索手順）
    references/              ← カテゴリ別リファレンス
      <category>/
        README.md            ← インデックステーブル
        <page>.md            ← 個別 API / コンセプト
    rules/                   ← (任意) 適用ルール
```

## スキル一覧

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
| [nuqs](skills/nuqs/) | nuqs — URL search params state manager |

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

### ユーティリティ / インフラ

| スキル | 説明 |
| -------- | ------ |
| [zod](skills/zod/) | Zod — TypeScript スキーマバリデーション |
| [dayjs](skills/dayjs/) | Day.js — 軽量日付ライブラリ |
| [pino](skills/pino/) | Pino — JSON ロガー, transport, redaction |
| [bullmq](skills/bullmq/) | BullMQ — Redis ジョブキュー, Worker, FlowProducer |
| [github-docs](skills/github-docs/) | GitHub — REST API, Actions, Webhooks, gh CLI |

### アーキテクチャ

| スキル | 説明 |
| -------- | ------ |
| [feature-sliced-design](skills/feature-sliced-design/) | Feature-Sliced Design — レイヤー構成, 依存方向, Public API パターン |

## エージェント

### reference-researcher

公式ドキュメントを調査し、スキル用の構造化 markdown を自動生成するエージェント。

**パラメータ:**

| 名前 | 説明 | 例 |
| ------ | ------ | ---- |
| `library` | ライブラリ名 | `react-router-v7` |
| `base_url` | 公式ドキュメントの URL | `https://reactrouter.com/` |
| `scope` | 担当範囲（カンマ区切り） | `hooks,components` |
| `output_dir` | 出力先パス | `skills/react-router-v7/references/hooks/` |

スコープごとに並列実行を想定。`SKILL.md` は全スコープ完了後に手動で作成する。

### plan-verifier

計画ファイルや指示書に基づいて実行された作業が正しく漏れなく完了しているかを検証するエージェント。読み取り専用で動作し、破壊的操作は一切行わない。

## 新しいスキルの追加手順

1. `reference-researcher` エージェントをスコープごとに並列実行し、`references/` 以下を生成する
2. 生成されたファイルを確認・修正する
3. `SKILL.md` を作成する（YAML frontmatter + ディレクトリ構造 + カテゴリマッピングテーブル）
4. このリポジトリの `skills/` ディレクトリに配置する
