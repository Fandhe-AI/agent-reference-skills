---
source: https://v2.tauri.app/develop/calling-rust/
---

# Calling Rust from the Frontend

Tauri provides a type-safe `command` primitive for calling Rust functions from the web app, plus a more dynamic event system. Commands accept arguments, return values or errors, and can be `async`.

## Signature / Usage

Annotate a function with `#[tauri::command]` and register it with `tauri::generate_handler!`:

`src-tauri/src/lib.rs`

```rust
#[tauri::command]
fn my_custom_command() {
	println!("I was invoked from JavaScript!");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![my_custom_command])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
```

```javascript
// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/core';

// When using the Tauri global script (if not using the npm package)
// Be sure to set `app.withGlobalTauri` in `tauri.conf.json` to true
const invoke = window.__TAURI__.core.invoke;

// Invoke the command
invoke('my_custom_command');
```

## Separate module

Commands in a separate module must be `pub`; the command name is not scoped to the module, so it must be unique even between modules. The `commands::` prefix is only used in the handler list.

`src-tauri/src/commands.rs`

```rust
#[tauri::command]
pub fn my_custom_command() {
	println!("I was invoked from JavaScript!");
}
```

`src-tauri/src/lib.rs`

```rust
mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![commands::my_custom_command])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
```

## WASM

With a Rust frontend, `invoke()` without arguments needs a separate binding because Rust has no optional arguments:

```rust
#[wasm_bindgen]
extern "C" {
    // invoke without arguments
    #[wasm_bindgen(js_namespace = ["window", "__TAURI__", "core"], js_name = invoke)]
    async fn invoke_without_args(cmd: &str) -> JsValue;

    // invoke with arguments (default)
    #[wasm_bindgen(js_namespace = ["window", "__TAURI__", "core"])]
    async fn invoke(cmd: &str, args: JsValue) -> JsValue;

    // They need to have different names!
}
```

## Passing arguments

Arguments are passed as a JSON object with camelCase keys and must implement `serde::Deserialize`.

```rust
#[tauri::command]
fn my_custom_command(invoke_message: String) {
	println!("I was invoked from JavaScript, with this message: {}", invoke_message);
}
```

```javascript
invoke('my_custom_command', { invokeMessage: 'Hello!' });
```

Use `#[tauri::command(rename_all = "snake_case")]` to keep snake_case keys (`invoke('my_custom_command', { invoke_message: 'Hello!' })`).

## Returning data

Returned data must implement `serde::Serialize`; `invoke` returns a promise resolving with it.

```rust
#[tauri::command]
fn my_custom_command() -> String {
	"Hello from Rust!".into()
}
```

```javascript
invoke('my_custom_command').then((message) => console.log(message));
```

Serialized values are sent as JSON, which is slow for large data. Return `tauri::ipc::Response` for array buffers:

```rust
use tauri::ipc::Response;
#[tauri::command]
fn read_file() -> Response {
	let data = std::fs::read("/path/to/file").unwrap();
	tauri::ipc::Response::new(data)
}
```

## Error handling

Return a `Result`; `Err` rejects the promise. Everything returned, including errors, must implement `serde::Serialize`.

```rust
#[tauri::command]
fn login(user: String, password: String) -> Result<String, String> {
	if user == "tauri" && password == "tauri" {
		// resolve
		Ok("logged_in".to_string())
	} else {
		// reject
		Err("invalid credentials".to_string())
	}
}
```

```javascript
invoke('login', { user: 'tauri', password: '0j4rijw8=' })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

Custom error type with `thiserror`, manually implementing `serde::Serialize`:

```rust
// create the error type that represents all errors possible in our program
#[derive(Debug, thiserror::Error)]
enum Error {
	#[error(transparent)]
	Io(#[from] std::io::Error)
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
	fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: serde::ser::Serializer,
	{
		serializer.serialize_str(self.to_string().as_ref())
	}
}

#[tauri::command]
fn my_custom_command() -> Result<(), Error> {
	// This will return an error
	std::fs::File::open("path/that/does/not/exist")?;
	// Return `null` on success
	Ok(())
}
```

Serializing errors as `{ kind, message }` objects for a TypeScript error enum:

```rust
#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error),
  #[error("failed to parse as string: {0}")]
  Utf8(#[from] std::str::Utf8Error),
}

#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
enum ErrorKind {
  Io(String),
  Utf8(String),
}

impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    let error_message = self.to_string();
    let error_kind = match self {
      Self::Io(_) => ErrorKind::Io(error_message),
      Self::Utf8(_) => ErrorKind::Utf8(error_message),
    };
    error_kind.serialize(serializer)
  }
}
```

```ts
type ErrorKind = {
  kind: 'io' | 'utf8';
  message: string;
};

invoke('read').catch((e: ErrorKind) => {});
```

## Async commands

Async commands are preferred for heavy work so the UI does not freeze. They run on a separate async task via `async_runtime::spawn`; commands without the `async` keyword run on the main thread unless defined with `#[tauri::command(async)]`.

Borrowed arguments (e.g. `&str`, `State<'_, Data>`) are currently not allowed in async command signatures (tracked at https://github.com/tauri-apps/tauri/issues/2533). Options:

1. Convert to an owned type (e.g. `String` instead of `&str`); does not work for all types such as `State<'_, Data>`.
2. Return a `Result` (works for all types):

```rust
// Declare the async function using String instead of &str, as &str is borrowed and thus unsupported
#[tauri::command]
async fn my_custom_command(value: String) -> String {
	// Call another async function and wait for it to finish
	some_async_function().await;
	value
}
```

```rust
// Return a Result<String, ()> to bypass the borrowing issue
#[tauri::command]
async fn my_custom_command(value: &str) -> Result<String, ()> {
	// Call another async function and wait for it to finish
	some_async_function().await;
	// Note that the return value must be wrapped in `Ok()` now.
	Ok(format!(value))
}
```

From JavaScript an async command is invoked like any other (it already returns a promise).

## Channels

The channel is the recommended mechanism for streaming data (e.g. streamed HTTP responses) to the frontend. This reads a file in 4096-byte chunks:

```rust
use tokio::io::AsyncReadExt;

#[tauri::command]
async fn load_image(path: std::path::PathBuf, reader: tauri::ipc::Channel<&[u8]>) {
  // for simplicity this example does not include error handling
  let mut file = tokio::fs::File::open(path).await.unwrap();

  let mut chunk = vec![0; 4096];

  loop {
    let len = file.read(&mut chunk).await.unwrap();
    if len == 0 {
      // Length of zero means end of file.
      break;
    }
    reader.send(&chunk).unwrap();
  }
}
```

See Calling the Frontend from Rust for the full channel example.

## Accessing WebviewWindow, AppHandle, State and the raw request

```rust
#[tauri::command]
async fn my_custom_command(webview_window: tauri::WebviewWindow) {
	println!("WebviewWindow: {}", webview_window.label());
}
```

```rust
#[tauri::command]
async fn my_custom_command(app_handle: tauri::AppHandle) {
	let app_dir = app_handle.path().app_dir();
	use tauri::GlobalShortcutManager;
	app_handle.global_shortcut_manager().register("CTRL + U", move || {});
}
```

`AppHandle` and `WebviewWindow` take a generic `R: Runtime` that defaults to `Wry` when the `wry` feature (default) is enabled. To use another runtime such as the mock runtime, write `async fn my_custom_command<R: Runtime>(app_handle: AppHandle<R>, webview_window: WebviewWindow<R>)`.

Managed state via `tauri::State`:

```rust
struct MyState(String);

#[tauri::command]
fn my_custom_command(state: tauri::State<MyState>) {
	assert_eq!(state.0 == "some state value", true);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.manage(MyState("some state value".into()))
		.invoke_handler(tauri::generate_handler![my_custom_command])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
```

Raw request (body payload and headers) via `tauri::ipc::Request`:

```rust
#[tauri::command]
fn upload(request: tauri::ipc::Request) -> Result<(), Error> {
  let tauri::ipc::InvokeBody::Raw(upload_data) = request.body() else {
    return Err(Error::RequestBodyMustBeRaw);
  };
  let Some(authorization_header) = request.headers().get("Authorization") else {
    return Err(Error::MissingHeader("Authorization"));
  };

  // upload...

  Ok(())
}
```

```js
const data = new Uint8Array([1, 2, 3]);
await __TAURI__.core.invoke('upload', data, {
  headers: {
    Authorization: 'apikey',
  },
});
```

## Multiple commands

Calling `invoke_handler` multiple times keeps only the last call. Pass every command to a single `tauri::generate_handler!`:

```rust
tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![cmd_a, cmd_b])
	.run(tauri::generate_context!())
	.expect("error while running tauri application");
```

## Event system

Events are not type safe, always async, cannot return values and only support JSON payloads.

Global events (delivered to all listeners) with `event.emit` or `WebviewWindow#emit`:

```js
import { emit } from '@tauri-apps/api/event';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

// emit(eventName, payload)
emit('file-selected', '/path/to/file');

const appWebview = getCurrentWebviewWindow();
appWebview.emit('route-changed', { url: window.location.href });
```

Webview-specific events with `event.emitTo` or `WebviewWindow#emitTo`:

```js
import { emitTo } from '@tauri-apps/api/event';

// emitTo(webviewLabel, eventName, payload)
emitTo('settings', 'settings-update-requested', {
  key: 'notification',
  value: 'all',
});
```

Webview-specific events are not triggered on regular global listeners. To catch any event pass `{ target: { kind: 'Any' } }` to `listen`:

```js
import { listen } from '@tauri-apps/api/event';
listen(
  'state-changed',
  (event) => {
    console.log('got state changed event', event);
  },
  {
    target: { kind: 'Any' },
  }
);
```

### Listening to events

Global events:

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

Webview-specific events:

```ts
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const appWebview = getCurrentWebviewWindow();
appWebview.listen<string>('logged-in', (event) => {
  localStorage.setItem('session-token', event.payload);
});
```

`listen` keeps the listener registered for the app lifetime. Stop with the `unlisten` function it resolves with; always `await` the promise first:

```js
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen('download-started', (event) => {});
unlisten();
```

- Always call `unlisten` when the execution context goes out of scope (e.g. component unmount). Page reload or navigation unregisters listeners automatically, but not for SPA router navigation.
- Do not call `unlisten()` synchronously on the un-awaited promise: `listen` returns a Promise, so `unlisten` would not be a function and the listener is not cleaned up.
- In React / Vue / Svelte, register listeners in an effect that runs after mount (e.g. `useEffect`) if the handler depends on DOM refs, and clean up with `unlisten.then((fn) => fn())`.
- Listeners are called in registration order, but async listeners with rapid events may process out of order. Use Channels for ordered, high-throughput data.

React cleanup example:

```tsx
import { useEffect, useState } from 'react';
import { listen } from '@tauri-apps/api/event';

function DownloadTracker() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unlisten = listen<number>('download-progress', (event) => {
      setProgress(event.payload);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return <div>Download progress: {progress}%</div>;
}
```

Listen exactly once with `once`:

```js
import { once } from '@tauri-apps/api/event';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

once('ready', (event) => {});

const appWebview = getCurrentWebviewWindow();
appWebview.once('ready', () => {});
```

Events emitted in the frontend also trigger listeners registered from Rust.

## Notes

- Tauri (Rust core + system WebView). This is not Electron's IPC (`ipcMain` / `ipcRenderer`); see the electron skill for Electron.
- Command names must be unique across all modules.
- Commands defined in `lib.rs` cannot be marked `pub` (glue code generation limitation); the compiler reports error E0255: the name `__cmd__command_name` is defined multiple times.
- Events have no strong type support, payloads are JSON strings, and the capabilities system cannot fine-grain control event data and channels.

## Related

- [Calling the Frontend from Rust](./calling-frontend.md)
- [State Management](./state-management.md)
