---
source: https://v2.tauri.app/reference/javascript/api/
---

# @tauri-apps/api

The Tauri API allows you to interface with the backend layer. This module exposes all other modules as an object where the key is the module name, and the value is the module exports.

## Signature / Usage

```typescript
import { event, window, path } from '@tauri-apps/api'
```

Vanilla JS (requires the `app.withGlobalTauri` configuration option enabled):

```js
const { event, window: tauriWindow, path } = window.__TAURI__;
```

## Options / Props

### Modules

| Module | Page |
| --- | --- |
| app | [app.md](./app.md) |
| core | [core.md](./core.md) |
| dpi | [dpi.md](./dpi.md) |
| event | [event.md](./event.md) |
| image | [image.md](./image.md) |
| menu | [menu.md](./menu.md), [menu-items.md](./menu-items.md) |
| mocks | [mocks.md](./mocks.md) |
| path | [path.md](./path.md) |
| tray | [tray.md](./tray.md) |
| webview | [webview.md](./webview.md) |
| webviewWindow | [webview-window.md](./webview-window.md) |
| window | [window.md](./window.md), [window-types.md](./window-types.md) |

## Notes

- The root `index.ts` exports exactly the 12 namespaces above: `app`, `core`, `dpi`, `event`, `image`, `menu`, `mocks`, `path`, `tray`, `webview`, `webviewWindow`, `window`.
- Tauri (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/index.ts` (`@tauri-apps/api` 2.12.4).

## Related

- [core](./core.md)
- [app](./app.md)
