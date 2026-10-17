---
source: https://docs.rs/tauri/2.12.4/tauri/tray/struct.TrayIconBuilder.html
---

# tray module (TrayIconBuilder, TrayIconEvent)

Tray icon types and utilities. Available on `desktop` and crate feature `tray-icon` only. The module contains structs `TrayIcon` (`wry`; tray icon struct and associated methods), `TrayIconBuilder`, `TrayIconId` (unique id associated with a tray icon) and enums `MouseButton`, `MouseButtonState`, `TrayIconEvent`.

## Signature / Usage

```rust
pub struct TrayIconBuilder<R: Runtime> { /* private fields */ }

#[non_exhaustive]pub enum TrayIconEvent {
    Click {
        id: TrayIconId,
        position: PhysicalPosition<f64>,
        rect: Rect,
        button: MouseButton,
        button_state: MouseButtonState,
    },
    DoubleClick {
        id: TrayIconId,
        position: PhysicalPosition<f64>,
        rect: Rect,
        button: MouseButton,
    },
    Enter {
        id: TrayIconId,
        position: PhysicalPosition<f64>,
        rect: Rect,
    },
    Move {
        id: TrayIconId,
        position: PhysicalPosition<f64>,
        rect: Rect,
    },
    Leave {
        id: TrayIconId,
        position: PhysicalPosition<f64>,
        rect: Rect,
    },
}
```

## Methods

`TrayIconBuilder`:

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new() -> Self` | Creates a new tray icon builder. |
| with_id | `pub fn with_id<I: Into<TrayIconId>>(id: I) -> Self` | Creates a new tray icon builder with the specified id. |
| menu | `pub fn menu<M: ContextMenu>(self, menu: &M) -> Self` | Set a menu for this tray icon. |
| icon | `pub fn icon(self, icon: Image<'_>) -> Self` | Set an icon for this tray icon. |
| tooltip | `pub fn tooltip<S: AsRef<str>>(self, s: S) -> Self` | Set a tooltip. Linux: unsupported. |
| title | `pub fn title<S: AsRef<str>>(self, title: S) -> Self` | Set the tray icon title. |
| temp_dir_path | `pub fn temp_dir_path<P: AsRef<Path>>(self, s: P) -> Self` | Set tray icon temp dir path. Linux only. |
| icon_as_template | `pub fn icon_as_template(self, is_template: bool) -> Self` | Use the icon as a template. macOS only. |
| menu_on_left_click | `pub fn menu_on_left_click(self, enable: bool) -> Self` | Deprecated since 2.2.0; use `show_menu_on_left_click`. |
| show_menu_on_left_click | `pub fn show_menu_on_left_click(self, enable: bool) -> Self` | Whether to show the tray menu on left click, default `true`. Linux: unsupported. |
| on_menu_event | `pub fn on_menu_event<F: Fn(&AppHandle<R>, MenuEvent) + Sync + Send + 'static>(self, f: F) -> Self` | Handler for menu events (called for any menu event, from this window, another window or the tray icon menu). |
| on_tray_icon_event | `pub fn on_tray_icon_event<F: Fn(&TrayIcon<R>, TrayIconEvent) + Sync + Send + 'static>(self, f: F) -> Self` | Handler for this tray icon's events. |
| id | `pub fn id(&self) -> &TrayIconId` | The unique id that will be assigned to the tray icon this builder will create. |
| build | `pub fn build<M: Manager<R>>(self, manager: &M) -> Result<TrayIcon<R>>` | Builds and adds a new `TrayIcon` to the system tray. |

| TrayIconEvent variant | Description |
| --- | --- |
| Click | A click happened on the tray icon (fields: `id`, `position`, `rect`, `button`, `button_state`). |
| DoubleClick | A double click happened on the tray icon. Windows only. |
| Enter | The mouse entered the tray icon region. |
| Move | The mouse moved over the tray icon region. |
| Leave | The mouse left the tray icon region. |

`TrayIconEvent::id(&self) -> &TrayIconId` returns the id of the tray icon that triggered the event. `position` is the physical position of the event; `rect` is the position and size of the tray icon.

## Notes

- Linux: the icon sometimes is not visible unless a menu is set (setting an empty `Menu` is enough). Once a menu is set it cannot be removed or replaced, but its content can change. The title is not shown unless there is an icon as well. `TrayIconEvent` is not emitted on Linux even though the icon is shown and still shows a context menu on right click.
- Windows: `title` is unsupported.
- `temp_dir_path`: on Linux the icon is written to disk, usually `$XDG_RUNTIME_DIR/tray-icon` or `$TEMP/tray-icon`.
- `TrayIconEvent` is `#[non_exhaustive]`.
- Tauri tray (Rust), not Electron's `Tray`; see the electron skill.

## Related

- [Menu](./menu.md)
- [Image](./image.md)
- [Builder](./builder.md)
- [RunEvent](./run-event.md)
