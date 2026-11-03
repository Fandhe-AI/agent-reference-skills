---
source: https://developers.cloudflare.com/pages/functions/bindings/
---

# Environment variables and secrets

Environment variables (plain text strings or JSON) and secrets (encrypted values) are bindings read from `context.env`.

## Signature / Usage

```js
export function onRequest(context) {
	if (context.env.ENVIRONMENT === "development") {
		return new Response("This is a local environment!");
	} else {
		return new Response("This is a live environment");
	}
}
```

```ts
interface Env {
	ENVIRONMENT: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	if (context.env.ENVIRONMENT === "development") {
		return new Response("This is a local environment!");
	} else {
		return new Response("This is a live environment");
	}
};
```

Local variable at the CLI:

```sh
npx wrangler pages dev --binding=<ENVIRONMENT_VARIABLE_NAME>=<ENVIRONMENT_VARIABLE_VALUE>
```

Local secrets in `.dev.vars` or `.env` (dotenv syntax). Adapted (not in the official docs): the example token is a placeholder instead of a JWT-looking value.

```bash
SECRET_KEY="<your-secret-key>"
API_TOKEN="<your-api-token>"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Dashboard (variable) | — | — | **Settings** > **Variables and Secrets** > **Add**, set name and value, **Save**. Available at runtime and build-time, for production and preview. |
| Dashboard (secret) | — | — | Same path, then select **Encrypt**. Secrets cannot be viewed after setting. |
| `.dev.vars.<environment-name>` / `.env.<environment-name>` | file | — | Per-environment local secrets. With `.dev.vars.<env>` only that file is loaded (all secrets must be defined in it). `.env` files merge, precedence: `.env.<env>.local`, `.env.local`, `.env.<env>`, `.env`. |
| `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV` | env var | — | Set to `"false"` to stop loading local vars from `.env` files (when no `.dev.vars`). |
| `CLOUDFLARE_INCLUDE_PROCESS_ENV` | env var | — | Set to `"true"` (with no `.dev.vars`) to include every process environment variable as a local var. Not needed with the `secrets` configuration property, which loads from `process.env` automatically. |
| `secrets` config property | object | — | Declares required secret names; only keys listed in `secrets.required` load from `.dev.vars` or `.env`, extras are excluded and missing keys warn. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Set secrets before a deployment that uses them.
- Do not use `vars` in the Wrangler configuration file for sensitive information; use secrets.
- Choose either `.dev.vars` or `.env`, not both: if `.dev.vars` exists, `.env` values are not included in `env`.
- Do not commit secrets: add `.dev.vars*` and `.env*` to `.gitignore`.
- Adapted from the official docs: the page's `API_TOKEN` example value looked like a real JWT header; replaced with a placeholder.

## Related

- [bindings.md](./bindings.md)
- [wrangler-configuration-keys.md](./wrangler-configuration-keys.md)
- [local-development.md](./local-development.md)
