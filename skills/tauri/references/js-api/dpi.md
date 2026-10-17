---
source: https://v2.tauri.app/reference/javascript/api/namespacedpi/
---

# dpi

Size and position types for working with logical and physical pixels. Window and webview APIs report sizes and positions in physical pixels (actual screen pixels), while most browser APIs and the window creation options use logical pixels (physical pixels divided by the monitor scale factor). Also accessible with `window.__TAURI__.dpi` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { getCurrentWindow } from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();
const size = await appWindow.innerSize(); // PhysicalSize
const logical = size.toLogical(await appWindow.scaleFactor());
```

## Options / Props

### Classes

| Class | Members | Since |
| --- | --- | --- |
| LogicalSize | `type = 'Logical'`; `width: number`; `height: number`; `constructor(width, height)` / `({ Logical: { width, height } })` / `({ width, height })`; `toPhysical(scaleFactor: number): PhysicalSize` | 2.0.0 |
| PhysicalSize | `type = 'Physical'`; `width`; `height`; same constructor forms (`{ Physical: {...} }`); `toLogical(scaleFactor: number): LogicalSize` | 2.0.0 |
| Size | `size: LogicalSize \| PhysicalSize`; `constructor(size)`; `toLogical(scaleFactor): LogicalSize`; `toPhysical(scaleFactor): PhysicalSize` | 2.1.0 |
| LogicalPosition | `type = 'Logical'`; `x`; `y`; `constructor(x, y)` / `({ Logical: { x, y } })` / `({ x, y })`; `toPhysical(scaleFactor): PhysicalPosition` | 2.0.0 |
| PhysicalPosition | `type = 'Physical'`; `x`; `y`; same constructor forms; `toLogical(scaleFactor): LogicalPosition` | 2.0.0 |
| Position | `position: LogicalPosition \| PhysicalPosition`; `constructor(position)`; `toLogical(scaleFactor)`; `toPhysical(scaleFactor)` | 2.1.0 |

### Passing to Rust commands

`Size` and `Position` serialize into the shape `tauri::Size` / `tauri::Position` expect (`{ Logical: { width, height } }` / `{ Physical: { ... } }`).

```typescript
import { invoke } from '@tauri-apps/api/core';
import { LogicalSize, PhysicalSize, Size } from '@tauri-apps/api/dpi';

const size: LogicalSize | PhysicalSize = someFunction(); // returns either LogicalSize or PhysicalSize
const validSize = new Size(size);
await invoke("do_something_with_size", { size: validSize });
```

## Notes

- `Size.toLogical` / `Size.toPhysical` and the `Position` equivalents return the inner value untouched when it is already of the requested kind.
- `LogicalSize` / `PhysicalSize` / `LogicalPosition` / `PhysicalPosition` serialize to `{ width, height }` / `{ x, y }` (through `SERIALIZE_TO_IPC_FN`).
- Tauri (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/dpi.ts`.

## Related

- [window](./window.md)
- [webview](./webview.md)
- [core](./core.md)
