# クエリ最適化

インデックス設計・EXPLAIN 分析・パフォーマンスデバッグ。

## 概要

PostgreSQL のクエリパフォーマンスを最適化するための手法。インデックスの適切な設計、`EXPLAIN ANALYZE` による分析、`pg_stat_statements` によるモニタリングを組み合わせる。

## コード例

```sql
-- B-tree インデックス（デフォルト、等値・範囲検索）
create index idx_todos_user_id on public.todos (user_id);

-- 複合インデックス
create index idx_todos_user_complete on public.todos (user_id, is_complete);

-- 部分インデックス（条件付き）
create index idx_todos_pending on public.todos (user_id)
where is_complete = false;

-- GIN インデックス（JSONB、配列、全文検索）
create index idx_products_metadata on public.products using gin (metadata);

-- GiST インデックス（地理空間データ）
create index idx_locations_geom on public.locations using gist (geom);

-- EXPLAIN ANALYZE でクエリ分析
explain analyze
select * from public.todos where user_id = '...' and is_complete = false;

-- 未使用インデックスの確認
select
  schemaname, tablename, indexname, idx_scan
from pg_stat_user_indexes
where idx_scan = 0 and schemaname = 'public'
order by pg_relation_size(indexrelid) desc;

-- テーブル統計の確認
select
  relname, n_live_tup, n_dead_tup, last_vacuum, last_autovacuum
from pg_stat_user_tables
where schemaname = 'public';
```

```typescript
// supabase-js の explain オプション
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .eq('user_id', userId)
  .explain({ analyze: true, verbose: true });
```

## インデックスの選択ガイド

| インデックス型 | 用途 |
|--------------|------|
| B-tree | 等値検索、範囲検索、ソート（デフォルト） |
| Hash | 等値検索のみ |
| GIN | JSONB、配列、全文検索 |
| GiST | 地理空間、範囲型 |
| BRIN | 大規模な時系列データ |

## `pg_stat_statements` による分析

```sql
-- 有効化（Extension）
create extension if not exists pg_stat_statements;

-- 遅いクエリの特定
select
  query,
  calls,
  mean_exec_time,
  total_exec_time
from pg_stat_statements
order by mean_exec_time desc
limit 20;
```

## 注意点

- インデックスは書き込みコストを増加させるため、必要なものだけ作成する
- 複合インデックスのカラム順序は重要（先頭カラムが等値検索で使われるものにする）
- `EXPLAIN ANALYZE` は実際にクエリを実行するため、本番環境では注意
- 定期的に `VACUUM ANALYZE` を実行してテーブル統計を更新する
- Supabase ダッシュボードの Query Performance ページも活用する
- `index_advisor` Extension で推奨インデックスを取得可能

## 関連

- [./extensions.md](./extensions.md) — pg_stat_statements, index_advisor
- [./connections.md](./connections.md) — 接続管理
