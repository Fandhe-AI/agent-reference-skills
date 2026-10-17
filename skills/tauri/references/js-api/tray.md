---
source: https://v2.tauri.app/reference/javascript/api/namespacetray/
---

# tray

Create and manipulate system tray (menu bar / notification area) icons. Tray icons are created with `TrayIcon.new` and live on the Rust side (`TrayIcon extends Resource`). Also accessible with `window.__TAURI__.tray` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app';

await using menu = await Menu.new({
  items: [{ id: 'quit', text: 'Quit', action: () => console.log('quit') }]
});

const tray = await TrayIcon.new({
  id: 'main-tray',
  icon: (await defaultWindowIcon()) ?? undefined,
  menu,
  tooltip: 'My app',
  action: (event) => {
    if (event.type === 'Click') {
      console.log('tray clicked with', event.button);
    }
  }
});
```

## TrayIcon

`public id: string`. The constructor is private; use `TrayIcon.new`.

| Member | Signature |
| --- | --- |
| TrayIcon.new | `static new(options?: TrayIconOptions): Promise<TrayIcon>` |
| TrayIcon.getById | `static getById(id: string): Promise<TrayIcon \| null>` |
| TrayIcon.removeById | `static removeById(id: string): Promise<void>` |
| setIcon | `setIcon(icon: JsImage \| null): Promise<void>` (`null` removes the icon) |
| setMenu | `setMenu(menu: Menu \| Submenu \| null): Promise<void>` |
| setTooltip | `setTooltip(tooltip: string \| null): Promise<void>` |
| setTitle | `setTitle(title: string \| null): Promise<void>` |
| setVisible | `setVisible(visible: boolean): Promise<void>` |
| setTempDirPath | `setTempDirPath(path: string \| null): Promise<void>` (Linux only) |
| setIconAsTemplate | `setIconAsTemplate(asTemplate: boolean): Promise<void>` (macOS only) |
| setIconWithAsTemplate | `setIconWithAsTemplate(icon: JsImage \| null, asTemplate: boolean): Promise<void>` (macOS only; atomic) |
| setShowMenuOnLeftClick | `setShowMenuOnLeftClick(onLeft: boolean): Promise<void>` (since 2.2.0; Linux unsupported) |
| setMenuOnLeftClick | `setMenuOnLeftClick(onLeft: boolean): Promise<void>` (deprecated; use `setShowMenuOnLeftClick`) |

## Options / Props

`TrayIconOptions`:

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | Tray icon id; random if undefined |
| menu | `Menu \| Submenu` | The tray icon menu |
| icon | `JsImage` | Icon bytes or path to the icon file; may need the `image-ico` / `image-png` Cargo features |
| tooltip | `string` | Tooltip |
| title | `string` | Tray title. Linux: not shown unless there is an icon as well. Windows: unsupported |
| tempDirPath | `string` | Linux only; icon is written to disk, usually `$XDG_RUNTIME_DIR/tray-icon` or `$TEMP/tray-icon` |
| iconAsTemplate | `boolean` | Use the icon as a template. macOS only |
| menuOnLeftClick | `boolean` | Deprecated; use `showMenuOnLeftClick`. Default `true`; Linux unsupported |
| showMenuOnLeftClick | `boolean` | Show the tray menu on left click, default `true` (since 2.2.0); Linux unsupported |
| action | `(event: TrayIconEvent) => void` | Handler for an event on the tray icon |

## Event types

```typescript
type MouseButtonState = 'Up' | 'Down'
type MouseButton = 'Left' | 'Right' | 'Middle'
type TrayIconEventType = 'Click' | 'DoubleClick' | 'Enter' | 'Move' | 'Leave'

type TrayIconEventBase<T extends TrayIconEventType> = {
  type: T
  id: string                  // id of the tray icon which triggered this event
  position: PhysicalPosition  // physical position of the click
  rect: { position: PhysicalPosition; size: PhysicalSize } // position and size of the tray icon
}

type TrayIconClickEvent = { button: MouseButton; buttonState: MouseButtonState }

type TrayIconEvent =
  | (TrayIconEventBase<'Click'> & TrayIconClickEvent)
  | (TrayIconEventBase<'DoubleClick'> & Omit<TrayIconClickEvent, 'buttonState'>)
  | TrayIconEventBase<'Enter'>
  | TrayIconEventBase<'Move'>
  | TrayIconEventBase<'Leave'>
```

## Notes

- `defaultWindowIcon()` used in the example requires `core:app:allow-default-window-icon`, which is not part of `core:app:default`.
- All commands used by this module are part of the default-enabled `core:tray:default` permission set. Loading an icon from a path or bytes additionally requires the `image-png` / `image-ico` Cargo features of the `tauri` crate.
- JavaScript cannot run cleanup on garbage collection: the tray icon is cleaned up when the app exits; to remove it early call `TrayIcon.close()`.
- Linux: tray icon events are not emitted (the icon still shows a context menu on right click); the icon sometimes is not visible unless a menu is set (an empty `Menu` is enough); once a menu is set it cannot be removed (`null` has no effect); `setTooltip` unsupported.
- `TrayIcon.removeById` may make the icon disappear if it was not cloned elsewhere or referenced by JS.
- Prefer `setIconWithAsTemplate` over `setIcon` + `setIconAsTemplate` in sequence, which can briefly show the new icon with the previous template setting.
- Tauri (Rust core + system WebView). Not Electron's API (`Tray` of Electron); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/tray.ts`.

## Related

- [menu](./menu.md)
- [image](./image.md)
- [dpi](./dpi.md)
