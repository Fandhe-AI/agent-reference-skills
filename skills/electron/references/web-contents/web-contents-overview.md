---
source: https://www.electronjs.org/docs/latest/api/web-contents
---

# webContents module (navigation events, static methods)

> Render and control web pages.

Process: Main

`webContents` is an EventEmitter. It is responsible for rendering and controlling a web page and is a property of the `BrowserWindow` object.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

## Navigation Events

Several events can be used to monitor navigations as they occur within a `webContents`.

### Document Navigations

When a `webContents` navigates to another page (as opposed to an in-page navigation), the following events will be fired.

* `did-start-navigation`
* `will-frame-navigate`
* `will-navigate` (only fired when main frame navigates)
* `will-redirect` (only fired when a redirect happens during navigation)
* `did-redirect-navigation` (only fired when a redirect happens during navigation)
* `did-frame-navigate`
* `did-navigate` (only fired when main frame navigates)

Subsequent events will not fire if `event.preventDefault()` is called on any of the cancellable events.

### In-page Navigation

In-page navigations don't cause the page to reload, but instead navigate to a location within the current page. These events are not cancellable. For an in-page navigations, the following events will fire in this order:

* `did-start-navigation`
* `did-navigate-in-page`

### Frame Navigation

The `will-navigate` and `did-navigate` events only fire when the `mainFrame` navigates. If you want to also observe navigations in `<iframe>`s, use `will-frame-navigate` and `did-frame-navigate` events.

## Static Methods

These methods can be accessed from the `webContents` module:

```js
const { webContents } = require('electron')

console.log(webContents)
```

### `webContents.getAllWebContents()`

Returns `WebContents[]` - An array of all `WebContents` instances. This will contain web contents for all windows, webviews, opened DevTools, and DevTools extension background pages.

### `webContents.getFocusedWebContents()`

Returns `WebContents | null` - The web contents that is focused in this application, otherwise returns `null`.

### `webContents.fromId(id)`

* `id` Integer

Returns `WebContents | undefined` - A WebContents instance with the given ID, or `undefined` if there is no WebContents associated with the given ID.

### `webContents.fromFrame(frame)`

* `frame` WebFrameMain

Returns `WebContents | undefined` - A WebContents instance with the given WebFrameMain, or `undefined` if there is no WebContents associated with the given WebFrameMain.

### `webContents.fromDevToolsTargetId(targetId)`

* `targetId` string - The Chrome DevTools Protocol TargetID associated with the WebContents instance.

Returns `WebContents | undefined` - A WebContents instance with the given TargetID, or `undefined` if there is no WebContents associated with the given TargetID.

When communicating with the Chrome DevTools Protocol, it can be useful to lookup a WebContents instance based on its assigned TargetID.

```js
const { webContents } = require('electron')

async function lookupTargetId(browserWindow) {
  const wc = browserWindow.webContents
  await wc.debugger.attach('1.3')
  const { targetInfo } = await wc.debugger.sendCommand('Target.getTargetInfo')
  const { targetId } = targetInfo
  const targetWebContents = webContents.fromDevToolsTargetId(targetId)
}
```

## Class: WebContents

> Render and control the contents of a BrowserWindow instance.

Process: Main. This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API. Instance members are split across the sibling pages listed below.

## Notes

* Electron v44.8.0. The `webContents` module is Electron's page-rendering/control object for a window, not a Web framework or browser-automation library; for browser test automation see playwright, for HTTP servers see fastify / hono.
* The `fromDevToolsTargetId` example in the original calls `wc.fromDevToolsTargetId`; corrected here to the static `webContents.fromDevToolsTargetId`.

## Related

* [Events: loading, navigation](./web-contents-events-loading-navigation.md)
* [Events: input, devtools, ipc](./web-contents-events-input-devtools-ipc.md)
* [Methods: loading](./web-contents-methods-loading.md)
* [Properties](./web-contents-properties.md)
* [webFrameMain](./web-frame-main.md)
