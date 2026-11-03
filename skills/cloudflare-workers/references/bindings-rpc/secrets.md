---
source: https://developers.cloudflare.com/workers/configuration/secrets/
---

# Secrets

Secrets are a type of binding that attach encrypted text values (API keys, auth tokens) to a Worker. Values are not visible in Wrangler or the dashboard after being defined.

## Signature / Usage

```ts
import { env } from "cloudflare:workers";
import postgres from "postgres";

// Initialize the database client at the top level using a secret
const sql = postgres(env.DB_CONNECTION_STRING);

export default {
	async fetch(request: Request): Promise<Response> {
		const result = await sql`SELECT * FROM products;`;

		return new Response(JSON.stringify(result), {
			headers: { "Content-Type": "application/json" },
		});
	},
};
```

Add or delete secrets with Wrangler (command details: cloudflare-wrangler skill):

```sh
npx wrangler secret put <KEY>
```

```sh
npx wrangler versions secret put <KEY>
```

```sh
npx wrangler deploy --secrets-file .env.production
```

```sh
npx wrangler secret delete <KEY>
```

Local development file (`.dev.vars` / `.env`, dotenv syntax):

```bash
SECRET_KEY="value"
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

## Notes

- Access via the `env` parameter of handlers, `import { env } from "cloudflare:workers"`, or `process.env` when Node.js compatibility is enabled. To the Worker, a secret is indistinguishable from an environment variable.
- `wrangler secret put` / `delete` create a new version and deploy it immediately; with gradual deployments use `wrangler versions secret put` / `delete` and then `wrangler versions deploy`. Wrangler versions before 3.73.0 require `--x-versions`.
- `--secrets-file` (on `wrangler deploy` or `wrangler versions upload`) takes a JSON or `.env` file, same formats as `wrangler secret bulk`, up to 100 secrets per bulk request for a single version. Secrets not in the file are preserved from the previous version.
- Dashboard: Workers & Pages > your Worker > Settings > Variables and Secrets > Add (type Secret) > Deploy. Delete via Edit or the delete icon, then Deploy.
- Validation: the `secrets` configuration property (key spec: cloudflare-wrangler skill; https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property) declares required secret names; `wrangler deploy` and `wrangler versions upload` fail if any required secret is missing. Locally only keys in `secrets.required` are loaded from `.dev.vars` or `.env`, and missing keys produce a warning.
- Do not use `vars` (plaintext) for sensitive information.
- Use either `.dev.vars` or `.env`, not both: if `.dev.vars` exists, `.env` values are not included in `env` during local development. Do not commit them; add `.dev.vars*` and `.env*` to `.gitignore`.
- Per-environment files `.dev.vars.<environment-name>` / `.env.<environment-name>`: for `.dev.vars.<environment-name>`, only that file is loaded and all secrets must be defined in it. For `.env`, all matching files merge with precedence `.env.<environment-name>.local` > `.env.local` > `.env.<environment-name>` > `.env`.
- Process variables: `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV="false"` disables loading from `.env` when no `.dev.vars` exists; `CLOUDFLARE_INCLUDE_PROCESS_ENV="true"` (with no `.dev.vars`) includes the whole process environment (not needed with the `secrets` property, which loads from `process.env` automatically).
- Per-Worker secrets differ from account-level Secrets Store secrets (https://developers.cloudflare.com/secrets-store/, binding: https://developers.cloudflare.com/secrets-store/integrations/workers/).

## Related

- [environment-variables.md](./environment-variables.md)
- [bindings-overview.md](./bindings-overview.md)
