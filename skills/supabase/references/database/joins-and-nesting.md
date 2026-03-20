# JOIN とネスト

外部キーを活用したテーブル結合とネストされたクエリ。

## 概要

Supabase の Data API（PostgREST）は外部キーリレーションシップに基づいて自動的にテーブルを結合する。supabase-js の `select()` でネストしたデータを取得できる。

## コード例

```sql
-- リレーションシップの定義
create table public.countries (
  id bigint generated always as identity primary key,
  name text not null
);

create table public.cities (
  id bigint generated always as identity primary key,
  name text not null,
  country_id bigint references public.countries(id)
);
```

```typescript
// Many-to-One: 都市とその国を取得
const { data, error } = await supabase
  .from('cities')
  .select(`
    name,
    countries (
      name
    )
  `);
// => [{ name: "Tokyo", countries: { name: "Japan" } }]

// One-to-Many: 国とその都市一覧を取得
const { data, error } = await supabase
  .from('countries')
  .select(`
    name,
    cities (
      name
    )
  `);
// => [{ name: "Japan", cities: [{ name: "Tokyo" }, { name: "Osaka" }] }]

// ネストしたフィルタ
const { data, error } = await supabase
  .from('countries')
  .select(`
    name,
    cities!inner (
      name
    )
  `)
  .eq('cities.name', 'Tokyo');

// Many-to-Many（中間テーブル経由）
const { data, error } = await supabase
  .from('students')
  .select(`
    name,
    courses (
      title
    )
  `);

// 複数階層のネスト
const { data, error } = await supabase
  .from('countries')
  .select(`
    name,
    cities (
      name,
      addresses (
        street
      )
    )
  `);

// リレーション名の明示（同一テーブルへの複数FK）
const { data, error } = await supabase
  .from('messages')
  .select(`
    content,
    sender:users!sender_id (name),
    receiver:users!receiver_id (name)
  `);
```

## 注意点

- 外部キーが定義されていないとネストクエリは使えない
- `!inner` を付けるとリレーション先が存在しない行を除外する（INNER JOIN 相当）
- デフォルトは LEFT JOIN（リレーション先が null でも親行は返る）
- 同一テーブルへの複数の外部キーがある場合はリレーション名を明示する必要がある
- ネストの深さに制限はないが、パフォーマンスに注意

## 関連

- [./tables.md](./tables.md) — テーブルとリレーション定義
- [./query-optimization.md](./query-optimization.md) — パフォーマンス最適化
