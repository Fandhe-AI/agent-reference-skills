---
source: https://www.electronjs.org/docs/latest/api/base-window#instance-events
---

# BaseWindow constructor, events and static methods

Instance events (`close`, `closed`, `blur`, `focus`, `resize`, `move`, ...) and static methods (`getAllWindows`, `getFocusedWindow`, `fromId`, `clearPersistedState`) of `BaseWindow`. Process: Main.

## Signature / Usage

```js
const { BaseWindow } = require('electron')

const win = new BaseWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward') {
    // Find the appropriate WebContents to navigate.
  }
})
```

### Instance Events

Objects created with `new BaseWindow` emit the following events. Some events are only available on specific operating systems and are labeled as such.

#### Event: 'close'

Returns: `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. For example:

```js
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false
}
```

There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron.

#### Event: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Event: 'query-session-end' _Windows_

Returns: `event` WindowSessionEndEvent

Emitted when a session is about to end due to a shutdown, machine restart, or user log-off. Calling `event.preventDefault()` can delay the system shutdown, though it's generally best to respect the user's choice to end the session. However, you may choose to use it if ending the session puts the user at risk of losing data.

#### Event: 'session-end' _Windows_

Returns: `event` WindowSessionEndEvent

Emitted when a session is about to end due to a shutdown, machine restart, or user log-off. Once this event fires, there is no way to prevent the session from ending.

#### Event: 'blur'

Returns: `event` Event

Emitted when the window loses focus.

#### Event: 'focus'

Returns: `event` Event

Emitted when the window gains focus.

#### Event: 'show'

Emitted when the window is shown.

#### Event: 'hide'

Emitted when the window is hidden.

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

On Wayland, "minimized" is not currently a supported state. The minimize event will only fire when triggered by client-side decoration (e.g. clicking the minimize button on a frameless window's Window Control Overlay)

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'will-resize' _macOS_ _Windows_

Returns:

* `event` Event
* `newBounds` Rectangle - Size the window is being resized to.
* `details` Object
  * `edge` (string) - The edge of the window being dragged for resizing. Can be `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left` or `bottom-right`.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

The possible values and behaviors of the `edge` option are platform dependent. Possible values are:

* On Windows, possible values are `bottom`, `top`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`.
* On macOS, possible values are `bottom` and `right`.
  * The value `bottom` is used to denote vertical resizing.
  * The value `right` is used to denote horizontal resizing.

#### Event: 'resize'

Emitted after the window has been resized.

#### Event: 'resized' _macOS_ _Windows_

Emitted once when the window has finished being resized.

This is usually emitted when the window has been resized manually. On macOS, resizing the window with `setBounds`/`setSize` and setting the `animate` parameter to `true` will also emit this event once resizing has finished.

#### Event: 'will-move' _macOS_ _Windows_

Returns: `event` Event, `newBounds` Rectangle - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being moved manually. Moving the window with `setPosition`/`setBounds`/`center` will not emit this event.

#### Event: 'move'

Emitted when the window is being moved to a new position.

#### Event: 'moved' _macOS_ _Windows_

Emitted once when the window is moved to a new position.

On macOS, this event is an alias of `move`.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'always-on-top-changed'

Returns: `event` Event, `isAlwaysOnTop` boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Returns: `event` Event, `command` string

Emitted when an App Command (https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-appcommand) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Event: 'swipe' _macOS_

Returns: `event` Event, `direction` string

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.

#### Event: 'rotate-gesture' _macOS_

Returns: `event` Event, `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Event: 'sheet-begin' _macOS_

Emitted when the window opens a sheet.

#### Event: 'sheet-end' _macOS_

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' _macOS_

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`.

You must create a window in this handler in order for macOS tabbing to work as expected.

#### Event: 'system-context-menu' _Windows_ _Linux_

Returns: `event` Event, `point` Point - The screen coordinates where the context menu was triggered.

Emitted when the system context menu is triggered on the window, this is normally only triggered when the user right clicks on the non-client area of your window. This is the window titlebar or any area you have declared as `-webkit-app-region: drag` in a frameless window.

Calling `event.preventDefault()` will prevent the menu from being displayed.

To convert `point` to DIP, use `screen.screenToDipPoint(point)`.

#### Event: 'persisted-state-restored'

Emitted after the persisted window state has been restored.

Window state includes the window bounds (x, y, height, width) and display mode (maximized, fullscreen, kiosk).

This event is only emitted when `windowStatePersistence` is enabled in BaseWindowConstructorOptions or in BrowserWindowConstructorOptions (see [window-structures.md](./window-structures.md)).

### Static Methods

The `BaseWindow` class has the following static methods:

#### `BaseWindow.getAllWindows()`

Returns `BaseWindow[]` - An array of all opened browser windows.

#### `BaseWindow.getFocusedWindow()`

Returns `BaseWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BaseWindow.fromId(id)`

* `id` Integer

Returns `BaseWindow | null` - The window with the given `id`.

#### `BaseWindow.clearPersistedState(name)`

* `name` string - The window `name` to clear state for (see BaseWindowConstructorOptions).

Clears the saved state for a window with the given name. This removes all persisted window bounds, display mode, and work area information that was previously saved when `windowStatePersistence` was enabled.

If the window `name` is empty or the window state doesn't exist, the method will log a warning.

## Notes

* Distinct from native window APIs: this is Electron's main-process `BaseWindow`. For WinUI 3 AppWindow see windows-winui-ui, for NSWindow see apple-appkit.

## Related

* [BaseWindow overview](./base-window-overview.md)
* [BaseWindow properties and methods](./base-window-properties-methods.md)
* [Window structures](./window-structures.md)
* [Window options](./window-options.md)
