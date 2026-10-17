---
source: https://v2.tauri.app/plugin/
---

# Features & Recipes (plugin index)

Tauri comes with extensibility in mind. This page lists the official plugins (built-in features), points to community resources, and holds the platform support table.

## Signature / Usage

Every official plugin follows the same install pattern (set `PLUGIN` to the plugin name):

```sh
PLUGIN="fs"  # replace with the plugin name

# automatic
npm run tauri add "${PLUGIN}"
cargo tauri add "${PLUGIN}"

# manual: Rust side (run in src-tauri)
cargo add "tauri-plugin-${PLUGIN}"
# manual: JavaScript guest bindings (run in the project root)
npm install "@tauri-apps/plugin-${PLUGIN}"
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

## Official Features

| Feature | Description | Path |
| --- | --- | --- |
| Autostart | Automatically launch your app at system startup. | `../plugins-app/autostart.md` |
| Barcode Scanner | Allows your mobile application to use the camera to scan QR codes, EAN-13 and other types of barcodes. | `../plugins-app/barcode-scanner.md` |
| Biometric | Prompt the user for biometric authentication on Android and iOS. | `../plugins-app/biometric.md` |
| Clipboard | Read and write to the system clipboard. | `../plugins-app/clipboard.md` |
| Command Line Interface (CLI) | Parse arguments from the command line interface. | [cli.md](./cli.md) |
| Deep Linking | Set your Tauri application as the default handler for an URL. | `../plugins-app/deep-linking.md` |
| Dialog | Native system dialogs for opening and saving files along with message dialogs. | `../plugins-app/dialog.md` |
| File System | Access the file system. | [file-system.md](./file-system.md) |
| Geolocation | Get and track the device's current position, including information about altitude, heading, and speed (if available). | `../plugins-app/geolocation.md` |
| Global Shortcut | Register global shortcuts. | `../plugins-app/global-shortcut.md` |
| Haptics | Haptic feedback and vibrations on Android and iOS | `../plugins-app/haptics.md` |
| HTTP Client | Access the HTTP client written in Rust. | [http-client.md](./http-client.md) |
| Localhost | Use a localhost server in production apps. | [localhost.md](./localhost.md) |
| Logging | Configurable logging. | [logging.md](./logging.md) |
| NFC | Read and write NFC tags on Android and iOS. | `../plugins-app/nfc.md` |
| Notifications | Send native notifications to the user. | `../plugins-app/notification.md` |
| Opener | Open files and URLs in external applications. | [opener.md](./opener.md) |
| OS Information | Read information about the operating system. | [os-info.md](./os-info.md) |
| Persisted Scope | Persist runtime scope changes on the filesystem. | [persisted-scope.md](./persisted-scope.md) |
| Positioner | Move windows to common locations. | `../plugins-app/positioner.md` |
| Process | Access the current process. | [process.md](./process.md) |
| Shell | Access the system shell to spawn child processes. | [shell.md](./shell.md) |
| Single Instance | Ensure that a single instance of your Tauri app is running at a time. | `../plugins-app/single-instance.md` |
| SQL | Tauri Plugin providing an interface for the frontend to communicate with SQL databases through sqlx. | [sql.md](./sql.md) |
| Store | Persistent key value storage. | [store.md](./store.md) |
| Stronghold | Encrypted, secure database. | [stronghold.md](./stronghold.md) |
| Updater | In-app updates for Tauri applications. | `../plugins-app/updater.md` |
| Upload | File uploads through HTTP. | [upload.md](./upload.md) |
| Websocket | Open a WebSocket connection using a Rust client in JavaScript. | [websocket.md](./websocket.md) |
| Window State | Persist window sizes and positions. | `../plugins-app/window-state.md` |

## Community Resources

The page also lists community plugins (for example `sentry-tauri`, `tauri-awesome-rpc`, `tauri-nspanel`, `tauri-nspopover-plugin`) and integrations. You can contribute your own on Awesome Tauri (https://github.com/tauri-apps/awesome-tauri). Community content is not covered by this skill.

## Support Table

Platform support for the plugins documented in this category (derived from `[package.metadata.platforms.support]` in each plugin's `Cargo.toml`; all pinned tags use workspace `rust-version` 1.90):

| Plugin | Windows | Linux | macOS | Android | iOS |
| --- | --- | --- | --- | --- | --- |
| cli | full | full | full | none | none |
| fs | full* | full* | full* | partial* | partial* |
| http | full | full | full | full | full |
| localhost | full | full | full | none | none |
| log | full | full | full | full | full |
| opener | full | full | full | partial* | partial* |
| os | full | full | full | full | full |
| persisted-scope | full | full | full | full | full |
| process | full | full | full | none | none |
| shell | full | full | full | partial* | partial* |
| sql | full | full | full | full | full |
| store | full | full | full | full | full |
| stronghold | full | full | full | full | full |
| upload | full | full | full | full | full |
| websocket | full | full | full | full | full |

## Notes

- `*` marks entries with a note: fs on Windows "Apps installed via MSI or NSIS in `perMachine` and `both` mode require admin permissions for write access in `$RESOURCES` folder"; fs on Linux / macOS "No write access to `$RESOURCES` folder"; fs on Android / iOS "Access is restricted to Application folder by default"; opener and shell on Android / iOS "Only allows to open URLs via `open`".
- Support levels in the official table are `Full support`, `Partial support` and `No support`.
- Support rows for the app / mobile plugins are in the `plugins-app` category pages.
- Pins: docs `tauri-apps/tauri-docs` branch `v2` at `32f68c5`; plugin data from plugins-workspace per-plugin v2 tags (`fs-v2.7.1`, `http-v2.8.3`, `websocket-v2.5.0`, `upload-v2.5.0`, `sql-v2.6.0`, `store-v2.5.0`, `stronghold-v2.4.0`, `persisted-scope-v2.4.2`, `localhost-v2.4.0`, `shell-v2.5.0`, `opener-v2.7.2`, `process-v2.4.0`, `os-v2.4.0`, `log-v2.10.1`, `cli-v2.5.0`).

## Related

- [file-system.md](./file-system.md)
- [sql.md](./sql.md)
- [logging.md](./logging.md)
