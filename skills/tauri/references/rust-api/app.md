---
source: https://docs.rs/tauri/2.12.4/tauri/struct.App.html
---

# App

The instance of the currently running application. Implements `Manager`, which allows manipulation of global application items.

## Signature / Usage

```rust
pub struct App<R: Runtime = Wry> { /* private fields */ }
```

```rust
let app = tauri::Builder::default()
  // on an actual app, remove the string argument
  .build(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json"))
  .expect("error while building tauri application");
app.run(|_app_handle, event| match event {
  tauri::RunEvent::ExitRequested { api, .. } => {
    api.prevent_exit();
  }
  _ => {}
});
```

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| wry_plugin | `pub fn wry_plugin<P: PluginBuilder<EventLoopMessage> + Send + 'static>(&mut self, plugin: P) where <P as PluginBuilder<EventLoopMessage>>::Plugin: Send` | `wry` feature only, `impl App<Wry>`. Adds a `tauri_runtime_wry::Plugin` using its `PluginBuilder`. Unstable API. |
| on_menu_event | `pub fn on_menu_event<F: Fn(&AppHandle<R>, MenuEvent) + Send + Sync + 'static>(&self, handler: F)` | `desktop` only. Registers a global menu event listener. |
| on_tray_icon_event | `pub fn on_tray_icon_event<F: Fn(&AppHandle<R>, TrayIconEvent) + Send + Sync + 'static>(&self, handler: F)` | `desktop` and feature `tray-icon` only. Registers a global tray icon menu event listener. |
| tray_by_id | `pub fn tray_by_id<'a, I>(&self, id: &'a I) -> Option<TrayIcon<R>> where I: ?Sized, TrayIconId: PartialEq<&'a I>` | `desktop` and feature `tray-icon` only. Gets a tray icon using the provided id. |
| remove_tray_by_id | `pub fn remove_tray_by_id<'a, I>(&self, id: &'a I) -> Option<TrayIcon<R>> where I: ?Sized, TrayIconId: PartialEq<&'a I>` | `desktop` and feature `tray-icon` only. Removes a tray icon from tauri's internal state and returns it. |
| config | `pub fn config(&self) -> &Config` | Gets the app's configuration, defined on the `tauri.conf.json` file. |
| package_info | `pub fn package_info(&self) -> &PackageInfo` | Gets the app's package information. |
| asset_resolver | `pub fn asset_resolver(&self) -> AssetResolver<R>` | The application's asset resolver. |
| primary_monitor | `pub fn primary_monitor(&self) -> Result<Option<Monitor>>` | Returns the primary monitor of the system; `None` if none can be identified as primary. |
| monitor_from_point | `pub fn monitor_from_point(&self, x: f64, y: f64) -> Result<Option<Monitor>>` | Returns the monitor that contains the given point. |
| available_monitors | `pub fn available_monitors(&self) -> Result<Vec<Monitor>>` | Returns the list of all the monitors available on the system. |
| cursor_position | `pub fn cursor_position(&self) -> Result<PhysicalPosition<f64>>` | Gets the cursor position relative to the top-left hand corner of the desktop. |
| set_theme | `pub fn set_theme(&self, theme: Option<Theme>)` | Sets the app theme. iOS / Android: unsupported. |
| default_window_icon | `pub fn default_window_icon(&self) -> Option<&Image<'_>>` | Returns the default window icon. |
| menu | `pub fn menu(&self) -> Option<Menu<R>>` | `desktop` only. Returns the app-wide menu. |
| set_menu | `pub fn set_menu(&self, menu: Menu<R>) -> Result<Option<Menu<R>>>` | `desktop` only. Sets the app-wide menu and returns the previous one. |
| remove_menu | `pub fn remove_menu(&self) -> Result<Option<Menu<R>>>` | `desktop` only. Removes the app-wide menu and returns it. |
| hide_menu | `pub fn hide_menu(&self) -> Result<()>` | `desktop` only. Hides the app-wide menu from windows that have it. macOS: unsupported. |
| show_menu | `pub fn show_menu(&self) -> Result<()>` | `desktop` only. Shows the app-wide menu for windows that have it. macOS: unsupported. |
| cleanup_before_exit | `pub fn cleanup_before_exit(&self)` | Runs necessary cleanup tasks before exiting the process. |
| invoke_key | `pub fn invoke_key(&self) -> &str` | Gets the invoke key that must be referenced when using `crate::webview::InvokeRequest`. |
| supports_multiple_windows | `pub fn supports_multiple_windows(&self) -> bool` | `desktop` only. Whether the application supports multiple windows. |
| run_on_main_thread | `pub fn run_on_main_thread<F: FnOnce() + Send + 'static>(&self, f: F) -> Result<()>` | Runs the given closure on the main thread. |
| handle | `pub fn handle(&self) -> &AppHandle<R>` | Gets a handle to the application instance. |
| set_device_event_filter | `pub fn set_device_event_filter(&mut self, filter: DeviceEventFilter)` | Changes the device event filter mode. Linux / macOS / iOS / Android: unsupported. |
| run | `pub fn run<F: FnMut(&AppHandle<R>, RunEvent) + 'static>(self, callback: F)` | Runs the application. Never returns; the process is exited with `std::process::exit` when the application finishes. |
| run_return | `pub fn run_return<F: FnMut(&AppHandle<R>, RunEvent) + 'static>(self, callback: F) -> i32` | Runs the application, returning its intended exit code. iOS: unsupported (falls back to `run`). |
| run_iteration | `pub fn run_iteration<F: FnMut(&AppHandle<R>, RunEvent) + 'static>(&mut self, callback: F)` | Deprecated. `desktop` only. Runs one iteration of the runtime event loop and returns immediately. |

Trait implementations: `Debug`, `Emitter<R>`, `Listener<R>`, `Manager<R>`, `HasDisplayHandle`. The `Emitter` / `Listener` / `Manager` methods are documented in [Events](./events.md) and [Manager](./manager.md).

Run and keep control after the loop exits:

```rust
let app = tauri::Builder::default()
  // on an actual app, remove the string argument
  .build(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json"))
  .expect("error while building tauri application");
let exit_code = app
  .run_return(|_app_handle, event| match event {
    tauri::RunEvent::ExitRequested { api, .. } => {
     api.prevent_exit();
    }
     _ => {}
  });

std::process::exit(exit_code);
```

## Notes

- `invoke_key`: DO NOT expose this key to third party scripts as it might grant access to the backend from external URLs and iframes.
- `cursor_position`: the top-left corner of the desktop is not necessarily the top-left of the screen; with multiple monitors it is the top-left of the main monitor on Windows and macOS, or of the leftmost monitor on X11. Coordinates can be negative.
- `set_device_event_filter`: DeviceEvent capture can cause high CPU usage for unfocused windows, so `tao` ignores them by default for unfocused windows on Windows.
- `run` panics if the setup function supplied in `Builder::setup` fails. `run_return` also panics for the same reason; with `AppHandle::restart` / `request_restart` it handles the restart request without returning.
- `run_iteration` is deprecated: when called in a loop it busy-loops; use `App::run_return` instead. App cleanup is not done automatically with it; call `App::cleanup_before_exit`.
- `remove_tray_by_id`: dropping the returned icon may make the tray icon disappear if it is not cloned elsewhere or referenced by JS.
- `Manager::unmanage` is deprecated since 2.3.0 (unsafe, can cause dangling references).
- `App` is `!Sync`, `!RefUnwindSafe`, `!UnwindSafe`.
- Tauri app type (Rust core + system WebView), not Electron's `app` object; see the electron skill for Electron.

## Related

- [Builder](./builder.md)
- [AppHandle](./app-handle.md)
- [RunEvent](./run-event.md)
- [Manager](./manager.md)
