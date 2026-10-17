---
source: https://www.electronjs.org/docs/latest/api/app#methods
---

# app.quit / exit / relaunch / whenReady / focus

Lifecycle and activation methods of `app`. Some methods are only available on specific operating systems and are labeled as such. Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

## Methods

### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0. All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` string[] (optional)
  * `execPath` string (optional)

Relaunches the app when the current instance exits. By default, the new instance will use the same working directory and command line arguments as the current instance. When `args` is specified, the `args` will be passed as the command line arguments instead. When `execPath` is specified, the `execPath` will be executed for the relaunch instead of the current app.

Note that this method does not quit the app when executed. You have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart. When `app.relaunch` is called multiple times, multiple instances will be started after the current instance exits.

### `app.isReady()`

Returns `boolean` - `true` if Electron has finished initializing, `false` otherwise. See also `app.whenReady()`.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus([options])`

* `options` Object (optional)
  * `steal` boolean _macOS_ - Make the receiver the active app even if another app is currently active.

On macOS, makes the application the active app. On Windows, focuses on the application's first window. On Linux, either focuses on the first visible window (X11) or requests focus but may instead show a notification or flash the app icon (Wayland). You should seek to use the `steal` option as sparingly as possible.

### `app.isActive()` _macOS_

Returns `boolean` - `true` if the application is active (i.e. focused).

### `app.hide()` _macOS_

Hides all application windows without minimizing them.

### `app.isHidden()` _macOS_

Returns `boolean` - `true` if the application, including all of its windows, is hidden (e.g. with `Command-H`), `false` otherwise.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath([path])`

* `path` string (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `~/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

## Related

* [app Events: lifecycle and macOS](./app-events-lifecycle.md)
* [app.getPath / setPath / getName / getLocale](./app-paths-name-locale.md)
