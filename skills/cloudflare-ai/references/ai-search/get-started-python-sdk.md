---
source: https://developers.cloudflare.com/ai-search/get-started/python/
---

# Get started: Python SDK

Create, populate, and query an instance from Python with the `cloudflare` package.

## Signature / Usage

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install cloudflare
export CLOUDFLARE_ACCOUNT_ID="<ACCOUNT_ID>"
export CLOUDFLARE_API_TOKEN="<API_TOKEN>"
```

```python
import os

from cloudflare import Cloudflare

client = Cloudflare(api_token=os.environ["CLOUDFLARE_API_TOKEN"])
account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]

instance = client.aisearch.namespaces.instances.create(
    name="default",
    account_id=account_id,
    id="my-instance",
)

item = client.aisearch.namespaces.instances.items.upload(
    id="my-instance",
    account_id=account_id,
    name="default",
    file={
        "file": (
            "getting-started.md",
            b"AI Search indexes uploaded content for retrieval.",
            "text/markdown",
        ),
        "wait_for_completion": True,
    },
)

results = client.aisearch.namespaces.instances.search(
    id="my-instance",
    account_id=account_id,
    name="default",
    query="How does AI Search handle uploaded content?",
)

if results.chunks:
    print(results.chunks[0].text)
```

## Notes

- Requires Python 3.8 or later and an API token with AI Search:Edit and AI Search:Run.
- In the SDK, `name` is the namespace name and `id` is the instance name.
- Creating an instance is a one-time action; instance names are unique per namespace.
- `wait_for_completion: True` waits for indexing; `item.status` may still be `running`.

## Related

- [REST API: instances and items](./rest-api-instances-items.md)
- [Agent framework integrations](./agent-sdks.md)
