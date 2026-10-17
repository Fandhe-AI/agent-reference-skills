---
source: https://v2.tauri.app/start/migrate/from-tauri-1/
---

# Upgrade from Tauri 1.0

Guide for upgrading a Tauri 1.0 application to Tauri 2.0: mobile-ready crate layout, the `migrate` CLI command, a summary of renamed/removed config keys, Cargo features, Rust and JavaScript APIs, and per-API migration steps.

## Signature / Usage

Preparing for mobile: the crate must output a shared library.

```toml
# src-tauri/Cargo.toml
[lib]
name = "app_lib"
crate-type = ["staticlib", "cdylib", "rlib"]
```

Rename `src-tauri/src/main.rs` to `src-tauri/src/lib.rs` and rename the `main` function:

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // your code here
}
```

The `tauri::mobile_entry_point` macro prepares your function to be executed on mobile. Recreate `main.rs`:

```rust
// src-tauri/src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  app_lib::run();
}
```

Automated migration (not a substitute for reading the whole guide):

```sh
npm install @tauri-apps/cli@latest
npm run tauri migrate
# or
cargo install tauri-cli --version "^2.0.0" --locked
cargo tauri migrate
```

### Summary of Changes

### Tauri Configuration

- `package > productName` and `package > version` moved to top-level object.
- the binary name is no longer renamed to match `productName` automatically, so you must add a `mainBinaryName` string to the top-level object matching `productName`.
- `package` removed.
- `tauri` key renamed to `app`.
- `tauri > allowlist` removed. Refer to Migrate Permissions below.
- `tauri > allowlist > protocol > assetScope` moved to `app > security > assetProtocol > scope`.
- `tauri > cli` moved to `plugins > cli`.
- `tauri > windows > fileDropEnabled` renamed to `app > windows > dragDropEnabled`.
- `tauri > updater > active` removed.
- `tauri > updater > dialog` removed.
- `tauri > updater` moved to `plugins > updater`.
- `bundle > createUpdaterArtifacts` added, must be set when using the app updater. Set it to `v1Compatible` when upgrading from v1 apps that were already distributed.
- `tauri > systemTray` renamed to `app > trayIcon`.
- `tauri > pattern` moved to `app > security > pattern`.
- `tauri > bundle` moved top-level.
- `tauri > bundle > identifier` moved to top-level object.
- `tauri > bundle > dmg` moved to `bundle > macOS > dmg`
- `tauri > bundle > deb` moved to `bundle > linux > deb`
- `tauri > bundle > appimage` moved to `bundle > linux > appimage`
- `tauri > bundle > macOS > license` removed, use `bundle > licenseFile` instead.
- `tauri > bundle > windows > wix > license` removed, use `bundle > licenseFile` instead.
- `tauri > bundle > windows > nsis > license` removed, use `bundle > licenseFile` instead.
- `tauri > bundle > windows > webviewFixedRuntimePath` removed, use `bundle > windows > webviewInstallMode` instead.
- `build > withGlobalTauri` moved to `app > withGlobalTauri`.
- `build > distDir` renamed to `frontendDist`.
- `build > devPath` renamed to `devUrl`.

### New Cargo Features

- linux-protocol-body: Enables custom protocol request body parsing, allowing the IPC to use it. Requires webkit2gtk 2.40.

### Removed Cargo Features

- reqwest-client: reqwest is now the only supported client.
- reqwest-native-tls-vendored: use `native-tls-vendored` instead.
- process-command-api: use the `shell` plugin instead.
- shell-open-api: use the `shell` plugin instead.
- windows7-compat: moved to the `notification` plugin.
- updater: Updater is now a plugin.
- linux-protocol-headers: Now enabled by default since the minimum webkit2gtk version was upgraded.
- system-tray: renamed to `tray-icon`.

### Rust Crate Changes

- `api` module removed. Each API module can be found in a Tauri plugin.
- `api::dialog` module removed. Use `tauri-plugin-dialog` instead.
- `api::file` module removed. Use Rust's `std::fs` instead.
- `api::http` module removed. Use `tauri-plugin-http` instead.
- `api::ipc` module rewritten and moved to `tauri::ipc`. Check out the new APIs, specially `tauri::ipc::Channel`.
- `api::path` module functions and `tauri::PathResolver` moved to `tauri::Manager::path`.
- `api::process::Command`, `tauri::api::shell` and `tauri::Manager::shell_scope` APIs removed. Use `tauri-plugin-shell` instead.
- `api::process::current_binary` and `tauri::api::process::restart` moved to `tauri::process`.
- `api::version` module has been removed. Use the semver crate instead.
- `App::clipboard_manager` and `AppHandle::clipboard_manager` removed. Use `tauri-plugin-clipboard-manager` instead.
- `App::get_cli_matches` removed. Use `tauri-plugin-cli` instead.
- `App::global_shortcut_manager` and `AppHandle::global_shortcut_manager` removed. Use `tauri-plugin-global-shortcut` instead.
- `Manager::fs_scope` removed. The file system scope can be accessed via `tauri_plugin_fs::FsExt`.
- `Plugin::PluginApi` now receives a plugin configuration as a second argument.
- `Plugin::setup_with_config` removed. Use the updated `tauri::Plugin::PluginApi` instead.
- `scope::ipc::RemoteDomainAccessScope::enable_tauri_api` / `enables_tauri_api` removed. Remote access is now granted through capabilities (`remote.urls`) plus permissions for each core plugin; see Migrate Permissions.
- `scope::IpcScope` removed; IPC access control is now handled by capabilities/permissions (ACL).
- `scope::FsScope`, `scope::GlobPattern` and `scope::FsScopeEvent` removed, use `scope::fs::Scope`, `scope::fs::Pattern` and `scope::fs::Event` respectively.
- `updater` module removed. Use `tauri-plugin-updater` instead.
- `Env.args` field has been removed, use `Env.args_os` field instead.
- `Menu`, `MenuEvent`, `CustomMenuItem`, `Submenu`, `WindowMenuEvent` and `MenuItem` APIs removed. See Migrate to Menu Module.
- `SystemTray`, `SystemTrayHandle`, `SystemTrayMenu`, `SystemTrayMenuItemHandle`, `SystemTraySubmenu`, `MenuEntry` and `SystemTrayMenuItem` APIs removed. See Migrate to Tray Icon Module.

### JavaScript API Changes

The `@tauri-apps/api` package no longer provides the non-core v1 modules (cli, clipboard, dialog, fs, global-shortcut, http, notification, os, process, shell, updater); they moved to plugins.

- `@tauri-apps/api/tauri` module renamed to `@tauri-apps/api/core`.
- `@tauri-apps/api/cli` module removed. Use `@tauri-apps/plugin-cli` instead.
- `@tauri-apps/api/clipboard` module removed. Use `@tauri-apps/plugin-clipboard-manager` instead.
- `@tauri-apps/api/dialog` module removed. Use `@tauri-apps/plugin-dialog` instead.
- `@tauri-apps/api/fs` module removed. Use `@tauri-apps/plugin-fs` instead.
- `@tauri-apps/api/global-shortcut` module removed. Use `@tauri-apps/plugin-global-shortcut` instead.
- `@tauri-apps/api/http` module removed. Use `@tauri-apps/plugin-http` instead.
- `@tauri-apps/api/os` module removed. Use `@tauri-apps/plugin-os` instead.
- `@tauri-apps/api/notification` module removed. Use `@tauri-apps/plugin-notification` instead.
- `@tauri-apps/api/process` module removed. Use `@tauri-apps/plugin-process` instead.
- `@tauri-apps/api/shell` module removed. Use `@tauri-apps/plugin-shell` instead.
- `@tauri-apps/api/updater` module removed. Use `@tauri-apps/plugin-updater` instead.
- The `WebviewWindow` class moved from `@tauri-apps/api/window` to `@tauri-apps/api/webviewWindow` (the `window` module still exists for the `Window` class).

The v1 plugins are now published as `@tauri-apps/plugin-<plugin-name>`. Previously they were available from git as `tauri-plugin-<plugin-name>-api`.

### Environment Variables Changes

Most of the environment variables read and written by the Tauri CLI were renamed for consistency and prevention of mistakes:

| v1 | v2 |
|----|----|
| `TAURI_PRIVATE_KEY` | `TAURI_SIGNING_PRIVATE_KEY` |
| `TAURI_KEY_PASSWORD` | `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` |
| `TAURI_SKIP_DEVSERVER_CHECK` | `TAURI_CLI_NO_DEV_SERVER_WAIT` |
| `TAURI_DEV_SERVER_PORT` | `TAURI_CLI_PORT` |
| `TAURI_PATH_DEPTH` | `TAURI_CLI_CONFIG_DEPTH` |
| `TAURI_FIPS_COMPLIANT` | `TAURI_BUNDLER_WIX_FIPS_COMPLIANT` |
| `TAURI_DEV_WATCHER_IGNORE_FILE` | `TAURI_CLI_WATCHER_IGNORE_FILENAME` |
| `TAURI_TRAY` | `TAURI_LINUX_AYATANA_APPINDICATOR` |
| `TAURI_APPLE_DEVELOPMENT_TEAM` | `APPLE_DEVELOPMENT_TEAM` |
| `TAURI_PLATFORM` | `TAURI_ENV_PLATFORM` |
| `TAURI_ARCH` | `TAURI_ENV_ARCH` |
| `TAURI_FAMILY` | `TAURI_ENV_FAMILY` |
| `TAURI_PLATFORM_VERSION` | `TAURI_ENV_PLATFORM_VERSION` |
| `TAURI_PLATFORM_TYPE` | `TAURI_ENV_PLATFORM_TYPE` |
| `TAURI_DEBUG` | `TAURI_ENV_DEBUG` |

### Event System

The event system was redesigned to rely on event targets instead of the source of the event.

- The `emit` function now emits the event to all event listeners.
- Added a new `emit_to`/`emitTo` function to trigger an event to a specific target.
- `emit_filter` now filters based on `EventTarget` instead of a window.
- Renamed `listen_global` to `listen_any`. It now listens to all events regardless of their filters and targets.
- JavaScript: `event.listen()` behaves similar to `listen_any`. It now listens to all events regardless of their filters and targets, unless a target is set in the `Options`.
- JavaScript: `WebviewWindow.listen` etc. only listen to events emitted to the respective `EventTarget`.

### Multiwebview support

Tauri v2 introduces multiwebview support currently behind an `unstable` feature flag. In order to support it, the Rust `Window` type was renamed to `WebviewWindow` and the Manager `get_window` function to `get_webview_window`. The `WebviewWindow` JS API type is now re-exported from `@tauri-apps/api/webviewWindow` instead of `@tauri-apps/api/window`.

### New origin URL on Windows

On Windows the frontend files in production apps are now hosted on `http://tauri.localhost` instead of `https://tauri.localhost`. Because of this IndexedDB, LocalStorage and Cookies will be reset unless `dangerousUseHttpScheme` was used in v1. To prevent this you can set `app > windows > useHttpsScheme` to `true` or use `WebviewWindowBuilder::use_https_scheme` to keep using the `https` scheme.

### Detailed Migration Steps

### Migrate to Core Module

```diff
- import { invoke } from "@tauri-apps/api/tauri"
+ import { invoke } from "@tauri-apps/api/core"
```

### Migrate to CLI Plugin

Rust `App::get_cli_matches` and JavaScript `@tauri-apps/api/cli` were removed.

```toml
# Cargo.toml
[dependencies]
tauri-plugin-cli = "2"
```

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_cli::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

```javascript
// npm: @tauri-apps/plugin-cli
import { getMatches } from '@tauri-apps/plugin-cli';
const matches = await getMatches();
```

Rust side:

```rust
fn main() {
    use tauri_plugin_cli::CliExt;
    tauri::Builder::default()
        .plugin(tauri_plugin_cli::init())
        .setup(|app| {
            let cli_matches = app.cli().matches()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Migrate to Clipboard Plugin

Rust `App::clipboard_manager` / `AppHandle::clipboard_manager` and JavaScript `@tauri-apps/api/clipboard` were removed. Use `@tauri-apps/plugin-clipboard-manager`:

```toml
[dependencies]
tauri-plugin-clipboard-manager = "2"
```

```javascript
import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';
await writeText('Tauri is awesome!');
console.assert((await readText()) === 'Tauri is awesome!');
```

Rust side:

```rust
use tauri_plugin_clipboard_manager::ClipboardExt;
tauri::Builder::default()
    .plugin(tauri_plugin_clipboard_manager::init())
    .setup(|app| {
        app.clipboard().write_text("Tauri is awesome!")?;
        Ok(())
    })
```

### Migrate to Dialog Plugin

Rust `tauri::api::dialog` and JavaScript `@tauri-apps/api/dialog` were removed. Use `@tauri-apps/plugin-dialog`:

```toml
[dependencies]
tauri-plugin-dialog = "2"
```

```javascript
import { save } from '@tauri-apps/plugin-dialog';
const filePath = await save({
  filters: [
    {
      name: 'Image',
      extensions: ['png', 'jpeg'],
    },
  ],
});
```

```rust
use tauri_plugin_dialog::DialogExt;
tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .setup(|app| {
        app.dialog().file().pick_file(|file_path| {
            // do something with the optional file path here
            // the file path is `None` if the user closed the dialog
        });

        app.dialog().message("Tauri is Awesome!").show(|_| {});
        Ok(())
     })
```

### Migrate to File System Plugin

Rust `tauri::api::file` and JavaScript `@tauri-apps/api/fs` were removed. Use `std::fs` for Rust and `@tauri-apps/plugin-fs` for JavaScript:

```toml
[dependencies]
tauri-plugin-fs = "2"
```

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

`package.json`:

```json
{
  "dependencies": {
    "@tauri-apps/plugin-fs": "^2.0.0"
  }
}
```

```javascript
import { mkdir, BaseDirectory } from '@tauri-apps/plugin-fs';
await mkdir('db', { baseDir: BaseDirectory.AppLocalData });
```

Calling `mkdir` requires fs permissions in a capability: `fs:allow-mkdir` plus a scope covering the target directory (for example `fs:scope-applocaldata-recursive`). See Migrate Permissions below.

Renamed or removed in the JavaScript API:

- `Dir` enum alias removed, use `BaseDirectory`.
- `FileEntry`, `FsBinaryFileOption`, `FsDirOptions`, `FsOptions`, `FsTextFileOption` and `BinaryFileContents` interfaces and type aliases have been removed and replaced with new interfaces suited for each function.
- `createDir` renamed to `mkdir`.
- `readBinaryFile` renamed to `readFile`.
- `removeDir` removed and replaced with `remove`.
- `removeFile` removed and replaced with `remove`.
- `renameFile` removed and replaced with `rename`.
- `writeBinaryFile` renamed to `writeFile`.

### Migrate to Global Shortcut Plugin

Rust `App::global_shortcut_manager` / `AppHandle::global_shortcut_manager` and JavaScript `@tauri-apps/api/global-shortcut` were removed. Use `@tauri-apps/plugin-global-shortcut`:

```toml
[dependencies]
[target."cfg(not(any(target_os = \"android\", target_os = \"ios\")))".dependencies]
tauri-plugin-global-shortcut = "2"
```

```javascript
import { register } from '@tauri-apps/plugin-global-shortcut';
await register('CommandOrControl+Shift+C', () => {
  console.log('Shortcut triggered');
});
```

```rust
use tauri_plugin_global_shortcut::GlobalShortcutExt;

tauri::Builder::default()
    .plugin(
        tauri_plugin_global_shortcut::Builder::new().with_handler(|_app, shortcut, _event| {
            println!("Shortcut triggered: {:?}", shortcut);
        })
        .build(),
    )
    .setup(|app| {
        // register a global shortcut
        // on macOS, the Cmd key is used
        // on Windows and Linux, the Ctrl key is used
        app.global_shortcut().register("CmdOrCtrl+Y")?;
        Ok(())
    })
```

### Migrate to HTTP Plugin

Rust `tauri::api::http` and JavaScript `@tauri-apps/api/http` were removed. Use `@tauri-apps/plugin-http`:

```toml
[dependencies]
tauri-plugin-http = "2"
```

```javascript
import { fetch } from '@tauri-apps/plugin-http';
const response = await fetch(
  'https://raw.githubusercontent.com/tauri-apps/tauri/dev/package.json'
);
```

```rust
use tauri_plugin_http::reqwest;

tauri::Builder::default()
    .plugin(tauri_plugin_http::init())
    .setup(|app| {
        let response_data = tauri::async_runtime::block_on(async {
            let response = reqwest::get(
                "https://raw.githubusercontent.com/tauri-apps/tauri/dev/package.json",
            )
            .await
            .unwrap();
            response.text().await
        })?;
        Ok(())
    })
```

The HTTP plugin re-exports reqwest.

### Migrate to Notification Plugin

Rust `tauri::api::notification` and JavaScript `@tauri-apps/api/notification` were removed. Use `@tauri-apps/plugin-notification`:

```toml
[dependencies]
tauri-plugin-notification = "2"
```

```javascript
import { sendNotification } from '@tauri-apps/plugin-notification';
sendNotification('Tauri is awesome!');
```

```rust
use tauri_plugin_notification::NotificationExt;
use tauri::plugin::PermissionState;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            if matches!(app.notification().permission_state()?, PermissionState::Prompt | PermissionState::PromptWithRationale) {
                app.notification().request_permission()?;
            }
            if app.notification().permission_state()? == PermissionState::Granted {
                app.notification()
                    .builder()
                    .body("Tauri is awesome!")
                    .show()?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Migrate to Menu Module

The Rust `Menu` APIs were moved to the `tauri::menu` module and refactored to use the muda crate.

Use `tauri::menu::MenuBuilder` instead of `tauri::Menu`. Its constructor takes a Manager instance (one of `App`, `AppHandle` or `WebviewWindow`):

```rust
use tauri::menu::MenuBuilder;

tauri::Builder::default()
    .setup(|app| {
        let menu = MenuBuilder::new(app)
            .copy()
            .paste()
            .separator()
            .undo()
            .redo()
            .text("open-url", "Open URL")
            .check("toggle", "Toggle")
            .icon("show-app", "Show App", app.default_window_icon().cloned().unwrap())
            .build()?;
        app.set_menu(menu)?;
        Ok(())
    })
```

Use `tauri::menu::PredefinedMenuItem` instead of `tauri::MenuItem`:

```rust
use tauri::menu::{MenuBuilder, PredefinedMenuItem};

tauri::Builder::default()
    .setup(|app| {
        let menu = MenuBuilder::new(app).item(&PredefinedMenuItem::copy(app, None)?).build()?;
        Ok(())
    })
```

The menu builder has dedicated methods to add each predefined menu item so you can call `.copy()` instead of `.item(&PredefinedMenuItem::copy(app, None)?)`.

Use `tauri::menu::MenuItemBuilder` instead of `tauri::CustomMenuItem`:

```rust
use tauri::menu::MenuItemBuilder;

tauri::Builder::default()
    .setup(|app| {
        let toggle = MenuItemBuilder::new("Toggle").accelerator("Ctrl+Shift+T").build(app)?;
        Ok(())
    })
```

Use `tauri::menu::SubmenuBuilder` instead of `tauri::Submenu`:

```rust
use tauri::menu::{MenuBuilder, SubmenuBuilder};

tauri::Builder::default()
    .setup(|app| {
        let submenu = SubmenuBuilder::new(app, "Sub")
            .text("tauri", "Tauri")
            .separator()
            .check("is-awesome", "Is Awesome")
            .build()?;
        let menu = MenuBuilder::new(app).item(&submenu).build()?;
        Ok(())
    })
```

`tauri::Builder::menu` now takes a closure because the menu needs a Manager instance to be built.

Menu events: register a handler with `tauri::Builder::on_menu_event` (desktop only, signature `Fn(&AppHandle<R>, MenuEvent)`), or with `tauri::App::on_menu_event` / `tauri::AppHandle::on_menu_event`:

```rust
use tauri::menu::{CheckMenuItemBuilder, MenuBuilder, MenuItemBuilder};

tauri::Builder::default()
    .setup(|app| {
        let toggle = MenuItemBuilder::with_id("toggle", "Toggle").build(app)?;
        let check = CheckMenuItemBuilder::new("Mark").build(app)?;
        let menu = MenuBuilder::new(app).items(&[&toggle, &check]).build()?;

        app.set_menu(menu)?;

        app.on_menu_event(move |app, event| {
            if event.id() == check.id() {
                println!("`check` triggered, do something! is checked? {}", check.is_checked().unwrap());
            } else if event.id() == "toggle" {
                println!("toggle triggered!");
            }
        });
        Ok(())
    })
```

There are two ways to check which menu item was selected: move the item to the event handler closure and compare IDs, or define a custom ID for the item through the `with_id` constructor and compare that ID string. Menu items can be shared across menus, and the menu event is bound to a menu item instead of a menu or window. If you don't want all listeners to be triggered when a menu item is selected, do not share menu items and use dedicated instances instead, which you can move into the `tauri::WebviewWindow/WebviewWindowBuilder::on_menu_event` closure.

### Migrate to OS Plugin

Rust `tauri::api::os` and JavaScript `@tauri-apps/api/os` were removed. Use `@tauri-apps/plugin-os`:

```toml
[dependencies]
tauri-plugin-os = "2"
```

```javascript
import { arch } from '@tauri-apps/plugin-os';
const architecture = await arch();
```

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .setup(|app| {
            let os_arch = tauri_plugin_os::arch();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Migrate to Process Plugin

Rust `tauri::api::process` and JavaScript `@tauri-apps/api/process` were removed. Use `@tauri-apps/plugin-process`:

```toml
[dependencies]
tauri-plugin-process = "2"
```

```javascript
import { exit, relaunch } from '@tauri-apps/plugin-process';
await exit(0);
await relaunch();
```

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .setup(|app| {
            // exit the app with a status code
            app.handle().exit(1);
            // restart the app
            app.handle().restart();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Migrate to Shell Plugin

Rust `tauri::api::shell` and JavaScript `@tauri-apps/api/shell` were removed. Use `@tauri-apps/plugin-shell`:

```toml
[dependencies]
tauri-plugin-shell = "2"
```

```javascript
import { Command, open } from '@tauri-apps/plugin-shell';
const output = await Command.create('echo', 'message').execute();

await open('https://github.com/tauri-apps/tauri');
```

Rust: open a URL.

```rust
use tauri_plugin_shell::ShellExt;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            app.shell().open("https://github.com/tauri-apps/tauri", None)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Rust: spawn a child process and capture its output.

```rust
use tauri_plugin_shell::ShellExt;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let output = tauri::async_runtime::block_on(async move { app.shell().command("echo").args(["TAURI"]).output().await.unwrap() });
            assert!(output.status.success());
            assert_eq!(String::from_utf8(output.stdout).unwrap().trim_end(), "TAURI");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Rust: spawn a child process and retrieve the status code.

```rust
use tauri_plugin_shell::ShellExt;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let status = tauri::async_runtime::block_on(async move { app.shell().command("which").args(["ls"]).status().await.unwrap() });
            println!("`which` finished with status: {:?}", status.code());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Rust: spawn a child process and read its events asynchronously.

```rust
use tauri_plugin_shell::{ShellExt, process::CommandEvent};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let (mut rx, mut child) = handle.shell().command("cargo")
                    .args(["tauri", "dev"])
                    .spawn()
                    .expect("Failed to spawn cargo");

                let mut i = 0;
                while let Some(event) = rx.recv().await {
                    if let CommandEvent::Stdout(line) = event {
                        println!("got: {}", String::from_utf8(line).unwrap());
                       i += 1;
                       if i == 4 {
                           child.write("message from Rust\n".as_bytes()).unwrap();
                           i = 0;
                       }
                   }
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Migrate to Tray Icon Module

The Rust `SystemTray` APIs were renamed to `TrayIcon`. The new APIs are in the Rust `tray` module. Use `tauri::tray::TrayIconBuilder` instead of `tauri::SystemTray`:

```rust
let tray = tauri::tray::TrayIconBuilder::with_id("my-tray").build(app)?;
```

Use `tauri::menu::Menu` instead of `tauri::SystemTrayMenu`, `tauri::menu::Submenu` instead of `tauri::SystemTraySubmenu` and `tauri::menu::PredefinedMenuItem` instead of `tauri::SystemTrayMenuItem`.

`tauri::SystemTray::on_event` has been split into `tauri::tray::TrayIconBuilder::on_menu_event` and `tauri::tray::TrayIconBuilder::on_tray_icon_event`:

```rust
use tauri::{
    menu::{MenuBuilder, MenuItemBuilder},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};

tauri::Builder::default()
    .setup(|app| {
        let toggle = MenuItemBuilder::with_id("toggle", "Toggle").build(app)?;
        let menu = MenuBuilder::new(app).items(&[&toggle]).build()?;
        let tray = TrayIconBuilder::new()
            .menu(&menu)
            .on_menu_event(move |app, event| match event.id().as_ref() {
                "toggle" => {
                    println!("toggle clicked");
                }
                _ => (),
            })
            .on_tray_icon_event(|tray, event| {
                if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                } = event
                {
                    let app = tray.app_handle();
                    if let Some(webview_window) = app.get_webview_window("main") {
                       let _ = webview_window.unminimize();
                       let _ = webview_window.show();
                       let _ = webview_window.set_focus();
                    }
                }
            })
            .build(app)?;

        Ok(())
    })
```

### Migrate to Updater Plugin

Change of default behavior: the built-in dialog with an automatic update check was removed. Use the Rust and JS APIs to check for and install updates instead; failing to do so will prevent your users from getting further updates.

```toml
[dependencies]
tauri-plugin-updater = "2"
```

```javascript
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

const update = await check();
if (update) {
  console.log(`Update to ${update.version} available! Date: ${update.date}`);
  console.log(`Release notes: ${update.body}`);
  await update.downloadAndInstall();
  // requires the `process` plugin
  await relaunch();
}
```

Rust: check for updates.

```rust
use tauri_plugin_updater::UpdaterExt;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let response = handle.updater().expect("failed to build updater").check().await;
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Rust: set a custom updater target.

```rust
fn main() {
    let mut updater = tauri_plugin_updater::Builder::new();
    #[cfg(target_os = "macos")]
    {
        updater = updater.target("darwin-universal");
    }
    tauri::Builder::default()
        .plugin(updater.build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Migrate Path to Tauri Manager

The Rust `tauri::api::path` module functions and `tauri::PathResolver` have been moved to `tauri::Manager::path`:

```rust
use tauri::{path::BaseDirectory, Manager};

tauri::Builder::default()
    .setup(|app| {
        let home_dir_path = app.path().home_dir().expect("failed to get home dir");

        let path = app.path().resolve("path/to/something", BaseDirectory::Config)?;

        Ok(())
  })
```

### Migrate to new Window API

On the Rust side, `Window` was renamed to `WebviewWindow`, its builder `WindowBuilder` is now named `WebviewWindowBuilder` and `WindowUrl` is now named `WebviewUrl`. Additionally, `Manager::get_window` was renamed to `get_webview_window` and the window's `parent_window` API was renamed to `parent_raw` to support a high level window parent API.

On the JavaScript side, the `WebviewWindow` class is now exported in the `@tauri-apps/api/webviewWindow` path. The `onMenuClicked` function was removed; intercept menu events when creating a menu in JavaScript instead.

### Migrate Embedded Additional Files (Resources)

On the JavaScript side, migrate to the File System plugin. On the Rust side, use Migrate Path to Tauri Manager. Note the changes made to the v1 allowlist in Migrate Permissions.

### Migrate Embedded External Binaries (Sidecar)

In Tauri v1, the external binaries and their arguments were defined in the allowlist. In v2, use the new permissions system. On the JavaScript side, migrate to the Shell plugin. On the Rust side, the `tauri::api::process` API has been removed; use `tauri_plugin_shell::ShellExt` and `tauri_plugin_shell::process::CommandEvent` instead. The "process-command-api" feature flag has been removed in v2, so running external binaries no longer requires this feature to be defined in the Tauri config.

### Migrate Permissions

The v1 allowlist was rewritten into a new permissions system that works for individual plugins and is much more configurable for multiwindow and remote URL support. It works like an access control list (ACL) where you can allow or deny commands, allocate permissions to a specific set of windows and domains, and define access scopes.

To enable permissions for your app, create capability files inside the `src-tauri/capabilities` folder, and Tauri will automatically configure everything else. The `migrate` CLI command automatically parses your v1 allowlist and generates the associated capability file.

## Notes

- The source compares against `PermissionState::Unknown`, which was renamed to `Prompt` (tauri CHANGELOG, #10978); at tauri 2.12.4 the variants are Granted / Denied / Prompt / PromptWithRationale (Android only), so the example matches Prompt | PromptWithRationale.
- Upstream says `Builder::on_menu_event` was removed, but it exists in tauri 2.12.4 (`Builder::on_menu_event`, desktop only); the text was corrected.
- The shell `echo` example compares `stdout.trim_end()` because `echo` appends a trailing newline; the source compares the raw output and would panic.
- The source says to use `scope::ipc::RemoteDomainAccessScope::add_plugin` / `scope::ipc::Scope`, but these were removed in the v2 ACL rework; rewritten to point at capabilities (`remote.urls`) and permissions.
- Tauri capabilities / permissions (ACL) here are Tauri's own access-control system, unrelated to Claude Code permissions (anthropic-claude-code-admin) or MCP capabilities (mcp-spec).
- Tauri (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- The source calls `.show()` without the required callback; `show(|_| {})` is used because `blocking_show()` must not run on the main thread, where `setup` executes (tauri-plugin-dialog docs).
- The source's `assert(await readText(), '...')` uses an undefined global in the webview and does not compare values; replaced with `console.assert(... === ...)`.
- The source summary says only core/path/event/window are exported and that `window` was renamed to `webviewWindow`; at `@tauri-apps/api` 2.12.4 `packages/api/src/index.ts` also exports app, dpi, image, menu, mocks, tray, webview and webviewWindow, only the `WebviewWindow` class moved, and `window` remains.
- The source summary misspells `api::ipc` as `api::ip` and `PathResolver` as `PathResolved`; corrected.
- The fs permission sentence (`fs:allow-mkdir`, `fs:scope-applocaldata-recursive`) is not in the source; identifiers taken from the fs plugin 2.7.1 permission reference.
- The `// package.json` file-name comment is moved out of the JSON block so it stays valid JSON.
- Snippets adjusted from the source to compile on v2: dialog `show(|_| {})`, `set_menu(menu)?`, cloned `AppHandle` in updater, `Manager` import in tray.
- Plugin snippets in the source page register the plugin in Rust and add the npm package.
- Differs from the source so the snippets compile on v2: the clipboard example uses `tauri_plugin_clipboard_manager::ClipboardExt` / `write_text` (the source shows a nonexistent `tauri_plugin_clipboard` / `ClipKind` API), `SubmenuBuilder::text` / `check` take `(id, text)`, `fn main()` examples end with `.run(tauri::generate_context!())`, and `updater()` (which returns a `Result`) is unwrapped before `check()`.
- Also differs from the source: the summary lines name `tauri-plugin-clipboard-manager` / `@tauri-apps/plugin-clipboard-manager` (the source summary says `tauri-plugin-clipboard` / `@tauri-apps/plugin-clipboard`, contradicting its own detailed section); `PredefinedMenuItem::copy` takes `(app, None)`; `global_shortcut::Builder::with_handler` takes `(app, shortcut, event)`.
- The source checks `update?.available`; `Update.available` is deprecated and always `true` (updater 2.14.0), so the example checks `check()`'s return value for `null` instead.

## Related

- [Migrate from Tauri 2.0 Beta](./migrate-from-tauri-2-beta.md)
- [Updating Dependencies](./updating-dependencies.md)
- [Project Structure](./project-structure.md)
