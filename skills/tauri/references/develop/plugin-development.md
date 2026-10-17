---
source: https://v2.tauri.app/develop/plugins/
---

# Plugin Development

Guide for developing Tauri plugins. Plugins hook into the Tauri lifecycle, expose Rust code that relies on the web view APIs, and handle commands with Rust, Kotlin or Swift code. A plugin is a Cargo crate plus an optional NPM package for API bindings; it may also include an Android library project and a Swift package for iOS.

## Signature / Usage

Bootstrap a plugin project:

```sh
npx @tauri-apps/cli plugin new [name]
```

Use `--no-api` to skip the NPM package; `--android` and/or `--ios` to initialize with mobile support. The plugin is created at `tauri-plugin-[name]`:

```
. tauri-plugin-[name]/
├── src/                - Rust code
│ ├── commands.rs       - Defines the commands the webview can use
| ├── desktop.rs        - Desktop implementation
| ├── error.rs          - Default error type to use in returned results
│ ├── lib.rs            - Re-exports appropriate implementation, setup state...
│ ├── mobile.rs         - Mobile implementation
│ └── models.rs         - Shared structs
├── permissions/        - This will host (generated) permission files for commands
├── android             - Android library
├── ios                 - Swift package
├── guest-js            - Source code of the JavaScript API bindings
├── dist-js             - Transpiled assets from guest-js
├── Cargo.toml          - Cargo crate metadata
└── package.json        - NPM package metadata
```

To add Android or iOS capabilities to an existing plugin, use `plugin android init` and `plugin ios init` to bootstrap the mobile library projects.

### Naming convention

By default the plugin crate is prefixed `tauri-plugin-`; the name is specified under `tauri.conf.json > plugins`. The generated crate name is `tauri-plugin-{plugin-name}` and the JavaScript NPM package name `tauri-plugin-{plugin-name}-api` (an NPM scope is recommended; the Tauri convention is `@scope-name/plugin-{plugin-name}`).

#### Identifier rules

The `{plugin-name}` portion of a plugin crate, and any permission identifier referenced within capabilities, must:

- use lowercase ASCII letters (`a`-`z`), digits (`0`-`9`) and hyphens (`-`);
- not have a hyphen as the first or last character;
- use a single colon (`:`) only with a prefix (e.g. `<plugin-name>:<permission-name>`);
- not contain underscores, uppercase letters or other characters;
- be at most 64 characters as a base name; with a prefix the full identifier is limited to 129 characters.

| Identifier | Valid? |
| --- | --- |
| `sqlite` | valid |
| `sqlite-store` | valid |
| `sqlite-store:allow-read` | valid |
| `sqlite_store` | invalid (underscore) |
| `SqliteStore` | invalid (uppercase) |
| `-sqlite` | invalid (leading hyphen) |
| `sqlite-` | invalid (trailing hyphen) |
| `sqlite::store` | invalid (multiple separators) |

A violation fails the build with `identifiers can only include lowercase ASCII, hyphens which are not leading or trailing, and a single colon if using a prefix`. The offending value is usually the plugin name in the plugin's `Cargo.toml` or a permission identifier in a `permissions/*.toml` file.

### Declaring platform support

In the `[package.metadata.platforms.support]` section of the crate's `Cargo.toml`:

```toml
[package.metadata.platforms.support]
windows = { level = "full" }
linux = { level = "full" }
macos = { level = "full" }
android = { level = "partial", notes = "Access is restricted to the Application folder by default" }
ios = { level = "none" }
```

| Field | Description |
| --- | --- |
| `level` (required) | `"full"` works as intended, `"partial"` works with limitations, `"none"` platform not supported. |
| `notes` (optional) | Short description of caveats; rendered as Markdown on the plugin's page and as plain text in the support table tooltip. |

Keys are `windows`, `linux`, `macos`, `android`, `ios`. The support table and platform filter on the Features & Recipes page are generated from this metadata.

### Plugin configuration

In the app, the configuration is set in `tauri.conf.json` under `plugins.<plugin-name>`:

```json
{
  "build": { ... },
  "app": { ... },
  "plugins": {
    "plugin-name": {
      "timeout": 30
    }
  }
}
```

The configuration is set on the `Builder` and parsed at runtime:

`src/lib.rs`

```rust
use serde::Deserialize;
use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

// Define the plugin config
#[derive(Deserialize)]
pub struct Config {
  timeout: usize,
}

pub fn init<R: Runtime>() -> TauriPlugin<R, Config> {
  // Make the plugin config optional
  // by using `Builder::<R, Option<Config>>` instead
  Builder::<R, Config>::new("<plugin-name>")
    .setup(|app, api| {
      let timeout = api.config().timeout;
      Ok(())
    })
    .build()
}
```

### Lifecycle events

- `setup`: plugin is being initialized
- `on_navigation`: web view is attempting to perform navigation
- `on_webview_ready`: new window is being created
- `on_event`: event loop events
- `on_drop`: plugin is being deconstructed

Mobile plugins have additional lifecycle events (see Mobile Plugin Development).

#### setup

When: plugin is being initialized. Why: register mobile plugins, manage state, run background tasks.

```rust
use tauri::{Manager, plugin::Builder};
use std::{collections::HashMap, sync::Mutex, time::Duration};

struct DummyStore(Mutex<HashMap<String, String>>);

Builder::new("<plugin-name>")
  .setup(|app, api| {
    app.manage(DummyStore(Default::default()));

    let app_ = app.clone();
    std::thread::spawn(move || {
      loop {
        app_.emit("tick", ());
        std::thread::sleep(Duration::from_secs(1));
      }
    });

    Ok(())
  })
```

#### on_navigation

When: web view is attempting to perform navigation. Why: validate the navigation or track URL changes. Returning `false` cancels the navigation.

```rust
use tauri::plugin::Builder;

Builder::new("<plugin-name>")
  .on_navigation(|window, url| {
    println!("window {} is navigating to {}", window.label(), url);
    // Cancels the navigation if forbidden
    url.scheme() != "forbidden"
  })
```

#### on_webview_ready

When: new window has been created. Why: execute an initialization script for every window.

```rust
use tauri::plugin::Builder;

Builder::new("<plugin-name>")
  .on_webview_ready(|window| {
    window.listen("content-loaded", |event| {
      println!("webview content has been loaded");
    });
  })
```

#### on_event

When: event loop events. Why: handle core events such as window events, menu events and application exit requested (any `RunEvent`).

```rust
use std::{collections::HashMap, fs::write, sync::Mutex};
use tauri::{plugin::Builder, Manager, RunEvent};

struct DummyStore(Mutex<HashMap<String, String>>);

Builder::new("<plugin-name>")
  .setup(|app, _api| {
    app.manage(DummyStore(Default::default()));
    Ok(())
  })
  .on_event(|app, event| {
    match event {
      RunEvent::ExitRequested { api, .. } => {
        // user requested a window to be closed and there's no windows left

        // we can prevent the app from exiting:
        api.prevent_exit();
      }
      RunEvent::Exit => {
        // app is going to exit, you can cleanup here

        let store = app.state::<DummyStore>();
        write(
          app.path().app_local_data_dir().unwrap().join("store.json"),
          serde_json::to_string(&*store.0.lock().unwrap()).unwrap(),
        )
        .unwrap();
      }
      _ => {}
    }
  })
```

#### on_drop

When: plugin is being deconstructed. Why: execute code when the plugin has been destroyed (see `Drop`).

```rust
use tauri::plugin::Builder;

Builder::new("<plugin-name>")
  .on_drop(|app| {
    // plugin has been destroyed...
  })
```

### Exposing Rust APIs

The APIs defined in `desktop.rs` and `mobile.rs` are exported as a struct with the same name as the plugin (pascal case). On setup an instance is created and managed as state, so users can retrieve it from a `Manager` (`AppHandle`, `App`, `Window`) through the extension trait defined in the plugin. E.g. the global-shortcut plugin defines `GlobalShortcut`, read via the `global_shortcut` method of `GlobalShortcutExt`:

`src-tauri/src/lib.rs`

```rust
use tauri_plugin_global_shortcut::GlobalShortcutExt;

tauri::Builder::default()
  .plugin(tauri_plugin_global_shortcut::init())
  .setup(|app| {
    app.global_shortcut().register(...);
    Ok(())
  })
```

### Adding commands

Commands live in `commands.rs` and are regular Tauri application commands (access to `AppHandle`, `Window`, state, input like app commands). This one takes `on_progress` and `url`:

`src/commands.rs`

```rust
use tauri::{command, ipc::Channel, AppHandle, Runtime, Window};

#[command]
pub async fn upload<R: Runtime>(app: AppHandle<R>, window: Window<R>, on_progress: Channel, url: String) {
  // implement command logic here
  on_progress.send(100).unwrap();
}
```

Expose the command through `invoke_handler()` in `lib.rs`:

```rust
Builder::new("<plugin-name>")
    .invoke_handler(tauri::generate_handler![commands::upload])
```

Define a binding in `webview-src/index.ts` (build the TypeScript before testing):

```js
import { invoke, Channel } from '@tauri-apps/api/core'

export async function upload(url: string, onProgressHandler: (progress: number) => void): Promise<void> {
  const onProgress = new Channel<number>()
  onProgress.onmessage = onProgressHandler
  await invoke('plugin:<plugin-name>|upload', { url, onProgress })
}
```

#### Command permissions

By default plugin commands are not accessible by the frontend (a denied error rejection). Define permissions that allow each command.

Permissions are JSON or TOML files inside `permissions/`; each file can define permissions, permission sets and the default permission.

Permission (allow / deny commands, associate command-specific and global scopes):

`permissions/start-server.toml`

```toml
"$schema" = "schemas/schema.json"

[[permission]]
identifier = "allow-start-server"
description = "Enables the start_server command."
commands.allow = ["start_server"]

[[permission]]
identifier = "deny-start-server"
description = "Denies the start_server command."
commands.deny = ["start_server"]
```

Scope struct (holds scope data, here for binaries a `shell` plugin may spawn):

`src/scope.rs`

```rust
#[derive(Debug, serde::Deserialize, schemars::JsonSchema)]
pub struct Entry {
    pub binary: String,
}
```

Command scope (consumer defines it per command in the capability file); read with `tauri::ipc::CommandScope`:

`src/commands.rs`

```rust
use tauri::ipc::CommandScope;
use crate::scope::Entry;

async fn spawn<R: tauri::Runtime>(app: tauri::AppHandle<R>, command_scope: CommandScope<'_, Entry>) -> Result<()> {
  let allowed = command_scope.allows();
  let denied = command_scope.denies();
  todo!()
}
```

Global scope: a permission that defines no commands to allow or deny is a scope permission and should only define a global scope:

`permissions/spawn-node.toml`

```toml
[[permission]]
identifier = "allow-spawn-node"
description = "This scope permits spawning the `node` binary."

[[permission.scope.allow]]
binary = "node"
```

Read with `tauri::ipc::GlobalScope`:

```rust
use tauri::ipc::GlobalScope;
use crate::scope::Entry;

async fn spawn<R: tauri::Runtime>(app: tauri::AppHandle<R>, scope: GlobalScope<'_, Entry>) -> Result<()> {
  let allowed = scope.allows();
  let denied = scope.denies();
  todo!()
}
```

Checking both global and command scopes is recommended for flexibility.

Scope schema: the scope entry requires `schemars` to generate a JSON schema (so consumers know the format and get IDE autocomplete). Add it to both dependencies and build-dependencies because `scope.rs` is shared between app code and the build script:

```toml
[dependencies]
schemars = "0.8"

[build-dependencies]
schemars = "0.8"
```

`build.rs`

```rust
#[path = "src/scope.rs"]
mod scope;

const COMMANDS: &[&str] = &[];

fn main() {
    tauri_plugin::Builder::new(COMMANDS)
        .global_scope_schema(schemars::schema_for!(scope::Entry))
        .build();
}
```

Permission sets group individual permissions:

`permissions/websocket.toml`

```toml
"$schema" = "schemas/schema.json"
[[set]]
identifier = "allow-websocket"
description = "Allows connecting and sending messages through a WebSocket"
permissions = ["allow-connect", "allow-send"]
```

The default permission is a special permission set with identifier `default`; enabling required commands by default is recommended (e.g. `http` is useless without `request`):

`permissions/default.toml`

```toml
"$schema" = "schemas/schema.json"
[default]
description = "Allows making HTTP requests"
permissions = ["allow-request"]
```

#### Autogenerated permissions

In `build.rs`, list the commands in snake_case (matching the command function names) in the `COMMANDS` const; Tauri generates `allow-$commandname` and `deny-$commandname` permissions. This generates `allow-upload` and `deny-upload`:

```rust
const COMMANDS: &[&str] = &["upload"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
```

### Managing state

A plugin manages state the same way an application does (see State Management).

## Notes

- Tauri (Rust core + system WebView). A Tauri plugin is not an Electron extension or preload script; see the electron skill for Electron.
- Upstream Plugins page says `plugin android add` / `plugin ios add`, but the CLI (2.12.x) only provides `plugin android init` / `plugin ios init`.
- Upstream `commands.rs` example declares `upload` without `pub`; `pub` added because `generate_handler![commands::upload]` references it from another module.
- Upstream Plugins page's tauri.conf.json example still shows the v1 top-level `tauri` key; replaced with the v2 `app` key.
- Upstream `Entry` scope example derives only `Debug` and `JsonSchema`; `serde::Deserialize` added because `CommandScope` / `GlobalScope` require the scope type to be deserializable.
- Permissions / capabilities here are Tauri's ACL; see the security category.

## Related

- [Mobile Plugin Development](./mobile-plugin-development.md)
- [State Management](./state-management.md)
- [Calling Rust from the Frontend](./calling-rust.md)
- Permissions
- Plugin builder (Rust API)
