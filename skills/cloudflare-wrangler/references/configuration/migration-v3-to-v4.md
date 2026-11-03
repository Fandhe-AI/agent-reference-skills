---
source: https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/
---

# Migrate from Wrangler v3 to v4

Wrangler v4 focuses on updates to underlying systems and dependencies plus command consistency. Most users should expect a no-op upgrade.

## Signature / Usage

```sh
npm i -D wrangler@4
npx wrangler --version
```

```sh
# Before (Wrangler v3 - queried remote by default)
wrangler kv key get --binding MY_KV "my-key"

# After (Wrangler v4 - must specify --remote)
wrangler kv key get --binding MY_KV "my-key" --remote
```

## Options / Props

| Change | Detail |
|--------|--------|
| Node.js support policy | Follows Node.js lifecycle (Current, Active LTS, Maintenance LTS). Node.js v16 (EOL 2022) no longer supported; check with `node --version` (action needed on `v16`/`v18`). |
| esbuild | Upgraded from v0.17.19 to v0.24. Wildcard dynamic imports (e.g. `import('./data/' + kind + '.json')`) now bundle all matching files (behavior since esbuild v0.19); may bundle unwanted files, so prefer explicit imports. Enables `using` with RPC. |
| Commands default to local | All commands that can run local or remote default to local; `--remote` required to query via the API. Affects `wrangler kv key get/put/delete/list`, `wrangler kv bulk put/delete`, `wrangler r2 object get/put/delete`. |
| Removed features | `legacy_assets` / `--legacy-assets`, `node_compat` / `--node-compat`, `usage_model`, `wrangler version`, `getBindingsProxy()`, `wrangler publish`, `wrangler generate`, `wrangler pages publish`. |

Replacements for removed items:

| Deprecated | Replacement |
|------------|-------------|
| `legacy_assets` config or `--legacy-assets` | Migrate to Workers Static Assets |
| `node_compat` config or `--node-compat` | `nodejs_compat` compatibility flag |
| `usage_model` config | Remove it (no effect) |
| `wrangler version` | `wrangler --version` |
| `getBindingsProxy()` | `getPlatformProxy()` (same arguments) |
| `wrangler publish` | `wrangler deploy` |
| `wrangler generate` | `npm create cloudflare@latest` |
| `wrangler pages publish` | `wrangler pages deploy` |

## Notes

- Detect affected scripts: `grep -rE "wrangler (kv|r2)" --include="*.sh" --include="*.yml" --include="*.yaml" --include="Makefile" --include="package.json" .`; config: `grep -E "(legacy_assets|node_compat|usage_model)\s*=" wrangler.toml`; code: `grep -rE "getBindingsProxy" --include="*.js" --include="*.ts" --include="*.mjs" .`.
- Wrangler will periodically bump esbuild, possibly in a minor version.

## Related

- [migration-v2-to-v3.md](./migration-v2-to-v3.md)
- [deprecations.md](./deprecations.md)
- [bundling.md](./bundling.md)
