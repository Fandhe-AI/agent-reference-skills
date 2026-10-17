---
source: https://v2.tauri.app/concept/architecture/
---

# Tauri Architecture

Tauri is a polyglot, composable toolkit for building desktop (and mobile) apps from Rust tools and HTML rendered in a Webview. This page lists the core crates, tooling, upstream crates (TAO, WRY), and how plugins fit in.

## Signature / Usage

Core ecosystem (simplified representation from the source diagram):

```text
Core:     tauri (tauri-runtime, tauri-macros, tauri-utils), tauri-build, tauri-codegen, tauri-runtime-wry
Upstream: WRY, TAO
tauri-runtime -> tauri-runtime-wry -> WRY -> TAO
```

| Component | Role |
|-----------|------|
| `tauri` | The major crate that holds everything together. Brings runtimes, macros, utilities and API into one product. Reads `tauri.conf.json` at compile time (and the project's `Cargo.toml`), handles script injection at runtime, hosts the API for systems interaction, and manages the updating process. |
| `tauri-runtime` | The glue layer between Tauri itself and lower-level webview libraries. |
| `tauri-macros` | Creates macros for the context, handler, and commands by leveraging `tauri-codegen`. |
| `tauri-utils` | Common code: parsing configuration files, detecting platform triples, injecting the CSP, managing assets. |
| `tauri-build` | Applies the macros at build-time to rig some special features needed by `cargo`. |
| `tauri-codegen` | Embeds, hashes, and compresses assets (including icons for the app and system tray). Parses `tauri.conf.json` at compile time and generates the Config struct. |
| `tauri-runtime-wry` | Opens up direct systems-level interactions specifically for WRY, such as printing, monitor detection, and other windowing-related tasks. |

Tauri tooling:

| Tool | Description |
|------|-------------|
| API (JavaScript / TypeScript) | A TypeScript library that creates `cjs` and `esm` JavaScript endpoints so the Webview can call and listen to backend activity; also ships in pure TypeScript. Uses the message passing of webviews to their hosts. |
| Bundler (Rust / Shell) | Builds a Tauri app for the platform it detects or is told. Supports macOS, Windows and Linux (per the source page). May be used outside of Tauri projects. |
| cli.rs (Rust) | The Rust executable providing the full interface to all CLI activities. Runs on macOS, Windows, and Linux. |
| cli.js (JavaScript) | Wrapper around `cli.rs` using `napi-rs` to produce npm packages for each platform. |
| create-tauri-app (JavaScript) | Scaffolds a new `tauri-apps` project using the frontend framework of your choice. |

Upstream crates:

- TAO: cross-platform application window creation library in Rust supporting Windows, macOS, Linux, iOS and Android. A fork of winit extended with menu bar and system tray.
- WRY: cross-platform WebView rendering library in Rust supporting Windows, macOS, and Linux. Tauri uses WRY as the abstract layer that determines which webview is used and how interactions are made.

Additional tooling: `tauri-action` (GitHub workflow that builds Tauri binaries for all platforms) and `tauri-vscode` (Visual Studio Code integration).

Plugins generally do 3 things:

1. Enable Rust code to do "something".
2. Provide interface glue to make it easy to integrate into an app.
3. Provide a JavaScript API for interfacing with the Rust code.

## Notes

- Tauri is not a lightweight kernel wrapper (it uses WRY and TAO directly for system calls) and not a VM or virtualized environment.
- Tauri itself is licensed under MIT or Apache-2.0; if you repackage and modify source code, verifying compliance with upstream licenses is your responsibility.
- Tauri (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Tauri-side architecture only; Rust language and Cargo are covered by the rust skill.

## Related

- [Process Model](./process-model.md)
- [Inter-Process Communication](./inter-process-communication.md)
- [Overview](./overview.md)
