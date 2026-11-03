---
source: https://developers.cloudflare.com/workers/local-development/environment-variables/
---

# Local Secrets with .dev.vars

Provide secrets for local development with `.dev.vars` (or `.env`), including per-environment files.

`.dev.vars` (next to the Wrangler config file):

```ini
API_HOST="localhost:3000"
DEBUG="true"
SECRET_TOKEN="my-local-secret-token"
```

`.dev.vars.staging`:

```ini
API_HOST="staging.localhost:3000"
DEBUG="false"
SECRET_TOKEN="staging-token"
```

Run Wrangler:

```sh
npx wrangler dev
```

Run Wrangler with the staging environment:

```sh
npx wrangler dev --env staging
```

Run the Vite plugin with the staging environment:

```sh
CLOUDFLARE_ENV=staging npx vite dev
```

## Notes

- Use either `.dev.vars` or `.env`, not both; if `.dev.vars` exists, `.env` values are ignored.
- If `.dev.vars.<env>` exists it replaces `.dev.vars` entirely; `.env` files are merged (precedence: `.env.<env>.local`, `.env.local`, `.env.<env>`, `.env`).
- Add `.dev.vars*` and `.env*` to `.gitignore`; do not put secrets in `vars`.
- The `secrets.required` config property restricts which keys are loaded. `vite build` copies the matching `.dev.vars` to the output only for `vite preview`; it is not deployed.
- See [../references/local-development/README.md](../references/local-development/README.md).
