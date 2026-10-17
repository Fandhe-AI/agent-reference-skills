---
source: https://docs.rs/tauri/2.12.4/tauri/webview/struct.WebviewWindow.html
---

# WebviewWindow

A type that wraps a `Window` together with a `Webview`. Obtained from `Manager::get_webview_window` or built with `WebviewWindowBuilder`.

## Signature / Usage

```rust
pub struct WebviewWindow<R: Runtime = Wry> { /* private fields */ }
```

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)]
    app.get_webview_window("main").unwrap().open_devtools();
    Ok(())
  });
```

Resolve a command scope:

```rust
use tauri::ipc::CommandScope;

#[derive(Debug, serde::Deserialize)]
struct ScopeType {
  some_value: String,
}
#[tauri::command]
fn my_command(scope: CommandScope<ScopeType>) {
  // check scope
}
```

Convert a file path to a URL loadable by the webview:

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    let webview = app.get_webview_window("main").unwrap();
    let video_path = app.path().app_data_dir()?.join("video.mp4");
    let url = webview.convert_file_src(&video_path, None)?;
    webview.eval(format!("document.querySelector('video').src = '{url}'"))?;
    Ok(())
  });
```

## Methods

Base:

| Method | Signature | Description |
| --- | --- | --- |
| builder | `pub fn builder<M: Manager<R>, L: Into<String>>(manager: &M, label: L, url: WebviewUrl) -> WebviewWindowBuilder<'_, R, M>` | Initializes a `WebviewWindowBuilder`. Data URLs need the `webview-data-url` feature. |
| run_on_main_thread | `pub fn run_on_main_thread<F: FnOnce() + Send + 'static>(&self, f: F) -> Result<()>` | Runs the closure on the main thread. |
| label | `pub fn label(&self) -> &str` | The webview label. |
| on_window_event | `pub fn on_window_event<F: Fn(&WindowEvent) + Send + 'static>(&self, f: F)` | Registers a window event listener. |
| on_webview_event | `pub fn on_webview_event<F: Fn(&WebviewEvent) + Send + 'static>(&self, f: F)` | Registers a webview event listener. |
| resolve_command_scope | `pub fn resolve_command_scope<T: ScopeObject>(&self, plugin: &str, command: &str) -> Result<Option<ResolvedScope<T>>>` | Resolves the command scope for the currently loaded URL; `None` if the command is not allowed; error if the scope cannot be deserialized. |

Menu (`desktop` only): `on_menu_event(f: Fn(&Window<R>, MenuEvent))`, `menu() -> Option<Menu<R>>`, `set_menu(menu: Menu<R>) -> Result<Option<Menu<R>>>`, `remove_menu() -> Result<Option<Menu<R>>>`, `hide_menu() -> Result<()>`, `show_menu() -> Result<()>`, `is_menu_visible() -> Result<bool>`, `popup_menu<M: ContextMenu>(&self, menu: &M) -> Result<()>` (at cursor position), `popup_menu_at<M: ContextMenu, P: Into<Position>>(&self, menu: &M, position: P) -> Result<()>` (position relative to the window's top-left corner).

Getters (all `Result<..>`):

| Method | Return | Description |
| --- | --- | --- |
| scale_factor | `f64` | Scale factor to map logical pixels to physical pixels and vice versa. |
| inner_position | `PhysicalPosition<i32>` | Top-left of the client area relative to the desktop. |
| outer_position | `PhysicalPosition<i32>` | Top-left of the window relative to the desktop. |
| inner_size | `PhysicalSize<u32>` | Physical size of the client area (excluding title bar and borders). |
| outer_size | `PhysicalSize<u32>` | Physical size of the entire window. |
| is_fullscreen / is_minimized / is_maximized / is_focused / is_decorated / is_resizable / is_enabled / is_visible | `bool` | Current state. |
| is_always_on_top | `bool` | iOS / Android: unsupported. |
| is_maximizable / is_minimizable / is_closable | `bool` | Native button state. Linux / iOS / Android: unsupported. |
| title | `String` | Current title. |
| current_monitor / primary_monitor | `Option<Monitor>` | Monitor the window resides on / primary monitor. |
| monitor_from_point(x: f64, y: f64) | `Option<Monitor>` | Monitor containing the point. |
| available_monitors | `Vec<Monitor>` | All monitors. |
| gtk_window | `ApplicationWindow` | DragonFly BSD / FreeBSD / Linux / NetBSD / OpenBSD only; main thread only. |
| default_vbox | `Box` | Same platforms; the default vertical `gtk::Box`. |
| theme | `Theme` | Current theme. macOS 10.14+. |
| cursor_position | `PhysicalPosition<f64>` | `desktop` only. Cursor position relative to the desktop's top-left. |

Desktop setters and actions (`desktop` only, all `Result<()>`):

| Method | Signature | Description |
| --- | --- | --- |
| center | `pub fn center(&self)` | Centers the window. |
| request_user_attention | `pub fn request_user_attention(&self, request_type: Option<UserAttentionType>)` | Requests user attention; `None` unsets (macOS: no effect). |
| set_maximizable / set_minimizable / set_closable | `(&self, bool)` | Enable the native button. Linux / iOS / Android unsupported. |
| maximize / unmaximize / minimize / unminimize | `(&self)` | Window state actions. |
| set_decorations | `(&self, decorations: bool)` | Decorated or not. |
| set_shadow | `(&self, enable: bool)` | Shadow. Linux: unsupported. |
| set_effects | `pub fn set_effects<E: Into<Option<WindowEffectsConfig>>>(&self, effects: E)` | Window effects; `None` clears. Requires a transparent window. Linux: unsupported. |
| set_always_on_bottom / set_always_on_top | `(&self, bool)` | Z-order. |
| set_visible_on_all_workspaces | `(&self, bool)` | Visible on all workspaces. |
| set_fullscreen | `(&self, fullscreen: bool)` | Fullscreen. |
| set_fullscreen_on_monitor | `(&self, position: PhysicalPosition<f64>)` | Fullscreen on the monitor containing the position; nothing if none. |
| set_simple_fullscreen | `(&self, enable: bool)` | Fullscreen without a new macOS space; other platforms fall back to `set_fullscreen`. |
| set_icon | `(&self, icon: Image<'_>)` | Window icon. |
| set_skip_taskbar | `(&self, skip: bool)` | macOS: unsupported. |
| set_cursor_grab | `(&self, grab: bool)` | Linux: unsupported. |
| set_cursor_visible | `(&self, visible: bool)` | Cursor visibility. |
| set_cursor_icon | `(&self, icon: CursorIcon)` | Cursor icon. |
| set_cursor_position | `pub fn set_cursor_position<Pos: Into<Position>>(&self, position: Pos)` | Cursor position in window coordinates. |
| set_ignore_cursor_events | `(&self, ignore: bool)` | Ignore cursor events. |
| start_dragging | `(&self)` | Starts dragging the window. |
| set_badge_count | `(&self, count: Option<i64>)` | Taskbar badge count; `0` or `None` removes. |
| set_progress_bar | `(&self, progress_state: ProgressBarState)` | Taskbar progress state. |
| set_title_bar_style | `(&self, style: TitleBarStyle)` | macOS only. |
| print | `(&self)` | Opens the print dialog; currently only supported on macOS on `wry` (`window.print()` works everywhere). |

Window setters and actions (all `Result<()>`):

| Method | Signature | Description |
| --- | --- | --- |
| set_resizable | `(&self, resizable: bool)` | When `false`, the native maximize button is disabled. |
| set_enabled | `(&self, enabled: bool)` | Enable or disable the window. |
| set_title | `(&self, title: &str)` | Title. |
| show / hide | `(&self)` | Show / hide. |
| close | `(&self)` | Closes the window; emits `WindowEvent::CloseRequested` first so you can intercept it. |
| destroy | `(&self)` | Force closes without emitting any events. |
| set_content_protected | `(&self, protected: bool)` | Prevent capture by other apps. |
| set_size | `pub fn set_size<S: Into<Size>>(&self, size: S)` | Resizes. |
| set_min_size / set_max_size | `pub fn set_min_size<S: Into<Size>>(&self, size: Option<S>)` | Min / max inner size. |
| set_size_constraints | `(&self, constraints: WindowSizeConstraints)` | Size constraints. |
| set_position | `pub fn set_position<Pos: Into<Position>>(&self, position: Pos)` | Position. |
| set_focus | `(&self)` | Bring to front and focus. |
| set_focusable | `(&self, focusable: bool)` | Whether focusable. |
| set_background_color | `(&self, color: Option<Color>)` | Window background color. |
| set_theme | `(&self, theme: Option<Theme>)` | Theme. |

Webview APIs:

| Method | Signature | Description |
| --- | --- | --- |
| with_webview | `pub fn with_webview<F: FnOnce(PlatformWebview) + Send + 'static>(&self, f: F) -> Result<()>` | `wry` only. Runs a closure on the main thread with the platform webview handle. |
| url | `pub fn url(&self) -> Result<Url>` | Current URL. |
| navigate | `pub fn navigate(&self, url: Url) -> Result<()>` | Navigates the webview. |
| reload | `pub fn reload(&self) -> Result<()>` | Reloads the page. |
| convert_file_src | `pub fn convert_file_src<P: AsRef<Path>>(&self, path: P, protocol: Option<&str>) -> Result<String>` | Rust equivalent of JS `convertFileSrc`. |
| on_message | `pub fn on_message(self, request: InvokeRequest, responder: Box<OwnedInvokeResponder<R>>)` | Handles an `InvokeRequest`. |
| eval | `pub fn eval(&self, js: impl Into<String>) -> Result<()>` | Evaluates JavaScript. |
| eval_with_callback | `pub fn eval_with_callback(&self, js: impl Into<String>, callback: impl Fn(String) + Send + 'static) -> Result<()>` | Evaluates JS; the result is serialized to a JSON string and passed to the callback. |
| open_devtools / close_devtools | `pub fn open_devtools(&self)` | Debug-assertions or `devtools` feature only. |
| is_devtools_open | `pub fn is_devtools_open(&self) -> bool` | Same availability. |
| set_zoom | `pub fn set_zoom(&self, scale_factor: f64) -> Result<()>` | Webview zoom level. |
| clear_all_browsing_data | `pub fn clear_all_browsing_data(&self) -> Result<()>` | Clears all browsing data. |
| cookies_for_url | `pub fn cookies_for_url(&self, url: Url) -> Result<Vec<Cookie<'static>>>` | Cookies in the runtime's store for the URL, including HTTP-only and secure. |
| cookies | `pub fn cookies(&self) -> Result<Vec<Cookie<'static>>>` | All cookies for all URLs. |
| set_cookie / delete_cookie | `pub fn set_cookie(&self, cookie: Cookie<'_>) -> Result<()>` | Set / delete a cookie. |

Trait implementations: `AsRef<Webview<R>>`, `Clone`, `CommandArg` (usable as a command argument), `Debug`, `Emitter<R>`, `Eq`, `PartialEq`, `FunctionArg` (feature `specta`), `HasDisplayHandle`, `HasWindowHandle`, `Listener<R>`, `Manager<R>`.

## Notes

- `set_menu` / `remove_menu` / `hide_menu` / `show_menu` / `is_menu_visible` on macOS are unsupported: the menu is app-wide; use `AppHandle::set_menu` / `remove_menu` instead.
- `cookies` / `cookies_for_url`: only return cookies for http / https URLs; cookies set via JavaScript for local files (e.g. the `tauri://` protocol) are not supported. On Windows these deadlock in synchronous commands or event handlers (Webview2 issue); use `async` commands and separate threads. Android: unsupported, always returns an empty `Vec`. The `cookie` crate dependency may be updated in minor Tauri releases.
- `convert_file_src`: requires the `protocol-asset` Cargo feature and the file in the `app.security.assetProtocol` scope; the protocol origin must be allowed by the `app.security.csp` directive (e.g. `img-src 'self' asset: http://asset.localhost`). Windows / Android URL is `http://{protocol}.localhost/{path}` (`https://` with `use_https_scheme`); macOS, Linux, iOS: `{protocol}://localhost/{path}`. Returns `Error::NonUtf8Path` for non-UTF-8 paths.
- `with_webview`: `webview2-com`, `webkit2gtk`, `objc2_web_kit` and similar crates may be updated in minor Tauri releases; pin Tauri to at least a minor version.
- `eval_with_callback`: exceptions are ignored because of a Windows limitation; catch them yourself and return a string.
- `open_devtools` / `close_devtools` / `is_devtools_open` on macOS: 10.15+ and a private API, so not usable if the app is published on the App Store; Windows: `close_devtools` and `is_devtools_open` unsupported.
- `set_zoom`: Android unsupported; macOS 11+; iOS 14+.
- `set_progress_bar`: Linux / macOS progress bar is app-wide; Linux only on desktop environments with `libunity` (e.g. GNOME).
- `set_badge_count`: Windows unsupported (use `set_overlay_icon`); Android unsupported; iOS value clamped to i32.
- `set_overlay_icon` is Windows-only and is not rendered on docs.rs (Linux build); the JS counterpart is `setOverlayIcon` (requires `core:window:allow-set-overlay-icon`).
- iOS / Android remarks on desktop-only methods (e.g. `set_badge_count`, `set_maximizable`) are copied verbatim from the rustdoc platform notes.
- `set_theme`: Linux / macOS theme is app-wide.
- Tauri `WebviewWindow` (Rust core), not Electron's `BrowserWindow`; see the electron skill. Window / webview commands called from JavaScript are gated by Tauri capabilities / permissions (ACL) (security category).

## Related

- [WebviewWindowBuilder](./webview-window-builder.md)
- [Webview](./webview.md)
- [Window](./window.md)
- [Manager](./manager.md)
- [Events](./events.md)
