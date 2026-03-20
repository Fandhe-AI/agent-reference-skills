---
name: turborepo
description: >
  Turborepo モノレポビルドシステム リファレンス。
  turbo.json, turbo run, キャッシュ, タスク依存,
  workspaces, --filter, remote caching
user-invocable: false
---

# Turborepo リファレンス

Turborepo — JavaScript / TypeScript モノレポ向け高性能ビルドシステム。
turbo.json の設定、タスク管理、キャッシュ、各種ツール統合時に参照する。

## ディレクトリ構造

```
.claude/skills/turborepo/
├── SKILL.md                                    ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md               ← Getting Started 索引（2ページ）
    ├── core-concepts/README.md                 ← コア概念索引（3ページ）
    ├── crafting-your-repository/README.md       ← リポジトリ構築索引（9ページ）
    ├── guides/README.md                        ← ガイド索引（9ページ）
    ├── guides-frameworks/README.md             ← フレームワーク別ガイド索引（5ページ）
    ├── guides-ci-vendors/README.md             ← CI ベンダー別ガイド索引（6ページ）
    ├── guides-tools/README.md                  ← ツール別ガイド索引（12ページ）
    ├── configuration/README.md                 ← 設定索引（4ページ）
    └── cli/README.md                           ← CLI 索引（7ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、既存リポジトリへの導入、create-turbo | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| パッケージグラフ、タスクグラフ、DAG、トランジットノード、パッケージタイプ、JIT/Compiled/Publishable、Remote Caching | core-concepts | [references/core-concepts/README.md](./references/core-concepts/README.md) |
| リポジトリ構造、依存管理、内部パッケージ作成、タスク設定(dependsOn/inputs/outputs)、タスク実行、キャッシュ、環境変数、開発(dev/watch)、CI 構築 | crafting-your-repository | [references/crafting-your-repository/README.md](./references/crafting-your-repository/README.md) |
| コード生成、タスクスキップ、ライブラリ公開、単一パッケージ、プラットフォーム対応、多言語、マイクロフロントエンド、Nx移行、AI連携 | guides | [references/guides/README.md](./references/guides/README.md) |
| Next.js、Nuxt、SvelteKit、Vite、フレームワークバインディング、peerDependencies | guides-frameworks | [references/guides-frameworks/README.md](./references/guides-frameworks/README.md) |
| GitHub Actions、Vercel、GitLab CI、CircleCI、Buildkite、Travis CI | guides-ci-vendors | [references/guides-ci-vendors/README.md](./references/guides-ci-vendors/README.md) |
| TypeScript、ESLint、Biome、Oxc、Tailwind CSS、Jest、Vitest、Playwright、Storybook、Prisma、Docker、shadcn/ui | guides-tools | [references/guides-tools/README.md](./references/guides-tools/README.md) |
| turbo.json 設定、パッケージ設定(extends)、システム環境変数(TURBO_*)、グロブ仕様 | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| turbo run、turbo watch、turbo gen、turbo prune、turbo query、turbo boundaries、turbo ls/scan/info/devtools/login/link | cli | [references/cli/README.md](./references/cli/README.md) |
