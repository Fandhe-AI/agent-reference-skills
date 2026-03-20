# 全文検索

PostgreSQL の tsvector / tsquery を使った全文検索機能。

## 概要

Supabase は PostgreSQL の組み込み全文検索機能を提供する。`tsvector`（文書のトークン化表現）と `tsquery`（検索クエリ）を使い、高速な全文検索が可能。supabase-js の `textSearch()` フィルタで直接利用できる。

## コード例

```sql
-- 全文検索用カラム追加
alter table public.todos
  add column fts tsvector
  generated always as (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))) stored;

-- GIN インデックス作成
create index todos_fts_idx on public.todos using gin(fts);

-- SQL での検索
select * from public.todos
where fts @@ to_tsquery('english', 'buy & groceries');

-- ランキング付き検索
select *, ts_rank(fts, query) as rank
from public.todos, to_tsquery('english', 'buy | shop') as query
where fts @@ query
order by rank desc;
```

```typescript
// supabase-js での全文検索
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .textSearch('fts', `'buy' & 'groceries'`);

// 部分一致検索（:* プレフィックス検索）
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .textSearch('fts', `'buy':*`, { type: 'websearch' });

// websearch 形式（自然な検索クエリ）
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .textSearch('fts', `buy groceries`, { type: 'websearch', config: 'english' });
```

## 検索クエリ構文

| 演算子 | 意味 | 例 |
|--------|------|-----|
| `&` | AND | `'buy' & 'groceries'` |
| `\|` | OR | `'buy' \| 'shop'` |
| `!` | NOT | `'buy' & !'groceries'` |
| `:*` | プレフィックス一致 | `'buy':*` |

## 注意点

- `to_tsvector` の言語設定（`'english'`、`'japanese'`等）を適切に選択する
- 日本語の全文検索には `pgroonga` Extension の利用を推奨
- Generated Column として `tsvector` を作成すると自動更新される
- GIN インデックスを作成しないとパフォーマンスが悪化する
- `websearch` 形式を使うとユーザーの自然な検索クエリを受け付けられる

## 関連

- [./query-optimization.md](./query-optimization.md) — インデックスとパフォーマンス
- [./extensions.md](./extensions.md) — pgroonga 等の Extension
