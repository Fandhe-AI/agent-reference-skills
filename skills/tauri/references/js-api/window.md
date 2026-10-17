---
source: https://v2.tauri.app/reference/javascript/api/namespacewindow/
---

# window (Window class, functions)

APIs to create windows, communicate with other windows and manipulate the current window. Also accessible with `window.__TAURI__.window` when `app.withGlobalTauri` is `true`. Enums, interfaces and type aliases are in [window-types](./window-types.md).

## Signature / Usage

```typescript
import { Window } from "@tauri-apps/api/window"

const appWindow = new Window('theUniqueLabel');

appWindow.once('tauri://created', function () {
  // window successfully created
});
appWindow.once('tauri://error', function (e) {
  // an error happened creating the window
});

// emit an event to the backend
await appWindow.emit("some-event", "data");
// listen to an event from the backend
const unlisten = await appWindow.listen("event-name", e => {});
unlisten();
```

## Options / Props

### Module functions

| Function | Signature | Since |
| --- | --- | --- |
| getCurrentWindow | `getCurrentWindow(): Window` | 1.0.0 |
| getAllWindows | `getAllWindows(): Promise<Window[]>` (`core:window:allow-get-all-windows`, in default) | 1.0.0 |
| currentMonitor | `currentMonitor(): Promise<Monitor \| null>` | 1.0.0 |
| primaryMonitor | `primaryMonitor(): Promise<Monitor \| null>` | 1.0.0 |
| monitorFromPoint | `monitorFromPoint(x: number, y: number): Promise<Monitor \| null>` | 1.0.0 |
| availableMonitors | `availableMonitors(): Promise<Monitor[]>` | 1.0.0 |
| cursorPosition | `cursorPosition(): Promise<PhysicalPosition>` (relative to the desktop's top-left corner, physical pixels; `core:window:allow-cursor-position`, in default) | 2.0.0 |

Also exported: `Window`, `CloseRequestedEvent`, `LogicalSize`, `PhysicalSize`, `LogicalPosition`, `PhysicalPosition`, `UserAttentionType`, `Effect`, `EffectState`, and the types listed in window-types.

### Window class: construction and lookup

| Member | Signature |
| --- | --- |
| constructor | `new Window(label: WindowLabel, options: WindowOptions = {})` (needs `core:window:allow-create`) |
| Window.getByLabel | `static getByLabel(label: string): Promise<Window \| null>` |
| Window.getCurrent | `static getCurrent(): Window` |
| Window.getAll | `static getAll(): Promise<Window[]>` |
| Window.getFocusedWindow | `static getFocusedWindow(): Promise<Window \| null>` |
| label | `label: WindowLabel` (alphanumeric `a-zA-Z` plus `-`, `/`, `:`, `_`) |

### Window class: events

| Member | Signature |
| --- | --- |
| listen | `listen<T>(event: EventName, handler: EventCallback<T>): Promise<UnlistenFn>` |
| once | `once<T>(event: EventName, handler: EventCallback<T>): Promise<UnlistenFn>` |
| emit | `emit<T>(event: string, payload?: T): Promise<void>` |
| emitTo | `emitTo<T>(target: string \| EventTarget, event: string, payload?: T): Promise<void>` |
| onResized | `onResized(handler: EventCallback<PhysicalSize>): Promise<UnlistenFn>` |
| onMoved | `onMoved(handler: EventCallback<PhysicalPosition>): Promise<UnlistenFn>` |
| onCloseRequested | `onCloseRequested(handler: (event: CloseRequestedEvent) => void \| Promise<void>): Promise<UnlistenFn>` |
| onDragDropEvent | `onDragDropEvent(handler: EventCallback<DragDropEvent>): Promise<UnlistenFn>` |
| onFocusChanged | `onFocusChanged(handler: EventCallback<boolean>): Promise<UnlistenFn>` |
| onScaleChanged | `onScaleChanged(handler: EventCallback<ScaleFactorChanged>): Promise<UnlistenFn>` |
| onThemeChanged | `onThemeChanged(handler: EventCallback<Theme>): Promise<UnlistenFn>` |

```typescript
import { getCurrentWindow } from "@tauri-apps/api/window";
// `confirm` comes from the dialog plugin, which you have to add separately: `pnpm tauri add dialog`
import { confirm } from '@tauri-apps/plugin-dialog';
const unlisten = await getCurrentWindow().onCloseRequested(async (event) => {
  const confirmed = await confirm('Are you sure?');
  if (!confirmed) {
    // user did not confirm closing the window; let's prevent it
    event.preventDefault();
  }
});
```

`CloseRequestedEvent`: `event: EventName`, `id: number`, `preventDefault(): void` (must be called before the handler returns), `isPreventDefault(): boolean`.

### Window class: getters (in `core:window:default`)

| Method | Signature |
| --- | --- |
| scaleFactor | `scaleFactor(): Promise<number>` |
| innerPosition / outerPosition | `(): Promise<PhysicalPosition>` |
| innerSize / outerSize | `(): Promise<PhysicalSize>` (inner excludes title bar and borders) |
| isFullscreen / isMinimized / isMaximized / isFocused / isDecorated / isResizable / isVisible / isAlwaysOnTop / isEnabled | `(): Promise<boolean>` (`isEnabled` since 2.0.0) |
| isMaximizable / isMinimizable | `(): Promise<boolean>` (Linux / iOS / Android unsupported) |
| isClosable | `(): Promise<boolean>` (iOS / Android unsupported) |
| title | `title(): Promise<string>` |
| theme | `theme(): Promise<Theme \| null>` |
| activityName | `activityName(): Promise<string>` (2.11.0; Android only, others reject; `core:window:allow-activity-name` in default) |
| sceneIdentifier | `sceneIdentifier(): Promise<string>` (2.11.0; iOS only, others reject; `core:window:allow-scene-identifier` in default) |

### Window class: setters and actions

Each requires `core:window:allow-<kebab-name>` (not in `core:window:default`), e.g. `setTitle` needs `core:window:allow-set-title`; `clearEffects` uses `allow-set-effects`; `toggleMaximize` uses `allow-toggle-maximize`.

| Method | Signature |
| --- | --- |
| center | `center(): Promise<void>` |
| requestUserAttention | `requestUserAttention(requestType: UserAttentionType \| null): Promise<void>` |
| setResizable | `setResizable(resizable: boolean)` |
| setEnabled | `setEnabled(enabled: boolean)` (2.0.0) |
| setMaximizable / setMinimizable / setClosable | `(value: boolean)` |
| setTitle | `setTitle(title: string)` |
| maximize / unmaximize / toggleMaximize / minimize / unminimize | `(): Promise<void>` |
| show / hide | `(): Promise<void>` |
| close | `close()`: emits a closeRequested event so it can be intercepted |
| destroy | `destroy()`: forces the close without a closeRequested event |
| setDecorations | `setDecorations(decorations: boolean)` |
| setShadow | `setShadow(enable: boolean)` |
| setEffects / clearEffects | `setEffects(effects: Effects)` / `clearEffects()` (2.0.0) |
| setAlwaysOnTop / setAlwaysOnBottom | `(value: boolean)` |
| setContentProtected | `setContentProtected(protected_: boolean)` |
| setSize | `setSize(size: LogicalSize \| PhysicalSize \| Size)` (inner size) |
| setMinSize / setMaxSize | `(size: LogicalSize \| PhysicalSize \| Size \| null \| undefined)` |
| setSizeConstraints | `setSizeConstraints(constraints: WindowSizeConstraints \| null \| undefined)` (logical pixels) |
| setPosition | `setPosition(position: LogicalPosition \| PhysicalPosition \| Position)` (outer position) |
| setFullscreen | `setFullscreen(fullscreen: boolean)` |
| setFullscreenOnMonitor | `setFullscreenOnMonitor(position: PhysicalPosition)` (2.12.0; no-op if no monitor contains the position) |
| setSimpleFullscreen | `setSimpleFullscreen(fullscreen: boolean)` (2.8.0) |
| setFocus | `setFocus()` |
| setFocusable | `setFocusable(focusable: boolean)` |
| setIcon | `setIcon(icon: JsImage)` |
| setSkipTaskbar | `setSkipTaskbar(skip: boolean)` |
| setCursorGrab | `setCursorGrab(grab: boolean)` |
| setCursorVisible | `setCursorVisible(visible: boolean)` |
| setCursorIcon | `setCursorIcon(icon: CursorIcon)` |
| setCursorPosition | `setCursorPosition(position: LogicalPosition \| PhysicalPosition \| Position)` |
| setIgnoreCursorEvents | `setIgnoreCursorEvents(ignore: boolean)` |
| setBackgroundColor | `setBackgroundColor(color: Color)` (2.1.0) |
| startDragging | `startDragging()` |
| startResizeDragging | `startResizeDragging(direction: ResizeDirection)` |
| setBadgeCount | `setBadgeCount(count?: number)` (app-wide) |
| setBadgeLabel | `setBadgeLabel(label?: string)` (macOS only) |
| setOverlayIcon | `setOverlayIcon(icon?: JsImage)` (Windows only) |
| setProgressBar | `setProgressBar(state: ProgressBarState)` |
| setVisibleOnAllWorkspaces | `setVisibleOnAllWorkspaces(visible: boolean)` (2.0.0) |
| setTitleBarStyle | `setTitleBarStyle(style: TitleBarStyle)` (macOS only, 2.0.0) |
| setTheme | `setTheme(theme?: Theme \| null)` (2.0.0) |

## Notes

- `core:window:default` only enables the getters (sizes, positions, monitors, title, theme and the `is*` queries). Creating a window and every method that changes one needs its own permission added to a capability.
- Platform notes: `setMaximizable` on macOS disables the "zoom" button (also used for fullscreen), Linux / iOS / Android unsupported (ignored if not resizable). `setMinimizable` Linux / iOS / Android unsupported. `setClosable` iOS / Android unsupported; on Linux GTK+ may not honor it for visible windows. `setShadow`: Windows `false` has no effect on decorated windows, `true` gives an undecorated window a 1px white border (rounded corners on Windows 11); Linux unsupported. `setEffects`: requires a transparent window; Linux unsupported. `requestUserAttention`: macOS `null` has no effect; Linux urgency levels have the same effect. `setSkipTaskbar`: macOS unsupported. `setCursorGrab`: Linux unsupported; macOS locks the cursor in a fixed location. `setCursorVisible`: Windows hidden only within the window; macOS hidden while the window has input focus. `setBackgroundColor`: Windows alpha ignored; iOS / Android unsupported (use `WebviewWindow.setBackgroundColor` to also change the webview). `setBadgeCount`: Windows unsupported (use `setOverlayIcon`). `setProgressBar`: Linux / macOS app-wide; Linux only on desktop environments with `libunity` (e.g. GNOME). `setVisibleOnAllWorkspaces`: Windows / iOS / Android unsupported. `setTheme`: Linux / macOS app-wide; iOS / Android unsupported. `setFocusable`: on macOS a focused window cannot be unfocused. `theme()`: returns `light` on macOS 10.13 and below.
- `setSimpleFullscreen` on macOS toggles a fullscreen that does not need a new space; on other platforms it equals `setFullscreen`.
- `Monitor.position` and window creation options use different units: convert with `monitor.position.toLogical(monitor.scaleFactor)` before passing to `x` / `y`.
- Listeners are removed automatically when the window is destroyed; call the returned function when the listener's own scope ends.
- Tauri (Rust core + system WebView). Not Electron's API (`BrowserWindow`); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/window.ts`.

## Related

- [window-types](./window-types.md)
- [webview-window](./webview-window.md)
- [dpi](./dpi.md)
- [event](./event.md)
