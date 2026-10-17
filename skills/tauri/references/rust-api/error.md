---
source: https://docs.rs/tauri/2.12.4/tauri/enum.Error.html
---

# Error

Runtime errors that can happen inside a Tauri application. `tauri::Result<T>` is `Result<T, ::tauri::Error>`.

## Signature / Usage

```rust
#[non_exhaustive]pub enum Error {
    Runtime(Error),
    WindowLabelAlreadyExists(String),
    WebviewLabelAlreadyExists(String),
    CannotReparentWebviewWindow,
    AssetNotFound(String),
    Json(Error),
    Io(Error),
    InvalidIcon(Error),
    InvalidArgs(&'static str, &'static str, Error),
    Setup(SetupError),
    PluginInitialization(String, String),
    InvalidUrl(ParseError),
    JoinError(JoinError),
    IsolationPattern(Error),
    InvalidWebviewUrl(&'static str),
    GlobPattern(PatternError),
    Image(ImageError),
    InvalidWindowHandle,
    FailedToReceiveMessage,
    Menu(Error),
    BadMenuIcon(BadIcon),
    Tray(Error),
    BadTrayIcon(BadIcon),
    NoParent,
    NoExtension,
    NoBasename,
    NonUtf8Path(PathBuf),
    CurrentDir(Error),
    UnknownPath,
    InvalidAppDirectoriesOverride(PathBuf, String),
    WindowNotFound,
    BadResourceId(ResourceId),
    Anyhow(Error),
    WebviewNotFound,
    UnstableFeatureNotSupported,
    CannotDeserializeScope(Box<dyn Error + Send + Sync>),
    RawHandleError(HandleError),
    Csprng(Error),
    InvokeKey,
    IllegalEventName(String),
    TokioOneshotRecv(RecvError),
    UnexpectedMenuKind,
}
```

## Options / Props

| Variant | Description |
| --- | --- |
| Runtime(Error) | Runtime error. |
| WindowLabelAlreadyExists(String) | Window label must be unique. |
| WebviewLabelAlreadyExists(String) | Webview label must be unique. |
| CannotReparentWebviewWindow | Cannot use the webview reparent function on webview windows. |
| AssetNotFound(String) | Embedded asset not found. |
| Json(Error) | Failed to serialize/deserialize. |
| Io(Error) | IO error. |
| InvalidIcon(Error) | Failed to load window icon. |
| InvalidArgs(&'static str, &'static str, Error) | Invalid args when running a command. |
| Setup(SetupError) | Encountered an error in the setup hook. |
| PluginInitialization(String, String) | Error initializing plugin. |
| InvalidUrl(ParseError) | A part of the URL is malformed or invalid. |
| JoinError(JoinError) | Task join error. |
| IsolationPattern(Error) | Feature `isolation` only. An error happened inside the isolation pattern. |
| InvalidWebviewUrl(&'static str) | An invalid window URL was provided. |
| GlobPattern(PatternError) | Invalid glob pattern. |
| Image(ImageError) | Features `image-ico` or `image-png` only. Image error. |
| InvalidWindowHandle | The Window's raw handle is invalid for the platform. |
| FailedToReceiveMessage | Failed to receive message. |
| Menu(Error) | `desktop` only. Menu error. |
| BadMenuIcon(BadIcon) | `desktop` only. Bad menu icon error. |
| Tray(Error) | `desktop` and feature `tray-icon` only. Tray icon error. |
| BadTrayIcon(BadIcon) | `desktop` and feature `tray-icon` only. Bad tray icon error. |
| NoParent | Path does not have a parent. |
| NoExtension | Path does not have an extension. |
| NoBasename | Path does not have a basename. |
| NonUtf8Path(PathBuf) | Path is not valid UTF-8 and cannot be represented in a URL. |
| CurrentDir(Error) | Cannot resolve current directory. |
| UnknownPath | Non-Android only. Unknown path. |
| InvalidAppDirectoriesOverride(PathBuf, String) | The `app > appDirectoriesOverride` config contains a path that cannot be resolved. |
| WindowNotFound | Window not found. |
| BadResourceId(ResourceId) | The resource id is invalid. |
| Anyhow(Error) | The anyhow crate error. |
| WebviewNotFound | Webview not found. |
| UnstableFeatureNotSupported | API requires the unstable feature flag. |
| CannotDeserializeScope(Box<dyn Error + Send + Sync>) | Failed to deserialize scope object. |
| RawHandleError(HandleError) | Failed to get a raw handle. |
| Csprng(Error) | Something went wrong with the CSPRNG. |
| InvokeKey | Bad `__TAURI_INVOKE_KEY__` value received in ipc message. |
| IllegalEventName(String) | Illegal event name. |
| TokioOneshotRecv(RecvError) | tokio oneshot channel failed to receive message. |
| UnexpectedMenuKind | Unexpected menu kind passed to menu/tray plugin command. |

## Notes

- The enum is `#[non_exhaustive]`: matching requires a wildcard arm.
- `Result` is the crate type alias `Result<T, ::tauri::Error>`.

## Related

- [tauri crate](./crate-overview.md)
- [ipc::Request / Response / InvokeError](./ipc-request-response.md)
- [Builder](./builder.md)
