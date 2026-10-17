---
source: https://vite.dev/guide/dep-pre-bundling#caching
---

# Dependency Caching

Pre-bundled dependencies are cached on the file system and, in the browser, via strong HTTP cache headers.

## Signature / Usage

Force a re-bundle by starting the dev server with `--force` (or manually delete the `node_modules/.vite` cache directory):

```bash
vite --force
```

## Options / Props

Sources that determine whether pre-bundling is re-run (file system cache in `node_modules/.vite`):

| Source | Description |
|--------|-------------|
| Lockfile content | e.g. `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock`, `aube-lock.yaml` or `nub.lock` |
| Patches folder | modification time |
| `vite.config.js` | relevant fields, if present |
| `NODE_ENV` | value |

## Notes

- Browser cache: resolved dependency requests are strongly cached with HTTP headers `max-age=31536000,immutable`. Once cached they never hit the dev server again; they are auto-invalidated by the appended version query if a different version is installed (as reflected in the lockfile).
- To debug dependencies with local edits: (1) temporarily disable cache via the Network tab of browser devtools, (2) restart the Vite dev server with `--force`, (3) reload the page.

## Related

- [Dependency Pre-Bundling](./dep-pre-bundling.md)
- [optimizeDeps flags](../config-dev/optimize-deps-flags.md)
