---
source: https://orm.drizzle.team/docs/kit-overview
---

# drizzle-kit

Drizzle Kit CLI commands for managing SQL migrations, schema push/pull, and Drizzle Studio.

Migration (v0 → v1): `drizzle-kit drop` command has been removed. `meta/_journal.json` is no longer used; migrations now use DDL snapshot-based history stored alongside each migration folder.

## generate — SQL マイグレーションファイルの生成

```sh
npx drizzle-kit generate
```

```sh
npx drizzle-kit generate --dialect=postgresql --schema=./src/schema.ts
```

Custom migration file name:

```sh
npx drizzle-kit generate --name=init
```

Empty custom migration file (for hand-written SQL / seeding):

```sh
npx drizzle-kit generate --custom --name=seed-users
```

Skip commutativity conflict checks:

```sh
npx drizzle-kit generate --ignore-conflicts
```

Use a specific config file:

```sh
npx drizzle-kit generate --config=drizzle-dev.config.ts
```

CLI-only options: `dialect`(必須), `schema`(必須), `driver`, `out`, `config`, `breakpoints`, `custom`, `name`, `ignore-conflicts`。

## migrate — 生成済みマイグレーションの適用

```sh
npx drizzle-kit migrate
```

```sh
npx drizzle-kit migrate --dialect=postgresql --url=postgresql://user:password@host:port/dbname
```

Use a specific config file:

```sh
npx drizzle-kit migrate --config=drizzle-prod.config.ts
```

Applied-migrations log table/schema is configured via `migrations.table` / `migrations.schema` in `drizzle.config.ts` (defaults: `__drizzle_migrations` / `drizzle`).

## push

> **警告**: `push` は差分に基づき DDL をデータベースへ直接適用する。`--force` は data-loss を伴う変更も自動承認するため、本番データベースに対する実行前に `--explain`（dry run）で計画内容を確認する。

```sh
npx drizzle-kit push
```

```sh
npx drizzle-kit push --dialect=postgresql --schema=./src/schema.ts --url=postgresql://user:password@host:port/dbname
```

Dry run（適用せず計画のみ表示）:

```sh
npx drizzle-kit push --explain
```

全 SQL 文を実行前に表示:

```sh
npx drizzle-kit push --verbose
```

data-loss を伴う変更を自動承認:

```sh
npx drizzle-kit push --force
```

CLI-only options: `verbose`, `explain`, `force`。設定オプション: `dialect`(必須), `schema`(必須), `driver`, `tablesFilter`, `schemaFilter`, `extensionsFilters`, `url`, `user`, `password`, `host`, `port`, `database`, `config`。

## pull — 既存データベースからのスキーマ取得（introspect）

```sh
npx drizzle-kit pull
```

```sh
npx drizzle-kit pull --dialect=postgresql --url=postgresql://user:password@host:port/dbname
```

Pull した内容を初期マイグレーションとして記録（以降の差分は初回スキーマ基準になる）:

```sh
npx drizzle-kit pull --init
```

CLI-only options: `dialect`(必須), `driver`, `out`, `url`, `user`, `password`, `host`, `port`, `database`, `config`, `introspect-casing`, `tablesFilter`, `schemaFilter`, `extensionsFilters`。

## export — スキーマの SQL DDL 出力

```sh
npx drizzle-kit export
```

```sh
npx drizzle-kit export --dialect=postgresql --schema=./src/schema.ts
```

SQL 表現の出力を明示指定:

```sh
npx drizzle-kit export --sql=true
```

## check — マイグレーション履歴の整合性検証

複数開発者が別ブランチでスキーマを変更する場合の衝突検知に使う。

```sh
npx drizzle-kit check
```

```sh
npx drizzle-kit check --dialect=postgresql
```

```sh
npx drizzle-kit check --dialect=postgresql --out=./migrations-folder
```

Skip commutativity conflict checks:

```sh
npx drizzle-kit check --ignore-conflicts
```

## up — スナップショットのアップグレード

内部スナップショット形式が破壊的変更された場合に、既存マイグレーションのスナップショットを新バージョンへアップグレードする。

```sh
npx drizzle-kit up
```

```sh
npx drizzle-kit up --dialect=postgresql
```

```sh
npx drizzle-kit up --dialect=postgresql --out=./migrations-folder
```

## studio — Drizzle Studio の起動

`drizzle-kit studio` の詳細は `studio.md` を参照。

```sh
npx drizzle-kit studio
```
