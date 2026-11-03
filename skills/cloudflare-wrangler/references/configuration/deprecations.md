---
source: https://developers.cloudflare.com/workers/wrangler/deprecations/
---

# Deprecations

Differences between Wrangler versions: deprecations and breaking changes for v4, v3 and v2.

## Signature / Usage

```diff
- import SomeDependency from "some-dependency.js";
+ import SomeDependency from "./some-dependency.js";
```

## Options / Props

### Wrangler v4 (deprecated, to be removed)

| Item | Replacement |
|------|-------------|
| Workers Sites (`site`) | Workers Static Assets |
| Service environments (`legacy_env`) | Wrangler Environments |

### Wrangler v3 (removed in v4)

| Item | Replacement |
|------|-------------|
| `wrangler generate` | `npm create cloudflare@latest` |
| `wrangler publish` | `npx wrangler deploy` |
| `wrangler pages publish` | `wrangler pages deploy` |
| `wrangler version` | `wrangler --version` |
| `--experimental-local`, `--local` | `wrangler dev` is local by default in v3 |
| `--persist` | `wrangler dev` persists by default |
| `-- <command>`, `--proxy`, `--script-path` in `wrangler pages dev` | Build static assets to a directory and run `wrangler pages dev <directory>` |
| `--legacy-assets` / `legacy_assets` | Migrate to Workers assets |
| `--node-compat` / `node_compat` | `nodejs_compat` compatibility flag |
| `usage_model` | No effect after Workers Standard Pricing rollout |

### Wrangler v2 removed commands

| Command | v1 | v2 | Notes |
|---------|----|----|-------|
| `preview` | yes | no | Use `dev`. |
| `generate` | yes | no | Use `git clone`. |
| `build` | yes | no | Invoke your own build script; or `wrangler deploy --dry-run --outdir=path/to/build`. |
| `route` | yes | no | Routes live in the configuration file. |
| `report` | yes | no | Error reports are made interactively. |
| `config` | yes | unknown | Use `wrangler login` / `logout` or `CLOUDFLARE_API_TOKEN`. |
| `subdomain` | yes | unknown | Create the `workers.dev` subdomain in the dashboard. |
| `r2` | partial (v1.19.8) | yes | |
| `pages` | no | yes | |

### Wrangler v2 configuration changes

| Key | Status |
|-----|--------|
| `type = "webpack"` | Removed; see [migration-v1-to-v2.md](./migration-v1-to-v2.md). |
| `type = "rust"` | Removed; use `workers-rs`. |
| `type = "javascript"` | No longer required. |
| `webpack_config`, `webpack` | No longer supported. |
| `zone_id` | Deprecated; inferred from `route`/`routes` (and `dev.host`). |
| `build.upload` | Deprecated; `build.upload.main`/`dir` replaced by `main`, `build.upload.rules` by `rules`, `build.upload.format` inferred. |
| `site.entry-point` | Replaced by top-level `main`. |

New or relaxed fields in v2: `main` (entry point, replaces `build.upload.main`), `rules` (module type to file pattern mappings), `name` optional for `wrangler dev` and `kv` commands (or `--name`), `account_id` optional (prompted login), `workers_dev` defaults to `true` when no routes.

## Notes

- Features also new in v2: TypeScript (via esbuild) and local mode (`wrangler dev --local`, powered by Miniflare).
- Other deprecated behavior: dashboard-defined routes are not added alongside Wrangler-defined routes (`route`/`routes` in config win; for dashboard-only routing remove them and set `workers_dev = false`). Wrangler no longer uses `index.js` in the cwd as an entry point (use `main` or `wrangler dev index.js`). Bare specifiers are no longer assumed to be file names; v2 still resolves with a warning, a future version will error.
- Wrangler v4 removed all v2 and v3 deprecated features (see [migration-v3-to-v4.md](./migration-v3-to-v4.md)).

## Related

- [migration-v3-to-v4.md](./migration-v3-to-v4.md)
- [migration-v2-to-v3.md](./migration-v2-to-v3.md)
- [migration-v1-to-v2.md](./migration-v1-to-v2.md)
- [workers-sites.md](./workers-sites.md)
