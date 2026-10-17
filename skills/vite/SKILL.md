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

> 分割 PR の途中段階。現在収録済み: references/{assets-env, build-deploy, config-build, config-dev, config-shared}。description に挙げた残りのカテゴリは後続 PR で追加し、最終 PR でこの行を削除する。

対象バージョン Vite v8.3.4 (GitHub tag `vitejs/vite` `v8.3.4` = npm latest, published 2026-10-08; fetched 2026-10-16)。
本文の出典は `raw.githubusercontent.com/vitejs/vite/v8.3.4/docs/**`。`main` は 33 commits 先行し docs 8 ファイルが変更されているため使用しない。vite.dev のページと `.md` twin は `main` からデプロイされるため、source URL とアンカー実測にのみ使用している。

## ディレクトリ構成

```text
skills/vite/
  SKILL.md
  references/
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
    assets-env/             # 静的アセット・環境変数・モード
      README.md
      env-variables.md / built-in-constants.md / modes.md / public-directory.md ほか
    build-deploy/           # ビルド・デプロイ・library mode・backend integration
      README.md
      library-mode.md / multi-page-app.md / public-base-path.md / backend-integration.md
      deploy-netlify-vercel.md / deploy-github-gitlab.md ほか
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| `vite.config` の書き方、`root` / `base` / `mode`、`resolve.alias`、`define`、`css.*`、`future` | config-shared | [references/config-shared/README.md](references/config-shared/README.md) |
| `server.proxy` / `server.hmr` / `server.fs` / middlewareMode、`optimizeDeps.*`、`preview.*` | config-dev | [references/config-dev/README.md](references/config-dev/README.md) |
| `build.target` / `build.lib` / `build.manifest` / `build.rolldownOptions` / `build.sourcemap` / `worker.*` | config-build | [references/config-build/README.md](references/config-build/README.md) |
| `.env` と `import.meta.env`、モード、`public` ディレクトリ、アセット URL インポート | assets-env | [references/assets-env/README.md](references/assets-env/README.md) |
| 本番ビルドの調整、library mode、multi-page、`base`、Netlify / Vercel / GitHub Pages 等へのデプロイ、backend integration | build-deploy | [references/build-deploy/README.md](references/build-deploy/README.md) |
