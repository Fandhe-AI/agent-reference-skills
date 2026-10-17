---
source: https://www.electronjs.org/docs/latest/api/web-contents-view
---

# WebContentsView

A View that displays a WebContents. Class `WebContentsView` extends `View`. Process: Main. This module cannot be used until the `ready` event of the `app` module is emitted. `WebContentsView` is an EventEmitter. Electron's built-in classes cannot be subclassed in user code.

## Signature / Usage

```js
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 400 })

const view1 = new WebContentsView()
win.contentView.addChildView(view1)
view1.webContents.loadURL('https://electronjs.org')
view1.setBounds({ x: 0, y: 0, width: 400, height: 400 })

const view2 = new WebContentsView()
win.contentView.addChildView(view2)
view2.webContents.loadURL('https://github.com/electron/electron')
view2.setBounds({ x: 400, y: 0, width: 400, height: 400 })
```

### `new WebContentsView([options])`

* `options` Object (optional)
  * `webPreferences` WebPreferences (optional) - Settings of web page's features.
  * `webContents` WebContents (optional) - If present, the given WebContents will be adopted by the WebContentsView. A WebContents may only be presented in one WebContentsView at a time.

Creates a WebContentsView.

### Instance Properties

Objects created with `new WebContentsView` have the following properties, in addition to those inherited from View:

#### `view.webContents` _Readonly_

A `WebContents` property containing a reference to the displayed `WebContents`. Use this to interact with the `WebContents`, for instance to load a URL.

```js
const { WebContentsView } = require('electron')

const view = new WebContentsView()
view.webContents.loadURL('https://electronjs.org/')
```

## Notes

* `WebContentsView` replaces the deprecated `BrowserView` (see [browser-view.md](./browser-view.md)).
* When a `WebContentsView` is added to a `BaseWindow` and the window is closed, its `webContents` are not destroyed automatically; close them yourself (see [base-window-overview.md](./base-window-overview.md)).
* Embedding web content: for WebView2 in WinUI apps see windows-winui-controls; for automating Electron webviews in tests see playwright.

## Related

* [View](./view.md)
* [BaseWindow overview](./base-window-overview.md)
* [WebPreferences](./web-preferences.md)
* [Web Embeds](./web-embeds.md)
