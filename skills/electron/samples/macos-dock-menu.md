---
source: https://www.electronjs.org/docs/latest/tutorial/macos-dock
---

# macOS Dock Menu

Attach a custom menu to the app's Dock icon with `app.dock.setMenu` (macOS only).

```js
const { app, BrowserWindow, Menu } = require('electron/main')

// dock.setMenu only works after the 'ready' event is fired
app.whenReady().then(() => {
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click: () => {
        const win = new BrowserWindow()
      }
    }
    // add more menu options to the array
  ])

  // Dock is undefined on platforms outside of macOS
  // highlight-next-line
  app.dock?.setMenu(dockMenu)
})
```

## Notes

- `app.dock` exists only on macOS, so use optional chaining on other platforms. `dock.setMenu` works only after `ready`.
- The Dock menu is triggered by right-click or Ctrl-click and also contains system-provided window management items.
- A `MenuItem` `badge` is not displayed in a Dock menu (it is in an application menu).
- Dock menus do not need manual `menu.popup`; the Dock handles clicks.
- Distance: `Dock` is Electron's wrapper around the macOS Dock; native AppKit APIs (NSDockTile, NSMenu) are in apple-appkit.
