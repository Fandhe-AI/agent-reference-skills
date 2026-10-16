---
source: https://v2.tauri.app/reference/cli/#android
---

# tauri android

Android commands: `init`, `dev`, `build`, `run`.

## Signature / Usage

```sh
npm run tauri android <subcommand>
cargo tauri android <subcommand>
```

```text
Android commands

Usage: tauri android [OPTIONS] <COMMAND>

Commands:
  init   Initialize Android target in the project
  dev    Run your app in development mode on Android
  build  Build your app in release mode for Android and generate APKs and AABs
  run    Run your app in production mode on Android
  help   Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## android init

Initialize Android target in the project

```text
Usage: tauri android init [OPTIONS]

Options:
      --ci
          Skip prompting for values

          [env: CI=true]
  -v, --verbose...
          Enables verbose logging
      --skip-targets-install
          Skips installing rust toolchains via rustup
  -c, --config <CONFIG>
          JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file

          Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.

          Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `--ci` | env `CI=true` | Skip prompting for values |
| `-v, --verbose...` | — | Enables verbose logging |
| `--skip-targets-install` | — | Skips installing rust toolchains via rustup |
| `-c, --config` | `<CONFIG>` | JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file |

## android dev

Run your app in development mode on Android with hot-reloading for the Rust code. It makes use of the `build.devUrl` property from your `tauri.conf.json` file. It also runs your `build.beforeDevCommand` which usually starts your frontend devServer.

```text
Usage: tauri android dev [OPTIONS] [DEVICE] [-- <ARGS>...]

Arguments:
  [DEVICE]
          Runs on the given device name
  [ARGS]...
          Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. e.g. `tauri android dev -- [runnerArgs]`

Options:
  -f, --features [<FEATURES>...]
          List of cargo features to activate
  -v, --verbose...
          Enables verbose logging
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
  -o, --open
          Open Android Studio instead of trying to run on a connected device
      --force-ip-prompt
          Force prompting for an IP to use to connect to the dev server on mobile
      --host [<HOST>]
          Use the public network address for the development server. If an actual address it provided, it is used instead of prompting to pick one.

          On Windows we use the public network address by default.

          This option is particularly useful along the `--open` flag when you intend on running on a physical device.

          This replaces the devUrl configuration value to match the public network address host, it is your responsibility to set up your development server to listen on this address by using 0.0.0.0 as host for instance.

          When this is set or when running on an iOS device the CLI sets the `TAURI_DEV_HOST` environment variable so you can check this on your framework's configuration to expose the development server on the public network address.

          [default: <none>]
      --no-dev-server
          Disable the built-in dev server for static files
      --port <PORT>
          Specify port for the built-in dev server for static files. Defaults to 1430

          [env: TAURI_CLI_PORT=]
      --root-certificate-path <ROOT_CERTIFICATE_PATH>
          Path to the certificate file used by your dev server. Required for mobile dev when using HTTPS

          [env: TAURI_DEV_ROOT_CERTIFICATE_PATH=]
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[DEVICE]` | — | Runs on the given device name |
| `[ARGS]...` | — | Arguments passed to the runner after `--` |
| `-f, --features` | `[<FEATURES>...]` | List of cargo features to activate |
| `-e, --exit-on-panic` | — | Exit on panic |
| `-c, --config` | `<CONFIG>` | Config files / JSON strings to merge |
| `--release` | — | Run the code in release mode |
| `--no-dev-server-wait` | env `TAURI_CLI_NO_DEV_SERVER_WAIT` | Skip waiting for the frontend dev server |
| `--no-watch` | — | Disable the file watcher |
| `--additional-watch-folders` | `<ADDITIONAL_WATCH_FOLDERS>` | Additional paths to watch for changes |
| `-o, --open` | — | Open Android Studio instead of trying to run on a connected device |
| `--force-ip-prompt` | — | Force prompting for an IP to use to connect to the dev server on mobile |
| `--host` | `[<HOST>]`, default none | Use the public network address for the dev server; sets `TAURI_DEV_HOST` |
| `--no-dev-server` | — | Disable the built-in dev server for static files |
| `--port` | `<PORT>`, env `TAURI_CLI_PORT` | Port of the built-in dev server. Defaults to 1430 |
| `--root-certificate-path` | `<ROOT_CERTIFICATE_PATH>`, env `TAURI_DEV_ROOT_CERTIFICATE_PATH` | Certificate file used by your dev server. Required for mobile dev when using HTTPS |

## android build

Build your app in release mode for Android and generate APKs and AABs. It makes use of the `build.frontendDist` property from your `tauri.conf.json` file. It also runs your `build.beforeBuildCommand` which usually builds your frontend into `build.frontendDist`.

```text
Usage: tauri android build [OPTIONS] [-- <ARGS>...]

Arguments:
  [ARGS]...
          Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. e.g. `tauri android build -- [runnerArgs]`

Options:
  -d, --debug
          Builds with the debug flag
  -v, --verbose...
          Enables verbose logging
  -t, --target [<TARGETS>...]
          Which targets to build (all by default)

          [possible values: aarch64, armv7, i686, x86_64]
  -f, --features [<FEATURES>...]
          List of cargo features to activate
  -c, --config <CONFIG>
          JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file

          Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.

          Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
      --split-per-abi
          Whether to split the APKs and AABs per ABIs
      --apk
          Build APKs
      --aab
          Build AABs
  -o, --open
          Open Android Studio
      --ci
          Skip prompting for values

          [env: CI=true]
      --ignore-version-mismatches
          Do not error out if a version mismatch is detected on a Tauri package.

          Only use this when you are sure the mismatch is incorrectly detected as version mismatched Tauri packages can lead to unknown behavior.
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[ARGS]...` | — | Arguments passed to the runner after `--` |
| `-d, --debug` | — | Builds with the debug flag |
| `-t, --target` | `[<TARGETS>...]` | Which targets to build (all by default); possible values: aarch64, armv7, i686, x86_64 |
| `-f, --features` | `[<FEATURES>...]` | List of cargo features to activate |
| `-c, --config` | `<CONFIG>` | Config files / JSON strings to merge |
| `--split-per-abi` | — | Whether to split the APKs and AABs per ABIs |
| `--apk` | — | Build APKs |
| `--aab` | — | Build AABs |
| `-o, --open` | — | Open Android Studio |
| `--ci` | env `CI=true` | Skip prompting for values |
| `--ignore-version-mismatches` | — | Do not error out if a version mismatch is detected on a Tauri package |

## android run

Run your app in production mode on Android. It makes use of the `build.frontendDist` property from your `tauri.conf.json` file. It also runs your `build.beforeBuildCommand` which usually builds your frontend into `build.frontendDist`.

```text
Usage: tauri android run [OPTIONS] [DEVICE] [-- <ARGS>...]

Arguments:
  [DEVICE]
          Runs on the given device name
  [ARGS]...
          Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments. e.g. `tauri android build -- [runnerArgs]`

Options:
  -r, --release
          Run the app in release mode
  -v, --verbose...
          Enables verbose logging
  -f, --features [<FEATURES>...]
          List of cargo features to activate
  -c, --config <CONFIG>
          JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file

          Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.

          Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
      --no-watch
          Disable the file watcher
      --additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>
          Additional paths to watch for changes
  -o, --open
          Open Android Studio
      --ignore-version-mismatches
          Do not error out if a version mismatch is detected on a Tauri package.

          Only use this when you are sure the mismatch is incorrectly detected as version mismatched Tauri packages can lead to unknown behavior.
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[DEVICE]` | — | Runs on the given device name |
| `[ARGS]...` | — | Arguments passed to the runner after `--` |
| `-r, --release` | — | Run the app in release mode |
| `-f, --features` | `[<FEATURES>...]` | List of cargo features to activate |
| `-c, --config` | `<CONFIG>` | Config files / JSON strings to merge |
| `--no-watch` | — | Disable the file watcher |
| `--additional-watch-folders` | `<ADDITIONAL_WATCH_FOLDERS>` | Additional paths to watch for changes |
| `-o, --open` | — | Open Android Studio |
| `--ignore-version-mismatches` | — | Do not error out if a version mismatch is detected on a Tauri package |

## Notes

- Usage lines normalized from `pnpm-native run build android ...`; see overview for details.
- The `android run` help text for `[ARGS]...` says `tauri android build -- [runnerArgs]` (verbatim from the generated output).
- Tauri CLI only (Rust core + system WebView). Not the Electron toolchain; see the electron skill for Electron. Android Gradle / Play Store specifics belong to android-build-gradle.

## Related

- [ios](./ios.md)
- [dev](./dev.md)
- [build](./build.md)
