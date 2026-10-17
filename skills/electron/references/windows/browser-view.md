---
source: https://www.electronjs.org/docs/latest/api/browser-view
---

# BrowserView (deprecated)

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class. A `BrowserView` can be used to embed additional web content into a `BrowserWindow`. It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag. Class: `BrowserView` (Create and control views). Process: Main. This module cannot be used until the `ready` event of the `app` module is emitted. Electron's built-in classes cannot be subclassed in user code.

## Signature / Usage

```js
// In the main process.
const { app, BrowserView, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  const view = new BrowserView()
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  view.webContents.loadURL('https://electronjs.org')
})
```

### `new BrowserView([options])` _Experimental_ _Deprecated_

* `options` Object (optional)
  * `webPreferences` WebPreferences (optional) - Settings of web page's features.

### Instance Properties

#### `view.webContents` _Experimental_ _Deprecated_

A `WebContents` object owned by this view.

### Instance Methods

#### `view.setAutoResize(options)` _Experimental_ _Deprecated_

* `options` Object
  * `width` boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Experimental_ _Deprecated_

* `bounds` Rectangle

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.getBounds()` _Experimental_ _Deprecated_

Returns `Rectangle`

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Experimental_ _Deprecated_

* `color` string - Color in Hex, RGB, ARGB, HSL, HSLA or named CSS color format. The alpha channel is optional for the hex type.

Examples of valid `color` values:

* Hex
  * `#fff` (RGB)
  * `#ffff` (ARGB)
  * `#ffffff` (RRGGBB)
  * `#ffffffff` (AARRGGBB)
* RGB
  * `rgb\(([\d]+),\s*([\d]+),\s*([\d]+)\)`
    * e.g. `rgb(255, 255, 255)`
* RGBA
  * `rgba\(([\d]+),\s*([\d]+),\s*([\d]+),\s*([\d.]+)\)`
    * e.g. `rgba(255, 255, 255, 1.0)`
* HSL
  * `hsl\((-?[\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)`
    * e.g. `hsl(200, 20%, 50%)`
* HSLA
  * `hsla\((-?[\d.]+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)`
    * e.g. `hsla(200, 20%, 50%, 0.5)`
* Color name
  * Options are listed in SkParseColor.cpp (https://source.chromium.org/chromium/chromium/src/+/main:third_party/skia/src/utils/SkParseColor.cpp;l=11-152;drc=eea4bf52cb0d55e2a39c828b017c80a5ee054148)
  * Similar to CSS Color Module Level 3 keywords, but case-sensitive.
    * e.g. `blueviolet` or `red`

Hex format with alpha takes `AARRGGBB` or `ARGB`, _not_ `RRGGBBAA` or `RGB`.

## Notes

* Deprecated: replaced by `WebContentsView` (see [web-contents-view.md](./web-contents-view.md)). The original docs history links the deprecation to the "Deprecated: BrowserView" entry in the breaking changes document.
* `view.setAutoResize` standardized auto-resizing behavior across all platforms (the original docs history links this to the "Behavior Changed: BrowserView.setAutoResize behavior on macOS" breaking-changes entry).
* `win.setBrowserView` / `addBrowserView` etc. on `BrowserWindow` are deprecated as well (see [browser-window-methods-advanced.md](./browser-window-methods-advanced.md)).

## Related

* [WebContentsView](./web-contents-view.md)
* [View](./view.md)
* [BrowserWindow overview](./browser-window-overview.md)
