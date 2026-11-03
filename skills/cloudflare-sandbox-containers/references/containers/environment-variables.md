---
source: https://developers.cloudflare.com/containers/configuration/environment-variables/
---

# Environment variables

Runtime variables the container runtime sets automatically, plus user-defined variables set on the class or at start.

## Signature / Usage

```js
import { Container } from "@cloudflare/containers";

class MyContainer extends Container {
	defaultPort = 4000;
	envVars = {
		MY_CUSTOM_VAR: "value",
		ANOTHER_VAR: "another_value",
	};
}
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

- User-defined variables: `envVars` on the `Container` class (every start), `startOptions.envVars` on `startAndWaitForPorts()` / `start()`, or `env` on `ctx.container.start()` in the Durable Object Container API. Processes started with `exec()` receive none of them except `PATH`.
- The official snippet omitted the `Container` import; it is added here.
- Keep secrets in Worker secrets and pass only required values at start; avoid putting real secrets in source-controlled `envVars`.

## Related

- [Container class](./container-class.md)
- [Durable Object Container API](./durable-object-container.md)
