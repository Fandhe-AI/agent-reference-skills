---
source: https://docs.rs/tauri/2.12.4/tauri/struct.AppHandle.html
---

# AppHandle

A handle to the currently running application. Implements `Manager`, which allows manipulation of global application items. Cheap to `clone` and `Send` / `Sync`, so it can be moved into threads and async tasks.

## Signature / Usage

```rust
pub struct AppHandle<R: Runtime = Wry> { /* private fields */ }
```

```rust
use tauri::{plugin::{Builder as PluginBuilder, TauriPlugin}, Runtime};

fn init_plugin<R: Runtime>() -> TauriPlugin<R> {
  PluginBuilder::new("dummy").build()
}

tauri::Builder::default()
  .setup(move |app| {
    let handle = app.handle().clone();
    std::thread::spawn(move || {
      handle.plugin(init_plugin());
    });

    Ok(())
  });
```

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| create_tao_window | `pub fn create_tao_window<F: FnOnce() -> (String, TaoWindowBuilder) + Send + 'static>(&self, f: F) -> Result<Weak<Window>>` | `wry` feature only. Creates a new tao window using a callback. The event loop must be running. |
| send_tao_window_event | `pub fn send_tao_window_event(&self, window_id: TaoWindowId, message: WindowMessage) -> Result<()>` | `wry` feature only. Sends a window message to the event loop. |
| run_on_main_thread | `pub fn run_on_main_thread<F: FnOnce() + Send + 'static>(&self, f: F) -> Result<()>` | Runs the given closure on the main thread. |
| plugin | `pub fn plugin<P: Plugin<R> + 'static>(&self, plugin: P) -> Result<()>` | Adds a plugin dynamically (e.g. after login). For plugins created at startup prefer `Builder::plugin`. |
| plugin_boxed | `pub fn plugin_boxed(&self, plugin: Box<dyn Plugin<R>>) -> Result<()>` | Like `plugin` but accepts a boxed trait object. |
| remove_plugin | `pub fn remove_plugin(&self, plugin: &str) -> bool` | Removes the plugin with the given name. |
| exit | `pub fn exit(&self, exit_code: i32)` | Exits the app by triggering `RunEvent::ExitRequested` and `RunEvent::Exit`. |
| restart | `pub fn restart(&self) -> !` | Restarts the app by triggering `RunEvent::ExitRequested` with code `RESTART_EXIT_CODE` and `RunEvent::Exit`. |
| request_restart | `pub fn request_restart(&self)` | Same trigger as `restart`, delivering the events reliably. |
| set_device_event_filter | `pub fn set_device_event_filter(&self, filter: DeviceEventFilter)` | Changes the device event filter mode (see `App::set_device_event_filter`). |
| on_menu_event | `pub fn on_menu_event<F: Fn(&AppHandle<R>, MenuEvent) + Send + Sync + 'static>(&self, handler: F)` | `desktop` only. Registers a global menu event listener. |
| on_tray_icon_event | `pub fn on_tray_icon_event<F: Fn(&AppHandle<R>, TrayIconEvent) + Send + Sync + 'static>(&self, handler: F)` | `desktop` and feature `tray-icon` only. Registers a global tray icon menu event listener. |
| tray_by_id | `pub fn tray_by_id<'a, I>(&self, id: &'a I) -> Option<TrayIcon<R>> where I: ?Sized, TrayIconId: PartialEq<&'a I>` | `desktop` and feature `tray-icon` only. Gets a tray icon by id. |
| remove_tray_by_id | `pub fn remove_tray_by_id<'a, I>(&self, id: &'a I) -> Option<TrayIcon<R>> where I: ?Sized, TrayIconId: PartialEq<&'a I>` | `desktop` and feature `tray-icon` only. Removes a tray icon from tauri's internal state and returns it. |
| config | `pub fn config(&self) -> &Config` | Gets the app's configuration, defined on the `tauri.conf.json` file. |
| package_info | `pub fn package_info(&self) -> &PackageInfo` | Gets the app's package information. |
| asset_resolver | `pub fn asset_resolver(&self) -> AssetResolver<R>` | The application's asset resolver. |
| primary_monitor | `pub fn primary_monitor(&self) -> Result<Option<Monitor>>` | Returns the primary monitor of the system. |
| monitor_from_point | `pub fn monitor_from_point(&self, x: f64, y: f64) -> Result<Option<Monitor>>` | Returns the monitor that contains the given point. |
| available_monitors | `pub fn available_monitors(&self) -> Result<Vec<Monitor>>` | Returns the list of all the monitors available on the system. |
| cursor_position | `pub fn cursor_position(&self) -> Result<PhysicalPosition<f64>>` | Gets the cursor position relative to the top-left hand corner of the desktop. |
| set_theme | `pub fn set_theme(&self, theme: Option<Theme>)` | Sets the app theme. iOS / Android: unsupported. |
| default_window_icon | `pub fn default_window_icon(&self) -> Option<&Image<'_>>` | Returns the default window icon. |
| menu | `pub fn menu(&self) -> Option<Menu<R>>` | `desktop` only. Returns the app-wide menu. |
| set_menu | `pub fn set_menu(&self, menu: Menu<R>) -> Result<Option<Menu<R>>>` | `desktop` only. Sets the app-wide menu and returns the previous one. |
| remove_menu | `pub fn remove_menu(&self) -> Result<Option<Menu<R>>>` | `desktop` only. Removes the app-wide menu and returns it. |
| hide_menu | `pub fn hide_menu(&self) -> Result<()>` | `desktop` only. Hides the app-wide menu. macOS: unsupported. |
| show_menu | `pub fn show_menu(&self) -> Result<()>` | `desktop` only. Shows the app-wide menu. macOS: unsupported. |
| cleanup_before_exit | `pub fn cleanup_before_exit(&self)` | Runs necessary cleanup tasks before exiting the process. |
| invoke_key | `pub fn invoke_key(&self) -> &str` | Gets the invoke key that must be referenced when using `crate::webview::InvokeRequest`. |
| supports_multiple_windows | `pub fn supports_multiple_windows(&self) -> bool` | `desktop` only. Whether the application supports multiple windows. |

Trait implementations: `Clone`, `CommandArg` (usable as a command argument; "this will never fail"), `Debug`, `Emitter<R>`, `Listener<R>`, `Manager<R>`, `HasDisplayHandle`, `FunctionArg` (feature `specta`).

## Notes

- `exit` on Android: unless the exit is prevented, the activity is finished instead of the process being exited directly; `RunEvent::Exit` is triggered once the activity is destroyed and `exit_code` is not used as the process exit code.
- `restart`: when called on the main thread, delivery of `ExitRequested` / `Exit` cannot be guaranteed, so they are skipped and the process is restarted directly. Use `request_restart` to trigger them reliably.
- `cleanup_before_exit`: exit the app immediately after it returns and do not use any tauri-related APIs.
- `invoke_key`: DO NOT expose this key to third party scripts as it might grant access to the backend from external URLs and iframes.
- `remove_tray_by_id`: dropping the returned icon may make the tray icon disappear if it is not cloned elsewhere or referenced by JS.
- `Manager::unmanage` is deprecated since 2.3.0 (unsafe, can cause dangling references).
- Tauri `AppHandle` (Rust core), not Electron's `app`; see the electron skill for Electron.

## Related

- [App](./app.md)
- [Manager](./manager.md)
- [Events](./events.md)
- [RunEvent](./run-event.md)
