---
source: https://docs.rs/tauri/2.12.4/tauri/async_runtime/index.html
---

# async_runtime

The singleton async runtime used by Tauri and exposed to users.

## Signature / Usage

Tauri uses the `tokio` Runtime to initialize code, such as `Plugin::initialize` and `crate::Builder::setup` hooks. This module also re-exports some common items most developers need from `tokio`. If one you need is not here, use types in `tokio` directly. For custom command handlers, it is recommended to use a plain `async fn` command.

```rust
#[tauri::command]
async fn my_command() -> String {
  "plain async fn command".into()
}
```

## Options / Props

| Kind | Name | Description |
| --- | --- | --- |
| Struct | Mutex | An asynchronous `Mutex`-like type. |
| Struct | Receiver | Receives values from the associated `Sender`. |
| Struct | RwLock | An asynchronous reader-writer lock. |
| Struct | Sender | Sends values to the associated `Receiver`. |
| Struct | TokioHandle | Handle to the runtime. |
| Struct | TokioJoinHandle | An owned permission to join on a task (await its termination). |
| Struct | TokioRuntime | The Tokio runtime. |
| Enum | JoinHandle | An owned permission to join on a task (await its termination). |
| Enum | Runtime | A runtime used to execute asynchronous tasks. |
| Enum | RuntimeHandle | A handle to the async runtime. |
| Function | block_on | Runs a future to completion on runtime. |
| Function | channel | Creates a bounded mpsc channel for communicating between asynchronous tasks with backpressure. |
| Function | handle | Returns a handle of the async runtime. |
| Function | set | Sets the runtime to use to execute asynchronous tasks. Takes a `TokioHandle` for convenience; the underlying `TokioRuntime` cannot be dropped. |
| Function | spawn | Spawns a future onto the runtime. |
| Function | spawn_blocking | Runs the provided function on an executor dedicated to blocking operations. |

## Notes

- Tauri's `tokio`-based runtime wrapper; the Rust language, `async` / `await` semantics and Cargo are covered by the rust skill.
- The `#[tauri::command(async)]` option runs a synchronous command on this async runtime instead of the main thread.

## Related

- [Command macros](./command-macros.md)
- [Builder](./builder.md)
- [Plugin Builder](./plugin-builder.md)
