---
source: https://v2.tauri.app/reference/cli/
---

# Dev and Build

Commands for desktop `tauri dev` / `tauri build` / `tauri bundle`.

The invocation form depends on how the CLI is installed (the rest of this file shows the `npm run tauri` and `cargo tauri` forms; npm needs `--` before extra flags).

| Install | Invocation |
| --- | --- |
| npm | `npm run tauri <cmd>` |
| yarn | `yarn tauri <cmd>` |
| pnpm | `pnpm tauri <cmd>` |
| deno | `deno task tauri <cmd>` |
| bun | `bun tauri <cmd>` |
| cargo | `cargo tauri <cmd>` |

## Run in development mode

```sh
npm run tauri dev
```

```sh
cargo tauri dev
```

Reads `build.devUrl` and runs `build.beforeDevCommand` (usually starts the frontend dev server). Rust code is hot-reloaded. The first run takes several minutes to build the Rust packages.

## Run dev with options

```sh
cargo tauri dev --release
cargo tauri dev --no-watch
cargo tauri dev --no-dev-server-wait
cargo tauri dev --config <CONFIG>
cargo tauri dev --target <TARGET>
cargo tauri dev --features <FEATURES>
cargo tauri dev --port <PORT>
cargo tauri dev -- [runnerArgs] -- [appArgs]
```

`--no-watch` disables watching files in `src-tauri`. List files to exclude from watching in `.taurignore` (`.gitignore` format). `--no-dev-server` disables the built-in static file dev server; `--port` sets its listening port (default 1430).

## Release build (with bundling)

```sh
npm run tauri build
```

```sh
cargo tauri build
```

Reads `build.frontendDist`, runs `build.beforeBuildCommand` and `build.beforeBundleCommand`, and produces bundles and installers.

## Run build with options

```sh
cargo tauri build --debug
cargo tauri build --no-bundle
cargo tauri build --bundles deb rpm appimage
cargo tauri build --target universal-apple-darwin
cargo tauri build --features <FEATURES>
cargo tauri build --config <CONFIG>
cargo tauri build --ci
cargo tauri build --no-sign
cargo tauri build --skip-stapling
cargo tauri build --ignore-version-mismatches
cargo tauri build --no-binary-patching
```

`--target` takes a value from `rustc --print target-list`, or `universal-apple-darwin` for macOS universal builds (requires both the `aarch64-apple-darwin` and `x86_64-apple-darwin` targets). The `--bundles` candidates are the CLI's `[possible values: deb, rpm, appimage]` (other values are used on other platforms). `--skip-stapling` skips stapling the notarization ticket and waiting for notarization to finish.

> **WARNING**: `--ignore-version-mismatches` ignores Tauri package version mismatch errors. The official docs say to use it only when you are sure the mismatch detection is wrong. `--no-sign` skips signing (do not use for distributed artifacts).

## Generate only the bundle from a built app

```sh
npm run tauri build -- --no-bundle --target universal-apple-darwin
npm run tauri bundle -- --bundles app --target universal-apple-darwin
```

> Notes: Adapted from the App Store page, whose build step omits --target; it is added here so the universal bundle step has a binary to package.

```sh
cargo tauri bundle
```

Generates bundles and installers from an app already built with `tauri build`. `build.beforeBundleCommand` is run. `tauri bundle` accepts `--debug` / `--bundles` / `--config` / `--features` / `--target` / `--ci` / `--skip-stapling` / `--no-sign` / `--no-binary-patching`.

## Override the config file

```sh
cargo tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
```

`--config` takes a JSON string or the path of a JSON / JSON5 / TOML file and is merged into the default config (later values win). The path above is the example from the Microsoft Store distribution page. `tauri.macos.conf.json` / `tauri.linux.conf.json` / `tauri.windows.conf.json` / `tauri.android.conf.json` / `tauri.ios.conf.json` are merged automatically per platform.

## Dev config example (config file)

Configure the dev server in `tauri.conf.json` (configuration, not a command).

```json
{
  "build": {
    "devUrl": "http://localhost:3000",
    "beforeDevCommand": "npm run dev"
  }
}
```

## .taurignore (exclude from watching)

```txt
build/
src/generated/*.rs
deny.toml
```

## Notes

- `Usage: pnpm-native run build <cmd>` in the source `--help` output comes from the environment that generated the official docs. The actual invocation is `tauri <cmd>`.
- The built-in dev server (used when `build.frontendDist` is set) does not support mutual authentication or encryption. The official docs forbid using it on untrusted networks.
- The source `--help` was generated with `@tauri-apps/cli` 2.12.2 (npm latest is 2.12.3; the only difference in `crates/tauri-cli/src` is `xcode_script.rs`).
