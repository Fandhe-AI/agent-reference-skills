---
source: https://v2.tauri.app/reference/javascript/api/namespacewebview/
---

# webview

APIs to create webviews, communicate with other webviews and manipulate the current webview. Also accessible with `window.__TAURI__.webview` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { getCurrentWebview } from "@tauri-apps/api/webview";
getCurrentWebview().listen("my-webview-event", ({ event, payload }) => { });
```

## Functions

| Function | Signature | Since |
| --- | --- | --- |
| getCurrentWebview | `getCurrentWebview(): Webview` | 2.0.0 |
| getAllWebviews | `getAllWebviews(): Promise<Webview[]>` (permission `core:webview:allow-get-all-webviews`, in default) | 2.0.0 |

## Webview class

`class Webview` with `label: WebviewLabel` (string), `window: Window`, `listeners`.

| Member | Signature | Permission (not in `core:webview:default` unless noted) |
| --- | --- | --- |
| constructor | `new Webview(window: Window, label: WebviewLabel, options: WebviewOptions)` | `core:webview:allow-create-webview`; needs the `unstable` Cargo feature |
| Webview.getByLabel | `static getByLabel(label: string): Promise<Webview \| null>` | |
| Webview.getCurrent | `static getCurrent(): Webview` | |
| Webview.getAll | `static getAll(): Promise<Webview[]>` | |
| listen | `listen<T>(event: EventName, handler: EventCallback<T>): Promise<UnlistenFn>` | |
| once | `once<T>(event: EventName, handler: EventCallback<T>): Promise<UnlistenFn>` | |
| emit | `emit<T>(event: string, payload?: T): Promise<void>` | |
| emitTo | `emitTo<T>(target: string \| EventTarget, event: string, payload?: T): Promise<void>` | |
| position | `position(): Promise<PhysicalPosition>` | `allow-webview-position` (default) |
| size | `size(): Promise<PhysicalSize>` | `allow-webview-size` (default) |
| close | `close(): Promise<void>` | `allow-webview-close` |
| setSize | `setSize(size: LogicalSize \| PhysicalSize \| Size): Promise<void>` | `allow-set-webview-size` |
| setPosition | `setPosition(position: LogicalPosition \| PhysicalPosition \| Position): Promise<void>` (relative to the hosting window's top-left corner) | `allow-set-webview-position` |
| setFocus | `setFocus(): Promise<void>` | `allow-set-webview-focus` |
| setAutoResize | `setAutoResize(autoResize: boolean): Promise<void>` | `allow-set-webview-auto-resize` |
| hide | `hide(): Promise<void>` | `allow-webview-hide` |
| show | `show(): Promise<void>` | `allow-webview-show` |
| setZoom | `setZoom(scaleFactor: number): Promise<void>` (`1` is 100%) | `allow-set-webview-zoom` |
| reparent | `reparent(window: Window \| WebviewWindow \| string): Promise<void>` | `allow-reparent` |
| clearAllBrowsingData | `clearAllBrowsingData(): Promise<void>` (cookies, localStorage, IndexedDB, caches) | `allow-clear-all-browsing-data` |
| setBackgroundColor | `setBackgroundColor(color: Color \| null): Promise<void>` (2.1.0; `null` resets) | `allow-set-webview-background-color` |
| onDragDropEvent | `onDragDropEvent(handler: EventCallback<DragDropEvent>): Promise<UnlistenFn>` | |

(Permission names are `core:webview:<name>`.)

```typescript
import { getCurrentWebview } from "@tauri-apps/api/webview";
const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
  if (event.payload.type === 'over') {
    console.log('User hovering', event.payload.position);
  } else if (event.payload.type === 'drop') {
    console.log('User dropped', event.payload.paths);
  } else {
    console.log('File drop cancelled');
  }
});
unlisten();
```

### DragDropEvent

```typescript
type DragDropEvent =
  | { type: 'enter'; paths: string[]; position: PhysicalPosition }
  | { type: 'over'; position: PhysicalPosition }
  | { type: 'drop'; paths: string[]; position: PhysicalPosition }
  | { type: 'leave' }
```

Positions are in physical pixels, relative to the webview's top-left corner.

## Creating a child webview

```typescript
import { Window } from "@tauri-apps/api/window"
import { Webview } from "@tauri-apps/api/webview"

const appWindow = new Window('uniqueLabel');

appWindow.once('tauri://created', async function () {
  // `new Webview` should be called after the window is successfully created
  const webview = new Webview(appWindow, 'theUniqueLabel', {
    url: 'path/to/page.html',
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  });

  webview.once('tauri://created', function () { /* webview successfully created */ });
  webview.once('tauri://error', function (e) { /* an error happened creating the webview */ });
});
```

## WebviewOptions

| Name | Type | Description |
| --- | --- | --- |
| url | `string` | Remote URL or local path to open. `data:` URLs need the `webview-data-url` Cargo feature. A local path or route is appended to the application URL (devServer URL in development, `tauri://localhost/` and `https://tauri.localhost/` in production) |
| x, y | `number` | Initial position in logical pixels, relative to the window's top-left corner |
| width, height | `number` | Initial size in logical pixels |
| transparent | `boolean` | Whether the webview is transparent. On Windows, `noRedirectionBitmap` can help avoid a white flash |
| focus | `boolean` | Whether the webview should have focus (2.1.0) |
| dragDropEnabled | `boolean` | Default enabled; disabling is required to use HTML5 drag and drop on Windows |
| acceptFirstMouse | `boolean` | Whether clicking an inactive webview also clicks through on macOS |
| userAgent | `string` | User agent |
| incognito | `boolean` | Incognito mode. Android: unsupported |
| proxyUrl | `string` | `http://` or `socks5://` URL. macOS: needs the `macos-proxy` feature, macOS 14+ |
| zoomHotkeysEnabled | `boolean` | Windows: WebView2 `IsZoomControlEnabled`. macOS / Linux: polyfill zooming with `ctrl/command` + `-/=` in 20% steps from 20% to 1000%, needs `core:webview:allow-set-webview-zoom` (the source TSDoc omits the `core:` prefix). Android / iOS: unsupported |
| useHttpsScheme | `boolean` | Use `https://<scheme>.localhost` instead of `http://<scheme>.localhost` on Windows and Android; default `false` (2.1.0) |
| devtools | `boolean` | Web inspector, enabled by default in debug builds; release builds need the `devtools` feature (2.1.0) |
| backgroundColor | `Color` | Window and webview background color (2.1.0). macOS / iOS: not implemented |
| backgroundThrottling | `BackgroundThrottlingPolicy` | Background throttling behaviour (2.3.0). Linux / Windows / Android unsupported; iOS 17.0+; macOS 14.0+ |
| javascriptDisabled | `boolean` | Disable JavaScript execution |
| allowLinkPreview | `boolean` | Link preview on long press on macOS and iOS; enabled by default |
| disableInputAccessoryView | `boolean` | Disable the iOS input accessory view above the keyboard |
| dataDirectory | `string` | Data directory relative to `appDataDir()/${label}` (2.9.0). macOS / iOS: use `dataStoreIdentifier`; Android unsupported |
| dataStoreIdentifier | `number[]` | 16 u8 numbers (2.9.0). macOS >= 14, iOS >= 17; others unsupported |
| scrollBarStyle | `ScrollBarStyle` | Native scrollbar style, default `default`. Windows: `fluentOverlay` needs WebView2 Runtime 125.0.2535.41+, same value for all webviews; others unsupported |
| generalAutofillEnabled | `boolean` | Browser-level general autofill, default `true`; does not disable password or credit card autofill (2.11.0). Windows only |

## Notes

- Creating child webviews (`new Webview(...)`) is an unstable API: it requires `tauri = { version = "2", features = ["unstable"] }`, otherwise `plugin:webview|create_webview` fails with "unstable feature not supported". Everything else (`getCurrentWebview`, `getAllWebviews`, methods of an existing webview, `WebviewWindow`) works without it.
- Webview labels may only contain alphanumeric characters `a-zA-Z` plus `-`, `/`, `:` and `_`.
- `core:webview:default` only enables `allow-get-all-webviews`, `allow-webview-position`, `allow-webview-size` and `allow-internal-toggle-devtools`.
- Listeners are removed automatically when the webview is destroyed; still call the returned function when the listener's own scope ends.
- When the debugger panel is open, the drop position of drag-drop events may be inaccurate.
- Local events `tauri://created` and `tauri://error` are emitted by the JS object itself.
- Tauri (Rust core + system WebView). Not Electron's API (`WebContentsView` / `BrowserView`); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/webview.ts`.

## Related

- [webview-window](./webview-window.md)
- [window](./window.md)
- [event](./event.md)
- [dpi](./dpi.md)
