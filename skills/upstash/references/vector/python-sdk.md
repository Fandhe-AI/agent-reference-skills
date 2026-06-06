# Python SDK (upstash-vector)

HTTP-based Upstash Vector client for Python 3.8+. API mirrors the TypeScript SDK with Python naming conventions (snake_case, keyword arguments for options).

## Signature / Usage

```python
from upstash_vector import Index

# From environment variables
index = Index.from_env()

# Explicit credentials
index = Index(
    url="UPSTASH_VECTOR_REST_URL",
    token="UPSTASH_VECTOR_REST_TOKEN",
)

# Upsert
index.upsert(vectors=[
    {"id": "1", "vector": [0.1, 0.2, 0.3], "metadata": {"genre": "fantasy"}},
])

# Query
results = index.query(
    vector=[0.1, 0.2, 0.3],
    top_k=5,
    include_metadata=True,
    include_data=True,
    filter="genre = 'fantasy'",
)

# Fetch
fetch_result = index.fetch(
    ids=["id-1", "id-2"],
    include_vectors=True,
    include_metadata=True,
    include_data=True,
)

# Namespace (keyword argument on each call)
index.upsert(vectors=[...], namespace="my-namespace")
index.query(vector=[...], top_k=5, namespace="my-namespace")
```

## Options / Props

**Differences from TypeScript SDK:**

| Feature | TypeScript | Python |
|---------|-----------|--------|
| Install | `npm install @upstash/vector` | `pip install upstash-vector` |
| Init from env | `new Index()` | `Index.from_env()` |
| Parameter style | camelCase options object | snake_case keyword args |
| Namespace access | `index.namespace("ns").query(...)` | `index.query(..., namespace="ns")` |
| Batch query | `index.query([...])` (array) | `index.query_many([...])` |
| `topK` param | `topK` | `top_k` |
| `includeMetadata` | `includeMetadata` | `include_metadata` |
| `includeVectors` | `includeVectors` | `include_vectors` |
| `includeData` | `includeData` | `include_data` |

**`Index` constructor options:**

| Name | Type | Description |
|------|------|-------------|
| `url` | `str` | REST URL from Upstash console |
| `token` | `str` | REST token from Upstash console |
| `retries` | `int` | Retry attempts on failure. Default: 3 |
| `retry_interval` | `float` | Seconds between retries. Default: 1.0 |
| `allow_telemetry` | `bool` | Anonymous usage telemetry. Default: `True` |

## Notes

- `query_many()` executes multiple queries in a single request (batch)
- Built-in retry: up to 3 attempts, 1 second apart by default
- Initialize `Index` outside request handlers in serverless environments to reuse connections
- Telemetry collects SDK version, platform (Vercel, AWS), and Python runtime version only

## Related

- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [upsert.md](./upsert.md)
- [query.md](./query.md)
- [namespace.md](./namespace.md)
