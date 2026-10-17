---
source: https://www.electronjs.org/docs/latest/api/web-contents#contentsundo
---

# WebContents methods: editing, findInPage, capturePage, print, printToPDF

Instance methods of `WebContents` (Process: Main) for editing commands, text selection, find in page, page capture, printing and PDF generation.

## Signature / Usage

```js
const win = new BrowserWindow()
win.webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) win.webContents.stopFindInPage('clearSelection')
})

const requestId = win.webContents.findInPage('api')
console.log(requestId)
```

### Editing commands

| Method | Description |
| --- | --- |
| `contents.undo()` | Executes the editing command `undo` in web page. |
| `contents.redo()` | Executes the editing command `redo` in web page. |
| `contents.cut()` | Executes the editing command `cut` in web page. |
| `contents.copy()` | Executes the editing command `copy` in web page. |
| `contents.centerSelection()` | Centers the current text selection in web page. |
| `contents.copyImageAt(x, y)` | (`x` Integer, `y` Integer) Copy the image at the given position to the clipboard. |
| `contents.copyVideoFrameAt(x, y)` | (`x` Integer, `y` Integer) When executed on a video media element, copies the frame at (x, y) to the clipboard. |
| `contents.saveVideoFrameAs(x, y)` | (`x` Integer, `y` Integer) When executed on a video media element, shows a save dialog and saves the frame at (x, y) to disk. |
| `contents.paste()` | Executes the editing command `paste` in web page. |
| `contents.pasteAndMatchStyle()` | Executes the editing command `pasteAndMatchStyle` in web page. |
| `contents.delete()` | Executes the editing command `delete` in web page. |
| `contents.selectAll()` | Executes the editing command `selectAll` in web page. |
| `contents.unselect()` | Executes the editing command `unselect` in web page. |
| `contents.scrollToTop()` | Scrolls to the top of the current `webContents`. |
| `contents.scrollToBottom()` | Scrolls to the bottom of the current `webContents`. |
| `contents.replace(text)` | (`text` string) Executes the editing command `replace` in web page. |
| `contents.replaceMisspelling(text)` | (`text` string) Executes the editing command `replaceMisspelling` in web page. |
| `contents.insertText(text)` | (`text` string) Returns `Promise<void>`. Inserts `text` to the focused element. |

#### `contents.adjustSelection(options)`

* `options` Object
  * `start` Number (optional) - Amount to shift the start index of the current selection.
  * `end` Number (optional) - Amount to shift the end index of the current selection.

Adjusts the current text selection starting and ending points in the focused frame by the given amounts. A negative amount moves the selection towards the beginning of the document, and a positive amount moves the selection towards the end of the document.

```js
const win = new BrowserWindow()

// Adjusts the beginning of the selection 1 letter forward,
// and the end of the selection 5 letters forward.
win.webContents.adjustSelection({ start: 1, end: 5 })

// Adjusts the beginning of the selection 2 letters forward,
// and the end of the selection 3 letters backward.
win.webContents.adjustSelection({ start: 2, end: -3 })
```

### Find in page

#### `contents.findInPage(text[, options])`

* `text` string - Content to be searched, must not be empty.
* `options` Object (optional)
  * `forward` boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` boolean (optional) - Whether to begin a new text finding session with this request. Should be `true` for initial requests, and `false` for follow-up requests. Defaults to `false`.
  * `matchCase` boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to `found-in-page` event.

#### `contents.stopFindInPage(action)`

* `action` string - Specifies the action to take place when ending `webContents.findInPage` request.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

### Capture

#### `contents.capturePage([rect, opts])`

* `rect` Rectangle (optional) - The area of the page to be captured.
* `opts` Object (optional)
  * `stayHidden` boolean (optional) - Keep the page hidden instead of visible. Default is `false`.
  * `stayAwake` boolean (optional) - Keep the system awake instead of allowing it to sleep. Default is `false`.

Returns `Promise<NativeImage>` - Resolves with a NativeImage

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

#### `contents.isBeingCaptured()`

Returns `boolean` - Whether this page is being captured. It returns true when the capturer count is greater than 0.

### Printing

#### `contents.getPrintersAsync()`

Get the system printer list.

Returns `Promise<PrinterInfo[]>` - Resolves with a `PrinterInfo[]`

#### `contents.print([options], [callback])`

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
  * `pageRanges` Object[] (optional) - The page range to print. On macOS, only one range is honored.
    * `from` number - Index of the first page to print (0-based).
    * `to` number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` string (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record\<string, number\> (optional)
    * `horizontal` number (optional) - The horizontal dpi.
    * `vertical` number (optional) - The vertical dpi.
  * `header` string (optional) - string to be printed as page header.
  * `footer` string (optional) - string to be printed as page footer.
  * `pageSize` string | Size (optional) - Specify page size of the printed document. Can be `A0`, `A1`, `A2`, `A3`, `A4`, `A5`, `A6`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width`.
  * `usePrinterDefaultPageSize` boolean (optional) - Whether to use a given printer's default page size. Default is `false`. Cannot be combined with `pageSize`. When `deviceName` is provided, uses the default page size of that specific printer. When `deviceName` is not provided, uses the default page size of the system's default printer. If the printer's default page size cannot be retrieved, falls back to A4 (210mm x 297mm).
* `callback` Function (optional)
  * `success` boolean - Indicates success of the print call.
  * `failureReason` string - Error description called back if the print fails.

When a custom `pageSize` is passed, Chromium attempts to validate platform specific minimum values for `width_microns` and `height_microns`. Width and height must both be minimum 353 microns but may be higher on some operating systems. If a valid `pageSize` is not passed and `usePrinterDefaultPageSize` is `false`, an error will be thrown.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Some possible `failureReason`s for print failure include: "Invalid printer settings", "Print job canceled", "Print job failed".

Use `page-break-before: always;` CSS style to force to print to a new page.

```js
const win = new BrowserWindow()
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [
    {
      from: 0,
      to: 1
    }
  ]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` PrintToPDFOptions

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints the window's web page as PDF. The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

```js
const { app, BrowserWindow } = require('electron')

const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

app.whenReady().then(() => {
  const win = new BrowserWindow()
  win.loadURL('https://github.com')

  win.webContents.on('did-finish-load', () => {
    // Use default printing options
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    win.webContents
      .printToPDF({})
      .then((data) => {
        fs.writeFile(pdfPath, data, (error) => {
          if (error) throw error
          console.log(`Wrote PDF successfully to ${pdfPath}`)
        })
      })
      .catch((error) => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error)
      })
  })
})
```

See Chrome DevTools Protocol `Page.printToPDF` for more information.

## Related

* [Printing structures](./printing-structures.md)
* [Events: input, devtools, ipc (found-in-page)](./web-contents-events-input-devtools-ipc.md)
* [Methods: scripting, zoom](./web-contents-methods-scripting-zoom.md)
