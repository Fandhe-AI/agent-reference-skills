---
source: https://www.electronjs.org/docs/latest/api/window-open
---

# Opening windows from the renderer (window.open, setWindowOpenHandler)

There are several ways to control how windows are created from trusted or untrusted content within a renderer. Windows can be created from the renderer in two ways: clicking on links or submitting forms adorned with `target=_blank`, or JavaScript calling `window.open()`.

For same-origin content, the new window is created within the same process, enabling the parent to access the child window directly. This can be very useful for app sub-windows that act as preference panels, or similar, as the parent can render to the sub-window directly, as if it were a `div` in the parent. This is the same behavior as in the browser.

Electron pairs this native DOM `Window` with a BrowserWindow under the hood. You can take advantage of all the customization available when creating a BrowserWindow in the main process by using `webContents.setWindowOpenHandler()` for renderer-created windows.

BrowserWindow constructor options are set by, in increasing precedence order: parsed options from the `features` string from `window.open()`, security-related webPreferences inherited from the parent, and options given by `webContents.setWindowOpenHandler`. Note that `webContents.setWindowOpenHandler` has final say and full privilege because it is invoked in the main process.

## Signature / Usage

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

### `window.open(url[, frameName][, features])`

* `url` string
* `frameName` string (optional)
* `features` string (optional)

Returns `Window` | null

`features` is a comma-separated key-value list, following the standard format of the browser. For convenience, Electron will parse a subset of presentational `BrowserWindowConstructorOptions` out of this list (such as `width`, `height`, `x`, `y`, `show`, `frame`, `title`, `backgroundColor`). Because the renderer is untrusted, options that cause the main process to access the filesystem or that are otherwise privileged (such as `icon`) are ignored. For full control and better ergonomics, use `webContents.setWindowOpenHandler` to customize the BrowserWindow creation from the main process.

A subset of `WebPreferences` can be set directly, unnested, from the features string: `zoomFactor`, `nodeIntegration`, `javascript`, `contextIsolation`, and `webviewTag`.

**Notes:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
* Features that are not handled by Chromium and not in Electron's allowlist of presentational `BrowserWindowConstructorOptions` are ignored. The raw `features` string is still available to the main process via `setWindowOpenHandler`.
* `frameName` follows the specification of `target` located in the native documentation (MDN `Window.open`).
* When opening `about:blank`, the child window's `WebPreferences` will be copied from the parent window, and there is no way to override it because Chromium skips browser side navigation in this case.

To customize or cancel the creation of the window, you can optionally set an override handler with `webContents.setWindowOpenHandler()` from the main process. Returning `{ action: 'deny' }` cancels the window. Returning `{ action: 'allow', overrideBrowserWindowOptions: { ... } }` will allow opening the window and setting the `BrowserWindowConstructorOptions` to be used when creating the window. Note that this is more powerful than passing options through the feature string, as the renderer has more limited privileges in deciding security preferences than the main process.

In addition to passing in `action` and `overrideBrowserWindowOptions`, `outlivesOpener` can be passed like: `{ action: 'allow', outlivesOpener: true, overrideBrowserWindowOptions: { ... } }`. If set to `true`, the newly created window will not close when the opener window closes. The default value is `false`.

### Native `Window` example

```js
// main.js
const mainWindow = new BrowserWindow()

// In this example, only windows with the `about:blank` url will be created.
// All other urls will be blocked.
mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url === 'about:blank') {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        fullscreenable: false,
        backgroundColor: 'black',
        webPreferences: {
          preload: 'my-child-window-preload-script.js'
        }
      }
    }
  }
  return { action: 'deny' }
})
```

```js
// renderer process (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```

## Options / Props

### WindowOpenHandlerResponse Object

The object returned from the `setWindowOpenHandler` handler (original page: `api/structures/window-open-handler-response`).

| Name | Type | Description |
|------|------|-------------|
| action | string | Can be `allow` or `deny`. Controls whether new window should be created. |
| overrideBrowserWindowOptions | BrowserWindowConstructorOptions (optional) | Allows customization of the created window. |
| outlivesOpener | boolean (optional) | By default, child windows are closed when their opener is closed. This can be changed by specifying `outlivesOpener: true`, in which case the opened window will not be closed when its opener is closed. |
| createWindow | (options: BrowserWindowConstructorOptions) => WebContents (optional) | If specified, will be called instead of `new BrowserWindow` to create the new child window and event `did-create-window` will not be emitted. Constructed child window should use passed `options` object. This can be used for example to have the new window open as a BrowserView instead of in a separate window. |

## Notes

* `webContents.setWindowOpenHandler` is documented on the webContents page (web-contents category) and runs in the main process, which is why it has the final say over renderer-supplied `features`.
* Distinct from plain browser `window.open`: Electron additionally pairs the DOM `Window` with a BrowserWindow and applies the precedence rules above.

## Related

* [Window options](./window-options.md)
* [WebPreferences](./web-preferences.md)
* [BrowserWindow overview](./browser-window-overview.md)
* [Web Embeds](./web-embeds.md)
