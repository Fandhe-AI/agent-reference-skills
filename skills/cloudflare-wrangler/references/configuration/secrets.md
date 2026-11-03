---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#secrets
---

# Secrets and Local Dev Variables (`secrets`, `.dev.vars`, `.env`)

Secrets are a binding type for encrypted text values. The `secrets` configuration property declares required secret names; `.dev.vars` / `.env` hold local development values.

## Signature / Usage

```jsonc
{
	"secrets": {
		"required": ["API_KEY", "DB_PASSWORD"],
	},
}
```

```toml
[secrets]
required = [ "API_KEY", "DB_PASSWORD" ]
```

`.dev.vars` / `.env`:

```bash
SECRET_KEY="value"
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `secrets.required` | `string[]` optional | Secret names that must be set to deploy the Worker. |

## Notes

- Type generation: when `secrets` is defined at any config level, `wrangler types` generates typed bindings from `secrets.required` and no longer infers names from `.dev.vars` or `.env`. Per-environment secrets are supported; each named environment produces its own interface and the aggregated `Env` type marks secrets appearing in only some environments as optional.
- Deploy: `wrangler deploy` and `wrangler versions upload` validate that all `secrets.required` are configured on the Worker; otherwise the command fails listing the missing secrets.
- Do not use `vars` for sensitive information; use secrets.
- Local files go in the same directory as the Wrangler configuration file. Choose `.dev.vars` or `.env` but not both: if `.dev.vars` exists, `.env` values are not included in `env`. When `secrets` is defined, only keys in `secrets.required` are loaded; additional keys are excluded and missing keys warn.
- Use dotenv syntax. Do not commit them: add `.dev.vars*` and `.env*` to `.gitignore`.
- Per-environment files: `.dev.vars.<environment-name>` or `.env.<environment-name>`, loaded ahead of the generic file. With `.dev.vars.<env>` present, only that file is loaded (all secrets must be defined per environment). `.env` files are merged; most specific wins: `.env.<environment-name>.local`, `.env.local`, `.env.<environment-name>`, `.env`.
- `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV="false"` disables loading from `.env` without a `.dev.vars`. `CLOUDFLARE_INCLUDE_PROCESS_ENV="true"` (with no `.dev.vars`) includes every process environment variable as a local dev variable; not needed with the `secrets` property, which loads from `process.env` automatically.
- Secrets are non-inheritable and defined per environment; set remote ones with `wrangler secret put <KEY>` (with `--env`). Wrangler never deletes secrets unless you run `wrangler secret delete <key>`.
- This differs from Wrangler system env files (`.env` read by the CLI itself): see [system-environment-variables.md](./system-environment-variables.md), where `.env.<environment-name>` replaces rather than merges with `.env`.
- Docs quirk: the Environments page writes `wrangler secret put <KEY> -env`; the flag is `--env` / `-e`.

## Related

- [environments.md](./environments.md)
- [system-environment-variables.md](./system-environment-variables.md)
- [bindings-misc.md](./bindings-misc.md)
