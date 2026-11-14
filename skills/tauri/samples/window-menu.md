---
source: https://v2.tauri.app/learn/window-menu/
---

# Window Menu

Create a native application menu with items, check items, submenus and predefined items from JavaScript or Rust, and handle menu events.

Base-level menu (JavaScript)

```javascript
import { Menu } from '@tauri-apps/api/menu';

await using menu = await Menu.new({
  items: [
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        console.log('quit pressed');
      },
    },
    {
      id: 'check_item',
      text: 'Check Item',
      checked: true,
    },
    {
      item: 'Separator',
    },
    {
      id: 'disabled_item',
      text: 'Disabled Item',
      enabled: false,
    },
    {
      id: 'status',
      text: 'Status: Processing...',
    },
  ],
});

// If a window was not created with an explicit menu or had one set explicitly,
// this menu will be assigned to it.
//
// NOTE: will be empty macOS. On macOS, all top-level entries must be SubMenus.
await menu.setAsAppMenu();

// Update individual menu item text
await using statusItem = await menu.get('status');
if (statusItem) {
  await statusItem.setText('Status: Ready');
}
```

Base-level menu (Rust)

```rust
use tauri::menu::MenuBuilder;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // NOTE: will be empty on macOS. On macOS, all top-level entries must be Submenus.
            let menu = MenuBuilder::new(app)
                .text("open", "Open")
                .text("close", "Close")
                .check("check_item", "Check Item")
                .separator()
                .text("disabled_item", "Disabled Item")
                .text("status", "Status: Processing...")
                .build()?;

            app.set_menu(menu.clone())?;

            // Update individual menu item text
            menu
                .get("status")
                .unwrap()
                .as_menuitem_unchecked()
                .set_text("Status: Ready")?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Menu events (Rust)

```rust
use tauri::menu::MenuBuilder;

fn main() {
  tauri::Builder::default()
        .setup(|app| {
            let menu = MenuBuilder::new(app)
                .text("open", "Open")
                .text("close", "Close")
                .build()?;

            app.set_menu(menu)?;

            app.on_menu_event(move |app_handle: &tauri::AppHandle, event| {

                println!("menu event: {:?}", event.id());

                match event.id().0.as_str() {
                    "open" => {
                        println!("open event");
                    }
                    "close" => {
                        println!("close event");
                    }
                    _ => {
                        println!("unexpected menu event");
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Multi-level menu (JavaScript)

Adapted (not in the official docs): `icon: NativeIcon.Folder` replaces the official `icon: 'Folder'`, and `NativeIcon` is imported.

```javascript
import { Menu, Submenu, NativeIcon } from '@tauri-apps/api/menu';

// Will become the application submenu on MacOS
await using aboutSubmenu = await Submenu.new({
  text: 'About',
  items: [
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        console.log('Quit pressed');
      },
    },
  ],
});

await using fileSubmenu = await Submenu.new({
  text: 'File',
  icon: NativeIcon.Folder, // Optional: Add an icon to the submenu
  items: [
    {
      id: 'new',
      text: 'New',
      action: () => {
        console.log('New clicked');
      },
    },
    {
      id: 'open',
      text: 'Open',
      action: () => {
        console.log('Open clicked');
      },
    },
  ],
});

await using menu = await Menu.new({
  items: [aboutSubmenu, fileSubmenu],
});

await menu.setAsAppMenu();
```

Predefined items (JavaScript)

```javascript
import { Menu, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu';

// macOS injects additional "Writing Tools" menu items into your "Edit" menu,
// or, if that's missing, whichever menu has this copy item:
await using copy = await PredefinedMenuItem.new({
  text: 'copy-text',
  item: 'Copy',
});

await using separator = await PredefinedMenuItem.new({
  text: 'separator-text',
  item: 'Separator',
});

await using undo = await PredefinedMenuItem.new({
  text: 'undo-text',
  item: 'Undo',
});

await using redo = await PredefinedMenuItem.new({
  text: 'redo-text',
  item: 'Redo',
});

await using cut = await PredefinedMenuItem.new({
  text: 'cut-text',
  item: 'Cut',
});

await using paste = await PredefinedMenuItem.new({
  text: 'paste-text',
  item: 'Paste',
});

await using select_all = await PredefinedMenuItem.new({
  text: 'select_all-text',
  item: 'SelectAll',
});

// Becomes the application submenu on MacOS
await using about = await Submenu.new({ text: 'About', items: [] });

await using predefined = await Submenu.new({
  text: 'Predefined',
  items: [copy, separator, undo, redo, cut, paste, select_all],
});

await using menu = await Menu.new({
  items: [about, predefined],
});

await menu.setAsAppMenu();
```

Predefined items (Rust)

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::menu::{MenuBuilder, PredefinedMenuItem, SubmenuBuilder};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Becomes the application submenu on macOS
            let about_menu = SubmenuBuilder::new(app, "About").build()?;

            let predefined_menu = SubmenuBuilder::new(app, "Predefined")
                .copy()
                .separator()
                .undo()
                .redo()
                .cut()
                .paste()
                .select_all()
                .item(&PredefinedMenuItem::copy(app, Some("custom text"))?)
                .build()?;

            let menu = MenuBuilder::new(app)
                .items(&[&about_menu, &predefined_menu])
                .build()?;
            app.set_menu(menu)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Releasing JavaScript menu resources

Adapted (not in the official docs): the import line is added; the official snippet in this section has none.

```typescript
import { Menu, PredefinedMenuItem } from '@tauri-apps/api/menu';

await using copy = await PredefinedMenuItem.new({ item: 'Copy' });
await using menu = await Menu.new({ items: [copy] });
await using prev = await menu.setAsAppMenu();
```

## Notes

- Tauri `tauri::menu` / `@tauri-apps/api/menu`. Not Electron's `Menu` / `MenuItem` API; see the electron skill for Electron.
- Desktop only. On macOS, all items in an application menu must be grouped under submenus (top-level items are ignored), and the first submenu always becomes the application's about menu regardless of its `text` label, so include a submenu such as "About" as the first entry.
- On macOS, additional "Writing Tools" items are injected into an "Edit" menu, or, failing that, any menu with the "Copy" command.
- JavaScript menus are resource references that are not garbage-collected automatically; call `close()` or use `await using` (Tauri 2.12+, may need a polyfill for Explicit Resource Management).
- Submenu icons are available since Tauri 2.8.0; the Rust `Image` API needs the `image-ico` or `image-png` feature.
- The official page also shows a multi-level Rust example with `SubmenuBuilder`, `CheckMenuItemBuilder`, `IconMenuItemBuilder`, and a "change menu status" example; only a subset is reproduced here.
- The release snippet omits its import in the official page; the import line is added here. Since tauri-docs@ed0786e the official Rust snippets include `.run(...)` and the predefined-item examples are wrapped in an "About" submenu plus a "Predefined" submenu.
- In the official "change menu status" example, JavaScript items that are used inside their own `action` callbacks are created without `await using` and must be closed manually later.
- The official example passes `icon: 'Folder'` (`'folder'` before tauri-docs@ed0786e); `NativeIcon.Folder` is used here for the native folder icon.
- Source: https://github.com/tauri-apps/tauri-docs/blob/ed0786ec86699e4ffd08f3234e37aa125becb9eb/src/content/docs/learn/window-menu.mdx (fetched 2026-11-14)
