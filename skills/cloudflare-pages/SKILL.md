---
name: cloudflare-pages
description: >
  Cloudflare Pages (静的サイト + Pages Functions、新規は Workers 推奨) の
  リファレンス。Pages Functions、onRequest / EventContext、_routes.json、advanced mode _worker.js、
  _headers / _redirects、preview / branch deployments。
  Workers + static assets は cloudflare-workers、Wrangler は cloudflare-wrangler、Vercel とは別。
user-invocable: false
---

# Cloudflare Pages リファレンス

> 分割 PR で順次追加中の部分版。現時点で収録済みなのは下記「ディレクトリ構成」とマッピング表に載っているカテゴリのみ。

公式トップは新規プロジェクトを Workers（static assets）で始めるよう推奨しており、移行手順は cloudflare-workers の static-assets/migrate-from-pages を参照する。本スキルは既存の Pages プロジェクトの保守・移行元の理解を主眼に、Pages Functions（ファイルベースルーティング、`onRequest` ハンドラー、`EventContext`、middleware、plugins）、`_routes.json` / `_headers` / `_redirects`、ビルド設定、Git integration / Direct Upload、preview deployments、フレームワーク別デプロイガイドを扱う。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin
- 参考: wrangler 4.156.2 系（`wrangler pages` コマンドの確認バージョン）

## 他スキルとの使い分け

- cloudflare-workers: Workers ランタイム API、bindings 概念、static assets（Workers + static assets）、Pages からの移行手順。新規プロジェクトの推奨先
- cloudflare-wrangler: Wrangler 全般。`wrangler pages` サブコマンドの全フラグは cloudflare-wrangler の commands/pages.md。本スキルは Pages 運用の文脈で使うコマンドのみ `scripts/` に収録
- cloudflare-storage: KV / D1 / R2 / Hyperdrive のバインディング API。Pages Functions からの利用方法（bindings の設定）は本スキル、各製品の API は cloudflare-storage
- cloudflare-stateful: Durable Objects 等のステートフル製品。Pages Functions からの bindings 設定のみ本スキル
- nextjs-app / react-router / hono / vite: フレームワーク・ビルドツール本体の API。本スキルは Cloudflare Pages へのデプロイ手順のみ扱う
- vercel: 別プラットフォーム。Vercel からの移行ガイドのみ本スキルに収録
- cloudflare-stateful は同ファミリーの分割 PR で順次追加中。未マージの間は公式 docs（cloudflare-stateful: https://developers.cloudflare.com/durable-objects/ ・ /queues/ ・ /workflows/）を参照

## ディレクトリ構成

```text
skills/cloudflare-pages/
  SKILL.md
  references/
    functions/
      README.md
      advanced-mode.md
      api-reference.md
      bindings-data.md
      bindings-env-secrets.md
      bindings-services.md
      bindings.md
      debugging-and-logging.md
      event-context.md
      example-ab-testing.md
      example-cors-headers.md
      get-started.md
      invocation-routes.md
      local-development.md
      metrics.md
      middleware.md
      module-support.md
      plugins-integrations.md
      plugins-security.md
      plugins.md
      pricing.md
      routing.md
      smart-placement.md
      source-maps.md
      typescript.md
      wrangler-configuration-keys.md
      wrangler-configuration.md
    configuration/
      README.md
      api.md
      branch-build-controls.md
      build-caching.md
      build-configuration.md
      build-image.md
      build-watch-paths.md
      custom-domains.md
      debugging-pages.md
      deploy-hooks.md
      early-hints.md
      git-integration-troubleshooting.md
      git-integration.md
      github-integration.md
      gitlab-integration.md
      headers.md
      monorepos.md
      preview-deployments.md
      redirects.md
      rollbacks.md
      serving-pages.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（functions / configuration）を探す
2. そのカテゴリの `references/{category}/README.md`を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Pages Functions を始めたい（ファイルベースルーティング・`onRequest`） | functions | [references/functions/README.md](references/functions/README.md) |
| `EventContext`・middleware・plugins の API を調べたい | functions | [references/functions/README.md](references/functions/README.md) |
| `_routes.json`・Functions の呼び出しルートを制御したい | functions | [references/functions/README.md](references/functions/README.md) |
| advanced mode（`_worker.js`）や bindings・wrangler 設定ファイルを設定したい | functions | [references/functions/README.md](references/functions/README.md) |
| Functions のローカル開発・デバッグ・料金・Smart Placement を知りたい | functions | [references/functions/README.md](references/functions/README.md) |
| ビルド設定・ビルドキャッシュ・monorepo・watch paths を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| `_headers` / `_redirects`・Early Hints・配信挙動を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| preview / branch deployments・rollbacks・deploy hooks を扱いたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| GitHub / GitLab の Git integration・カスタムドメイン・Pages API を使いたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
