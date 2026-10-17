---
source: https://v2.tauri.app/reference/javascript/api/namespacewindow/#interfaces
---

# window (enums, interfaces, type aliases)

Types, enums and interfaces exported by `@tauri-apps/api/window` (the `Window` class and functions are in [window](./window.md)).

## Signature / Usage

```typescript
import { getCurrentWindow, Effect, EffectState } from '@tauri-apps/api/window';

await getCurrentWindow().setEffects({
  effects: [Effect.Mica, Effect.Acrylic, Effect.UnderWindowBackground],
  state: EffectState.Active,
  radius: 8
});
```

## Options / Props

### Type aliases

```typescript
type Theme = 'light' | 'dark'
type TitleBarStyle = 'visible' | 'transparent' | 'overlay' // macOS only
type ResizeDirection = 'East' | 'North' | 'NorthEast' | 'NorthWest'
  | 'South' | 'SouthEast' | 'SouthWest' | 'West'
type Color = [number, number, number] | [number, number, number, number]
  | { red: number; green: number; blue: number; alpha: number } | string // each value 0-255; since 2.0.0
type WindowLabel = string
type CursorIcon = 'default' | 'crosshair' | 'hand' | 'arrow' | 'move' | 'text' | 'wait' | 'help'
  | 'progress' | 'notAllowed' | 'contextMenu' | 'cell' | 'verticalText' | 'alias' | 'copy'
  | 'noDrop' | 'grab' | 'grabbing' | 'allScroll' | 'zoomIn' | 'zoomOut'
  | 'eResize' | 'nResize' | 'neResize' | 'nwResize' | 'sResize' | 'seResize' | 'swResize'
  | 'wResize' | 'ewResize' | 'nsResize' | 'neswResize' | 'nwseResize' | 'colResize' | 'rowResize'
```

`TitleBarStyle`: `visible` standard title bar; `transparent` transparent title bar with traffic lights in place; `overlay` content extends under a transparent title bar, leaving only the traffic lights. `CursorIcon` names mirror CSS `cursor` keywords in camelCase; unsupported values fall back to the default arrow. `DragDropEvent` is re-exported from the webview module (see [webview](./webview.md)).

### Enums

| Enum | Members |
| --- | --- |
| UserAttentionType (1.0.0) | `Critical = 1` (macOS: bounces the dock icon until focused; Windows: flashes window and taskbar button until focused), `Informational` (macOS: bounces once; Windows: flashes the taskbar button until focused) |
| ProgressBarStatus (2.0.0) | `None = 'none'`, `Normal = 'normal'`, `Indeterminate = 'indeterminate'` (treated as Normal on Linux and macOS), `Paused = 'paused'` (treated as Normal on Linux), `Error = 'error'` (treated as Normal on Linux) |
| BackgroundThrottlingPolicy (2.0.0) | `Disabled = 'disabled'`, `Throttle = 'throttle'`, `Suspend = 'suspend'` |
| ScrollBarStyle (2.8.0) | `Default = 'default'`, `FluentOverlay = 'fluentOverlay'` (Windows only; needs WebView2 Runtime 125.0.2535.41+) |
| EffectState (2.0.0, macOS only) | `FollowsWindowActiveState = 'followsWindowActiveState'`, `Active = 'active'`, `Inactive = 'inactive'` |

### Effect (2.0.0)

| Member | Value | Platform |
| --- | --- | --- |
| AppearanceBased, Light, Dark, MediumLight, UltraDark | `appearanceBased`, `light`, `dark`, `mediumLight`, `ultraDark` | macOS 10.14-; deprecated since macOS 10.14 |
| Titlebar, Selection | `titlebar`, `selection` | macOS 10.10+ |
| Menu, Popover, Sidebar | `menu`, `popover`, `sidebar` | macOS 10.11+ |
| HeaderView, Sheet, WindowBackground, HudWindow, FullScreenUI, Tooltip, ContentBackground, UnderWindowBackground, UnderPageBackground | `headerView`, `sheet`, `windowBackground`, `hudWindow`, `fullScreenUI`, `tooltip`, `contentBackground`, `underWindowBackground`, `underPageBackground` | macOS 10.14+ |
| LiquidGlassRegular, LiquidGlassClear | `liquidGlassRegular`, `liquidGlassClear` | macOS 26.0+ |
| Mica | `mica` | Windows 11 only |
| Blur | `blur` | Windows 7/10/11(22H1) only; bad performance when resizing/dragging on Windows 11 build 22621 |
| Acrylic | `acrylic` | Windows 10/11; bad performance when resizing/dragging on Windows 10 v1903+ and Windows 11 build 22000 |
| Tabbed, TabbedDark, TabbedLight | `tabbed`, `tabbedDark`, `tabbedLight` | Windows 11 only (matches system dark preference / dark only if system dark enabled / light) |

### Interfaces

### Effects (2.0.0)

| Name | Type | Description |
| --- | --- | --- |
| effects | `Effect[]` | Effects to apply. The first effect supported on the current platform is applied and the rest are ignored, so Windows and macOS effects can be listed together; on macOS one Liquid Glass style and one Visual Effect material can be given so Tauri falls back to the latter on macOS 15 and below |
| state | `EffectState` | macOS only. Ignored for Liquid Glass effects |
| radius | `number` | Corner radius, macOS only |
| color | `Color` | Windows: affects `Blur` and `Acrylic` only on Windows 10 v1903+ (no effect on Windows 7 or 11). macOS: only Liquid Glass effects |
| interactive | `boolean` | Interactive glass behavior; macOS 27.0+, only Liquid Glass effects |

### Monitor (1.0.0)

| Name | Type | Description |
| --- | --- | --- |
| name | `string \| null` | Human-readable name |
| size | `PhysicalSize` | Resolution in physical pixels |
| position | `PhysicalPosition` | Top-left corner relative to the larger full screen area, physical pixels |
| workArea | `{ position: PhysicalPosition; size: PhysicalSize }` | Monitor area excluding taskbars and docks, physical pixels |
| scaleFactor | `number` | Maps physical to logical pixels |

### Others

| Interface | Members |
| --- | --- |
| ScaleFactorChanged (1.0.2) | `scaleFactor: number`, `size: PhysicalSize` |
| WindowSizeConstraints (2.0.0) | `minWidth?`, `minHeight?`, `maxWidth?`, `maxHeight?` (all logical pixels; omit to remove a constraint) |
| ProgressBarState (2.0.0) | `status?: ProgressBarStatus`, `progress?: number` (0 to 100) |
| PreventOverflowMargin (2.5.0) | `width: number`, `height: number` (logical pixels) |

### WindowOptions (1.0.0)

Configuration for `new Window(label, options)`; also the window part of `WebviewWindow` options.

| Name | Type | Description |
| --- | --- | --- |
| center | `boolean` | Show window in the center of the screen |
| x, y | `number` | Initial position in logical pixels from the screen edge; each only applies if the other is also set |
| width, height | `number` | Initial size in logical pixels |
| minWidth, minHeight | `number` | Minimum size, logical; `minWidth` only applies if `minHeight` is also set (and vice versa) |
| maxWidth, maxHeight | `number` | Maximum size, logical; `maxWidth` only applies if `maxHeight` is also set (and vice versa) |
| preventOverflow | `boolean \| PreventOverflowMargin` | Limit the window to monitor size minus taskbar (minus margin) on creation only. iOS / Android unsupported |
| resizable | `boolean` | Resizable |
| title | `string` | Window title |
| fullscreen | `boolean` | Fullscreen mode |
| focus | `boolean` | Initially focused |
| focusable | `boolean` | Can be focused |
| transparent | `boolean` | Transparent; on Windows `noRedirectionBitmap` can avoid a white flash |
| maximized | `boolean` | Maximized on creation |
| visible | `boolean` | Immediately visible on creation |
| decorations | `boolean` | Borders and bars |
| alwaysOnTop | `boolean` | Always on top |
| alwaysOnBottom | `boolean` | Always below other windows |
| contentProtected | `boolean` | Prevent capture by other apps |
| skipTaskbar | `boolean` | Hide the window icon from the taskbar |
| noRedirectionBitmap | `boolean` | Sets `WS_EX_NOREDIRECTIONBITMAP`; Windows only |
| shadow | `boolean` | Shadow (2.0.0); Windows: `false` no effect on decorated windows; Linux unsupported |
| theme | `Theme` | Initial theme; defaults to system. Only implemented on Windows and macOS 10.14+ |
| titleBarStyle | `TitleBarStyle` | macOS title bar style |
| trafficLightPosition | `LogicalPosition` | macOS window controls position; requires `titleBarStyle: 'overlay'` and `decorations: true` (2.4.0) |
| hiddenTitle | `boolean` | Hide title on macOS |
| tabbingIdentifier | `string` | macOS tabbing identifier; windows with the same identifier group together; unset disables automatic tabbing |
| maximizable, minimizable, closable | `boolean` | Native buttons enabled; default `true` |
| parent | `Window \| WebviewWindow \| string` | Parent window or label. Windows: owner window; Linux: transient for parent; macOS: child window |
| visibleOnAllWorkspaces | `boolean` | All workspaces / virtual desktops (2.0.0); Windows / iOS / Android unsupported |
| windowEffects | `Effects` | Requires a transparent window; Linux unsupported |
| backgroundColor | `Color` | Window background color (2.1.0); Android / iOS unsupported; Windows alpha ignored |
| backgroundThrottling | `BackgroundThrottlingPolicy` | (2.3.0) Linux / Windows / Android unsupported; iOS 17.0+; macOS 14.0+ |
| javascriptDisabled | `boolean` | Disable JavaScript execution in the webview |
| allowLinkPreview | `boolean` | Link preview on long press on macOS / iOS; enabled by default |
| disableInputAccessoryView | `boolean` | Disable the iOS input accessory view |
| scrollBarStyle | `ScrollBarStyle` | Native scrollbar style; Windows only, same value for all webviews |
| activityName | `string` | Android activity name to create for this window |
| createdByActivityName | `string` | Android activity creating this webview window (determines the stack) |
| requestedBySceneIdentifier | `string` | UIScene identifier requesting creation (iOS); defaults to the foreground scene |

## Notes

- `CloseRequestedEvent` and the `Window` class are documented in [window](./window.md).
- Tauri (Rust core + system WebView). Not Electron's API (`BrowserWindow` options); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/window.ts`.

## Related

- [window](./window.md)
- [webview-window](./webview-window.md)
- [dpi](./dpi.md)
