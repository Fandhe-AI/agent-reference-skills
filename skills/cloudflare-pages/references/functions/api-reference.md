---
source: https://developers.cloudflare.com/pages/functions/api-reference/
---

# API reference: onRequest handlers and env.ASSETS.fetch()

The exported handler functions that configure a Pages Function, plus the `env.ASSETS.fetch()` method for static assets.

## Signature / Usage

```js
export function onRequest(context) {
	return new Response("Hello, world!");
}
```

## Options / Props

### Handler exports

All handlers have the signature `(context: EventContext) => Response | Promise<Response>`.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onRequest` | function | — | Invoked on all requests regardless of method, as long as no specific verb handler is exported. |
| `onRequestGet` | function | — | Invoked on all `GET` requests. |
| `onRequestPost` | function | — | Invoked on all `POST` requests. |
| `onRequestPatch` | function | — | Invoked on all `PATCH` requests. |
| `onRequestPut` | function | — | Invoked on all `PUT` requests. |
| `onRequestDelete` | function | — | Invoked on all `DELETE` requests. |
| `onRequestHead` | function | — | Invoked on all `HEAD` requests. |
| `onRequestOptions` | function | — | Invoked on all `OPTIONS` requests. |

### env.ASSETS.fetch()

| Name | Type | Default | Description |
|------|------|---------|-------------|
| input | Request \| string \| URL | — | Request, URL string or URL object. Must be the pretty path (`/users/`), not the asset file (`/users/index.html`). Runs header and redirect rules and modifies the returned response. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- If both `onRequest` and `onRequestGet` are exported, only `onRequestGet` is called for `GET` requests.
- `env.ASSETS` is the binding to the asset-serving behavior; it is present on `EnvWithFetch`.

## Related

- [event-context.md](./event-context.md)
- [middleware.md](./middleware.md)
- [advanced-mode.md](./advanced-mode.md)
