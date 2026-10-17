---
source: https://www.electronjs.org/docs/latest/api/browser-window
---

# BrowserWindow overview

Create and control browser windows. Process: Main. This module cannot be used until the `ready` event of the `app` module is emitted.

## Signature / Usage

```js
// In the main process.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadFile('index.html')
```

## Window customization

The `BrowserWindow` class exposes various ways to modify the look and behavior of your app's windows. For more details, see the Window Customization tutorial.

## Showing the window gracefully

When loading a page in the window directly, users may see the page load incrementally, which is not a good experience for a native app. To make the window display without a visual flash, there are two solutions for different situations.

### Using the `ready-to-show` event

While loading the page, the `ready-to-show` event will be emitted when the renderer process has rendered the page for the first time if the window has not been shown yet. Showing the window after this event will have no visual flash:

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

This event is usually emitted after the `did-finish-load` event, but for pages with many remote resources, it may be emitted before the `did-finish-load` event.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

### Setting the `backgroundColor` property

For a complex app, the `ready-to-show` event could be emitted too late, making the app feel slow. In this case, it is recommended to show the window immediately, and use a `backgroundColor` close to your app's background:

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Note that even for apps that use `ready-to-show` event, it is still recommended to set `backgroundColor` to make the app feel more native.

Some examples of valid `backgroundColor` values include:

```js
const win = new BrowserWindow()
win.setBackgroundColor('hsl(230, 100%, 50%)')
win.setBackgroundColor('rgb(255, 145, 145)')
win.setBackgroundColor('#ff00a3')
win.setBackgroundColor('blueviolet')
```

For more information about these color types see valid options in `win.setBackgroundColor` ([browser-window-methods-state-bounds.md](./browser-window-methods-state-bounds.md)).

## Parent and child windows

By using `parent` option, you can create child windows:

```js
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

The `child` window will always show on top of the `top` window.

## Modal windows

A modal window is a child window that disables parent window. To create a modal window, you have to set both the `parent` and `modal` options:

```js
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Page visibility

The Page Visibility API works as follows:

* On all platforms, the visibility state tracks whether the window is hidden/minimized or not.
* Additionally, on macOS, the visibility state also tracks the window occlusion state. If the window is occluded (i.e. fully covered) by another window, the visibility state will be `hidden`. On other platforms, the visibility state will be `hidden` only when the window is minimized or explicitly hidden with `win.hide()`.
* If a `BrowserWindow` is created with `show: false`, the initial visibility state will be `visible` despite the window actually being hidden.
* If `backgroundThrottling` is disabled, the visibility state will remain `visible` even if the window is minimized, occluded, or hidden.

It is recommended that you pause expensive operations when the visibility state is `hidden` in order to minimize power consumption.

## Platform notices

* On macOS modal windows will be displayed as sheets attached to the parent window.
* On macOS the child windows will keep the relative position to parent window when parent window moves, while on Windows and Linux child windows will not move.
* On Linux the type of modal windows will be changed to `dialog`.
* On Linux many desktop environments do not support hiding a modal window.
* On Wayland (Linux) it is generally not possible to programmatically resize windows after creation, or to position, move, focus, or blur windows without user input. If your app needs these capabilities, run it in Xwayland by appending the flag `--ozone-platform=x11`.

## Notes

* Distinct from native or UI-toolkit window APIs: this is Electron's main-process `BrowserWindow` (a Chromium-backed window). For WinUI 3 AppWindow / title bar see windows-winui-ui, for NSWindow see apple-appkit, for SwiftUI scenes see apple-swiftui.
* Electron's built-in classes cannot be subclassed in user code (see the class section in browser-window-events.md).

## Related

* [BrowserWindow constructor and instance events](./browser-window-events.md)
* [BaseWindow overview](./base-window-overview.md)
* [Window options](./window-options.md)
