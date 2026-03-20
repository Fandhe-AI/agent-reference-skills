# データインポート

CSV、SQL、外部ソースからのデータインポート方法。

## 概要

Supabase は複数の方法でデータをインポートできる。CSV ファイル、SQL ダンプ、外部データベースからのマイグレーション、`COPY` コマンドによる高速インポートをサポート。

## コード例

```sql
-- COPY コマンド（最も高速）
-- psql から実行
\copy public.todos (title, is_complete) from '/path/to/todos.csv' with csv header;

-- SQL INSERT
insert into public.todos (title, is_complete)
values
  ('Task 1', false),
  ('Task 2', true),
  ('Task 3', false);

-- 外部テーブルからのインポート（postgres_fdw）
create extension if not exists postgres_fdw;

create server foreign_server
foreign data wrapper postgres_fdw
options (host 'external-host', port '5432', dbname 'external_db');

create user mapping for postgres
server foreign_server
options (user 'external_user', password 'external_password');

create foreign table external_todos (
  id bigint,
  title text
) server foreign_server options (schema_name 'public', table_name 'todos');

insert into public.todos (title)
select title from external_todos;
```

```bash
# CLI でシードデータをインポート
supabase db reset  # マイグレーション + シードを再適用

# psql で CSV インポート
psql $DATABASE_URL -c "\copy public.todos from 'data.csv' csv header"
```

## ダッシュボードからのインポート

1. Table Editor でテーブルを選択
2. 「Import data」→ CSV ファイルを選択
3. カラムマッピングを確認して「Import」

## 注意点

- 大量データのインポートには `COPY` コマンドが最も効率的
- CSV ファイルのエンコーディングは UTF-8 を推奨
- インポート前にインデックスを無効化し、完了後に再作成するとパフォーマンスが向上
- ダッシュボードの CSV インポートは小〜中規模データ向け
- RLS が有効なテーブルへのインポートはサービスロールキーを使用する

## 関連

- [./tables.md](./tables.md) — テーブル操作
- [./connections.md](./connections.md) — 接続管理
- [../local-dev/seeding.md](../local-dev/seeding.md) — シードデータ
