---
source: https://v2.tauri.app/reference/javascript/api/namespacemenu/
---

# menu (Menu, Submenu)

Build native application, window and context menus. A `Menu` holds items (`MenuItem`, `CheckMenuItem`, `IconMenuItem`, `PredefinedMenuItem`) and `Submenu`s. Use `Menu.setAsAppMenu()` for the macOS application menu, `Menu.setAsWindowMenu()` for the Windows/Linux window menu bar, or `Menu.popup()` for a context menu. Also accessible with `window.__TAURI__.menu` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { Menu } from '@tauri-apps/api/menu';

const menu = await Menu.new({
  items: [
    {
      text: 'File',
      items: [
        { id: 'open', text: 'Open', accelerator: 'CmdOrCtrl+O', action: () => console.log('open') },
        { item: 'Separator' },
        { item: 'Quit' }
      ]
    }
  ]
});
```

## Menu

`class Menu extends MenuItemBase` (base: `id: string`, `rid`, `close()` from `Resource`). Constructor is protected; use the statics.

| Member | Signature |
| --- | --- |
| Menu.new | `static new(opts?: MenuOptions): Promise<Menu>` |
| Menu.default | `static default(): Promise<Menu>` (the default application menu Tauri installs when none is configured) |
| append | `append<T extends Submenu \| MenuItem \| PredefinedMenuItem \| CheckMenuItem \| IconMenuItem \| MenuItemOptions \| SubmenuOptions \| IconMenuItemOptions \| PredefinedMenuItemOptions \| CheckMenuItemOptions>(items: T \| T[]): Promise<void>` |
| prepend | same generic as `append`: `prepend(items: T \| T[]): Promise<void>` |
| insert | `insert(items: T \| T[], position: number): Promise<void>` |
| remove | `remove(item: Submenu \| MenuItem \| PredefinedMenuItem \| CheckMenuItem \| IconMenuItem): Promise<void>` |
| removeAt | `removeAt(position: number): Promise<Submenu \| MenuItem \| PredefinedMenuItem \| CheckMenuItem \| IconMenuItem \| null>` |
| items | `items(): Promise<Array<Submenu \| MenuItem \| PredefinedMenuItem \| CheckMenuItem \| IconMenuItem>>` |
| get | `get(id: string): Promise<Submenu \| MenuItem \| PredefinedMenuItem \| CheckMenuItem \| IconMenuItem \| null>` |
| popup | `popup(at?: PhysicalPosition \| LogicalPosition \| Position, window?: Window): Promise<void>` |
| setAsAppMenu | `setAsAppMenu(): Promise<Menu \| null>` (returns previous app menu) |
| setAsWindowMenu | `setAsWindowMenu(window?: Window): Promise<Menu \| null>` (returns previous window menu) |

### MenuOptions

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | Specify an id to use for the new menu |
| items | `Array<Submenu \| MenuItem \| PredefinedMenuItem \| CheckMenuItem \| IconMenuItem \| MenuItemOptions \| SubmenuOptions \| IconMenuItemOptions \| PredefinedMenuItemOptions \| CheckMenuItemOptions>` | List of items to add to the new menu |

### Context menu

```typescript
import { Menu } from '@tauri-apps/api/menu';
import { LogicalPosition } from '@tauri-apps/api/dpi';

const menu = await Menu.new({
  items: [{ id: 'copy', text: 'Copy', action: () => console.log('copy') }]
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  void menu.popup(new LogicalPosition(event.clientX, event.clientY));
});
```

### App menu

```typescript
await using menu = await Menu.default();
await menu.append({ text: 'Tools', items: [{ id: 'fmt', text: 'Format' }] });
const previous = await menu.setAsAppMenu();
await previous?.close();
```

## Submenu

`class Submenu extends MenuItemBase`. `Submenu.new(opts: SubmenuOptions): Promise<Submenu>`.

`type SubmenuOptions = (Omit<MenuItemOptions, 'accelerator' | 'action'> & MenuOptions) & { icon?: MenuIcon }`

| Member | Signature |
| --- | --- |
| text / setText | `text(): Promise<string>` / `setText(text: string): Promise<void>` |
| isEnabled / setEnabled | `isEnabled(): Promise<boolean>` / `setEnabled(enabled: boolean): Promise<void>` |
| append / prepend / insert | same as `Menu` |
| remove / removeAt / items / get | same as `Menu` |
| popup | `popup(at?: PhysicalPosition \| LogicalPosition, window?: Window): Promise<void>` (position relative to the window's top-left corner) |
| setAsWindowsMenuForNSApp | `setAsWindowsMenuForNSApp(): Promise<void>` (macOS: adds window-switching items) |
| setAsHelpMenuForNSApp | `setAsHelpMenuForNSApp(): Promise<void>` (macOS: adds a search box) |
| setIcon | `setIcon(icon: MenuIcon \| null): Promise<void>` |

## Notes

- Menus live on the Rust side; keep a reference to a menu for as long as it is in use. `close()` releases it; `await using` works (see `Resource`).
- All commands used by this module are part of the default-enabled `core:menu:default` permission set. Menu item icons additionally require the `image-png` / `image-ico` Cargo features of the `tauri` crate.
- macOS: a `Menu` used for the global menubar can only contain `Submenu`s. `setAsWindowMenu` is unsupported on macOS (use `setAsAppMenu`).
- `Menu.default()` contains Edit, Window and Help submenus; macOS adds an application submenu and a View submenu; Windows adds a File submenu (about item in Help); Linux has no File submenu (about item in Help).
- `popup` resolves as soon as the menu is shown, not when an item is picked; use each item's `action` handler.
- `Submenu.setAsWindowsMenuForNSApp` / `setAsHelpMenuForNSApp`: Windows / Linux unsupported. If no menu is the Help menu, macOS uses any menu titled with the localized word "Help".
- Tauri (Rust core + system WebView). Not Electron's API (`Menu` / `MenuItem` of Electron); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/menu.ts`, `menu/menu.ts`, `menu/submenu.ts`, `menu/base.ts`.

## Related

- [menu-items](./menu-items.md)
- [tray](./tray.md)
- [dpi](./dpi.md)
- [image](./image.md)
