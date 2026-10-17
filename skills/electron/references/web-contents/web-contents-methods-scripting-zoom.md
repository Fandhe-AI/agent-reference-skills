---
source: https://www.electronjs.org/docs/latest/api/web-contents#contentsinsertcsscss-options
---

# WebContents methods: insertCSS, executeJavaScript, setWindowOpenHandler, audio, zoom

Instance methods of `WebContents` (Process: Main) for CSS/JS injection, window-open handling, audio muting, caret browsing and zoom.

## Signature / Usage

```js
const win = new BrowserWindow()
win.webContents.on('did-finish-load', () => {
  win.webContents.insertCSS('html, body { background-color: #f00; }')
})
```

## Instance Methods

### `contents.insertCSS(css[, options])`

* `css` string
* `options` Object (optional)
  * `cssOrigin` string (optional) - Can be 'user' or 'author'. Sets the cascade origin of the inserted stylesheet. Default is 'author'.

Returns `Promise<string>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `contents.removeInsertedCSS(key)`

* `key` string

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
const win = new BrowserWindow()

win.webContents.on('did-finish-load', async () => {
  const key = await win.webContents.insertCSS('html, body { background-color: #f00; }')
  win.webContents.removeInsertedCSS(key)
})
```

### `contents.executeJavaScript(code[, userGesture])`

* `code` string
* `userGesture` boolean (optional) - Default is `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

Code execution will be suspended until web page stop loading.

```js
const win = new BrowserWindow()

win.webContents
  .executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature. You can provide any integer here.
* `scripts` WebSource[]
* `userGesture` boolean (optional) - Default is `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` boolean

Ignore application menu shortcuts while this web contents is focused.

### `contents.setWindowOpenHandler(handler)`

* `handler` Function\<WindowOpenHandlerResponse\>
  * `details` Object
    * `url` string - The _resolved_ version of the URL passed to `window.open()`. e.g. opening a window with `window.open('foo')` will yield something like `https://the-origin/the/current/path/foo`.
    * `frameName` string - Name of the window provided in `window.open()`
    * `features` string - Comma separated list of window features provided to `window.open()`.
    * `disposition` string - Can be `default`, `foreground-tab`, `background-tab`, `new-window` or `other`. Corresponds to the manner an associated link was clicked. See Chromium's WindowOpenDisposition.
      * `default` - Indicates Chromium deems in-window navigation valid for a window open call.
      * `foreground-tab` - Corresponds to a left click or shift + middle click.
      * `background-tab` - Corresponds to a middle click or ctrl/cmd + click.
      * `new-window` - Corresponds to a shift + left click.
      * `other` - A catch-all for the remaining Chromium dispositions not handled by Electron.
    * `referrer` Referrer - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.
    * `postBody` PostBody (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.

  Returns `WindowOpenHandlerResponse` - When set to `{ action: 'deny' }` cancels the creation of the new window. `{ action: 'allow' }` will allow the new window to be created. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Called before creating a window when a new window is requested by the renderer, e.g. by `window.open()`, a link with `target="_blank"`, shift+clicking on a link, or submitting a form with `<form target="_blank">`. See `window.open()` for more details and how to use this in conjunction with `did-create-window`.

An example showing how to customize the process of new `BrowserWindow` creation to be `BrowserView` attached to main window instead:

```js
const { BrowserView, BrowserWindow } = require('electron')

const mainWindow = new BrowserWindow()

mainWindow.webContents.setWindowOpenHandler((details) => {
  return {
    action: 'allow',
    createWindow: (options) => {
      const browserView = new BrowserView(options)
      mainWindow.addBrowserView(browserView)
      browserView.setBounds({ x: 0, y: 0, width: 640, height: 480 })
      // For `background-tab` disposition (e.g., when middle-clicking or ctrl/cmd-clicking a link),
      // `options.webContents` is undefined because its creation can be deferred. So load the URL manually.
      if (details.disposition === 'background-tab') {
        browserView.webContents.loadURL(details.url)
      }
      return browserView.webContents
    }
  }
})
```

### `contents.setAudioMuted(muted)`

* `muted` boolean

Mute the audio on the current web page.

### `contents.isAudioMuted()`

Returns `boolean` - Whether this page has been muted.

### `contents.isCurrentlyAudible()`

Returns `boolean` - Whether audio is currently playing.

### `contents.setCaretBrowsingEnabled(enabled)`

* `enabled` boolean

Sets whether caret browsing is enabled on the current web page.

### `contents.isCaretBrowsingEnabled()`

Returns `boolean` - Whether caret browsing is enabled for this page.

### `contents.setZoomFactor(factor)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0. Values outside the range Chromium can display (0.25 to 5.0) are clamped to it.

### `contents.getZoomFactor()`

Returns `number` - the current zoom factor.

### `contents.setZoomLevel(level)`

* `level` number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller. The formula for this is `scale := 1.2 ^ level`, and the level is clamped to the range Chromium can display (25% to 500%, about -7.6 to 8.8).

> The zoom policy at the Chromium level is same-origin by default, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. To use per-webContents zoom instead, set the zoom mode to `'isolated'` via `contents.setZoomMode('isolated')`.

### `contents.getZoomLevel()`

Returns `number` - the current zoom level.

### `contents.setZoomMode(mode)`

* `mode` string - Can be `default`, `isolated`, `manual`, or `disabled`.

Sets the zoom mode for this web contents.

* `default` - Zoom changes are handled automatically on a per-origin basis. Other webContents navigated to the same origin will share the same zoom level.
* `isolated` - Zoom changes are handled automatically but on a per-webContents basis. This webContents will not be affected by zoom changes in other webContents, and vice versa.
* `manual` - Automatic zoom handling is disabled. The `zoom-changed` event will still be dispatched, but the page will not actually be zoomed. The zoom level can be managed manually by the application.
* `disabled` - All zooming in this webContents is disabled. The webContents will revert to the default zoom level and all zoom changes will be ignored.

The `isolated` and `manual` zoom modes persist across navigations.

### `contents.getZoomMode()`

Returns `string` - The current zoom mode. Can be `default`, `isolated`, `manual`, or `disabled`.

### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` number
* `maximumLevel` number

Returns `Promise<void>`

Sets the maximum and minimum pinch-to-zoom level. The page keeps its normal scale until the user pinches; a `minimumLevel` below 1 only allows zooming out.

> Visual zoom is disabled by default in Electron. To re-enable it, call:
>
> ```js
> const win = new BrowserWindow()
> win.webContents.setVisualZoomLevelLimits(1, 3)
> ```

## Notes

* `executeJavaScript` evaluates arbitrary code in the page; avoid passing untrusted strings.
* `BrowserView` in the `setWindowOpenHandler` example is the deprecated view class (see the windows category).

## Related

* [Methods: loading](./web-contents-methods-loading.md)
* [Structures: WebSource](./web-contents-structures.md)
* [Events: loading, navigation (did-create-window)](./web-contents-events-loading-navigation.md)
