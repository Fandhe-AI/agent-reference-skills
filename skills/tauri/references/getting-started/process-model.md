---
source: https://v2.tauri.app/concept/process-model/
---

# Process Model

Tauri uses a multi-process architecture: one Core process with full OS access, and one or more WebView processes that render the UI.

## Signature / Usage

```text
Core (process) --Events & Commands--> WebView 1
               --Events & Commands--> WebView 2
               --Events & Commands--> WebView 3
```

A single Core process manages one or more WebView processes (simplified representation from the source diagram).

**The Core process**

- The application's entry point and the only component with full access to the operating system.
- Creates and orchestrates application windows, system-tray menus, and notifications; Tauri implements the cross-platform abstractions.
- Routes all Inter-Process Communication through the Core process, so IPC messages can be intercepted, filtered, and manipulated in one central place.
- Should manage global state such as settings or database connections, which makes it easy to synchronize state between windows and protect business-sensitive data from the Frontend.
- Implemented in Rust, whose ownership concept guarantees memory safety while retaining excellent performance.

**The WebView process**

- The Core spins up WebView processes that leverage WebView libraries provided by the operating system; a WebView executes your HTML, CSS, and JavaScript.
- Traditional web development tools and techniques apply (many Tauri examples use Svelte and Vite).
- WebView libraries are not included in the final executable but dynamically linked at runtime, which makes the app significantly smaller but means platform differences must be kept in mind.
- Currently Tauri uses Microsoft Edge WebView2 on Windows, WKWebView on macOS and webkitgtk on Linux.

## Notes

- Why multiple processes: a crash in one component does not affect the whole system, and handing each process only the minimum permissions (Principle of Least Privilege) limits the blast radius of exploits.
- Security best practices still apply in the WebView: always sanitize user input, never handle secrets in the Frontend, and ideally defer as much business logic as possible to the Core process.
- Tauri (Rust core + system WebView). Not Electron's API; see the electron skill for Electron. The source page itself notes the architecture is similar to Electron or many modern web browsers.

## Related

- [Inter-Process Communication](./inter-process-communication.md)
- [Tauri Architecture](./architecture.md)
- [Webview Versions](./webview-versions.md)
