---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-440
---

# Breaking API Changes (44.0)

All breaking changes listed for Electron 44.0, verbatim from the official document (links to other doc pages converted to electronjs.org URLs).

## Breaking API Changes (44.0)

### Behavior Changed: workers created by subframes need `nodeIntegrationInSubFrames` for Node.js integration

With `nodeIntegrationInWorker: true`, a `Worker` created from an `<iframe>` in
the same process as the main frame used to get Node.js integration even though
the iframe itself had none. Workers now only get Node.js integration when the
frame that creates them has it: the main frame, or any frame when
`nodeIntegrationInSubFrames` is enabled.

### Behavior Changed: preload scripts only run in DevTools extension frames hosted by DevTools

A `chrome-extension://` document used to receive the window's preload script
(and session preload scripts) wherever it was embedded. It now only does so
when it is a top-level frame or is hosted inside the DevTools front-end (a
`devtools_page` or panel); an extension frame embedded in an ordinary page is
treated like any other subframe and follows `nodeIntegrationInSubFrames`.

### Behavior Changed: `webContents` may be `null` in `select-client-certificate`

The `app` `'select-client-certificate'` event is now also emitted for requests made
via the [`net` module](https://www.electronjs.org/docs/latest/api/net) and for [utility processes](https://www.electronjs.org/docs/latest/api/utility-process)
created with `respondToAuthRequestsFromMainProcess: true`. For these requests the
`webContents` argument is `null`. Previously the event was only emitted for requests
originating from a `WebContents` and the argument was always non-null.

As with `WebContents` requests, when the event is not handled (or `event.preventDefault()`
is not called) Electron uses the first matching client certificate from the platform
certificate store. Previously `net` requests to a server that requested a client
certificate failed with `ERR_SSL_CLIENT_AUTH_CERT_NEEDED`. To opt out, handle the event
and call `callback()` with no argument to continue without a client certificate.

```js
// Before
app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  console.log(webContents.id)
})

// After
app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  if (webContents) console.log(webContents.id)
})
```

### Removed: macOS 12 support

macOS 12 (Monterey) is no longer supported by [Chromium](https://chromium-review.googlesource.com/c/chromium/src/+/7907086).

Older versions of Electron will continue to run on Monterey, but macOS 13 (Ventura)
or later will be required to run Electron v44.0.0 and higher.

### Behavior Changed: ANGLE is statically linked on all platforms

ANGLE is now [statically linked](https://issues.chromium.org/issues/40268378)
into the Electron binary on all platforms, matching upstream Chromium. The `libEGL.(so|dylib|dll)`
and `libGLESv2.(so|dylib|dll)` libraries are no longer shipped in the distribution.

Apps that replaced or managed their own ANGLE versions by swapping out these
libraries can no longer do so. Additionally, because ANGLE is now part
of the Electron binary, it is loaded into every process rather than only the GPU
process, which may surface regressions in unusual configurations.

### Behavior Changed: `net.request` rejects frame destinations without navigate mode

`net.request` now rejects requests where `Sec-Fetch-Dest` is `document`, `frame`,
`iframe`, or `fencedframe` unless `Sec-Fetch-Mode` is also set to `navigate`.
This matches Chromium's enforcement that frame-type request destinations must be
navigations.

Apps that explicitly set one of these `Sec-Fetch-Dest` values on a `net.request`
must also set `Sec-Fetch-Mode` to `navigate`.

### Removed: Unity desktop environment support on Linux

Unity has not been the default desktop environment in Ubuntu LTS since version 16.04, which is not supported by current versions of Electron. The deprecation does not
prevent Electron from running on Unity if it is installed in a newer distribution, but it will no longer offer unique functionality. In general, Electron supports
modern [Freedesktop](https://specifications.freedesktop.org/) standards on Linux rather than APIs which only work in specific environments.

One API has been removed: `app.isUnityRunning()`. Some Unity-specific APIs no longer function on Linux, but remain supported on other platforms:

- `app.setBadgeCount(count)` and `app.badgeCount` _macOS_
- `BaseWindow.setProgressBar(progress)` and `BrowserWindow.setProgressBar(progress)` _Windows_ _macOS_.

### Removed: Windows 32-bit (ia32) and Linux 32-bit ARM (armv7l) support

Electron no longer publishes prebuilt binaries for 32-bit platforms: Windows x86
(`win32-ia32`) and Linux ARM (`linux-armv7l`). All related release artifacts
(`chromedriver`, `mksnapshot`, `ffmpeg`, and the Windows x86 `node.lib` on the
Electron headers CDN) are no longer published either.

Older versions of Electron will continue to support these platforms, but Electron
v44.0.0 and higher will only be published for 64-bit platforms.

Once the v43 series reaches end of life in January 2027, these 32-bit platforms
will no longer be supported.

### Removed: `clipboard` module is no longer available in the renderer process

The `clipboard` module is no longer exposed to renderer processes. It was
[previously deprecated](https://www.electronjs.org/docs/latest/breaking-changes#deprecated-clipboard-api-access-from-renderer-processes)
and is now removed in line with
[RFC&nbsp;0019](https://github.com/electron/rfcs/blob/main/text/0019-clipboard-rearchitecture.md#removing-the-clipboard-api-from-the-renderer)
to close the security risk of granting non-sandboxed renderers direct clipboard access.

Renderers should use the [`navigator.clipboard` API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) to safely work with the system clipboard. If more advanced usage is necessary, expose the necessary helpers from a
preload script using the [`contextBridge` API](https://www.electronjs.org/docs/latest/api/context-bridge).
When using `contextBridge` care must be taken to ensure that the [`clipboard API` is not exposed to untrusted content](https://www.electronjs.org/docs/latest/tutorial/security#20-do-not-expose-electron-apis-to-untrusted-web-content).

### API Changed: `clipboard` module rearchitected to align with the W3C Clipboard API

The `clipboard` module has been
[rearchitected](https://github.com/electron/rfcs/blob/main/text/0019-clipboard-rearchitecture.md)
to align with the [W3C Clipboard API](https://w3c.github.io/clipboard-apis/#clipboard-interface).
The four read/write methods now all return Promises, matching
`navigator.clipboard`:

- `clipboard.read()` returns `Promise<ClipboardItem[]>`. Each item
  exposes a `types` array and `getType(type) → Promise<Blob>` for
  lazy retrieval — matching the W3C
  [`ClipboardItem`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem)
  instance shape. `getType('electron application/bookmark')` is the one
  exception: it resolves to a `{ title, url }` object instead of a
  `Blob`.
- `clipboard.write(items)` returns `Promise<void>` and accepts an array
  of [`ClipboardItem`](https://www.electronjs.org/docs/latest/api/clipboard-item) instances constructed via
  `new ClipboardItem({ [mime]: payload })` — modeled after the W3C
  [`ClipboardItem(items)`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem/ClipboardItem#parameters)
  constructor. Each payload value is `Blob | string | Object` (a `string`
  is committed as UTF-8 and a `Blob`'s bytes are committed verbatim). The
  `electron application/bookmark` custom format
  instead takes a `{ title, url }` object. All entries in a single
  `write()` call are committed atomically.
- `clipboard.readText()` returns `Promise<string>`.
- `clipboard.writeText(text)` returns `Promise<void>`.
- The `text/uri-list` MIME type maps to the operating system's native
  file-reference format (`CF_HDROP` on Windows, `NSFilenamesPboardType` on
  macOS, `text/uri-list` on Linux) rather than a generic text payload. Its
  payload is an [RFC&nbsp;2483](https://www.rfc-editor.org/rfc/rfc2483)
  `file://` URI list, so `clipboard.read()`/`clipboard.write()` can read and
  write files copied to and from native applications. See
  [`ClipboardItem`](https://www.electronjs.org/docs/latest/api/clipboard-item#files-the-texturi-list-mime-type)
  for details.

`clipboard.has(mimetype)` now returns `Promise<boolean>` because the
underlying Chromium clipboard API is asynchronous. Additionally, instead
of taking a format, `clipboard.has()` accepts a MIME type. To check for
a raw format, eg `public/utf8-plain-text`, use the `electron application/osclipboard`
custom format (`electron application/osclipboard;format="public/utf8-plain-text"`).

The narrowly-scoped helpers (`availableFormats`, `readBookmark`,
`writeBookmark`, `readBuffer`, `writeBuffer`, `readFindText`,
`writeFindText`, `readHTML`, `writeHTML`, `readImage`, `writeImage`,
`readRTF`, `writeRTF`) and the optional `type` parameter accepted by
`clipboard.clear`, `clipboard.has`, `clipboard.readText`, and
`clipboard.writeText` have been removed. The Linux selection clipboard is
now reached through a new `clipboard.selection` sub-namespace.

  | Old API | New API |
  |---------|---------|
  | `clipboard.availableFormats([type])` | `clipboard.read()` - iterate through `ClipboardItem` array and collect types |
  | `clipboard.clear()` | `clipboard.clear()` (no type parameter) |
  | `clipboard.clear('selection')` _Linux_ | `clipboard.selection.clear()` |
  | `clipboard.has(format)` | `clipboard.has(mimetype)` now returns `Promise<boolean>` |
  | `clipboard.has(format, 'selection')` _Linux_ | `clipboard.selection.has(mimetype)` (returns `Promise<boolean>`) |
  | `clipboard.read()` | `clipboard.read()` now returns `Promise<ClipboardItem[]>` |
  | `clipboard.read('selection')` _Linux_ | `clipboard.selection.read()` (returns `Promise<ClipboardItem[]>`) |
  | `clipboard.readBookmark()` | `clipboard.read()` with `electron application/bookmark` custom format |
  | `clipboard.readBuffer(format)` | `clipboard.read()` with `electron application/osclipboard;format="..."` custom format |
  | `clipboard.readBuffer('selection')` _Linux_ | `clipboard.selection.read()` with `electron application/osclipboard;format="..."` custom format |
  | `clipboard.readFindText()` _macOS_ | `clipboard.read()` with `electron application/findtext` custom format |
  | `clipboard.readHTML([type])` | `clipboard.read()` with `text/html` MIME type |
  | `clipboard.readImage([type])` | `clipboard.read()` with `image/*` MIME type |
  | `clipboard.readRTF([type])` | `clipboard.read()` with `text/rtf` MIME type |
  | `clipboard.readText()` | `clipboard.readText()` now returns `Promise<string>` |
  | `clipboard.readText('selection')` _Linux_ | `clipboard.selection.readText()` (returns `Promise<string>`) |
  | `clipboard.write(data)` | `clipboard.write([new ClipboardItem({ [mime]: Blob / string })])` — accepts an array of `ClipboardItem` objects (each with a MIME-keyed `data` record) and returns `Promise<void>` |
  | `clipboard.write(data, 'selection')` _Linux_ | `clipboard.selection.write([new ClipboardItem({ [mime]: Blob / string })])` (returns `Promise<void>`) |
  | `clipboard.writeBookmark(title, url[, type])` | `clipboard.write()` with `electron application/bookmark` custom format |
  | `clipboard.writeBuffer(format, buffer[, type])` | `clipboard.write()` with `electron application/osclipboard;format="..."` custom format |
  | `clipboard.writeBuffer(format, buffer, 'selection')` _Linux_ | `clipboard.selection.write()` with `electron application/osclipboard;format="..."` custom format |
  | `clipboard.writeFindText(text)` _macOS_ | `clipboard.write()` with `electron application/findtext` custom format |
  | `clipboard.writeHTML(markup[, type])` | `clipboard.write()` with `text/html` MIME type |
  | `clipboard.writeImage(image[, type])` | `clipboard.write()` with `image/*` MIME type |
  | `clipboard.writeRTF(text[, type])` | `clipboard.write()` with `text/rtf` MIME type |
  | `clipboard.writeText(text)` | `clipboard.writeText(text)` now returns `Promise<void>` |
  | `clipboard.writeText(text, 'selection')` _Linux_ | `clipboard.selection.writeText(text)` (returns `Promise<void>`) |

#### Example migration code

```js
const { clipboard, ClipboardItem } = require('electron')

function getClipboardToUse(clipboardType) {
  if (clipboardType === 'selection') {
    return clipboard.selection
  } else {
    return clipboard
  }
}

async function readClipboard(format, clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  const clipboardItems = await clipboardToUse.read()
  const foundItem = clipboardItems.find((clipboardItem) => {
    return clipboardItem.types.includes(format)
  })
  if (foundItem) {
    // getType() resolves to a Blob; read it back as text.
    const blob = await foundItem.getType(format)
    return blob.text()
  }
}

async function writeClipboard(format, text, clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  return clipboardToUse.write([
    new ClipboardItem({
      [format]: text
    })
  ])
}

async function readBuffer(format, clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  const clipboardItems = await clipboardToUse.read()
  const foundItem = clipboardItems.find((clipboardItem) => {
    return clipboardItem.types.includes(format)
  })
  if (foundItem) {
    // getType() resolves to a Blob; convert it to a Buffer.
    const blob = await foundItem.getType(format)
    return Buffer.from(await blob.arrayBuffer())
  }
}

async function writeBuffer(format, buffer, clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  return clipboardToUse.write([
    new ClipboardItem({
      [format]: new Blob([buffer])
    })
  ])
}

async function availableFormats(clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  const clipboardItems = await clipboardToUse.read()
  const clipboardFormats = []
  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      if (!clipboardFormats.includes(type)) {
        clipboardFormats.push(type)
      }
    }
  }
  return clipboardFormats
}

async function has(format, clipboardType, isRawFormat) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  let mimeType = format
  if (isRawFormat) {
    mimeType = `electron application/osclipboard;format="${format}"`
  }
  return clipboardToUse.has(mimeType)
}

const BOOKMARK_MIME_TYPE = 'electron application/bookmark'
async function readBookmark(clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  const clipboardItems = await clipboardToUse.read()
  const foundItem = clipboardItems.find((clipboardItem) => {
    return clipboardItem.types.includes(BOOKMARK_MIME_TYPE)
  })
  if (foundItem) {
    // getType('electron application/bookmark') resolves to a
    // { title, url } object rather than a Buffer.
    return foundItem.getType(BOOKMARK_MIME_TYPE)
  }
}

async function writeBookmark(title, url, clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  return clipboardToUse.write([
    new ClipboardItem({
      [BOOKMARK_MIME_TYPE]: { title, url }
    })
  ])
}

const FIND_TEXT_MIME_TYPE = 'electron application/findtext'
async function readFindText() {
  return readClipboard(FIND_TEXT_MIME_TYPE)
}

async function writeFindText(text) {
  return writeClipboard(FIND_TEXT_MIME_TYPE, text)
}

const HTML_MIME_TYPE = 'text/html'
async function readHTML(clipboardType) {
  return readClipboard(HTML_MIME_TYPE, clipboardType)
}

async function writeHTML(markup, clipboardType) {
  return writeClipboard(HTML_MIME_TYPE, markup, clipboardType)
}

const PNG_MIME_TYPE = 'image/png'
const JPEG_MIME_TYPE = 'image/jpeg'
async function readImage(clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  const clipboardItems = await clipboardToUse.read()
  // Look for PNG first
  let foundItem = clipboardItems.find((clipboardItem) => {
    return clipboardItem.types.includes(PNG_MIME_TYPE)
  })
  if (!foundItem) {
    foundItem = clipboardItems.find((clipboardItem) => {
      return clipboardItem.types.includes(JPEG_MIME_TYPE)
    })
  }
  if (foundItem) {
    const mimeType = foundItem.types.includes(PNG_MIME_TYPE) ? PNG_MIME_TYPE : JPEG_MIME_TYPE
    // getType() resolves to a Blob; convert it to a Buffer for nativeImage.
    const blob = await foundItem.getType(mimeType)
    const buffer = Buffer.from(await blob.arrayBuffer())
    return nativeImage.createFromBuffer(buffer)
  }
}

async function writeImage(image, clipboardType) {
  const clipboardToUse = getClipboardToUse(clipboardType)
  return clipboardToUse.write([
    new ClipboardItem({
      'image/png': new Blob([image.toPNG()], { type: 'image/png' })
    })
  ])
}

const RTF_MIME_TYPE = 'text/rtf'
async function readRTF(clipboardType) {
  return readClipboard(RTF_MIME_TYPE, clipboardType)
}

async function writeRTF(text, clipboardType) {
  return writeClipboard(RTF_MIME_TYPE, text, clipboardType)
}
```

### Removed: Pre-macOS 13 login item attributes

Electron 44 removes the option `openAsHidden` from
[`app.setLoginItemSettings()`](https://www.electronjs.org/docs/latest/api/app#appsetloginitemsettingssettings-macos-windows)
and the fields `openAsHidden`, `wasOpenedAsHidden` and `restoreState` from the return value of
[`app.getLoginItemSettings()`](https://www.electronjs.org/docs/latest/api/app#appgetloginitemsettingsoptions-macos-windows).

These only worked on macOS 12 and below. Support for macOS 12 has been dropped.

## Notes

- Affected API areas (for cross-reference): `webPreferences.nodeIntegrationInWorker` / `nodeIntegrationInSubFrames`; preload scripts (window and session); app `select-client-certificate` event; `net.request`; utility process `respondToAuthRequestsFromMainProcess`; `app.isUnityRunning()` (removed); `app.setBadgeCount` / `app.badgeCount`; `setProgressBar`; `clipboard` / `ClipboardItem` (removed from renderer, Promise-based); `app.setLoginItemSettings` / `app.getLoginItemSettings`; platform support (macOS 12, win32-ia32, linux-armv7l); ANGLE linking.
- The `clipboard` entries describe the Electron main-process OS clipboard API. For Web UI component libraries use ark-ui or chakra-ui; native clipboard APIs of other platforms are covered by apple-appkit, android-platform-core and windows-app-sdk.
- The `net.request` / `select-client-certificate` entries concern Electron's client-side `net` module; server-side HTTP request handling is covered by fastify and hono.
- Anchor note: the `Deprecated: clipboard API access from renderer processes` entry referenced above is in the 40.0 section (see [v41-v40](./breaking-changes-v41-v40.md)).

## Related

- [Breaking Changes: conventions](./breaking-changes-overview.md)
- [Breaking API Changes (43.0)](./breaking-changes-v43.md)
- [Breaking API Changes (41.0, 40.0)](./breaking-changes-v41-v40.md)
