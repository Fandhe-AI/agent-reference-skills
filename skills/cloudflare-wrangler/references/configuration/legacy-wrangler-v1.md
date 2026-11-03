---
source: https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/configuration/
---

# Legacy Wrangler v1 (deprecated)

Summary of the archived Wrangler v1 documentation (install, authentication, configuration, webpack, commands). Wrangler v1 is deprecated; this page exists to recognize and migrate old projects.

## Signature / Usage

Adapted (not in the official docs): the official page's JSONC block and the `$schema` line are removed because Wrangler v1 only reads `wrangler.toml`; see Notes.

```toml
name = "your-worker"
type = "javascript"
account_id = "your-account-id"
workers_dev = true
zone_id = "your-zone-id"
routes = [ "example.com/*" ]
```

## Options / Props

v1 configuration keys:

| Key | Inheritance | Description |
|-----|-------------|-------------|
| `name` | inherited, required | Worker script name; if inherited, the environment name is appended. |
| `type` | top level, required | `javascript`, `webpack` (webpack v4), or `rust`. |
| `account_id` | inherited, required | Account ID; or `CF_ACCOUNT_ID`. |
| `zone_id` | inherited, optional | Zone ID; or `CF_ZONE_ID`. |
| `workers_dev` | inherited, optional | Deploy to `*.workers.dev`; defaults to false. |
| `route` / `routes` | not inherited, optional | Route(s) on your zone. |
| `webpack_config` | inherited, optional | Custom webpack config path. |
| `vars` | not inherited, optional | Plain text variables (global variables in the Worker). |
| `kv_namespaces` | not inherited, optional | KV namespace bindings (`binding`, `id`, `preview_id`). |
| `site` | inherited, optional | Local folder to upload and serve. |
| `dev` | not inherited, optional | `wrangler dev` server arguments. |
| `triggers` | inherited, optional | Cron triggers. |
| `usage_model` | inherited, optional | `bundled` or `unbound`. |
| `build` | top level, optional | Custom build step. |

v1 commands: `generate`, `init`, `build`, `login`, `logout`, `config`, `publish`, `dev`, `tail`, `preview`, `route`, `subdomain`, `secret` (`put`/`delete`/`list`), `kv` (`kv:namespace`, `kv:key`, `kv:bulk`).

## Notes

- Adapted from the official docs: the official v1 configuration page shows a `jsonc` block plus a `toml` block, both starting with a `$schema` entry pointing at `./node_modules/wrangler/config-schema.json`. That JSONC block is an artifact of the docs site's auto-expanded `<WranglerConfig>` component. Wrangler v1 (`@cloudflare/wrangler`, installed globally) reads only `wrangler.toml`; JSON/JSONC configuration support starts at Wrangler v3.91.0 (see [overview.md](./overview.md)), and `node_modules/wrangler/config-schema.json` does not exist for a v1 install. This page therefore keeps only the TOML example, without `$schema`.
- Install (v1): `npm i @cloudflare/wrangler -g` or `cargo install wrangler` (with `--features sys-openssl` to use system OpenSSL); update with `npm update -g @cloudflare/wrangler` or `cargo install wrangler --force`.
- Authentication (v1): `login`, `config` (email + API key), `whoami`; or env vars `CF_ACCOUNT_ID` + `CF_API_TOKEN` (or `CF_EMAIL` + `CF_API_KEY`), optional `CF_ZONE_ID`. These `CF_*` variables are deprecated in current Wrangler (use `CLOUDFLARE_*`).
- Wrangler v1 shipped `webpack@4`; default config is `{ target: "webworker", entry: "./index.js" }` with `entry` taken from `main` in `package.json`; a custom file is set via `webpack_config` (always keep `target: "webworker"`).
- Every v1 page carries the caution that Wrangler v1 is deprecated; see [migration-v1-to-v2.md](./migration-v1-to-v2.md).
- This page condenses five archived pages (install-update, authentication, configuration, webpack, commands); detailed v1 command reference (e.g. the full `kv:*` set) is not reproduced.

## Related

- [migration-v1-to-v2.md](./migration-v1-to-v2.md)
- [deprecations.md](./deprecations.md)
