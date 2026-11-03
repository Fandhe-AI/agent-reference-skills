---
source: https://developers.cloudflare.com/workers/platform/limits/
---

# Limits

Plan and platform limits for Cloudflare Workers (CPU time, memory, subrequests, size, routes, static assets, logs).

## Signature / Usage

Raise the CPU time limit on the Workers Paid plan (default 30 seconds, max 5 minutes):

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"cpu_ms": 300000, // default is 30000 (30 seconds)
	},
	// ...rest of your configuration...
}
```

```toml
[limits]
cpu_ms = 300_000
```

See the cloudflare-wrangler skill for the full `limits` configuration.

## Options / Props

### Account plan limits

| Feature | Workers Free | Workers Paid |
| --- | --- | --- |
| Requests | 100,000/day | No limit |
| CPU time | 10 ms | 5 min |
| Memory | 128 MB | 128 MB |
| Subrequests | 50/request | 10,000/request |
| Simultaneous outgoing connections/request | 6 | 6 |
| Environment variables | 64/Worker | 128/Worker |
| Environment variable size | 5 KB | 5 KB |
| Worker size | 64 MiB | 64 MiB |
| Worker startup time | 1 second | 1 second |
| Number of Workers | 100 | 500 (higher: use Workers for Platforms) |
| Number of Cron Triggers per account | 5 | 250 |
| Number of Static Asset files per Worker version | 20,000 | 100,000 |
| Individual Static Asset file size | 25 MiB | 25 MiB |

To request an adjustment, use the Limit Increase Request Form (https://forms.gle/eX6pXvit1wBv77Yw5).

### Request and response limits

| Limit | Value |
| --- | --- |
| URL size | 16 KB |
| Request header size | 128 KB (total) |
| Response header size | 128 KB (total) |
| Response body size | No enforced limit |

Request body size depends on the domain's Cloudflare plan (exceeding returns `413 Request entity too large`):

| Cloudflare Plan | Maximum request body size |
| --- | --- |
| Free | 100 MB |
| Pro | 100 MB |
| Business | 200 MB |
| Enterprise | Up to 5 GB (self-serve) |

Enterprise customers adjust it from the zone's **Network** page (**Maximum Upload Size**). HTTP request bodies sent to an external service by a Durable Object or Container outbound handler are limited to 100 MiB by default. CDN cache limits apply to responses: 512 MB for Free, Pro, and Business, 5 GB for Enterprise.

### CPU time

CPU time measures CPU spent executing Worker code; waiting on network (`fetch()`, KV, database) does not count.

| Limit | Workers Free | Workers Paid |
| --- | --- | --- |
| CPU time per HTTP request | 10 ms | 5 min (default: 30 seconds) |
| CPU time per Cron Trigger | 10 ms | 30 seconds (< 1 hour interval); 15 min (>= 1 hour interval) |

Exceeding it returns Error 1102 (`Worker exceeded resource limits`); outcome `exceededCpu`. Fixes: raise `cpu_ms`, profile with DevTools, offload to Durable Objects or smaller chunks. The average Worker uses about 2.2 ms per request.

### Memory

128 MB per isolate (JS heap and WebAssembly), not per invocation. Exceeding returns Error 1102 with outcome `exceededMemory`; you may also see `Memory limit would be exceeded before EOF`. Fixes: stream bodies (`TransformStream`, `node:stream`), keep large data in KV / R2 / D1, use Zod 4.5.0 or later, profile memory with DevTools. In-flight requests complete and a new isolate is created for subsequent requests.

### Duration (wall time)

| Trigger type | Duration limit |
| --- | --- |
| HTTP request | No limit |
| Cron Trigger | 15 min |
| Durable Object Alarm | 15 min |
| Queue Consumer | 15 min |

`ctx.waitUntil()` extends execution up to 30 seconds after the response is sent or the client disconnects. During runtime updates, old-version processes give existing requests and connections up to 20 minutes to finish.

| Invocation type | Wall time limit |
| --- | --- |
| Incoming HTTP request | Unlimited |
| Cron Triggers | 15 minutes |
| Queue consumers | 15 minutes |
| Durable Object alarm handlers | 15 minutes |
| Durable Objects (RPC / HTTP) | Unlimited |
| Workflows (per step) | Unlimited (step CPU time limit applies) |

### Daily requests

No general requests-per-second limit. Free plan: 100,000 requests/day, resetting at midnight UTC; exceeding returns Error 1027.

| Route mode | Behavior |
| --- | --- |
| Fail open | Bypasses the Worker. Requests behave as if no Worker is configured. |
| Fail closed | Returns a Cloudflare `1027` error page. Use this for security-critical Workers. |

### Subrequests

| Limit | Workers Free | Workers Paid |
| --- | --- | --- |
| Subrequests per invocation | 50 | 10,000 (up to 10M) |
| Subrequests to internal services | 1,000 | Matches configured limit (default 10,000) |

Each subrequest in a redirect chain counts. Change per Worker through `limits` in the Wrangler configuration. Calling another Worker on the same zone with global `fetch()` fails; use Service Bindings.

### Simultaneous open connections

Up to six connections can simultaneously wait for response headers per invocation. Counted: `fetch()`, KV `get/put/list/delete`, Cache `put/match/delete`, R2 `list/get/put/delete/head`, Queues `send/sendBatch`, TCP `connect()`, outbound WebSockets. A seventh is queued. Service-bound Workers share the top-level request's limit.

```js
const response = await fetch(url);

// Only read the response body for successful responses
if (response.status <= 299) {
	// Call response.json(), response.text() or otherwise process the body
} else {
	// Explicitly cancel it
	response.body.cancel();
}
```

### Environment variables, Worker size, startup

| Limit | Workers Free | Workers Paid |
| --- | --- | --- |
| Variables per Worker (secrets + text) | 64 | 128 |
| Variable size | 5 KB | 5 KB |
| Variables per account | No limit | No limit |
| Worker size (uncompressed) | 64 MiB | 64 MiB |
| Startup time | 1 second | 1 second |

No compressed size limit. Check bundle size with:

```sh
wrangler deploy --outdir bundled/ --dry-run
```

Startup rejection error: `Script startup exceeded CPU time limit` (code `10021`); Wrangler reports `startup_time_ms` on `wrangler deploy` / `wrangler versions upload`.

### Routes and domains

| Limit | Value |
| --- | --- |
| Routes per zone | 1,000 |
| Routes per zone (`wrangler dev --remote`) | 50 |
| Custom domains per zone | 100 |
| Routed zones per Worker | 1,000 |

### Cache API limits

| Feature | Workers Free | Workers Paid |
| --- | --- | --- |
| Maximum object size | 512 MB | 512 MB |
| Calls per request | 50 | 1,000 |

Calls per request (`put()`, `match()`, `delete()`) share the quota with subrequests. Chunked responses block subsequent `.put()` until the current one completes.

### Log size

256 KB of log data per request (console output, exceptions, request metadata, headers); beyond that, no more context is recorded.

### Static Assets

| Limit | Workers Free | Workers Paid |
| --- | --- | --- |
| Files per Worker version | 20,000 | 100,000 |
| Individual file size | 25 MiB | 25 MiB |
| `_headers` rules | 100 | 100 |
| `_headers` characters per line | 2,000 | 2,000 |
| `_redirects` static redirects | 2,000 | 2,000 |
| `_redirects` dynamic redirects | 100 | 100 |
| `_redirects` total | 2,100 | 2,100 |
| `_redirects` characters per rule | 1,000 | 1,000 |

Wrangler 4.34.0 or higher is required for the increased file count limits.

### Unbound and Bundled plans (deprecated)

Unbound matches Workers Paid. Bundled matches Workers Paid except: subrequests 50/request, CPU time (HTTP and Cron) 50 ms, Cache API calls 50/request.

## Notes

- `Memory per isolate` is 128 MB for every plan; a single isolate handles many concurrent requests.
- Docs inconsistency: the pricing page says Cron Trigger / Queue Consumer CPU is "Max of 15 minutes", while this page distinguishes 30 seconds (< 1 hour interval) from 15 min (>= 1 hour interval).
- Image Resizing limits are documented in the Images product docs: https://developers.cloudflare.com/images/optimization/transformations/overview/.
- Related product limits: KV https://developers.cloudflare.com/kv/platform/limits/, Durable Objects https://developers.cloudflare.com/durable-objects/platform/limits/, Queues https://developers.cloudflare.com/queues/platform/limits/ (Durable Objects and Queues are covered by the cloudflare-stateful skill).

## Related

- [pricing.md](./pricing.md)
- [how-workers-works.md](./how-workers-works.md)
- [best-practices.md](./best-practices.md)
- [../handlers-context/README.md](../handlers-context/README.md)
