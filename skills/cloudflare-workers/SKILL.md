---
name: cloudflare-workers
description: >
  Cloudflare Workers (V8 isolate サーバーレス実行環境, workerd) の API リファレンス。
  fetch / scheduled / tail handler, waitUntil, WorkerEntrypoint RPC, service bindings,
  compatibility flags (nodejs_compat), HTMLRewriter, Cache API, static assets, cron triggers,
  framework guides (Hono / Next.js / Astro / SvelteKit / Nuxt), wrangler types。
  Wrangler は cloudflare-wrangler、KV / D1 / R2 は cloudflare-storage。
user-invocable: false
---

# Cloudflare Workers リファレンス

Cloudflare Workers — V8 isolate 上でコードを実行するサーバーレス実行環境（ランタイム workerd）。
ハンドラー（fetch / scheduled / tail）、env bindings と RPC、Web 標準 API と Node.js 互換 API、
compatibility date / flag、ルーティング・static assets、言語別ガイド、フレームワーク別デプロイ手順を中核とする
Workers アプリの設計・実装時に参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin
- 参考版数: `@cloudflare/workers-types` 5.20261103.1、wrangler 4.156.2（CLI の仕様は cloudflare-wrangler が担当）

## 他スキルとの使い分け

- cloudflare-wrangler: Wrangler CLI コマンド、`wrangler.jsonc` のキー仕様、`wrangler dev` / remote bindings、`@cloudflare/vite-plugin`、Vitest 統合 / Miniflare、Workers Builds / versions / gradual deployments、observability
- cloudflare-storage: KV / D1 / R2 / Hyperdrive の binding API と wrangler サブコマンド
- binding の配置: env / bindings の概念・一覧、service bindings、RPC、secrets は本スキル（`bindings-rpc`）。各ストレージの API は cloudflare-storage
- 同ファミリーの他製品: Durable Objects / Queues / Workflows は cloudflare-stateful、Workers AI / AI Gateway / Vectorize / AI Search は cloudflare-ai、Pages / Pages Functions は cloudflare-pages、Sandbox SDK / Containers は cloudflare-sandbox-containers、Agents SDK（Cloudflare 上の MCP サーバーを含む）は cloudflare-agents。本スキルは各製品の binding 一覧・ハンドラー入口のみ扱う
- フレームワーク本体の API は hono / react-router / tanstack-start / nextjs-app / react / vite スキルが担当。`framework-guides` は Cloudflare 側のデプロイ要点のみ

## ディレクトリ構成

`references/` `samples/` `scripts/` 配下の全 `.md` を列挙する（README.md を先頭、以降アルファベット順）。

```text
skills/cloudflare-workers/
  SKILL.md
  references/
    handlers-context/
      README.md
      connect.md
      context.md
      fetch.md
      handlers-overview.md
      runtime-apis-overview.md
      scheduled.md
      tail.md
    bindings-rpc/
      README.md
      analytics-sql.md
      bindings-overview.md
      environment-variables.md
      mtls.md
      rate-limit.md
      rpc.md
      rpc-lifecycle.md
      rpc-typescript.md
      rpc-visibility.md
      secrets.md
      service-bindings.md
      service-bindings-http.md
      service-bindings-rpc.md
      version-metadata.md
    web-apis/
      README.md
      cache.md
      console.md
      encoding.md
      eventsource.md
      fetch.md
      headers.md
      html-rewriter.md
      messagechannel.md
      performance.md
      readablestream.md
      readablestream-byob-reader.md
      readablestream-default-reader.md
      request.md
      response.md
      scheduler.md
      streams.md
      tcp-sockets.md
      transformstream.md
      web-crypto.md
      web-standards.md
      webassembly.md
      webassembly-javascript.md
      websockets.md
      writablestream.md
      writablestream-default-writer.md
    nodejs-compat/
      README.md
      assert.md
      asynclocalstorage.md
      buffer.md
      crypto-zlib.md
      diagnostics-channel.md
      dns.md
      eventemitter.md
      fs.md
      http.md
      https.md
      net.md
      overview.md
      path.md
      process.md
      streams.md
      string-decoder.md
      test.md
      timers.md
      tls.md
      url.md
      util.md
    configuration/
      README.md
      cloudflare-access.md
      compatibility-dates.md
      compatibility-flags.md
      compatibility-flags-nodejs.md
      compatibility-flags-platform.md
      compatibility-flags-web-platform.md
      cron-triggers.md
      custom-domains.md
      integrations.md
      multipart-upload-metadata.md
      overview.md
      placement.md
      routes.md
      routing-overview.md
      workers-dev.md
      workers-sites.md
      workers-with-page-rules.md
    static-assets/
      README.md
      billing-and-limitations.md
      binding.md
      direct-upload.md
      get-started.md
      headers.md
      migrate-from-netlify.md
      migrate-from-pages.md
      migrate-from-vercel.md
      overview.md
      redirects.md
      routing-full-stack-application.md
      routing-html-handling.md
      routing-serving-a-subdirectory.md
      routing-single-page-application.md
      routing-static-site-generation.md
      routing-worker-script.md
    languages/
      README.md
      python.md
      python-basics.md
      python-django.md
      python-examples.md
      python-fastapi.md
      python-ffi.md
      python-flask.md
      python-how-it-works.md
      python-langchain.md
      python-packages.md
      python-stdlib.md
      rust.md
      typescript.md
    platform/
      README.md
      best-practices.md
      changelog.md
      claim-deployments.md
      deploy-buttons.md
      get-started-cli.md
      get-started-dashboard.md
      how-the-cache-works.md
      how-workers-works.md
      infrastructure-as-code.md
      known-issues.md
      limits.md
      migrate-to-module-workers.md
      overview.md
      playground.md
      pricing.md
      prompting.md
      roles-and-permissions.md
      security-model.md
      storage-options.md
      workers-roles-and-permissions.md
    cache-databases/
      README.md
      connecting-to-databases.md
      mongodb.md
      neon.md
      planetscale.md
      supabase.md
      third-party-integrations.md
      turso.md
      upstash.md
      workers-cache.md
      workers-cache-configuration.md
      workers-cache-debugging.md
      workers-cache-examples.md
      workers-cache-keys.md
      workers-cache-limitations.md
      workers-cache-purge.md
      xata.md
    framework-guides/
      README.md
      astro.md
      automatic-configuration.md
      hono.md
      microfrontends.md
      nextjs-vinext.md
      nuxt.md
      opennext.md
      overview.md
      react-router.md
      react-vite.md
      redwoodsdk.md
      sveltekit.md
      tanstack-start.md
      vike.md
  samples/
    README.md
    ab-testing.md
    alter-headers.md
    basic-auth.md
    bulk-redirects.md
    cache-api.md
    cache-post-request.md
    cache-using-fetch.md
    cors-header-proxy.md
    country-code-redirect.md
    cron-trigger.md
    extract-cookie-value.md
    fetch-json.md
    geolocation-hello-world.md
    hot-link-protection.md
    multiple-cron-triggers.md
    post-json.md
    redirect.md
    respond-with-another-site.md
    return-json.md
    rewrite-links.md
    security-headers.md
    signing-requests.md
    streaming-json.md
    turnstile-html-rewriter.md
    websockets.md
  scripts/
    README.md
    create-project.md
    languages.md
    static-assets.md
    types.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実装例が必要なら `samples/README.md`、プロジェクト作成・型生成などのコマンドは `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| fetch / scheduled / tail handler の署名を知りたい | handlers-context | [references/handlers-context/README.md](references/handlers-context/README.md) |
| `ctx.waitUntil` / `passThroughOnException` を使いたい | handlers-context | [references/handlers-context/README.md](references/handlers-context/README.md) |
| env bindings・環境変数・secrets を扱いたい | bindings-rpc | [references/bindings-rpc/README.md](references/bindings-rpc/README.md) |
| service bindings・`WorkerEntrypoint` RPC を使いたい | bindings-rpc | [references/bindings-rpc/README.md](references/bindings-rpc/README.md) |
| Rate Limiting・mTLS・Analytics binding を調べたい | bindings-rpc | [references/bindings-rpc/README.md](references/bindings-rpc/README.md) |
| Request / Response / Headers / `fetch` の仕様を調べたい | web-apis | [references/web-apis/README.md](references/web-apis/README.md) |
| HTMLRewriter・Cache API・WebSocket・TCP sockets・Streams を使いたい | web-apis | [references/web-apis/README.md](references/web-apis/README.md) |
| Web Crypto・WebAssembly を使いたい | web-apis | [references/web-apis/README.md](references/web-apis/README.md) |
| `nodejs_compat` で使える Node.js API を知りたい | nodejs-compat | [references/nodejs-compat/README.md](references/nodejs-compat/README.md) |
| `node:buffer` / `node:crypto` / `node:http` 等の対応範囲を確認したい | nodejs-compat | [references/nodejs-compat/README.md](references/nodejs-compat/README.md) |
| compatibility date / flag の設定を調べたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| routes・custom domains・workers.dev・cron triggers を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Smart Placement を使いたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| static assets の配信・binding・routing を設定したい | static-assets | [references/static-assets/README.md](references/static-assets/README.md) |
| `_headers` / `_redirects`・SPA ルーティング・Pages からの移行を知りたい | static-assets | [references/static-assets/README.md](references/static-assets/README.md) |
| TypeScript / Python / Rust で Worker を書きたい | languages | [references/languages/README.md](references/languages/README.md) |
| Python Workers (FastAPI / Flask / パッケージ / FFI) を使いたい | languages | [references/languages/README.md](references/languages/README.md) |
| 制限・料金・実行モデル・セキュリティモデルを確認したい | platform | [references/platform/README.md](references/platform/README.md) |
| 既知の問題・changelog・CLI / dashboard での開始手順を知りたい | platform | [references/platform/README.md](references/platform/README.md) |
| Workers でのキャッシュ制御・外部データベース接続を知りたい | cache-databases | [references/cache-databases/README.md](references/cache-databases/README.md) |
| Neon / PlanetScale / Supabase / Turso / Upstash 等と接続したい | cache-databases | [references/cache-databases/README.md](references/cache-databases/README.md) |
| Hono / React Router / Astro / SvelteKit / Nuxt 等を Workers にデプロイしたい | framework-guides | [references/framework-guides/README.md](references/framework-guides/README.md) |
| 典型的な使い方（cron・リダイレクト・キャッシュ・認証等）を知りたい | samples | [samples/README.md](samples/README.md) |
| プロジェクト作成・型生成のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
