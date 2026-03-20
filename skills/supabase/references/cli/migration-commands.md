# Supabase CLI: マイグレーションコマンド

## supabase migration new

新しいマイグレーションファイルを作成する。タイムスタンプ付きの空の SQL ファイルが生成される。

```bash
supabase migration new <name>
```

### 引数

| 引数 | 説明 |
|------|------|
| `name` | マイグレーション名（スネークケース推奨） |

### 使用例

```bash
# 新規マイグレーション作成
supabase migration new create_users_table

# 生成されるファイル
# supabase/migrations/20240101120000_create_users_table.sql
```

### 生成されたファイルにSQLを記述

```sql
-- supabase/migrations/20240101120000_create_users_table.sql
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- RLS 有効化
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS ポリシー
CREATE POLICY "Users can read own data" ON public.users
    FOR SELECT USING (auth.uid() = id);
```

## supabase migration up

未適用のマイグレーションをローカルデータベースに適用する。

```bash
supabase migration up
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--include-all` | 全マイグレーションを再適用 |

### 使用例

```bash
# 未適用のマイグレーションを適用
supabase migration up

# 全マイグレーションを再適用
supabase migration up --include-all
```

### 出力例

```
Applying migration 20240101120000_create_users_table.sql...
Applying migration 20240102080000_add_posts_table.sql...
Applied 2 migrations.
```

## supabase migration down

マイグレーションをロールバック（巻き戻し）する。

```bash
supabase migration down
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--count <n>` | ロールバックするマイグレーション数（デフォルト: 1） |

### 使用例

```bash
# 直近1件をロールバック
supabase migration down

# 直近3件をロールバック
supabase migration down --count 3
```

### 注意事項

- ロールバック用 SQL は自動生成されない
- マイグレーションファイルに `-- down` セクションを記述するか、別途 down ファイルを用意する必要がある場合がある
- ロールバック SQL がない場合はエラーになる

## supabase migration list

マイグレーションの一覧と適用状態を表示する。

```bash
supabase migration list
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--password <password>` | DB パスワード（リモート比較時） |

### 使用例

```bash
# ローカルとリモートのマイグレーション状態を比較
supabase migration list
```

### 出力例

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20240101120000  │ 20240101120000 │ 2024-01-01 12:00:00
    20240102080000  │ 20240102080000 │ 2024-01-02 08:00:00
    20240103150000  │                │ 2024-01-03 15:00:00
```

| 状態 | 説明 |
|------|------|
| LOCAL と REMOTE 両方に表示 | ローカル・リモート両方で適用済み |
| LOCAL のみ | ローカルにあるがリモート未適用 |
| REMOTE のみ | リモートにあるがローカルにない（同期が必要） |

## supabase migration repair

マイグレーション履歴の整合性を修復する。ローカルとリモートでマイグレーションの状態が不一致の場合に使用。

```bash
supabase migration repair
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--status <status>` | マイグレーションのステータスを設定（`applied`, `reverted`） |
| `--version <version>` | 対象のマイグレーションバージョン |
| `--password <password>` | DB パスワード |

### 使用例

```bash
# リモートのマイグレーション履歴を「適用済み」に修正
supabase migration repair --status applied --version 20240101120000

# リモートのマイグレーション履歴を「未適用」に修正
supabase migration repair --status reverted --version 20240103150000
```

### ユースケース

- リモートで手動 SQL 実行後、マイグレーション履歴と実際のスキーマが不一致
- マイグレーション適用が途中で失敗し、履歴が不整合

## supabase migration squash

複数のマイグレーションを1つに統合する。開発中に増えたマイグレーションをまとめてクリーンにする際に使用。

```bash
supabase migration squash
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--version <version>` | この指定バージョンまでのマイグレーションを統合 |
| `--password <password>` | DB パスワード |

### 使用例

```bash
# 全マイグレーションを統合
supabase migration squash

# 特定バージョンまでのマイグレーションを統合
supabase migration squash --version 20240103150000
```

### 動作

1. 対象マイグレーションの SQL を1つのファイルにまとめる
2. 元のマイグレーションファイルを削除
3. 統合後のマイグレーションファイルを生成
4. リモートのマイグレーション履歴を更新

### 注意事項

- 統合対象のマイグレーションが全てリモートで適用済みであること
- 統合後はロールバックが難しくなる
- チーム開発では他メンバーと調整の上で実行すること

## マイグレーションワークフロー

### パターン1: コードファーストでマイグレーション作成

```bash
# 1. 空のマイグレーションファイルを作成
supabase migration new create_users_table

# 2. SQL を手動で記述
# supabase/migrations/20240101120000_create_users_table.sql

# 3. ローカルに適用
supabase migration up

# 4. リモートにプッシュ
supabase db push
```

### パターン2: GUI 操作からマイグレーション生成

```bash
# 1. Supabase Studio (localhost:54323) で GUI 操作
# テーブル作成、カラム追加など

# 2. 差分をマイグレーションとして保存
supabase db diff -f create_users_table

# 3. 生成されたマイグレーションを確認・修正

# 4. リモートにプッシュ
supabase db push
```

### パターン3: リモートからローカルに同期

```bash
# 1. リモートプロジェクトにリンク
supabase link --project-ref <ref>

# 2. リモートのスキーマをマイグレーションとして取得
supabase db pull

# 3. ローカルに適用
supabase db reset
```

## 関連

- [db コマンド](./db-commands.md) — db diff / push
- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
- [宣言的スキーマ](../local-dev/declarative-schemas.md) — スキーマ管理
