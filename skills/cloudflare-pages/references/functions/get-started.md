---
source: https://developers.cloudflare.com/pages/functions/, https://developers.cloudflare.com/pages/functions/get-started/
---

# Get started with Pages Functions

Pages Functions run server-side code on the Cloudflare network (on the Workers runtime) alongside a Pages project. Add a `/functions` directory at the project root and each file becomes a route.

## Signature / Usage

Create `/functions/helloworld.js` (the `/functions` directory must be at the root of the Pages project, not in the static root such as `/dist`). It runs on `/helloworld`.

```js
export function onRequest(context) {
	return new Response("Hello, world!");
}
```

The `onRequest` handler takes a request `context` object and must return a `Response` or a `Promise` of a `Response`.

### Runtime features

Workers runtime features are configurable on Pages Functions, including a subset of Node.js APIs and a compatibility date or compatibility flags. Set them via an argument to the Wrangler command, via the Wrangler configuration file, or in the dashboard: **Workers & Pages** > your Pages project > **Settings** > **Functions** > **Compatibility Flags** (separate Production and Preview values).

### Deploy

- Connect a Git provider (Git integration).
- Use Wrangler from the command line.

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). Wrangler `pages` command flags are in the cloudflare-wrangler skill (commands/pages.md).
- Direct Upload from the Cloudflare dashboard is currently not supported with Functions.
- If file-based routing and middleware are not desirable for an existing application, use Advanced mode (`_worker.js`) instead of the `/functions` directory.
- D1, R2 and other products are used from a Pages project by configuring bindings.

## Related

- [routing.md](./routing.md)
- [api-reference.md](./api-reference.md)
- [advanced-mode.md](./advanced-mode.md)
- [bindings.md](./bindings.md)
- [debugging-and-logging.md](./debugging-and-logging.md)
