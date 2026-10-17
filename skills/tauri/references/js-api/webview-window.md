---
source: https://v2.tauri.app/reference/javascript/api/namespacewebviewwindow/
---

# webviewWindow

Create and manipulate windows that host a single webview. `WebviewWindow` mixes together the `Window` and `Webview` APIs, so one object exposes both window methods (`setTitle`, `maximize`, `close`, ...) and webview ones (`setZoom`, `clearAllBrowsingData`, ...). Also accessible with `window.__TAURI__.webviewWindow` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

const settings = new WebviewWindow('settings', {
  url: '/settings',
  title: 'Settings'
});
settings.once('tauri://created', () => console.log('window created'));
settings.once('tauri://error', (e) => console.error(e));
```

## Options / Props

### Exports

| Name | Signature | Since |
| --- | --- | --- |
| WebviewWindow | `class WebviewWindow` (interface merges `Webview` and `Window`) | |
| constructor | `new WebviewWindow(label: WebviewLabel, options: Omit<WebviewOptions, 'x' \| 'y' \| 'width' \| 'height'> & WindowOptions = {})` | |
| WebviewWindow.getByLabel | `static getByLabel(label: string): Promise<WebviewWindow \| null>` | |
| WebviewWindow.getCurrent | `static getCurrent(): WebviewWindow` | |
| WebviewWindow.getAll | `static getAll(): Promise<WebviewWindow[]>` | |
| listen | `listen<T>(event: EventName, handler: EventCallback<T>): Promise<UnlistenFn>` (target `WebviewWindow` with this label) | |
| once | `once<T>(event: EventName, handler: EventCallback<T>): Promise<UnlistenFn>` | |
| setBackgroundColor | `setBackgroundColor(color: Color): Promise<void>` | 2.1.0 |
| getCurrentWebviewWindow | `getCurrentWebviewWindow(): WebviewWindow` | 2.0.0 |
| getAllWebviewWindows | `getAllWebviewWindows(): Promise<WebviewWindow[]>` (permission `core:window:allow-get-all-windows`, in `core:window:default`) | 2.0.0 |
| DragDropEvent, Color | re-exported types | |

All other methods come from `Window` (window methods take precedence; "Order matters, we use window APIs by default") and `Webview`; see their pages for signatures and permissions.

## Notes

- Creating a webview window requires `core:webview:allow-create-webview-window`, which is not included in `core:webview:default`. Inherited methods each document their own permission.
- Unlike child webviews, `new WebviewWindow(...)` does not require the `unstable` Cargo feature.
- Labels must be alphanumeric: `a-zA-Z-/:_`.
- The `parent` option may be a label string or a window object; it is sent as a label.
- `setBackgroundColor` requires both `core:window:allow-set-background-color` and `core:webview:allow-set-webview-background-color` (neither in a default set). Android / iOS: unsupported for the window layer; macOS / iOS: not implemented for the webview layer; Windows: alpha ignored for the window layer, and for the webview layer alpha other than `0` is ignored on Windows 8 and newer (all alpha on Windows 7).
- Listeners are removed automatically when the window is destroyed; call the returned function when the listener's own scope ends.
- Tauri (Rust core + system WebView). Not Electron's API (`BrowserWindow`); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/webviewWindow.ts`.

## Related

- [window](./window.md)
- [window-types](./window-types.md) (`WindowOptions`)
- [webview](./webview.md) (`WebviewOptions`)
