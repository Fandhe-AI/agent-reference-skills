# 宣言的スキーマ管理

## 概要

宣言的スキーマ管理では、データベースの「あるべき姿」を定義し、現在の状態との差分からマイグレーションを自動生成する。従来の命令的マイグレーション（CREATE TABLE, ALTER TABLE 等を手動で記述）とは異なるアプローチ。

## schemas ディレクトリ

### 構造

```
supabase/
  schemas/
    public/
      tables/
        users.sql
        posts.sql
        comments.sql
      functions/
        get_user_posts.sql
      views/
        active_users.sql
    auth/
    storage/
  migrations/
  config.toml
```

### テーブル定義の例

```sql
-- supabase/schemas/public/tables/posts.sql
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authors can manage own posts"
  ON public.posts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON public.posts (user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts (created_at DESC);
```

## supabase db diff でマイグレーション生成

### 基本的なワークフロー

1. `supabase/schemas/` のファイルを編集
2. ローカルデータベースにスキーマを適用
3. `supabase db diff` で差分マイグレーションを生成

```bash
# 現在のローカル DB との差分を確認
supabase db diff

# 差分からマイグレーションファイルを生成
supabase db diff -f add_published_column
```

### 生成されるマイグレーション

```sql
-- supabase/migrations/20240115000000_add_published_column.sql
ALTER TABLE public.posts ADD COLUMN published BOOLEAN DEFAULT false;
```

### スキーマの選択

```bash
# 特定のスキーマのみ差分を取得
supabase db diff --schema public

# 複数スキーマ
supabase db diff --schema public,auth
```

## ワークフロー

### 1. スキーマファイルの編集

```sql
-- posts.sql にカラムを追加
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  summary TEXT,  -- 新しいカラム
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. 差分の確認とマイグレーション生成

```bash
supabase db diff -f add_summary_to_posts
```

### 3. マイグレーションの確認

生成されたファイルを確認して、意図した変更のみが含まれていることを確認する。

### 4. リセットしてテスト

```bash
supabase db reset
```

### 5. コミット

マイグレーションファイルとスキーマファイルの両方をコミットする。

## 注意事項

- 宣言的スキーマと命令的マイグレーションは併用可能
- `supabase db diff` は既存のデータを考慮しないため、データマイグレーションは手動で記述する必要がある
- 破壊的変更（カラム削除等）は差分に含まれるため、生成されたマイグレーションを必ず確認する
- スキーマファイルは「最新のあるべき姿」を反映し続ける

## ベストプラクティス

- テーブルごとにファイルを分割する
- RLS ポリシーはテーブル定義と同じファイルに含める
- インデックスもテーブル定義と同じファイルに含める
- 関数やビューは別ファイルに分離する
- 生成されたマイグレーションは必ずレビューする

## 関連

- [CLI db コマンド](../cli/db-commands.md) — db diff
- [CLI migration コマンド](../cli/migration-commands.md) — マイグレーション管理
- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
