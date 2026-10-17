---
source: https://v2.tauri.app/develop/icons/
---

# Icons and Signer

Commands for generating app icons (`tauri icon`) and for generating updater signing keys and signing files (`tauri signer`).

> **WARNING**: Never share or commit the private key printed by `tauri signer generate`. The official docs say that if you lose the key you can no longer publish new updates to users who already installed the app. `-f, --force` overwrites an existing private key file.

## Generate icons

```sh
npm run tauri icon
```

```sh
cargo tauri icon
```

The input defaults to `./app-icon.png`. Desktop icons are written to `src-tauri/icons` by default; mobile icons are placed directly into the Xcode / Android Studio projects.

## Specify the input file and output location

```sh
cargo tauri icon /path/to/app-icon.png
cargo tauri icon /path/to/app-icon.png --ios-color '#fff'
cargo tauri icon --output <OUTPUT>
cargo tauri icon --png <PNG>
cargo tauri icon --fit contain
```

| Option | Description |
| --- | --- |
| `[INPUT]` | Square PNG / SVG (with transparency) or manifest JSON (default `./app-icon.png`) |
| `-o, --output <OUTPUT>` | Output directory (default is `icons` next to `tauri.conf.json`) |
| `-p, --png <PNG>` | PNG sizes to generate (when given, the default icons are not generated) |
| `--ios-color <IOS_COLOR>` | Background color for iOS icons (CSS Color Module Level 4, default `#fff`) |
| `--fit <FIT>` | How to fit a non-square source (`cover` / `contain`; non-square sources are rejected if unset) |

Run it after `tauri ios init` / `tauri android init` to update the mobile icons.

## Generate an updater signing key

```sh
npm run tauri signer generate -- -w ~/.tauri/myapp.key
```

```sh
cargo tauri signer generate -w ~/.tauri/myapp.key
```

Set the public key in `tauri.conf.json`; it is used to verify artifacts. Options: `-p, --password <PASSWORD>` / `-w, --write-keys <WRITE_KEYS>` / `-f, --force` / `--ci`.

## Environment variables for signed builds

The official docs say `.env` files do not work.

```sh
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
# optionally also add a password
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

```powershell
$env:TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
<# optionally also add a password #>
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

After setting them, running `tauri build` produces the update bundle and its signature (requires the `createUpdaterArtifacts` setting).

## Sign a file manually

```sh
cargo tauri signer sign <FILE>
cargo tauri signer sign --private-key-path <PRIVATE_KEY_PATH> --app-version <APP_VERSION> <FILE>
```

Set the password beforehand in the `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` environment variable.

| Option | Description |
| --- | --- |
| `-k, --private-key <PRIVATE_KEY>` | Private key string (env `TAURI_SIGNING_PRIVATE_KEY`) |
| `-f, --private-key-path <PRIVATE_KEY_PATH>` | Private key file (env `TAURI_SIGNING_PRIVATE_KEY_PATH`) |
| `-p, --password <PASSWORD>` | Private key password (env `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`) |
| `--app-version <APP_VERSION>` | Bind the signature to the app version (for updaters configured with `requireSignedVersion`; `tauri build` sets it automatically, specify it when signing manually) |

## Notes

- The invocation form depends on how the CLI is installed (see the table in `dev-build.md`). npm needs `--` before extra flags.
- Passing `--password` / `-p` as an argument leaves it in shell history and the process list; pass it through the `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` environment variable instead.
- `Usage: pnpm-native run build ...` in the source `--help` output comes from the environment that generated the official docs; the actual form is `tauri ...`.
- For the requirements when creating icons manually (layer sizes in `icon.ico`, RGBA 32-bit PNGs, etc.), see `develop/icons.md` in references.
