---
source: https://v2.tauri.app/start/frontend/trunk/
---

# Trunk

Trunk is a WASM web application bundler for Rust. This guide is accurate as of Trunk 0.17.5.

## Signature / Usage

Checklist:

- Use SSG, Tauri doesn't officially support server based solutions.
- Use `serve.ws_protocol = "ws"` so that the hot-reload websocket can connect properly for mobile development.
- Enable `withGlobalTauri` to ensure that Tauri APIs are available in the `window.__TAURI__` variable and can be imported using `wasm-bindgen`.

Tauri configuration:

`src-tauri/tauri.conf.json`:

```json
{
  "build": {
    "beforeDevCommand": "trunk serve",
    "beforeBuildCommand": "trunk build",
    "devUrl": "http://localhost:8080",
    "frontendDist": "../dist"
  },
  "app": {
    "withGlobalTauri": true
  }
}
```

Trunk configuration `Trunk.toml`:

```toml
[watch]
ignore = ["./src-tauri"]

[serve]
ws_protocol = "ws"
```

## Notes

- File-name comments are moved out of the JSON block so it stays valid JSON.
- Tauri-side integration settings only; Rust itself is covered by the rust skill. The fandhe-frontend skill is a different Rust frontend framework.

## Related

- [Leptos](./frontend-leptos.md)
- [Frontend Configuration](./frontend-configuration.md)
