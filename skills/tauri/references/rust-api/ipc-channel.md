---
source: https://docs.rs/tauri/2.12.4/tauri/ipc/struct.Channel.html
---

# ipc::Channel

An IPC channel, used to stream values from Rust to the frontend. A command can only resolve once; a channel pushes an arbitrary number of messages to the JavaScript side (download progress, log lines, streamed responses).

## Signature / Usage

```rust
pub struct Channel<TSend = InvokeResponseBody> { /* private fields */ }
```

Frontend creates the channel and passes it as a command argument (`Channel` implements `CommandArg`):

```ts
import { Channel, invoke } from '@tauri-apps/api/core'

const onProgress = new Channel()
onProgress.onmessage = (message) => console.log(message)
await invoke('download', { url, onProgress })
```

```rust
use tauri::ipc::Channel;

#[derive(Clone, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct DownloadProgress {
  downloaded: usize,
  content_length: usize,
}

#[tauri::command]
fn download(url: String, on_progress: Channel<DownloadProgress>) -> tauri::Result<()> {
  let content_length = 1000;
  for downloaded in (0..=content_length).step_by(100) {
    on_progress.send(DownloadProgress { downloaded, content_length })?;
  }
  Ok(())
}
```

Binary chunks, received as `ArrayBuffer`s in JavaScript:

```rust
use tauri::ipc::{Channel, InvokeResponseBody};

#[tauri::command]
fn read_file(on_chunk: Channel<InvokeResponseBody>) -> tauri::Result<()> {
  for chunk in [vec![0u8; 16], vec![1u8; 16]] {
    on_chunk.send(InvokeResponseBody::Raw(chunk))?;
  }
  Ok(())
}
```

Create a channel on the Rust side:

```rust
use tauri::ipc::{Channel, InvokeResponseBody};

let channel = Channel::new(|message: InvokeResponseBody| {
  match message {
    InvokeResponseBody::Json(json) => println!("channel message: {json}"),
    InvokeResponseBody::Raw(bytes) => println!("channel message: {} bytes", bytes.len()),
  }
  Ok(())
});

channel.send("hello").unwrap();
```

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new<F: Fn(InvokeResponseBody) -> Result<()> + Send + Sync + 'static>(on_message: F) -> Self` | Creates a channel with the given message handler. The frontend is not involved; the closure is called with the body of every message sent through `Channel::send`. |
| id | `pub fn id(&self) -> u32` | The channel identifier. |
| send | `pub fn send(&self, data: TSend) -> Result<()> where TSend: IpcResponse` | Sends the given data through the channel. |

Trait implementations: `Clone`, `CommandArg<'de, R>` (grabs the `Webview` from the `CommandItem` and returns the associated `Channel`), `Serialize`, and specta `Type` / `NamedType` / `Flatten` (feature `specta`).

## Notes

- Each message is a `TSend` value that must implement `IpcResponse` (automatically implemented for every `serde::Serialize` type) and is delivered to the `onmessage` handler of the matching JavaScript `Channel`.
- A channel can also be resolved from an id the frontend sent inside a bigger payload with `JavaScriptChannelId::channel_on`.
- Channels are cheap to clone (every clone refers to the same JavaScript callback) and can be stored in app state or moved to another thread. When the last clone of a channel created from the frontend is dropped, the JavaScript side is notified that no more messages will arrive and the callback is unregistered.
- Ordering: every message carries its index and the JavaScript side buffers out-of-order messages, so `onmessage` observes messages in `Channel::send` order. See `Builder::channel_interceptor` to intercept or replace this delivery.
- Raw payloads: any `serde::Serialize` value is sent as JSON. Send an `InvokeResponseBody::Raw` through `Channel<InvokeResponseBody>` (default type parameter) or a `Response` to stream binary data received as an `ArrayBuffer`. A `Channel<Vec<u8>>` does not do this: `Vec<u8>` is `Serialize` so it is sent as a JSON array of numbers.
- Tauri IPC channel, not Electron's `ipcRenderer` / `MessagePort`; see the electron skill.

## Related

- [Request / Response / InvokeError](./ipc-request-response.md)
- [Command macros](./command-macros.md)
- [Builder](./builder.md)
