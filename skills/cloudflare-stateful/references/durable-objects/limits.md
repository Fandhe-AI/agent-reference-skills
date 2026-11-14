---
source: https://developers.cloudflare.com/durable-objects/platform/limits/
---

# Limits

Account, storage, CPU, SQL, outbound request-body and wall-time limits for Durable Objects. Workers limits also apply.

## Signature / Usage

Raise the CPU limit per invocation:

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"cpu_ms": 300000, // 300,000 milliseconds = 5 minutes
	},
	// ...rest of your configuration...
}
```

```toml
[limits]
cpu_ms = 300_000
```

## Options / Props

### SQLite-backed general limits

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Number of objects | limit | — | Unlimited (within an account or of a given class). |
| Durable Object classes per account | limit | — | 500 (Workers Paid) / 100 (Free); identical to the Workers script limit. |
| Storage per account | limit | — | Unlimited (Paid) / 5 GB (Free). 1 GB = 1,000,000,000 bytes. |
| Storage per class | limit | — | Unlimited. |
| Storage per Durable Object | limit | — | 10 GB (Free accounts are limited to 5 GB total). |
| Key size | limit | — | Key and value combined cannot exceed 8 MB. |
| Value size | limit | — | Key and value combined cannot exceed 8 MB. |
| WebSocket message size | limit | — | 32 MiB (received messages only). |
| CPU per request | limit | 30 seconds | Configurable up to 5 minutes of active CPU time; each incoming HTTP request or WebSocket message resets the 30 s. |
| Simultaneous outgoing connections per request | limit | — | 6. |

### SQL storage limits

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Columns per table | limit | — | 100 |
| Rows per table | limit | — | Unlimited (excluding per-object storage limits) |
| String, `BLOB` or table row size | limit | — | 8 MB |
| SQL statement length | limit | — | 100 KB |
| Bound parameters per query | limit | — | 100 |
| Arguments per SQL function | limit | — | 32 |
| `LIKE` / `GLOB` pattern | limit | — | 50 bytes |

### Key-value backed general limits

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Number of objects | limit | — | Unlimited. |
| Classes per account | limit | — | 500 (Paid) / 100 (Free). |
| Storage per account | limit | — | 50 GB (can be raised by contacting Cloudflare). |
| Storage per class / per object | limit | — | Unlimited. |
| Key size | limit | — | 2 KiB (2048 bytes). |
| Value size | limit | — | 128 KiB (131072 bytes). |
| WebSocket message size | limit | — | 32 MiB (received only). |
| CPU per request | limit | 30 s | Including WebSocket messages. |
| Simultaneous outgoing connections per request | limit | — | 6. |

### Outbound HTTP request body

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Outbound HTTP request body size | limit | 100 MiB (104,857,600 bytes) | Per `fetch()` request body from an object to an external service; larger bodies can fail with `413 Payload Too Large`. |

### Wall time by invocation type

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Incoming HTTP request | limit | Unlimited | While the client stays connected; `waitUntil()` extends execution up to 30 s after response or disconnect. |
| Cron Triggers | limit | 15 minutes | Per invocation. |
| Queue consumers | limit | 15 minutes | Per invocation. |
| Durable Object alarm handlers | limit | 15 minutes | Per invocation. |
| Durable Objects (RPC / HTTP) | limit | Unlimited | While the caller stays connected; the object stays active while a request, RPC call, response stream, WebSocket or pending I/O is in flight. |
| Workflows (per step) | limit | Unlimited | Subject to the configured CPU time limit. |

## Notes

- One object has a soft limit of 1,000 requests per second; simple small-value `get()` calls realize higher throughput than large JSON (de)serialization or repeated `list()` calls. Too many requests are queued and then fail with an overloaded error.
- CPU time is active processing time, excluding waiting on network, storage or other I/O. If you consume more than 30 s of compute between incoming network requests, the object has a heightened chance of eviction and reset.
- Storage exceeded: writes fail with `database or disk is full: SQLITE_FULL`; reads and `DELETE` still work. The FAQ and this page's footnotes differ on the per-object cap for the Free plan: the FAQ says 1 GB per object on Free and 10 GB on Paid, while the table above states 10 GB per object with Free accounts limited to 5 GB total. Treat the Free-plan per-object figure as ambiguous.
- Outbound body limit applies to each request body, including encoding and multipart fields; it does not limit the total uploaded across separate requests. The "Maximum Upload Size" setting for a custom domain does not control it. Streaming, chunked transfer encoding and `multipart/form-data` do not bypass it; use a multipart/resumable upload API or smaller parts. Increases are via account team or Cloudflare Support (state that it concerns outbound uploads from Containers or Durable Objects, with account ID, Worker name, object ID, destination host, body size, timestamps and logs).
- Increase requests for other limits use the Limit Increase Request Form: https://forms.gle/eX6pXvit1wBv77Yw5
- Free plan: the key-value backend is not available; delete all key-value namespaces before downgrading from Paid.
- `limits.cpu_ms` is Wrangler configuration (see the cloudflare-wrangler skill); Workers-wide limits are in cloudflare-workers.
- Spending limits are separate from the resource and Free plan limits on this page; see the spend-management page for effects on SQL queries, WebSockets and pending alarms.
- The SQLite-backed key/value and string/`BLOB`/row size limits are 8 MB (previously 2 MB in the 2026-11-03 snapshot).
- Source: https://developers.cloudflare.com/durable-objects/platform/limits/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [FAQ](./faq.md)
- [Pricing](./pricing.md)
- [Spending limits](./spend-management.md)
- [Troubleshooting](./troubleshooting.md)
- [Rules of Durable Objects](./rules-of-durable-objects.md)
