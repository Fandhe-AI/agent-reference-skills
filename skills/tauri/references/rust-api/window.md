---
source: https://docs.rs/tauri/2.12.4/tauri/window/struct.WindowBuilder.html
---

# WindowBuilder / Window

`WindowBuilder` (feature `unstable`) builds a window without any webview attached; `Window` (feature `wry`) is a window managed by Tauri. `Window` also implements `Manager`, so it can manage other windows attached to the same application. Use `WebviewWindowBuilder` for a window with a single webview filling it.

## Signature / Usage

```rust
pub struct WindowBuilder<'a, R: Runtime, M: Manager<R>> { /* private fields */ }   // feature `unstable` only
pub struct Window<R: Runtime = Wry> { /* private fields */ }                        // feature `wry` only
```

Create a window in the setup hook:

```rust
tauri::Builder::default()
  .setup(|app| {
    let window = tauri::window::WindowBuilder::new(app, "label")
      .build()?;
    Ok(())
  });
```

Create a window with `Window::builder` and split it between two webviews:

```rust
use tauri::{LogicalPosition, LogicalSize, WebviewUrl};

tauri::Builder::default()
  .setup(|app| {
    let width = 800.;
    let height = 600.;

    let window = tauri::Window::builder(app, "main")
      .inner_size(width, height)
      .build()?;

    let _left = window.add_child(
      tauri::webview::WebviewBuilder::new("left", WebviewUrl::App(Default::default()))
        .auto_resize(),
      LogicalPosition::new(0., 0.),
      LogicalSize::new(width / 2., height),
    )?;

    let _right = window.add_child(
      tauri::webview::WebviewBuilder::new(
        "right",
        WebviewUrl::External("https://tauri.app".parse().unwrap()),
      )
      .auto_resize(),
      LogicalPosition::new(width / 2., 0.),
      LogicalSize::new(width / 2., height),
    )?;

    Ok(())
  });
```

## Methods

`WindowBuilder` (constructors, hooks, and all window / desktop options also present on [WebviewWindowBuilder](./webview-window-builder.md)):

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new<L: Into<String>>(manager: &'a M, label: L) -> Self` | Initializes a window builder with the given label. |
| from_config | `pub fn from_config(manager: &'a M, config: &WindowConfig) -> Result<Self>` | Initializes from a `WindowConfig`; two windows cannot share a `label`. |
| on_menu_event | `pub fn on_menu_event<F: Fn(&Window<R>, MenuEvent) + Send + Sync + 'static>(self, f: F) -> Self` | `desktop` only. Menu event listener. |
| build | `pub fn build(self) -> Result<Window<R>>` | Creates a new window. |
| menu, center, prevent_overflow, prevent_overflow_with_margin, maximizable, minimizable, closable, fullscreen, maximized, decorations, always_on_bottom, always_on_top, visible_on_all_workspaces, icon, skip_taskbar, window_classname, no_redirection_bitmap, shadow, parent, transient_for, transient_for_raw, effects | same signatures as on `WebviewWindowBuilder` (`parent` / `transient_for` take `&Window<R>`) | `desktop` only. |
| position, inner_size, min_inner_size, max_inner_size, inner_size_constraints, resizable, title, focus (deprecated), focused, focusable, visible, theme, transparent, content_protected, background_color | same signatures as on `WebviewWindowBuilder` | Window APIs. `background_color(self, color: Color)` sets the window and webview background color. |

`Window`:

| Method | Signature | Description |
| --- | --- | --- |
| builder | `pub fn builder<M: Manager<R>, L: Into<String>>(manager: &M, label: L) -> WindowBuilder<'_, R, M>` | `unstable` only. Creates a window without any webview; add webviews with `add_child`. |
| add_child | `pub fn add_child<P: Into<Position>, S: Into<Size>>(&self, webview_builder: WebviewBuilder<R>, position: P, size: S) -> Result<Webview<R>>` | `desktop` and `unstable` only. Adds a webview as a child (multiwebview API). `position` is relative to the top-left of the window's client area; logical or physical units. |
| webviews | `pub fn webviews(&self) -> Vec<Webview<R>>` | Webviews associated with this window. |
| run_on_main_thread | `pub fn run_on_main_thread<F: FnOnce() + Send + 'static>(&self, f: F) -> Result<()>` | Runs the closure on the main thread. |
| label | `pub fn label(&self) -> &str` | The label of this window. |
| on_window_event | `pub fn on_window_event<F: Fn(&WindowEvent) + Send + 'static>(&self, f: F)` | Registers a window event listener. |
| on_menu_event, menu, set_menu, remove_menu, hide_menu, show_menu, is_menu_visible, popup_menu, popup_menu_at | same as the menu APIs of [WebviewWindow](./webview-window.md) | `desktop` only. |
| scale_factor, inner_position, outer_position, inner_size, outer_size, is_fullscreen, is_minimized, is_maximized, is_focused, is_decorated, is_resizable, is_enabled, is_always_on_top, is_maximizable, is_minimizable, is_closable, is_visible, title, current_monitor, monitor_from_point, primary_monitor, available_monitors, gtk_window, default_vbox, theme, cursor_position | same getters as on `WebviewWindow` | Window getters. |
| set_resizable, set_title, set_enabled, show, hide, close, destroy, set_background_color, set_content_protected, set_size, set_min_size, set_max_size, set_size_constraints, set_position, set_focus, set_focusable, set_theme | same setters and actions as on `WebviewWindow` | Window setters and actions. |
| center, request_user_attention, set_maximizable, set_minimizable, set_closable, maximize, unmaximize, minimize, unminimize, set_decorations, set_shadow, set_effects, set_always_on_bottom, set_always_on_top, set_visible_on_all_workspaces, set_fullscreen, set_fullscreen_on_monitor, set_simple_fullscreen, set_icon, set_skip_taskbar, set_cursor_grab, set_cursor_visible, set_cursor_icon, set_cursor_position, set_ignore_cursor_events, start_dragging, set_badge_count, set_progress_bar, set_title_bar_style | same desktop setters and actions as on `WebviewWindow` | `desktop` only. |
| start_resize_dragging | `pub fn start_resize_dragging(&self, direction: ResizeDirection) -> Result<()>` | `desktop` only. Starts resize-dragging the window. |

Trait implementations of `Window`: `Clone`, `CommandArg` (usable as a command argument), `Debug`, `Emitter<R>`, `Eq`, `PartialEq`, `Hash`, `FunctionArg` (feature `specta`), `HasDisplayHandle`, `HasWindowHandle`, `Listener<R>`, `Manager<R>`.

The `tauri::window` module also contains `Color` (RGBA tuple struct, each value 0 to 255), `EffectsBuilder` (builder for `WindowEffectsConfig`), `Monitor`, `ProgressBarState` (Linux / macOS / Windows), enums `Effect` (platform-specific window effects), `EffectState` (macOS only), `ProgressBarStatus` (`desktop`).

## Notes

- Known issue: on Windows, `WindowBuilder::new`, `from_config`, `Window::builder` and `add_child` deadlock in synchronous commands and event handlers (Webview2 issue). Use `async` commands and separate threads.
- `WindowBuilder::visible_on_all_workspaces`: Windows / iOS / Android unsupported.
- `add_child`: the webview is not resized or moved when the parent window resizes unless auto resize is enabled (`WebviewBuilder::auto_resize` or `Webview::set_auto_resize`).
- `close` emits `WindowEvent::CloseRequested` first so it can be intercepted; `destroy` does not emit any events and force closes.
- `set_menu` / `remove_menu` / `hide_menu` / `show_menu` on macOS are unsupported (the menu is app-wide; use `AppHandle::set_menu`).
- Platform-specific notes of the other methods match those on the WebviewWindow and WebviewWindowBuilder pages (e.g. `set_focusable(false)` on macOS cannot unfocus an already focused window; `set_badge_count` is unsupported on Windows and Android; `set_theme` is app-wide on Linux / macOS).
- Tauri windows (Rust core + system WebView), not Electron's `BrowserWindow`; see the electron skill. Window commands from JavaScript are gated by Tauri capabilities / permissions (ACL) (security category).

## Related

- [WebviewWindowBuilder](./webview-window-builder.md)
- [WebviewWindow](./webview-window.md)
- [Webview](./webview.md)
- [Menu](./menu.md)
