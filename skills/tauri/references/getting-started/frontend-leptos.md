---
source: https://v2.tauri.app/start/frontend/leptos/
---

# Leptos

Leptos is a Rust based web framework. This guide is accurate as of Leptos version 0.6.

## Signature / Usage

Checklist:

- Use SSG, Tauri doesn't officially support server based solutions.
- Use `serve.ws_protocol = "ws"` so that the hot-reload websocket can connect properly for mobile development.
- Enable `withGlobalTauri` to ensure that Tauri APIs are available in the `window.__TAURI__` variable and can be imported using `wasm-bindgen`.

Tauri configuration:

```json
// src-tauri/tauri.conf.json
{
  "build": {
    "beforeDevCommand": "trunk serve",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "trunk build",
    "frontendDist": "../dist"
  },
  "app": {
    "withGlobalTauri": true
  }
}
```

Trunk configuration `Trunk.toml`:

```toml
[build]
target = "./index.html"

[watch]
ignore = ["./src-tauri"]

[serve]
port = 1420
open = false
ws_protocol = "ws"
```

## Notes

- Tauri-side integration settings only. This is the Rust web framework Leptos, not a Tauri API; Rust itself is covered by the rust skill. The fandhe-frontend skill is a different Rust frontend framework.

## Related

- [Trunk](./frontend-trunk.md)
- [Frontend Configuration](./frontend-configuration.md)
