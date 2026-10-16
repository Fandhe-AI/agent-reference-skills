---
source: https://v2.tauri.app/reference/cli/#build
---

# tauri build

Build your app in release mode and generate bundles and installers. It makes use of the `build.frontendDist` property from your `tauri.conf.json` file. It also runs your `build.beforeBuildCommand` which usually builds your frontend into `build.frontendDist`. This will also run `build.beforeBundleCommand` before generating the bundles and installers of your app.

## Signature / Usage

```sh
npm run tauri build
cargo tauri build
```

```text
Usage: tauri build [OPTIONS] [ARGS]...

Arguments:
  [ARGS]...
          Command line arguments passed to the runner. Use `--` to explicitly mark the start of the arguments

Options:
  -r, --runner <RUNNER>
          Binary to use to build the application, defaults to `cargo`
  -v, --verbose...
          Enables verbose logging
  -d, --debug
          Builds with the debug flag
  -t, --target <TARGET>
          Target triple to build against.

          It must be one of the values outputted by `$rustc --print target-list` or `universal-apple-darwin` for an universal macOS application.

          Note that compiling an universal macOS application requires both `aarch64-apple-darwin` and `x86_64-apple-darwin` targets to be installed.
  -f, --features [<FEATURES>...]
          Space or comma separated list of features to activate
  -b, --bundles [<BUNDLES>...]
          Space or comma separated list of bundles to package

          [possible values: deb, rpm, appimage]
      --no-bundle
          Skip the bundling step even if `bundle > active` is `true` in tauri config
  -c, --config <CONFIG>
          JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file

          Configurations are merged in the order they are provided, which means a particular value overwrites previous values when a config key-value pair conflicts.

          Note that a platform-specific file is looked up and merged with the default file by default (tauri.macos.conf.json, tauri.linux.conf.json, tauri.windows.conf.json, tauri.android.conf.json and tauri.ios.conf.json) but you can use this for more specific use cases such as different build flavors.
      --ci
          Skip prompting for values

          [env: CI=true]
      --skip-stapling
          Skip stapling the notarization ticket onto the app and do not wait for notarization to finish.

          Gatekeeper will look for stapled tickets to tell whether your app was notarized without reaching out to Apple's servers which is helpful in offline environments.

          Enabling this option will also result in `tauri build` not waiting for notarization to finish which is helpful for the very first time your app is notarized as this can take multiple hours. On subsequent runs, it's recommended to disable this setting again.
      --ignore-version-mismatches
          Do not error out if a version mismatch is detected on a Tauri package.

          Only use this when you are sure the mismatch is incorrectly detected as version mismatched Tauri packages can lead to unknown behavior.
      --no-sign
          Skip code signing when bundling the app
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
| `[ARGS]...` | — | Arguments passed to the runner; use `--` to mark the start |
| `-r, --runner` | `<RUNNER>` | Binary to use to build the application, defaults to `cargo` |
| `-v, --verbose...` | — | Enables verbose logging |
| `-d, --debug` | — | Builds with the debug flag |
| `-t, --target` | `<TARGET>` | Target triple (from `rustc --print target-list`, or `universal-apple-darwin`) |
| `-f, --features` | `[<FEATURES>...]` | Space or comma separated list of features to activate |
| `-b, --bundles` | `[<BUNDLES>...]` | Space or comma separated list of bundles to package; possible values: deb, rpm, appimage |
| `--no-bundle` | — | Skip the bundling step even if `bundle > active` is `true` |
| `-c, --config` | `<CONFIG>` | JSON strings or paths to JSON, JSON5 or TOML files to merge with the default configuration file |
| `--ci` | env `CI=true` | Skip prompting for values |
| `--skip-stapling` | — | Skip stapling the notarization ticket and do not wait for notarization to finish |
| `--ignore-version-mismatches` | — | Do not error out if a version mismatch is detected on a Tauri package |
| `--no-sign` | — | Skip code signing when bundling the app |
| `--no-binary-patching` | — | Skip patching the main executable with bundle type information |

## Notes

- Usage line normalized from `pnpm-native run build build`; see overview for details.
- The `--bundles` possible-values list in the help output is `deb, rpm, appimage` (as generated on the Linux docs host); other platforms offer additional bundle types.
- Compiling a universal macOS application requires both `aarch64-apple-darwin` and `x86_64-apple-darwin` targets installed.
- Tauri bundler options only. Store submission and platform signing procedures are covered by apple-distribution, windows-packaging-publish and android-build-gradle.

## Related

- [bundle](./bundle.md)
- [dev](./dev.md)
