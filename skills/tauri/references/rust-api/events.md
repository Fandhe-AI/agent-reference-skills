---
source: https://docs.rs/tauri/2.12.4/tauri/trait.Emitter.html
---

# Emitter / Listener / Event / EventTarget

Traits for emitting and listening to events (`Emitter`, `Listener`), the received `Event`, and the `EventTarget` selector. Also see the docs.rs pages `trait.Listener.html`, `struct.Event.html` and `enum.EventTarget.html`.

## Signature / Usage

```rust
pub trait Emitter<R: Runtime>: ManagerBase<R> {
    // Provided methods
    fn emit<S: Serialize + Clone>(&self, event: &str, payload: S) -> Result<()> { ... }
    fn emit_str(&self, event: &str, payload: String) -> Result<()> { ... }
    fn emit_to<I, S>(&self, target: I, event: &str, payload: S) -> Result<()>
       where I: Into<EventTarget>,
             S: Serialize + Clone { ... }
    fn emit_str_to<I>(
        &self,
        target: I,
        event: &str,
        payload: String,
    ) -> Result<()>
       where I: Into<EventTarget> { ... }
    fn emit_filter<S, F>(
        &self,
        event: &str,
        payload: S,
        filter: F,
    ) -> Result<()>
       where S: Serialize + Clone,
             F: Fn(&EventTarget) -> bool { ... }
    fn emit_str_filter<F>(
        &self,
        event: &str,
        payload: String,
        filter: F,
    ) -> Result<()>
       where F: Fn(&EventTarget) -> bool { ... }
}
```

```rust
pub trait Listener<R: Runtime>: ManagerBase<R> {
    // Required methods
    fn listen<F>(&self, event: impl Into<String>, handler: F) -> EventId
       where F: Fn(Event) + Send + 'static;
    fn once<F>(&self, event: impl Into<String>, handler: F) -> EventId
       where F: FnOnce(Event) + Send + 'static;
    fn unlisten(&self, id: EventId);

    // Provided methods
    fn listen_any<F>(&self, event: impl Into<String>, handler: F) -> EventId
       where F: Fn(Event) + Send + 'static { ... }
    fn once_any<F>(&self, event: impl Into<String>, handler: F) -> EventId
       where F: FnOnce(Event) + Send + 'static { ... }
}
```

```rust
pub struct Event { /* private fields */ }
// pub fn id(&self) -> EventId       -- the EventId of the handler that was triggered
// pub fn payload(&self) -> &str     -- the event payload

#[non_exhaustive]pub enum EventTarget {
    Any,
    AnyLabel {
        label: String,
    },
    App,
    Window {
        label: String,
    },
    Webview {
        label: String,
    },
    WebviewWindow {
        label: String,
    },
}
```

Emit to all webviews:

```rust
use tauri::Emitter;

#[tauri::command]
fn synchronize(app: tauri::AppHandle) {
  // emits the synchronized event to all webviews
  app.emit("synchronized", ());
}
```

Emit to targets:

```rust
use tauri::{Emitter, EventTarget};

#[tauri::command]
fn download(app: tauri::AppHandle) {
  for i in 1..100 {
    std::thread::sleep(std::time::Duration::from_millis(150));
    // emit a download progress event to all listeners
    app.emit_to(EventTarget::any(), "download-progress", i);
    // emit an event to listeners that used App::listen or AppHandle::listen
    app.emit_to(EventTarget::app(), "download-progress", i);
    // emit an event to any webview/window/webviewWindow matching the given label
    app.emit_to("updater", "download-progress", i); // similar to using EventTarget::labeled
    app.emit_to(EventTarget::labeled("updater"), "download-progress", i);
    // emit an event to listeners that used WebviewWindow::listen
    app.emit_to(EventTarget::webview_window("updater"), "download-progress", i);
  }
}
```

Emit with a filter:

```rust
use tauri::{Emitter, EventTarget};

#[tauri::command]
fn download(app: tauri::AppHandle) {
  for i in 1..100 {
    std::thread::sleep(std::time::Duration::from_millis(150));
    // emit a download progress event to the updater window
    app.emit_filter("download-progress", i, |t| match t {
      EventTarget::WebviewWindow { label } => label == "updater",
      _ => false,
    });
  }
}
```

Listen:

```rust
use tauri::{Manager, Listener, Emitter};

#[tauri::command]
fn synchronize(window: tauri::Window) {
  // emits the synchronized event to all windows
  window.emit("synchronized", ());
}

tauri::Builder::default()
  .setup(|app| {
    app.listen("synchronized", |event| {
      println!("app is in sync");
    });
    Ok(())
  })
  .invoke_handler(tauri::generate_handler![synchronize]);
```

Unlisten:

```rust
use tauri::{Manager, Listener};

tauri::Builder::default()
  .setup(|app| {
    let handle = app.handle().clone();
    let handler = app.listen_any("ready", move |event| {
      println!("app is ready");

      // we no longer need to listen to the event
      // we also could have used `app.once_any` instead
      handle.unlisten(event.id());
    });

    // stop listening to the event when you do not need it anymore
    app.unlisten(handler);


    Ok(())
  });
```

## Options / Props

| Method | Description |
| --- | --- |
| emit | Emits an event to all targets. |
| emit_str | Like `emit` but the payload is json serialized. |
| emit_to | Emits an event to all targets matching the given target. |
| emit_str_to | Like `emit_to` but the payload is json serialized. |
| emit_filter | Emits an event to all targets based on the given filter. |
| emit_str_filter | Like `emit_filter` but the payload is json serialized. |
| listen | Listen to an emitted event on this manager. |
| once | Listen to an event on this manager only once. |
| unlisten | Remove an event listener. |
| listen_any | Listen to an emitted event to any target. |
| once_any | Listens once to an emitted event to any target. |

| EventTarget constructor | Resulting variant |
| --- | --- |
| `EventTarget::any()` | `Any`: any and all event targets |
| `EventTarget::app()` | `App`: `App` and `AppHandle` targets |
| `EventTarget::labeled(label)` | `AnyLabel`: any `Window`, `Webview` or `WebviewWindow` with this label |
| `EventTarget::window(label)` | `Window` target |
| `EventTarget::webview(label)` | `Webview` target |
| `EventTarget::webview_window(label)` | `WebviewWindow` target |

## Notes

- `listen`, `once`, `listen_any` and `once_any` panic if `event` contains characters other than alphanumeric, `-`, `/`, `:` and `_`.
- `Emitter` and `Listener` are implemented by `App`, `AppHandle`, `Webview`, `WebviewWindow` and `Window`. Neither trait is dyn compatible.
- `EventTarget` is `#[non_exhaustive]`.
- The upstream docs.rs unlisten example comment refers to `app.once_global`, which does not exist in Tauri 2 (a Tauri v1 name); the equivalent is `Listener::once_any`, which is used here.
- The upstream emit_filter example comment says "updater window" while filtering on label `"main"`; the label was aligned with the comment here.
- The `download` examples are synchronous commands that sleep in a loop; synchronous commands run on the main thread, so in a real app use `async fn` or `#[tauri::command(async)]` (or a spawned thread), and handle the `Result` returned by `emit` / `emit_to` / `emit_filter` instead of discarding it.
- Tauri event system (Rust core to WebView), not Electron's `ipcMain` / `EventEmitter`; see the electron skill.

## Related

- [Manager](./manager.md)
- [App](./app.md)
- [Command macros](./command-macros.md)
- [ipc::Channel](./ipc-channel.md)
