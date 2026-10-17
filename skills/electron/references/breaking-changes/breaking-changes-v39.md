---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-390
---

# Breaking API Changes (39.0)

All breaking changes listed for Electron 39.0, verbatim from the official document.

## Breaking API Changes (39.0)

### Deprecated: `--host-rules` command line switch

Chromium is deprecating the `--host-rules` switch.

You should use `--host-resolver-rules` instead.

### Behavior Changed: window.open popups are always resizable

Per current [WHATWG spec](https://html.spec.whatwg.org/multipage/nav-history-apis.html#dom-open-dev), the `window.open` API will now always create a resizable popup window.

To restore previous behavior:

```js
webContents.setWindowOpenHandler((details) => {
  return {
    action: 'allow',
    overrideBrowserWindowOptions: {
      resizable: details.features.includes('resizable=yes')
    }
  }
})
```

### Behavior Changed: `NSAudioCaptureUsageDescription` should be included in your app's Info.plist file to use `desktopCapturer` (🍏 macOS ≥14.2)

Per [Chromium update](https://source.chromium.org/chromium/chromium/src/+/ad17e8f8b93d5f34891b06085d373a668918255e) which enables Apple's newer [CoreAudio Tap API](https://developer.apple.com/documentation/CoreAudio/capturing-system-audio-with-core-audio-taps#Configure-the-sample-code-project) by default, you now must have `NSAudioCaptureUsageDescription` defined in your `Info.plist` to use `desktopCapturer`.

Electron's `desktopCapturer` will create a dead audio stream if the new permission is absent however no errors or warnings will occur. This is partially a side-effect of Chromium not falling back to the older `Screen & System Audio Recording` permissions system if the new system fails.

To restore previous behavior:

```js
// main.js (right beneath your require/import statments)
app.commandLine.appendSwitch('disable-features', 'MacCatapLoopbackAudioForScreenShare')
```

### Behavior Changed: shared texture OSR `paint` event data structure

When using shared texture offscreen rendering feature, the `paint` event now emits a more structured object.
It moves the `sharedTextureHandle`, `planes`, `modifier` into a unified `handle` property.
See the [OffscreenSharedTexture](https://www.electronjs.org/docs/latest/api/structures/offscreen-shared-texture) API structure for more details.

## Notes

- Affected API areas: command line switches (`--host-rules` deprecated, use `--host-resolver-rules`); `window.open` / `setWindowOpenHandler`; `desktopCapturer` (macOS 14.2+ `Info.plist` key); offscreen rendering shared texture `paint` event (`OffscreenSharedTexture`).

## Related

- [Breaking API Changes (41.0, 40.0)](./breaking-changes-v41-v40.md)
- [Breaking API Changes (38.0)](./breaking-changes-v38.md)
