# Getting Started

Creating an Upstash Search database, adding documents, and running your first search.

## Signature / Usage

```ts
import { Search } from "@upstash/search"

const client = new Search({
  url: "<SEARCH_INDEX_REST_URL>",
  token: "<SEARCH_INDEX_REST_TOKEN>",
})

const index = client.index("movies")

// Add documents
await index.upsert([
  {
    id: "star-wars",
    content: { title: "Star Wars", genre: "sci-fi", category: "classic" },
    metadata: { director: "George Lucas" },
  },
])

// Search
const searchResults = await index.search({
  query: "space opera",
  limit: 2,
  reranking: true,
})
```

```python
from upstash_search import Search

client = Search(
    url="<UPSTASH_SEARCH_REST_URL>",
    token="<UPSTASH_SEARCH_REST_TOKEN>",
)

index = client.index("movies")

index.upsert(
    documents=[
        {
            "id": "movie-0",
            "content": {
                "title": "Star Wars",
                "overview": "Sci-fi space opera",
                "genre": "sci-fi",
            },
            "metadata": {"poster": "https://poster.link/starwars.jpg"},
        },
    ],
)

scores = index.search(query="space opera", limit=2)
```

## Notes

- A database is created from the dashboard (`Vector` tab → `Search Database` under `Create`); name it and pick a region
- Documents can be added via dashboard, SDKs (TypeScript/Python), or the REST API
- An `index` (analogous to a table) groups documents; use one index for a single search space, or one index per tenant for multi-tenant isolation
- This product is separate from Upstash **Redis Search** (`references/redis/search-*.md` in this skill), the full-text search extension built into Redis databases

## Related

- [overview.md](./overview.md)
- [indexes.md](./indexes.md)
- [content-and-metadata.md](./content-and-metadata.md)
- [search.md](./search.md)
- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [python-sdk.md](./python-sdk.md)
