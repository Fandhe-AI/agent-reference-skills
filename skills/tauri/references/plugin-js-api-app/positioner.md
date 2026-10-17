---
source: https://v2.tauri.app/reference/javascript/positioner/
---

# @tauri-apps/plugin-positioner

Move the window to well-known positions, including positions relative to the tray icon.

## Signature / Usage

```typescript
import { moveWindow, Position } from '@tauri-apps/plugin-positioner'

await moveWindow(Position.TopRight)
```

```typescript
function moveWindow(to: Position): Promise<void>              // since 2.0.0
function moveWindowConstrained(to: Position): Promise<void>   // since 2.1.0
function handleIconState(event: TrayIconEvent): Promise<void> // since 2.0.0
```

`TrayIconEvent` is imported from `@tauri-apps/api/tray`.

## Options / Props

`Position` enum (in declaration order, starting at 0):

| Member | Description |
| --- | --- |
| TopLeft | Top left corner of the screen. |
| TopRight | Top right corner of the screen. |
| BottomLeft | Bottom left corner of the screen. |
| BottomRight | Bottom right corner of the screen. |
| TopCenter | Top center of the screen. |
| BottomCenter | Bottom center of the screen. |
| LeftCenter | Vertically centered on the left edge of the screen. |
| RightCenter | Vertically centered on the right edge of the screen. |
| Center | Center of the screen. |
| TrayLeft | Above the tray icon, aligned with its left edge. |
| TrayBottomLeft | Directly below the tray icon, aligned with its left edge. |
| TrayRight | Above the tray icon, aligned with its right edge. |
| TrayBottomRight | Directly below the tray icon, aligned with its right edge. |
| TrayCenter | Above the tray icon, horizontally centered on it. |
| TrayBottomCenter | Directly below the tray icon, horizontally centered on it. |

## Notes

- All positions are relative to the current screen.
- `Tray*` positions require the `tray-icon` feature and the tray icon's events to be forwarded through `handleIconState`.
- `moveWindowConstrained` (uses `WindowExt.move_window_constrained()`) constrains the window to the screen dimensions in case of tray-icon positions.
- `handleIconState` is an internal helper meant to be called from the tray icon's event handler (the `action` callback passed to `TrayIcon.new()`), forwarding every `TrayIconEvent`.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@positioner-v2.4.0` `plugins/positioner/guest-js/index.ts`.

```typescript
import { handleIconState } from '@tauri-apps/plugin-positioner'
import { TrayIcon, type TrayIconEvent } from '@tauri-apps/api/tray'

const action = async (event: TrayIconEvent) => {
  await handleIconState(event)
}

const tray = await TrayIcon.new({ id: 'main', action })
```

## Related

- [positioner plugin](../plugins-app/positioner.md)
