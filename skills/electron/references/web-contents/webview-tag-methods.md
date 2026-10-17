---
source: https://www.electronjs.org/docs/latest/api/webview-tag#methods
---

# webview tag: methods

Methods of the `<webview>` tag element (Process: Renderer). The webview element must be loaded before using the methods.

## Signature / Usage

```js
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### Navigation and state

#### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Object (optional)
  * `httpReferrer` (string | Referrer) (optional) - An HTTP Referrer url.
  * `userAgent` string (optional) - A user agent originating the request.
  * `extraHeaders` string (optional) - Extra headers separated by "\n"
  * `postData` (UploadRawData | UploadFile)[] (optional)
  * `baseURLForDataURL` string (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see `did-finish-load`), and rejects if the page fails to load (see `did-fail-load`).

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

#### `<webview>.downloadURL(url[, options])`

* `url` string
* `options` Object (optional)
  * `headers` Record\<string, string\> (optional) - HTTP request headers.

Initiates a download of the resource at `url` without navigating.

| Method | Description |
| --- | --- |
| `<webview>.getURL()` | Returns `string` - The URL of guest page. |
| `<webview>.getTitle()` | Returns `string` - The title of guest page. |
| `<webview>.isLoading()` | Returns `boolean` - Whether guest page is still loading resources. |
| `<webview>.isLoadingMainFrame()` | Returns `boolean` - Whether the main frame (and not just iframes or frames within it) is still loading. |
| `<webview>.isWaitingForResponse()` | Returns `boolean` - Whether the guest page is waiting for a first-response for the main resource of the page. |
| `<webview>.stop()` | Stops any pending navigation. |
| `<webview>.reload()` | Reloads the guest page. |
| `<webview>.reloadIgnoringCache()` | Reloads the guest page and ignores cache. |
| `<webview>.canGoBack()` | Returns `boolean` - Whether the guest page can go back. |
| `<webview>.canGoForward()` | Returns `boolean` - Whether the guest page can go forward. |
| `<webview>.canGoToOffset(offset)` | (`offset` Integer) Returns `boolean` - Whether the guest page can go to `offset`. |
| `<webview>.clearHistory()` | Clears the navigation history. |
| `<webview>.goBack()` | Makes the guest page go back. |
| `<webview>.goForward()` | Makes the guest page go forward. |
| `<webview>.goToIndex(index)` | (`index` Integer) Navigates to the specified absolute index. |
| `<webview>.goToOffset(offset)` | (`offset` Integer) Navigates to the specified offset from the "current entry". |
| `<webview>.isCrashed()` | Returns `boolean` - Whether the renderer process has crashed. |
| `<webview>.setUserAgent(userAgent)` | (`userAgent` string) Overrides the user agent for the guest page. |
| `<webview>.getUserAgent()` | Returns `string` - The user agent for guest page. |
| `<webview>.getWebContentsId()` | Returns `number` - The WebContents ID of this `webview`. |

### CSS and scripting

#### `<webview>.insertCSS(css)`

* `css` string

Returns `Promise<string>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

#### `<webview>.removeInsertedCSS(key)`

* `key` string

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

#### `<webview>.executeJavaScript(code[, userGesture])`

* `code` string
* `userGesture` boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### DevTools, audio and editing

| Method | Description |
| --- | --- |
| `<webview>.openDevTools()` | Opens a DevTools window for guest page. |
| `<webview>.closeDevTools()` | Closes the DevTools window of guest page. |
| `<webview>.isDevToolsOpened()` | Returns `boolean` - Whether guest page has a DevTools window attached. |
| `<webview>.isDevToolsFocused()` | Returns `boolean` - Whether DevTools window of guest page is focused. |
| `<webview>.inspectElement(x, y)` | (`x` Integer, `y` Integer) Starts inspecting element at position (`x`, `y`) of guest page. |
| `<webview>.inspectSharedWorker()` | Opens the DevTools for the shared worker context present in the guest page. |
| `<webview>.inspectServiceWorker()` | Opens the DevTools for the service worker context present in the guest page. |
| `<webview>.setAudioMuted(muted)` | (`muted` boolean) Set guest page muted. |
| `<webview>.isAudioMuted()` | Returns `boolean` - Whether guest page has been muted. |
| `<webview>.isCurrentlyAudible()` | Returns `boolean` - Whether audio is currently playing. |
| `<webview>.undo()` / `redo()` / `cut()` / `copy()` / `paste()` / `pasteAndMatchStyle()` / `delete()` / `selectAll()` / `unselect()` | Executes the corresponding editing command in page. |
| `<webview>.centerSelection()` | Centers the current text selection in page. |
| `<webview>.scrollToTop()` | Scrolls to the top of the current `<webview>`. |
| `<webview>.scrollToBottom()` | Scrolls to the bottom of the current `<webview>`. |
| `<webview>.replace(text)` | (`text` string) Executes editing command `replace` in page. |
| `<webview>.replaceMisspelling(text)` | (`text` string) Executes editing command `replaceMisspelling` in page. |
| `<webview>.insertText(text)` | (`text` string) Returns `Promise<void>`. Inserts `text` to the focused element. |
| `<webview>.showDefinitionForSelection()` _macOS_ | Shows pop-up dictionary that searches the selected word on the page. |

#### `<webview>.adjustSelection(options)`

* `options` Object
  * `start` Number (optional) - Amount to shift the start index of the current selection.
  * `end` Number (optional) - Amount to shift the end index of the current selection.

Adjusts the current text selection starting and ending points in the focused frame by the given amounts. A negative amount moves the selection towards the beginning of the document, and a positive amount moves the selection towards the end of the document. See `webContents.adjustSelection` for examples.

### Find, print, capture

#### `<webview>.findInPage(text[, options])`

* `text` string - Content to be searched, must not be empty.
* `options` Object (optional)
  * `forward` boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` boolean (optional) - Whether to begin a new text finding session with this request. Should be `true` for initial requests, and `false` for follow-up requests. Defaults to `false`.
  * `matchCase` boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to `found-in-page` event.

#### `<webview>.stopFindInPage(action)`

* `action` string - Specifies the action to take place when ending `<webview>.findInPage` request.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

#### `<webview>.print([options])`

* `options` Object (optional)
  * `silent` boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` boolean (optional) - Prints the background color and image of the web page. Default is `false`.
  * `deviceName` string (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` boolean (optional) - Set whether the printed web page will be in color or grayscale. Default is `true`.
  * `margins` Object (optional)
    * `marginType` string (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` number (optional) - The left margin of the printed web page, in pixels.
    * `right` number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` boolean (optional) - Whether the web page should be printed in landscape mode. Default is `false`.
  * `scaleFactor` number (optional) - The scale factor of the web page.
  * `pagesPerSheet` number (optional) - The number of pages to print per page sheet.
  * `collate` boolean (optional) - Whether the web page should be collated.
  * `copies` number (optional) - The number of copies of the web page to print.
  * `pageRanges` Object[] (optional) - The page range to print.
    * `from` number - Index of the first page to print (0-based).
    * `to` number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` string (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record\<string, number\> (optional)
    * `horizontal` number (optional) - The horizontal dpi.
    * `vertical` number (optional) - The vertical dpi.
  * `header` string (optional) - string to be printed as page header.
  * `footer` string (optional) - string to be printed as page footer.
  * `pageSize` string | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` in microns.
  * `usePrinterDefaultPageSize` boolean (optional) - Whether to use the system's default page size. Default is `false`. Cannot be combined with `pageSize`. When `deviceName` is provided, uses the default page size of that specific printer. When `deviceName` is not provided, uses the default page size of the system's default printer. If the printer's default page size cannot be retrieved, falls back to A4 (210mm x 297mm).

Returns `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

#### `<webview>.printToPDF(options)`

* `options` PrintToPDFOptions

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

#### `<webview>.capturePage([rect])`

* `rect` Rectangle (optional) - The area of the page to be captured.

Returns `Promise<NativeImage>` - Resolves with a NativeImage

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

### IPC and input

#### `<webview>.send(channel, ...args)`

* `channel` string
* `...args` any[]

Returns `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the `ipcRenderer` module. See `webContents.send` for examples.

#### `<webview>.sendToFrame(frameId, channel, ...args)`

* `frameId` \[number, number] - `[processId, frameId]`
* `channel` string
* `...args` any[]

Returns `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. See `webContents.sendToFrame` for examples.

#### `<webview>.sendInputEvent(event)`

* `event` MouseInputEvent | MouseWheelInputEvent | KeyboardInputEvent

Returns `Promise<void>`

Sends an input `event` to the page. See `webContents.sendInputEvent` for detailed description of `event` object.

### Zoom

#### `<webview>.setZoomFactor(factor)`

* `factor` number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

#### `<webview>.setZoomLevel(level)`

* `level` number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

> The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

#### `<webview>.getZoomFactor()`

Returns `number` - the current zoom factor.

#### `<webview>.getZoomLevel()`

Returns `number` - the current zoom level.

#### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` number
* `maximumLevel` number

Returns `Promise<void>`

Sets the maximum and minimum pinch-to-zoom level.

## Notes

* Electron `<webview>` is distinct from the Windows WebView2 control (windows-winui-controls) and from browser test drivers (playwright).
* `<webview>.setZoomLevel`: the upstream webview docs give no explicit clamp range. The WebContents docs define `setZoomLevel` / `setZoomFactor` as clamped to the range Chromium can display (25% to 500%); see [WebContents methods: scripting, zoom](./web-contents-methods-scripting-zoom.md). The older "300% and 50%" wording is not a current limit there.
* The upstream page recommends not using the `webview` tag; see the overview page.

## Related

* [webview tag: overview and attributes](./webview-tag-overview-attributes.md)
* [webview tag: DOM events](./webview-tag-dom-events.md)
* [WebContents methods: loading](./web-contents-methods-loading.md)
