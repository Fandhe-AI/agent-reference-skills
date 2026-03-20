# JSON 操作

JSONB カラムの操作とクエリ方法。

## 概要

PostgreSQL の `jsonb` 型を使い、スキーマレスなデータを格納・検索できる。Supabase の Data API と supabase-js は JSONB カラムへのクエリをネイティブサポートする。

## コード例

```sql
-- JSONB カラムを持つテーブル
create table public.products (
  id bigint generated always as identity primary key,
  name text not null,
  metadata jsonb default '{}'::jsonb
);

-- データ挿入
insert into public.products (name, metadata)
values ('Widget', '{"color": "blue", "sizes": [1, 2, 3], "specs": {"weight": 100}}');

-- JSON パス演算子でクエリ
select * from public.products where metadata->>'color' = 'blue';
select * from public.products where metadata->'specs'->>'weight' = '100';
select * from public.products where metadata @> '{"color": "blue"}'::jsonb;

-- JSON 値の更新
update public.products
set metadata = metadata || '{"color": "red"}'::jsonb
where id = 1;

-- ネストした値の更新
update public.products
set metadata = jsonb_set(metadata, '{specs,weight}', '200')
where id = 1;

-- キーの削除
update public.products
set metadata = metadata - 'color'
where id = 1;
```

```typescript
// supabase-js でのクエリ
// -> で JSON オブジェクト、->> でテキスト値を取得
const { data, error } = await supabase
  .from('products')
  .select('name, metadata->color')
  .eq('metadata->>color', 'blue');

// ネストしたプロパティ
const { data, error } = await supabase
  .from('products')
  .select('name, metadata->specs->weight');

// contains フィルタ（@> 演算子）
const { data, error } = await supabase
  .from('products')
  .select('*')
  .contains('metadata', { color: 'blue' });
```

## JSON 演算子

| 演算子 | 説明 | 例 |
|--------|------|-----|
| `->` | JSON オブジェクト/配列要素を取得 | `metadata->'specs'` |
| `->>` | テキストとして取得 | `metadata->>'color'` |
| `@>` | 包含チェック | `metadata @> '{"color":"blue"}'` |
| `<@` | 被包含チェック | `'{"color":"blue"}' <@ metadata` |
| `?` | キー存在チェック | `metadata ? 'color'` |
| `\|\|` | マージ | `metadata \|\| '{"new":"val"}'` |
| `-` | キー削除 | `metadata - 'color'` |

## 注意点

- `json` 型より `jsonb` 型を使うこと（インデックス対応、検索高速）
- JSONB カラムに GIN インデックスを作成するとクエリが高速化される
- 頻繁にクエリするフィールドは通常のカラムに分離することを検討する
- supabase-js の `select` で `->` を使ったパス指定が可能

## 関連

- [./tables.md](./tables.md) — テーブル操作
- [./arrays.md](./arrays.md) — 配列型操作
- [./query-optimization.md](./query-optimization.md) — インデックス
