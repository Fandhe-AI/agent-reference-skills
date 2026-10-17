---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-340
---

# Breaking API Changes (34.0, 33.0)

All breaking changes listed for Electron 34.0 and 33.0, verbatim from the official document.

## Signature / Usage

From "Deprecated: `systemPreferences.accessibilityDisplayShouldReduceTransparency`" (33.0):

```js
// Deprecated
const shouldReduceTransparency = systemPreferences.accessibilityDisplayShouldReduceTransparency

// Replace with:
const prefersReducedTransparency = nativeTheme.prefersReducedTransparency
```

## Breaking API Changes (34.0)

### Behavior Changed: menu bar will be hidden during fullscreen on Windows

This brings the behavior to parity with Linux. Prior behavior: Menu bar is still visible during fullscreen on Windows. New behavior: Menu bar is hidden during fullscreen on Windows.

**Correction**: This was previously listed as a breaking change in Electron 33, but was first released in Electron 34.

## Breaking API Changes (33.0)

### Deprecated: `document.execCommand("paste")`

The synchronous clipboard read API [document.execCommand("paste")](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard) has been
deprecated in favor of [async clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). This is to align with the browser defaults.

The `enableDeprecatedPaste` option on `WebPreferences` that triggers the permission
checks for this API and the associated permission type `deprecated-sync-clipboard-read`
are also deprecated.

### Behavior Changed: frame properties may retrieve detached WebFrameMain instances or none at all

APIs which provide access to a `WebFrameMain` instance may return an instance
with `frame.detached` set to `true`, or possibly return `null`.

When a frame performs a cross-origin navigation, it enters into a detached state
in which it's no longer attached to the page. In this state, it may be running
[unload](https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event)
handlers prior to being deleted. In the event of an IPC sent during this state,
`frame.detached` will be set to `true` with the frame being destroyed shortly
thereafter.

When receiving an event, it's important to access WebFrameMain properties
immediately upon being received. Otherwise, it's not guaranteed to point to the
same webpage as when received. To avoid misaligned expectations, Electron will
return `null` in the case of late access where the webpage has changed.

```js
ipcMain.on('unload-event', (event) => {
  event.senderFrame // ✅ accessed immediately
})

ipcMain.on('unload-event', async (event) => {
  await crossOriginNavigationPromise
  event.senderFrame // ❌ returns `null` due to late access
})
```

### Behavior Changed: custom protocol URL handling on Windows

Due to changes made in Chromium to support [Non-Special Scheme URLs](http://bit.ly/url-non-special), custom protocol URLs that use Windows file paths will no longer work correctly with the deprecated `protocol.registerFileProtocol` and the `baseURLForDataURL` property on `BrowserWindow.loadURL`, `WebContents.loadURL`, and `<webview>.loadURL`.  `protocol.handle` will also not work with these types of URLs but this is not a change since it has always worked that way.

Adapted (not in the official docs): the official example passes an undefined identifier `other` and uses `other://index.html`, where index.html becomes the host; this version quotes the scheme and uses `other:///index.html`.

```js
// No longer works
protocol.registerFileProtocol('other', () => {
  callback({ filePath: '/path/to/my/file' })
})

const mainWindow = new BrowserWindow()
mainWindow.loadURL('data:text/html,<script src="loaded-from-dataurl.js"></script>', {
  baseURLForDataURL: 'other://C:\\myapp'
})
mainWindow.loadURL('other://C:\\myapp\\index.html')

// Replace with
const path = require('node:path')
const nodeUrl = require('node:url')
protocol.handle('other', (req) => {
  const srcPath = 'C:\\myapp\\'
  const reqURL = new URL(req.url)
  return net.fetch(nodeUrl.pathToFileURL(path.join(srcPath, reqURL.pathname)).toString())
})

mainWindow.loadURL('data:text/html,<script src="loaded-from-dataurl.js"></script>', { baseURLForDataURL: 'other:///' })
mainWindow.loadURL('other:///index.html')
```

### Behavior Changed: `webContents` property on `login` on `app`

The `webContents` property in the `login` event from `app` will be `null`
when the event is triggered for requests from the [utility process](https://www.electronjs.org/docs/latest/api/utility-process)
created with `respondToAuthRequestsFromMainProcess` option.

### Deprecated: `textured` option in `BrowserWindowConstructorOption.type`

The `textured` option of `type` in `BrowserWindowConstructorOptions` has been deprecated with no replacement. This option relied on the [`NSWindowStyleMaskTexturedBackground`](https://developer.apple.com/documentation/appkit/nswindowstylemask/nswindowstylemasktexturedbackground) style mask on macOS, which has been deprecated with no alternative.

### Removed: macOS 10.15 support

macOS 10.15 (Catalina) is no longer supported by [Chromium](https://chromium-review.googlesource.com/c/chromium/src/+/5734361).

Older versions of Electron will continue to run on Catalina, but macOS 11 (Big Sur)
or later will be required to run Electron v33.0.0 and higher.

### Behavior Changed: Native modules now require C++20

Due to changes made upstream, both
[V8](https://chromium-review.googlesource.com/c/v8/v8/+/5587859) and
[Node.js](https://github.com/nodejs/node/pull/45427) now require C++20 as a
minimum version. Developers using native node modules should build their
modules with `--std=c++20` rather than `--std=c++17`. Images using gcc9 or
lower may need to update to gcc10 in order to compile. See
[#43555](https://github.com/electron/electron/pull/43555) for more details.

### Deprecated: `systemPreferences.accessibilityDisplayShouldReduceTransparency`

The `systemPreferences.accessibilityDisplayShouldReduceTransparency` property is now deprecated in favor of the new `nativeTheme.prefersReducedTransparency`, which provides identical information and works cross-platform.

```js
// Deprecated
const shouldReduceTransparency = systemPreferences.accessibilityDisplayShouldReduceTransparency

// Replace with:
const prefersReducedTransparency = nativeTheme.prefersReducedTransparency
```

## Notes

- Affected API areas: `Menu` bar in fullscreen on Windows; `document.execCommand("paste")` / `WebPreferences.enableDeprecatedPaste` / permission `deprecated-sync-clipboard-read`; `WebFrameMain.detached`; `protocol.registerFileProtocol` (deprecated) vs `protocol.handle`; `baseURLForDataURL`; app `login` event; `BrowserWindowConstructorOptions.type` `textured`; native modules (C++20); `systemPreferences.accessibilityDisplayShouldReduceTransparency` (replaced by `nativeTheme.prefersReducedTransparency`).
- Adapted (not in the official docs): in the custom protocol example, the official doc passes the bare identifier `other` to `protocol.handle` (quoted here) and loads `other://index.html` / `baseURLForDataURL: 'other://'`, where `index.html` becomes the host and the pathname is empty; this page uses `other:///index.html` and `'other:///'`.
- Electron's `protocol` / `net.fetch` entries concern custom URL schemes inside Electron; server-side HTTP is covered by fastify and hono.
- The native-modules C++20 entry relates to building addons; native module build steps are in the distribution-updates category of this skill.

## Related

- [Breaking API Changes (35.0)](./breaking-changes-v35.md)
- [Breaking API Changes (32.0, 31.0)](./breaking-changes-v32-v31.md)
