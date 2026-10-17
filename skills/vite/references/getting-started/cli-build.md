---
source: https://vite.dev/guide/cli#vite-build
---

# vite build

Build for production.

## Signature / Usage

```bash
vite build [root]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--target <target>` | `string` | Transpile target (default: `"baseline-widely-available"`) |
| `--outDir <dir>` | `string` | Output directory (default: `dist`) |
| `--assetsDir <dir>` | `string` | Directory under outDir to place assets in (default: `"assets"`) |
| `--assetsInlineLimit <number>` | `number` | Static asset base64 inline threshold in bytes (default: `4096`) |
| `--ssr [entry]` | `string` | Build specified entry for server-side rendering |
| `--sourcemap [output]` | `boolean \| "inline" \| "hidden"` | Output source maps for build (default: `false`) |
| `--minify [minifier]` | `boolean \| "oxc" \| "terser" \| "esbuild"` | Enable/disable minification, or specify minifier to use (default: `"oxc"`) |
| `--manifest [name]` | `boolean \| string` | Emit build manifest json |
| `--ssrManifest [name]` | `boolean \| string` | Emit ssr manifest json |
| `--emptyOutDir` | `boolean` | Force empty outDir when it's outside of root |
| `-w, --watch` | `boolean` | Rebuilds when modules have changed on disk |
| `-c, --config <file>` | `string` | Use specified config file |
| `--base <path>` | `string` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | `string` | info \| warn \| error \| silent |
| `--clearScreen` | `boolean` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `string` | `bundle` (default), `runner` (experimental) or `native` (experimental) |
| `--profile [name]` | `boolean \| string` | Start built-in Node.js inspector and write the profile to `<name>.cpuprofile` |
| `-d, --debug [feat]` | `string \| boolean` | Show debug logs |
| `-f, --filter <filter>` | `string` | Filter debug logs |
| `-m, --mode <mode>` | `string` | Set env mode |
| `-h, --help` | | Display available CLI options |
| `--app` | `boolean` | Build all environments, same as `builder: {}` (experimental) |

## Notes

- `--app` is marked experimental.
- The `--minify` option type lists `"esbuild"` alongside `"oxc"` and `"terser"`; the default is `"oxc"`. See the migration pages for v7 → v8 differences.

## Related

- [cli-dev.md](./cli-dev.md)
- [cli-optimize-preview.md](./cli-optimize-preview.md)
