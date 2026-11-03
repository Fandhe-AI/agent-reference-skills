---
source: https://developers.cloudflare.com/kv/platform/limits/
---

# Limits

Account and namespace limits for Workers KV and Workers KV Instant.

## Signature / Usage

Workers KV limits (footnote 1: within a single invocation, a Worker can make up to 1,000 operations to external services, e.g. 500 Workers KV reads and 500 R2 reads; a bulk request to Workers KV counts as 1 request. Footnote 2: the maximum `cacheTtl` is `Number.MAX_SAFE_INTEGER`.):

| Feature | Free | Paid |
| --- | --- | --- |
| Reads | 100,000 reads per day | Unlimited |
| Writes to different keys | 1,000 writes per day | Unlimited |
| Writes to same key | 1 per second | 1 per second |
| Operations/Worker invocation (1) | 1000 | 1000 |
| Namespaces per account | 1,000 | Unlimited, with a default limit of 1,000. Each namespace above 1,000 costs $0.10 per month. |
| Storage/account | 1 GB | Unlimited |
| Storage/namespace | 1 GB | Unlimited |
| Keys/namespace | Unlimited | Unlimited |
| Key size | 512 bytes | 512 bytes |
| Key metadata | 1024 bytes | 1024 bytes |
| Value size | 25 MiB | 25 MiB |
| Minimum `cacheTtl` (2) | 30 seconds | 30 seconds |

Workers KV Instant limits (private beta):

| Feature | Limit |
| --- | --- |
| Writes/namespace | 1 per second |
| Storage/namespace | 1 MB |
| Keys/namespace | 10,000 |
| Key size | 300 bytes |
| Key metadata | Not supported |
| Value size | Any size that keeps the total namespace within 1 MB |
| List pagination | Not supported. All matching keys are returned in one response. |

Snippet taken from https://developers.cloudflare.com/kv/api/write-key-value-pairs/#expiring-keys. The `expirationTtl` minimum (60 seconds), the 1024-byte metadata limit and the 25 MiB value limit apply to this call; the minimum `cacheTtl` (30 seconds) applies to `get()` options, shown in `api-read.md`.

```js
await env.NAMESPACE.put(key, value, {
	expiration: secondsSinceEpoch,
});

await env.NAMESPACE.put(key, value, {
	expirationTtl: secondsFromNow,
});
```

## Notes

- Workers KV Instant is in private beta; enrollment is through your Cloudflare account team or the Workers KV Instant beta sign-up form.
- To request a higher limit, use the Cloudflare Limit Increase Request Form.
- REST API access is subject to the rate limits that apply to all operations of the Cloudflare REST API.

## Related

- [pricing.md](./pricing.md)
- [api-write.md](./api-write.md)
- [api-read.md](./api-read.md)
