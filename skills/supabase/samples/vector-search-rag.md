# Vector Search and RAG

Store document embeddings in pgvector and build a Retrieval-Augmented Generation pipeline.

```sql
-- Enable pgvector extension
create extension if not exists vector;

-- Table for document chunks with embeddings
create table documents (
  id        bigserial primary key,
  content   text not null,
  metadata  jsonb default '{}',
  embedding vector(1536),
  user_id   uuid references auth.users(id),
  created_at timestamptz default now()
);

-- RLS: users access only their own documents
alter table documents enable row level security;
create policy "Users can access own documents"
  on documents for select
  using (auth.uid() = user_id);

-- HNSW index for fast similarity search
create index on documents
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- Similarity search function
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.78,
  match_count     int   default 5
)
returns table (id bigint, content text, metadata jsonb, similarity float)
language plpgsql as $$
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
// Ingest: chunk a document and store embeddings (Node.js / server)
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
const openai = new OpenAI()

async function ingestDocument(text: string, metadata: Record<string, unknown>) {
  // Split into chunks
  const chunkSize = 1000, overlap = 200
  const chunks: string[] = []
  for (let start = 0; start < text.length; start += chunkSize - overlap) {
    chunks.push(text.slice(start, start + chunkSize))
  }

  // Generate embeddings in one batch call
  const { data: embeddings } = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks,
  })

  // Insert all chunks
  const rows = chunks.map((content, i) => ({
    content,
    metadata,
    embedding: embeddings[i].embedding,
  }))
  const { error } = await supabase.from('documents').insert(rows)
  if (error) throw error
}
```

```typescript
// supabase/functions/rag-search/index.ts — RAG Edge Function
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'https://esm.sh/openai@4'

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })

Deno.serve(async (req) => {
  const { query } = await req.json()
  const authHeader = req.headers.get('Authorization')!

  // User-scoped client — RLS applies automatically
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  // 1. Embed the query
  const { data: [{ embedding }] } = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  })

  // 2. Retrieve relevant chunks
  const { data: docs, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5,
  })
  if (error) throw error

  // 3. Generate answer with retrieved context
  const context = docs.map((d: any) => d.content).join('\n\n')
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: `Answer using this context:\n\n${context}` },
      { role: 'user', content: query },
    ],
  })

  return new Response(
    JSON.stringify({ answer: choices[0].message.content, sources: docs }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

## Notes

- Use HNSW index (`vector_cosine_ops`) for low-latency approximate nearest-neighbor search
- Chunk size of 500–1500 characters balances retrieval precision and LLM context usage
- Pass the user's JWT to the Edge Function client so RLS restricts the search to the user's documents
- `service_role` key bypasses RLS — use it only in trusted ingestion scripts, not in user-facing functions
