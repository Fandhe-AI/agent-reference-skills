---
source: https://vite.dev/guide/cli#vite-preview
---

# Preview and Optimize

Commands for `vite preview` (locally preview the build output) and `vite optimize` (dependency pre-bundling, deprecated).

## Preview the production build locally

```sh
vite build
vite preview [root]
```

Serves the build directory (default `dist`). Refresh it beforehand with `vite build`. Defaults to `http://localhost:4173`. Some middleware are used depending on the `appType` setting.

> **Warning**: Do not use `vite preview` as a production server (the official docs state it is "not designed for it").

## Specify the preview port

```sh
vite preview --port 8080
```

```json
{
  "scripts": {
    "preview": "vite preview --port 8080"
  }
}
```

## Preview options

```sh
vite preview --host
vite preview --strictPort
vite preview --open
vite preview --outDir dist
```

| Options | Description |
| --- | --- |
| `--host [host]` | Specify hostname |
| `--port <port>` | Specify port |
| `--strictPort` | Exit if specified port is already in use |
| `--open [path]` | Open browser on startup |
| `--outDir <dir>` | Output directory (default: `dist`) |
| `-c, --config <file>` | Use specified config file |
| `--base <path>` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | info \| warn \| error \| silent |
| `--clearScreen` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `bundle` (default) / `runner` (experimental) / `native` (experimental) |
| `-d, --debug [feat]` | Show debug logs |
| `-f, --filter <filter>` | Filter debug logs |
| `-m, --mode <mode>` | Set env mode |
| `-h, --help` | Display available CLI options |

## Pre-bundle dependencies (deprecated)

```sh
vite optimize [root]
vite optimize --force
```

> **Warning**: The official docs state "Deprecated: the pre-bundle process runs automatically and does not need to be called". It normally does not need to be run. `--force` ignores the cache and re-bundles.

The options of `vite optimize` are `--force` / `-c, --config` / `--base` / `-l, --logLevel` / `--clearScreen` / `--configLoader` / `-d, --debug` / `-f, --filter` / `-m, --mode` / `-h, --help`.
