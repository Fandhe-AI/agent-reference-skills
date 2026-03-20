# Known Issues

Source: https://knip.dev/reference/known-issues

## 1. Exceptions from Config Files

Plugins may throw exceptions when loading config files in Knip's environment.

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
