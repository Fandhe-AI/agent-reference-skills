---
source: https://v2.tauri.app/start/project-structure/
---

# Project Structure

A Tauri project is usually made of 2 parts, a Rust project and a JavaScript project (optional).

## Signature / Usage

```
.
├── package.json
├── index.html
├── src/
│   ├── main.js
├── src-tauri/
│   ├── Cargo.toml
│   ├── Cargo.lock
│   ├── build.rs
│   ├── tauri.conf.json
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── icons/
│   │   ├── icon.png
│   │   ├── icon.icns
│   │   └── icon.ico
│   └── capabilities/
│       └── default.json
```

The JavaScript project is at the top level; the Rust project is inside `src-tauri/` and is a normal Cargo project with some extra files:

- `tauri.conf.json` is the main configuration file for Tauri (application identifier, dev server URL, etc.); it is also the marker the Tauri CLI uses to find the Rust project.
- `capabilities/` is the default folder Tauri reads capability files from (in short, you need to allow commands here to use them in your JavaScript code).
- `icons/` is the default output directory of the `tauri icon` command, usually referenced in `tauri.conf.json > bundle > icon`.
- `build.rs` contains `tauri_build::build()`, used for Tauri's build system.
- `src/lib.rs` contains the Rust code and the mobile entry point (the function marked with `#[cfg_attr(mobile, tauri::mobile_entry_point)]`).
- `src/main.rs` is the desktop entry point and runs `app_lib::run()`.

## Notes

- Code goes in `lib.rs`, not `main.rs`: mobile builds compile the app to a library and load it through the platform frameworks. `main.rs` runs `app_lib::run()` to share the entry point with mobile, so do not modify it. `app_lib` corresponds to `[lib.name]` in Cargo.toml.
- Tauri works like a static web host: compile the JavaScript project to static files first, then compile the Rust project, which bundles those static files. The JavaScript setup is basically that of a static website.
- For Rust-only work, remove everything else and use `src-tauri/` as the top-level project or as a member of your Rust workspace.

## Related

- [Frontend Configuration](./frontend-configuration.md)
- [Create a Project](./create-project.md)
