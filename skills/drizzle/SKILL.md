---
name: drizzle
description: >
  Drizzle ORM (TypeScript ORM, drizzle-orm / drizzle-kit) の API リファレンス。
  pgTable / mysqlTable / sqliteTable, `drizzle()`, `$inferSelect` / `$inferInsert`,
  RQB (Relational Queries) / `db.query`, `defineRelations`, magic `sql` operator,
  `drizzle-kit generate` / `push`, `drizzle.config.ts`,
  drizzle-zod, drizzle-seed, Drizzle Studio。SQL Server の低レベルドライバーは別スキル mssql。
user-invocable: false
---

# Drizzle ORM API リファレンス

Drizzle ORM / Drizzle Kit — TypeScript の headless ORM（対象バージョン
`drizzle-orm` / `drizzle-kit` **1.0.0-rc.5**。npm dist-tag `latest` の `0.45.2` は非対象、
`npm i drizzle-orm@rc` / `npm i -D drizzle-kit@rc` でインストールする。`drizzle-kit` は `drizzle-orm` と
独立バージョニングだが、本スキル対象時点では両者とも `1.0.0-rc.5`）。
`pgTable` / `mysqlTable` / `sqliteTable` によるスキーマ宣言、SQL-like クエリビルダーと
RQB (Relational Queries, `db.query`) の2系統のクエリ API、`drizzle-kit` CLI によるマイグレーション
（generate / migrate / push / pull）を中核とする API 設計・実装時に参照する。

SQL Server への低レベル接続（`tedious` / `msnodesqlv8` ドライバー本体）は別スキル `mssql` を参照する
（`references/column-types/mssql.md` / `references/connect/mssql.md` に距離線あり）。同様に
Supabase 本体の機能は `supabase`、zod 本体の API は `zod`、Upstash Redis クライアント本体は
`upstash` を参照する。

v0.x → v1.0 の破壊的変更は `references/migration/v0-v1-changes.md` に一覧があり、影響を受ける
個別ページ（`drizzle-kit/` の各コマンド、`relational-queries/rqb.md` / `relations.md`、
`column-types/mssql.md` / `cockroach.md`、`connect/mssql.md` 等）には `## Notes` に
`Migration (v0 → v1): ...` を per-page で明記している。

## ディレクトリ構成

```text
skills/drizzle/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      get-started.md
      why-drizzle.md
      gotchas.md
      faq.md
      sustainability.md
      latest-releases.md
    schema/
      README.md
      sql-schema-declaration.md
      indexes-constraints.md
      sequences.md
      views.md
      schemas.md
      extensions.md
      rls.md
      generated-columns.md
      custom-types.md
      codecs.md
    column-types/
      README.md
      pg.md
      mysql.md
      sqlite.md
      singlestore.md
      cockroach.md
      mssql.md
    connect/
      README.md
      connect-overview.md
      get-started-postgresql.md
      connect-neon.md
      connect-supabase.md
      connect-vercel-postgres.md
      connect-pglite.md
      connect-xata.md
      connect-nile.md
      connect-bun-sql.md
      connect-effect-postgres.md
      connect-netlify-db.md
      connect-aws-data-api-pg.md
      connect-prisma-postgres.md
      connect-planetscale-postgres.md
      connect-drizzle-proxy.md
      mysql-drivers.md
      sqlite-drivers.md
      mssql.md
      cockroach.md
      singlestore.md
    queries/
      README.md
      data-querying.md
      select.md
      insert.md
      update.md
      delete.md
      operators.md
      query-utils.md
      joins.md
      aliases.md
      sql.md
      sql-comments.md
    relational-queries/
      README.md
      rqb.md
      relations.md
      relations-schema-declaration.md
      relations-v1-v2.md
    drizzle-kit/
      README.md
      kit-overview.md
      drizzle-kit-generate.md
      drizzle-kit-migrate.md
      drizzle-kit-push.md
      drizzle-kit-pull.md
      drizzle-kit-export.md
      drizzle-kit-check.md
      drizzle-kit-up.md
      drizzle-kit-studio.md
      kit-custom-migrations.md
      kit-migrations-for-teams.md
      kit-web-mobile.md
      drizzle-config-file.md
    advanced/
      README.md
      transactions.md
      batch-api.md
      cache.md
      dynamic-query-building.md
      read-replicas.md
      set-operations.md
      jit-mappers.md
      perf-queries.md
      perf-serverless.md
    validations/
      README.md
      zod.md
      valibot.md
      typebox.md
      typebox-legacy.md
      arktype.md
      effect-schema.md
    extensions/
      README.md
      eslint-plugin.md
      graphql.md
    migration/
      README.md
      upgrade-v1.md
      v0-v1-changes.md
    seeding/
      README.md
      seed-overview.md
      seed-functions.md
      seed-versioning.md
      seed-limitations.md
  samples/
    README.md
    schema-definition.md
    rqb-avoid-n-plus-one.md
    cursor-pagination.md
    limit-offset-pagination.md
    transactions.md
    joins-partial-select.md
    include-exclude-columns.md
    drizzle-zod-validation.md
    read-replicas.md
    upstash-cache.md
    nextjs-neon-todo.md
    connect-supabase.md
    connect-neon.md
    seed-with-relations.md
    conditional-filters.md
    upsert.md
    count-rows.md
  scripts/
    README.md
    install.md
    drizzle-kit.md
    config.md
    studio.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール・クイックスタート・`generate` と `push` の違い・FAQ | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `pgTable` 等のテーブル宣言、index/constraint、sequence、view、schema 名前空間、RLS、generated column、custom type | schema | [references/schema/README.md](references/schema/README.md) |
| 方言別カラム型（PostgreSQL / MySQL / SQLite / SingleStore / CockroachDB / MSSQL）を調べたい | column-types | [references/column-types/README.md](references/column-types/README.md) |
| DB / ホスティング（Neon, Supabase, Vercel, PGlite, Xata, Nile, Bun, Effect, Netlify, AWS Data API, PlanetScale, drizzle-proxy）への接続方法、方言別ドライバー | connect | [references/connect/README.md](references/connect/README.md) |
| SQL-like な select / insert / update / delete、フィルタ演算子、join、alias、magic `sql` operator | queries | [references/queries/README.md](references/queries/README.md) |
| `db.query` (RQB)、`defineRelations`、`with` によるネストしたリレーション取得、v1 → v2 移行 | relational-queries | [references/relational-queries/README.md](references/relational-queries/README.md) |
| `drizzle-kit generate` / `migrate` / `push` / `pull` / `export` / `check` / `up` / `studio`、`drizzle.config.ts` | drizzle-kit | [references/drizzle-kit/README.md](references/drizzle-kit/README.md) |
| トランザクション、batch API、クエリキャッシュ、動的クエリ構築、read replica、集合演算、パフォーマンスチューニング | advanced | [references/advanced/README.md](references/advanced/README.md) |
| drizzle-zod / valibot / typebox / arktype / effect-schema によるスキーマ生成 | validations | [references/validations/README.md](references/validations/README.md) |
| eslint-plugin-drizzle、drizzle-graphql | extensions | [references/extensions/README.md](references/extensions/README.md) |
| v0.x → v1.0 の破壊的変更・アップグレード手順 | migration | [references/migration/README.md](references/migration/README.md) |
| drizzle-seed による決定的なフェイクデータ投入 | seeding | [references/seeding/README.md](references/seeding/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |

## 将来の拡張

`drizzle-orm` v1.0.0 GA リリース時（npm dist-tag `latest` が `1.0.0` になった時点）に
`/update-skill drizzle check` を実行する。
