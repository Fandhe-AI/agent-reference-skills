---
source: https://vite.dev/guide/cli#vite-preview
---

# vite optimize / vite preview

`vite optimize` pre-bundles dependencies (deprecated); `vite preview` locally previews the production build.

## Signature / Usage

```bash
vite optimize [root]
vite preview [root]
```

## Options / Props

`vite preview`:

| Name | Type | Description |
|------|------|-------------|
| `--host [host]` | `string` | Specify hostname |
| `--port <port>` | `number` | Specify port |
| `--strictPort` | `boolean` | Exit if specified port is already in use |
| `--open [path]` | `boolean \| string` | Open browser on startup |
| `--outDir <dir>` | `string` | Output directory (default: `dist`) |
| `-c, --config <file>` | `string` | Use specified config file |
| `--base <path>` | `string` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | `string` | info \| warn \| error \| silent |
| `--clearScreen` | `boolean` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `string` | `bundle` (default), `runner` (experimental) or `native` (experimental) |
| `-d, --debug [feat]` | `string \| boolean` | Show debug logs |
| `-f, --filter <filter>` | `string` | Filter debug logs |
| `-m, --mode <mode>` | `string` | Set env mode |
| `-h, --help` | | Display available CLI options |

`vite optimize`:

| Name | Type | Description |
|------|------|-------------|
| `--force` | `boolean` | Force the optimizer to ignore the cache and re-bundle |
| `-c, --config <file>` | `string` | Use specified config file |
| `--base <path>` | `string` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | `string` | info \| warn \| error \| silent |
| `--clearScreen` | `boolean` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `string` | `bundle` (default), `runner` (experimental) or `native` (experimental) |
| `-d, --debug [feat]` | `string \| boolean` | Show debug logs |
| `-f, --filter <filter>` | `string` | Filter debug logs |
| `-m, --mode <mode>` | `string` | Set env mode |
| `-h, --help` | | Display available CLI options |

## Notes

- `vite optimize` is deprecated: the pre-bundle process runs automatically and does not need to be called.
- `vite preview` must not be used as a production server; it is not designed for it. It serves the build directory (default `dist`), so run `vite build` beforehand. Depending on the configured `appType`, it makes use of certain middleware.

## Related

- [cli-dev.md](./cli-dev.md)
- [cli-build.md](./cli-build.md)
