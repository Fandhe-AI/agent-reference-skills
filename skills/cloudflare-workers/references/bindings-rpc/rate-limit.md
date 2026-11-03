---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
---

# Rate Limiting

The Rate Limiting binding lets you define rate limits and call `limit()` from Worker code. Limits are approximate and apply separately in each Cloudflare location.

## Signature / Usage

Requires Wrangler 4.36.0 or later.

```jsonc
{
	"main": "src/index.js",
	"upload_source_maps": true,
	"ratelimits": [
		{
			"name": "MY_RATE_LIMITER",
			// An identifier you define, that is unique to your Cloudflare account.
			// Must be an integer.
			"namespace_id": "1001",
			// Limit: the request threshold within a given period in a single
			// Cloudflare location. Requests can exceed this threshold.
			// Period: the duration of the period, in seconds. Must be either 10 or 60
			"simple": {
				"limit": 100,
				"period": 60
			}
		}
	]
}
```

```ts
interface Env {
  MY_RATE_LIMITER: RateLimit;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url)

    const { success } = await env.MY_RATE_LIMITER.limit({ key: pathname }) // key can be any string of your choosing
    if (!success) {
      return new Response(`429 Failure – rate limit exceeded for ${pathname}`, { status: 429 })
    }

    return new Response(`Success!`)
  }
} satisfies ExportedHandler<Env>;
```

`limit()` accepts a single configuration object with the `key` field (any `string`). A common pattern combines an actor identifier (user ID) with a resource identifier (API route).

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `namespace_id` | `string` | A string containing a positive integer that uniquely defines this rate limiting namespace within your Cloudflare account (for example, `"1001"`). Although the value must be a valid integer, it is specified as a string. This is intentional. |
| `simple` | `object` | The rate limit configuration. `simple` is the only supported type. |
| `simple.limit` | `number` | The request threshold for calls to `limit()` within the given `period`, per Cloudflare location. Requests can exceed this threshold. |
| `simple.period` | `number` | The duration of the rate limit window, in seconds. Must be either `10` or `60`. |

## Notes

- Two bindings sharing the same `namespace_id` on the same account share counters for a key within each location, including across Workers. Updates reach other instances in the background, so this does not guarantee a strict combined limit. Use a unique `namespace_id` per binding to avoid sharing.
- Multiple rate limiting configurations per Worker are allowed (for example free vs paid tiers with namespaces `"1001"` and `"1002"`).
- Best practice: key on stable identifiers such as API keys in `Authorization` headers, URL paths or routes, query parameters, user IDs and tenant IDs. IP addresses and locations are not recommended because many users can share them.

```ts
// Recommended: use a key that represents a specific user or class of user
// (userId must come from a verified session or token, not from client-supplied input)
const userId = await getVerifiedUserId(req); // your own authentication logic
const { success } = await env.MY_RATE_LIMITER.limit({ key: userId });

// Not recommended:  many users may share a single IP, especially on mobile networks
// or when using privacy-enabling proxies
const ipAddress = req.headers.get("cf-connecting-ip") || "";
const { success } = await env.MY_RATE_LIMITER.limit({ key: ipAddress });
```

- Adapted from the official docs: the official example derives `userId` from `url.searchParams.get("userId")`, which a caller can vary per request to evade the limit or set to another user's ID to consume that user's quota; the example now takes the ID from a verified identity (`getVerifiedUserId` is a placeholder for your own authentication).
- Locality: limits are local to the Cloudflare location the Worker runs in; counts from different locations do not combine into a worldwide limit.
- Performance: each check uses a locally cached count; the promise resolves with the decision without waiting for cross-instance synchronization.
- Accuracy: counts are eventually consistent. A burst can result in more than `limit` calls returning `success: true`, even within one Worker or location. Sharing a namespace or awaiting each call does not make the limit strict.
- Strict limits: implement a rate limiter with Durable Objects (https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/); route requests per credential through the same object and persist the counter in durable storage.
- Monitoring: bindings are not visible in the dashboard. Use Workers Observability (Workers Logs, Traces) for HTTP 429 responses, or emit Analytics Engine data points when `limit()` returns `{ success: false }`.
- Backed by the same infrastructure as WAF rate limiting rules (https://developers.cloudflare.com/waf/rate-limiting-rules/).

## Related

- [bindings-overview.md](./bindings-overview.md)
