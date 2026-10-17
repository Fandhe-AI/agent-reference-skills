---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-350
---

# Breaking API Changes (35.0)

All breaking changes listed for Electron 35.0, verbatim from the official document.

## Breaking API Changes (35.0)

### Behavior Changed: Dialog API's `defaultPath` option on Linux

On Linux, the required portal version for file dialogs has been reverted
to 3 from 4. Using the `defaultPath` option of the Dialog API is not
supported when using portal file chooser dialogs unless the portal
backend is version 4 or higher. The `--xdg-portal-required-version`
[command-line switch](https://www.electronjs.org/docs/latest/api/command-line-switches#--xdg-portal-required-versionversion)
can be used to force a required version for your application.
See [#44426](https://github.com/electron/electron/pull/44426) for more details.

### Deprecated: `getFromVersionID` on `session.serviceWorkers`

The `session.serviceWorkers.fromVersionID(versionId)` API has been deprecated
in favor of `session.serviceWorkers.getInfoFromVersionID(versionId)`. This was
changed to make it more clear which object is returned with the introduction
of the `session.serviceWorkers.getWorkerFromVersionID(versionId)` API.

```js
// Deprecated
session.serviceWorkers.fromVersionID(versionId)

// Replace with
session.serviceWorkers.getInfoFromVersionID(versionId)
```

### Deprecated: `setPreloads`, `getPreloads` on `Session`

`registerPreloadScript`, `unregisterPreloadScript`, and `getPreloadScripts` are introduced as a
replacement for the deprecated methods. These new APIs allow third-party libraries to register
preload scripts without replacing existing scripts. Also, the new `type` option allows for
additional preload targets beyond `frame`.

```js
// Deprecated
session.setPreloads([path.join(__dirname, 'preload.js')])

// Replace with:
session.registerPreloadScript({
  type: 'frame',
  id: 'app-preload',
  filePath: path.join(__dirname, 'preload.js')
})
```

### Deprecated: `level`, `message`, `line`, and `sourceId` arguments in `console-message` event on `WebContents`

The `console-message` event on `WebContents` has been updated to provide details on the `Event`
argument.

```js
// Deprecated
webContents.on('console-message', (event, level, message, line, sourceId) => {})

// Replace with:
webContents.on('console-message', ({ level, message, lineNumber, sourceId, frame }) => {})
```

Additionally, `level` is now a string with possible values of `info`, `warning`, `error`, and `debug`.

### Behavior Changed: `urls` property of `WebRequestFilter`.

Previously, an empty urls array was interpreted as including all URLs. To explicitly include all URLs, developers should now use the `<all_urls>` pattern, which is a [designated URL pattern](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#all_urls) that matches every possible URL. This change clarifies the intent and ensures more predictable behavior.

```js
// Deprecated
const deprecatedFilter = {
  urls: []
}

// Replace with
const newFilter = {
  urls: ['<all_urls>']
}
```

### Deprecated: `systemPreferences.isAeroGlassEnabled()`

The `systemPreferences.isAeroGlassEnabled()` function has been deprecated without replacement.
It has been always returning `true` since Electron 23, which only supports Windows 10+, where DWM composition can no longer be disabled.

https://learn.microsoft.com/en-us/windows/win32/dwm/composition-ovw#disabling-dwm-composition-windows7-and-earlier

## Notes

- Affected API areas: `dialog` `defaultPath` (Linux portal version; `--xdg-portal-required-version`); `session.serviceWorkers`; `Session.setPreloads` / `getPreloads` (replaced by `registerPreloadScript` / `unregisterPreloadScript` / `getPreloadScripts`); `WebContents` `console-message` event; `WebRequestFilter.urls`; `systemPreferences.isAeroGlassEnabled()` (removed in 36.0).
- The `dialog` entry concerns OS-native file dialogs from the Electron main process; Web UI dialog components are covered by ark-ui and chakra-ui.
- `WebRequestFilter` / `webRequest` entries concern Electron's request interception on its Chromium sessions, not server-side HTTP frameworks (fastify, hono).

## Related

- [Breaking API Changes (36.0)](./breaking-changes-v36.md)
- [Breaking API Changes (34.0, 33.0)](./breaking-changes-v34-v33.md)
