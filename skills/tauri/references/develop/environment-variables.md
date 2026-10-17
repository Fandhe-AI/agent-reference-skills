---
source: https://v2.tauri.app/reference/environment-variables/
---

# Environment Variables

All environment variables used by the Tauri core crates and the Tauri CLI.

## Signature / Usage

```sh
TAURI_SIGNING_PRIVATE_KEY="<key or path>" TAURI_SIGNING_PRIVATE_KEY_PASSWORD="<password>" npm run tauri build
```

### Tauri CLI

Inputs to the CLI which may have an equivalent CLI flag. If both an environment variable and a CLI flag are used, the CLI flag has priority.

| Variable | Description |
| --- | --- |
| `CI` | If set, the CLI runs in CI mode and does not require any user interaction. |
| `TAURI_CLI_CONFIG_DEPTH` | Number of levels to traverse and find tauri configuration file. |
| `TAURI_CLI_PORT` | Port to use for the CLI built-in dev server. |
| `TAURI_CLI_WATCHER_IGNORE_FILENAME` | Name of a `.gitignore`-style file to control which files should be watched by the CLI in `dev` command. The CLI looks for this file name in each directory. |
| `TAURI_CLI_NO_DEV_SERVER_WAIT` | Skip waiting for the frontend dev server to start before building the tauri application. |
| `TAURI_LINUX_AYATANA_APPINDICATOR` | Set to `true` or `1` to force usage of `libayatana-appindicator` for system tray on Linux. |
| `TAURI_BUNDLER_WIX_FIPS_COMPLIANT` | Specify the bundler's WiX `FipsCompliant` option. |
| `TAURI_BUNDLER_TOOLS_GITHUB_MIRROR` | Specify a GitHub mirror to download files and tools used by tauri bundler. |
| `TAURI_BUNDLER_TOOLS_GITHUB_MIRROR_TEMPLATE` | Specify a GitHub mirror template to download files and tools used by tauri bundler, for example: `https://mirror.example.com/<owner>/<repo>/releases/download/<version>/<asset>`. |
| `TAURI_SKIP_SIDECAR_SIGNATURE_CHECK` | Skip signing sidecars. |
| `TAURI_SIGNING_PRIVATE_KEY` | Private key used to sign your app bundles, can be either a string or a path to the file. |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | The signing private key password, see `TAURI_SIGNING_PRIVATE_KEY`. |
| `TAURI_SIGNING_RPM_KEY` | The private GPG key used to sign the RPM bundle, exported to its ASCII-armored format. |
| `TAURI_SIGNING_RPM_KEY_PASSPHRASE` | The GPG key passphrase for `TAURI_SIGNING_RPM_KEY`, if needed. |
| `TAURI_WINDOWS_SIGNTOOL_PATH` | Specify a path to `signtool.exe` used for code signing the application on Windows. |
| `APPLE_CERTIFICATE` | Base64 encoded of the `.p12` certificate for code signing. To get this value, run `openssl base64 -A -in MyCertificate.p12 -out MyCertificate-base64.txt`. |
| `APPLE_CERTIFICATE_PASSWORD` | The password you used to export the certificate. |
| `APPLE_ID` | The Apple ID used to notarize the application. If provided, `APPLE_PASSWORD` and `APPLE_TEAM_ID` must also be set. Alternatively, `APPLE_API_KEY` and `APPLE_API_ISSUER` can be used to authenticate. |
| `APPLE_PASSWORD` | The Apple password used to authenticate for application notarization. Required if `APPLE_ID` is specified. An app-specific password can be used. Alternatively to entering the password in plaintext, it may be specified using a `@keychain:` or `@env:` prefix followed by a keychain password item name or environment variable name. |
| `APPLE_TEAM_ID` | Developer team ID. Find it on the Account page of the Apple Developer website, in the membership details. |
| `APPLE_API_KEY` | Alternative to `APPLE_ID` and `APPLE_PASSWORD` for notarization authentication using JWT. Also an option to allow automated iOS certificate and provisioning profile management. |
| `API_PRIVATE_KEYS_DIR` | Specify the directory where your AuthKey file is located. See `APPLE_API_KEY`. |
| `APPLE_API_ISSUER` | Issuer ID. Required if `APPLE_API_KEY` is specified. |
| `APPLE_API_KEY_PATH` | Path to the API key `.p8` file. If not specified, for macOS apps the bundler searches the following directories in sequence for a private key file named `AuthKey_<api_key>.p8`: `./private_keys`, `~/private_keys`, `~/.private_keys`, and `~/.appstoreconnect/private_keys`. For iOS this variable is required. |
| `APPLE_SIGNING_IDENTITY` | The identity used to code sign. Overwrites `tauri.conf.json > bundle > macOS > signingIdentity`. If neither are set, it is inferred from `APPLE_CERTIFICATE` when provided. |
| `APPLE_PROVIDER_SHORT_NAME` | If your Apple ID is connected to multiple teams, the provider short name of the team to notarize with. Overwrites `tauri.conf.json > bundle > macOS > providerShortName`. |
| `APPLE_DEVELOPMENT_TEAM` | The team ID used to code sign on iOS. Overwrites `tauri.conf.json > bundle > iOS > developmentTeam`. |
| `TAURI_WEBVIEW_AUTOMATION` | Enables webview automation (Linux only). |
| `TAURI_ANDROID_PROJECT_PATH` | Path of the tauri android project, usually `<project>/src-tauri/gen/android`. |
| `TAURI_IOS_PROJECT_PATH` | Path of the tauri iOS project, usually `<project>/src-tauri/gen/ios`. |

### Tauri CLI Hook Commands

Set for each hook command (`beforeDevCommand`, `beforeBuildCommand`, ...), useful to conditionally build the frontend or run a specific action.

| Variable | Description |
| --- | --- |
| `TAURI_ENV_DEBUG` | `true` for `dev` command or `build --debug`, `false` otherwise. |
| `TAURI_ENV_TARGET_TRIPLE` | Target triple the CLI is building. |
| `TAURI_ENV_ARCH` | Target arch, `x86_64`, `aarch64`, etc. |
| `TAURI_ENV_PLATFORM` | Target platform, `windows`, `darwin`, `linux`, etc. |
| `TAURI_ENV_PLATFORM_VERSION` | Build platform version. |
| `TAURI_ENV_FAMILY` | Target platform family `unix` or `windows`. |

## Notes

- `TAURI_DEV_HOST` (used for mobile development with a dev server) is described on the Develop overview page.

## Related

- [Develop](./overview.md)
- [Sidecar](./sidecar.md)
- [CLI overview](../cli/overview.md)
