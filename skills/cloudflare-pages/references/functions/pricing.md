---
source: https://developers.cloudflare.com/pages/functions/pricing/
---

# Pricing

Pages Functions requests are billed as Cloudflare Workers requests.

## Signature / Usage

Workers Free plan combined daily allowance example (Functions plus Workers requests share it):

```text
50,000 Functions requests + 50,000 Workers requests = 100,000 daily requests (full free allowance)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Static asset requests | billing | free, unlimited | Free on both free and paid plans. A request is static when it does not invoke Functions. |
| Paid plans | billing | — | Count toward the Workers Paid quota, including requests from a Function to KV or Durable Object bindings. Standard usage model supported. |
| Free plan | billing | — | Counts toward the Workers Free daily quota; resets at midnight UTC. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Plans and pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Workers Enterprise accounts are billed per their contract usage model; contact the account team to switch to Standard.
- Use `_routes.json` to keep static routes from invoking Functions.

## Related

- [invocation-routes.md](./invocation-routes.md)
- [metrics.md](./metrics.md)
