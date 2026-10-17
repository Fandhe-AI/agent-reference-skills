---
source: https://v2.tauri.app/reference/javascript/api/namespaceevent/
---

# event

The event system allows you to emit events to the backend and listen to events from it. Also accessible with `window.__TAURI__.event` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { listen } from '@tauri-apps/api/event';
const unlisten = await listen<string>('error', (event) => {
  console.log(`Got error, payload: ${event.payload}`);
});

// call unlisten when your handler goes out of scope e.g. the component is unmounted
unlisten();
```

## Functions

| Function | Signature | Since |
| --- | --- | --- |
| listen | `listen<T>(event: EventName, handler: EventCallback<T>, options?: Options): Promise<UnlistenFn>` | 1.0.0 |
| once | `once<T>(event: EventName, handler: EventCallback<T>, options?: Options): Promise<UnlistenFn>` | 1.0.0 |
| emit | `emit<T>(event: string, payload?: T): Promise<void>` | 1.0.0 |
| emitTo | `emitTo<T>(target: EventTarget \| string, event: string, payload?: T): Promise<void>` | 2.0.0 |

## Types

```typescript
type EventTarget =
  | { kind: 'Any' }
  | { kind: 'AnyLabel'; label: string }
  | { kind: 'App' }
  | { kind: 'Window'; label: string }
  | { kind: 'Webview'; label: string }
  | { kind: 'WebviewWindow'; label: string }

interface Event<T> {
  event: EventName // Event name
  id: number       // Event identifier used to unlisten
  payload: T       // Event payload
}

type EventCallback<T> = (event: Event<T>) => void
type UnlistenFn = () => void
type EventName = `${TauriEvent}` | (string & Record<never, never>)

interface Options {
  target?: string | EventTarget // defaults to { kind: 'Any' }; a string is the label of an AnyLabel target
}
```

## TauriEvent

Built-in event names emitted by Tauri (since 1.1.0). Prefer the `on*` helpers of `Window` / `Webview` when one exists, since they also decode the payload.

| Member | Value | Description |
| --- | --- | --- |
| WINDOW_RESIZED | `tauri://resize` | New inner size, physical pixels. See `Window.onResized` |
| WINDOW_MOVED | `tauri://move` | New outer position, physical pixels. See `Window.onMoved` |
| WINDOW_CLOSE_REQUESTED | `tauri://close-requested` | User requested close. See `Window.onCloseRequested` |
| WINDOW_DESTROYED | `tauri://destroyed` | Window gone; label can be reused |
| WINDOW_FOCUS | `tauri://focus` | Gained focus. See `Window.onFocusChanged` |
| WINDOW_BLUR | `tauri://blur` | Lost focus. See `Window.onFocusChanged` |
| WINDOW_SCALE_FACTOR_CHANGED | `tauri://scale-change` | Scale factor changed. See `Window.onScaleChanged` |
| WINDOW_THEME_CHANGED | `tauri://theme-changed` | System or window theme changed. See `Window.onThemeChanged` |
| WINDOW_CREATED | `tauri://window-created` | A new window was created |
| WINDOW_SUSPENDED | `tauri://suspended` | Event loop suspended. Android: activity paused; never emitted elsewhere |
| WINDOW_RESUMED | `tauri://resumed` | Event loop resumed. Android: activity resumed; never emitted elsewhere |
| WEBVIEW_CREATED | `tauri://webview-created` | A new webview was created |
| DRAG_ENTER | `tauri://drag-enter` | Files dragged onto a webview. See `Webview.onDragDropEvent` |
| DRAG_OVER | `tauri://drag-over` | Dragged files moving over a webview |
| DRAG_DROP | `tauri://drag-drop` | Files dropped onto a webview |
| DRAG_LEAVE | `tauri://drag-leave` | Drag left the webview or was cancelled |

```typescript
import { listen, TauriEvent } from '@tauri-apps/api/event';
const unlisten = await listen(TauriEvent.WINDOW_DESTROYED, (event) => {
  console.log('a window was destroyed', event.payload);
});
```

## emit / emitTo

```typescript
import { emit, emitTo } from '@tauri-apps/api/event';
await emit('frontend-loaded', { loggedIn: true, token: 'authToken' });
await emitTo('main', 'frontend-loaded', { loggedIn: true, token: 'authToken' });
```

## Notes

- Event names must include only alphanumeric characters, `-`, `/`, `:` and `_`.
- All commands used by this module (`core:event:allow-listen`, `allow-unlisten`, `allow-emit`, `allow-emit-to`) are part of the default-enabled `core:event:default` permission set.
- Listeners bound to a window or webview are removed automatically when it is destroyed, but call the returned function when the listener's own scope ends (page navigation, component unmount), otherwise the handler keeps running for the lifetime of the webview.
- `once` removes the listener after the first event.
- `EventTarget` `App` means listeners registered with `app.listen` on the Rust side.
- Tauri (Rust core + system WebView). Not Electron's IPC events; see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/event.ts`.

## Related

- [core](./core.md)
- [window](./window.md)
- [webview](./webview.md)
