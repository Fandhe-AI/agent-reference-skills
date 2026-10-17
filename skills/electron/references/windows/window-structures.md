---
source: https://www.electronjs.org/docs/latest/api/structures/window-session-end-event
---

# Window structures (WindowSessionEndEvent, WindowStatePersistence)

Structures used by `BaseWindow` / `BrowserWindow`: `WindowSessionEndEvent` (argument of the `query-session-end` and `session-end` events, Windows) and `WindowStatePersistence` (value of the `windowStatePersistence` constructor option). Original pages: `api/structures/window-session-end-event` and `api/structures/window-state-persistence`.

## Signature / Usage

```js
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    name: 'main-window',
    width: 800,
    height: 600,
    windowStatePersistence: true
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

(Verbatim official example from the Window State Persistence tutorial (tutorial/window-state-persistence).)

### WindowSessionEndEvent Object extends `Event`

* `reasons` string[] - List of reasons for shutdown. Can be 'shutdown', 'close-app', 'critical', or 'logoff'.

Unfortunately, Windows does not offer a way to differentiate between a shutdown and a reboot, meaning the 'shutdown' reason is triggered in both scenarios. For more details on the `WM_ENDSESSION` message and its associated reasons, refer to the MSDN documentation (https://learn.microsoft.com/en-us/windows/win32/shutdown/wm-endsession).

### WindowStatePersistence Object

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| bounds | boolean (optional) | Whether to persist window position and size across application restarts. Defaults to `true` if not specified. |
| displayMode | boolean (optional) | Whether to persist display modes (fullscreen, kiosk, maximized, etc.) across application restarts. Defaults to `true` if not specified. |

## Notes

* `WindowStatePersistence` is _Experimental_ (see the `windowStatePersistence` option in [window-options.md](./window-options.md)) and has no effect unless the window `name` is set.
* `WindowSessionEndEvent` is passed to the `query-session-end` / `session-end` events on Windows; see [browser-window-events.md](./browser-window-events.md).

## Related

* [Window options](./window-options.md)
* [BaseWindow constructor, events and static methods](./base-window-events-static.md)
* [BrowserWindow events](./browser-window-events.md)
