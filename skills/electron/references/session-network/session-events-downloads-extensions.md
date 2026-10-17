---
source: https://www.electronjs.org/docs/latest/api/session#instance-events
---

# Session events: will-download, extensions, file system access, preconnect, spellcheck

Instance events of the `Session` class (will-download, extension lifecycle, file-system-access-restricted, preconnect, spellcheck dictionary).

## Signature / Usage

Process: Main

The following events are available on instances of `Session`:

```js
const { session } = require('electron')

session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('got')(item.getURL()).then((response) => {
    require('node:fs').writeFileSync('/somewhere', response.body)
  })
})
```

### Event: 'will-download'

Returns:

* `event` Event
* `item` [DownloadItem](./download-item.md)
* `webContents` WebContents
* `frame` WebFrameMain | null - The frame that started the download, if it still exists.

Emitted when Electron is about to download `item` in `webContents`. See also `item.getInitiatorOrigin()` ([DownloadItem](./download-item.md)).

Calling `event.preventDefault()` will cancel the download and `item` will not be available from next tick of the process.

### Event: 'extension-loaded'

Returns:

* `event` Event
* `extension` [Extension](./session-structures.md)

Emitted after an extension is loaded. This occurs whenever an extension is added to the "enabled" set of extensions. This includes:

* Extensions being loaded from `Session.loadExtension`.
* Extensions being reloaded:
  * from a crash.
  * if the extension requested it ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

### Event: 'extension-unloaded'

Returns:

* `event` Event
* `extension` [Extension](./session-structures.md)

Emitted after an extension is unloaded. This occurs when `Session.removeExtension` is called.

### Event: 'extension-ready'

Returns:

* `event` Event
* `extension` [Extension](./session-structures.md)

Emitted after an extension is loaded and all necessary browser state is initialized to support the start of the extension's background page.

### Event: 'file-system-access-restricted'

Returns:

* `event` Event
* `details` Object
  * `origin` string - The origin that initiated access to the blocked path.
  * `isDirectory` boolean - Whether or not the path is a directory.
  * `path` string - The blocked path attempting to be accessed.
  * `frame` WebFrameMain | null - The frame that initiated access. May be `null` if the frame has since been destroyed.
  * `webContents` WebContents | null - The WebContents that contains `frame`.
* `callback` Function
  * `action` string - The action to take as a result of the restricted path access attempt.
    * `allow` - This will allow `path` to be accessed despite restricted status.
    * `deny` - This will block the access request and trigger an [`AbortError`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort).
    * `tryAgain` - This will open a new file picker and allow the user to choose another path.

```js
const { app, dialog, BrowserWindow, session } = require('electron')

async function createWindow() {
  const mainWindow = new BrowserWindow()

  await mainWindow.loadURL('https://buzzfeed.com')

  session.defaultSession.on('file-system-access-restricted', async (e, details, callback) => {
    const { origin, path } = details
    const { response } = await dialog.showMessageBox({
      message: `Are you sure you want ${origin} to open restricted path ${path}?`,
      title: 'File System Access Restricted',
      buttons: ['Choose a different folder', 'Allow', 'Cancel'],
      cancelId: 2
    })

    if (response === 0) {
      callback('tryAgain')
    } else if (response === 1) {
      callback('allow')
    } else {
      callback('deny')
    }
  })

  mainWindow.webContents.executeJavaScript(
    `
    window.showDirectoryPicker({
      id: 'electron-demo',
      mode: 'readwrite',
      startIn: 'downloads',
    }).catch(e => {
      console.log(e)
    })`,
    true
  )
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

### Event: 'preconnect'

Returns:

* `event` Event
* `preconnectUrl` string - The URL being requested for preconnection by the renderer.
* `allowCredentials` boolean - True if the renderer is requesting that the connection include credentials (see the [spec](https://w3c.github.io/resource-hints/#preconnect) for more details.)
* `frame` WebFrameMain | null - The frame that requested the preconnection, if it still exists.

Emitted when a render process requests preconnection to a URL, generally due to a [resource hint](https://w3c.github.io/resource-hints/).

### Event: 'spellcheck-dictionary-initialized'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

### Event: 'spellcheck-dictionary-download-begin'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

### Event: 'spellcheck-dictionary-download-success'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded

### Event: 'spellcheck-dictionary-download-failure'

Returns:

* `event` Event
* `languageCode` string - The language code of the dictionary file

Emitted when a hunspell dictionary file download fails. For details on the failure you should collect a netlog and inspect the download request.

## Notes

* History: changed — Added the trailing `frame` argument to `will-download` (https://github.com/electron/electron/pull/53685).
* History: changed — Added the trailing `frame` argument to `preconnect` (https://github.com/electron/electron/pull/53685).
* History: changed — `file-system-access-restricted`: Added `details.frame` and `details.webContents`; emitted once per requesting document instead of once per path (https://github.com/electron/electron/pull/53666).
* `WebContents`, `WebFrameMain` and the `session.loadExtension` / `removeExtension` methods are documented at https://www.electronjs.org/docs/latest/api/web-contents, https://www.electronjs.org/docs/latest/api/web-frame-main and [session-methods-extensions-properties.md](./session-methods-extensions-properties.md).
* The `dialog` module used in the example opens OS-native dialogs from the main process; it is not a Web UI component (for Web UI components see ark-ui / chakra-ui).

## Related

* [session-module](./session-module.md)
* [DownloadItem](./download-item.md)
* [Extension structures](./session-structures.md)
* [session-events-devices](./session-events-devices.md)
