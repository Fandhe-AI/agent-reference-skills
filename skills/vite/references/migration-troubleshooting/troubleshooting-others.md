---
source: https://vite.dev/guide/troubleshooting#performance-bottlenecks
---

# Troubleshooting: Performance Bottlenecks / Others

CPU profiling with the Node.js inspector, plus Node.js module externalization warnings, strict-mode errors, browser extensions, Windows cross-drive links, and CJS default import surprises.

## Signature / Usage

```bash
# dev server
vite --profile --open

# build
vite build --profile
```

## Notes

- Dev server: once the app is open in the browser, wait for loading to finish, go back to the terminal, press `p` (stops the Node.js inspector), then `q` to stop the dev server. The inspector generates `vite-profile-0.cpuprofile` in the root folder; pass `--profile <name>` (or `--profile=<name>`) to write `<name>.cpuprofile`. Upload the profile to https://www.speedscope.app/ with the `BROWSE` button.
- vite-plugin-inspect can inspect the intermediate state of plugins and identify plugin / middleware bottlenecks in both dev and build.
- Module externalized for browser compatibility: using a Node.js module in the browser logs `Module "fs" has been externalized for browser compatibility`. Vite does not automatically polyfill Node.js modules; avoid Node.js modules in browser code, or add polyfills manually. Report the issue to third-party libraries meant for the browser.
- Syntax Error / Type Error: Vite does not support code that only runs in non-strict (sloppy) mode because ESM is always strict mode (e.g. `With statements cannot be used with the "esm" output format due to strict mode`, `TypeError: Cannot create property 'foo' on boolean 'false'`). For dependencies use `patch-package`, `yarn patch` or `pnpm patch` as an escape hatch.
- Browser extensions (e.g. ad-blockers) may prevent the Vite client from sending requests to the dev server, causing a white screen without logged errors or `TypeError: Failed to fetch dynamically imported module`. Try disabling extensions.
- Cross drive links on Windows (a `subst` virtual drive, or a symlink / junction to a different drive via `mklink`, e.g. Yarn global cache) may break Vite (vitejs/vite#10802).
- Default import unexpectedly returns an object: for CJS modules the default import returns the `module.exports` object, not `module.exports.default`; this may cause errors like `Element type is invalid ... but got: object` or `foo is not a function`. See the Rolldown doc "Ambiguous `default` import from CJS modules".

## Related

- [performance.md](./performance.md)
- [troubleshooting-build-deps.md](./troubleshooting-build-deps.md)
- [migration-minify-interop.md](./migration-minify-interop.md)
