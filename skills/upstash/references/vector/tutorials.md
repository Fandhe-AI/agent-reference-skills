# Tutorials

Official end-to-end tutorials for Upstash Vector (Python): semantic search, LangChain, Hugging Face embeddings, LlamaIndex, LlamaParse, Gradio.

## Signature / Usage

Simple semantic search with Upstash-hosted embeddings:

Adapted (not in the official docs): the official snippet passes the raw text as the second tuple element (the vector slot); it is registered with `Data(id=..., data=..., metadata=...)` instead, the input type for indexes with an embedding model (see embedding-models.md).

```python
from upstash_vector import Index
from upstash_vector.types import Data
from dotenv import load_dotenv
import time

# Load environment variables from a .env file
load_dotenv()

# Initialize the index from environment variables (URL and token)
index = Index.from_env()

# Example documents to be indexed
documents = [
    {"id": "1", "text": "Python is a popular programming language."},
    {"id": "2", "text": "Machine learning enables computers to learn from data."},
    {"id": "3", "text": "Upstash provides low-latency database solutions."},
    {"id": "4", "text": "Semantic search is a technique for understanding the meaning of queries."},
    {"id": "5", "text": "Cloud computing allows for scalable and flexible resource management."}
]

# Reset the index to remove previous data
index.reset()

# Upsert documents into Upstash (embeddings are generated automatically)
for doc in documents:
    index.upsert(
        vectors=[
            Data(id=doc["id"], data=doc["text"], metadata={"text": doc["text"]})
        ]
    )
    print(f"Document {doc['id']} inserted.")

# Wait for the documents to be indexed
time.sleep(1)

# Search for documents similar to the query
query = "What is Python?"
results = index.query(data=query, top_k=3, include_metadata=True)

# Display search results
print("Search Results:")
for result in results:
    print(f"ID: {result.id}")
    print(f"Score: {result.score:.4f}")
    print(f"Metadata: {result.metadata}")
    print("-" * 40)  # Separator line between results
```

## Options / Props

| Tutorial | Install | Notes |
| --- | --- | --- |
| Simple Semantic Search | `pip install upstash-vector python-dotenv` | Index with an embedding model; `index.reset()` then `upsert` and `query(data=...)` |
| Semantic Search with LangChain | `pip install upstash-vector python-dotenv langchain langchain-community` | Uploads a global warming document and runs a similarity search |
| Hugging Face Embeddings | `pip install langchain sentence_transformers upstash-vector python-dotenv langchain-community langchain-huggingface` | Local embeddings; use Python 3.9 to avoid `torch` compatibility issues |
| RAG with LlamaIndex | `pip install llama-index upstash-vector llama-index-vector-stores-upstash python-dotenv` | Index dimensions 1536, cosine; needs `OPENAI_API_KEY` |
| LlamaParse | same as LlamaIndex | Parse a document first, then query it; needs `LLAMA_CLOUD_API_KEY` |
| Gradio RAG app | `pip install gradio langchain sentence_transformers upstash-vector python-dotenv transformers langchain-community langchain-huggingface` | Interactive search and Q&A UI; Python 3.9 recommended |

## Notes

- Adapted from the official docs: the "Simple Semantic Search" upsert uses `upstash_vector.types.Data` instead of a `(id, text, metadata)` tuple, because the vector slot of a tuple takes numeric vectors (`Data` signature checked against the `upstash/vector-py` source on 2026-11-14)
- Each tutorial reads `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN` from a `.env` file
- Vector is eventually consistent, hence the short wait before querying in the sample
- Source: https://upstash.com/docs/vector/tutorials/semantic_search (and sibling tutorial pages: langchain, huggingface-embeddings, llamaindex, llamaparse, gradio-application) (fetched 2026-11-14; no version pin on the site)

## Related

- [integrations.md](./integrations.md)
- [embedding-models.md](./embedding-models.md)
- [query.md](./query.md)
