---
source: https://www.electronjs.org/docs/latest/api/web-contents#instance-methods
---

# WebContents methods: loadURL, loadFile, reload, navigation (deprecated), user agent

Instance methods of `WebContents` (Process: Main) for loading pages, downloads, load state, closing, reload, legacy navigation helpers, crash recovery and user agent.

## Signature / Usage

```js
const win = new BrowserWindow()
const options = { extraHeaders: 'pragma: no-cache\n' }
win.webContents.loadURL('https://github.com', options)
```

## Instance Methods

### `contents.loadURL(url[, options])`

* `url` string
* `options` Object (optional)
  * `httpReferrer` (string | Referrer) (optional) - An HTTP Referrer url.
  * `userAgent` string (optional) - A user agent originating the request.
  * `extraHeaders` string (optional) - Extra headers separated by "\n".
  * `postData` (UploadRawData | UploadFile)[] (optional)
  * `baseURLForDataURL` string (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see `did-finish-load`), and rejects if the page fails to load (see `did-fail-load`). A noop rejection handler is already attached, which avoids unhandled rejection errors. If the existing page has a beforeUnload handler, `did-fail-load` will be called unless `will-prevent-unload` is handled.

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

### `contents.loadFile(filePath[, options])`

* `filePath` string
* `options` Object (optional)
  * `query` Record\<string, string\> (optional) - Passed to `url.format()`.
  * `search` string (optional) - Passed to `url.format()`.
  * `hash` string (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see `did-finish-load`), and rejects if the page fails to load (see `did-fail-load`).

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Would require code like this

```js
const win = new BrowserWindow()
win.loadFile('src/index.html')
```

### `contents.downloadURL(url[, options])`

* `url` string
* `options` Object (optional)
  * `headers` Record\<string, string\> (optional) - HTTP request headers.

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

### `contents.getURL()`

Returns `string` - The URL of the current web page.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com').then(() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
```

### `contents.getTitle()`

Returns `string` - The title of the current web page.

### `contents.isDestroyed()`

Returns `boolean` - Whether the web page is destroyed.

### `contents.close([opts])`

* `opts` Object (optional)
  * `waitForBeforeUnload` boolean - if true, fire the `beforeunload` event before closing the page. If the page prevents the unload, the WebContents will not be closed. The `will-prevent-unload` will be fired if the page requests prevention of unload.

Closes the page, as if the web content had called `window.close()`.

If the page is successfully closed (i.e. the unload is not prevented by the page, or `waitForBeforeUnload` is false or unspecified), the WebContents will be destroyed and no longer usable. The `destroyed` event will be emitted.

### `contents.focus()`

Focuses the web page.

### `contents.isFocused()`

Returns `boolean` - Whether the web page is focused.

### `contents.isLoading()`

Returns `boolean` - Whether web page is still loading resources.

### `contents.isLoadingMainFrame()`

Returns `boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

### `contents.isWaitingForResponse()`

Returns `boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

### `contents.stop()`

Stops any pending navigation.

### `contents.reload()`

Reloads the current web page.

### `contents.reloadIgnoringCache()`

Reloads current page and ignores cache.

### Deprecated navigation methods

Each of the following is marked _Deprecated_ and should use the corresponding `contents.navigationHistory` API.

| Method | Returns / Description | Replacement |
| --- | --- | --- |
| `contents.canGoBack()` | `boolean` - Whether the browser can go back to previous web page. | `contents.navigationHistory.canGoBack` |
| `contents.canGoForward()` | `boolean` - Whether the browser can go forward to next web page. | `contents.navigationHistory.canGoForward` |
| `contents.canGoToOffset(offset)` | `boolean` - Whether the web page can go to `offset` (`offset` Integer). | `contents.navigationHistory.canGoToOffset` |
| `contents.clearHistory()` | Clears the navigation history. | `contents.navigationHistory.clear` |
| `contents.goBack()` | Makes the browser go back a web page. | `contents.navigationHistory.goBack` |
| `contents.goForward()` | Makes the browser go forward a web page. | `contents.navigationHistory.goForward` |
| `contents.goToIndex(index)` | Navigates browser to the specified absolute web page index (`index` Integer). | `contents.navigationHistory.goToIndex` |
| `contents.goToOffset(offset)` | Navigates to the specified offset from the "current entry" (`offset` Integer). | `contents.navigationHistory.goToOffset` |

### `contents.isCrashed()`

Returns `boolean` - Whether the renderer process has crashed.

### `contents.forcefullyCrashRenderer()`

Forcefully terminates the renderer process that is currently hosting this `webContents`. This will cause the `render-process-gone` event to be emitted with the `reason=killed || reason=crashed`. Please note that some webContents share renderer processes and therefore calling this method may also crash the host process for other webContents as well.

Calling `reload()` immediately after calling this method will force the reload to occur in a new process. This should be used when this process is unstable or unusable, for instance in order to recover from the `unresponsive` event.

```js
const win = new BrowserWindow()

win.webContents.on('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading the app?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    win.webContents.forcefullyCrashRenderer()
    win.webContents.reload()
  }
})
```

### `contents.setUserAgent(userAgent)`

* `userAgent` string

Overrides the user agent for this web page.

### `contents.getUserAgent()`

Returns `string` - The user agent for this web page.

## Notes

* `canGoBack`, `canGoForward`, `canGoToOffset`, `clearHistory`, `goBack`, `goForward`, `goToIndex`, `goToOffset` on `webContents` are deprecated in favor of `contents.navigationHistory` (see the NavigationHistory page).
* `loadURL` here uses `webContents`; Electron `net` / HTTP client APIs for server-side HTTP are separate (fastify / hono cover HTTP servers, not this API).

## Related

* [NavigationHistory](./navigation-history.md)
* [Events: loading, navigation](./web-contents-events-loading-navigation.md)
* [Methods: scripting, zoom](./web-contents-methods-scripting-zoom.md)
