---
source: https://www.electronjs.org/docs/latest/api/webview-tag#dom-events
---

# webview tag: DOM events

DOM events available to the `<webview>` tag (Process: Renderer). Listen with `webview.addEventListener(name, handler)`.

## Signature / Usage

```js
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Events

#### Event: 'load-commit'

Returns: `url` string, `isMainFrame` boolean.

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

#### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

#### Event: 'did-fail-load'

Returns: `errorCode` Integer, `errorDescription` string, `validatedURL` string, `isMainFrame` boolean.

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

#### Event: 'did-frame-finish-load'

Returns: `isMainFrame` boolean.

Fired when a frame has done navigation.

#### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

#### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

#### Event: 'did-attach'

Fired when attached to the embedder web contents.

#### Event: 'dom-ready'

Fired when document in the given frame is loaded.

#### Event: 'page-title-updated'

Returns: `title` string, `explicitSet` boolean.

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Event: 'page-favicon-updated'

Returns: `favicons` string[] - Array of URLs.

Fired when page receives favicon urls.

#### Event: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

#### Event: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

#### Event: 'console-message'

Returns: `level` Integer - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`. `message` string - The actual console message. `line` Integer - The line number of the source that triggered this console message. `sourceId` string.

Fired when the guest window logs a console message. The example above forwards all log messages to the embedder's console without regard for log level or other properties.

#### Event: 'found-in-page'

Returns: `result` Object (`requestId` Integer, `activeMatchOrdinal` Integer - Position of the active match., `matches` Integer - Number of Matches., `selectionArea` Rectangle - Coordinates of first match region., `finalUpdate` boolean).

Fired when a result is available for `webview.findInPage` request.

```js
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

#### Event: 'will-navigate'

Returns: `url` string.

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

#### Event: 'will-frame-navigate'

Returns: `url` string, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted when a user or the page wants to start navigation anywhere in the `<webview>` or any frames embedded within. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

#### Event: 'did-start-navigation'

Returns: `url` string, `isInPlace` boolean, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted when any frame (including main) starts navigating. `isInPlace` will be `true` for in-page navigations.

#### Event: 'did-redirect-navigation'

Returns: `url` string, `isInPlace` boolean, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted after a server side redirect occurs during navigation. For example a 302 redirect.

#### Event: 'did-navigate'

Returns: `url` string.

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-frame-navigate'

Returns: `url` string, `httpResponseCode` Integer - -1 for non HTTP navigations, `httpStatusText` string - empty for non HTTP navigations, `isMainFrame` boolean, `frameProcessId` Integer, `frameRoutingId` Integer.

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-navigate-in-page'

Returns: `isMainFrame` boolean, `url` string.

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

#### Event: 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```js
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

#### Event: 'ipc-message'

Returns: `frameId` \[number, number] - pair of `[processId, frameId]`. `channel` string. `args` any[].

Fired when the guest page has sent an asynchronous message to embedder page. `frameId` does not tell the embedder which document sent the message; when that matters, have the guest use `ipcRenderer.send()` and handle the guest `webContents`' `ipc-message` event in the main process, where `event.senderFrame` identifies the sender.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```js
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```js
// In guest page.
const { ipcRenderer } = require('electron')

ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

#### Event: 'render-process-gone'

Returns: `details` RenderProcessGoneDetails.

Fired when the renderer process unexpectedly disappears. This is normally because it was crashed or killed.

#### Event: 'destroyed'

Fired when the WebContents is destroyed.

#### Event: 'media-started-playing'

Emitted when media starts playing.

#### Event: 'media-paused'

Emitted when media is paused or done playing.

#### Event: 'did-change-theme-color'

Returns: `themeColor` string.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Event: 'update-target-url'

Returns: `url` string.

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

#### Event: 'devtools-open-url'

Returns: `url` string - URL of the link that was clicked or selected.

Emitted when a link is clicked in DevTools or 'Open in new tab' is selected for a link in its context menu.

#### Event: 'devtools-search-query'

Returns: `event` Event, `query` string - text to query for.

Emitted when 'Search' is selected for text in its context menu.

#### Event: 'devtools-opened'

Emitted when DevTools is opened.

#### Event: 'devtools-closed'

Emitted when DevTools is closed.

#### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.

#### Event: 'context-menu'

Returns: `params` Object with the same fields as the `WebContents` `context-menu` event `params` (except that `frame` is not listed): `x`, `y`, `linkURL`, `linkText`, `pageURL`, `frameURL`, `srcURL`, `mediaType` (`none`, `image`, `audio`, `video`, `canvas`, `file` or `plugin`), `hasImageContents`, `isEditable`, `selectionText`, `titleText`, `altText`, `suggestedFilename`, `selectionRect` (Rectangle), `selectionStartOffset`, `referrerPolicy` (Referrer), `misspelledWord`, `dictionarySuggestions` (string[]), `frameCharset`, `formControlType`, `spellcheckEnabled`, `menuSourceType`, `mediaFlags` (Object: `inError`, `isPaused`, `isMuted`, `hasAudio`, `isLooping`, `isControlsVisible`, `canToggleControls`, `canPrint`, `canSave`, `canShowPictureInPicture`, `isShowingPictureInPicture`, `canRotate`, `canLoop`), `editFlags` (Object: `canUndo`, `canRedo`, `canCut`, `canCopy`, `canPaste`, `canDelete`, `canSelectAll`, `canEditRichly`).

Emitted when there is a new context menu that needs to be handled.

## Notes

* Unlike `WebContents` events, `will-navigate` / `will-frame-navigate` on `<webview>` cannot be cancelled: `event.preventDefault()` does NOT have any effect.
* Electron `<webview>` events are DOM events on the tag; they are not Node `EventEmitter` events.

## Related

* [webview tag: overview and attributes](./webview-tag-overview-attributes.md)
* [webview tag: methods](./webview-tag-methods.md)
* [WebContents events: loading, navigation](./web-contents-events-loading-navigation.md)
