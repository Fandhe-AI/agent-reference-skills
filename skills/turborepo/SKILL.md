---
name: turborepo
description: >
  Turborepo (高速モノレポビルドシステム) リファレンス。
  turbo.json、turbo run、dependsOn、task tags、キャッシュ (local / remote)、
  workspaces (pnpm / npm / yarn / bun / nub / aube)、Rust / Python / Go ワークスペース (実験的)、
  --filter、turbo query affected、turbo prune、turbo gen、watch、
  Remote Cache (Vercel / 自前ホスト Remote Cache API)、devEngines.packageManager、
  エラー診断 (recursive turbo invocations, missing root task)。
user-invocable: false
model: sonnet
---

# Turborepo リファレンス

Turborepo — JavaScript / TypeScript モノレポ向け高性能ビルドシステム。
turbo.json の設定、タスク管理、キャッシュ、各種ツール統合時に参照する。

対象: Turborepo v2.11.8 (source: vercel/turborepo apps/docs/content/docs @ v2.11.8)

## ディレクトリ構成

```text
skills/turborepo/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      add-to-existing.md
      editor-integration.md
      start-with-an-example.md
    core-concepts/
      README.md
      internal-packages.md
      package-and-task-graph.md
      package-types.md
      remote-caching.md
    crafting-your-repository/
      README.md
      structuring.md
      dependencies.md
      internal-packages.md
      tasks.md
      running-tasks.md
      caching.md
      environment-variables.md
      developing.md
      ci.md
      upgrading.md
      understanding-your-repository.md
    guides/
      README.md
      ai.md
      coordinating-runtime-dependencies.md
      generating-code.md
      handling-platforms.md
      microfrontends.md
      migrating-from-nx.md
      multi-language.md
      publishing-libraries.md
      single-package-workspaces.md
      skipping-tasks.md
    guides-frameworks/
      README.md
      framework-bindings.md
      nextjs.md
      nuxt.md
      rsbuild.md
      sveltekit.md
      vite.md
    guides-ci-vendors/
      README.md
      buildkite.md
      circleci.md
      github-actions.md
      gitlab-ci.md
      travis-ci.md
      vercel.md
    guides-tools/
      README.md
      biome.md
      docker.md
      eslint.md
      go-experimental.md
      jest.md
      oxc.md
      playwright.md
      prisma.md
      python-experimental.md
      rust-experimental.md
      shadcn-ui.md
      storybook.md
      tailwind.md
      typescript.md
      vitest.md
    configuration/
      README.md
      globs.md
      package-configurations.md
      system-environment-variables.md
      turbo-json.md
    cli/
      README.md
      boundaries.md
      gen.md
      options-overview.md
      other-commands.md
      prune.md
      query.md
      run.md
      watch.md
    remote-cache-api/
      README.md
      overview.md
      artifacts.md
      events.md
    messages-error-docs/
      README.md
      invalid-env-prefix.md
      missing-root-task-in-turbo-json.md
      package-task-in-single-package-workspace.md
      recursive-turbo-invocations.md
      unnecessary-package-task-syntax.md
  samples/
    README.md
    ci-github-actions.md
    code-generation.md
    dev-workflow.md
    environment-variables.md
    filtering-tasks.md
    internal-packages.md
    monorepo-setup.md
    publishing-packages.md
    remote-caching.md
    task-pipeline.md
  scripts/
    README.md
    build-deploy.md
    cache.md
    cli.md
    dev.md
    generate.md
    inspect.md
    install.md
    migrate.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、既存リポジトリへの導入、create-turbo、エディタ連携、サンプルから開始 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| パッケージグラフ、タスクグラフ、DAG、パッケージタイプ、内部パッケージのコンパイル戦略 (JIT / Compiled / Publishable)、Remote Caching の概念 | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| リポジトリ構造、依存管理、内部パッケージ、タスク設定・実行、キャッシュ、環境変数、開発・Watch モード、CI 構築、バージョンアップ | crafting-your-repository | [references/crafting-your-repository/README.md](references/crafting-your-repository/README.md) |
| コード生成、タスクスキップ、ライブラリ公開、単一パッケージ、多言語、マイクロフロントエンド、Nx 移行、AI 連携、ランタイム依存の調整 | guides | [references/guides/README.md](references/guides/README.md) |
| Next.js、Nuxt、SvelteKit、Vite、Rsbuild、フレームワークバインディング | guides-frameworks | [references/guides-frameworks/README.md](references/guides-frameworks/README.md) |
| GitHub Actions、Vercel、GitLab CI、CircleCI、Buildkite、Travis CI | guides-ci-vendors | [references/guides-ci-vendors/README.md](references/guides-ci-vendors/README.md) |
| TypeScript、ESLint、Biome、Oxc、Tailwind CSS、Jest、Vitest、Playwright、Storybook、Prisma、Docker、shadcn/ui、Rust / Python / Go (実験的なネイティブワークスペース) | guides-tools | [references/guides-tools/README.md](references/guides-tools/README.md) |
| turbo.json 設定、タスク tags、deferred input hashing、futureFlags、パッケージ設定 (extends)、システム環境変数 (TURBO_*)、グロブ仕様 | configuration | [references/configuration/README.md](references/configuration/README.md) |
| turbo run、turbo watch、turbo gen、turbo prune、turbo query (affected の理由 reasons を含む)、turbo boundaries、その他 CLI コマンド、フラグ一覧 | cli | [references/cli/README.md](references/cli/README.md) |
| セルフホスト Remote Cache サーバー実装、Remote Cache API (OpenAPI)、artifacts / events エンドポイント | remote-cache-api | [references/remote-cache-api/README.md](references/remote-cache-api/README.md) |
| エラーメッセージの原因・対処法を調べる | messages-error-docs | [references/messages-error-docs/README.md](references/messages-error-docs/README.md) |
| モノレポセットアップ、タスクパイプライン、フィルタリング、Remote Cache、内部パッケージの典型的な使い方 | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド、ビルド・デプロイ、キャッシュ管理、コード生成、開発サーバー、構造検査、移行 | scripts | [scripts/README.md](scripts/README.md) |
