---
source: https://v2.tauri.app/reference/cli/#dev
---

# tauri dev

Run your app in development mode with hot-reloading for the Rust code. It makes use of the `build.devUrl` property from your `tauri.conf.json` file. It also runs your `build.beforeDevCommand` which usually starts your frontend devServer.

## Signature / Usage

```sh
npm run tauri dev
cargo tauri dev
```

```text
Usage: tauri dev [OPTIONS] [ARGS]...

Arguments:
  [ARGS]...
          Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. Arguments after a second `--` are passed to the application e.g. `tauri dev -- [runnerArgs] -- [appArgs]`

Options:
  -r, --runner <RUNNER>
          Binary to use to run the application
  -v, --verbose...
          Enables verbose logging
  -t, --target <TARGET>
          Target triple to build against
  -f, --features [<FEATURES>...]
          List of cargo features to activate
  -e, --exit-on-panic
          Exit on panic
  -c, --config <CONFIG>
          JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file

          Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.

          Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
      --release
          Run the code in release mode
      --no-dev-server-wait
          Skip waiting for the frontend dev server to start before building the tauri application

          [env: TAURI_CLI_NO_DEV_SERVER_WAIT=]
      --no-watch
          Disable the file watcher
      --additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>
          Additional paths to watch for changes
      --no-dev-server
          Disable the built-in dev server for static files
      --port <PORT>
          Specify port for the built-in dev server for static files. Defaults to 1430

          [env: TAURI_CLI_PORT=]
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `[ARGS]...` | — | Arguments passed to the runner; `--` marks the start, a second `--` starts app args: `tauri dev -- [runnerArgs] -- [appArgs]` |
| `-r, --runner` | `<RUNNER>` | Binary to use to run the application |
| `-v, --verbose...` | — | Enables verbose logging |
| `-t, --target` | `<TARGET>` | Target triple to build against |
| `-f, --features` | `[<FEATURES>...]` | List of cargo features to activate |
| `-e, --exit-on-panic` | — | Exit on panic |
| `-c, --config` | `<CONFIG>` | JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file; merged in order given |
| `--release` | — | Run the code in release mode |
| `--no-dev-server-wait` | env `TAURI_CLI_NO_DEV_SERVER_WAIT` | Skip waiting for the frontend dev server to start before building |
| `--no-watch` | — | Disable the file watcher |
| `--additional-watch-folders` | `<ADDITIONAL_WATCH_FOLDERS>` | Additional paths to watch for changes |
| `--no-dev-server` | — | Disable the built-in dev server for static files |
| `--port` | `<PORT>`, env `TAURI_CLI_PORT` | Port for the built-in dev server for static files. Defaults to 1430 |

## Notes

- Usage line normalized from `pnpm-native run build dev`; see overview for details.
- Platform-specific config files (`tauri.macos.conf.json`, `tauri.linux.conf.json`, `tauri.windows.conf.json`, `tauri.android.conf.json`, `tauri.ios.conf.json`) are looked up and merged automatically.

## Related

- [build](./build.md)
- [android](./android.md)
- [ios](./ios.md)
