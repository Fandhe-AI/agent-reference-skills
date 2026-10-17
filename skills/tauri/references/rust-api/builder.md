---
source: https://docs.rs/tauri/2.12.4/tauri/struct.Builder.html
---

# Builder

Builds a Tauri application.

## Signature / Usage

```rust
pub struct Builder<R: Runtime> { /* private fields */ }
```

```rust
tauri::Builder::default()
  // on an actual app, remove the string argument
  .run(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json"))
  .expect("error while running tauri application");
```

`impl Default for Builder<Wry>` (feature `wry`): makes `Wry` the default `Runtime` for `Builder`.

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new() -> Self` | Creates a new App builder. |
| any_thread | `pub fn any_thread(self) -> Self` | Linux or Windows only. Builds a new Tauri application running on any thread, bypassing the main thread requirement. |
| invoke_handler | `pub fn invoke_handler<F>(self, invoke_handler: F) -> Self where F: Fn(Invoke<R>) -> bool + Send + Sync + 'static` | Defines the JS message handler callback. |
| invoke_system | `pub fn invoke_system(self, initialization_script: impl AsRef<str>) -> Self` | Defines a custom JS message system. |
| channel_interceptor | `pub fn channel_interceptor<F: Fn(&Webview<R>, CallbackFn, usize, &InvokeResponseBody) -> bool + Send + Sync + 'static>(self, interceptor: F) -> Self` | Registers a channel interceptor that can overwrite the default channel implementation. |
| append_invoke_initialization_script | `pub fn append_invoke_initialization_script(self, initialization_script: impl AsRef<str>) -> Self` | Append a custom initialization script instead of replacing the entire invoke system. |
| setup | `pub fn setup<F>(self, setup: F) -> Self where F: FnOnce(&mut App<R>) -> Result<(), Box<dyn Error>> + Send + 'static` | Defines the setup hook. |
| on_page_load | `pub fn on_page_load<F>(self, on_page_load: F) -> Self where F: Fn(&Webview<R>, &PageLoadPayload<'_>) + Send + Sync + 'static` | Defines the page load hook. |
| on_permission_request | `pub fn on_permission_request<F>(self, on_permission_request: F) -> Self where F: Fn(Webview<R>, PermissionKind) -> PermissionResponse + Send + Sync + 'static` | Defines a closure to be executed when a webview permission is requested. |
| plugin | `pub fn plugin<P: Plugin<R> + 'static>(self, plugin: P) -> Self` | Adds a Tauri application plugin (created with `crate::plugin::Builder`). |
| plugin_boxed | `pub fn plugin_boxed(self, plugin: Box<dyn Plugin<R>>) -> Self` | Like `plugin` but accepts a boxed trait object. |
| manage | `pub fn manage<T>(self, state: T) -> Self where T: Send + Sync + 'static` | Add `state` to the state managed by the application. |
| menu | `pub fn menu<F: FnOnce(&AppHandle<R>) -> Result<Menu<R>> + Send + 'static>(self, f: F) -> Self` | `desktop` only. Sets the menu to use on all windows. |
| on_menu_event | `pub fn on_menu_event<F: Fn(&AppHandle<R>, MenuEvent) + Send + Sync + 'static>(self, f: F) -> Self` | `desktop` only. Registers an event handler for any menu event. |
| on_tray_icon_event | `pub fn on_tray_icon_event<F: Fn(&AppHandle<R>, TrayIconEvent) + Send + Sync + 'static>(self, f: F) -> Self` | `desktop` and feature `tray-icon` only. Registers an event handler for any tray icon event. |
| enable_macos_default_menu | `pub fn enable_macos_default_menu(self, enable: bool) -> Self` | Enable or disable the default menu on macOS. Enabled by default. |
| on_window_event | `pub fn on_window_event<F: Fn(&Window<R>, &WindowEvent) + Send + Sync + 'static>(self, handler: F) -> Self` | Registers a window event handler for all windows. |
| on_webview_event | `pub fn on_webview_event<F: Fn(&Webview<R>, &WebviewEvent) + Send + Sync + 'static>(self, handler: F) -> Self` | Registers a webview event handler for all webviews. |
| register_uri_scheme_protocol | `pub fn register_uri_scheme_protocol<N: Into<String>, T: Into<Cow<'static, [u8]>>, H: Fn(UriSchemeContext<'_, R>, Request<Vec<u8>>) -> Response<T> + Send + Sync + 'static>(self, uri_scheme: N, protocol_handler: H) -> Self` | Registers a URI scheme protocol available to all webviews. |
| register_asynchronous_uri_scheme_protocol | `pub fn register_asynchronous_uri_scheme_protocol<N: Into<String>, H: Fn(UriSchemeContext<'_, R>, Request<Vec<u8>>, UriSchemeResponder) + Send + Sync + 'static>(self, uri_scheme: N, protocol_handler: H) -> Self` | Like the above, with an asynchronous responder. |
| device_event_filter | `pub fn device_event_filter(self, filter: DeviceEventFilter) -> Self` | Change the device event filter mode. |
| build | `pub fn build(self, context: Context<R>) -> Result<App<R>>` | Builds the application (does not start it). |
| run | `pub fn run(self, context: Context<R>) -> Result<()>` | Builds the configured application and runs it (shorthand for `build` followed by `App::run`). |

Setup hook:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    let main_window = app.get_webview_window("main").unwrap();
    main_window.set_title("Tauri!")?;
    Ok(())
  });
```

Managed state (interior mutability, retrieved through the `State` guard):

```rust
use std::{collections::HashMap, sync::Mutex};
use tauri::State;
// here we use Mutex to achieve interior mutability
struct Storage {
  store: Mutex<HashMap<u64, String>>,
}

#[tauri::command]
fn storage_insert(key: u64, value: String, storage: State<Storage>) {
  // mutate the storage behind the Mutex
  storage.store.lock().unwrap().insert(key, value);
}

tauri::Builder::default()
  .manage(Storage { store: Default::default() })
  .invoke_handler(tauri::generate_handler![storage_insert])
  // on an actual app, remove the string argument
  .run(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json"))
  .expect("error while running tauri application");
```

Window event handler:

```rust
tauri::Builder::default()
  .on_window_event(|window, event| match event {
    tauri::WindowEvent::Focused(focused) => {
      // hide window whenever it loses focus
      if !focused {
        window.hide().unwrap();
      }
    }
    _ => {}
  });
```

Custom URI scheme protocol:

```rust
tauri::Builder::default()
  .register_uri_scheme_protocol("app-files", |_ctx, request| {
    // skip leading `/`
    if let Ok(data) = std::fs::read(&request.uri().path()[1..]) {
      http::Response::builder()
        .body(data)
        .unwrap()
    } else {
      http::Response::builder()
        .status(http::StatusCode::BAD_REQUEST)
        .header(http::header::CONTENT_TYPE, mime::TEXT_PLAIN.essence_str())
        .body("failed to read file".as_bytes().to_vec())
        .unwrap()
    }
  });
```

Permission request handler:

```rust
use tauri::webview::{PermissionKind, PermissionResponse};
tauri::Builder::default()
  .on_permission_request(|_, kind| match kind {
    PermissionKind::Geolocation => PermissionResponse::Allow,
    PermissionKind::Notifications => PermissionResponse::Allow,
    _ => PermissionResponse::Default,
  });
```

## Notes

- `invoke_system`: the `initialization_script` initializes `window.__TAURI_INTERNALS__.postMessage`, which must take `(message: object, options: object)` and send it to the backend. The script must include a `__INVOKE_KEY__` token, replaced with a value that must be sent with the IPC payload to check message integrity by the `crate::WebviewWindow::on_message` API. Implementation details are up to you.
- `channel_interceptor`: if the event has been consumed, return `true`. The channel orders messages automatically; the third closure argument is the message number. The payload expected by the channel receiver is `{ id: usize, message: T }`.
- `any_thread`: on macOS the application must run on the main thread, so this function is not exposed.
- `manage`: can be called any number of times as long as each call refers to a different `T`; panics if state of type `T` is already managed. State must be `Send` + `Sync`, so mutation happens through interior mutability (e.g. `Mutex`). Add `State<T>` to a command's arguments to retrieve it.
- `on_permission_request`: not called if `WebviewBuilder::on_permission_request` is set on the webview and returned a response other than `PermissionResponse::Default`. It only triggers for new permission requests; persistent user choices made in the webview are reused. Windows: via WebView2 PermissionRequested; macOS / iOS: via WKUIDelegate requestMediaCapturePermission; Linux: via WebKitGTK permission-request signal; Android: via JNI bridge for geolocation, microphone, camera, protected media and MIDI (Android runtime permissions may still trigger native OS prompts).
- Custom URI scheme origin differs by platform: macOS, iOS and Linux use `<scheme_name>://localhost/<path>`; Windows and Android use `http://<scheme_name>.localhost/<path>` by default (use `WebviewBuilder::use_https_scheme` for `https`). Servers enforcing CORS must allow the exact Origin (or `*`) for native `fetch` / `XmlHttpRequest`.
- `device_event_filter`: `tao` ignores device events for unfocused windows by default on Windows (high CPU otherwise). Linux / macOS / iOS / Android: unsupported.
- `build`: creates the underlying webview runtime (event loop), registers the core plugins and initializes everything on the builder, but does not start the app; call `App::run` / `App::run_return`, or use `Builder::run`. Errors include: the event loop cannot be created (e.g. outside the main thread, display server unreachable, WebView2 runtime missing on Windows); invalid `app > security > assetProtocol > scope` patterns; the app menu from `menu` cannot be created; the configured tray icon cannot be created; a plugin fails to initialize (also when a plugin is registered twice).
- The `register_uri_scheme_protocol` example reads `request.uri().path()` directly with `std::fs::read` and performs no validation (the path is relative to the process working directory); in a real app, resolve the path against a fixed base directory (e.g. `app.path().resource_dir()`), reject `..` / absolute paths, and canonicalize before reading, otherwise any webview content can read arbitrary files.
- The example uses the `http` crate (re-exported as `tauri::http`) and the external `mime` crate, which must be added to `Cargo.toml`.
- `Builder` is `!Sync`, `!RefUnwindSafe`, `!UnwindSafe`, `!Freeze`.
- Rust language and Cargo themselves are covered by the rust skill; this is the Tauri app `Builder`, unrelated to Electron (see the electron skill) and to the fandhe-backend / fandhe-frontend Rust frameworks.

## Related

- [App](./app.md)
- [AppHandle](./app-handle.md)
- [State](./state.md)
- [Command macros](./command-macros.md)
- [Plugin Builder](./plugin-builder.md)
- [RunEvent](./run-event.md)
