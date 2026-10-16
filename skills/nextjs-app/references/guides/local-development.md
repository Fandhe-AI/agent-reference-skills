# Development Environment

Optimize local development performance (`next dev`) as an application grows.

## Signature / Usage

```js filename="next.config.js"
module.exports = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
  logging: {
    fetches: { fullUrl: true },
  },
}
```

## Key topics

- **`next dev` vs production**: dev compiles routes on demand as you navigate (faster startup, less memory); `next build`/`next start` apply extra optimizations (minification, content hashes) not needed locally.
- **Antivirus**: can slow file access; exclude the project folder (Windows Defender) or enable terminal dev mode (macOS Gatekeeper).
- **Turbopack**: default bundler for `next dev`/`next build` since Next.js 16; opt out with `--webpack` if needed.
- **Imports**: avoid importing whole icon libraries/multiple icon sets; avoid barrel files (slow compilation); use `experimental.optimizePackageImports` for packages using barrel files (Turbopack optimizes automatically).
- **Tailwind CSS**: scope the `content` array narrowly to avoid scanning `node_modules` or unrelated directories.
- **Custom webpack config**: reconsider whether it's needed for local dev; prefer Turbopack loaders instead.
- **Memory**: see [Memory Usage](https://nextjs.org/docs/app/guides/memory-usage) for large apps.
- **`serverComponentsHmrCache`** (experimental): caches `fetch` responses in Server Components across HMR refreshes.
- **System configuration**: (1) antivirus — on Windows add the project to the Microsoft Defender exclusion list (or use a Dev Drive, which uses Defender's "performance mode"); on macOS disable Gatekeeper for your terminal (`sudo spctl developer-mode enable-terminal`, then enable the terminal under Privacy & Security > Developer Tools); (2) avoid common Docker pitfalls; (3) on Windows use Dev Drive or WSL 2 (with WSL 2 keep the project inside the VM filesystem, e.g. `/home/$USER/project`, not on `C:\` or `/mnt/c`).
- **Docker for development**: on Mac/Windows, project files mounted through Docker Desktop cross the host-to-VM file-sharing layer, which can delay or fail to propagate filesystem events, making Fast Refresh take seconds or minutes (not an issue in production or with Docker running natively on Linux). Prefer running Next.js without Docker during development and reserve Docker for production/testing; if you must use it, run Docker natively on Linux, or in a manually configured VM with the source inside the VM, or evaluate Docker Desktop synchronized file shares. Avoid `watchOptions.pollIntervalMs` in `next.config.js` except as a last resort (polling adds significant latency and CPU/I/O usage).
- **Turbopack tracing**: run with `NEXT_TURBOPACK_TRACING=1 next dev`, reproduce the issue, stop the server, then inspect `.next/dev/trace-turbopack` via `npx next internal trace <path>` and view at `https://trace.nextjs.org`.

## Notes

- `logging.fetches.fullUrl` in `next.config.js` gives detailed fetch logging during development.
- Share a generated trace file on GitHub Discussions or Discord when reporting performance problems.

## Related

- [Package Bundling](./package-bundling.md)
- [Debugging](./debugging.md)
