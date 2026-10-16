# Known Issues

Source: https://knip.dev/reference/known-issues

## 1. Exceptions from Config Files

Plugins may throw exceptions when loading config files in Knip's environment.

Knip exits with code `2` when a plugin config file fails to load; `--no-exit-code` does not suppress this error.

**Workarounds:**
- Set path aliases for module resolution errors
- Supply missing environment variables: `KEY=VAL knip`
- Use `node --env-file .env $(which knip)`
- Disable file loading: `vite: { config: [] }`
- Add as entry file for static analysis
- Disable the plugin entirely
- Ignore the workspace as last resort

## 2. Path Aliases in Config Files

TypeScript path aliases may fail with "Cannot find module".

**Workarounds:**
- Convert to relative paths
- Inject module support: `NODE_OPTIONS="--import tsx" knip`
- Use Bun with knip-bun

## 3. Nx Daemon

"Daemon process terminated and closed the connection"

**Solution:** `NX_DAEMON=false knip`

## 4. Raw transfer memory errors

On machines with low RAM or Windows with Node.js >=22, oxc-parser raw transfer may fail under memory pressure with `RangeError: Array buffer allocation failed`.

**Workaround:** disable raw transfer to use the normal parser path:

```sh
KNIP_DISABLE_RAW_TRANSFER=1 knip
```

## 5. Stale cache results

With `--cache`, configuration or path alias changes may leave results stale (e.g. an import still reported as unresolved after the missing file is added). Newly added `.gitignore` files are also not detected automatically.

**Workaround:** run without `--cache`, or delete the cache directory (`node_modules/.cache/knip` by default, configurable with `--cache-location`) before running with `--cache` again.
