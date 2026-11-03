---
source: https://developers.cloudflare.com/pages/functions/smart-placement/
---

# Smart Placement

Run Pages Functions closer to back-end infrastructure instead of the user to reduce latency (beta).

## Signature / Usage

Enable in the dashboard: **Workers & Pages** > project > **Settings** > **Runtime** > **Placement** > **Smart**. Or via the `placement` key of the Wrangler configuration file (see the keys page).

The official page has no code; the steps are:

```text
Settings > Runtime > Placement > Smart
```

Then send approximately 20-30 requests to your Pages Functions; it takes a few minutes after sending traffic for Smart Placement to take effect.

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). How Smart Placement works: https://developers.cloudflare.com/workers/configuration/placement/
- Available on all plans; in beta.
- Applies to Pages Functions and middleware. Assets are normally served closest to the user, with two exceptions: (1) with `functions/_middleware.js` on every request, all assets are served near your back end; (2) assets served via `env.ASSETS.fetch` come from the same location as the Function. This can unexpectedly increase latency for users.
- View results under Functions Metrics (request duration).
- The Wrangler configuration page lists `placement` as an inheritable key ([wrangler-configuration.md](./wrangler-configuration.md)).

## Related

- [wrangler-configuration-keys.md](./wrangler-configuration-keys.md)
- [metrics.md](./metrics.md)
- [middleware.md](./middleware.md)
