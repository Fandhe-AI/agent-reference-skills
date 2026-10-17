---
source: https://v2.tauri.app/develop/calling-frontend/
---

# Calling the Frontend from Rust

The Rust side calls the frontend through the Tauri event system, channels, or by directly evaluating JavaScript.

## Signature / Usage

Emit a global event with `Emitter#emit` (the `AppHandle` and `WebviewWindow` types implement the `Listener` and `Emitter` traits):

`src-tauri/src/lib.rs`

```rust
use tauri::{AppHandle, Emitter};

#[tauri::command]
fn download(app: AppHandle, url: String) {
  app.emit("download-started", &url).unwrap();
  for progress in [1, 15, 50, 80, 100] {
    app.emit("download-progress", progress).unwrap();
  }
  app.emit("download-finished", &url).unwrap();
}
```

### Event system

- Designed for small amounts of data or multi consumer / multi producer patterns (e.g. push notifications). Not designed for low latency or high throughput; use Channels for streaming.
- Differences from commands: no strong type support, payloads are always JSON strings (unsuitable for big messages), and no capabilities-system control over event data and channels.
- Events are global (all listeners) or webview-specific (only the webview matching a label).

Webview event with `Emitter#emit_to`:

```rust
use tauri::{AppHandle, Emitter};

#[tauri::command]
fn login(app: AppHandle, user: String, password: String) {
  let authenticated = user == "tauri-apps" && password == "tauri";
  let result = if authenticated { "loggedIn" } else { "invalidCredentials" };
  app.emit_to("login", "login-result", result).unwrap();
}
```

Emit to a list of webviews with `Emitter#emit_filter`:

```rust
use tauri::{AppHandle, Emitter, EventTarget};

#[tauri::command]
fn open_file(app: AppHandle, path: std::path::PathBuf) {
  app.emit_filter("open-file", path, |target| match target {
    EventTarget::WebviewWindow { label } => label == "main" || label == "file-viewer",
    _ => false,
  }).unwrap();
}
```

Webview-specific events are not triggered on regular global listeners; use `listen_any` instead of `listen` to catch any event.

#### Event payload

Any serializable type that also implements `Clone`:

```rust
use tauri::{AppHandle, Emitter};
use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct DownloadStarted<'a> {
  url: &'a str,
  download_id: usize,
  content_length: usize,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct DownloadProgress {
  download_id: usize,
  chunk_length: usize,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct DownloadFinished {
  download_id: usize,
}
```

#### Listening on the frontend

```ts
import { listen } from '@tauri-apps/api/event';

type DownloadStarted = {
  url: string;
  downloadId: number;
  contentLength: number;
};

listen<DownloadStarted>('download-started', (event) => {
  console.log(
    `downloading ${event.payload.contentLength} bytes from ${event.payload.url}`
  );
});
```

Webview-specific:

```ts
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const appWebview = getCurrentWebviewWindow();
appWebview.listen<string>('logged-in', (event) => {
  localStorage.setItem('session-token', event.payload);
});
```

`listen` stays registered for the application lifetime; call the (awaited) `unlisten` function to stop. Always unlisten when the execution context goes out of scope (e.g. component unmount). Page reloads or navigating to another URL unregister listeners automatically, SPA router navigation does not.

```js
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen('download-started', (event) => {});
unlisten();
```

Pitfalls:

- Do not call `unlisten()` before the `listen` Promise resolves; `await` it first.
- In React / Vue / Svelte setup hooks, do not depend on DOM elements that are not rendered yet; register in an effect that runs after mount and clean up with `unlisten.then((fn) => fn())`.
- Async listeners may process rapid events out of order; use Channels for ordered, high-throughput delivery.

Listen once:

```js
import { once } from '@tauri-apps/api/event';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

once('ready', (event) => {});

const appWebview = getCurrentWebviewWindow();
appWebview.once('ready', () => {});
```

Events emitted in the frontend also trigger these listeners.

#### Listening on Rust

Global events:

```rust
use tauri::Listener;

#[derive(Clone, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct DownloadStartedPayload {
  url: String,
  download_id: usize,
  content_length: usize,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      app.listen("download-started", |event| {
        if let Ok(payload) = serde_json::from_str::<DownloadStartedPayload>(event.payload()) {
          println!("downloading {}", payload.url);
        }
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

Webview-specific events:

```rust
use tauri::{Listener, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let webview = app.get_webview_window("main").unwrap();
      webview.listen("logged-in", |event| {
        let session_token = event.payload();
        // save token..
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

Unlisten and listen once:

```rust
// unlisten outside of the event handler scope:
let event_id = app.listen("download-started", |event| {});
app.unlisten(event_id);

// unlisten when some event criteria is matched
let handle = app.handle().clone();
app.listen("status-changed", move |event| {
  if serde_json::from_str::<String>(event.payload()).ok().as_deref() == Some("ready") {
    handle.unlisten(event.id());
  }
});

app.once("ready", |event| {
  println!("app is ready");
});
```

### Channels

Channels are fast and deliver ordered data; used internally for download progress, child process output and WebSocket messages. The event system evaluates JavaScript under the hood, so it is not suitable for large data.

```rust
use tauri::{AppHandle, ipc::Channel};
use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase", rename_all_fields = "camelCase", tag = "event", content = "data")]
enum DownloadEvent<'a> {
  Started {
    url: &'a str,
    download_id: usize,
    content_length: usize,
  },
  Progress {
    download_id: usize,
    chunk_length: usize,
  },
  Finished {
    download_id: usize,
  },
}

#[tauri::command]
fn download(app: AppHandle, url: String, on_event: Channel<DownloadEvent>) {
  let content_length = 1000;
  let download_id = 1;

  on_event.send(DownloadEvent::Started {
    url: &url,
    download_id,
    content_length,
  }).unwrap();

  for chunk_length in [15, 150, 35, 500, 300] {
    on_event.send(DownloadEvent::Progress {
      download_id,
      chunk_length,
    }).unwrap();
  }

  on_event.send(DownloadEvent::Finished { download_id }).unwrap();
}
```

Create the channel on the frontend and pass it as an argument:

```ts
import { invoke, Channel } from '@tauri-apps/api/core';

type DownloadEvent =
  | { event: 'started'; data: { url: string; downloadId: number; contentLength: number } }
  | { event: 'progress'; data: { downloadId: number; chunkLength: number } }
  | { event: 'finished'; data: { downloadId: number } };

const onEvent = new Channel<DownloadEvent>();
onEvent.onmessage = (message) => {
  console.log(`got download event ${message.event}`);
};

await invoke('download', {
  url: 'https://raw.githubusercontent.com/tauri-apps/tauri/dev/crates/tauri-schema-generator/schemas/config.schema.json',
  onEvent,
});
```

### Evaluating JavaScript

Use `WebviewWindow#eval`; for non-trivial scripts using Rust input, the docs recommend the serialize-to-javascript crate.

```rust
use tauri::Manager;

tauri::Builder::default()
  .setup(|app| {
    let webview = app.get_webview_window("main").unwrap();
    webview.eval("console.log('hello from Rust')")?;
    Ok(())
  })
```

## Notes

- Tauri (Rust core + system WebView). This is not Electron's `webContents.send` / `ipcMain` API; see the electron skill for Electron.
- Upstream snippet accesses `event.data` / `event.id` fields; `tauri::Event` exposes `payload()` / `id()` methods (docs.rs tauri 2.12.4).
- Upstream decodes the `Serialize`-only `DownloadStarted` with `serde_json::from_str`; a separate `Deserialize` type (`DownloadStartedPayload`) is used here.

## Related

- [Calling Rust from the Frontend](./calling-rust.md)
- [State Management](./state-management.md)
