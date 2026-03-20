# Supabase CLI: データベースコマンド

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
| `--linked` | リモートプロジェクトとの差分 |
| `--use-migra` | migra ツールを使用（デフォルト: pgAdmin） |
| `--use-pg-schema` | pg_schema_diff を使用 |

### 使用例

```bash
# ローカル変更を標準出力に表示
supabase db diff

# マイグレーションファイルとして保存
supabase db diff -f add_users_table

# 特定スキーマのみ
supabase db diff --schema public,auth

# リモートとの差分
supabase db diff --linked

# リモートとの差分をマイグレーションファイルに保存
supabase db diff --linked -f sync_remote_changes
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
supabase db dump
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `-f, --file <path>` | 出力ファイルパス |
| `--data-only` | データのみダンプ（スキーマなし） |
| `--role-only` | ロール定義のみダンプ |
| `--schema <schema>` | 対象スキーマ |
| `--use-copy` | COPY 文を使用（大量データ向け） |
| `--keep-comments` | コメントを保持 |

### 使用例

```bash
# スキーマをファイルに出力
supabase db dump -f schema.sql

# データのみダンプ
supabase db dump --data-only -f data.sql

# ロールのみダンプ
supabase db dump --role-only -f roles.sql

# 特定スキーマのみ
supabase db dump --schema public -f public_schema.sql
```

## supabase db lint

データベーススキーマの問題を検出する。plpgsql_check 拡張を使用。

```bash
supabase db lint
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--schema <schemas>` | 対象スキーマ（カンマ区切り） |
| `--level <level>` | 出力レベル（`warning`, `error`） |

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
supabase db pull
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--schema <schemas>` | 対象スキーマ（カンマ区切り） |

### 使用例

```bash
# リモートスキーマを取得
supabase db pull

# 特定スキーマのみ
supabase db pull --schema public,auth
```

### 動作

1. リモートデータベースのスキーマをダンプ
2. `supabase/migrations/` ディレクトリに新しいマイグレーションファイルを生成
3. リモートのマイグレーション履歴をローカルに同期

## supabase db push

ローカルのマイグレーションをリモートデータベースに適用する。

```bash
supabase db push
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--dry-run` | 実行せずに適用されるマイグレーションを表示 |
| `--include-all` | 既にリモートで適用済みのものも含めて実行 |
| `--include-roles` | ロール定義も含めて適用 |
| `--include-seed` | seed.sql も実行 |
| `--password <password>` | DB パスワード |

### 使用例

```bash
# マイグレーションをリモートに適用
supabase db push

# ドライラン（確認のみ）
supabase db push --dry-run

# シードデータも含めて適用
supabase db push --include-seed

# パスワード指定
supabase db push --password your-db-password
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
| `--linked` | リモートデータベースをリセット（注意: データが全削除される） |
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

## コマンド使い分けガイド

| シナリオ | コマンド |
|---------|---------|
| ローカルで GUI 操作後にマイグレーション生成 | `supabase db diff -f <name>` |
| リモートの現在のスキーマを取得 | `supabase db pull` |
| ローカルのマイグレーションをリモートに適用 | `supabase db push` |
| ローカルをクリーンな状態に戻す | `supabase db reset` |
| リモートの完全なスキーマダンプ | `supabase db dump -f schema.sql` |
| スキーマの問題を検出 | `supabase db lint` |

## 関連

- [migration コマンド](./migration-commands.md) — マイグレーション CLI
- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
- [データベーステスト](../database/testing.md) — pgTAP テスト
