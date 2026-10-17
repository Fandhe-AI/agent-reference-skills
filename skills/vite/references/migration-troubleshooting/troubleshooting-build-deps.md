---
source: https://vite.dev/guide/troubleshooting#build
---

# Troubleshooting: Build / Optimized Dependencies

Fixes for CORS errors on `file://` output, case-sensitivity errors, `Failed to fetch dynamically imported module`, and stale pre-bundled dependencies.

## Signature / Usage

Serve the build output over `http` to avoid the `file` protocol CORS error, and force re-optimization after linking / unlinking a dependency:

```bash
npx vite preview
vite --force
```

## Notes

- Built file does not work because of CORS error: opening the output HTML with the `file` protocol blocks scripts ("Cross origin requests are only supported for protocol schemes..."). Access the file with `http`; the easiest way is `npx vite preview`.
- No such file or directory due to case sensitivity: `ENOENT` / `Module not found` often occurs when the project was developed on a case-insensitive filesystem (Windows / macOS) but built on a case-sensitive one (Linux). Make sure imports have the correct casing.
- `TypeError: Failed to fetch dynamically imported module` occurs in several cases: version skew, poor network conditions, browser extensions blocking requests.
- Version skew: after a new deploy, cached HTML / JS still references old chunk names that were deleted. Remedies: keep old chunks temporarily; use a service worker that prefetches and caches all assets; prefetch dynamic chunks (does not help if HTML is cached via `Cache-Control`); implement a graceful fallback that reloads the page when chunks are missing (see Load Error Handling). Frameworks may have built-in solutions.
- Poor network conditions: the dynamic import cannot be retried due to browser limitations (whatwg/html#6768).
- Browser extensions blocking requests: ad-blockers often block by file name (e.g. names containing `ad`, `track`); it may help to pick a different chunk name with `build.rolldownOptions.output.chunkFileNames`.
- Optimized dependencies, outdated pre-bundled deps when linking to a local package: the invalidation hash depends on the package lock contents, patches applied to dependencies, and Vite config options that affect bundling of node modules. Overrides such as npm overrides are detected and re-bundled on next server start, but `npm link` is not. After linking / unlinking, use `vite --force`. Using overrides is recommended (pnpm overrides, yarn resolutions).

## Related

- [troubleshooting-others.md](./troubleshooting-others.md)
- [../build-deploy/load-error-handling.md](../build-deploy/load-error-handling.md)
- [../features/dep-pre-bundling.md](../features/dep-pre-bundling.md)
- [../config-build/build-rolldown-options.md](../config-build/build-rolldown-options.md)
