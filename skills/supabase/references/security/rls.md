# RLS 詳細ガイド

## 概要

Row Level Security（RLS）は PostgreSQL のネイティブ機能で、行レベルのアクセス制御を実現する。Supabase では API（PostgREST）経由のアクセスを制御するために不可欠。

## RLS の有効化

```sql
-- テーブルに RLS を有効化
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- RLS を無効化（非推奨）
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
```

**重要**: RLS を有効にしてもポリシーが設定されていない場合、そのテーブルへのアクセスはすべて拒否される（テーブルオーナーを除く）。

## ポリシー作成パターン

### 基本構文

```sql
CREATE POLICY "policy_name"
  ON schema.table
  FOR operation           -- SELECT, INSERT, UPDATE, DELETE, ALL
  TO role                 -- anon, authenticated, またはカスタムロール
  USING (expression)      -- 既存行に対する条件（SELECT, UPDATE, DELETE）
  WITH CHECK (expression) -- 新規/更新行に対する条件（INSERT, UPDATE）
```

### パターン 1: 全員読み取り可、認証ユーザーのみ書き込み

```sql
-- 全員が読み取り可能
CREATE POLICY "Anyone can read"
  ON public.posts FOR SELECT
  USING (true);

-- 認証ユーザーのみ作成可能
CREATE POLICY "Authenticated users can create"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

### パターン 2: 所有者のみアクセス

```sql
-- 所有者のみ読み取り
CREATE POLICY "Owner can read"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 所有者のみ更新
CREATE POLICY "Owner can update"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 所有者のみ削除
CREATE POLICY "Owner can delete"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

### パターン 3: 公開/非公開の制御

```sql
-- 公開投稿は誰でも読める、非公開は所有者のみ
CREATE POLICY "Read published or own"
  ON public.posts FOR SELECT
  USING (
    published = true
    OR auth.uid() = user_id
  );
```

### パターン 4: ロールベースのアクセス

```sql
-- 管理者はすべてにアクセス可能
CREATE POLICY "Admins can do anything"
  ON public.posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );
```

### パターン 5: 組織/チームベースのアクセス

```sql
-- 同じ組織のメンバーのみアクセス
CREATE POLICY "Team members can read"
  ON public.projects FOR SELECT
  TO authenticated
  USING (
    org_id IN (
      SELECT org_id FROM public.org_members
      WHERE user_id = auth.uid()
    )
  );
```

### パターン 6: 時間ベースのアクセス

```sql
-- 公開日以降のみ閲覧可能
CREATE POLICY "Published content only"
  ON public.articles FOR SELECT
  USING (published_at <= now());
```

## auth.uid() と auth.jwt() の利用

### auth.uid()

現在認証されているユーザーの UUID を返す。

```sql
-- 現在のユーザーの投稿のみ
USING (auth.uid() = user_id)
```

### auth.jwt()

現在の JWT トークンのペイロード全体を返す。カスタムクレームにアクセスできる。

```sql
-- JWT のカスタムクレームを使用
USING (
  (auth.jwt() ->> 'role') = 'admin'
);

-- app_metadata を使用
USING (
  (auth.jwt() -> 'app_metadata' ->> 'org_id')::uuid = org_id
);

-- user_metadata を使用
USING (
  (auth.jwt() -> 'user_metadata' ->> 'department') = department
);
```

### auth.role()

現在のロール（anon / authenticated / service_role）を返す。

```sql
-- 認証済みユーザーのみ
USING (auth.role() = 'authenticated')
```

## パフォーマンス考慮

### サブクエリの最適化

```sql
-- 悪い例: 毎行でサブクエリを実行
CREATE POLICY "Bad performance"
  ON public.posts FOR SELECT
  USING (
    user_id IN (
      SELECT user_id FROM public.followers
      WHERE follower_id = auth.uid()
    )
  );

-- 良い例: security definer 関数でキャッシュ
CREATE OR REPLACE FUNCTION public.get_followed_user_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT user_id FROM public.followers
  WHERE follower_id = auth.uid();
$$;

CREATE POLICY "Better performance"
  ON public.posts FOR SELECT
  USING (
    user_id IN (SELECT public.get_followed_user_ids())
  );
```

### インデックスの活用

```sql
-- RLS ポリシーで使用されるカラムにインデックスを作成
CREATE INDEX idx_posts_user_id ON public.posts (user_id);
CREATE INDEX idx_org_members_user_id ON public.org_members (user_id);
```

### ポリシーの数を最小限に

- 同じ操作（SELECT 等）に対する複数のポリシーは OR で結合される
- ポリシーが多いほど評価コストが増加する
- 可能な限りポリシーを統合する

## Column Level Security（GRANT/REVOKE）

RLS（行レベル）に加えて、GRANT/REVOKE でカラムレベルのアクセス制御が可能。

### 基本的な使い方

```sql
-- anon ロールから特定カラムの SELECT 権限を剥奪
REVOKE SELECT (secret_column) ON public.users FROM anon;

-- authenticated ロールに特定カラムの UPDATE 権限を付与
GRANT UPDATE (name, bio) ON public.profiles TO authenticated;

-- 全カラムの INSERT 権限を付与
GRANT INSERT ON public.posts TO authenticated;
```

### 例: 機密情報の保護

```sql
-- users テーブルの email は管理者のみ閲覧可能
REVOKE SELECT (email, phone) ON public.users FROM anon, authenticated;

-- 管理者ロールには閲覧を許可
GRANT SELECT (email, phone) ON public.users TO admin_role;
```

## デバッグ方法

### ポリシーの確認

```sql
-- テーブルに設定されたポリシーを確認
SELECT
  polname AS policy_name,
  polcmd AS command,
  polroles::regrole[] AS roles,
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'public.posts'::regclass;
```

### 特定ロールでのテスト

```sql
-- anon ロールとしてクエリを実行
SET ROLE anon;
SELECT * FROM public.posts;  -- RLS が適用される
RESET ROLE;

-- 特定ユーザーとして実行
SET request.jwt.claims = '{"sub": "user-uuid-here", "role": "authenticated"}';
SET ROLE authenticated;
SELECT * FROM public.posts;
RESET ROLE;
```

### RLS が原因のエラー

- 空の結果セット: SELECT ポリシーがアクセスを拒否している
- `new row violates row-level security policy`: INSERT/UPDATE ポリシーの WITH CHECK に違反
- 権限エラー: GRANT が不足している

### EXPLAIN で確認

```sql
-- ポリシーがクエリプランに与える影響を確認
EXPLAIN ANALYZE
SELECT * FROM public.posts WHERE id = '...';
```

## ベストプラクティス

- すべてのテーブルで RLS を有効にする
- デフォルトで拒否し、明示的に許可する
- `auth.uid()` を活用してユーザーベースのアクセス制御を実装する
- パフォーマンスを考慮してポリシーを設計する
- ポリシーは pgTAP でテストする
- `service_role` はサーバーサイドでのみ使用する（RLS をバイパスする）

## 関連

- [データセキュリティ](../database/secure-data.md) — RLS ポリシー例
- [Auth 概要](../auth/overview.md) — 認証・ロール
- [データベーステスト](../database/testing.md) — RLS ポリシーのテスト
