---
source: https://vite.dev/guide/cli#vite
---

# vite (dev server)

Start the Vite dev server in the current directory. `vite dev` and `vite serve` are aliases.

## Signature / Usage

```bash
vite [root]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--host [host]` | `string` | Specify hostname |
| `--port <port>` | `number` | Specify port |
| `--open [path]` | `boolean \| string` | Open browser on startup |
| `--cors` | `boolean` | Enable CORS |
| `--strictPort` | `boolean` | Exit if specified port is already in use |
| `--force` | `boolean` | Force the optimizer to ignore the cache and re-bundle |
| `--experimentalBundle` | `boolean` | Use experimental full bundle mode (this is highly experimental) |
| `-c, --config <file>` | `string` | Use specified config file |
| `--base <path>` | `string` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | `string` | info \| warn \| error \| silent |
| `--clearScreen` | `boolean` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `string` | Use `bundle` to bundle the config with Rolldown, or `runner` (experimental) to process it on the fly, or `native` (experimental) to load using the native runtime (default: `bundle`) |
| `--profile [name]` | `boolean \| string` | Start built-in Node.js inspector and write the profile to `<name>.cpuprofile` |
| `-d, --debug [feat]` | `string \| boolean` | Show debug logs |
| `-f, --filter <filter>` | `string` | Filter debug logs |
| `-m, --mode <mode>` | `string` | Set env mode |
| `-h, --help` | | Display available CLI options |
| `-v, --version` | | Display version number |

## Notes

- `--experimentalBundle` is documented as highly experimental.
- `--configLoader` values `runner` and `native` are experimental.

## Related

- [cli-build.md](./cli-build.md)
- [cli-optimize-preview.md](./cli-optimize-preview.md)
- [index-html-project-root.md](./index-html-project-root.md)
