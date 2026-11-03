---
source: https://developers.cloudflare.com/workers/local-development/environment-variables/
---

# Environment variables and secrets

Configure secrets and variables for local development with `.dev.vars` or `.env` files next to the Wrangler configuration file.

## Signature / Usage

Files use dotenv syntax:

```bash
SECRET_KEY="value"
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

Basic setup: create `.dev.vars` / `.env` in the project root:

```ini
API_HOST="localhost:3000"
DEBUG="true"
SECRET_TOKEN="my-local-secret-token"
```

Then run `npx wrangler dev` (Wrangler) or `npx vite dev` (Vite plugin).

Multiple local environments: create `.dev.vars.<environment-name>` / `.env.<environment-name>` (e.g. `.dev.vars.staging`):

```ini
API_HOST="staging.localhost:3000"
DEBUG="false"
SECRET_TOKEN="staging-token"
```

Select the environment:

```sh
npx wrangler dev --env staging
# Vite plugin
CLOUDFLARE_ENV=staging npx vite dev
```

## Options / Props

`.env` handling is controlled by environment variables on the process running the tools:

| Name | Type | Description |
|------|------|-------------|
| `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV` | `"false"` | Disables loading local dev vars from `.env` files without providing a `.dev.vars` file. |
| `CLOUDFLARE_INCLUDE_PROCESS_ENV` | `"true"` | Includes every variable of the system process environment as a local dev variable; ensure there is no `.dev.vars`. Not needed with the `secrets` configuration property, which loads from `process.env` automatically. |

`.env` precedence (most to least specific): `.env.<environment-name>.local`, `.env.local`, `.env.<environment-name>`, `.env`.

## Notes

- Do not use `vars` to store sensitive information in the Wrangler configuration file; use secrets.
- With the `secrets` configuration property, only keys listed in `secrets.required` are loaded from `.dev.vars` or `.env`; additional keys are excluded and missing keys produce a warning.
- Use either `.dev.vars` or `.env`, not both. If `.dev.vars` exists, values in `.env` files are not included in `env` during local development.
- Do not commit these files; add `.dev.vars*` and `.env*` to `.gitignore`.
- With `.dev.vars.<environment-name>`, all secrets must be defined per environment: if it exists only it is loaded and `.dev.vars` is not. All matching `.env` files are merged instead, with the most specific file winning per variable.
- Environment-specific files are loaded ahead of the generic file when a Cloudflare environment is selected.

## Related

- [Local development](./overview.md)
- [Wrangler configuration](../configuration/README.md)
