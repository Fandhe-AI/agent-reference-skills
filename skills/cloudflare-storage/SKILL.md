---
name: cloudflare-storage
description: >
  Cloudflare 開発者プラットフォームのストレージ (Workers KV / D1 SQLite / R2 S3 互換 / Hyperdrive) の
  リファレンス。KVNamespace、D1Database prepare / batch / withSession、read replication、Time Travel、
  R2Bucket multipart、S3 互換 API、条件付き書き込み (If-None-Match)、ローカル開発 (local S3 endpoint)、presigned URL、event notifications、
  Hyperdrive 接続プール・クエリキャッシュ。
  ランタイムは cloudflare-workers、Wrangler は cloudflare-wrangler、Upstash Redis・Supabase とは別。
user-invocable: false
---

# Cloudflare ストレージ リファレンス

Cloudflare 開発者プラットフォームのストレージ 4 製品 — Workers KV（グローバル key-value）、D1（SQLite 互換 SQL データベース）、R2（S3 互換オブジェクトストレージ）、Hyperdrive（外部 Postgres / MySQL への接続プール・クエリキャッシュ）— を扱う。各製品の Workers バインディング API、設定、運用、制限、料金を参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `34d908abc615fdf22eeb386b171b9657b9abcf38` と取得日 2026-11-14 で pin（2026-11-03 の `d0995b91312add6db730afec4f4944cee834abc6` からの更新。この間に KV / D1 / R2 / Hyperdrive 配下で変更のあったページのみ再取得し、未変更ページは旧 pin の内容がそのまま有効）
- 2026-11-14 追従: D1 `PRAGMA defer_foreign_keys = off` の説明訂正・API error codes・analytics 範囲、R2 local development / Conditional operations（新規）・長さ既知ストリーム要件、Hyperdrive の advisory lock・Prisma ORM 8 例。KV は内容差なし（Wrangler / `cf` 切替表示のみ）
- 参考: wrangler 4.156.2（`wrangler kv` / `d1` / `r2` / `hyperdrive` コマンドの確認バージョン。npm latest 4.162.0 とのコマンド差分は未確認）
- 未追従: `local_dev.experimental_s3_credentials` を含む Wrangler 設定キー仕様（`workers/wrangler/configuration` の担当は cloudflare-wrangler）

## 他スキルとの使い分け

- cloudflare-workers: `env` / bindings の概念、service bindings、RPC、ランタイム API。本スキルは各ストレージ製品のバインディング API（`KVNamespace` / `D1Database` / `R2Bucket` / Hyperdrive の `connectionString`）のみ扱う
- cloudflare-wrangler: Wrangler 全般（install / dev / deploy / 設定ファイルのキー仕様 / テスト）。本スキルは製品別の `wrangler kv` / `d1` / `r2` / `hyperdrive` サブコマンドのみ扱う
- drizzle: Drizzle ORM 経由の D1 / Durable Objects 利用（`drizzle-orm/d1`）は drizzle が担当
- upstash: Redis / Vector は別製品。Workers KV とは別物
- supabase: Postgres / Storage は別製品（Hyperdrive の接続先としては利用可）
- mssql: Node.js 向け SQL Server クライアント。Hyperdrive は Postgres / MySQL 向けで別物
- vercel: Blob は別製品
- 同ファミリーの他製品: Durable Objects（SQLite storage を含む）/ Queues / Workflows は cloudflare-stateful、Vectorize / AI Search は cloudflare-ai、Pages Functions からの binding 利用は cloudflare-pages

## ディレクトリ構成

```text
skills/cloudflare-storage/
  SKILL.md
  references/
    kv/
      README.md
      overview.md
      get-started.md
      how-kv-works.md
      api-overview.md
      api-read.md
      api-write.md
      api-delete.md
      api-list.md
      kv-bindings.md
      kv-namespaces.md
      kv-commands.md
      environments.md
      event-subscriptions.md
      data-location.md
      data-security.md
      limits.md
      pricing.md
      metrics-analytics.md
      faq.md
      glossary.md
      release-notes.md
    d1/
      README.md
      overview.md
      get-started.md
      worker-binding-api.md
      d1-database.md
      prepared-statements.md
      return-objects.md
      sql-statements.md
      query-d1.md
      query-json.md
      generated-columns.md
      foreign-keys.md
      use-indexes.md
      migrations.md
      import-export-data.md
      time-travel.md
      backups-legacy.md
      read-replication.md
      retry-queries.md
      local-development.md
      remote-development.md
      environments.md
      wrangler-commands.md
      data-location.md
      data-security.md
      audit-logs.md
      debug-d1.md
      find-expensive-queries.md
      metrics-analytics.md
      alpha-migration.md
      community-projects.md
      limits.md
      pricing.md
      billing.md
      faq.md
      glossary.md
      release-notes.md
    r2/
      README.md
      overview.md
      how-r2-works.md
      get-started.md
      get-started-cli.md
      get-started-s3.md
      get-started-workers-api.md
      local-development.md
      buckets-create.md
      buckets-delete.md
      buckets-bucket-locks.md
      buckets-cors.md
      buckets-data-access-logs.md
      buckets-event-notifications.md
      buckets-local-uploads.md
      buckets-object-lifecycles.md
      buckets-public-buckets.md
      buckets-storage-classes.md
      objects-overview.md
      objects-upload.md
      objects-download.md
      objects-delete.md
      api-overview.md
      api-error-codes.md
      api-tokens.md
      s3-api-compatibility.md
      s3-conditional-operations.md
      s3-extensions.md
      s3-presigned-urls.md
      s3-temporary-credentials.md
      workers-api-reference.md
      workers-api-usage.md
      workers-multipart-usage.md
      data-migration-overview.md
      data-migration-strategies.md
      data-migration-sippy.md
      data-migration-super-slurper.md
      platform-audit-logs.md
      platform-event-subscriptions.md
      platform-limits.md
      platform-metrics-analytics.md
      platform-troubleshooting.md
      platform-release-notes.md
      reference-consistency.md
      reference-data-location.md
      reference-data-security.md
      reference-durability.md
      reference-snowflake-regions.md
      reference-unicode-interoperability.md
      wrangler-commands.md
      pricing.md
    hyperdrive/
      README.md
      overview.md
      get-started.md
      how-hyperdrive-works.md
      connection-lifecycle.md
      connection-pooling.md
      tune-connection-pool.md
      query-caching.md
      supported-databases-and-features.md
      connect-postgres-drivers.md
      connect-postgres-providers.md
      connect-mysql-drivers.md
      connect-mysql-providers.md
      planetscale.md
      python-workers.md
      connect-private-database-tunnel.md
      connect-private-database-vpc.md
      firewall-and-networking.md
      tls-ssl-certificates.md
      rotate-credentials.md
      local-development.md
      wrangler-commands.md
      metrics.md
      troubleshooting.md
      limits.md
      pricing.md
      faq.md
      release-notes.md
  samples/
    README.md
    kv-cache-data.md
    kv-distributed-config.md
    kv-request-routing.md
    kv-serve-static-assets.md
    kv-translated-responses.md
    d1-hono-worker.md
    d1-python-worker.md
    d1-remix-loader.md
    d1-sveltekit-endpoint.md
    d1-comments-api.md
    d1-http-proxy-api.md
    d1-rest-api-import.md
    d1-read-replication-sessions.md
    d1-prisma-orm.md
    r2-s3-aws-sdk-js-v3.md
    r2-s3-boto3.md
    r2-s3-aws4fetch.md
    r2-s3-aws-cli.md
    r2-rclone.md
    r2-workers-cache-api.md
    r2-event-notifications-log-sink.md
    r2-s3-auth-tokens.md
    r2-terraform-bucket.md
    hyperdrive-timescale-api.md
  scripts/
    README.md
    kv.md
    d1.md
    d1-migrations.md
    d1-time-travel.md
    r2.md
    r2-s3-clients.md
    hyperdrive.md
```

## 探索手順

タスクから製品カテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（kv / d1 / r2 / hyperdrive / samples / scripts）を探す
2. そのカテゴリの `references/{category}/README.md`（samples / scripts は直下の `README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| KV の概念・動作（結果整合性・キャッシュ）を知りたい | kv | [references/kv/README.md](references/kv/README.md) |
| KVNamespace の get / put / delete / list API を調べたい | kv | [references/kv/README.md](references/kv/README.md) |
| KV バインディング・名前空間・環境別設定を扱いたい | kv | [references/kv/README.md](references/kv/README.md) |
| KV の制限・料金・メトリクスを確認したい | kv | [references/kv/README.md](references/kv/README.md) |
| D1 を作成して最初のクエリを実行したい | d1 | [references/d1/README.md](references/d1/README.md) |
| D1Database の prepare / bind / batch / exec / withSession API を調べたい | d1 | [references/d1/README.md](references/d1/README.md) |
| D1 の SQL 文・JSON クエリ・インデックス・外部キーを扱いたい | d1 | [references/d1/README.md](references/d1/README.md) |
| D1 の migrations・import / export・Time Travel を扱いたい | d1 | [references/d1/README.md](references/d1/README.md) |
| D1 の read replication・リトライ・ローカル / リモート開発を設定したい | d1 | [references/d1/README.md](references/d1/README.md) |
| D1 の制限・料金・遅いクエリ調査を確認したい | d1 | [references/d1/README.md](references/d1/README.md) |
| R2 バケットの作成・CORS・lifecycle・公開設定・bucket locks を扱いたい | r2 | [references/r2/README.md](references/r2/README.md) |
| R2 をローカルで開発したい（local bucket / remote binding / ローカル S3 エンドポイント） | r2 | [references/r2/README.md](references/r2/README.md) |
| R2 の条件付き書き込み（If-None-Match / create-only / multipart 完了）を扱いたい | r2 | [references/r2/README.md](references/r2/README.md) |
| R2Bucket の get / put / list / multipart など Workers API を調べたい | r2 | [references/r2/README.md](references/r2/README.md) |
| R2 の S3 互換 API・presigned URL・一時認証情報・API トークンを扱いたい | r2 | [references/r2/README.md](references/r2/README.md) |
| R2 event notifications・Sippy / Super Slurper によるデータ移行を知りたい | r2 | [references/r2/README.md](references/r2/README.md) |
| R2 の制限・料金・整合性・耐久性を確認したい | r2 | [references/r2/README.md](references/r2/README.md) |
| Hyperdrive の仕組み・接続プール・query caching を知りたい | hyperdrive | [references/hyperdrive/README.md](references/hyperdrive/README.md) |
| Postgres / MySQL ドライバーから Hyperdrive 経由で接続したい | hyperdrive | [references/hyperdrive/README.md](references/hyperdrive/README.md) |
| プライベート DB（Tunnel / VPC）・TLS・認証情報ローテーションを設定したい | hyperdrive | [references/hyperdrive/README.md](references/hyperdrive/README.md) |
| Hyperdrive のトラブルシューティング・制限・料金を確認したい | hyperdrive | [references/hyperdrive/README.md](references/hyperdrive/README.md) |
| 典型的な使い方を知りたい（KV / D1 / R2 / Hyperdrive の実例） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド（wrangler kv / d1 / r2 / hyperdrive、aws CLI、rclone）を知りたい | scripts | [scripts/README.md](scripts/README.md) |
