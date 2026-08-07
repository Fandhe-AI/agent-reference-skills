# @react-router/dev (CLI)

The React Router CLI, provided by `@react-router/dev`. Should be listed in `devDependencies` so it is not deployed to your server.

```sh
npx @react-router/dev -h
```

**Availability**: Framework Mode only.

## Signature / Usage

```sh
react-router build
react-router dev
react-router reveal
react-router routes [--json]
react-router typegen [--watch]
```

## 詳細説明

### `react-router build`

Builds the app for production with Vite. Sets `NODE_ENV=production` and minifies output.

```sh
react-router build
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--assetsInlineLimit` | `number` | `4096` | Static asset base64 inline threshold (bytes) |
| `--clearScreen` | `boolean` | — | Allow/disable clear screen when logging |
| `--config`, `-c` | `string` | — | Use specified config file |
| `--emptyOutDir` | `boolean` | — | Force empty outDir when outside root |
| `--logLevel`, `-l` | `"info" \| "warn" \| "error" \| "silent" \| string` | — | Log level |
| `--minify` | `boolean \| "terser" \| "esbuild"` | `"esbuild"` | Enable/disable/specify minifier |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--profile` | — | — | Start built-in Node.js inspector |
| `--sourcemapClient` | `boolean \| "inline" \| "hidden"` | `false` | Output source maps for client build |
| `--sourcemapServer` | `boolean \| "inline" \| "hidden"` | `false` | Output source maps for server build |

---

### `react-router dev`

Runs your app in development mode with HMR and **Hot Data Revalidation (HDR)**, powered by Vite.

- **HMR** updates client-side code (components, markup, styles) without a full reload
- **HDR** updates server-side code — re-fetches loader data when server code changes, keeping the app in sync without a page refresh

```sh
react-router dev
```

| Flag | Type | Description |
|------|------|-------------|
| `--clearScreen` | `boolean` | Allow/disable clear screen when logging |
| `--config`, `-c` | `string` | Use specified config file |
| `--cors` | `boolean` | Enable CORS |
| `--force` | `boolean` | Force optimizer to ignore cache and re-bundle |
| `--host` | `string` | Specify hostname |
| `--logLevel`, `-l` | `"info" \| "warn" \| "error" \| "silent" \| string` | Log level |
| `--mode`, `-m` | `string` | Set env mode |
| `--open` | `boolean \| string` | Open browser on startup |
| `--port` | `number` | Specify port |
| `--profile` | — | Start built-in Node.js inspector |
| `--strictPort` | `boolean` | Exit if specified port is already in use |

---

### `react-router reveal`

Generates `entry.client.tsx` and `entry.server.tsx` in your `app` directory, giving you control over entry points. When these files exist, React Router uses them instead of the built-in defaults.

```sh
npx react-router reveal
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--config`, `-c` | `string` | — | Use specified config file |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--no-typescript` | `boolean` | `false` | Generate plain JavaScript files |
| `--typescript` | `boolean` | `true` | Generate TypeScript files |

---

### `react-router routes`

Prints the route tree to the terminal. Useful for inspecting route config output.

```sh
react-router routes

# JSON output
react-router routes --json
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--config`, `-c` | `string` | — | Use specified config file |
| `--json` | `boolean` | `false` | Output routes in JSON format |
| `--mode`, `-m` | `string` | — | Set env mode |

---

### `react-router typegen`

Generates TypeScript types for all routes into `.react-router/types/`. Runs automatically during `react-router dev`, but can be run manually for CI. See [Type Safety](../explanation/type-safety.md) for details.

```sh
# Generate once
react-router typegen

# Watch mode
react-router typegen --watch
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--config`, `-c` | `string` | — | Use specified config file |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--watch` | `boolean` | `false` | Watch for route config changes |

## Notes

- `@react-router/dev` should be in `devDependencies`, not `dependencies`, to avoid deploying dev tooling to your server
- `react-router dev` requires a Vite-based setup (Framework Mode); it is not available in Data or Declarative modes
- Run `react-router typegen` in CI before `tsc` to ensure generated types are present
- `react-router reveal` only needs to be run once; the generated entry files are then committed to your repo
- v8: command set and flags unchanged from v7 — no commands added or removed

## Related

- [Type Safety](../explanation/type-safety.md)
- [Hot Module Replacement](../explanation/hot-module-replacement.md)
- [Code Splitting](../explanation/code-splitting.md)
- [@react-router/serve](./serve.md)
- [Server Adapters](./adapter.md)
