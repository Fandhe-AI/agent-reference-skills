# Database Functions

PostgreSQL 関数の作成と supabase-js の `rpc()` による呼び出し。

## 概要

Database Functions（Stored Procedures）は PostgreSQL 内で実行されるサーバーサイドロジック。`plpgsql` や `sql` で記述し、supabase-js の `rpc()` メソッドで呼び出せる。Data API 経由で安全に公開される。

## コード例

```sql
-- 基本的な関数
create or replace function hello_world()
returns text
language sql
as $$
  select 'Hello, World!';
$$;

-- 引数付き関数
create or replace function get_todos_by_user(user_id uuid)
returns setof todos
language sql
security definer
set search_path = ''
as $$
  select * from public.todos where todos.user_id = $1;
$$;

-- 複数行を返す関数
create or replace function search_todos(search_term text)
returns setof todos
language plpgsql
as $$
begin
  return query
    select * from public.todos
    where title ilike '%' || search_term || '%';
end;
$$;

-- 集計関数
create or replace function get_todo_stats(uid uuid)
returns json
language plpgsql
as $$
declare
  result json;
begin
  select json_build_object(
    'total', count(*),
    'completed', count(*) filter (where is_complete),
    'pending', count(*) filter (where not is_complete)
  ) into result
  from public.todos
  where user_id = uid;
  return result;
end;
$$;
```

```typescript
// supabase-js での呼び出し
const { data, error } = await supabase.rpc('hello_world');

// 引数付き
const { data, error } = await supabase.rpc('get_todos_by_user', {
  user_id: '550e8400-e29b-41d4-a716-446655440000'
});

// フィルタ付き
const { data, error } = await supabase
  .rpc('search_todos', { search_term: 'buy' })
  .limit(10);
```

## 注意点

- `security definer` を使う場合は必ず `set search_path = ''` を付ける（セキュリティ上重要）
- `security invoker`（デフォルト）は呼び出し元ユーザーの権限で実行される
- `setof` を返す関数にはフィルタやソートを追加で適用可能
- 関数名はスキーマ修飾なしで `rpc()` に渡す
- `public` スキーマの関数のみ Data API で公開される

## 関連

- [./tables.md](./tables.md) — テーブル操作
- [./secure-data.md](./secure-data.md) — セキュリティ設定
