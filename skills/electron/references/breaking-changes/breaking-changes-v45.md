---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-450
---

# Breaking API Changes (45.0)

All breaking changes listed for Electron 45.0, verbatim from the official document (links to other doc pages converted to electronjs.org URLs).

## Signature / Usage

From "Removed: `contentTracing.enableHeapProfiling()`" (45.0):

```js
await contentTracing.startRecording({
  nativeHeapProfiling: {
    samplingInterval: 128 * 1024
  }
})
```

## Options / Props

### Removed: Node.js module shims and `Buffer`, `setImmediate`, `clearImmediate` globals in sandboxed preload scripts

Sandboxed preload scripts (the default since Electron 20) and service worker preload
scripts no longer have access to the `events`, `timers` and `url` Node.js module
shims through `require`, and are no longer run with `Buffer`, `setImmediate` and
`clearImmediate` in scope. These were browser polyfills bundled into every sandboxed
renderer rather than the Node.js implementations. `require` in a sandboxed preload
now only loads `electron` (and `electron/renderer`, `electron/common`); `process`
and `global` are still provided.

Use the equivalent Web APIs instead, or bundle the polyfill you need into your
preload script:

| Removed | Use instead |
| --- | --- |
| `require('events')` / `EventEmitter` | `EventTarget` and `Event`, or bundle the `events` package |
| `require('timers')`, `setImmediate`, `clearImmediate` | `setTimeout` / `clearTimeout`, `queueMicrotask` |
| `require('url')` | `URL`, `URLSearchParams` |
| `Buffer` | `Uint8Array`, `TextEncoder` / `TextDecoder`, `atob` / `btoa`, or bundle the `buffer` package |

`ipcRenderer` and the preload's `process` object keep their `EventEmitter` methods
(`on`, `once`, `off`, `emit`, `removeListener`, `removeAllListeners`, ...).
Preload scripts for renderers with `sandbox: false` are unaffected and continue to
have the full Node.js environment.

### Behavior Changed: `ipcRenderer` and `process` in sandboxed preload scripts use a native `EventEmitter`

In sandboxed preload scripts and service worker preload scripts, `ipcRenderer`,
`webFrame` and the preload's `process` object now inherit from an `EventEmitter`
implemented natively by Electron instead of one from a bundled copy of the `events`
npm package. It provides the same instance API as before (`on`, `once`, `off`,
`emit`, `addListener`, `removeListener`, `removeAllListeners`, `prependListener`,
`prependOnceListener`, `listeners`, `rawListeners`, `listenerCount`, `eventNames`,
`setMaxListeners`, `getMaxListeners`, the `newListener` / `removeListener` events and
the max-listener warning) with the same behavior. The static helpers that were only
reachable through `require('events')` (`once`, `listenerCount`, `init`) are not
provided.

### Behavior Changed: workers created by subframes need `nodeIntegrationInSubFrames` for Node.js integration

With `nodeIntegrationInWorker: true`, a `Worker` created from an `<iframe>` in
the same process as the main frame used to get Node.js integration even though
the iframe itself had none. Workers now only get Node.js integration when the
frame that creates them has it: the main frame, or any frame when
`nodeIntegrationInSubFrames` is enabled.

This change was also backported to Electron 44.3.0, 43.7.0 and 42.11.3.

### Behavior Changed: preload scripts only run in DevTools extension frames hosted by DevTools

A `chrome-extension://` document used to receive the window's preload script
(and session preload scripts) wherever it was embedded. It now only does so
when it is a top-level frame or is hosted inside the DevTools front-end (a
`devtools_page` or panel); an extension frame embedded in an ordinary page is
treated like any other subframe and follows `nodeIntegrationInSubFrames`.

This change was also backported to Electron 44.3.0, 43.7.0 and 42.11.3.

### Behavior Changed: `getUserMedia` with `chromeMediaSource: 'desktop'` rejects WebContents source ids

The legacy `chromeMediaSource: 'desktop'` constraint now only accepts screen and
window source ids from [`desktopCapturer.getSources`](https://www.electronjs.org/docs/latest/api/desktop-capturer#desktopcapturergetsourcesoptions).
Passing a WebContents source id there now fails with an "Invalid state" error.
To capture a WebContents, use `chromeMediaSource: 'tab'` with an id from
[`webContents.getMediaSourceId()`](https://www.electronjs.org/docs/latest/api/web-contents#contentsgetmediasourceidrequestwebcontents),
or use [`ses.setDisplayMediaRequestHandler`](https://www.electronjs.org/docs/latest/api/session#sessetdisplaymediarequesthandlerhandler-opts).

```js
// Main process
const sourceId = targetContents.getMediaSourceId(requestingContents)

// Renderer process of requestingContents
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    mandatory: {
      chromeMediaSource: 'tab',
      chromeMediaSourceId: sourceId
    }
  }
})
```

This change was also backported to Electron 44.3.0, 43.7.0 and 42.11.3.

### Removed: `contentTracing.enableHeapProfiling()`

The experimental `contentTracing.enableHeapProfiling()` API has been removed.
Chromium removed the memlog implementation that backed this API and replaced it
with a Perfetto heap-profiling data source. Pass a `nativeHeapProfiling` option
to `contentTracing.startRecording()` to enable heap profiling for the duration
of a trace. Like all recordings, heap-enabled recordings use the
[Perfetto protobuf format](https://perfetto.dev/docs/reference/trace-packet-proto).

The old options map to the new ones as follows:

* `samplingRate` is now `nativeHeapProfiling.samplingInterval`.
* `mode` has no direct equivalent. Every traced process is profiled; use
  `included_process_ids` in a `TraceConfig` to limit which processes are traced.
* `stackMode` has no equivalent.

```js
await contentTracing.startRecording({
  nativeHeapProfiling: {
    samplingInterval: 128 * 1024
  }
})
```

### Behavior Changed: `contentTracing` recordings use the Perfetto protobuf format

`contentTracing.stopRecording()` used to write traces in the legacy JSON trace
format. It now always writes the
[Perfetto protobuf format](https://perfetto.dev/docs/reference/trace-packet-proto),
and the JSON format is no longer available. Open recordings in the
[Perfetto UI](https://ui.perfetto.dev), or query them with Perfetto's
[Trace Processor](https://perfetto.dev/docs/analysis/trace-processor). If you
still need the legacy JSON format, Perfetto's
[`traceconv`](https://perfetto.dev/docs/quickstart/traceconv) tool can convert
a recording to it.

### Behavior Changed: screen capture requests are reported as `display-capture` in `setPermissionRequestHandler`

Requests to capture the screen, a window or a tab -- made through
`navigator.mediaDevices.getDisplayMedia()` or through `getUserMedia()` with the
`chromeMediaSource` / `chromeMediaSourceId` constraints used with
[`desktopCapturer`](https://www.electronjs.org/docs/latest/api/desktop-capturer) -- are now passed to
[`session.setPermissionRequestHandler`](https://www.electronjs.org/docs/latest/api/session#sessetpermissionrequesthandlerhandler)
with the documented `display-capture` permission. Previously they were reported as
`media` with an empty `details.mediaTypes` array, indistinguishable from a camera
or microphone request other than by that empty array. `media` is now only used for
camera and microphone devices.

Applications with a permission request handler that grants `media` and denies
everything else must also grant `display-capture` to keep screen sharing working:

```js
session.defaultSession.setPermissionRequestHandler((webContents, permission, callback, details) => {
  if (permission === 'media' || permission === 'display-capture') {
    return callback(true)
  }
  callback(false)
})
```

For `display-capture` requests, `details.mediaTypes` now lists `video` and/or
`audio` to indicate whether display video and/or display audio was requested.
The `setDisplayMediaRequestHandler` flow for `getDisplayMedia()` is unchanged and
still runs after the permission request has been granted.

The [`display-capture` Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/display-capture)
is now also applied to `getUserMedia()` calls that use the `chromeMediaSource`
constraints, matching `getDisplayMedia()`. Its default allowlist is `self`, so a
cross-origin `<iframe>` that captures the screen this way now needs
`allow="display-capture"` on the iframe element.

### Default Changed: `document.requestStorageAccessFor` is disabled

Chromium has disabled `document.requestStorageAccessFor` by default ahead of
its removal. The API can temporarily be restored with the
[`enableBlinkFeatures`](https://www.electronjs.org/docs/latest/api/structures/web-preferences) web preference set to
`RequestStorageAccessFor`. See
[Chromium's intent to remove discussion](https://groups.google.com/a/chromium.org/g/blink-dev/c/bqHGZYHWxnQ)
for more information.

### Behavior Changed: file descriptors for files inside ASAR archives are only usable through `fs`

`fs.open`, `fs.openSync` and `fs.promises.open` on a file inside an ASAR archive
used to extract the file to a temporary copy and return a descriptor for that
copy. They now return a descriptor that only identifies the entry to Node's
`fs` module, which reads directly out of the archive with no temporary file
(`fs.read`, `fs.readv`, `fs.fstat`, `fs.readFile(fd)`, `fs.createReadStream`
and the `FileHandle` methods). The descriptor itself is not backed by the
file's contents: code that reads the raw descriptor (a native addon,
`child_process` `stdio`, `net.Socket({ fd })`,
`http2stream.respondWithFile()` / `respondWithFD()`, a `FileHandle`
transferred to a worker, ...) fails with `EBADF` and is not supported.
Opening a file inside an archive with a flag that allows writing (`w`, `a`,
`r+`, ...) now fails with `EACCES` instead of silently writing to the
temporary copy, and `fs.fchmod`, `fs.fchown` and `fs.futimes` on these
descriptors fail with `EACCES`.

`fs.stat` on a symbolic link inside an archive now follows the link like it
does on a real filesystem (`fs.lstat` still describes the link itself).

### Behavior Changed: `window.open()` children of unsandboxed windows get their own sandboxed process

A `window.open()` child normally shares its opener's renderer process, and the OS sandbox
of a renderer process is fixed when it launches. Previously a child opened from an
unsandboxed (e.g. `nodeIntegration: true`) window silently ran in that unsandboxed process
even though `webContents.getLastWebPreferences()` reported `sandbox: true` for it.

Now the child's own web preferences decide the sandbox state, and when that state differs
from the opener's process the child is created in a new process with no opener
relationship: `window.open()` returns `null` in the opener and `window.opener` is `null`
in the child, matching the behavior of `window.open(url, '_blank', 'noopener')`. A
warning is logged to the opener's console when this happens.

Child windows default to sandboxed, so a child opened from an unsandboxed window is now
isolated in its own sandboxed process by default. To restore the previous behavior of
sharing the opener's unsandboxed process (and the scriptable `window.opener` / returned
`WindowProxy` that comes with it), opt in explicitly from
[`webContents.setWindowOpenHandler`](https://www.electronjs.org/docs/latest/api/web-contents#contentssetwindowopenhandlerhandler):

```js
win.webContents.setWindowOpenHandler(() => ({
  action: 'allow',
  overrideBrowserWindowOptions: {
    webPreferences: {
      // Match the (unsandboxed) opener so the child shares its process.
      sandbox: false
    }
  }
}))
```

Setting `nodeIntegration: true` in the override also makes the child unsandboxed and has
the same effect.

### Deprecated: `safeStorage.isEncryptionAvailable()`, `safeStorage.encryptString()` and `safeStorage.decryptString()`

The synchronous `safeStorage` methods are deprecated and will be removed in
Electron 46, following Chromium's removal of the synchronous OSCrypt backend
they are built on. Use the asynchronous methods instead, which use the same
per-platform key stores. Data encrypted with `safeStorage.encryptString()` can
be decrypted with `safeStorage.decryptStringAsync()`.

```js
// Deprecated
if (safeStorage.isEncryptionAvailable()) {
  const encrypted = safeStorage.encryptString('secret')
  const decrypted = safeStorage.decryptString(encrypted)
}

// Replace with
if (await safeStorage.isAsyncEncryptionAvailable()) {
  const encrypted = await safeStorage.encryptStringAsync('secret')
  const { result: decrypted } = await safeStorage.decryptStringAsync(encrypted)
}
```

## Notes

* Source: https://github.com/electron/electron/blob/v45.3.2/docs/breaking-changes.md, section "Breaking API Changes (45.0)" (tag v45.3.2). The tagged document has no "Planned Breaking API Changes" section.
* Entry categories follow the conventions in [Breaking Changes: conventions](./breaking-changes-overview.md); each `###` entry above is one official entry, in the official order.
* Three entries (workers created by subframes, preload scripts in DevTools extension frames, `getUserMedia` with `chromeMediaSource: 'desktop'`) state "This change was also backported to Electron 44.3.0, 43.7.0 and 42.11.3". The first two are also recorded in [Breaking API Changes (44.0)](./breaking-changes-v44.md).
* Affected API areas (for cross-reference): sandboxed preload scripts (`require`, `Buffer`, `ipcRenderer`; see the sandbox and context-isolation pages); `contentTracing` (`enableHeapProfiling()` removed, `nativeHeapProfiling` option, Perfetto protobuf); `session.setPermissionRequestHandler` / `desktopCapturer` / `getUserMedia` (`display-capture`); ASAR archives (`fs.open` descriptors); `window.open()` / `setWindowOpenHandler` sandboxing; `safeStorage` (synchronous methods deprecated, removal in 46); `enableBlinkFeatures` (`RequestStorageAccessFor`).

## Related

* [Breaking Changes: conventions](./breaking-changes-overview.md)
* [Breaking API Changes (44.0)](./breaking-changes-v44.md)
* [Breaking API Changes (43.0)](./breaking-changes-v43.md)
