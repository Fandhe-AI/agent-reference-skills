# テスト

## pgTAP でのデータベーステスト

### 概要

pgTAP は PostgreSQL のテストフレームワーク。SQL でテストを記述し、データベースの振る舞い（RLS ポリシー、関数、トリガー等）を検証できる。

### テストファイルの配置

```
supabase/
  tests/
    database/
      rls_policies_test.sql
      functions_test.sql
      triggers_test.sql
```

### テストの記述

```sql
-- supabase/tests/database/rls_policies_test.sql
BEGIN;

-- テスト計画（テスト数を宣言）
SELECT plan(4);

-- テスト用ユーザーを作成
SELECT tests.create_supabase_user('user1', 'user1@example.com');
SELECT tests.create_supabase_user('user2', 'user2@example.com');

-- テストデータを挿入（service_role として）
INSERT INTO public.posts (id, title, user_id)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'User1 Post', tests.get_supabase_uid('user1')),
  ('00000000-0000-0000-0000-000000000002', 'User2 Post', tests.get_supabase_uid('user2'));

-- user1 としてテスト
SELECT tests.authenticate_as('user1');

-- user1 は自分の投稿を取得できる
SELECT results_eq(
  $$ SELECT title FROM public.posts WHERE user_id = auth.uid() $$,
  $$ VALUES ('User1 Post') $$,
  'User can read own posts'
);

-- user1 は全投稿を取得できる（SELECT ポリシーが全許可の場合）
SELECT results_eq(
  $$ SELECT count(*)::int FROM public.posts $$,
  2,
  'User can read all posts'
);

-- user1 は自分の投稿を更新できる
SELECT lives_ok(
  $$ UPDATE public.posts SET title = 'Updated' WHERE id = '00000000-0000-0000-0000-000000000001' $$,
  'User can update own post'
);

-- user1 は他人の投稿を更新できない
SELECT throws_ok(
  $$ UPDATE public.posts SET title = 'Hacked' WHERE id = '00000000-0000-0000-0000-000000000002' $$,
  'User cannot update other user post'
);

-- 認証状態をリセット
SELECT tests.clear_authentication();

SELECT * FROM finish();
ROLLBACK;
```

### 関数のテスト

```sql
-- supabase/tests/database/functions_test.sql
BEGIN;

SELECT plan(2);

-- 関数の戻り値をテスト
SELECT results_eq(
  $$ SELECT public.calculate_total(100, 0.1) $$,
  110.0,
  'calculate_total returns correct value with tax'
);

SELECT results_eq(
  $$ SELECT public.calculate_total(100, 0) $$,
  100.0,
  'calculate_total returns correct value without tax'
);

SELECT * FROM finish();
ROLLBACK;
```

## supabase test db

### テストの実行

```bash
# すべてのデータベーステストを実行
supabase test db

# 特定のテストファイルを実行
supabase test db supabase/tests/database/rls_policies_test.sql
```

### 出力例

```
# Subtest: rls_policies_test
    ok 1 - User can read own posts
    ok 2 - User can read all posts
    ok 3 - User can update own post
    ok 4 - User cannot update other user post
    1..4
ok 1 - rls_policies_test
1..1
```

## リンティング（supabase db lint）

### 概要

`supabase db lint` はデータベースのスキーマに対してリンティングを実行し、セキュリティや品質の問題を検出する。

```bash
# リンティングの実行
supabase db lint

# 特定のスキーマのみ
supabase db lint --schema public
```

### 検出される問題

| レベル | 問題 | 説明 |
|--------|------|------|
| ERROR | RLS 未有効 | public スキーマのテーブルに RLS が設定されていない |
| WARN | ポリシー未設定 | RLS は有効だがポリシーが設定されていない |
| WARN | 未使用インデックス | スキャンされていないインデックス |
| INFO | 命名規則 | 命名規則に従っていないオブジェクト |

### 出力例

```
WARNING: Table "public.posts" has RLS enabled but no policies defined
ERROR: Table "public.logs" in schema "public" has RLS disabled
INFO: Index "idx_temp" on "public.posts" has 0 scans
```

## テスト戦略

### テストすべき項目

1. **RLS ポリシー**: 各ロール（anon, authenticated）でのアクセス制御
2. **関数**: ビジネスロジックを含む関数の正確性
3. **トリガー**: データ変更時のトリガー動作
4. **制約**: CHECK 制約、UNIQUE 制約の動作
5. **ビュー**: ビューの出力が正しいか

### CI/CD でのテスト

```yaml
# .github/workflows/test.yml
name: Database Tests
on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: supabase/setup-cli@v1

      - name: Start Supabase
        run: supabase start

      - name: Run lint
        run: supabase db lint

      - name: Run tests
        run: supabase test db

      - name: Stop Supabase
        run: supabase stop
```

## ベストプラクティス

- すべての RLS ポリシーに対してテストを記述する
- テストは `BEGIN` / `ROLLBACK` で囲んでデータの副作用を防ぐ
- CI/CD パイプラインにテストを組み込む
- リンティングを定期的に実行して問題を早期発見する
- テストファイルはマイグレーションファイルと一緒にバージョン管理する

## 関連

- [データベーステスト](../database/testing.md) — pgTAP テスト詳細
- [CLI db コマンド](../cli/db-commands.md) — db lint
- [ローカル開発概要](./overview.md) — ローカル環境セットアップ
