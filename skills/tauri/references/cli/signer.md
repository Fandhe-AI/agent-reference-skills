---
source: https://v2.tauri.app/reference/cli/#signer
---

# tauri signer

Generate signing keys for Tauri updater or sign files: `sign`, `generate`.

## Signature / Usage

```sh
npm run tauri signer <subcommand>
cargo tauri signer <subcommand>
```

```text
Generate signing keys for Tauri updater or sign files

Usage: tauri signer [OPTIONS] <COMMAND>

Commands:
  sign      Sign a file
  generate  Generate a new signing key to sign files
  help      Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## signer sign

Sign a file

```text
Usage: tauri signer sign [OPTIONS] <FILE>

Arguments:
  <FILE>
          Sign the specified file

Options:
  -k, --private-key <PRIVATE_KEY>
          Load the private key from a string

          [env: TAURI_SIGNING_PRIVATE_KEY=]
  -v, --verbose...
          Enables verbose logging
  -f, --private-key-path <PRIVATE_KEY_PATH>
          Load the private key from a file

          [env: TAURI_SIGNING_PRIVATE_KEY_PATH=]
  -p, --password <PASSWORD>
          Set private key password when signing

          [env: TAURI_SIGNING_PRIVATE_KEY_PASSWORD=]
      --app-version <APP_VERSION>
          Bind the signature to this app version.

          The version is embedded in the signature's trusted comment, which is covered by the signature itself. Updaters configured with `requireSignedVersion` reject an update whose manifest announces a different version than the one signed here, which prevents a tampered manifest from pairing a new version number with an older release.

          `tauri build` sets this automatically; pass it when signing updater artifacts by hand.
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `<FILE>` | — | Sign the specified file |
| `-k, --private-key` | `<PRIVATE_KEY>`, env `TAURI_SIGNING_PRIVATE_KEY` | Load the private key from a string |
| `-f, --private-key-path` | `<PRIVATE_KEY_PATH>`, env `TAURI_SIGNING_PRIVATE_KEY_PATH` | Load the private key from a file |
| `-p, --password` | `<PASSWORD>`, env `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | Set private key password when signing |
| `--app-version` | `<APP_VERSION>` | Bind the signature to this app version (embedded in the signed trusted comment) |

## signer generate

Generate a new signing key to sign files

```text
Usage: tauri signer generate [OPTIONS]

Options:
  -p, --password <PASSWORD>      Set private key password when signing
  -v, --verbose...               Enables verbose logging
  -w, --write-keys <WRITE_KEYS>  Write private key to a file
  -f, --force                    Overwrite private key even if it exists on the specified path
      --ci                       Skip prompting for values [env: CI=true]
  -h, --help                     Print help
  -V, --version                  Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `-p, --password` | `<PASSWORD>` | Set private key password when signing |
| `-w, --write-keys` | `<WRITE_KEYS>` | Write private key to a file |
| `-f, --force` | — | Overwrite private key even if it exists on the specified path |
| `--ci` | env `CI=true` | Skip prompting for values |

## Notes

- Usage lines normalized from `pnpm-native run build signer ...`; see overview for details.
- `--app-version` is relevant for updaters configured with `requireSignedVersion`; `tauri build` sets it automatically.
- Updater signing keys (Tauri updater). OS code signing / notarization are separate topics; Apple and Windows platform procedures belong to apple-distribution and windows-packaging-publish.

## Related

- [build](./build.md)
- [overview](./overview.md)
