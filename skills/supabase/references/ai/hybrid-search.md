# ハイブリッド検索

ベクトル検索（セマンティック検索）と全文検索（キーワード検索）を組み合わせた高精度な検索手法。

## 概要

ハイブリッド検索は、セマンティック検索とキーワード検索それぞれの長所を組み合わせる手法。セマンティック検索は意味的な類似性を捉えるが、固有名詞や専門用語のマッチが弱い。キーワード検索は正確な語句マッチに強いが、同義語や言い換えに対応できない。両者を組み合わせることで、より高精度な検索を実現する。

### RRF（Reciprocal Rank Fusion）

複数の検索結果のランキングを統合するアルゴリズム。各結果のランク順位に基づいてスコアを計算し、統合する。

```
RRF スコア = Σ 1 / (k + rank_i)
```

`k` は定数（通常 60）で、上位ランクの結果に過度に重みが偏るのを防ぐ。

### PostgreSQL の全文検索

PostgreSQL 組み込みの `tsvector` / `tsquery` を使用した全文検索。`to_tsvector()` でテキストをトークン化し、`to_tsquery()` でクエリを構成する。GIN インデックスで高速化。

## コード例

```sql
-- 全文検索用のカラムとインデックスを追加
alter table documents add column fts tsvector
  generated always as (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, ''))) stored;

create index on documents using gin (fts);

-- キーワード検索関数
create or replace function keyword_search(
  query text,
  match_count int default 10
)
returns table (
  id bigint,
  content text,
  rank real
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    ts_rank(documents.fts, websearch_to_tsquery('english', query)) as rank
  from documents
  where documents.fts @@ websearch_to_tsquery('english', query)
  order by rank desc
  limit match_count;
$$;

-- セマンティック検索関数
create or replace function semantic_search(
  query_embedding vector(1536),
  match_count int default 10
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- ハイブリッド検索関数（RRF による統合）
create or replace function hybrid_search(
  query_text text,
  query_embedding vector(1536),
  match_count int default 10,
  full_text_weight float default 1.0,
  semantic_weight float default 1.0,
  rrf_k int default 60
)
returns table (
  id bigint,
  content text,
  score float
)
language sql stable
as $$
  with
  -- 全文検索の結果にランク付け
  full_text as (
    select
      id,
      row_number() over (order by ts_rank(fts, websearch_to_tsquery('english', query_text)) desc) as rank_ix
    from documents
    where fts @@ websearch_to_tsquery('english', query_text)
    order by rank_ix
    limit least(match_count, 30) * 2
  ),
  -- セマンティック検索の結果にランク付け
  semantic as (
    select
      id,
      row_number() over (order by embedding <=> query_embedding) as rank_ix
    from documents
    order by rank_ix
    limit least(match_count, 30) * 2
  )
  -- RRF で統合
  select
    documents.id,
    documents.content,
    coalesce(1.0 / (rrf_k + full_text.rank_ix), 0.0) * full_text_weight +
    coalesce(1.0 / (rrf_k + semantic.rank_ix), 0.0) * semantic_weight as score
  from
    full_text
    full outer join semantic on full_text.id = semantic.id
    join documents on documents.id = coalesce(full_text.id, semantic.id)
  order by score desc
  limit match_count;
$$;
```

```typescript
// クライアント側の実装
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function hybridSearch(query: string) {
  // クエリをベクトル化
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  // ハイブリッド検索を実行
  const { data, error } = await supabase.rpc('hybrid_search', {
    query_text: query,
    query_embedding: queryEmbedding,
    match_count: 10,
    full_text_weight: 1.0,
    semantic_weight: 1.0,
    rrf_k: 60,
  });

  if (error) throw error;
  return data;
}
```

## 注意点

- `full_text_weight` と `semantic_weight` のバランスはデータと用途に応じて調整する
- 全文検索には適切な言語設定（`'english'`, `'japanese'` 等）が必要。日本語は `pgroonga` 等の追加 Extension が必要な場合がある
- `websearch_to_tsquery` は Google 検索のような自然な構文（AND/OR/NOT、引用符）をサポート
- RRF の `k` 値（デフォルト 60）を大きくすると上位と下位のスコア差が小さくなる
- 両方の検索で一方にしか出てこない結果は、`full outer join` によりもう一方のスコアが 0 として統合される
- パフォーマンスのため、各検索の中間結果を `match_count * 2` 程度に制限する

## 関連

- [セマンティック検索](./semantic-search.md)
- [ベクトルインデックス](./vector-indexes.md)
- [RAG パイプライン](./rag.md)
