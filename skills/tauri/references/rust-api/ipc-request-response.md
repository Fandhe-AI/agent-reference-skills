---
source: https://docs.rs/tauri/2.12.4/tauri/ipc/index.html
---

# ipc::Request / Response / InvokeError

Types and functions related to Inter Procedure Call (IPC). The `ipc` module includes utilities to send messages to the JS layer of the webview. This page covers the module index and the `Request`, `Response` and `InvokeError` structs.

## Signature / Usage

```rust
pub struct Request<'a> { /* private fields */ }
// pub fn body(&self) -> &InvokeBody        -- the request body
// pub fn headers(&self) -> &HeaderMap      -- the request headers

pub struct Response { /* private fields */ }
// pub fn new(body: impl Into<InvokeResponseBody>) -> Self   -- defines a response with the given body

pub struct InvokeError(pub Value);
// pub fn from_error<E: Error>(error: E) -> Self       -- string of the std::error::Error message
// pub fn from_anyhow(error: Error) -> Self            -- string of the anyhow::Error message
```

## Options / Props

Module items:

| Kind | Name | Description |
| --- | --- | --- |
| Struct | CallbackFn | The `Callback` type is the return value of the `transformCallback` JavaScript function. |
| Struct | CapabilityBuilder (`dynamic-acl`) | A builder for a `Capability`. |
| Struct | Channel | An IPC channel, used to stream values from Rust to the frontend. |
| Struct | CommandItem | Represents a custom command. |
| Struct | CommandScope | Access scope for a command that can be retrieved directly in the command function. |
| Struct | GlobalScope | Global access scope that can be retrieved directly in the command function. |
| Struct | Invoke (`wry`) | The message and resolver given to a custom command. |
| Struct | InvokeError | Error response from an `InvokeMessage`. |
| Struct | InvokeMessage (`wry`) | An invoke message. |
| Struct | InvokeResolver (`wry`) | Resolver of an invoke message. |
| Struct | JavaScriptChannelId | The ID of a channel that was defined on the JavaScript layer. |
| Struct | Request | The IPC request. |
| Struct | Response | The IPC response. |
| Struct | RuntimeAuthority | The runtime authority used to authorize IPC execution based on the Access Control List. |
| Struct | ScopeValue | List of allowed and denied objects that match either the command-specific or plugin global scope criteria. |
| Struct | SerializeOptions | Optional settings to pass to the templating system. |
| Enum | InvokeBody | Possible values of an IPC payload. |
| Enum | InvokeResponse | Response from an `InvokeMessage` passed to the `InvokeResolver`. |
| Enum | InvokeResponseBody | Possible values of an IPC response. |
| Enum | Origin | The origin trying to access the IPC. |
| Trait | CommandArg | Trait implemented by command arguments to derive a value from a `CommandItem`. |
| Trait | IpcResponse | Marks a type as a response to an IPC call. |
| Trait | RuntimeCapability (`dynamic-acl`) | A capability that can be added at runtime. |
| Trait | ScopeObject | Marks a type as a scope object. |
| Trait | ScopeObjectMatch | A `ScopeObject` whose validation can be represented as a `bool`. |
| Type alias | InvokeHandler | A closure run every time Tauri receives a message it does not explicitly handle. |
| Type alias | InvokeResponder | A closure responsible for responding to a JS message. |
| Type alias | OwnedInvokeResponder | Like `InvokeResponder` but taking owned arguments. |

## Notes

- `Request` includes the `body` and `headers` of a Tauri command invocation, which allows commands to accept raw bytes on all platforms except Android.
- `Request`, `Channel`, `AppHandle` and `State` implement `CommandArg<'a, R>`; for `Request`, `from_command` returns the invoke `Request`.
- `InvokeError` implements `From<anyhow::Error>`, `From<InvokeError> for InvokeResponse`, and `From<T: Serialize>`.
- Tauri IPC types (Rust core to WebView), not Electron's `ipcMain` / `ipcRenderer`; see the electron skill.

## Related

- [ipc::Channel](./ipc-channel.md)
- [Command macros](./command-macros.md)
- [Error](./error.md)
