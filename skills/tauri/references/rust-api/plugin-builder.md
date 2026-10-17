---
source: https://docs.rs/tauri/2.12.4/tauri/plugin/struct.Builder.html
---

# plugin::Builder / Plugin trait

`plugin::Builder` builds a `TauriPlugin`, a more concise way to construct Tauri plugins than implementing the `Plugin` trait directly.

## Signature / Usage

```rust
pub struct Builder<R: Runtime, C: DeserializeOwned = ()> { /* private fields */ }
```

Convention: export a function called `init` that constructs and returns the plugin.

```rust
use tauri::{plugin::{Builder, TauriPlugin}, Runtime};

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("example")
    .build()
}
```

When a plugin exposes more complex configuration options, provide a Builder:

```rust
use tauri::{plugin::{Builder as PluginBuilder, TauriPlugin}, Runtime};

pub struct Builder {
  option_a: String,
  option_b: String,
  option_c: bool
}

impl Default for Builder {
  fn default() -> Self {
    Self {
      option_a: "foo".to_string(),
      option_b: "bar".to_string(),
      option_c: false
    }
  }
}

impl Builder {
  pub fn new() -> Self {
    Default::default()
  }

  pub fn option_a(mut self, option_a: String) -> Self {
    self.option_a = option_a;
    self
  }

  pub fn option_b(mut self, option_b: String) -> Self {
    self.option_b = option_b;
    self
  }

  pub fn option_c(mut self, option_c: bool) -> Self {
    self.option_c = option_c;
    self
  }

  pub fn build<R: Runtime>(self) -> TauriPlugin<R> {
    PluginBuilder::new("example")
      .setup(move |app_handle, api| {
        // use the options here to do stuff
        println!("a: {}, b: {}, c: {}", self.option_a, self.option_b, self.option_c);

        Ok(())
      })
      .build()
  }
}
```

Managing state in the plugin setup hook:

```rust
use tauri::{plugin::{Builder, TauriPlugin}, Runtime, Manager};
use std::path::PathBuf;

#[derive(Debug, Default)]
struct PluginState {
   dir: Option<PathBuf>
}

fn init<R: Runtime>() -> TauriPlugin<R> {
Builder::new("example")
  .setup(|app, api| {
    app.manage(PluginState::default());

    Ok(())
  })
  .build()
}
```

## Options / Props

### Methods

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new(name: &'static str) -> Self` | Creates a new Plugin builder. |
| invoke_handler | `pub fn invoke_handler<F>(self, invoke_handler: F) -> Self where F: Fn(Invoke<R>) -> bool + Send + Sync + 'static` | Defines the JS message handler callback. Use `tauri::generate_handler` to generate the input; the input type is not considered stable yet. |
| js_init_script | `pub fn js_init_script(self, js_init_script: impl Into<String>) -> Self` | JavaScript run after the global object is created but before the HTML document is parsed. Main frame only. Wrapped in `(function () { /* your script here */ })();`, so globals must be assigned to `window`. Calling it multiple times overrides previous values. |
| js_init_script_on_all_frames | `pub fn js_init_script_on_all_frames(self, js_init_script: impl Into<String>) -> Self` | Same, but executed on all frames (main and sub frames) and on all top-level document and child frame navigations; check `window.location` to guard against unexpected origins. |
| setup | `pub fn setup<F>(self, setup: F) -> Self where F: FnOnce(&AppHandle<R>, PluginApi<R, C>) -> Result<(), Box<dyn Error>> + Send + 'static` | Closure that runs when the plugin is registered. |
| on_navigation | `pub fn on_navigation<F>(self, on_navigation: F) -> Self where F: Fn(&Webview<R>, &Url) -> bool + Send + 'static` | Invoked when the webview tries to navigate to a URL. Returning `false` cancels the navigation. |
| on_page_load | `pub fn on_page_load<F>(self, on_page_load: F) -> Self where F: FnMut(&Webview<R>, &PageLoadPayload<'_>) + Send + 'static` | Invoked when the webview performs a navigation to a page. |
| on_window_ready | `pub fn on_window_ready<F>(self, on_window_ready: F) -> Self where F: FnMut(Window<R>) + Send + 'static` | Invoked when the window is created. |
| on_webview_ready | `pub fn on_webview_ready<F>(self, on_webview_ready: F) -> Self where F: FnMut(Webview<R>) + Send + 'static` | Invoked when the webview is created. |
| on_event | `pub fn on_event<F>(self, on_event: F) -> Self where F: FnMut(&AppHandle<R>, &RunEvent) + Send + 'static` | Invoked when the event loop receives a new event. |
| on_drop | `pub fn on_drop<F>(self, on_drop: F) -> Self where F: FnOnce(AppHandle<R>) + Send + 'static` | Invoked when the plugin is dropped. |
| register_uri_scheme_protocol | `pub fn register_uri_scheme_protocol<N: Into<String>, T: Into<Cow<'static, [u8]>>, H: Fn(UriSchemeContext<'_, R>, Request<Vec<u8>>) -> Response<T> + Send + Sync + 'static>(self, uri_scheme: N, protocol_handler: H) -> Self` | Registers a URI scheme protocol available to all webviews. |
| register_asynchronous_uri_scheme_protocol | `pub fn register_asynchronous_uri_scheme_protocol<N: Into<String>, H: Fn(UriSchemeContext<'_, R>, Request<Vec<u8>>, UriSchemeResponder) + Send + Sync + 'static>(self, uri_scheme: N, protocol_handler: H) -> Self` | Like the above with an asynchronous responder. |
| try_build | `pub fn try_build(self) -> Result<TauriPlugin<R, C>, BuilderError>` | Builds the `TauriPlugin`. |
| build | `pub fn build(self) -> TauriPlugin<R, C>` | Builds the `TauriPlugin`; panics if `try_build` returns an error. |

`Plugin` trait (dyn compatible):

```rust
pub trait Plugin<R: Runtime>: Send {
    // Required method
    fn name(&self) -> &'static str;

    // Provided methods
    fn initialize(
        &mut self,
        app: &AppHandle<R>,
        config: JsonValue,
    ) -> Result<(), Box<dyn Error>> { ... }
    fn initialization_script(&self) -> Option<String> { ... }
    fn initialization_script_2(&self) -> Option<InitializationScript> { ... }
    fn window_created(&mut self, window: Window<R>) { ... }
    fn webview_created(&mut self, webview: Webview<R>) { ... }
    fn on_navigation(&mut self, webview: &Webview<R>, url: &Url) -> bool { ... }
    fn on_page_load(
        &mut self,
        webview: &Webview<R>,
        payload: &PageLoadPayload<'_>,
    ) { ... }
    fn on_event(&mut self, app: &AppHandle<R>, event: &RunEvent) { ... }
    fn extend_api(&mut self, invoke: Invoke<R>) -> bool { ... }
}
```

`plugin` module items: structs `Builder`, `PluginApi` (api exposed to the plugin setup hook), `PluginHandle` (a handle to a plugin), `TauriPlugin` (returned by the `Builder`; only construct through the builder); enums `BuilderError`, `PermissionState`; trait `Plugin`.

## Notes

- `Plugin::name`: the plugin name, used as key on the plugin config object.
- `Plugin::initialization_script_2` is the same as `initialization_script` but returns an `InitializationScript`; the docs state "We plan to replace `Plugin::initialization_script` with this signature in v3".
- `js_init_script` / `initialization_script` on Windows: scripts are always added to subframes. On Android, when addDocumentStartJavaScript is not supported, scripts are prepended to each HTML head (only for custom protocol URLs); for remote URLs `onPageStarted` is used, which is not guaranteed to run before other scripts.
- URI scheme protocols are registered when the webview is created: if the plugin is registered after a webview was created, the protocol is not available to it.
- Custom protocol Origin differs by platform: macOS, iOS and Linux use `<scheme_name>://localhost/<path>`; Windows and Android use `http://<scheme_name>.localhost/<path>` by default (use `WebviewBuilder::use_https_scheme` for `https`). Servers enforcing CORS must allow the exact Origin (or `*`) for native `fetch` / `XmlHttpRequest`.
- `Builder` is `!Sync`, `!RefUnwindSafe`, `!UnwindSafe`.
- Tauri plugin builder (Rust core); not a plugin system of the fandhe-backend / fandhe-frontend frameworks, and not Electron's preload/main-process modules (electron skill).

## Related

- [Builder](./builder.md)
- [AppHandle](./app-handle.md)
- [Command macros](./command-macros.md)
- [RunEvent](./run-event.md)
