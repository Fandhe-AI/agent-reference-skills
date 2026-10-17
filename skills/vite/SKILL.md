---
name: vite
description: >
  Vite (フロントエンドビルドツール・開発サーバー, v8 / Rolldown) のリファレンス。
  vite.config, defineConfig, server, build, optimizeDeps, HMR (import.meta.hot),
  import.meta.env, import.meta.glob, configureServer, transformIndexHtml,
  Environment API (DevEnvironment / ModuleRunner), SSR, library mode, JavaScript API, v7 から v8 移行。
  テストは vitest スキル。
user-invocable: false
---

# Vite

対象バージョン Vite v8.3.4 (GitHub tag `vitejs/vite` `v8.3.4` = npm latest, published 2026-10-08; fetched 2026-10-16)。
本文の出典は `raw.githubusercontent.com/vitejs/vite/v8.3.4/docs/**`。`main` は 33 commits 先行し docs 8 ファイルが変更されているため使用しない。vite.dev のページと `.md` twin は `main` からデプロイされるため、source URL とアンカー実測にのみ使用している。

## ディレクトリ構成

```text
skills/vite/
  SKILL.md
  references/
    getting-started/        # CLI・scaffold・プラグイン導入・概要
      README.md
      cli-dev.md / cli-build.md / cli-optimize-preview.md
      scaffolding.md / index-html-project-root.md / using-plugins.md
      official-plugins.md / plugin-legacy.md / overview.md / why-vite.md / philosophy.md
      using-unreleased-commits.md
    config-shared/          # 共通オプション (root / base / mode / resolve / define / css / json / future ほか)
      README.md
      configuring-vite.md / conditional-async-config.md / root-base-mode.md
      resolve-alias.md / resolve-options.md / define.md / app-type.md / tsconfig.md ほか
    config-dev/             # server.* / preview.* / optimizeDeps.*
      README.md
      server-proxy.md / server-middleware-mode.md / server-hmr-ws.md / server-fs.md ほか
    config-build/           # build.* / worker.*
      README.md
      build-target.md / build-lib.md / build-manifest.md / build-rolldown-options.md ほか
    features/               # CSS・HTML・TypeScript・glob import・HMR・Web Workers・依存プリバンドル
      README.md
      hot-module-replacement.md / glob-import.md / css.md / typescript.md ほか
    assets-env/             # 静的アセット・環境変数・モード
      README.md
      env-variables.md / built-in-constants.md / modes.md / public-directory.md ほか
    build-deploy/           # ビルド・デプロイ・library mode・backend integration
      README.md
      library-mode.md / multi-page-app.md / public-base-path.md / backend-integration.md
      deploy-netlify-vercel.md / deploy-github-gitlab.md ほか
    ssr/                    # SSR 構成・本番ビルド・externals・SSG
      README.md
      ssr-overview.md / ssr-dev-server.md / ssr-production-build.md / ssr-options.md ほか
    javascript-api/         # createServer / build / preview / resolveConfig / loadEnv ほか
      README.md
      create-server.md / build.md / vite-dev-server.md / inline-resolved-config.md ほか
    plugin-api/             # プラグイン作成・Vite 固有 hook・HMR API
      README.md
      authoring-conventions.md / hook-config.md / hook-configure-server.md
      hook-transform-index-html.md / hmr-api-overview.md / hot-accept.md ほか
    environment-api/        # Environments / DevEnvironment / ModuleRunner
      README.md
      environment-api-overview.md / environments-configuration.md / dev-environment-class.md
      module-runner.md / environments-during-build.md ほか
    migration-troubleshooting/  # v7 から v8 移行・breaking changes・トラブルシュート・性能
      README.md
      migration-v7-overview.md / breaking-changes.md / performance.md
      troubleshooting-dev-server.md / troubleshooting-hmr.md ほか
  samples/
    README.md
    basic-config.md / conditional-env-config.md / env-variables-typing.md / dev-proxy.md
    library-mode.md / multi-page-app.md / glob-import.md / web-workers.md
    ssr-dev-server-express.md / ssr-production-build.md
    plugin-virtual-module.md / plugin-transform-custom-file.md
    plugin-configure-server.md / plugin-transform-index-html.md
    custom-hmr-events.md / hmr-accept.md / javascript-api-server-build.md
    backend-integration-manifest.md / github-pages-deploy.md
    environment-api-plugin.md / module-runner.md / migrate-esbuild-to-rolldown-options.md
  scripts/
    README.md
    install.md / dev.md / build.md / preview-optimize.md
    debug-profile.md / unreleased-commits.md / deploy-cli.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実コードが必要なら `samples/README.md`、コマンドが必要なら `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| CLI (`vite` / `vite build` / `vite preview`)、scaffold、公式プラグイン、`@vitejs/plugin-legacy` を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `vite.config` の書き方、`root` / `base` / `mode`、`resolve.alias`、`define`、`css.*`、`future` | config-shared | [references/config-shared/README.md](references/config-shared/README.md) |
| `server.proxy` / `server.hmr` / `server.fs` / middlewareMode、`optimizeDeps.*`、`preview.*` | config-dev | [references/config-dev/README.md](references/config-dev/README.md) |
| `build.target` / `build.lib` / `build.manifest` / `build.rolldownOptions` / `build.sourcemap` / `worker.*` | config-build | [references/config-build/README.md](references/config-build/README.md) |
| CSS・TypeScript・JSON・`import.meta.glob`・HMR・Web Workers・WASM・依存プリバンドル | features | [references/features/README.md](references/features/README.md) |
| `.env` と `import.meta.env`、モード、`public` ディレクトリ、アセット URL インポート | assets-env | [references/assets-env/README.md](references/assets-env/README.md) |
| 本番ビルドの調整、library mode、multi-page、`base`、Netlify / Vercel / GitHub Pages 等へのデプロイ、backend integration | build-deploy | [references/build-deploy/README.md](references/build-deploy/README.md) |
| SSR 構成、SSR dev server、SSR 本番ビルド、`ssr.*`、externals、プリレンダリング (SSG) | ssr | [references/ssr/README.md](references/ssr/README.md) |
| `createServer` / `build` / `preview` / `resolveConfig` / `loadEnv` / `mergeConfig` をコードから使う | javascript-api | [references/javascript-api/README.md](references/javascript-api/README.md) |
| プラグイン作成、`config` / `configureServer` / `transformIndexHtml` hook、`import.meta.hot` API、仮想モジュール | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| Environment API、`DevEnvironment`、`ModuleRunner`、`environments` 設定、`buildApp` / `createBuilder` | environment-api | [references/environment-api/README.md](references/environment-api/README.md) |
| v7 から v8 への移行、breaking changes、トラブルシュート、性能改善 | migration-troubleshooting | [references/migration-troubleshooting/README.md](references/migration-troubleshooting/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
