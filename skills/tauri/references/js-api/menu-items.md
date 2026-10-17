---
source: https://v2.tauri.app/reference/javascript/api/namespacemenu/#menuitem
---

# menu items (MenuItem, CheckMenuItem, IconMenuItem, PredefinedMenuItem)

Item classes of the `menu` namespace. Each extends `MenuItemBase` (`id: string`, plus `rid` and `close()` from `Resource`); constructors are protected, create with the static `new`.

## Signature / Usage

```typescript
import { MenuItem } from '@tauri-apps/api/menu';

await MenuItem.new({ text: 'Find', accelerator: 'CmdOrCtrl+F' });
await MenuItem.new({ text: 'Command palette', accelerator: 'CmdOrCtrl+Shift+P' });
await MenuItem.new({ text: 'Refresh', accelerator: 'F5' });
```

## Options / Props

### MenuItem

A menu item that contains only text. `static new(opts: MenuItemOptions): Promise<MenuItem>`.

### MenuItemOptions

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | Specify an id to use for the new menu item |
| text | `string` | The text of the new menu item |
| enabled | `boolean` | Whether the new menu item is enabled or not |
| accelerator | `string` | Keyboard shortcut, for example `'CmdOrCtrl+Shift+K'` (see below) |
| action | `(id: string) => void` | Handler called when this menu item is activated |

### Methods (MenuItem, CheckMenuItem, IconMenuItem)

| Method | Signature |
| --- | --- |
| text | `text(): Promise<string>` |
| setText | `setText(text: string): Promise<void>` |
| isEnabled | `isEnabled(): Promise<boolean>` |
| setEnabled | `setEnabled(enabled: boolean): Promise<void>` |
| setAccelerator | `setAccelerator(accelerator: string \| null): Promise<void>` (`null` removes it) |

`PredefinedMenuItem` has only `text()` and `setText(text)`.

### Accelerator format

A list of zero or more modifiers followed by exactly one key, joined with `+`. Case insensitive; spaces around tokens ignored; all modifiers before the key.

- Modifiers: `Shift`; `Control`, `Ctrl`; `Alt`, `Option`; `Command`, `Cmd`, `Super`; `CmdOrCtrl`, `CmdOrControl`, `CommandOrCtrl`, `CommandOrControl` (`Command` on macOS and `Control` everywhere else).
- Keys: letters `A`-`Z` (also `KeyA`-`KeyZ`), digits `0`-`9` (also `Digit0`-`Digit9`); punctuation as the character or by name (`` ` ``/`Backquote`, `\`/`Backslash`, `[`/`BracketLeft`, `]`/`BracketRight`, `,`/`Comma`, `=`/`Equal`, `-`/`Minus`, `.`/`Period`, `'`/`Quote`, `;`/`Semicolon`, `/`/`Slash`); `Backspace`, `CapsLock`, `Enter`, `Space`, `Tab`, `Delete`, `End`, `Home`, `Insert`, `PageDown`, `PageUp`, `PrintScreen`, `ScrollLock`, `NumLock`, `Escape` (`Esc`); arrows `ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight` (also `Up`, `Down`, `Left`, `Right`); `F1`-`F24`; numpad `Numpad0`-`Numpad9` (`Num0`-`Num9`), `NumpadAdd`, `NumpadSubtract`, `NumpadMultiply`, `NumpadDivide`, `NumpadDecimal`, `NumpadEnter`, `NumpadEqual` (also with `Num` prefix); media `AudioVolumeUp`, `AudioVolumeDown`, `AudioVolumeMute` (`VolumeUp`, `VolumeDown`, `VolumeMute`).

### CheckMenuItem

Contains text and a check mark or similar toggle. `static new(opts: CheckMenuItemOptions): Promise<CheckMenuItem>`.

| Name | Type | Description |
| --- | --- | --- |
| (all `MenuItemOptions`) | | `CheckMenuItemOptions extends MenuItemOptions` |
| checked | `boolean` | Initial checked state |

Extra methods: `isChecked(): Promise<boolean>`, `setChecked(checked: boolean): Promise<void>`.

### IconMenuItem

Usually contains an icon and a text. `static new(opts: IconMenuItemOptions): Promise<IconMenuItem>`.

| Name | Type | Description |
| --- | --- | --- |
| (all `MenuItemOptions`) | | `IconMenuItemOptions extends MenuItemOptions` |
| icon | `MenuIcon` | Icon for the item (`JsImage \| NativeIcon`). May need the `image-ico` / `image-png` Cargo features |

Extra method: `setIcon(icon: MenuIcon | null): Promise<void>`.

### NativeIcon (enum)

Windows / Linux: unsupported. Members (value equals name): `Add`, `Advanced`, `Bluetooth`, `Bookmarks`, `Caution`, `ColorPanel`, `ColumnView`, `Computer`, `EnterFullScreen`, `Everyone`, `ExitFullScreen`, `FlowView`, `Folder`, `FolderBurnable`, `FolderSmart`, `FollowLinkFreestanding`, `FontPanel`, `GoLeft`, `GoRight`, `Home`, `IChatTheater`, `IconView`, `Info`, `InvalidDataFreestanding`, `LeftFacingTriangle`, `ListView`, `LockLocked`, `LockUnlocked`, `MenuMixedState`, `MenuOnState`, `MobileMe`, `MultipleDocuments`, `Network`, `Path`, `PreferencesGeneral`, `QuickLook`, `RefreshFreestanding`, `Refresh`, `Remove`, `RevealFreestanding`, `RightFacingTriangle`, `Share`, `Slideshow`, `SmartBadge`, `StatusAvailable`, `StatusNone`, `StatusPartiallyAvailable`, `StatusUnavailable`, `StopProgressFreestanding`, `StopProgress`, `TrashEmpty`, `TrashFull`, `User`, `UserAccounts`, `UserGroup`, `UserGuest`.

### PredefinedMenuItem

A native menu item whose behavior is implemented by the OS or Tauri. `static new(opts?: PredefinedMenuItemOptions): Promise<PredefinedMenuItem>`.

```typescript
import { PredefinedMenuItem } from '@tauri-apps/api/menu';
const separator = await PredefinedMenuItem.new({ item: 'Separator' });
```

### PredefinedMenuItemOptions

| Name | Type | Description |
| --- | --- | --- |
| text | `string` | Defaults to the platform's own label; set only to override or localize |
| item | `'Separator' \| 'Copy' \| 'Cut' \| 'Paste' \| 'SelectAll' \| 'Undo' \| 'Redo' \| 'Minimize' \| 'Maximize' \| 'Fullscreen' \| 'Hide' \| 'HideOthers' \| 'ShowAll' \| 'CloseWindow' \| 'Quit' \| 'Services' \| 'BringAllToFront' \| { About: AboutMetadata \| null }` | The predefined item type |

Platform support of `item`: `Separator`, `Copy`, `Cut`, `Paste`, `SelectAll` and `About` on all platforms; `Undo`, `Redo`, `Fullscreen`, `ShowAll`, `Services`, `BringAllToFront` macOS only; `Minimize`, `Maximize`, `Hide`, `HideOthers`, `CloseWindow`, `Quit` unsupported on Linux. Unsupported variants still create an item that does nothing. `{ About: null }` uses values from `tauri.conf.json`.

### AboutMetadata

| Name | Type | Description |
| --- | --- | --- |
| name | `string` | Application name |
| version | `string` | Application version |
| shortVersion | `string` | Short version, e.g. "1.0". Windows / Linux: appended to `version` in parentheses |
| authors | `string[]` | macOS: unsupported |
| comments | `string` | macOS: unsupported |
| copyright | `string` | Copyright |
| license | `string` | macOS: unsupported |
| website | `string` | macOS: unsupported |
| websiteLabel | `string` | macOS: unsupported |
| credits | `string` | Windows / Linux: unsupported |
| icon | `JsImage` | Windows: unsupported |

```typescript
import { Menu, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu';

await using edit = await Submenu.new({
  text: 'Edit',
  items: [
    { item: 'Undo' }, { item: 'Redo' }, { item: 'Separator' },
    { item: 'Cut' }, { item: 'Copy' }, { item: 'Paste' }, { item: 'SelectAll' }
  ]
});

await using quit = await PredefinedMenuItem.new({ item: 'Quit', text: 'Quit my app' });
const menu = await Menu.new({ items: [edit, quit] });
```

## Notes

- An accelerator that cannot be parsed is ignored and the item is created without a shortcut.
- Item `action` handlers are delivered through an internal `Channel<string>`.
- Tauri (Rust core + system WebView). Not Electron's API (`MenuItem` of Electron); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/menu/{menuItem,checkMenuItem,iconMenuItem,predefinedMenuItem}.ts`.

## Related

- [menu](./menu.md)
- [image](./image.md)
- [tray](./tray.md)
