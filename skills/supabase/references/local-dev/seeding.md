# シードデータ

## 概要

シードデータを使用して、開発・テスト用のデータをデータベースに投入する。Supabase では `supabase/seed.sql` ファイルでシードデータを管理する。

## seed.sql ファイル

### 基本的な使い方

```sql
-- supabase/seed.sql

-- テストユーザーの作成（Auth）
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'user1@example.com', crypt('password123', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'user2@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

-- プロフィールデータ
INSERT INTO public.profiles (id, username, display_name)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'user1', 'User One'),
  ('00000000-0000-0000-0000-000000000002', 'user2', 'User Two');

-- テスト投稿データ
INSERT INTO public.posts (title, content, user_id)
VALUES
  ('First Post', 'Hello World', '00000000-0000-0000-0000-000000000001'),
  ('Second Post', 'Testing', '00000000-0000-0000-0000-000000000002');
```

### 依存関係の順序

外部キー制約がある場合、親テーブルから順にデータを挿入する。

```sql
-- 1. まずカテゴリ（親）
INSERT INTO public.categories (id, name) VALUES
  (1, 'Technology'),
  (2, 'Science');

-- 2. 次に記事（子）
INSERT INTO public.articles (title, category_id) VALUES
  ('AI News', 1),
  ('Physics Discovery', 2);
```

## supabase db reset でシード適用

```bash
# データベースをリセットしてマイグレーション＋シードを再適用
supabase db reset
```

### 実行順序

1. データベースを完全にリセット
2. `supabase/migrations/` のマイグレーションを順番に適用
3. `supabase/seed.sql` を実行

## テストデータの管理

### 環境別のシードデータ

`seed.sql` はローカル開発とプレビューブランチで使用される。本番環境には適用されない。

### 大量データの生成

```sql
-- generate_series を使用して大量のテストデータを生成
INSERT INTO public.posts (title, content, user_id, created_at)
SELECT
  'Post #' || i,
  'Content for post #' || i,
  '00000000-0000-0000-0000-000000000001',
  now() - (i || ' hours')::interval
FROM generate_series(1, 1000) AS i;
```

### 現実的なテストデータ

```sql
-- ランダムなデータを生成
INSERT INTO public.products (name, price, stock)
SELECT
  'Product ' || i,
  (random() * 10000)::int / 100.0,  -- 0.00 ~ 100.00
  (random() * 100)::int              -- 0 ~ 100
FROM generate_series(1, 100) AS i;
```

### 外部ファイルからのインポート

```bash
# CSV ファイルからインポート（psql 経由）
psql "postgresql://postgres:postgres@localhost:54322/postgres" \
  -c "\copy public.products FROM 'data/products.csv' WITH CSV HEADER"
```

## ベストプラクティス

- シードデータは冪等にする（`ON CONFLICT DO NOTHING` を使用）
- テスト用のメールアドレスには `@example.com` を使用する
- UUID は固定値を使用して再現性を確保する
- 大量データのシードには `generate_series` を活用する
- シードデータはバージョン管理に含める
- 機密データ（実ユーザーのデータ等）をシードに含めない

```sql
-- 冪等なシードデータの例
INSERT INTO public.categories (id, name)
VALUES
  (1, 'Technology'),
  (2, 'Science')
ON CONFLICT (id) DO NOTHING;
```

## 関連

- [データインポート](../database/import-data.md) — CSV・SQL インポート
- [ローカル開発概要](./overview.md) — ローカル環境セットアップ
- [CLI db コマンド](../cli/db-commands.md) — db reset
