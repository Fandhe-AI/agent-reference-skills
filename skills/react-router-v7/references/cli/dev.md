# @react-router/dev CLI

The React Router CLI, provided by `@react-router/dev`. Should be listed in `devDependencies` so it is not deployed to your server.

```sh
npx @react-router/dev -h
```

**Availability**: Framework Mode only.

## 詳細説明

### `react-router dev`

Runs your app in development mode with HMR and **Hot Data Revalidation (HDR)**, powered by Vite.

- **HMR** updates client-side code (components, markup, styles) without a full reload
- **HDR** updates server-side code — re-fetches loader data when server code changes, keeping the app in sync without a page refresh

```sh
react-router dev
```

| Flag | Type | Description |
|------|------|-------------|
| `--port` | `number` | Specify port |
| `--host` | `string` | Specify hostname |
| `--open` | `boolean \| string` | Open browser on startup |
| `--strictPort` | `boolean` | Exit if specified port is already in use |
| `--cors` | `boolean` | Enable CORS |
| `--force` | `boolean` | Force optimizer to ignore cache and re-bundle |
| `--mode`, `-m` | `string` | Set env mode |
| `--config`, `-c` | `string` | Use specified config file |
| `--logLevel`, `-l` | `string` | Log level: `info`, `warn`, `error`, `silent` |
| `--clearScreen` | `boolean` | Allow/disable clear screen when logging |
| `--profile` | — | Start built-in Node.js inspector |

---

### `react-router build`

Builds the app for production with Vite. Sets `NODE_ENV=production` and minifies output.

```sh
react-router build
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--minify` | `boolean \| "terser" \| "esbuild"` | `"esbuild"` | Enable/disable/specify minifier |
| `--sourcemapClient` | `boolean \| "inline" \| "hidden"` | `false` | Output source maps for client build |
| `--sourcemapServer` | `boolean \| "inline" \| "hidden"` | `false` | Output source maps for server build |
| `--assetsInlineLimit` | `number` | `4096` | Static asset base64 inline threshold (bytes) |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--config`, `-c` | `string` | — | Use specified config file |
| `--logLevel`, `-l` | `string` | — | Log level |
| `--clearScreen` | `boolean` | — | Allow/disable clear screen |
| `--emptyOutDir` | `boolean` | — | Force empty outDir when outside root |
| `--profile` | — | — | Start built-in Node.js inspector |

---

### `react-router reveal`

Generates `entry.client.tsx` and `entry.server.tsx` in your `app` directory, giving you control over entry points. When these files exist, React Router uses them instead of the built-in defaults.

```sh
npx react-router reveal
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--typescript` | `boolean` | `true` | Generate TypeScript files |
| `--no-typescript` | `boolean` | `false` | Generate plain JavaScript files |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--config`, `-c` | `string` | — | Use specified config file |

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
| `--json` | `boolean` | `false` | Output routes in JSON format |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--config`, `-c` | `string` | — | Use specified config file |

---

### `react-router typegen`

Generates TypeScript types for all routes into `.react-router/types/`. Runs automatically during `react-router dev`, but can be run manually for CI.

```sh
# Generate once
react-router typegen

# Watch mode
react-router typegen --watch
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--watch` | `boolean` | `false` | Watch for route config changes |
| `--mode`, `-m` | `string` | — | Set env mode |
| `--config`, `-c` | `string` | — | Use specified config file |

## 注意点

- `@react-router/dev` should be in `devDependencies`, not `dependencies`, to avoid deploying dev tooling to your server
- `react-router dev` requires a Vite-based setup (Framework Mode); it is not available in Data or Declarative modes
- Run `react-router typegen` in CI before `tsc` to ensure generated types are present
- `react-router reveal` only needs to be run once; the generated entry files are then committed to your repo

## 関連

- [Type Safety](../explanation/type-safety.md)
- [Hot Module Replacement](../explanation/hot-module-replacement.md)
- [Code Splitting](../explanation/code-splitting.md)
