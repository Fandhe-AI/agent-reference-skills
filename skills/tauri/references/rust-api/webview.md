---
source: https://docs.rs/tauri/2.12.4/tauri/webview/struct.WebviewBuilder.html
---

# WebviewBuilder / Webview

`WebviewBuilder` (feature `unstable`) is a builder for a webview that is added to an existing `Window` with `Window::add_child`; `Webview` is the webview handle. Without `unstable` a window and its webview are a single `WebviewWindow`.

## Signature / Usage

```rust
pub struct WebviewBuilder<R: Runtime> { /* private fields */ }   // feature `unstable` only
```

Create a webview in the setup hook:

```rust
tauri::Builder::default()
  .setup(|app| {
    let window = tauri::window::WindowBuilder::new(app, "label").build()?;
    let webview_builder = tauri::webview::WebviewBuilder::new("label", tauri::WebviewUrl::App("index.html".into()));
    let webview = window.add_child(webview_builder, tauri::LogicalPosition::new(0, 0), window.inner_size().unwrap());
    Ok(())
  });
```

Create a webview in a command:

```rust
#[tauri::command]
async fn create_window(app: tauri::AppHandle) {
  let window = tauri::window::WindowBuilder::new(&app, "label").build().unwrap();
  let webview_builder = tauri::webview::WebviewBuilder::new("label", tauri::WebviewUrl::External("https://tauri.app/".parse().unwrap()));
  window.add_child(webview_builder, tauri::LogicalPosition::new(0, 0), window.inner_size().unwrap());
}
```

Move a webview to another window:

```rust
use tauri::{LogicalPosition, LogicalSize, WebviewUrl};

tauri::Builder::default()
  .setup(|app| {
    let first = tauri::Window::builder(app, "first").build()?;
    let second = tauri::Window::builder(app, "second").build()?;

    let webview = first.add_child(
      tauri::webview::WebviewBuilder::new("child", WebviewUrl::App(Default::default())),
      LogicalPosition::new(0., 0.),
      LogicalSize::new(800., 600.),
    )?;

    // move the webview to the second window
    webview.reparent(&second)?;

    Ok(())
  });
```

## Methods

`WebviewBuilder`:

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new<L: Into<String>>(label: L, url: WebviewUrl) -> Self` | Initializes a webview builder with a label and URL. |
| from_config | `pub fn from_config(config: &WindowConfig) -> Self` | Initializes from a `WindowConfig`. Two webviews cannot share a `label`. |
| on_web_resource_request | `pub fn on_web_resource_request<F: Fn(Request<Vec<u8>>, &mut Response<Cow<'static, [u8]>>) + Send + Sync + 'static>(self, f: F) -> Self` | Runs on web resource HTTP requests, letting you modify the response. Only for the `tauri` URI protocol. |
| on_navigation | `pub fn on_navigation<F: Fn(&Url) -> bool + Send + 'static>(self, f: F) -> Self` | Runs on navigation; `false` cancels. |
| on_new_window | `pub fn on_new_window<F: Fn(Url, NewWindowFeatures) -> NewWindowResponse<R> + Send + 'static>(self, f: F) -> Self` | `window.open` handler. Android / iOS: not supported. |
| on_document_title_changed | `pub fn on_document_title_changed<F: Fn(Webview<R>, String) + Send + 'static>(self, f: F) -> Self` | Runs when the document title changes. |
| on_download | `pub fn on_download<F: Fn(Webview<R>, DownloadEvent<'_>) -> bool + Send + Sync + 'static>(self, f: F) -> Self` | Download handler; `false` on `Requested` prevents the download. |
| on_page_load | `pub fn on_page_load<F: Fn(Webview<R>, PageLoadPayload<'_>) + Send + Sync + 'static>(self, f: F) -> Self` | Page load handler (`Started` / `Finished`). |
| on_permission_request | `pub fn on_permission_request<F: Fn(Webview<R>, PermissionKind) -> PermissionResponse + Send + Sync + 'static>(self, f: F) -> Self` | Permission handler; called before `Builder::on_permission_request`, which is skipped unless the response is `PermissionResponse::Default`. |
| accept_first_mouse / initialization_script / initialization_script_for_all_frames / user_agent / additional_browser_args / data_directory / disable_drag_drop_handler / enable_clipboard_access / incognito / proxy_url / transparent / focused / auto_resize / zoom_hotkeys_enabled / browser_extensions_enabled / extensions_path / data_store_identifier / use_https_scheme / devtools / background_color / background_throttling / disable_javascript / scroll_bar_style / general_autofill_enabled / limit_navigations_to_app_bound_domains / with_related_view | same signatures as the webview attributes of [WebviewWindowBuilder](./webview-window-builder.md) (here `background_color` sets the webview color only and `focused(self, focus: bool)` sets whether the webview is focused) | Webview attributes. |

`Webview`:

| Method | Signature | Description |
| --- | --- | --- |
| builder | `pub fn builder<L: Into<String>>(label: L, url: WebviewUrl) -> WebviewBuilder<R>` | `unstable` only. Initializes a webview builder. |
| run_on_main_thread | `pub fn run_on_main_thread<F: FnOnce() + Send + 'static>(&self, f: F) -> Result<()>` | Runs the closure on the main thread. |
| label | `pub fn label(&self) -> &str` | The webview label. |
| on_webview_event | `pub fn on_webview_event<F: Fn(&WebviewEvent) + Send + 'static>(&self, f: F)` | Registers a webview event listener. |
| resolve_command_scope | `pub fn resolve_command_scope<T: ScopeObject>(&self, plugin: &str, command: &str) -> Result<Option<ResolvedScope<T>>>` | Resolves the command scope for the currently loaded URL. |
| print | `pub fn print(&self) -> Result<()>` | `desktop` only. Print dialog; currently only supported on macOS on `wry`. |
| cursor_position | `pub fn cursor_position(&self) -> Result<PhysicalPosition<f64>>` | `desktop` only. Cursor position relative to the desktop. |
| close | `pub fn close(&self) -> Result<()>` | `desktop` only. Closes this webview. |
| set_bounds | `pub fn set_bounds(&self, bounds: Rect) -> Result<()>` | `desktop` only. Resizes this webview. |
| set_size | `pub fn set_size<S: Into<Size>>(&self, size: S) -> Result<()>` | `desktop` only. Resizes this webview. |
| set_position | `pub fn set_position<Pos: Into<Position>>(&self, position: Pos) -> Result<()>` | `desktop` only. Sets the webview position. |
| set_focus | `pub fn set_focus(&self) -> Result<()>` | `desktop` only. Focus the webview. |
| hide / show | `pub fn hide(&self) -> Result<()>` | `desktop` only. Hide / show the webview. |
| reparent | `pub fn reparent(&self, window: &Window<R>) -> Result<()>` | `desktop` only. Move the webview to the given window. |
| set_auto_resize | `pub fn set_auto_resize(&self, auto_resize: bool) -> Result<()>` | `desktop` only. Whether the webview follows the parent window size. |
| bounds | `pub fn bounds(&self) -> Result<Rect>` | `desktop` only. Bounds of the client area. |
| position | `pub fn position(&self) -> Result<PhysicalPosition<i32>>` | `desktop` only. Child webviews: top-left of the client area relative to the parent window; webview window: inner position of the window. |
| size | `pub fn size(&self) -> Result<PhysicalSize<u32>>` | `desktop` only. Physical size of the client area. |
| window | `pub fn window(&self) -> Window<R>` | The window hosting this webview. |
| window_ref | `pub fn window_ref(&self) -> MutexGuard<'_, Window<R>>` | A reference to the hosting window. |
| with_webview | `pub fn with_webview<F: FnOnce(PlatformWebview) + Send + 'static>(&self, f: F) -> Result<()>` | Runs a closure on the main thread with the platform webview handle. |
| url / navigate / reload | `pub fn url(&self) -> Result<Url>` / `pub fn navigate(&self, url: Url) -> Result<()>` / `pub fn reload(&self) -> Result<()>` | Current URL; navigate; reload. |
| convert_file_src | `pub fn convert_file_src<P: AsRef<Path>>(&self, path: P, protocol: Option<&str>) -> Result<String>` | Rust equivalent of JS `convertFileSrc`. |
| on_message | `pub fn on_message(self, request: InvokeRequest, responder: Box<OwnedInvokeResponder<R>>)` | Handles an `InvokeRequest`. |
| eval / eval_with_callback | `pub fn eval(&self, js: impl Into<String>) -> Result<()>` / `pub fn eval_with_callback(&self, js: impl Into<String>, callback: impl Fn(String) + Send + 'static) -> Result<()>` | Evaluate JavaScript. |
| open_devtools / close_devtools / is_devtools_open | `pub fn open_devtools(&self)` etc. | Debug-assertions or `devtools` feature only. |
| set_zoom | `pub fn set_zoom(&self, scale_factor: f64) -> Result<()>` | Webview zoom. |
| set_background_color | `pub fn set_background_color(&self, color: Option<Color>) -> Result<()>` | Webview background color. |
| clear_all_browsing_data | `pub fn clear_all_browsing_data(&self) -> Result<()>` | Clears all browsing data for this webview. |
| cookies_for_url / cookies / set_cookie / delete_cookie | `pub fn cookies(&self) -> Result<Vec<Cookie<'static>>>` etc. | Cookie access. |

Trait implementations of `Webview`: `Clone`, `CommandArg` (never fails), `Debug`, `Emitter<R>`, `Eq`, `PartialEq` and `Hash` (by label only), `FunctionArg` (feature `specta`), `Listener<R>`, `Manager<R>`.

## Notes

- Known issue: on Windows, `WebviewBuilder::new` and `from_config` deadlock in synchronous commands and event handlers (Webview2 issue). Use `async` commands and separate threads when creating webviews.
- `reparent` returns `Error::CannotReparentWebviewWindow` when the `unstable` feature is disabled and either the webview or the target window belongs to a `WebviewWindow`. The webview keeps its size and its position relative to the window client area; call `set_position` / `set_size` (or `set_auto_resize`) afterwards.
- `set_auto_resize`: child webviews created with `Window::add_child` have a fixed position and size by default; with auto resize the bounds scale with the window client area keeping the proportions from when it was enabled. It is a no-op for `WebviewWindow` webviews.
- `navigate`: equivalent to setting `window.location`. Navigation handlers (`WebviewBuilder::on_navigation`, `Plugin::on_navigation`) can cancel it; initialization scripts run again on the new document; `Builder::on_page_load` is triggered; the ACL origin of the IPC changes with the URL, so after navigating to a remote URL only commands allowed by a capability whose `remote` context matches can be executed. The navigation is asynchronous.
- `reload` re-runs initialization scripts and triggers navigation and page load hooks; in-memory page state (JS variables, unsaved form data, frontend-created channels) is lost while cookies and other browsing data are kept.
- `clear_all_browsing_data` deletes cookies, local storage, session storage, IndexedDB, the HTTP cache and service workers; it does not reload the page; deletion is asynchronous. Linux: clears the whole WebKit web context shared by webviews using the same data directory. macOS / iOS: clears the webview's `WKWebsiteDataStore` (own store with a custom `data_store_identifier`). Windows: uses `ICoreWebView2Profile2::ClearBrowsingDataAll`, an error is returned if the WebView2 runtime is too old.
- `incognito`: Windows requires WebView2 Runtime 101.0.1210.39 or higher; Android unsupported; macOS / iOS use the nonPersistent DataStore. `proxy_url` on macOS requires the `macos-proxy` feature and macOS 14+.
- `set_background_color` on Windows: translucent colors are not supported, any alpha other than `0` is replaced by `255`; macOS / iOS not implemented.
- Platform-specific notes of the other attributes (`additional_browser_args`, `use_https_scheme`, `devtools`, `background_throttling`, `scroll_bar_style`, `zoom_hotkeys_enabled`, `limit_navigations_to_app_bound_domains`, cookies) match those on the WebviewWindowBuilder page.
- Tauri webviews (Rust core + system WebView), not Electron's `WebContentsView` / `BrowserView`; see the electron skill.

## Related

- [WebviewWindowBuilder](./webview-window-builder.md)
- [WebviewWindow](./webview-window.md)
- [Window](./window.md)
- [Manager](./manager.md)
