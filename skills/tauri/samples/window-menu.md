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
        .run(tauri::generate_context!());
}
```

Menu events (Rust)

```rust
use tauri::menu::{MenuBuilder};

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

```javascript
import { Menu, MenuItem, Submenu, NativeIcon } from '@tauri-apps/api/menu';

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

Predefined items (Rust)

```rust
use tauri::menu::{MenuBuilder, PredefinedMenuItem};

fn main() {
  tauri::Builder::default()
        .setup(|app| {
      let menu = MenuBuilder::new(app)
                .copy()
                .separator()
                .undo()
                .redo()
                .cut()
                .paste()
                .select_all()
                .item(&PredefinedMenuItem::copy(app, Some("custom text"))?)
                .build()?;
            app.set_menu(menu)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Releasing JavaScript menu resources

```typescript
import { Menu, PredefinedMenuItem } from '@tauri-apps/api/menu';

await using copy = await PredefinedMenuItem.new({ item: 'Copy' });
await using menu = await Menu.new({ items: [copy] });
await using prev = await menu.setAsAppMenu();
```

## Notes

- Tauri `tauri::menu` / `@tauri-apps/api/menu`. Not Electron's `Menu` / `MenuItem` API; see the electron skill for Electron.
- Desktop only. On macOS, with submenus all items must be grouped under a submenu (top-level items are ignored) and the first submenu goes under the application menu regardless of its `text`.
- JavaScript menus are resource references that are not garbage-collected automatically; call `close()` or use `await using` (Tauri 2.12+, may need a polyfill for Explicit Resource Management).
- Submenu icons are available since Tauri 2.8.0; the Rust `Image` API needs the `image-ico` or `image-png` feature.
- The official page also shows a multi-level Rust example with `SubmenuBuilder`, `CheckMenuItemBuilder`, `IconMenuItemBuilder`, and a "change menu status" example; only a subset is reproduced here.
- The official "listen to events" and predefined-item Rust snippets omit `.run(...)` and the release snippet omits its import; both are added here.
- The official example passes `icon: 'folder'`, which is treated as an image path; `NativeIcon.Folder` is used here for the native folder icon.
