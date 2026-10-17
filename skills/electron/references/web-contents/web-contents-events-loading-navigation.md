---
source: https://www.electronjs.org/docs/latest/api/web-contents#instance-events
---

# WebContents events: loading, navigation, process lifecycle

Instance events of `WebContents` (Process: Main) covering load state, navigation, window creation, unload prevention and renderer process lifecycle.

## Signature / Usage

```js
const { BrowserWindow, dialog } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = choice === 0
  if (leave) {
    event.preventDefault()
  }
})
```

## Instance Events

### Event: 'did-finish-load'

Emitted when the navigation is done, i.e. the spinner of the tab has stopped spinning, and the `onload` event was dispatched.

### Event: 'did-fail-load'

Returns: `event` Event, `errorCode` Integer, `errorDescription` string, `validatedURL` string, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

This event is like `did-finish-load` but emitted when the load failed. The full list of error codes and their meaning is available at https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h.

### Event: 'did-fail-provisional-load'

Returns: `event` Event, `errorCode` Integer, `errorDescription` string, `validatedURL` string, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

### Event: 'did-frame-finish-load'

Returns: `event` Event, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab started spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stopped spinning.

### Event: 'dom-ready'

Emitted when the document in the top-level frame is loaded.

### Event: 'page-title-updated'

Returns: `event` Event, `title` string, `explicitSet` boolean.

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Event: 'page-favicon-updated'

Returns: `event` Event, `favicons` string[] - Array of URLs.

Emitted when page receives favicon urls.

### Event: 'content-bounds-updated'

Returns: `event` Event, `bounds` Rectangle - requested new content bounds.

Emitted when the page calls `window.moveTo`, `window.resizeTo` or related APIs. By default, this will move the window. To prevent that behavior, call `event.preventDefault()`.

### Event: 'did-create-window'

Returns:

* `window` BrowserWindow
* `details` Object
  * `url` string - URL for the created window.
  * `frameName` string - Name given to the created window in the `window.open()` call.
  * `options` BrowserWindowConstructorOptions - The options used to create the BrowserWindow. They are merged in increasing precedence: parsed options from the `features` string from `window.open()`, security-related webPreferences inherited from the parent, and options given by `webContents.setWindowOpenHandler`. Unrecognized options are not filtered out.
  * `referrer` Referrer - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.
  * `postBody` PostBody (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.
  * `disposition` string - Can be `default`, `foreground-tab`, `background-tab`, `new-window` or `other`. Corresponds to the manner an associated link was clicked. See Chromium's WindowOpenDisposition.
    * `default` - Indicates Chromium deems in-window navigation valid for a window open call.
    * `foreground-tab` - Corresponds to a left click or shift + middle click.
    * `background-tab` - Corresponds to a middle click or ctrl/cmd + click.
    * `new-window` - Corresponds to a shift + left click.
    * `other` - A catch-all for the remaining Chromium dispositions not handled by Electron.

Emitted _after_ successful creation of a window via `window.open` in the renderer. Not emitted if the creation of the window is canceled from `webContents.setWindowOpenHandler`. See `window.open()` for more details.

### Event: 'will-navigate'

Returns:

* `details` Event\<\>
  * `url` string - The URL the frame is navigating to.
  * `isSameDocument` boolean - This event does not fire for same document navigations using window.history api and reference fragment navigations. This property is always set to `false` for this event.
  * `isMainFrame` boolean - True if the navigation is taking place in a main frame.
  * `frame` WebFrameMain | null - The frame to be navigated. May be `null` if accessed after the frame has either navigated or been destroyed.
  * `initiator` WebFrameMain | null (optional) - The frame which initiated the navigation. This can be a parent frame (e.g. via `window.open` with a frame's name), a child frame (e.g. an unsandboxed iframe navigating its parent via `<a target="_top">`), or null if the navigation was not initiated by a frame. This can also be null if the initiating frame was deleted before the event was emitted.
* `url` string _Deprecated_
* `isInPlace` boolean _Deprecated_
* `isMainFrame` boolean _Deprecated_
* `frameProcessId` Integer _Deprecated_
* `frameRoutingId` Integer _Deprecated_

Emitted when a user or the page wants to start navigation on the main frame. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` will prevent the navigation.

### Event: 'will-frame-navigate'

Returns: `details` Event\<\> with `url`, `isSameDocument` (always `false` for this event; does not fire for same document navigations using window.history api and reference fragment navigations), `isMainFrame`, `frame`, `initiator` (same fields as in `will-navigate`). No deprecated positional arguments.

Emitted when a user or the page wants to start navigation in any frame. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Unlike `will-navigate`, `will-frame-navigate` is fired when the main frame or any of its subframes attempts to navigate. When the navigation event comes from the main frame, `isMainFrame` will be `true`.

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` will prevent the navigation.

### Event: 'did-start-navigation'

Returns: `details` Event\<\> with `url`, `isSameDocument` (whether the navigation happened without changing document; examples are reference fragment navigations, pushState/replaceState, and same page history navigation), `isMainFrame`, `frame` (WebFrameMain | null), `initiator` (WebFrameMain | null, optional); plus deprecated positional `url`, `isInPlace`, `isMainFrame`, `frameProcessId`, `frameRoutingId`.

Emitted when any frame (including main) starts navigating.

### Event: 'will-redirect'

Returns: same `details` and deprecated positional arguments as `did-start-navigation`.

Emitted when a server side redirect occurs during navigation. For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

### Event: 'did-redirect-navigation'

Returns: same `details` and deprecated positional arguments as `did-start-navigation`.

Emitted after a server side redirect occurs during navigation. For example a 302 redirect.

This event cannot be prevented, if you want to prevent redirects you should check out the `will-redirect` event above.

### Event: 'did-navigate'

Returns: `event` Event, `url` string, `httpResponseCode` Integer - -1 for non HTTP navigations, `httpStatusText` string - empty for non HTTP navigations.

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Event: 'did-frame-navigate'

Returns: `event` Event, `url` string, `httpResponseCode` Integer - -1 for non HTTP navigations, `httpStatusText` string - empty for non HTTP navigations, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Event: 'did-navigate-in-page'

Returns: `event` Event, `url` string, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted when an in-page navigation happened in any frame.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

### Event: 'will-prevent-unload'

Returns: `event` Event.

Emitted when a `beforeunload` event handler is attempting to cancel a page unload.

Calling `event.preventDefault()` will ignore the `beforeunload` event handler and allow the page to be unloaded.

> This will be emitted for `BrowserViews` but will _not_ be respected - this is because we have chosen not to tie the `BrowserView` lifecycle to its owning BrowserWindow should one exist per the specification (MDN `beforeunload` event).

### Event: 'render-process-gone'

Returns: `event` Event, `details` RenderProcessGoneDetails.

Emitted when the renderer process unexpectedly disappears. This is normally because it was crashed or killed.

### Event: 'unresponsive'

Emitted when the web page becomes unresponsive.

### Event: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

### Event: 'destroyed'

Emitted when `webContents` is destroyed.

## Notes

* The positional (deprecated) arguments of `will-navigate`, `did-start-navigation`, `will-redirect` and `did-redirect-navigation` are marked _Deprecated_ in favor of the `details` object.
* `will-frame-navigate` and `did-frame-navigate` also fire for subframes; `will-navigate` / `did-navigate` fire only for the main frame.

## Related

* [webContents overview](./web-contents-overview.md)
* [Events: input, devtools, ipc](./web-contents-events-input-devtools-ipc.md)
* [Structures: RenderProcessGoneDetails](./web-contents-structures.md)
* [webFrameMain](./web-frame-main.md)
