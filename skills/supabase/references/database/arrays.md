# 配列操作

PostgreSQL 配列型の操作方法。

## 概要

PostgreSQL は任意のデータ型の配列をカラムとして使用できる。supabase-js は配列操作のフィルタ（`contains`、`containedBy`、`overlaps`）をサポートする。

## コード例

```sql
-- 配列カラムを持つテーブル
create table public.articles (
  id bigint generated always as identity primary key,
  title text not null,
  tags text[] default '{}',
  scores int[] default '{}'
);

-- データ挿入
insert into public.articles (title, tags, scores)
values ('Learn Supabase', array['supabase', 'postgres', 'tutorial'], array[95, 87, 92]);

-- 配列に要素を追加
update public.articles
set tags = array_append(tags, 'database')
where id = 1;

-- 配列から要素を削除
update public.articles
set tags = array_remove(tags, 'tutorial')
where id = 1;

-- 配列に要素が含まれるか
select * from public.articles where 'supabase' = any(tags);
select * from public.articles where tags @> array['supabase', 'postgres'];
```

```typescript
// supabase-js での配列操作

// contains: 指定した要素をすべて含む
const { data, error } = await supabase
  .from('articles')
  .select('*')
  .contains('tags', ['supabase', 'postgres']);

// containedBy: 指定した配列に含まれる
const { data, error } = await supabase
  .from('articles')
  .select('*')
  .containedBy('tags', ['supabase', 'postgres', 'tutorial', 'database']);

// overlaps: いずれかの要素が一致
const { data, error } = await supabase
  .from('articles')
  .select('*')
  .overlaps('tags', ['supabase', 'firebase']);
```

## 注意点

- 配列型には GIN インデックスを作成するとクエリが高速化される（`create index on articles using gin(tags)`）
- 配列が大きくなる場合は中間テーブルでの正規化を検討する
- `text[]` の要素は文字列として扱われる
- `any()` 演算子は単一要素の存在確認に便利

## 関連

- [./tables.md](./tables.md) — テーブル操作
- [./json.md](./json.md) — JSON 操作
