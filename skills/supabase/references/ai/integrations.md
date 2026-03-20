# 外部連携

LangChain、LlamaIndex、Amazon Bedrock など主要 AI フレームワークとの Supabase ベクトルストア連携。

## 概要

Supabase の pgvector は、主要な AI/LLM フレームワークからベクトルストアとして利用できる。各フレームワークは専用のインテグレーションモジュールを提供しており、少ない設定コードで Supabase をベクトルデータベースとして組み込める。

### 対応フレームワーク

| フレームワーク | パッケージ | 言語 |
|----------------|------------|------|
| LangChain | `@langchain/community` / `langchain` (Python) | TypeScript / Python |
| LlamaIndex | `llama-index-vector-stores-supabase` | Python |
| Amazon Bedrock | Knowledge Base 連携 | - |

## コード例

```typescript
// === LangChain (TypeScript) ===
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-embedding-3-small',
});

// ベクトルストアの作成とドキュメント追加
const vectorStore = await SupabaseVectorStore.fromTexts(
  [
    'Supabase is an open source Firebase alternative.',
    'PostgreSQL is a powerful relational database.',
    'pgvector adds vector operations to PostgreSQL.',
  ],
  [
    { source: 'supabase-docs' },
    { source: 'postgres-docs' },
    { source: 'pgvector-docs' },
  ],
  embeddings,
  {
    client: supabase,
    tableName: 'documents',
    queryName: 'match_documents',
  }
);

// 類似検索
const results = await vectorStore.similaritySearch(
  'What is Supabase?',
  5 // match_count
);
console.log(results);

// 既存のベクトルストアに接続
const existingStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: 'documents',
  queryName: 'match_documents',
});

// フィルタ付き検索
const filteredResults = await existingStore.similaritySearch(
  'database features',
  5,
  { source: 'postgres-docs' }
);
```

```python
# === LangChain (Python) ===
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings
from supabase import create_client

supabase = create_client(
    "https://[REF].supabase.co",
    "[SERVICE_ROLE_KEY]"
)

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key="[OPENAI_API_KEY]"
)

# ドキュメントからベクトルストアを作成
vector_store = SupabaseVectorStore.from_texts(
    texts=[
        "Supabase is an open source Firebase alternative.",
        "PostgreSQL is a powerful relational database.",
    ],
    metadatas=[
        {"source": "supabase-docs"},
        {"source": "postgres-docs"},
    ],
    embedding=embeddings,
    client=supabase,
    table_name="documents",
    query_name="match_documents",
)

# 類似検索
results = vector_store.similarity_search("What is Supabase?", k=5)

# スコア付き検索
results_with_scores = vector_store.similarity_search_with_relevance_scores(
    "What is Supabase?", k=5
)
for doc, score in results_with_scores:
    print(f"Score: {score:.4f} - {doc.page_content[:100]}")

# Retriever として使用（LangChain の chain に組み込み）
retriever = vector_store.as_retriever(search_kwargs={"k": 5})
```

```python
# === LlamaIndex ===
# pip install llama-index-vector-stores-supabase

from llama_index.vector_stores.supabase import SupabaseVectorStore
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext

# Supabase ベクトルストアの設定
vector_store = SupabaseVectorStore(
    postgres_connection_string="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres",
    collection_name="documents",
    dimension=1536,
)

# ストレージコンテキストの作成
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# ドキュメントの読み込みとインデックス作成
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
)

# クエリエンジンの作成
query_engine = index.as_query_engine()
response = query_engine.query("What is Supabase?")
print(response)

# 既存のインデックスに接続
index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
```

```python
# === Amazon Bedrock Knowledge Base ===
# Supabase を Amazon Bedrock Knowledge Base のベクトルストアとして使用
# AWS コンソールまたは AWS SDK で設定

import boto3

bedrock_agent = boto3.client("bedrock-agent", region_name="us-east-1")

# Knowledge Base の作成（Supabase をストレージとして指定）
# 実際の設定は AWS コンソールから行うのが推奨
# 必要な情報:
#   - Supabase Database URL
#   - テーブル名
#   - ベクトルカラム名
#   - テキストカラム名
#   - メタデータカラム名
```

```sql
-- LangChain / LlamaIndex で使用するテーブルとマッチ関数
-- LangChain のデフォルトスキーマ
create table documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(1536)
);

create or replace function match_documents(
  query_embedding vector(1536),
  filter jsonb default '{}',
  match_count int default 10
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
  where documents.metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

## 注意点

- LangChain の `SupabaseVectorStore` は `match_documents` という名前の RPC 関数を期待する。テーブル名・関数名はカスタマイズ可能
- LlamaIndex は `vecs` ライブラリを内部的に使用し、`vecs` スキーマにテーブルを作成する
- `service_role key` を使うと RLS がバイパスされるため、サーバーサイドでのみ使用する
- LangChain のメタデータフィルタは JSONB の `@>` 演算子でマッチするため、`metadata` カラムに GIN インデックスを作成すると高速化できる
- フレームワークのバージョンアップにより API が変更される場合がある。公式ドキュメントを確認
- Amazon Bedrock 連携は AWS 側の設定も必要。IAM ロール、VPC 設定等が必要な場合がある

## 関連

- [AI & Vectors 概要](./overview.md)
- [セマンティック検索](./semantic-search.md)
- [RAG パイプライン](./rag.md)
- [Python クライアント](./python-clients.md)
