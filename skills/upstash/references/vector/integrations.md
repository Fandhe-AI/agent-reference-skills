# Integrations (AI SDK, LangChain, LlamaIndex, LlamaParse, Flowise, Langflow)

Using Upstash Vector as the vector store from third-party AI frameworks.

## Signature / Usage

LangChain (Python):

```python
from dotenv import load_dotenv
from langchain_community.vectorstores.upstash import UpstashVectorStore
from langchain.schema import Document

# Load environment variables
load_dotenv()

# Create a vector store instance
store = UpstashVectorStore(
    embedding=True,  # Embedding option enabled
)

# Sample documents to upload
documents = [
    Document(page_content="Upstash Vector is a scalable vector database."),
    Document(page_content="LangChain is a framework for building intelligent apps."),
    Document(page_content="Semantic search enables advanced query matching."),
]

# Add documents to the Upstash Vector index
store.add_documents(documents)

# Perform a similarity search
query = "What is LangChain?"
results = store.similarity_search(query, k=3)

print("Similarity Search Results:")
for res in results:
    print(res.page_content)
```

LlamaIndex (Python), namespace variant:

```python
vector_store = UpstashVectorStore(
    url="your_upstash_url",
    token="your_upstash_token",
    namespace="your_namespace"
)
```

Vercel AI SDK (TypeScript) with Upstash-hosted embeddings:

```typescript
import { Index } from '@upstash/vector'

// Configure Upstash Vector client
// Make sure UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN are in your .env
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
})

// Query
export async function findRelevantContent(query: string, k = 4) {
  const result = await index.query({
    data: query, // Again, using the data field instead of vector field
    topK: k,
    includeMetadata: true, // Fetch metadata as well
  })

  return result
}
```

## Options / Props

| Framework | Install | Notes |
| --- | --- | --- |
| Vercel AI SDK | `npm install @ai-sdk/openai ai zod @upstash/vector` | RAG chatbot with Next.js; chunk text, upsert with `data` (Upstash embeddings) or with `vector` (custom model, e.g. OpenAI `text-embedding-ada-002`, 1536 dimensions); `streamText` with `addResource` / `getInformation` tools |
| LangChain | `pip install upstash-vector langchain langchain-community python-dotenv` | `UpstashVectorStore(embedding=True)`; supports namespaces and metadata filtering |
| LlamaIndex | `pip install llama-index upstash-vector llama-index-vector-stores-upstash python-dotenv` | Index dimensions 1536, cosine; `StorageContext.from_defaults(vector_store=...)`, `VectorStoreIndex.from_documents` |
| LlamaParse | same as LlamaIndex | Parse files to markdown with `LlamaParse(result_type="markdown")`, then index with `UpstashVectorStore`; needs `LLAMA_CLOUD_API_KEY` |
| Flowise | `npm install -g flowise` then `npx flowise start` | Nodes: Upstash Vector, Upstash Redis Cache, Upstash Redis-Backed Chat Memory |
| Langflow | `pip install langflow upstash-vector` | File + Split + Upstash components for indexing and search |

## Notes

- Credentials come from `UPSTASH_VECTOR_REST_URL` / `UPSTASH_VECTOR_REST_TOKEN`; hosted-embedding indexes accept `data`, custom-embedding indexes need a matching dimension
- The Vercel AI SDK here is the client of the `ai` package; its own API belongs to the vercel-ai-sdk skill, and LangChain / LlamaIndex APIs belong to their own docs
- Sources: https://upstash.com/docs/vector/integrations/ai-sdk , https://upstash.com/docs/vector/integrations/langchain , https://upstash.com/docs/vector/integrations/llamaindex , https://upstash.com/docs/vector/integrations/llamaparse , https://upstash.com/docs/vector/integrations/flowise , https://upstash.com/docs/vector/integrations/langflow (fetched 2026-11-14; no version pin on the site)

## Related

- [embedding-models.md](./embedding-models.md)
- [namespace.md](./namespace.md)
- [tutorials.md](./tutorials.md)
