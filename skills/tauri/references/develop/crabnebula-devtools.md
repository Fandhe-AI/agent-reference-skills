---
source: https://v2.tauri.app/develop/debug/crabnebula-devtools/
---

# CrabNebula DevTools

CrabNebula provides a free DevTools application for Tauri as part of its partnership with the Tauri project. It instruments the app by capturing embedded assets, the Tauri configuration file, logs and spans, and shows them in a web frontend in real time. It lets you inspect log events (including from dependencies) and track performance of command calls and overall Tauri API usage, with a special interface for Tauri events and commands including payloads, responses, inner logs and execution spans.

## Signature / Usage

Install the devtools crate:

```sh
cargo add tauri-plugin-devtools@2.0.0
```

Initialize the plugin as early as possible in `main`:

```rust
fn main() {
    // This should be called as early in the execution of the app as possible
    #[cfg(debug_assertions)] // only enable instrumentation in development builds
    let devtools = tauri_plugin_devtools::init();

    let mut builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    {
        builder = builder.plugin(devtools);
    }

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Run the app as usual; if set up correctly, devtools prints a message in the terminal.

## Notes

- The example initializes the plugin only for debug applications, which is recommended.
- Further documentation is in the CrabNebula DevTools docs (https://docs.crabnebula.dev/devtools/get-started/).

## Related

- [Debug](./debug-overview.md)
