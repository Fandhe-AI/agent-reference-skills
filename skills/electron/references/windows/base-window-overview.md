---
source: https://www.electronjs.org/docs/latest/api/base-window
---

# BaseWindow overview and resource management

Create and control windows. Process: Main. `BaseWindow` provides a flexible way to compose multiple web views in a single window. For windows with only a single, full-size web view, the `BrowserWindow` class may be a simpler option. This module cannot be used until the `ready` event of the `app` module is emitted.

## Signature / Usage

```js
// In the main process.
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 600 })

const leftView = new WebContentsView()
leftView.webContents.loadURL('https://electronjs.org')
win.contentView.addChildView(leftView)

const rightView = new WebContentsView()
rightView.webContents.loadURL('https://github.com/electron/electron')
win.contentView.addChildView(rightView)

leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 })
rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 })
```

## Parent and child windows

By using `parent` option, you can create child windows:

```js
const { BaseWindow } = require('electron')

const parent = new BaseWindow()
const child = new BaseWindow({ parent })
```

The `child` window will always show on top of the `parent` window.

## Modal windows

A modal window is a child window that disables parent window. To create a modal window, you have to set both the `parent` and `modal` options:

```js
const { BaseWindow } = require('electron')

const parent = new BaseWindow()
const child = new BaseWindow({ parent, modal: true })
```

## Platform notices

* On macOS modal windows will be displayed as sheets attached to the parent window.
* On macOS the child windows will keep the relative position to parent window when parent window moves, while on Windows and Linux child windows will not move.
* On Linux the type of modal windows will be changed to `dialog`.
* On Linux many desktop environments do not support hiding a modal window.

## Resource management

When you add a `WebContentsView` to a `BaseWindow` and the `BaseWindow` is closed, the `webContents` of the `WebContentsView` are not destroyed automatically.

It is your responsibility to close the `webContents` when you no longer need them, e.g. when the `BaseWindow` is closed:

```js
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 600 })

const view = new WebContentsView()
win.contentView.addChildView(view)

win.on('closed', () => {
  view.webContents.close()
})
```

Unlike with a `BrowserWindow`, if you don't explicitly close the `webContents`, you'll encounter memory leaks.

## Class: BaseWindow

Create and control windows. Process: Main. `BaseWindow` is an EventEmitter. It creates a new `BaseWindow` with native properties as set by the `options`.

Electron's built-in classes cannot be subclassed in user code. For more information, see the FAQ entry "Class inheritance does not work with Electron built-in modules".

### `new BaseWindow([options])`

* `options` BaseWindowConstructorOptions (optional) - see [window-options.md](./window-options.md)

## Notes

* Distinct from native window APIs: this is Electron's main-process `BaseWindow` (a Chromium-hosting window with no default web view). For WinUI 3 AppWindow see windows-winui-ui, for NSWindow see apple-appkit.

## Related

* [BaseWindow constructor, events and static methods](./base-window-events-static.md)
* [BaseWindow properties and methods](./base-window-properties-methods.md)
* [BrowserWindow overview](./browser-window-overview.md)
* [WebContentsView](./web-contents-view.md)
* [View](./view.md)
