---
source: https://developers.cloudflare.com/workers/configuration/environment-variables/
---

# Environment variables

Environment variables are a type of binding that attach text strings or JSON values to a Worker. They are not encrypted and suit application configuration.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker-dev",
	"vars": {
		"API_HOST": "example.com",
		"API_ACCOUNT_ID": "example_user",
		"SERVICE_X_DATA": {
			"URL": "service-x-api.dev.example",
			"MY_ID": 123
		}
	}
}
```

```ts
export interface Env {
	API_HOST: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(`API host: ${env.API_HOST}`);
	},
} satisfies ExportedHandler<Env>;
```

Global access:

```ts
import { env } from "cloudflare:workers";

// Access environment variables at the top level
const apiHost = env.API_HOST;

export default {
	async fetch(request: Request): Promise<Response> {
		return new Response(`API host: ${apiHost}`);
	},
};
```

Per Wrangler environment:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker-dev",
	// top level environment
	"vars": {
		"API_HOST": "api.example.com"
	},
	"env": {
		"staging": {
			"vars": {
				"API_HOST": "staging.example.com"
			}
		},
		"production": {
			"vars": {
				"API_HOST": "production.example.com"
			}
		}
	}
}
```

## Notes

- `vars` is a non-inheritable key (https://developers.cloudflare.com/workers/wrangler/configuration/#non-inheritable-keys): environments do not inherit it, so specify it per environment. Use `--env` / `-e`, for example `npx wrangler dev --env staging` and `npx wrangler deploy --env staging`. Key spec: cloudflare-wrangler skill.
- Dashboard: Workers & Pages > your Worker > Settings > Variables and Secrets > Add > choose Type, name, value > Deploy. Select the Secret type for secrets.
- Node.js compatibility: with `nodejs_compat` and the `nodejs_compat_populate_process_env` flag (enabled by default for compatibility dates on or after 2025-04-01), variables are on `process.env`, populated lazily on first access of `process`. Text values are exposed directly; JSON values that evaluate to strings are exposed as the parsed value; other JSON values are exposed as the raw JSON string (for `BAZ = { "a": 123 }`, `process.env.BAZ` is the JSON-encoded string `"{ \"a\": 123 }"`). Secrets are also exposed via `process.env`.
- Do not store sensitive information in plaintext variables or `vars`; use [secrets.md](./secrets.md) or Secrets Store bindings. Local `.dev.vars` / `.env` rules are the same as in [secrets.md](./secrets.md).
- Migrating from Service Worker format: https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#environment-variables

## Related

- [secrets.md](./secrets.md)
- [bindings-overview.md](./bindings-overview.md)
