---
source: https://v2.tauri.app/develop/debug/linux-graphics/
---

# Linux graphics debugging

On Linux, Tauri renders through WebKitGTK. On some setups, most often NVIDIA GPUs, WebKitGTK and the graphics driver disagree, giving anything from a blank window to subtle rendering problems. See tauri-apps/tauri#9394 for the original reports.

## Signature / Usage

Set the workaround in `main()` before the webview is created:

```rust
fn main() {
  // Workaround for WebKitGTK on NVIDIA, see tauri-apps/tauri#9394
  #[cfg(target_os = "linux")]
  std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");

  tauri::Builder::default()
    // ...
}
```

## Common symptoms

- The window opens but stays blank or white.
- The window flickers, especially while resizing.
- The app dies on resize with no useful error output.
- Console shows `AcceleratedSurfaceDMABuf was unable to construct a complete framebuffer`.
- Console shows `Gdk-Message: Error 71 (Protocol error) dispatching to Wayland display.`

Most come from the WebKitGTK DMABUF renderer requesting buffer formats the NVIDIA driver does not provide (see the WebKitGTK bug tracker, bug 261874).

## Workarounds

Try in order; the earlier ones keep hardware acceleration.

1. Make sure kernel mode setting is on. NVIDIA drivers older than 545 often need `nvidia_drm.modeset=1` as a kernel parameter.
2. Set `__NV_DISABLE_EXPLICIT_SYNC=1`. Often fixes the Wayland `Error 71` crash without a performance cost.
3. Set `WEBKIT_DISABLE_DMABUF_RENDERER=1`. Fixes the DMABUF framebuffer error and the `Error 71` crash, at the cost of the faster rendering path.
4. Set `WEBKIT_DISABLE_COMPOSITING_MODE=1`. Last resort for the silent crash on resize; disables accelerated compositing entirely.

Set them in the shell to test, or in `main()` so users do not have to.

## Silent failures: WebGL and canvas

- WebGL2 context creation succeeds even when backed by a software rasterizer or a slow presentation path; there is no error to catch.
- WebKitGTK masks the WebGL renderer string for fingerprinting protection: `WEBGL_debug_renderer_info` reports `Apple GPU` on every Linux machine.

This shows up as high input latency or low frame rates in WebGL-heavy views (terminal emulators, editors, maps, charts), while the same code is fast in a regular browser. Give WebGL rendering paths a non-WebGL fallback on Linux and consider exposing a setting so users can switch.

## Notes

- Only ship an unconditional override like the one above if you have verified your app is affected; it disables a faster path for everyone, including users on working setups.

## Related

- [Debug](./debug-overview.md)
- [Environment Variables](./environment-variables.md)
