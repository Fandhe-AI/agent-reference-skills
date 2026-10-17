---
source: https://vite.dev/guide/troubleshooting#cli
---

# Troubleshooting: CLI / Config

Fixes for CLI path errors on Windows and "This package is ESM only" errors in the config file.

## Signature / Usage

Convert the config to ESM by renaming it (or adding `"type": "module"` to the nearest `package.json`):

```text
vite.config.js  ->  vite.config.mjs
vite.config.ts  ->  vite.config.mts
```

## Notes

- `Error: Cannot find module 'C:\foo\bar&baz\vite\bin\vite.js'`: the project path may include `&`, which does not work with `npm` on Windows (npm/cmd-shim#45). Switch to another package manager (e.g. `pnpm`, `yarn`) or remove `&` from the path.
- "This package is ESM only": errors such as `Failed to resolve "foo". This package is ESM only but it was tried to load by require.` or `ERR_REQUIRE_ESM: require() of ES Module ... from /path/to/vite.config.js not supported` occur when importing an ESM-only package by `require`.
- The troubleshooting page says that in Node.js <=22, ESM files cannot be loaded by `require` by default. Vite 8 requires Node.js 20.19+ / 22.12+, which support `require(esm)` without a flag (announcing-vite8), so this applies mainly to older Node.js versions. It may work with `--experimental-require-module`, Node.js >22, or other runtimes, but converting the config to ESM is still recommended: add `"type": "module"` to the nearest `package.json`, or rename `vite.config.js` / `vite.config.ts` to `vite.config.mjs` / `vite.config.mts`.
- If the suggestions do not work, ask on GitHub Discussions or the `#help` channel of Vite Land Discord. Rollup's troubleshooting guide is also referenced by the source.

## Related

- [troubleshooting-dev-server.md](./troubleshooting-dev-server.md)
- [../config-shared/configuring-vite.md](../config-shared/configuring-vite.md)
