# Supabase CLI: データベースコマンド

## Signature / Usage

```bash
supabase db <command> [flags]
```

各コマンドは以下の節に記載する。

## supabase db diff

ローカルデータベースのスキーマ変更を差分として検出し、マイグレーション SQL を生成する。

```bash
supabase db diff
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `-f, --file <name>` | 出力マイグレーションファイル名 |
| `--schema <schemas>` | 対象スキーマ（カンマ区切り。デフォルト: `public`） |
| `--remote` | リモートプロジェクトとの差分（CLI v3。`--from` / `--to` とは併用不可） |
| `--linked` | deprecated（v3、v4 で削除）。`--remote` を使用 |
| `--use-migra` | migra ツールを使用（デフォルト: pgAdmin） |
| `--use-pg-schema` | 削除（v3 で削除済み） |

### 使用例

```bash
# ローカル変更を標準出力に表示
supabase db diff

# マイグレーションファイルとして保存
supabase db diff -f add_users_table

# 特定スキーマのみ
supabase db diff --schema public,auth

# リモートとの差分
supabase db diff --remote

# リモートとの差分をマイグレーションファイルに保存
supabase db diff --remote -f sync_remote_changes
```

### 出力例

```sql
-- diff output
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.users OWNER TO postgres;

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
```

## supabase db dump

リモートデータベースのスキーマまたはデータをダンプする。

```bash
supabase db dump --remote
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `-f, --file <path>` | 出力ファイルパス |
| `--data-only` | データのみダンプ（スキーマなし） |
| `--role-only` | ロール定義のみダンプ |
| `--remote` | リモートデータベースをダンプ（CLI v3。ローカルが既定） |
| `--schema <schema>` | 対象スキーマ |
| `--use-copy` | COPY 文を使用（大量データ向け） |
| `--keep-comments` | コメントを保持 |

### 使用例

```bash
# リモートのスキーマをファイルに出力
supabase db dump --remote -f schema.sql

# データのみダンプ
supabase db dump --remote --data-only -f data.sql

# ロールのみダンプ
supabase db dump --remote --role-only -f roles.sql

# 特定スキーマのみ
supabase db dump --remote --schema public -f public_schema.sql
```

`--remote` を省くとローカル DB のダンプになる（v3 の既定）。

## supabase db lint

データベーススキーマの問題を検出する。plpgsql_check 拡張を使用。

```bash
supabase db lint
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--schema <schemas>` | 対象スキーマ（カンマ区切り） |
| `--level <level>` | 出力レベル（`warning`, `error`。既定 `warning`） |
| `--remote` | リモートデータベースをリント（CLI v3。ローカルが既定） |
| `--fail-on <none\|warning\|error>` | 指定レベル以上で非ゼロ終了（既定 `none`） |

### 使用例

```bash
# 全スキーマをリント
supabase db lint

# 特定スキーマ
supabase db lint --schema public

# エラーのみ表示
supabase db lint --level error
```

### 出力例

```
WARN: function "get_user" has unused parameter "user_id"
  at supabase/migrations/20240101000000_create_functions.sql:5
ERROR: relation "nonexistent_table" does not exist
  at supabase/migrations/20240102000000_add_view.sql:3
```

## supabase db pull

リモートデータベースからスキーマをマイグレーションとして取得する。初回リンク後にリモートのスキーマをローカルに同期する際に使用。

```bash
supabase db pull --remote
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--remote` | リモートデータベースから取得（CLI v3。ローカルが既定のためリモートからの pull には必要） |
| `--yes` | 確認プロンプトを承認（非対話・JSON・agent 実行では必須） |
| `--schema <schemas>` | 対象スキーマ（カンマ区切り） |
| `--declarative` | schema ファイル（既定 `supabase/schemas/`）を選択した DB から置き換える。migration は作成せず migration history にも触れない |
| `--diff-engine <pg-delta\|migra>` | 1 回の実行で diff エンジンを切り替える |

### 使用例

```bash
# リモートスキーマを取得
supabase db pull --remote

# 特定スキーマのみ
supabase db pull --remote --schema public,auth

# 宣言的スキーマのツリーをリモートから更新（pg-delta 前提）
supabase db pull --remote --declarative
```

### Notes

- `--declarative` は `[experimental.pgdelta]` の設定に関係なく実行できるが、pg-delta でのみ使うこと。legacy migra エンジンでは `[db.migrations].schema_paths` が書き換えられ、次回の `db diff` が失敗する（出典: Declarative database schemas ガイド / Diff engines ガイド）
- migration history が空の初回 pull の挙動は diff エンジンで異なる（pg-delta: 空の shadow DB との diff、migra: `pg_dump`）

### 動作

1. リモートデータベースのスキーマをダンプ
2. `supabase/migrations/` ディレクトリに新しいマイグレーションファイルを生成
3. リモートのマイグレーション履歴をローカルに同期

## supabase db push

ローカルのマイグレーションをリモートデータベースに適用する。

```bash
supabase db push --remote
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--remote` | リモートデータベースへ適用（CLI v3。ローカルが既定のためリモート適用には必要） |
| `--yes` | 確認プロンプトを承認（非対話・JSON・agent 実行では必須） |
| `--dry-run` | 実行せずに適用されるマイグレーションを表示 |
| `--include-all` | 既にリモートで適用済みのものも含めて実行 |
| `--include-roles` | ロール定義も含めて適用 |
| `--include-seed` | seed.sql も実行 |
| `--password <password>` | DB パスワード |

### 使用例

```bash
# マイグレーションをリモートに適用
supabase db push --remote

# ドライラン（確認のみ）
supabase db push --remote --dry-run

# シードデータも含めて適用
supabase db push --remote --include-seed

# パスワード指定
supabase db push --remote --password your-db-password
```

### 出力例

```
Applying migration 20240101000000_create_users.sql...
Applying migration 20240102000000_add_posts.sql...
Finished supabase db push.
```

## supabase db reset

ローカルデータベースをリセットする。全てのマイグレーションを最初から再適用し、seed.sql を実行する。

```bash
supabase db reset
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--remote` | リモートデータベースをリセット（CLI v3。注意: データが全削除される） |
| `--linked` | deprecated（v3、v4 で削除）。`--remote` を使用 |
| `--yes` | 確認プロンプトを承認（非対話・JSON・agent 実行では必須） |
| `--no-seed` | seed を実行しない |
| `--version <version>` | 指定したバージョンまでのマイグレーションのみ適用 |

### 使用例

```bash
# ローカル DB リセット
supabase db reset

# 特定バージョンまでのマイグレーションのみ適用
supabase db reset --version 20240101000000
```

### 動作

1. ローカルデータベースを削除・再作成
2. `supabase/migrations/` 内の全マイグレーションを順に適用
3. `supabase/seed.sql` を実行（存在する場合）

## supabase db start

Starts local Postgres database.

```bash
supabase db start [flags]
```

ローカル開発スタックは `supabase start` または `supabase db start` で起動する（`db lint` 等の前提として公式 CLI リファレンスに記載）。フラグ表は公式 CLI リファレンスに無く、v2.121.0 のソースでも確認していないため記載しない。

## supabase db schema declarative sync

Generate a new migration from declarative schema.

```bash
supabase db schema declarative sync [flags]
```

Generate a new migration by diffing your declarative schema files against the current migration state. When no declarative schema exists yet, the command offers to run `generate` first. After computing the diff, you can optionally name the migration and apply it to the local database.

Requires `--experimental` flag or `[experimental.pgdelta] enabled = true` in config.

### フラグ

| フラグ | 説明 |
|-------|------|
| `-s, --schema <schemas>` | Comma separated list of schema to include. |
| `-f, --file <name>` | Saves schema diff to a new migration file. |
| `--name <name>` | Name for the generated migration file. |
| `--apply` | Apply the generated migration to the local database without prompting. |
| `--no-apply` | Generate the migration file without prompting or applying it to the local database. |

### 使用例

```bash
supabase db schema declarative sync -f add_age --no-apply
```

### Notes

- `--apply` と `--no-apply` は排他（ソース上のコメント）。`--apply` / グローバル `--yes` はローカル DB へ適用し、非対話実行はファイルを書いて適用をスキップする
- under pg-delta, `db diff` は `supabase/schemas/` を baseline に使わない。schema ファイルから migration を作るには `db schema declarative sync` を使う（`db diff` は live DB と migrations の差分を取る）
- `sync` は schema ファイルと migration history を比較し、live DB は読まない

## supabase db schema declarative generate

Generate declarative schema from a database.

```bash
supabase db schema declarative generate [flags]
```

Exports the schema of a live database (local, linked, or custom URL) into SQL files under the declarative schema directory. This is the entrypoint for bootstrapping declarative mode. Requires `--experimental` flag or `[experimental.pgdelta] enabled = true` in config.

### フラグ

| フラグ | 説明 |
|-------|------|
| `--overwrite` | Overwrite declarative schema files without confirmation.（既定: false） |
| `--output-dir <dir>` | Write the generated declarative schema to this directory without changing the configured declarative schema path. |
| `--reset` | Reset local database before generating (local data will be lost).（既定: false） |
| `-s, --schema <schemas>` | Comma separated list of schema to include. |
| `--remote` | Generates declarative schema from the remote database（CLI v3。`--remote=<url>` で接続文字列を指定）。 |
| `--db-url <url>` | Generates declarative schema from the database specified by the connection string (must be percent-encoded). v3 で deprecated（v4 で削除）、`--remote=<url>` を使用。 |
| `--linked` | Generates declarative schema from the linked project. v3 で deprecated（v4 で削除）、`--remote` を使用。 |
| `--local` | Generates declarative schema from the local database. v3 で deprecated（v4 で削除）、ローカルが既定。 |
| `-p, --password <password>` | Password to your remote Postgres database. |

### 出力レイアウト

- pg-delta engine は schema ごとに 1 ディレクトリを書く（`supabase/schemas/public/tables/users.sql`、`supabase/schemas/public/schema.sql`）
- どの schema にも属さない cluster レベルのオブジェクトは予約ディレクトリ `_cluster/` 配下（`supabase/schemas/_cluster/roles.sql`）
- platform 既定 grant（`anon` / `authenticated` / `service_role`）に overlay `REVOKE ALL` が要る場合、schema の `schema.sql` の後に `adp_wipes.sql` を書く（cluster 全体の overlay は `_cluster/adp_wipes.sql`）
- `_cluster` / `_custom` という名前の schema は先頭のアンダースコアが percent-encode される（`%5Fcluster/`）
- pg-delta が扱わない手書き SQL は `_custom/` に置く。export は `_custom/` に書かず prune もしない

### Notes

- migration ファイルは作らず、migration history も更新しない。宣言ファイルのみを置き換える
- 非対話実行では対象を明示する（v3 ではローカルが既定、リモートは `--remote`。`--local` / `--linked` / `--db-url` は deprecated）
- 出力 SQL は `db pull` と同じ既定フォーマット（大文字キーワード、indent 2、width 180）。`[experimental.pgdelta] format_options` で変更、`format_options = "null"` で raw statements

## コマンド使い分けガイド

| シナリオ | コマンド |
|---------|---------|
| ローカルで GUI 操作後にマイグレーション生成 | `supabase db diff -f <name>` |
| リモートの現在のスキーマを取得 | `supabase db pull --remote` |
| ローカルのマイグレーションをリモートに適用 | `supabase db push --remote` |
| ローカルをクリーンな状態に戻す | `supabase db reset` |
| リモートの完全なスキーマダンプ | `supabase db dump --remote -f schema.sql` |
| スキーマの問題を検出 | `supabase db lint` |
| 宣言的スキーマ（pg-delta）から migration 生成 | `supabase db schema declarative sync -f <name> --no-apply` |
| 本番スキーマを宣言ファイルへ export | `supabase db schema declarative generate --remote` |

## Notes (CLI v3 での変更)

- v3 はローカル既定。`db push` / `db pull` / `db diff` / `db reset` / `db dump` / `db lint` でリモートを対象にするには `--remote` を付ける（`--remote=<ref>` / `--remote=<url>` で別プロジェクト・DB URL）
- `--linked` / `--local` / `--project-ref` / `--db-url` は deprecated（v4 で削除）。`--local` は no-op
- ホストを変更する操作（`db push` / `db pull` / `db reset --remote`）は確認が必須。非対話・JSON 出力・agent 実行では `--yes`（または `SUPABASE_YES`、シェルで設定したもののみ有効）が必要
- 削除済み: `db remote commit` / `db remote changes`、`db branch *`、`db diff --use-pg-schema`、`db pull --use-pg-delta` / `--experimental`
- 取得元: 公式 CLI リファレンス（supabase.com/llms/cli.txt、取得日 2026-11-14、CLI v3.1.0）

## Related

- [migration コマンド](./migration-commands.md) — マイグレーション CLI
- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
- [データベーステスト](../database/testing.md) — pgTAP テスト
