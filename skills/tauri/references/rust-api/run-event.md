---
source: https://docs.rs/tauri/2.12.4/tauri/enum.RunEvent.html
---

# RunEvent

An application event, triggered from the event loop. See `App::run` for usage examples.

## Signature / Usage

```rust
#[non_exhaustive]pub enum RunEvent {
    Exit,
    #[non_exhaustive]    ExitRequested {
        code: Option<i32>,
        api: ExitRequestApi,
    },
    #[non_exhaustive]    WindowEvent {
        label: String,
        event: WindowEvent,
    },
    #[non_exhaustive]    WebviewEvent {
        label: String,
        event: WebviewEvent,
    },
    Ready,
    Resumed,
    MainEventsCleared,
    MenuEvent(MenuEvent),
    TrayIconEvent(TrayIconEvent),
}
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

## Options / Props

| Variant | Fields | Description |
| --- | --- | --- |
| Exit | — | Event loop is exiting. |
| ExitRequested | `code: Option<i32>`, `api: ExitRequestApi` | The app is about to exit. `code` is `None` when requested by user interaction, `Some` when requested programmatically via `AppHandle::exit` or `AppHandle::restart`. `api` is the event API. |
| WindowEvent | `label: String`, `event: WindowEvent` | An event associated with a window (the window label and the detailed event). |
| WebviewEvent | `label: String`, `event: WebviewEvent` | An event associated with a webview. |
| Ready | — | Application ready. |
| Resumed | — | Sent if the event loop is being resumed. |
| MainEventsCleared | — | Emitted when all of the event loop's input events have been processed and redraw processing is about to begin. |
| MenuEvent(MenuEvent) | — | `desktop` only. An event from a menu item, on the window menu bar, application menu bar (macOS) or tray icon menu. |
| TrayIconEvent(TrayIconEvent) | — | `desktop` and feature `tray-icon` only. An event from a tray icon. |

## Notes

- docs.rs link text for the `ExitRequested` `code` description shows only `AppHandle`; the links target `AppHandle::exit` and `AppHandle::restart`.
- The enum and the `ExitRequested` / `WindowEvent` / `WebviewEvent` variants are `#[non_exhaustive]`: matching requires a wildcard arm, and the non-exhaustive variants cannot be constructed or matched exhaustively (use `..`).
- Tauri `RunEvent` (Rust core); not Electron's app lifecycle events, see the electron skill.

## Related

- [App](./app.md)
- [AppHandle](./app-handle.md)
- [Menu](./menu.md)
- [Tray](./tray.md)
