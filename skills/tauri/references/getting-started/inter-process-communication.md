---
source: https://v2.tauri.app/concept/inter-process-communication/
---

# Inter-Process Communication

Tauri IPC is Asynchronous Message Passing: processes exchange requests and responses serialized with a simple data representation. Two primitives exist: Events and Commands.

## Signature / Usage

**Events** are fire-and-forget, one-way IPC messages suited to lifecycle events and state changes. Unlike Commands, Events can be emitted by both the Frontend and the Tauri Core.

```text
Frontend (Webview) -> Core: Event
Core -> Frontend (Webview): Event
```

**Commands** are a foreign-function-interface-like abstraction on top of IPC messages. The primary API, `invoke`, is similar to the browser's `fetch` API and lets the Frontend invoke Rust functions, pass arguments, and receive data.

```text
Frontend -> Core: IPC Request
Core -> Invoke Handler: Invoke command
Invoke Handler -> Core: Serialize return
Core -> Frontend: Response
```

## Notes

- Message passing is safer than shared memory or direct function access because the recipient may reject or discard requests; e.g. if the Core determines a request is malicious, it discards it and never executes the function.
- Commands use a JSON-RPC like protocol under the hood, so all arguments and return data must be serializable to JSON. Because Commands still use message passing, they do not share the security pitfalls of real FFI.
- Under the hood, events still utilize Commands, and access to the events API is controlled by the Event permissions (core permissions reference).
- Two IPC patterns are available: Brownfield (default) and Isolation.
- Tauri (Rust core + system WebView). Not Electron's IPC (`ipcMain` / `ipcRenderer`); see the electron skill for Electron.

## Related

- [Brownfield Pattern](./brownfield-pattern.md)
- [Isolation Pattern](./isolation-pattern.md)
- [Process Model](./process-model.md)
