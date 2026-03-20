# データベーステスト

pgTAP を使った PostgreSQL のテスト方法。

## 概要

pgTAP は PostgreSQL 用のユニットテストフレームワーク。RLS ポリシー、関数、トリガーなどのデータベースロジックをテストできる。Supabase CLI の `supabase test db` コマンドで実行する。

## コード例

```sql
-- テストファイル: supabase/tests/database/todos_test.sql
begin;
select plan(3);

-- テーブル存在テスト
select has_table('public', 'todos', 'todos table should exist');

-- カラム存在テスト
select has_column('public', 'todos', 'title', 'todos should have title column');

-- RLS が有効かテスト
select is(
  (select rowsecurity from pg_tables where tablename = 'todos'),
  true,
  'RLS should be enabled on todos'
);

select * from finish();
rollback;
```

```sql
-- RLS ポリシーのテスト
begin;
select plan(2);

-- テストユーザーとしてデータ挿入
set local role authenticated;
set local request.jwt.claims to '{"sub": "user-1"}';

insert into public.todos (title, user_id)
values ('Test todo', 'user-1');

-- 自分のデータは見える
select is(
  (select count(*) from public.todos where user_id = 'user-1'),
  1::bigint,
  'user can see own todos'
);

-- 他人のデータは見えない
set local request.jwt.claims to '{"sub": "user-2"}';
select is(
  (select count(*) from public.todos where user_id = 'user-1'),
  0::bigint,
  'user cannot see other users todos'
);

select * from finish();
rollback;
```

```bash
# テスト実行
supabase test db
```

## 注意点

- テストは `begin` / `rollback` で囲んでトランザクションを巻き戻す
- `plan(N)` でテスト数を宣言し、`finish()` で完了を確認する
- テストファイルは `supabase/tests/database/` に配置する
- `set local role` と `request.jwt.claims` で認証済みユーザーをシミュレート
- ローカル開発環境（`supabase start`）でのみ実行する

## 関連

- [./secure-data.md](./secure-data.md) — RLS ポリシー
- [./functions.md](./functions.md) — Database Functions
- [../local-dev/testing.md](../local-dev/testing.md) — ローカルテスト全般
