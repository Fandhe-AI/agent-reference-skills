# rust-api

| Name | Description | Path |
|------|-------------|------|
| AppHandle | A handle to the currently running application. | [app-handle.md](./app-handle.md) |
| App | The instance of the currently running application. | [app.md](./app.md) |
| async_runtime | The singleton async runtime used by Tauri and exposed to users. | [async-runtime.md](./async-runtime.md) |
| Builder | Builds a Tauri application. | [builder.md](./builder.md) |
| #[command] / generate_handler! / generate_context! | Attribute macro that marks a function as a command handler; `generate_handler!` collects commands and `generate_context!` builds the `Context` from `tauri.conf.json`. | [command-macros.md](./command-macros.md) |
| tauri crate (modules, Cargo features) | Tauri is a framework for building tiny, blazing fast binaries for all major desktop platforms. | [crate-overview.md](./crate-overview.md) |
| Error | Runtime errors that can happen inside a Tauri application. | [error.md](./error.md) |
| Emitter / Listener / Event / EventTarget | Traits for emitting and listening to events (`Emitter`, `Listener`), the received `Event`, and the `EventTarget` selector. | [events.md](./events.md) |
| image::Image | An RGBA Image in row-major order from top to bottom. | [image.md](./image.md) |
| ipc::Channel | An IPC channel, used to stream values from Rust to the frontend. | [ipc-channel.md](./ipc-channel.md) |
| ipc::Request / Response / InvokeError | Types and functions related to Inter Procedure Call (IPC). | [ipc-request-response.md](./ipc-request-response.md) |
| Manager trait | Manages a running application. Implemented by `App`, `AppHandle`, `Webview`, `WebviewWindow` and `Window`. | [manager.md](./manager.md) |
| menu module (Menu, MenuBuilder, SubmenuBuilder, MenuItemBuilder, MenuEvent) | Menu types and utilities. Available on `desktop` only. | [menu.md](./menu.md) |
| PathResolver / BaseDirectory | The path resolver is a helper class for general and application-specific path APIs. | [path-resolver.md](./path-resolver.md) |
| plugin::Builder / Plugin trait | `plugin::Builder` builds a `TauriPlugin`, a more concise way to construct Tauri plugins than implementing the `Plugin` trait directly. | [plugin-builder.md](./plugin-builder.md) |
| RunEvent | An application event, triggered from the event loop. | [run-event.md](./run-event.md) |
| State | A guard for a state value. | [state.md](./state.md) |
| tray module (TrayIconBuilder, TrayIconEvent) | Tray icon types and utilities. Available on `desktop` and crate feature `tray-icon` only. | [tray.md](./tray.md) |
| WebviewWindowBuilder | A builder for `WebviewWindow`, a window that hosts a single webview. | [webview-window-builder.md](./webview-window-builder.md) |
| WebviewWindow | A type that wraps a `Window` together with a `Webview`. | [webview-window.md](./webview-window.md) |
| WebviewBuilder / Webview | `WebviewBuilder` (feature `unstable`) builds a webview added to an existing `Window`; `Webview` is the webview handle. | [webview.md](./webview.md) |
| WindowBuilder / Window | `WindowBuilder` (feature `unstable`) builds a window with no webview attached; `Window` (feature `wry`) is a Tauri-managed window. | [window.md](./window.md) |
