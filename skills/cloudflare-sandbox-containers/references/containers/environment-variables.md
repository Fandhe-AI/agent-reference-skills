---
source: https://developers.cloudflare.com/containers/configuration/environment-variables/
---

# Environment variables

Runtime variables the container runtime sets automatically, plus user-defined variables passed in the `env` option of `ctx.container.start()`.

## Signature / Usage

```js
const container = this.ctx.container;
container.start({
	image: container.images.base,
	enableInternet: false,
	env: {
		MY_CUSTOM_VAR: "value",
		ANOTHER_VAR: "another_value",
	},
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| CLOUDFLARE_APPLICATION_ID | string | — | ID of the Containers application. |
| CLOUDFLARE_COUNTRY_A2 | string | — | ISO 3166-1 Alpha 2 code of the country the container is placed in. |
| CLOUDFLARE_LOCATION | string | — | Name of the location the container is placed in. |
| CLOUDFLARE_REGION | string | — | Region name. |
| CLOUDFLARE_DURABLE_OBJECT_ID | string | — | ID of the Durable Object instance the container is bound to; useful to identify instances on the dashboard. |

## Notes

- User-defined variables are passed in the `env` option of [`ctx.container.start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start). Processes started with `exec()` do not receive them, except `PATH`; pass them in the `env` option of `exec()` instead.
- Migration: the deprecated `Container` class from `@cloudflare/containers` set these through `envVars`; the migration guide maps `envVars` to the `env` option of `start()`. See api-comparison.md.
- Source: https://developers.cloudflare.com/containers/configuration/environment-variables/ (cloudflare-docs production 34d908a, fetched 2026-11-14).
- Keep secrets in Worker secrets and pass only required values at start; avoid putting real secrets in source-controlled configuration.

## Related

- [API comparison](./api-comparison.md)
- [Durable Object Container API](./durable-object-container.md)
