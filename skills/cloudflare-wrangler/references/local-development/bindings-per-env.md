---
source: https://developers.cloudflare.com/workers/local-development/bindings-per-env/
---

# Supported bindings per development mode

Matrix of which bindings support local simulations, remote binding connections, and legacy remote development.

## Signature / Usage

Local development (`wrangler dev` and the Cloudflare Vite plugin): Worker code always executes locally; bindings use local simulations by default, with per-binding remote connections available.

Snippet taken from https://developers.cloudflare.com/workers/local-development/#example-configuration (the matrix page itself has no code example).

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",

	"r2_buckets": [
		{
			"bucket_name": "screenshots-bucket",
			"binding": "screenshots_bucket",
			"remote": true,
		},
	],
}
```

| Binding | Local simulations | Remote binding connections |
| --- | --- | --- |
| **AI** | ❌ | ✅ |
| **Assets** | ✅ | ❌ |
| **Analytics Engine** | ✅ | ✅ |
| **Browser Run** | ✅ | ✅ |
| **D1** | ✅ | ✅ |
| **Durable Objects** | ✅ | ❌ <sup>[1](#user-content-fn-1)</sup> |
| **Containers** | ✅ | ❌ |
| **Email Bindings** | ✅ | ✅ |
| **Flagship** | ✅ | ✅ |
| **Hyperdrive** | ✅ | ❌ |
| **Images** | ✅ | ✅ |
| **KV** | ✅ | ✅ |
| **Media Transformations** | ❌ | ✅ |
| **mTLS** | ❌ | ✅ |
| **Queues** | ✅ | ✅ |
| **R2** | ✅ | ✅ |
| **Rate Limiting** | ✅ | ❌ |
| **Service Bindings (multiple Workers)** | ✅ | ✅ |
| **Vectorize** | ❌ | ✅ |
| **Workflows** | ✅ | ❌ |

## Remote development

Supported only in `wrangler dev --remote` — there is no Vite plugin equivalent. All Worker code is uploaded and executed on Cloudflare, and bindings always connect to remote resources. Local development with remote binding connections is recommended instead.

| Binding | Remote development |
| --- | --- |
| **AI** | ✅ |
| **Assets** | ✅ |
| **Analytics Engine** | ✅ |
| **Browser Run** | ✅ |
| **D1** | ✅ |
| **Durable Objects** | ✅ |
| **Containers** | ❌ |
| **Email Bindings** | ✅ |
| **Flagship** | ✅ |
| **Hyperdrive** | ✅ |
| **Images** | ✅ |
| **KV** | ✅ |
| **Media Transformations** | ✅ |
| **mTLS** | ✅ |
| **Queues** | ❌ |
| **R2** | ✅ |
| **Rate Limiting** | ✅ |
| **Service Bindings (multiple Workers)** | ✅ |
| **Vectorize** | ✅ |
| **Workflows** | ❌ |

## Notes

- Footnote 1: for Durable Objects and Workflows, see "Using remote resources with Durable Objects and Workflows" in `overview.md` for recommended workarounds.

## Related

- [Local development](./overview.md)
- [Choosing between Wrangler & Vite](./wrangler-vs-vite.md)
