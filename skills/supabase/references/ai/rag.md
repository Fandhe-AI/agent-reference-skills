# RAG パイプライン

Retrieval-Augmented Generation。ドキュメントの分割・埋め込み・検索・LLM への受け渡しによる、知識ベースを活用した AI 応答生成。

## 概要

RAG（Retrieval-Augmented Generation）は、LLM に外部知識を与えて正確な応答を生成する手法。Supabase を使った RAG パイプラインは以下のステップで構成される。

### RAG パイプラインの流れ

1. **ドキュメント分割（Chunking）**: 長いドキュメントを適切なサイズのチャンクに分割
2. **埋め込み生成**: 各チャンクをベクトル化
3. **ベクトル格納**: pgvector でデータベースに格納
4. **検索（Retrieval）**: ユーザーのクエリに類似するチャンクを検索
5. **生成（Generation）**: 検索結果をコンテキストとして LLM に渡し、回答を生成

### RLS による権限付き RAG

Supabase の RLS を活用することで、ユーザーごとにアクセス可能なドキュメントのみを検索対象にできる。これにより、マルチテナント環境でも安全な RAG を実現。

## コード例

```sql
-- RAG 用テーブルの作成
create table documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb default '{}',
  embedding vector(1536),
  user_id uuid references auth.users(id),
  created_at timestamptz default now()
);

-- RLS の有効化
alter table documents enable row level security;

-- ユーザーは自分のドキュメントのみアクセス可能
create policy "Users can access own documents"
  on documents for select
  using (auth.uid() = user_id);

-- ベクトルインデックスの作成
create index on documents
using hnsw (embedding vector_cosine_ops)
with (m = 16, ef_construction = 64);

-- RAG 用の検索関数
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.78,
  match_count int default 5
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

```typescript
// === Edge Functions で RAG パイプライン実装 ===
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import OpenAI from 'https://esm.sh/openai@4';

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

serve(async (req) => {
  const { query } = await req.json();

  // Authorization ヘッダーからユーザートークンを取得
  const authHeader = req.headers.get('Authorization')!;
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  // 1. クエリをベクトル化
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  // 2. 類似ドキュメントを検索（RLS が適用される）
  const { data: documents, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.78,
    match_count: 5,
  });

  if (error) throw error;

  // 3. 検索結果をコンテキストとして LLM に渡す
  const context = documents.map((doc: any) => doc.content).join('\n\n');

  const chatResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant. Use the following context to answer the user's question. If the context doesn't contain relevant information, say so.\n\nContext:\n${context}`,
      },
      {
        role: 'user',
        content: query,
      },
    ],
    max_tokens: 1024,
  });

  const answer = chatResponse.choices[0].message.content;

  return new Response(
    JSON.stringify({
      answer,
      sources: documents.map((doc: any) => ({
        id: doc.id,
        content: doc.content.substring(0, 200),
        similarity: doc.similarity,
      })),
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

```typescript
// === ドキュメントの分割と埋め込み格納 ===
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ドキュメントをチャンクに分割
function splitDocument(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
  }
  return chunks;
}

async function ingestDocument(content: string, metadata: Record<string, any>) {
  const chunks = splitDocument(content);

  // バッチで埋め込みを生成
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks,
  });

  // Supabase に格納
  const rows = chunks.map((chunk, i) => ({
    content: chunk,
    metadata,
    embedding: embeddingResponse.data[i].embedding,
  }));

  const { error } = await supabase.from('documents').insert(rows);
  if (error) throw error;
}
```

```typescript
// === クライアント側から RAG Edge Function を呼び出す ===
const { data, error } = await supabase.functions.invoke('rag-search', {
  body: { query: 'How do I set up authentication?' },
});

console.log(data.answer);   // LLM の回答
console.log(data.sources);  // 参照されたドキュメント
```

## 注意点

- チャンクサイズはモデルのコンテキストウィンドウと検索精度のトレードオフ。500〜1500 文字が一般的
- オーバーラップ（重複）を設定すると、チャンク境界にまたがる情報の欠落を防げる
- RLS を適用した RAG では、`anon key` + ユーザートークンを使う。`service_role key` を使うと RLS がバイパスされる
- Edge Functions のタイムアウト（デフォルト 150 秒）に注意。大量のドキュメント処理はバックグラウンドジョブで行う
- LLM に渡すコンテキストが大きすぎるとトークン制限に達する。検索結果数を適切に制限する
- ハルシネーション防止のため、回答に「ソースに基づく情報がない」旨を含めるプロンプト設計が重要

## 関連

- [セマンティック検索](./semantic-search.md)
- [埋め込み生成](./embeddings.md)
- [ハイブリッド検索](./hybrid-search.md)
- [ベクトルインデックス](./vector-indexes.md)
