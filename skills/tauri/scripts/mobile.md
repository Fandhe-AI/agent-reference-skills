---
source: https://v2.tauri.app/develop/
---

# Mobile

Commands for initializing, developing, building, and running with `tauri android` / `tauri ios`.

> **WARNING**: Every `tauri ios` command works only on a macOS host. `--host`, used for physical devices, exposes the dev server on a public network address (the official docs note that the dev server has no mutual authentication or encryption). Use it only on trusted networks.

## Initialize an Android project

```sh
npm run tauri android init
```

```sh
cargo tauri android init
```

Options: `--ci` / `--skip-targets-install` (skip installing toolchains via rustup) / `--config <CONFIG>`.

## Initialize an iOS project

```sh
npm run tauri ios init
```

```sh
cargo tauri ios init
```

Options: `--ci` / `-r, --reinstall-deps` / `--skip-targets-install` / `--config <CONFIG>`.

## Run in development mode

```sh
npm run tauri android dev
npm run tauri ios dev
```

```sh
cargo tauri android dev
cargo tauri ios dev
```

Runs on a connected device, or prompts you to choose a simulator / emulator if none is connected. You can pass the device name as an argument.

```sh
cargo tauri ios dev 'iPhone 15'
```

## Open Xcode / Android Studio

```sh
cargo tauri android dev --open
cargo tauri ios dev --open
```

To run on a physical iOS device, also pass `--host`; the dev server uses `TAURI_DEV_HOST` as its listening host.

```sh
cargo tauri ios dev --open --host
```

To choose the iOS device address (connect the device over the network first via Window > Devices and Simulators in Xcode).

```sh
cargo tauri ios dev --force-ip-prompt
```

Do not terminate the Tauri CLI process while you work in Xcode / Android Studio.

## Main dev options

| Option | Description |
| --- | --- |
| `-f, --features [<FEATURES>...]` | Cargo features to enable |
| `-e, --exit-on-panic` | Exit on panic |
| `-c, --config <CONFIG>` | Merge config (JSON string or JSON / JSON5 / TOML path) |
| `--release` | Run in release mode |
| `--no-dev-server-wait` | Do not wait for the dev server to start |
| `--no-watch` | Disable file watching |
| `--additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>` | Extra paths to watch |
| `-o, --open` | Open Android Studio / Xcode |
| `--force-ip-prompt` | Ask for the IP used to reach the dev server every time |
| `--host [<HOST>]` | Reach the dev server over a public network address (default on Windows) |
| `--no-dev-server` | Disable the built-in static dev server |
| `--port <PORT>` | Port of the built-in dev server (default 1430) |
| `--root-certificate-path <ROOT_CERTIFICATE_PATH>` | Certificate for an HTTPS dev server (env `TAURI_DEV_ROOT_CERTIFICATE_PATH`) |

## Android release build

```sh
npm run tauri android build
```

```sh
cargo tauri android build --aab
cargo tauri android build --apk
cargo tauri android build --apk --split-per-abi
cargo tauri android build --aab --target aarch64 --target armv7
```

`-t, --target` accepts `aarch64` / `armv7` / `i686` / `x86_64` (default is all). Other options: `-d, --debug` / `-f, --features` / `-c, --config` / `-o, --open` / `--ci` / `--ignore-version-mismatches`.

## iOS release build

```sh
npm run tauri ios build
```

```sh
cargo tauri ios build --export-method app-store-connect
cargo tauri ios build --open
```

`--export-method` accepts `app-store-connect` / `release-testing` / `debugging`. `-t, --target` accepts `aarch64` (default) / `aarch64-sim` / `x86_64`. Others: `--build-number <BUILD_NUMBER>` / `-d, --debug` / `-f, --features` / `-c, --config` / `-o, --open` / `--ci` / `--ignore-version-mismatches`.

## Run in release mode

```sh
cargo tauri android run
cargo tauri ios run
```

Accepts `-r, --release` / `-f, --features` / `-c, --config` / `--no-watch` / `--additional-watch-folders` / `-o, --open` / `--ignore-version-mismatches`. The device name is the first argument.

## Reference: Vite dev server config

To use a physical iOS device, the dev server must listen on `TAURI_DEV_HOST`. The official Vite example.

```js
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    host: host || false,
    port: 1420,
    strictPort: true,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
  },
});
```
