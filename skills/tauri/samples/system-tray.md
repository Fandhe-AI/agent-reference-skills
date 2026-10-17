---
source: https://v2.tauri.app/learn/system-tray/
---

# System Tray

Create a tray icon with a menu, menu event handling and tray mouse events from JavaScript or Rust.

`src-tauri/Cargo.toml`

```toml
tauri = { version = "2.0.0", features = [ "tray-icon" ] }
```

Create the tray icon with the application icon and a menu (JavaScript)

```javascript
import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app';

const menu = await Menu.new({
  items: [
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        console.log('quit pressed');
      },
    },
  ],
});

const options = {
  icon: await defaultWindowIcon(),
  menu,
  showMenuOnLeftClick: true,
};

const tray = await TrayIcon.new(options);
```

Create the tray icon with a menu (Rust)

```rust
use tauri::{
  menu::{Menu, MenuItem},
  tray::TrayIconBuilder,
};

tauri::Builder::default()
    .setup(|app| {
        let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
        let menu = Menu::with_items(app, &[&quit_i])?;

        let tray = TrayIconBuilder::new()
          .icon(app.default_window_icon().unwrap().clone())
          .menu(&menu)
          .show_menu_on_left_click(true)
          .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => {
              println!("quit menu item was clicked");
              app.exit(0);
            }
            _ => {
              println!("menu item {:?} not handled", event.id);
            }
          })
          .build(app)?;
        Ok(())
    })
```

Listen to tray mouse events (Rust)

```rust
use tauri::{
    Manager,
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent}
};

TrayIconBuilder::new()
  .on_tray_icon_event(|tray, event| match event {
    TrayIconEvent::Click {
      button: MouseButton::Left,
      button_state: MouseButtonState::Up,
      ..
    } => {
      println!("left click pressed and released");
      // in this example, let's show and focus the main window when the tray is clicked
      let app = tray.app_handle();
      if let Some(window) = app.get_webview_window("main") {
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();
      }
    }
    _ => {
      println!("unhandled event {event:?}");
    }
  })
```

Listen to tray mouse events (JavaScript)

```javascript
import { TrayIcon } from '@tauri-apps/api/tray';

const options = {
  action: (event) => {
    switch (event.type) {
      case 'Click':
        console.log(
          `mouse ${event.button} button pressed, state: ${event.buttonState}`
        );
        break;
      case 'DoubleClick':
        console.log(`mouse ${event.button} button pressed`);
        break;
      case 'Enter':
        console.log(
          `mouse hovered tray at ${event.rect.position.x}, ${event.rect.position.y}`
        );
        break;
      case 'Move':
        console.log(
          `mouse moved on tray at ${event.rect.position.x}, ${event.rect.position.y}`
        );
        break;
      case 'Leave':
        console.log(
          `mouse left tray at ${event.rect.position.x}, ${event.rect.position.y}`
        );
        break;
    }
  },
};

const tray = await TrayIcon.new(options);
```

## Notes

- Tauri `tray-icon` feature and `TrayIcon` / `TrayIconBuilder` APIs (Rust core + system WebView). Not Electron's `Tray` / `Menu` API; see the electron skill for Electron.
- By default the menu is shown on both left and right clicks; use `show_menu_on_left_click(false)` (Rust) or `showMenuOnLeftClick: false` (JavaScript, Linux unsupported) to prevent left-click popup.
- Linux: tray mouse events (click, double click, enter, move, leave) are not emitted, although the icon is shown and a right click still shows the context menu.
- The official page uses `menuOnLeftClick`, which is deprecated in @tauri-apps/api 2.2.0 in favor of `showMenuOnLeftClick`.
- The Rust and JavaScript blocks above are the official page's separate snippets combined into one per language for the menu case; the tray-event snippets are verbatim.
