# ベクトルインデックス

HNSW と IVFFlat の 2 種類のベクトルインデックスによる近似最近傍検索（ANN）の高速化。

## 概要

ベクトル検索はインデックスなしではテーブル全行のフルスキャンとなり、データ量が増えると極めて遅くなる。pgvector は 2 種類の ANN（Approximate Nearest Neighbor）インデックスを提供する。

### HNSW（Hierarchical Navigable Small World）

- **推奨**: 精度が高く、検索速度も優れている
- 構築に時間がかかる（メモリ使用量も大きい）
- パラメータ: `m`（グラフの接続数、デフォルト 16）、`ef_construction`（構築時の探索幅、デフォルト 64）
- 検索時パラメータ: `hnsw.ef_search`（デフォルト 40、大きくすると精度向上・速度低下）
- インデックス構築にデータが不要（空テーブルでも作成可能）

### IVFFlat（Inverted File with Flat Compression）

- 構築が高速で、メモリ使用量が少ない
- 精度は HNSW よりやや低い
- パラメータ: `lists`（クラスタ数）
- 検索時パラメータ: `ivfflat.probes`（探索するクラスタ数、デフォルト 1）
- **インデックス構築前にデータが必要**（データに基づいてクラスタを構成するため）

### lists パラメータの目安

| 行数 | lists の推奨値 |
|------|----------------|
| 〜100,000 | `rows / 1000` |
| 100,000〜1,000,000 | `sqrt(rows)` |

## コード例

```sql
-- ============================================
-- HNSW インデックス（推奨）
-- ============================================

-- コサイン距離用 HNSW インデックス
create index on documents
using hnsw (embedding vector_cosine_ops)
with (m = 16, ef_construction = 64);

-- L2 距離用 HNSW インデックス
create index on documents
using hnsw (embedding vector_l2_ops)
with (m = 16, ef_construction = 64);

-- 内積用 HNSW インデックス
create index on documents
using hnsw (embedding vector_ip_ops)
with (m = 16, ef_construction = 64);

-- 検索時の ef_search を調整（セッション単位）
set hnsw.ef_search = 100;

-- ============================================
-- IVFFlat インデックス
-- ============================================

-- コサイン距離用 IVFFlat インデックス
create index on documents
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- L2 距離用 IVFFlat インデックス
create index on documents
using ivfflat (embedding vector_l2_ops)
with (lists = 100);

-- 検索時の probes を調整（セッション単位）
set ivfflat.probes = 10;

-- ============================================
-- インデックスの管理
-- ============================================

-- インデックスの再構築（データ分布が大きく変わった場合）
reindex index documents_embedding_idx;

-- インデックスの削除
drop index if exists documents_embedding_idx;

-- インデックスの構築進捗を確認
select phase, round(100.0 * blocks_done / nullif(blocks_total, 0), 1) as "%"
from pg_stat_progress_create_index;
```

```sql
-- RPC 関数内でのインデックスパラメータ設定
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (id bigint, content text, similarity float)
language plpgsql
as $$
begin
  -- 関数内で ef_search を設定
  set local hnsw.ef_search = 100;

  return query
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

## 注意点

- HNSW は空テーブルでもインデックスを作成できるが、IVFFlat はデータがないと意味のあるインデックスを構築できない
- IVFFlat は `probes` を `lists` と同じ値にすると完全再現（Exact Search）になるが遅い
- HNSW の `m` を大きくするとインデックスサイズが増大する。通常は 16〜64 の範囲
- `ef_construction` は構築時のみの設定。大きくすると精度向上するが構築時間が増加
- インデックス構築は CPU とメモリを大量に消費するため、本番環境ではメンテナンスウィンドウで実行を推奨
- 大量データ（100 万行以上）では、インデックス構築に `maintenance_work_mem` の増加が必要になる場合がある
- 距離関数ごとに別の ops クラスが必要。コサイン距離のインデックスは L2 距離のクエリには使えない

## 関連

- [ベクトルカラム](./vector-columns.md)
- [セマンティック検索](./semantic-search.md)
- [AI & Vectors 概要](./overview.md)
