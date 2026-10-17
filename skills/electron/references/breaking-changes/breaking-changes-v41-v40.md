---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-410
---

# Breaking API Changes (41.0, 40.0)

All breaking changes listed for Electron 41.0 and 40.0, verbatim from the official document.

## Signature / Usage

```js
const path = require('node:path')

let lastUsedPath
const result = await dialog.showOpenDialog({
  defaultPath: lastUsedPath
})

if (!result.canceled && result.filePaths.length > 0) {
  lastUsedPath = path.dirname(result.filePaths[0])
}
```

## Breaking API Changes (41.0)

### Behavior Changed: PDFs no longer create a separate WebContents

Previously, PDF resources created a separate guest [WebContents](https://www.electronjs.org/docs/latest/api/web-contents) for rendering. Now, PDFs are rendered within the same WebContents instead. If you have code to detect PDF resources, use the [frame tree](https://www.electronjs.org/docs/latest/api/web-frame-main) instead of WebContents.

Under the hood, Chromium [enabled](https://chromium-review.googlesource.com/c/chromium/src/+/7239572) a feature that changes PDFs to use out-of-process iframes (OOPIFs) instead of the `MimeHandlerViewGuest` extension.

### Behavior Changed: Updated Cookie Change Cause in the Cookie 'changed' Event

We have updated the [cookie](https://www.electronjs.org/docs/latest/api/cookies#event-changed) change cause in the cookie 'changed' event.
When a new cookie is set, the change cause is `inserted`.
When a cookie is deleted, the change cause remains `explicit`.
When the cookie being set is identical to an existing one (same name, domain, path, and value, with no actual changes), the change cause is `inserted-no-change-overwrite`.
When the value of the cookie being set remains unchanged but some of its attributes are updated, such as the expiration attribute, the change cause will be `inserted-no-value-change-overwrite`.

### Deprecated: `showHiddenFiles` in Dialogs on Linux

This property will still be honored on macOS and Windows, but support on Linux
will be removed in a future version of Electron. GTK intends for this to be a user choice rather
than an app choice and has removed the API to do this programmatically.

## Breaking API Changes (40.0)

### Deprecated: `clipboard` API access from renderer processes

Using the `clipboard` API directly in the renderer process is deprecated.
If you want to call this API from a renderer process, place the API call in
your preload script and expose it using the [contextBridge](https://www.electronjs.org/docs/latest/api/context-bridge) API.

### Behavior Changed: MacOS dSYM files now compressed with tar.xz

Debug symbols for MacOS (dSYM) now use xz compression in order to handle larger file sizes. `dsym.zip` files are now
`dsym.tar.xz` files. End users using debug symbols may need to update their zip utilities.

## Notes

- The 41.0 / 40.0 sections of the source contain no fenced code. The snippet under Signature / Usage is quoted from the 43.0 section (https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-430), which deals with the same `dialog` API.
- The 40.0 `clipboard` renderer deprecation was followed by removal in 44.0 (renderers should use `navigator.clipboard`, or expose helpers from a preload script via `contextBridge`).
- Affected API areas: WebContents / WebFrameMain (PDF rendering); cookies `changed` event (`inserted`, `explicit`, `inserted-no-change-overwrite`, `inserted-no-value-change-overwrite`); `dialog` `showHiddenFiles` (Linux; removed in 43.0); `clipboard` in renderer (removed in 44.0).
- The `cookies` entry concerns the `Session.cookies` API of Electron's Chromium sessions; authentication session/cookie handling for apps (including its Electron integration) is covered by better-auth.
- The `clipboard` and `dialog` entries concern Electron's main/preload OS APIs; Web UI components are covered by ark-ui and chakra-ui.

## Related

- [Breaking API Changes (42.0)](./breaking-changes-v42.md)
- [Breaking API Changes (44.0)](./breaking-changes-v44.md)
- [Breaking API Changes (43.0)](./breaking-changes-v43.md)
