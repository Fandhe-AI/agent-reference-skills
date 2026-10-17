---
source: https://docs.rs/tauri/2.12.4/tauri/webview/struct.WebviewWindowBuilder.html
---

# WebviewWindowBuilder

A builder for `WebviewWindow`, a window that hosts a single webview. The `tauri::webview` module (https://docs.rs/tauri/2.12.4/tauri/webview/index.html) also contains `Color`, `Cookie`, `InvokeRequest`, `NewWindowFeatures`, `PageLoadPayload`, `PlatformWebview` (`wry`), `ResolvedScope`, `Url`, `Webview` (`wry`), `WebviewBuilder` (`unstable`), `WebviewWindow`, and enums `DownloadEvent`, `NewWindowResponse`, `PageLoadEvent`, `PermissionKind`, `PermissionResponse`, `ScrollBarStyle`.

## Signature / Usage

```rust
pub struct WebviewWindowBuilder<'a, R: Runtime, M: Manager<R>> { /* private fields */ }
```

Create a window in the setup hook:

```rust
tauri::Builder::default()
  .setup(|app| {
    let webview_window = tauri::WebviewWindowBuilder::new(app, "label", tauri::WebviewUrl::App("index.html".into()))
      .build()?;
    Ok(())
  });
```

Create a window in a command:

```rust
#[tauri::command]
async fn create_window(app: tauri::AppHandle) {
  let webview_window = tauri::WebviewWindowBuilder::new(&app, "label", tauri::WebviewUrl::App("index.html".into()))
    .build()
    .unwrap();
}
```

Create a window in a separate thread:

```rust
tauri::Builder::default()
  .setup(|app| {
    let handle = app.handle().clone();
    std::thread::spawn(move || {
      let webview_window = tauri::WebviewWindowBuilder::new(&handle, "label", tauri::WebviewUrl::App("index.html".into()))
        .build()
        .unwrap();
    });
    Ok(())
  });
```

Create from a config with a unique label so multiple instances can exist:

```rust
#[tauri::command]
async fn open_window_multiple(app: tauri::AppHandle) {
  let mut conf = app.config().app.windows.iter().find(|c| c.label == "template-for-multiwindow").unwrap().clone();
  // This should be a unique label for all windows. For example, we can use a random suffix:
  let mut buf = [0u8; 1];
  assert_eq!(getrandom::fill(&mut buf), Ok(()));
  conf.label = format!("my-multiwindow-{}", buf[0]);
  let webview_window = tauri::WebviewWindowBuilder::from_config(&app, &conf)
    .unwrap()
    .build()
    .unwrap();
}
```

## Options / Props

### Methods

Construction and hooks:

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new<L: Into<String>>(manager: &'a M, label: L, url: WebviewUrl) -> Self` | Initializes a webview window builder with the given label. |
| from_config | `pub fn from_config(manager: &'a M, config: &WindowConfig) -> Result<Self>` | Initializes from a `WindowConfig` of tauri.conf.json. Two windows cannot share a `label`. |
| on_menu_event | `pub fn on_menu_event<F: Fn(&Window<R>, MenuEvent) + Send + Sync + 'static>(self, f: F) -> Self` | `desktop` only. Registers a menu event listener (called for any menu event; not called if the window used to register it was closed). |
| on_web_resource_request | `pub fn on_web_resource_request<F: Fn(Request<Vec<u8>>, &mut Response<Cow<'static, [u8]>>) + Send + Sync + 'static>(self, f: F) -> Self` | Runs when the webview makes an HTTP request for a web resource, letting you modify the response. Only implemented for the `tauri` URI protocol. |
| on_navigation | `pub fn on_navigation<F: Fn(&Url) -> bool + Send + 'static>(self, f: F) -> Self` | Runs when the webview navigates to a URL; return `false` to cancel. |
| on_new_window | `pub fn on_new_window<F: Fn(Url, NewWindowFeatures) -> NewWindowResponse<R> + Send + 'static>(self, f: F) -> Self` | New window request handler for `window.open`; decides whether the incoming URL may be opened. Android / iOS: not supported. |
| on_document_title_changed | `pub fn on_document_title_changed<F: Fn(WebviewWindow<R>, String) + Send + 'static>(self, f: F) -> Self` | Runs when the document title changes (may run before or after the navigation event). |
| on_download | `pub fn on_download<F: Fn(Webview<R>, DownloadEvent<'_>) -> bool + Send + Sync + 'static>(self, f: F) -> Self` | Download event handler; returning `false` on `DownloadEvent::Requested` prevents the download. |
| on_page_load | `pub fn on_page_load<F: Fn(WebviewWindow<R>, PageLoadPayload<'_>) + Send + Sync + 'static>(self, f: F) -> Self` | Runs on page load events (`PageLoadEvent::Started` / `Finished`). |
| on_permission_request | `pub fn on_permission_request<F: Fn(Webview<R>, PermissionKind) -> PermissionResponse + Send + Sync + 'static>(self, f: F) -> Self` | Runs when a permission is requested. |
| build | `pub fn build(self) -> Result<WebviewWindow<R>>` | Creates a new window. |

Desktop APIs (`desktop` only):

| Method | Signature | Description |
| --- | --- | --- |
| menu | `pub fn menu(self, menu: Menu<R>) -> Self` | Sets the menu for the window. |
| center | `pub fn center(self) -> Self` | Show window in the center of the screen. |
| prevent_overflow | `pub fn prevent_overflow(self) -> Self` | Prevent the window from overflowing the working area on creation. |
| prevent_overflow_with_margin | `pub fn prevent_overflow_with_margin(self, margin: impl Into<Size>) -> Self` | Same, with a margin. |
| maximizable / minimizable / closable | `pub fn maximizable(self, maximizable: bool) -> Self` (same shape for the others) | Whether the native maximize / minimize / close button is enabled. |
| fullscreen | `pub fn fullscreen(self, fullscreen: bool) -> Self` | Start the window in fullscreen. |
| focused | `pub fn focused(self, focused: bool) -> Self` | Whether the window is initially focused. |
| maximized | `pub fn maximized(self, maximized: bool) -> Self` | Maximize upon creation. |
| decorations | `pub fn decorations(self, decorations: bool) -> Self` | Whether the window has borders and bars. |
| always_on_bottom / always_on_top | `pub fn always_on_top(self, always_on_top: bool) -> Self` | Always below / on top of other windows. |
| visible_on_all_workspaces | `pub fn visible_on_all_workspaces(self, visible_on_all_workspaces: bool) -> Self` | Visible on all workspaces or virtual desktops. |
| icon | `pub fn icon(self, icon: Image<'a>) -> Result<Self>` | Sets the window icon. |
| skip_taskbar | `pub fn skip_taskbar(self, skip: bool) -> Self` | Hide the window icon from the taskbar. macOS: unsupported. |
| window_classname | `pub fn window_classname<S: Into<String>>(self, classname: S) -> Self` | Custom name for Windows' window class. Windows only. |
| no_redirection_bitmap | `pub fn no_redirection_bitmap(self, enable: bool) -> Self` | Sets `WS_EX_NOREDIRECTIONBITMAP`; avoids the white flash with transparent windows. Windows only. |
| shadow | `pub fn shadow(self, enable: bool) -> Self` | Whether the window has a shadow. Linux: unsupported. |
| parent | `pub fn parent(self, parent: &WebviewWindow<R>) -> Result<Self>` | Sets a parent (owner on Windows, transient on Linux, child window on macOS). |
| transient_for / transient_for_raw | `pub fn transient_for(self, parent: &WebviewWindow<R>) -> Result<Self>` / `pub fn transient_for_raw(self, parent: &impl IsA<Window>) -> Self` | DragonFly BSD / FreeBSD / Linux / NetBSD / OpenBSD only. Transient for parent. |
| effects | `pub fn effects(self, effects: WindowEffectsConfig) -> Self` | Sets window effects; requires a transparent window. Linux: unsupported. |

Window APIs:

| Method | Signature | Description |
| --- | --- | --- |
| position | `pub fn position(self, x: f64, y: f64) -> Self` | Initial position in logical pixels. |
| inner_size | `pub fn inner_size(self, width: f64, height: f64) -> Self` | Window size in logical pixels. |
| min_inner_size / max_inner_size | `pub fn min_inner_size(self, min_width: f64, min_height: f64) -> Self` | Min / max inner size in logical pixels. |
| inner_size_constraints | `pub fn inner_size_constraints(self, constraints: WindowSizeConstraints) -> Self` | Inner size constraints. |
| resizable | `pub fn resizable(self, resizable: bool) -> Self` | Whether resizable; when `false` the native maximize button is disabled. |
| title | `pub fn title<S: Into<String>>(self, title: S) -> Self` | Title in the title bar. |
| focus | `pub fn focus(self) -> Self` | Deprecated since 1.2.0; will be removed in 3.0.0. Use `focused` (windows are focused by default). |
| focusable | `pub fn focusable(self, focusable: bool) -> Self` | Whether focusable. |
| visible | `pub fn visible(self, visible: bool) -> Self` | Immediately visible upon creation. |
| theme | `pub fn theme(self, theme: Option<Theme>) -> Self` | Force a theme, or use system settings if `None`. macOS 10.14+. |
| content_protected | `pub fn content_protected(self, protected: bool) -> Self` | Prevents window contents from being captured by other apps. |

Webview attributes:

| Method | Signature | Description |
| --- | --- | --- |
| accept_first_mouse | `pub fn accept_first_mouse(self, accept: bool) -> Self` | Whether clicking an inactive window also clicks through to the webview. |
| initialization_script | `pub fn initialization_script(self, script: impl Into<String>) -> Self` | JS run before the document is parsed; main frame only. |
| initialization_script_for_all_frames | `pub fn initialization_script_for_all_frames(self, script: impl Into<String>) -> Self` | Same, on all frames. |
| user_agent | `pub fn user_agent(self, user_agent: &str) -> Self` | User agent for the webview. |
| additional_browser_args | `pub fn additional_browser_args(self, additional_args: &str) -> Self` | Additional webview arguments. Windows only. |
| data_directory | `pub fn data_directory(self, data_directory: PathBuf) -> Self` | Data directory for the webview. |
| disable_drag_drop_handler | `pub fn disable_drag_drop_handler(self) -> Self` | Disables the drag and drop handler used to generate `DragDropEvent`s (required for HTML5 drag and drop on Windows). |
| enable_clipboard_access | `pub fn enable_clipboard_access(self) -> Self` | Enables clipboard access for the page on Linux and Windows. |
| incognito | `pub fn incognito(self, incognito: bool) -> Self` | Incognito mode. Android: unsupported. |
| auto_resize | `pub fn auto_resize(self) -> Self` | Webview grows / shrinks with the parent window. |
| proxy_url | `pub fn proxy_url(self, url: Url) -> Self` | Proxy URL (`http://` or `socks5://`) for all network requests. |
| transparent | `pub fn transparent(self, transparent: bool) -> Self` | Transparent window. |
| zoom_hotkeys_enabled | `pub fn zoom_hotkeys_enabled(self, enabled: bool) -> Self` | Page zoom by hotkeys / mousewheel. |
| browser_extensions_enabled | `pub fn browser_extensions_enabled(self, enabled: bool) -> Self` | Browser extensions in the webview process. Windows only. |
| extensions_path | `pub fn extensions_path(self, path: impl AsRef<Path>) -> Self` | Path to load extensions from. |
| data_store_identifier | `pub fn data_store_identifier(self, data_store_identifier: [u8; 16]) -> Self` | Custom data store identifier. macOS >= 14 / iOS >= 17. |
| use_https_scheme | `pub fn use_https_scheme(self, enabled: bool) -> Self` | Custom protocols use `https://<scheme>.localhost` on Windows and Android. Defaults to `false`. |
| devtools | `pub fn devtools(self, enabled: bool) -> Self` | Web inspector. Enabled by default in debug builds; release builds require the `devtools` Cargo feature. |
| background_color | `pub fn background_color(self, color: Color) -> Self` | Window and webview background color. |
| background_throttling | `pub fn background_throttling(self, policy: BackgroundThrottlingPolicy) -> Self` | Background throttling behaviour. |
| disable_javascript | `pub fn disable_javascript(self) -> Self` | Disable JavaScript. |
| scroll_bar_style | `pub fn scroll_bar_style(self, style: ScrollBarStyle) -> Self` | Native scrollbar style. |
| general_autofill_enabled | `pub fn general_autofill_enabled(self, enabled: bool) -> Self` | General autofill (not password / credit card). Default `true`. |
| limit_navigations_to_app_bound_domains | `pub fn limit_navigations_to_app_bound_domains(self, limit_navigations: bool) -> Self` | iOS App-Bound Domains. Default `false`. |
| with_related_view | `pub fn with_related_view(self, related_view: WebView) -> Self` | `wry` and DragonFly BSD / FreeBSD / Linux / NetBSD / OpenBSD only. Shares the web process with the provided webview. |
| window_features | `pub fn window_features(self, features: NewWindowFeatures) -> Self` | DragonFly BSD / FreeBSD / Linux / macOS / NetBSD / OpenBSD / Windows only. Sets window features (e.g. with `on_new_window`). |

## Notes

- The `open_window_multiple` example needs the external `getrandom` crate and uses a single random byte as the label suffix, so labels can collide (`build()` then fails with `Error::WindowLabelAlreadyExists` and the `unwrap()` panics); use a counter or a longer unique id in real apps.
- `visible_on_all_workspaces`: the WindowBuilder rustdoc lists Windows / iOS / Android as unsupported; the WebviewWindowBuilder rustdoc omits this note.
- Known issue: on Windows, `new` and `from_config` deadlock when used in a synchronous command or in event handlers (Webview2 issue). Use `async` commands and separate threads when creating windows.
- `from_config`: a window with the same `label` cannot be created twice; close the initial window or change the label of the cloned `WindowConfig`.
- `on_web_resource_request`: currently not executed for external URLs such as a development server; always check the request URL.
- `on_permission_request`: only triggers for new permission requests; persistent user choices made in the webview are reused. Windows: WebView2 PermissionRequested; macOS / iOS: WKUIDelegate requestMediaCapturePermission; Linux: WebKitGTK permission-request signal; Android: JNI bridge for geolocation, microphone, camera, protected media and MIDI (Android runtime permissions may still trigger native OS prompts).
- `additional_browser_args`: webview instances with different browser arguments must also have different data directories. By default wry passes `--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection`; if you use this method, disable those components yourself if desired. macOS / Linux / Android / iOS: unsupported.
- `use_https_scheme`: an `https` scheme does NOT allow mixed content when fetching `http` endpoints; changing the value between releases changes the IndexedDB, cookies and localStorage location, so the app cannot access the old data.
- `devtools`: works in debug builds; the `devtools` feature flag is required in release builds. macOS calls private functions; Android: open `chrome://inspect/#devices` in Chrome; iOS: Safari > Develop.
- `background_throttling`: iOS 17.0+ and macOS 14.0+ only; Linux / Windows / Android unsupported.
- `scroll_bar_style`: Windows `ScrollBarStyle::FluentOverlay` requires WebView2 Runtime 125.0.2535.41 or higher and must be the same for all webviews targeting the same data directory; other platforms support only `Default`.
- `zoom_hotkeys_enabled`: Windows controls WebView2 `IsZoomControlEnabled`; macOS / Linux inject a polyfill (20% steps from 20% to 1000%) requiring the `core:webview:allow-set-webview-zoom` permission; Android / iOS unsupported.
- `limit_navigations_to_app_bound_domains` with `true`: add `localhost` and any registrable domains to `src-tauri/Info.ios.plist` under `WKAppBoundDomains` (the rustdoc says `tauri-src/`, a typo; the config schema uses `src-tauri/`). iOS 14.0+ only.
- Custom protocol Origin: macOS, iOS and Linux use `<scheme>://localhost/<path>`; Windows and Android use `http://<scheme>.localhost/<path>` by default.
- Tauri `WebviewWindow` builder (Rust core), not Electron's `BrowserWindow`; see the electron skill. Tauri capabilities / permissions (ACL) for window APIs are documented in the security category.

## Related

- [WebviewWindow](./webview-window.md)
- [Webview](./webview.md)
- [Window](./window.md)
- [Menu](./menu.md)
- [Manager](./manager.md)
