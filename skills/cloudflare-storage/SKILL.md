---
name: cloudflare-storage
description: >
  Cloudflare 開発者プラットフォームのストレージ (Workers KV / D1 SQLite) の
  リファレンス。KVNamespace、D1Database prepare / batch / withSession、read replication、Time Travel。
  Wrangler は cloudflare-wrangler、Upstash Redis・Supabase とは別。
user-invocable: false
---

# Cloudflare ストレージ リファレンス

> 分割 PR で順次追加中の部分版。現時点で収録済みなのは下記「ディレクトリ構成」とマッピング表に載っているカテゴリのみ。

Cloudflare 開発者プラットフォームのストレージ 4 製品 — Workers KV（グローバル key-value）、D1（SQLite 互換 SQL データベース）、R2（S3 互換オブジェクトストレージ）、Hyperdrive（外部 Postgres / MySQL への接続プール・クエリキャッシュ）— を扱う。各製品の Workers バインディング API、設定、運用、制限、料金を参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin
- 参考: wrangler 4.156.2（`wrangler kv` / `d1` / `r2` / `hyperdrive` コマンドの確認バージョン）

## 他スキルとの使い分け

- cloudflare-workers: `env` / bindings の概念、service bindings、RPC、ランタイム API。本スキルは各ストレージ製品のバインディング API（`KVNamespace` / `D1Database` / `R2Bucket` / Hyperdrive の `connectionString`）のみ扱う
- cloudflare-wrangler: Wrangler 全般（install / dev / deploy / 設定ファイルのキー仕様 / テスト）。本スキルは製品別の `wrangler kv` / `d1` / `r2` / `hyperdrive` サブコマンドのみ扱う
- drizzle: Drizzle ORM 経由の D1 / Durable Objects 利用（`drizzle-orm/d1`）は drizzle が担当
- upstash: Redis / Vector は別製品。Workers KV とは別物
- supabase: Postgres / Storage は別製品（Hyperdrive の接続先としては利用可）
- mssql: Node.js 向け SQL Server クライアント。Hyperdrive は Postgres / MySQL 向けで別物
- vercel: Blob は別製品
- 未収録の Cloudflare 製品（Durable Objects / Queues / Workflows / Vectorize 等）は公式 docs を参照
- cloudflare-workers は同ファミリーの分割 PR で順次追加中。未マージの間は公式 docs（cloudflare-workers: https://developers.cloudflare.com/workers/runtime-apis/）を参照

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
```

## 探索手順

タスクから製品カテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（kv / d1）を探す
2. そのカテゴリの `references/{category}/README.md`を参照して目的のページを特定する
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
