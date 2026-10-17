---
source: https://vite.dev/guide/cli#vite
---

# Dev

Start the dev server `vite` and its options. `vite dev` / `vite serve` are aliases of `vite`.

## Start the dev server

```sh
vite [root]
```

```sh
vite serve some/sub/dir
```

When root is changed, the config file (`vite.config.js`) is also resolved inside the project root, so it must be moved there. In a scaffolded project, start the server with `npm run dev` (`"dev": "vite"`).

## Start with common options

```sh
vite --host
vite --port 3000
vite --port 3000 --strictPort
vite --open
vite --cors
vite --force
vite -c vite.config.custom.ts
vite --base /sub/
vite -m staging
```

`--force` ignores the optimizer cache and re-bundles. It is also used to re-optimize after linking / unlinking a dependency (described in troubleshooting).

## Options

| Options | Description |
| --- | --- |
| `--host [host]` | Specify hostname (`string`) |
| `--port <port>` | Specify port (`number`) |
| `--open [path]` | Open browser on startup (`boolean \| string`) |
| `--cors` | Enable CORS (`boolean`) |
| `--strictPort` | Exit if specified port is already in use (`boolean`) |
| `--force` | Force the optimizer to ignore the cache and re-bundle (`boolean`) |
| `--experimentalBundle` | Use experimental full bundle mode (this is highly experimental) (`boolean`) |
| `-c, --config <file>` | Use specified config file (`string`) |
| `--base <path>` | Public base path (default: `/`) (`string`) |
| `-l, --logLevel <level>` | info \| warn \| error \| silent (`string`) |
| `--clearScreen` | Allow/disable clear screen when logging (`boolean`) |
| `--configLoader <loader>` | `bundle` (default) / `runner` (experimental) / `native` (experimental) |
| `--profile [name]` | Start built-in Node.js inspector and write the profile to `<name>.cpuprofile` |
| `-d, --debug [feat]` | Show debug logs (`string \| boolean`) |
| `-f, --filter <filter>` | Filter debug logs (`string`) |
| `-m, --mode <mode>` | Set env mode (`string`) |
| `-h, --help` | Display available CLI options |
| `-v, --version` | Display version number |

> **Warning**: The official CLI table marks `--experimentalBundle` as "highly experimental". Use it in a production project only after verifying in a throwaway environment. `--configLoader runner` / `native` are also experimental.

## Check help and version

```sh
npx vite --help
npx vite --version
```
