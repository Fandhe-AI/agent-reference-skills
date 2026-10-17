---
source: https://www.electronjs.org/docs/latest/api/global-shortcut
---

# globalShortcut

Detect keyboard events when the application does not have keyboard focus. Process: Main.

## Signature / Usage

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
```

## Methods

| Method | Description |
| --- | --- |
| `globalShortcut.register(accelerator, callback)` | `accelerator` string, `callback` Function. Returns `boolean` - whether the shortcut was registered successfully. Registers a global shortcut; `callback` is called when pressed. |
| `globalShortcut.registerAll(accelerators, callback)` | `accelerators` string[], `callback` Function. Registers a global shortcut of all `accelerator` items; `callback` is called when any is pressed. |
| `globalShortcut.isRegistered(accelerator)` | Returns `boolean` - whether this application has registered `accelerator`. |
| `globalShortcut.unregister(accelerator)` | Unregisters the global shortcut of `accelerator`. |
| `globalShortcut.unregisterAll()` | Unregisters all of the global shortcuts. |
| `globalShortcut.setSuspended(suspended)` | `suspended` boolean. Suspends or resumes global shortcut handling. While suspended, all registered shortcuts stop listening and new registrations fail. Useful to let the user press key combinations without interception, e.g. while displaying a UI to rebind shortcuts. |
| `globalShortcut.isSuspended()` | Returns `boolean` - whether global shortcut handling is currently suspended. |

## Notes

- The shortcut is global; it works even if the app does not have keyboard focus. This module cannot be used before the `ready` event of the app module is emitted.
- When the accelerator is already taken by other applications, `register` / `registerAll` silently fail (intended by operating systems), and `isRegistered` still returns `false`.
- On macOS 10.14 Mojave, "Media Play/Pause", "Media Next Track", "Media Previous Track" and "Media Stop" will not register unless the app has been authorized as a trusted accessibility client.
- Linux X11: shortcuts are grabbed directly from the X server and work like on other platforms.
- Linux Wayland: Electron uses the `org.freedesktop.portal.GlobalShortcuts` portal. The app must have a valid portal identity: set `desktopName` in `package.json` (or call `app.setDesktopName()`) to a reverse-DNS ID matching the installed `.desktop` file, e.g. `com.example.MyApp.desktop`; with an invalid ID, GNOME 50.0/50.1 denies every bind silently. GNOME shows a consent dialog the first time an app binds shortcuts; KDE Plasma binds silently. Bindings persist across relaunches, keyed by the portal identity. The `GlobalShortcutsPortal` and `GlobalShortcutsPortalPreferredTrigger` features are on by default (see https://github.com/electron/electron/pull/52221).
- History: added - https://github.com/electron/electron/pull/534 (`register`, `isRegistered`, `unregister`, `unregisterAll`); added - https://github.com/electron/electron/pull/15542 (`registerAll`); added - https://github.com/electron/electron/pull/50425 (`setSuspended`, `isSuspended`).
- Guide: https://www.electronjs.org/docs/latest/tutorial/keyboard-shortcuts

## Related

- [Menu](./menu.md)
- [MenuItem](./menu-item.md)
