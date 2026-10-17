# Vercel Python SDK (vercel.functions)

Python helper APIs for Vercel Functions, provided by the `vercel` package.

## Signature / Usage

```python
pip install vercel
```

```python
from vercel.functions import get_env

print(get_env().VERCEL_REGION)
```

## Methods

| Name | Params | Description |
|------|--------|-------------|
| `get_env` | none | Gets Vercel System Environment Variables |
| `geolocation` | `request_or_headers: RequestLike \| HeadersLike` | Location info (`city`, `country`, `flag`, `countryRegion`, `region`, `latitude`, `longitude`, `postalCode`) |
| `ip_address` | `request_or_headers: RequestLike \| HeadersLike` | IP address of the request from headers |
| `RuntimeCache` | `key_hash_function: Callable[[str], str]`, `namespace: str`, `namespace_separator: str` (all optional) | Vercel Runtime Cache client |
| `AsyncRuntimeCache` | same as `RuntimeCache` | Awaitable variant using the same underlying cache |

`RuntimeCache` / `AsyncRuntimeCache` methods:

| Method | Params | Description |
|--------|--------|-------------|
| `get` | `key: str` | Retrieve a value |
| `set` | `key: str, value: object, options?: { name?: str; tags?: list[str]; ttl?: int }` | Store a value with optional TTL / tags |
| `delete` | `key: str` | Remove by key |
| `expire_tag` | `tag: str \| Sequence[str]` | Expire entries by tag |

```python
from fastapi import FastAPI, Request
from vercel.functions import RuntimeCache

app = FastAPI()
cache = RuntimeCache()

@app.get("/expire-blog")
def expire_blog(request: Request):
    cache.expire_tag("blog")
    return {"ok": True}
```

## Notes

- `expire_tag` propagates globally across all Vercel regions within 300ms
- Runtime Cache is isolated per environment (`preview` / `production`); per project on Pro and Enterprise, shared across the team on Hobby. Persisted across deployments; TTL and tag updates are not reconciled between deployments (purge the cache or change the key)
- No first-class ISR integration: tags do not apply to ISR pages and TTLs do not affect ISR revalidation time
- Limits: max item size 2 MB, 128 tags per item, 256-byte tags. Usage is charged
- Node.js equivalent is `@vercel/functions` (see functions-api-reference.md)

## Related

- [functions-api-reference.md](./functions-api-reference.md)
- [python-runtime.md](./python-runtime.md)
