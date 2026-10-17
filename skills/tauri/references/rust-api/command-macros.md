---
source: https://docs.rs/tauri/2.12.4/tauri/attr.command.html
---

# #[command] / generate_handler! / generate_context!

Attribute macro that marks a function as a command handler, the macro that collects commands into an invoke handler, and the macro that reads `tauri.conf.json` at compile time to build a `Context`.

## Signature / Usage

```rust
#[tauri::command]
fn greet(name: String) -> String {
  format!("Hello, {name}!")
}
```

```rust
use tauri_macros::{command, generate_handler};
#[command]
fn command_one() {
  println!("command one called");
}
#[command]
fn command_two() {
  println!("command two called");
}
fn main() {
  let _handler = generate_handler![command_one, command_two];
}
```

```rust
tauri::Builder::default()
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
```

`generate_handler!() { /* proc-macro */ }` accepts a list of command functions and creates a handler that allows commands to be called from JS with `invoke()`. `generate_context!() { /* proc-macro */ }` reads a Tauri config file and generates a `::tauri::Context`; the context embeds the frontend assets, the application icons, the resolved ACL and the parsed configuration into the binary and is passed to `tauri::Builder::run` / `tauri::Builder::build`.

## Options / Props

`#[command]` accepts a comma separated list of options:

| Option | Description |
| --- | --- |
| async | Runs the command on the async runtime instead of blocking the main thread. `async fn` commands are always executed asynchronously, so this is only needed for synchronous functions that should not run on the main thread. |
| rename_all | Case convention used to match the command arguments with the keys of the frontend payload: `"camelCase"` (default) or `"snake_case"`. |
| rename | Name used to call the command from the frontend (defaults to the function name). |
| root | Path to the `tauri` crate, used when it is renamed in `Cargo.toml` or re-exported. Defaults to `::tauri`; the special value `"crate"` resolves to `$crate`. |

```rust
// called from JavaScript with `invoke("send_message", { messageBody: "Hello" })`
#[tauri::command]
fn send_message(message_body: String) {}

// called from JavaScript with `invoke("send_message", { message_body: "Hello" })`
#[tauri::command(rename_all = "snake_case")]
fn send_message_snake(message_body: String) {}
```

`generate_context!` options (all optional, comma separated):

| Option | Description |
| --- | --- |
| first string literal | Path of the Tauri config file, relative to `CARGO_MANIFEST_DIR`. Defaults to `tauri.conf.json`. Platform specific files (e.g. `tauri.windows.conf.json`) next to it are merged as usual. |
| path (not `key = value`) | Crate path the generated code refers to. Defaults to `::tauri`; only needed when `tauri` is renamed, re-exported, or is the crate being compiled (`crate`). |
| capabilities | List of additional capability files (paths to JSON or TOML files with a capability, a list, or a named list) included in the generated ACL, on top of the `capabilities` directory and `app > security > capabilities`. |
| assets | Expression resolving to a custom `tauri::Assets` implementation, used instead of embedding the files from `build > frontendDist`. |
| test | When `true`, skips code generation that misbehaves inside a test binary (currently `Info.plist` embedding on macOS development builds). Defaults to `false`. |

```rust
tauri::generate_context!("../tauri.conf.json", ::my_framework::tauri);
tauri::generate_context!(capabilities = ["./capabilities/extra.json"]);
tauri::generate_context!(assets = tauri::test::noop_assets());
let context = tauri::generate_context!("../tauri.conf.json", test = true);
```

`Context` (feature `wry`):

```rust
pub struct Context<R: Runtime = Wry> {
    pub assets: Box<dyn Assets<R>>,
    /* private fields */
}
```

| Method | Signature |
| --- | --- |
| config | `pub fn config(&self) -> &Config` |
| config_mut | `pub fn config_mut(&mut self) -> &mut Config` |
| assets | `pub fn assets(&self) -> &dyn Assets<R>` |
| set_assets | `pub fn set_assets(&mut self, assets: Box<dyn Assets<R>>) -> Box<dyn Assets<R>>` |
| default_window_icon | `pub fn default_window_icon(&self) -> Option<&Image<'_>>` |
| set_default_window_icon | `pub fn set_default_window_icon(&mut self, icon: Option<Image<'static>>)` |
| tray_icon | `pub fn tray_icon(&self) -> Option<&Image<'_>>` (`desktop` and `tray-icon`) |
| set_tray_icon | `pub fn set_tray_icon(&mut self, icon: Option<Image<'static>>)` (`desktop` and `tray-icon`) |
| package_info | `pub fn package_info(&self) -> &PackageInfo` |
| package_info_mut | `pub fn package_info_mut(&mut self) -> &mut PackageInfo` |
| pattern | `pub fn pattern(&self) -> &Pattern` |
| new | `pub fn new(config: Config, assets: Box<dyn Assets<R>>, default_window_icon: Option<Image<'static>>, app_icon: Option<Vec<u8>>, package_info: PackageInfo, pattern: Pattern, runtime_authority: RuntimeAuthority, plugin_global_api_scripts: Option<&'static [&'static str]>) -> Self` |

Change the config before building:

```rust
use tauri::utils::config::AppDirectoriesOverride;

let mut context = tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json");

if let Ok(data_dir) = std::env::var("MY_APP_DATA_DIR") {
  context.config_mut().app.app_directories_override =
    Some(AppDirectoriesOverride::Root(data_dir.into()));
}

tauri::Builder::default()
  .run(context)
  .expect("error while running tauri application");
```

## Notes

- Inline plugins: when a command belongs to a plugin that is part of your application instead of a standalone crate, annotate it in the `generate_handler!` list with the `#![plugin(your_plugin_name)]` inner attribute so `build > removeUnusedCommands` can match it against the plugin permissions.
- `generate_context!` should not be called if you use `tauri-build` to generate the context from your build script (excess computation that is discarded); use either the `tauri-build` method or this macro, not both.
- Stability: the output of `command` and `generate_handler` is managed internally by Tauri and should not be accessed directly; it may have breaking changes. `Context` is the output of `generate_context` and is not part of the stable API; do not create it yourself unless prepared for breaking changes.
- Tauri commands are invoked from the WebView with `invoke()`; this is not Electron's `ipcMain.handle`, see the electron skill.

## Related

- [Builder](./builder.md)
- [State](./state.md)
- [ipc::Request / Response / InvokeError](./ipc-request-response.md)
- [Events](./events.md)
