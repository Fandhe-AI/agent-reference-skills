---
source: https://v2.tauri.app/reference/cli/#bundle
---

# tauri bundle

Generate bundles and installers for your app (already built by `tauri build`). This run `build.beforeBundleCommand` before generating the bundles and installers of your app.

## Signature / Usage

```sh
npm run tauri bundle
cargo tauri bundle
```

```text
Usage: tauri bundle [OPTIONS]

Options:
  -d, --debug
          Builds with the debug flag
  -v, --verbose...
          Enables verbose logging
  -b, --bundles [<BUNDLES>...]
          Space or comma separated list of bundles to package

          [possible values: deb, rpm, appimage]
  -c, --config <CONFIG>
          JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file

          Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.

          Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
  -f, --features [<FEATURES>...]
          Space or comma separated list of features, should be the same features passed to `tauri build` if any
  -t, --target <TARGET>
          Target triple to build against.

          It must be one of the values outputted by `$rustc --print target-list` or `universal-apple-darwin` for an universal macOS application.

          Note that compiling an universal macOS application requires both `aarch64-apple-darwin` and `x86_64-apple-darwin` targets to be installed.
      --ci
          Skip prompting for values

          [env: CI=true]
      --skip-stapling
          Skip stapling the notarization ticket onto the app and do not wait for notarization to finish.

          Gatekeeper will look for stapled tickets to tell whether your app was notarized without reaching out to Apple's servers which is helpful in offline environments.

          Enabling this option will also result in `tauri build` not waiting for notarization to finish which is helpful for the very first time your app is notarized as this can take multiple hours. On subsequent runs, it's recommended to disable this setting again.
      --no-sign
          Skip code signing during the build or bundling process.

          Useful for local development and CI environments where signing certificates or environment variables are not available or not needed.
      --no-binary-patching
          Skip patching the main executable with bundle type information.

          The patching rewrites the binary in place, invalidating an existing code signature. Skipping it preserves an already-signed binary at the cost of per-bundle-type updater support (only relevant when shipping multiple bundle types per platform).
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `-d, --debug` | — | Builds with the debug flag |
| `-v, --verbose...` | — | Enables verbose logging |
| `-b, --bundles` | `[<BUNDLES>...]` | Space or comma separated list of bundles to package; possible values: deb, rpm, appimage |
| `-c, --config` | `<CONFIG>` | JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file |
| `-f, --features` | `[<FEATURES>...]` | Features; should be the same features passed to `tauri build` if any |
| `-t, --target` | `<TARGET>` | Target triple to build against (`rustc --print target-list` value or `universal-apple-darwin`) |
| `--ci` | env `CI=true` | Skip prompting for values |
| `--skip-stapling` | — | Skip stapling the notarization ticket and do not wait for notarization to finish |
| `--no-sign` | — | Skip code signing during the build or bundling process |
| `--no-binary-patching` | — | Skip patching the main executable with bundle type information |

## Notes

- Usage line normalized from `pnpm-native run build bundle`; see overview for details.
- The `[possible values: deb, rpm, appimage]` list is verbatim from the generated help (output generated on Linux; other platforms offer other bundle types).
- Tauri CLI only (Rust core + system WebView). Not the Electron toolchain; see the electron skill for Electron.

## Related

- [build](./build.md)
- [overview](./overview.md)
