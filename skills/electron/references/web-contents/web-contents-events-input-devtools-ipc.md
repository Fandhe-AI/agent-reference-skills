---
source: https://www.electronjs.org/docs/latest/api/web-contents#event-input-event
---

# WebContents events: input, devtools, certificates, media, context menu, ipc

Instance events of `WebContents` (Process: Main) for input, full-screen, focus, DevTools, certificates, auth, find-in-page, media, cursor, context menu, Bluetooth selection, offscreen paint, `<webview>` attach, console, preload errors, IPC and frames.

## Signature / Usage

```js
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.webContents.on('before-input-event', (event, input) => {
    // Enable application menu keyboard shortcuts when Ctrl/Cmd are down.
    win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
  })
})
```

### Instance Events

#### Event: 'input-event'

Returns: `event` Event, `inputEvent` InputEvent.

Emitted when an input event is sent to the WebContents. See InputEvent for details.

#### Event: 'before-input-event'

Returns:

* `event` Event
* `input` Object - Input properties.
  * `type` string - Either `keyUp` or `keyDown`.
  * `key` string - Equivalent to KeyboardEvent.key.
  * `code` string - Equivalent to KeyboardEvent.code.
  * `isAutoRepeat` boolean - Equivalent to KeyboardEvent.repeat.
  * `isComposing` boolean - Equivalent to KeyboardEvent.isComposing.
  * `shift` boolean - Equivalent to KeyboardEvent.shiftKey.
  * `control` boolean - Equivalent to KeyboardEvent.controlKey.
  * `alt` boolean - Equivalent to KeyboardEvent.altKey.
  * `meta` boolean - Equivalent to KeyboardEvent.metaKey.
  * `location` number - Equivalent to KeyboardEvent.location.
  * `modifiers` string[] - See InputEvent.modifiers.

Emitted before dispatching the `keydown` and `keyup` events in the page. Calling `event.preventDefault` will prevent the page `keydown`/`keyup` events and the menu shortcuts. To only prevent the menu shortcuts, use `setIgnoreMenuShortcuts` (example above).

#### Event: 'before-mouse-event'

Returns: `event` Event, `mouse` MouseInputEvent.

Emitted before dispatching mouse events in the page. Calling `event.preventDefault` will prevent the page mouse events.

```js
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.webContents.on('before-mouse-event', (event, mouse) => {
    // Prevent mouseDown events.
    if (mouse.type === 'mouseDown') {
      console.log(mouse)
      /*
      {
        type: 'mouseDown',
        clickCount: 1,
        movementX: 0,
        movementY: 0,
        button: 'left',
        x: 632.359375,
        y: 480.6875,
        globalX: 168.359375,
        globalY: 193.6875
      }
      */
      event.preventDefault()
    }
  })
})
```

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'zoom-changed'

Returns: `event` Event, `zoomDirection` string - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Event: 'blur'

Emitted when the `WebContents` loses focus. The `blur` event is also emitted when switching between windows or apps for the `WebContents` that has focus within its window.

#### Event: 'focus'

Emitted when the `WebContents` gains focus. The `focus` event is also emitted when switching between windows or apps for the `WebContents` that has focus within its window.

#### Event: 'devtools-open-url'

Returns: `event` Event, `url` string - URL of the link that was clicked or selected.

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

#### Event: 'certificate-error'

Returns: `event` Event, `url` string, `error` string - The error code., `certificate` Certificate, `callback` Function (`isTrusted` boolean - Indicates whether the certificate can be considered trusted.), `isMainFrame` boolean.

Emitted when failed to verify the `certificate` for `url`. The usage is the same with the `certificate-error` event of `app`.

#### Event: 'select-client-certificate'

Returns: `event` Event, `url` URL, `certificateList` Certificate[], `callback` Function (`certificate` Certificate - Must be a certificate from the given list.).

Emitted when a client certificate is requested. The usage is the same with the `select-client-certificate` event of `app`.

#### Event: 'login'

Returns:

* `event` Event
* `authenticationResponseDetails` Object
  * `url` URL
  * `pid` number
  * `isRequestForNavigation` boolean - Indicates whether the request is for a navigation.
  * `firstAuthAttempt` boolean - Indicates whether this is the first authentication attempt.
  * `responseHeaders` Record\<string, string | string[]\> (optional) - The headers returned in the response.
* `authInfo` Object
  * `isProxy` boolean
  * `scheme` string
  * `host` string
  * `port` Integer
  * `realm` string
* `callback` Function
  * `username` string (optional)
  * `password` string (optional)

Emitted when `webContents` wants to do basic auth. The usage is the same with the `login` event of `app`.

#### Event: 'found-in-page'

Returns: `event` Event, `result` Object (`requestId` Integer, `activeMatchOrdinal` Integer - Position of the active match., `matches` Integer - Number of Matches., `selectionArea` Rectangle - Coordinates of first match region., `finalUpdate` boolean).

Emitted when a result is available for `webContents.findInPage` request.

#### Event: 'media-started-playing'

Emitted when media starts playing.

#### Event: 'media-paused'

Emitted when media is paused or done playing.

#### Event: 'audio-state-changed'

Returns: `event` Event\<\> (`audible` boolean - True if one or more frames or child `webContents` are emitting audio.).

Emitted when media becomes audible or inaudible.

#### Event: 'did-change-theme-color'

Returns: `event` Event, `color` (string | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Event: 'update-target-url'

Returns: `event` Event, `url` string.

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

#### Event: 'cursor-changed'

Returns: `event` Event, `type` string, `image` NativeImage (optional), `scale` Float (optional) - scaling factor for the custom cursor., `size` Size (optional) - the size of the `image`., `hotspot` Point (optional) - coordinates of the custom cursor's hotspot.

Emitted when the cursor's type changes. The `type` parameter can be `pointer`, `crosshair`, `hand`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `m-panning-vertical`, `m-panning-horizontal`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing`, `custom`, `null`, `drag-drop-none`, `drag-drop-move`, `drag-drop-copy`, `drag-drop-link`, `ns-no-resize`, `ew-no-resize`, `nesw-no-resize`, `nwse-no-resize`, or `default`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a `NativeImage`, and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Event: 'context-menu'

Returns:

* `event` Event
* `params` Object
  * `x` Integer - x coordinate.
  * `y` Integer - y coordinate.
  * `frame` WebFrameMain | null - Frame from which the context menu was invoked. May be `null` if accessed after the frame has either navigated or been destroyed.
  * `linkURL` string - URL of the link that encloses the node the context menu was invoked on.
  * `linkText` string - Text associated with the link. May be an empty string if the contents of the link are an image.
  * `pageURL` string - URL of the top level page that the context menu was invoked on.
  * `frameURL` string - URL of the subframe that the context menu was invoked on.
  * `srcURL` string - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` string - Type of the node the context menu was invoked on. Can be `none`, `image`, `audio`, `video`, `canvas`, `file` or `plugin`.
  * `hasImageContents` boolean - Whether the context menu was invoked on an image which has non-empty contents.
  * `isEditable` boolean - Whether the context is editable.
  * `selectionText` string - Text of the selection that the context menu was invoked on.
  * `titleText` string - Title text of the selection that the context menu was invoked on.
  * `altText` string - Alt text of the selection that the context menu was invoked on.
  * `suggestedFilename` string - Suggested filename to be used when saving file through 'Save Link As' option of context menu.
  * `selectionRect` Rectangle - Rect representing the coordinates in the document space of the selection.
  * `selectionStartOffset` number - Start position of the selection text.
  * `referrerPolicy` Referrer - The referrer policy of the frame on which the menu is invoked.
  * `misspelledWord` string - The misspelled word under the cursor, if any.
  * `dictionarySuggestions` string[] - An array of suggested words to show the user to replace the `misspelledWord`. Only available if there is a misspelled word and spellchecker is enabled.
  * `frameCharset` string - The character encoding of the frame on which the menu was invoked.
  * `formControlType` string - The source that the context menu was invoked on. Possible values include `none`, `button-button`, `field-set`, `input-button`, `input-checkbox`, `input-color`, `input-date`, `input-datetime-local`, `input-email`, `input-file`, `input-hidden`, `input-image`, `input-month`, `input-number`, `input-password`, `input-radio`, `input-range`, `input-reset`, `input-search`, `input-submit`, `input-telephone`, `input-text`, `input-time`, `input-url`, `input-week`, `output`, `reset-button`, `select-list`, `select-list`, `select-multiple`, `select-one`, `submit-button`, and `text-area`,
  * `spellcheckEnabled` boolean - If the context is editable, whether or not spellchecking is enabled.
  * `menuSourceType` string - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch`, `touchMenu`, `longPress`, `longTap`, `touchHandle`, `stylus`, `adjustSelection`, or `adjustSelectionReset`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on.
    * `inError` boolean - Whether the media element has crashed.
    * `isPaused` boolean - Whether the media element is paused.
    * `isMuted` boolean - Whether the media element is muted.
    * `hasAudio` boolean - Whether the media element has audio.
    * `isLooping` boolean - Whether the media element is looping.
    * `isControlsVisible` boolean - Whether the media element's controls are visible.
    * `canToggleControls` boolean - Whether the media element's controls are toggleable.
    * `canPrint` boolean - Whether the media element can be printed.
    * `canSave` boolean - Whether or not the media element can be downloaded.
    * `canShowPictureInPicture` boolean - Whether the media element can show picture-in-picture.
    * `isShowingPictureInPicture` boolean - Whether the media element is currently showing picture-in-picture.
    * `canRotate` boolean - Whether the media element can be rotated.
    * `canLoop` boolean - Whether the media element can be looped.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
    * `canUndo` boolean - Whether the renderer believes it can undo.
    * `canRedo` boolean - Whether the renderer believes it can redo.
    * `canCut` boolean - Whether the renderer believes it can cut.
    * `canCopy` boolean - Whether the renderer believes it can copy.
    * `canPaste` boolean - Whether the renderer believes it can paste.
    * `canDelete` boolean - Whether the renderer believes it can delete.
    * `canSelectAll` boolean - Whether the renderer believes it can select all.
    * `canEditRichly` boolean - Whether the renderer believes it can edit text richly.

Emitted when there is a new context menu that needs to be handled.

#### Event: 'select-bluetooth-device'

Returns: `event` Event, `devices` BluetoothDevice[], `callback` Function (`deviceId` string).

Emitted when a bluetooth device needs to be selected when a call to `navigator.bluetooth.requestDevice` is made. `callback` should be called with the `deviceId` of the device to be selected. Passing an empty string to `callback` will cancel the request.

If no event listener is added for this event, all bluetooth requests will be cancelled.

If `event.preventDefault` is not called when handling this event, the first available device will be automatically selected.

Due to the nature of bluetooth, scanning for devices when `navigator.bluetooth.requestDevice` is called may take time and will cause `select-bluetooth-device` to fire multiple times until `callback` is called with either a device id or an empty string to cancel the request.

```js
const { app, BrowserWindow } = require('electron')

let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      // The device wasn't found so we need to either wait longer (eg until the
      // device is turned on) or cancel the request by calling the callback
      // with an empty string.
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Event: 'paint'

Returns:

* `details` Event\<\>
  * `texture` OffscreenSharedTexture (optional) _Experimental_ - The GPU shared texture of the frame, when `webPreferences.offscreen.useSharedTexture` is `true`.
* `dirtyRect` Rectangle
* `image` NativeImage - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.toBitmap())
})
win.loadURL('https://github.com')
```

When using shared texture (set `webPreferences.offscreen.useSharedTexture` to `true`) feature, you can pass the texture handle to external rendering pipeline without the overhead of copying data between CPU and GPU memory, with Chromium's hardware acceleration support. This feature is helpful for high-performance rendering scenarios.

Only a limited number of textures can exist at the same time, so it's important that you call `texture.release()` as soon as you're done with the texture. By managing the texture lifecycle by yourself, you can safely pass the `texture.textureInfo` to other processes through IPC.

More details can be found in the offscreen rendering tutorial.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: { useSharedTexture: true } } })
win.webContents.on('paint', async (e, dirty, image) => {
  if (e.texture) {
    // By managing lifecycle yourself, you can handle the event in async handler or pass the `e.texture.textureInfo`
    // to other processes (not `e.texture`, the `e.texture.release` function is not passable through IPC).
    await new Promise((resolve) => setTimeout(resolve, 50))

    // You can send the native texture handle to native code for importing into your rendering pipeline.
    // Read more at https://github.com/electron/electron/blob/main/shell/browser/osr/README.md
    // importTextureHandle(dirty, e.texture.textureInfo)

    // You must call `e.texture.release()` as soon as possible, before the underlying frame pool is drained.
    e.texture.release()
  }
})
win.loadURL('https://github.com')
```

#### Event: 'devtools-reload-page'

Emitted when the DevTools window instructs the webContents to reload

#### Event: 'will-attach-webview'

Returns:

* `event` Event
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record\<string, string\> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

#### Event: 'did-attach-webview'

Returns: `event` Event, `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### Event: 'console-message'

Returns:

* `details` Event\<\>
  * `message` string - Message text
  * `level` string - Message severity. Possible values include `info`, `warning`, `error`, and `debug`.
  * `lineNumber` Integer - Line number in the log source
  * `sourceId` string - URL of the log source
  * `frame` WebFrameMain - Frame that logged the message
* `level` Integer _Deprecated_ - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` string _Deprecated_ - The actual console message
* `line` Integer _Deprecated_ - The line number of the source that triggered this console message
* `sourceId` string _Deprecated_

Emitted when the associated window logs a console message.

#### Event: 'preload-error'

Returns: `event` Event, `preloadPath` string, `error` Error.

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Event: 'ipc-message'

Returns: `event` IpcMainEvent, `channel` string, `...args` any[].

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`. See also `webContents.ipc`, which provides an `IpcMain`-like interface for responding to IPC messages specifically from this WebContents.

#### Event: 'ipc-message-sync'

Returns: `event` IpcMainEvent, `channel` string, `...args` any[].

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`. See also `webContents.ipc`.

#### Event: 'preferred-size-changed'

Returns: `event` Event, `preferredSize` Size - The minimum size needed to contain the layout of the document—without requiring scrolling.

Emitted when the `WebContents` preferred size has changed. This event will only be emitted when `enablePreferredSizeMode` is set to `true` in `webPreferences`.

#### Event: 'frame-created'

Returns: `event` Event, `details` Object (`frame` WebFrameMain | null - The created frame. May be `null` if accessed after the frame has either navigated or been destroyed.).

Emitted when the `mainFrame`, an `<iframe>`, or a nested `<iframe>` is loaded within the page.

## Notes

* `console-message`: positional `level` / `message` / `line` / `sourceId` arguments are marked _Deprecated_ in favor of `details`.
* `paint` with `texture` (`OffscreenSharedTexture`) is marked _Experimental_.
* The `paint` event with `webPreferences.offscreen` is the offscreen-rendering path; the `context-menu` event only reports parameters, the native menu is built with `Menu` (menus-tray category). Native OS menus are an Electron main-process API, distinct from Web UI menu components in ark-ui / chakra-ui / fandhe-frontend.

## Related

* [Events: loading, navigation](./web-contents-events-loading-navigation.md)
* [Input event structures](./input-event-structures.md)
* [Methods: devtools, ipc, input](./web-contents-methods-devtools-ipc-input.md)
* [webview tag](./webview-tag-overview-attributes.md)
