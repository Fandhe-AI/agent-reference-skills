---
source: https://developers.cloudflare.com/vectorize/best-practices/create-indexes/
---

# Create indexes

An index has a fixed name, dimension size, and distance metric; none of its configuration can change after creation.

## Signature / Usage

```sh
npx wrangler vectorize create your-index-name --dimensions=768 --metric=cosine
```

Adapted (not in the official docs): read the API token from an environment variable instead of a placeholder literal, fix indentation, and check the status; see Notes.

```py
import os
import requests

account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
url = "https://api.cloudflare.com/client/v4/accounts/{}/vectorize/v2/indexes".format(account_id)

headers = {
    "Authorization": "Bearer {}".format(os.environ["CLOUDFLARE_API_TOKEN"])
}

body = {
    "name": "demo-index",
    "description": "some index description",
    "config": {
        "dimensions": 1024,
        "metric": "euclidean"
    },
}

resp = requests.post(url, headers=headers, json=body)
resp.raise_for_status()

print('Status Code:', resp.status_code)
print('Response JSON:', resp.json())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | — | Kebab-cased name such as `prod-search-index` or `recommendations-idx-dev`. Cannot equal the name of a currently active index; a deleted index's name can be reused. |
| dimensions | number | — | Fixed dimension size of each vector, for example 384 or 1536. |
| metric | string | — | Fixed distance metric: `cosine`, `euclidean`, or `dot-product`. |
| description | string | — | Optional description (REST body; also `--description` on the CLI). |

### Example embedding models

| Model / Embeddings API | Output dimensions | Use-case |
|------------------------|-------------------|----------|
| Workers AI `@cf/baai/bge-base-en-v1.5` | 768 | Text |
| OpenAI `ada-002` | 1536 | Text |
| Cohere `embed-multilingual-v2.0` | 768 | Text |
| Google Cloud `multimodalembedding` | 1408 | Multi-modal (text, images) |

## Notes

- Adapted from the official docs: the Python example used a literal `<your-api-token>` placeholder and mixed indentation; it now reads credentials from `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` and calls `raise_for_status()`. The source says a successful call prints status code `201`.
- Vectorize V2 needs wrangler 3.71.0 or later; use `npx wrangler@latest vectorize` for the latest.
- Legacy (V1) indexes need `wrangler vectorize --deprecated-v1`; see the legacy transition page.
- Dimensions are fixed; indexes expect dense vectors of exactly that length. Smaller dimensions can be faster to search; larger ones can be more accurate on large or very similar datasets.
- The tutorials say a good name is lowercase/numeric ASCII, shorter than 32 characters, starts with a letter, and uses dashes; the limits page states a maximum of 64 bytes.
- The CLI name is only used to describe the index and is referenced by the binding's `index_name`.
- Wrangler flags: see cloudflare-wrangler (commands/vectorize.md).

## Related

- [Distance metrics](./distance-metrics.md)
- [Limits](./limits.md)
- [Getting started](./getting-started.md)
- [Legacy V1 transition](./legacy-v1-transition.md)
