# next CLI

The `next` CLI runs the dev server, builds, starts, and inspects a Next.js application.

## Signature / Usage

```bash
npx next [command] [options]
```

Running `next` with no command is an alias for `next dev`. With `npm run`, prefix CLI flags with `--` so npm forwards them (not needed for pnpm/yarn/bun).

| Command | Description |
|------|-------------|
| `dev` | Development mode with HMR, error reporting. |
| `build` | Optimized production build; prints per-route info. |
| `start` | Production mode (requires prior `next build`). |
| `info` | Prints system/environment details for bug reports. |
| `telemetry` | Enable/disable anonymous telemetry. |
| `typegen` | Generates route TypeScript definitions without a full build. |
| `upgrade` | Upgrades the app to the latest (or a specified) Next.js version. |
| `experimental-analyze` | Analyzes bundle output via Turbopack (no build artifacts produced). |

## Options / Props

### `next dev`

| Option | Description |
|------|-------------|
| `[directory]` | Directory to run in (default: cwd). |
| `--turbopack` / `--turbo` | Force enable Turbopack (default). |
| `--webpack` | Use Webpack instead. |
| `-p, --port <port>` | Port (default `3000`, env `PORT`). |
| `-H, --hostname <hostname>` | Hostname (default `0.0.0.0`). |
| `--experimental-https[-key/-cert/-ca] <path>` | Serve over HTTPS with a self-signed (or custom) certificate. |
| `--experimental-upload-trace <traceUrl>` | Upload a debug trace subset to a remote URL. |
| `--experimental-cpu-prof` | V8 CPU profiling; profiles saved to `.next/cpu-profiles/`. |

Dev builds output to `.next/dev` (not `.next`), so `next dev` and `next build` can run concurrently without conflict.

### `next build`

| Option | Description |
|------|-------------|
| `[directory]` | Directory to build (default: cwd). |
| `--turbopack` / `--webpack` | Choose bundler (Turbopack default). |
| `-d, --debug` | Verbose build output (rewrites, redirects, headers). |
| `--profile` | Enables React production profiling. |
| `--no-lint` | Disables linting (linting is being removed from `next build` in Next 16). |
| `--no-mangling` | Disables name mangling (debugging only, hurts performance). |
| `--experimental-app-only` | Builds only App Router routes. |
| `--experimental-build-mode [mode]` | `"compile"` \| `"generate"` \| default. |
| `--debug-prerender` | Verbose prerender error debugging (dev-only; do not ship to prod). |
| `--debug-build-paths=<patterns>` | Build only matching routes/globs, e.g. `"app/**/page.tsx"`. |
| `--experimental-cpu-prof` | V8 CPU profiling. |

### `next start`

| Option | Description |
|------|-------------|
| `[directory]` | Directory to start (default: cwd). |
| `-p, --port` / `-H, --hostname` | Same as `dev`. |
| `--keepAliveTimeout <ms>` | Max time to wait before closing inactive connections — set **larger** than any downstream proxy/load-balancer's timeout to avoid abrupt connection termination. |
| `--experimental-cpu-prof` | V8 CPU profiling. |

### `next info`

| Option | Description |
|------|-------------|
| `--verbose` | Collects additional debugging info. |

Prints OS, binary versions (Node/npm/Yarn/pnpm), and package versions (`next`, `react`, `react-dom`, etc.) — useful for GitHub issue reports.

### `next telemetry`

| Option | Description |
|------|-------------|
| `--enable` / `--disable` | Toggle Next.js's anonymous telemetry collection. |

### `next typegen`

| Option | Description |
|------|-------------|
| `[directory]` | Directory to generate types for (default: cwd). |

Generates route TypeScript definitions (and `next-env.d.ts`) without a full build — output to `<distDir>/types` (`.next/dev/types` in dev, `.next/types` in prod). Useful for `next typegen && tsc --noEmit` in CI. Loads `next.config.*` using the production build phase, so required env vars/deps must be available.

### `next upgrade`

| Option | Description |
|------|-------------|
| `[directory]` | App directory to upgrade (default: cwd). |
| `--revision <revision>` | Target version/tag (`latest`, `canary`, `15.0.0`, etc.); defaults to current release channel. |
| `--verbose` | Verbose upgrade output. |

### `next experimental-analyze`

| Option | Description |
|------|-------------|
| `[directory]` | Directory to analyze (default: cwd). |
| `--no-mangling` | Disables mangling (debug only). |
| `--profile` | React production profiling. |
| `-o, --output` | Write static analysis files to `.next/diagnostics/analyze` instead of starting a server. |
| `--port <port>` | Analyzer server port (default `4000`, env `PORT`). |

Lets you filter bundles by route, switch client/server views, and trace import chains (including server-to-client boundaries and dynamic imports). Produces no build artifacts.

## Notes

- Set `PORT` via env var instead of `.env` — the HTTP server boots before `.env` is loaded.
- `next dev --experimental-https` uses `mkcert` for a locally-trusted cert; only for development.
- Node args can be passed via `NODE_OPTIONS`, e.g. `NODE_OPTIONS='--inspect' next dev`.
- Version history: `next upgrade` and `next experimental-analyze` added in `v16.1.0`; bundle size metrics removed from `next build` output in `v16.0.0`; `next typegen` added in `v15.5.0`; `--debug-prerender` added in `v15.4.0`.

## Related

- [create-next-app.md](./create-next-app.md)
