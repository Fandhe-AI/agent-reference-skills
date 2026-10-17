---
source: https://vite.dev/guide/cli#vite-build
---

# Build

Commands for the production build `vite build`.

## Production build

```sh
vite build [root]
```

In a scaffolded project, run `npm run build` (`"build": "vite build"`). The default output directory is `dist`.

## Build with common options

```sh
vite build --outDir out
vite build --assetsDir static
vite build --target es2020
vite build --sourcemap
vite build --sourcemap hidden
vite build --minify terser
vite build --manifest
vite build --base /sub/
vite build -m staging
```

## Rebuild on file changes (watch)

```sh
vite build --watch
```

`-w, --watch` enables the Rolldown watcher, which rebuilds when bundled files change. Changes to the config file and its dependencies require restarting the build command. `WatcherOptions` can also be adjusted directly with `build.watch`.

## SSR build

```sh
vite build --ssr [entry]
```

Builds the specified entry for server-side rendering. `--ssrManifest [name]` emits an SSR manifest json.

## Options

| Options | Description |
| --- | --- |
| `--target <target>` | Transpile target (default: `"baseline-widely-available"`) |
| `--outDir <dir>` | Output directory (default: `dist`) |
| `--assetsDir <dir>` | Directory under outDir to place assets in (default: `"assets"`) |
| `--assetsInlineLimit <number>` | Static asset base64 inline threshold in bytes (default: `4096`) |
| `--ssr [entry]` | Build specified entry for server-side rendering |
| `--sourcemap [output]` | Output source maps for build (default: `false`) (`boolean \| "inline" \| "hidden"`) |
| `--minify [minifier]` | Enable/disable minification, or specify minifier (default: `"oxc"`) (`boolean \| "oxc" \| "terser" \| "esbuild"`) |
| `--manifest [name]` | Emit build manifest json |
| `--ssrManifest [name]` | Emit ssr manifest json |
| `--emptyOutDir` | Force empty outDir when it's outside of root |
| `-w, --watch` | Rebuilds when modules have changed on disk |
| `-c, --config <file>` | Use specified config file |
| `--base <path>` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | info \| warn \| error \| silent |
| `--clearScreen` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `bundle` (default) / `runner` (experimental) / `native` (experimental) |
| `--profile [name]` | Write Node.js inspector profile to `<name>.cpuprofile` |
| `-d, --debug [feat]` | Show debug logs |
| `-f, --filter <filter>` | Filter debug logs |
| `-m, --mode <mode>` | Set env mode |
| `-h, --help` | Display available CLI options |
| `--app` | Build all environments, same as `builder: {}` (experimental) |

> **Warning**: `--emptyOutDir` forcibly empties an outDir located outside of root. If `--outDir` points to an unintended directory, its contents are deleted, so verify the target path before running. `--app` is experimental.
