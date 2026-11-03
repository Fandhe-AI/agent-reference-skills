---
source: https://developers.cloudflare.com/pages/functions/api-reference/
---

# EventContext and EnvWithFetch

The `context` object passed to every `onRequest*` handler, and the type of its `env` property.

## Signature / Usage

With a dynamic route `/users/[user].js`, a visit to `/users/nevi` makes `context.params` equal `{ user: "nevi" }`:

```js
export function onRequest(context) {
	return new Response(`Hello ${context.params.user}`);
}
```

This returns `"Hello nevi"`.

## Options / Props

### EventContext properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `request` | Request | — | The incoming Request. |
| `functionPath` | string | — | The path of the request. |
| `waitUntil(promise)` | (Promise<any>) => void | — | Same as the Workers `waitUntil` (https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil). |
| `passThroughOnException()` | () => void | — | Same as the Workers `passThroughOnException` (https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception). Does not work in an advanced mode project. |
| `next(input?, init?)` | (input?: Request \| string, init?: RequestInit) => Promise<Response> | — | Passes the request through to the next Function, or to the asset server if no other Function is available. |
| `env` | EnvWithFetch | — | Environment variables, secrets and bindings, plus the `ASSETS` binding. |
| `params` | Params<P> | — | Values from dynamic routing (string for `[x]`, array for `[[x]]`). |
| `data` | Data | — | Shared data object passed between middleware and later Functions (also where plugins put results). |

### EnvWithFetch

Holds the environment variables, secrets and bindings for a Function. It also holds the `ASSETS` binding, used to fall back to asset-serving behavior.

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- The source page lists `data` only by type name (`Data`) without a description; the description in the table is inferred from plugin and middleware usage elsewhere in the docs.

## Related

- [api-reference.md](./api-reference.md)
- [routing.md](./routing.md)
- [typescript.md](./typescript.md)
