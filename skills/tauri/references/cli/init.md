---
source: https://v2.tauri.app/reference/cli/#init
---

# tauri init

Initialize a Tauri project in an existing directory.

## Signature / Usage

```sh
npm run tauri init
cargo tauri init
```

```text
Initialize a Tauri project in an existing directory

Usage: tauri init [OPTIONS]

Options:
      --ci
          Skip prompting for values [env: CI=true]
  -v, --verbose...
          Enables verbose logging
  -f, --force
          Force init to overwrite the src-tauri folder
  -l, --log
          Enables logging
  -d, --directory <DIRECTORY>
          Set target directory for init [default: /opt/build/repo/packages/cli-generator]
  -t, --tauri-path <TAURI_PATH>
          Path of the Tauri project to use (relative to the cwd)
  -A, --app-name <APP_NAME>
          Name of your Tauri application
  -W, --window-title <WINDOW_TITLE>
          Window title of your Tauri application
  -D, --frontend-dist <FRONTEND_DIST>
          Web assets location, relative to <project-dir>/src-tauri
  -P, --dev-url <DEV_URL>
          Url of your dev server
      --before-dev-command <BEFORE_DEV_COMMAND>
          A shell command to run before `tauri dev` kicks in
      --before-build-command <BEFORE_BUILD_COMMAND>
          A shell command to run before `tauri build` kicks in
  -h, --help
          Print help
  -V, --version
          Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `--ci` | env `CI=true` | Skip prompting for values |
| `-v, --verbose...` | — | Enables verbose logging |
| `-f, --force` | — | Force init to overwrite the src-tauri folder |
| `-l, --log` | — | Enables logging |
| `-d, --directory` | `<DIRECTORY>` | Set target directory for init (default: current working directory) |
| `-t, --tauri-path` | `<TAURI_PATH>` | Path of the Tauri project to use (relative to the cwd) |
| `-A, --app-name` | `<APP_NAME>` | Name of your Tauri application |
| `-W, --window-title` | `<WINDOW_TITLE>` | Window title of your Tauri application |
| `-D, --frontend-dist` | `<FRONTEND_DIST>` | Web assets location, relative to `<project-dir>/src-tauri` |
| `-P, --dev-url` | `<DEV_URL>` | Url of your dev server |
| `--before-dev-command` | `<BEFORE_DEV_COMMAND>` | A shell command to run before `tauri dev` kicks in |
| `--before-build-command` | `<BEFORE_BUILD_COMMAND>` | A shell command to run before `tauri build` kicks in |

## Notes

- Usage line normalized from `pnpm-native run build init`; see overview for details.
- The `[default: /opt/build/repo/packages/cli-generator]` value in the help output is the docs build's working directory; at run time it is the cwd.

## Related

- [overview](./overview.md)
- [dev](./dev.md)
