---
source: https://docs.rs/tauri/2.12.4/tauri/index.html
---

# tauri crate (modules, Cargo features)

Tauri is a framework for building tiny, blazing fast binaries for all major desktop platforms. Developers can integrate any front-end framework that compiles to HTML, JS and CSS for building their user interface. The backend of the application is a rust-sourced binary with an API that the front-end can interact with.

## Signature / Usage

Re-exports at the crate root (verbatim):

```rust
pub use self::app::App;
pub use self::app::AppHandle;
pub use self::app::AssetResolver;
pub use self::app::Builder;
pub use self::app::CloseRequestApi;
pub use self::app::ExitRequestApi;
pub use self::app::RESTART_EXIT_CODE;
pub use self::app::RunEvent;
pub use self::app::UriSchemeContext;
pub use self::app::UriSchemeResponder;
pub use self::app::WebviewEvent;
pub use self::app::WindowEvent;
pub use self::manager::Asset;
pub use self::state::State;
pub use self::state::StateManager;
pub use self::webview::Webview;
pub use self::webview::WebviewWindow;
pub use self::webview::WebviewWindowBuilder;
pub use self::window::Monitor;
pub use self::window::Window;
pub use self::webview::WebviewBuilder;
pub use self::window::WindowBuilder;
pub use tauri_utils as utils;
pub use http;
pub use scope::*;
```

## Options / Props

### Cargo features

Default features (`[features] default` in `crates/tauri/Cargo.toml` @ `tauri-v2.12.4`): `wry`, `compression`, `common-controls-v6`, `dynamic-acl`, `x11`, `dbus`.

| Feature | Description |
| --- | --- |
| wry (default) | Enables the wry runtime. Only disable it if you want a custom runtime. |
| common-controls-v6 (default) | Enables Common Controls v6 support on Windows, mainly for the predefined `about` menu item. |
| x11 (default) | Enables X11 support. Disable this if you only target Wayland. |
| dbus (default) | Enables dbus dependency for theme support on Linux. Disable this if you do not need theme support or don't want to build the dbus rust crate. The WebView dependencies use dbus either way. |
| compression (default) | Enables asset compression. You should only disable this if you want faster compile times in release builds - it produces larger binaries. |
| dynamic-acl (default) | Enables you to add ACLs at runtime, notably it enables the `Manager::add_capability` function. |
| unstable | Enables unstable features. Be careful, it might introduce breaking changes in future minor releases. Unlocks the multiwebview APIs (see below). |
| tracing | Enables `tracing` for window startup, plugins, `Window::eval`, events, IPC, updater and custom protocol request handlers. |
| test | Enables the `test` module exposing unit test helpers. |
| objc-exception | This feature flag is no-op since 2.3.0. |
| linux-libxdo | Enables linking to libxdo which enables Cut, Copy, Paste and SelectAll menu items to work on Linux. |
| isolation | Enables the isolation pattern. Enabled by default if the `app > security > pattern > use` config option is set to `isolation` on the `tauri.conf.json` file. |
| custom-protocol | Feature managed by the Tauri CLI. When enabled, Tauri assumes a production environment instead of a development one. |
| devtools | Enables the developer tools (Web inspector) and `window::Window::open_devtools`. Enabled by default on debug builds. On macOS it uses private APIs, so you can't enable it if your app will be published to the App Store. |
| native-tls | Provides TLS support to connect over HTTPS. |
| native-tls-vendored | Compile and statically link to a vendored copy of OpenSSL. |
| rustls-tls | Provides TLS support to connect over HTTPS using rustls. |
| process-relaunch-dangerous-allow-symlink-macos | Allows the `process::current_binary` function to allow symlinks on macOS (this is dangerous, see the Security section in the documentation website). |
| tray-icon | Enables application tray icon APIs. Enabled by default if the `trayIcon` config is defined on the `tauri.conf.json` file. |
| macos-private-api | Enables features only available in macOS's private APIs, currently the `transparent` window functionality and the `fullScreenEnabled` preference setting to `true`. Enabled by default if the `app > macOSPrivateApi` config flag is set to `true` on the `tauri.conf.json` file. No-op since Tauri 2.12.1 because the APIs are always enabled now. |
| webview-data-url | Enables usage of data URLs on the webview. |
| config-json5 | Adds support to JSON5 format for `tauri.conf.json`. |
| config-toml | Adds support to TOML format for the configuration `Tauri.toml`. |
| image-ico | Adds support to parse `.ico` image, see `image::Image`. |
| image-png | Adds support to parse `.png` image, see `image::Image`. |
| macos-proxy | Adds support for `WebviewBuilder::proxy_url` on macOS. Requires macOS 14+. |
| specta | Add support for `specta::specta` with Tauri arguments such as `State`, `Window` and `AppHandle`. |
| protocol-asset | Cargo allowlist feature: enables the `asset` custom protocol. Automatically enabled by the Tauri CLI based on the config. |

The `unstable` feature unlocks the multiwebview APIs, where a `Window` (the native window) and a `Webview` (the web content it hosts) are separate objects instead of the single `WebviewWindow` you get by default:

- `window::WindowBuilder` and `Window::builder` to create a window that has no webview attached to it;
- `webview::WebviewBuilder` and `Window::add_child` to attach one or more webviews to an existing window;
- `Webview::reparent` to move a webview to another window (it always fails on a `WebviewWindow` webview when this feature is disabled) and `Webview::set_auto_resize` to make a child webview follow the window size;
- the `Manager` getters for these objects: `get_window`, `get_focused_window`, `windows`, `get_webview` and `webviews`.

### Modules

| Module | Description |
| --- | --- |
| async_runtime | The singleton async runtime used by Tauri and exposed to users. |
| image | Image types used by this crate and also referenced by the JavaScript API layer. |
| ipc | Types and functions related to Inter Procedure Call(IPC). |
| menu (`desktop`) | Menu types and utilities. |
| path | Path APIs. |
| plugin | The Tauri plugin extension to expand Tauri functionality. |
| process | Types and functions related to child processes management. |
| scope | The allowlist scopes. Runtime access scopes. |
| test (`test`) | Utilities for unit testing on Tauri applications. |
| tray (`desktop` and `tray-icon`) | Tray icon types and utilities. |
| webview | The Tauri webview types and functions. |
| window | The Tauri window types and functions. |

### Macros

| Macro | Description |
| --- | --- |
| generate_context | Reads the config file at compile time and generates a `Context` based on its content. |
| generate_handler | Accepts a list of command functions. Creates a handler that allows commands to be called from JS with invoke(). |
| include_image | Convert a .png or .ico icon to an Image for things like `tauri::tray::TrayIconBuilder` to consume, relative paths are resolved from `CARGO_MANIFEST_DIR`, not current file. |
| tauri_build_context | Include a `Context` that was generated by `tauri-build` inside your build script. |
| command (attribute) | Mark a function as a command handler. It creates a wrapper function with the necessary glue code. |

### Structs, enums, traits, functions

| Kind | Items |
| --- | --- |
| Structs | App, AppHandle, Asset, AssetResolver, Builder, CloseRequestApi, Config, Context (`wry`), Env, Event, ExitRequestApi, LogicalPosition, LogicalRect, LogicalSize, LogicalUnit, PackageInfo, PhysicalPosition, PhysicalRect, PhysicalSize, PhysicalUnit, Rect, ResourceTable, State, StateManager, UriSchemeContext, UriSchemeResponder, Url, WindowSizeConstraints |
| Enums | CursorIcon, DeviceEventFilter, DragDropEvent, Error, EventLoopMessage, EventTarget, Pattern, PixelUnit, Position, RunEvent, Size, Theme, TitleBarStyle, UserAttentionType, WebviewEvent, WebviewUrl, WindowEvent |
| Traits | Assets, Emitter, Listener, Manager, Pixel, Resource, Runtime, RuntimeHandle |
| Functions | `is_dev` (whether we are running in development mode or not), `webview_version` (`wry`; get WebView/Webkit version on current platform) |
| Constants | `RESTART_EXIT_CODE` (the exit code on `RunEvent::ExitRequested` when `AppHandle::restart` is called), `VERSION` (the Tauri version) |
| Type aliases | EventId, ResourceId, Result (`Result<T, ::tauri::Error>`), SyncTask, Wry (`wry`), WryHandle (`wry`) |

## Notes

- docs.rs marks the `WebviewBuilder` and `WindowBuilder` re-exports as `unstable` (see the `unstable` Cargo feature above).
- This is the Tauri app framework crate (`tauri`), not the Rust language or Cargo themselves; for the language and Cargo, see the rust skill.
- Not Electron: Tauri's backend is a Rust binary with system WebView; see the electron skill for Electron.
- The docs.rs feature description still cites the v1 key `tauri > macosPrivateApi`; in the Tauri 2 config the key is `app > macOSPrivateApi` (no-op since 2.12.1).
- docs.rs shows only the type name as link text for `RESTART_EXIT_CODE` (`AppHandle`) and `devtools` (`window::Window`); the links point to `AppHandle::restart` and `Window::open_devtools`, which are spelled out here.
- Source: docs.rs `tauri` 2.12.4 crate index; features list cross-checked with `crates/tauri/Cargo.toml` @ `tauri-v2.12.4`.

## Related

- [Builder](./builder.md)
- [App](./app.md)
- [Manager](./manager.md)
- [Error](./error.md)
