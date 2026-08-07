# Python SDK (upstash-search)

HTTP-based Upstash Search client for Python. API mirrors the TypeScript SDK with Python naming conventions (snake_case).

## Signature / Usage

```python
from upstash_search import Search

# From environment variables
client = Search.from_env()

# Explicit credentials
client = Search(
    url="<SEARCH_INDEX_REST_URL>",
    token="<SEARCH_INDEX_REST_TOKEN>",
)

index = client.index("films")

index.upsert(
    documents=[
        {
            "id": "movie-0",
            "content": {"title": "Star Wars", "overview": "Sci-fi space opera"},
            "metadata": {"poster": "https://poster.link/starwars.jpg"},
        },
    ],
)

scores = index.search(query="space opera", limit=10)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `str` | REST URL. Falls back to `UPSTASH_SEARCH_REST_URL` env var |
| `token` | `str` | REST token. Falls back to `UPSTASH_SEARCH_REST_TOKEN` env var |
| `allow_telemetry` | `bool` | Anonymous usage telemetry (SDK version, platform, runtime). Default: `True` |

## Notes

- Install: `pip install upstash-search`
- `search()`'s `limit` defaults to `10` in Python, vs. `5` in the TypeScript SDK
- This is the Upstash **Search** SDK (`upstash-search`), distinct from `vector/python-sdk.md` (`upstash-vector`) in this skill

## Related

- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [getting-started.md](./getting-started.md)
- [upsert.md](./upsert.md)
- [search.md](./search.md)
