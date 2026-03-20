# セマンティック検索

ベクトル類似度に基づく意味的な検索。match_documents パターンによるクエリベクトルと格納済みベクトルの近傍検索。

## 概要

セマンティック検索は、キーワードの完全一致ではなく、テキストの「意味」に基づいて検索結果を返す。クエリテキストをベクトル化し、データベースに格納済みのベクトルとの距離を計算して類似度の高い結果を返す。

### 検索フロー

1. ユーザーのクエリテキストを埋め込みモデルでベクトル化
2. PostgreSQL の距離演算子でベクトル間の類似度を計算
3. 類似度の高い順にソートして返却
4. `match_threshold` で最低類似度を設定し、無関係な結果を除外

### match_documents 関数パターン

Supabase での標準的なセマンティック検索パターン。RPC 関数として定義し、supabase-js の `rpc()` から呼び出す。

## コード例

```sql
-- match_documents 関数の作成
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.78,
  match_count int default 10
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
```

```typescript
// === クライアント側の実装 ===
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function semanticSearch(query: string) {
  // 1. クエリをベクトル化
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  // 2. RPC で match_documents を呼び出し
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.78,
    match_count: 10,
  });

  if (error) throw error;
  return data;
}

// 使用例
const results = await semanticSearch('How to deploy a Next.js app?');
console.log(results);
// [
//   { id: 42, content: 'Deploying Next.js...', metadata: {...}, similarity: 0.92 },
//   { id: 17, content: 'Next.js deployment guide...', metadata: {...}, similarity: 0.87 },
//   ...
// ]
```

```sql
-- RLS を考慮した match_documents（認証ユーザーのデータのみ検索）
create or replace function match_user_documents(
  query_embedding vector(1536),
  match_threshold float default 0.78,
  match_count int default 10
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql security definer
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where
    documents.user_id = auth.uid()
    and 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

```sql
-- フィルタ付きセマンティック検索
create or replace function match_documents_by_category(
  query_embedding vector(1536),
  filter_category text,
  match_threshold float default 0.78,
  match_count int default 10
)
returns table (
  id bigint,
  content text,
  category text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.category,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where
    documents.category = filter_category
    and 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
```

## 注意点

- `match_threshold` は 0〜1 の範囲。0.78 はよく使われるデフォルト値だが、データとモデルに応じて調整が必要
- コサイン類似度は `1 - コサイン距離` で計算する。`<=>` 演算子はコサイン距離を返す
- `language sql stable` を指定すると PostgreSQL のオプティマイザが最適化しやすくなる
- RLS を適用する場合は `security definer` を使い、関数内でフィルタ条件を明示するパターンが一般的
- クエリの埋め込みと格納済み埋め込みは同じモデル・同じ次元数である必要がある
- `order by` の後に `limit` を付けないと全件返却となりパフォーマンスが低下する

## 関連

- [埋め込み生成](./embeddings.md)
- [ベクトルインデックス](./vector-indexes.md)
- [ハイブリッド検索](./hybrid-search.md)
- [RAG パイプライン](./rag.md)
