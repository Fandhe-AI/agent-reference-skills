---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-430
---

# Breaking API Changes (43.0)

All breaking changes listed for Electron 43.0, verbatim from the official document.

## Signature / Usage

From "Behavior Changed: `NativeImage.toBitmap()` now normalizes color space" (43.0):

```js
const image = nativeImage.createFromPath('photo.png')
// New default: normalized to sRGB
const srgbBitmap = image.toBitmap()
// Convert to Display P3
const p3Bitmap = image.toBitmap({
  colorSpace: {
    primaries: 'p3',
    transfer: 'srgb',
    matrix: 'rgb',
    range: 'full'
  }
})
```

## Breaking API Changes (43.0)

### Behavior Changed: Rounded corners on Linux

Frameless windows default to rounded corners on Linux if the desktop environment supports client-side decorations. This can be configured using the existing `roundedCorners` option on `BrowserWindow`,
which is now supported on Linux and defaults to `true` on all platforms.

### Behavior Changed: WCO respects the native title bar layout on Linux

Frameless windows with Window Controls Overlay (WCO) now adopt the native title bar layout and user settings on Linux. For example, controls will appear on the left side of the frame on RTL systems, and only the close button will be visible by default on GNOME. Depending on the user's desktop environment and configuration, buttons can appear on the left or right side of the frame (or both). To account for all possibilities, use the CSS variables `env(titlebar-area-x, 0px)` and `env(titlebar-area-width, 100%)` to constrain your app's title bar content to a safe area.

### Behavior Changed: `NativeImage.toBitmap()` now normalizes color space

`NativeImage.toBitmap()` (and its deprecated alias `NativeImage.getBitmap()`) now normalizes pixel data to sRGB by default. Previously, raw pixel data was returned without color space conversion, which meant pixel values from images with different embedded color profiles (e.g., Display P3 on macOS) could differ for the same visual color.

To preserve the previous behavior, pass the image's original color space in the `colorSpace`
option. You can also pass `colorSpace` to convert to any other specific color space:

```js
const image = nativeImage.createFromPath('photo.png')
// New default: normalized to sRGB
const srgbBitmap = image.toBitmap()
// Convert to Display P3
const p3Bitmap = image.toBitmap({
  colorSpace: {
    primaries: 'p3',
    transfer: 'srgb',
    matrix: 'rgb',
    range: 'full'
  }
})
```

### Behavior Changed: `chrome.scripting` CSS injection matches more fallback frames

Extensions using `chrome.scripting.insertCSS()` or `chrome.scripting.removeCSS()`
now follow Chrome's behavior when Electron cannot match a frame's URL directly,
such as with `about:blank` or `data:` frames. If the extension has access to the
page that created the frame, CSS may now be inserted into or removed from those
fallback frames as well.

Apps or extensions that relied on Electron skipping those frames should narrow their
injection target, frame IDs, or match patterns.

### Behavior Changed: Dialog methods default to Downloads directory

The `defaultPath` option for the following methods now defaults to the user's Downloads folder (or their home directory if Downloads doesn't exist) when not explicitly provided:

- `dialog.showOpenDialog`
- `dialog.showOpenDialogSync`
- `dialog.showSaveDialog`
- `dialog.showSaveDialogSync`

Previously, when no `defaultPath` was provided, the underlying OS file dialog would determine the initial directory — typically remembering the last directory the user navigated to, or falling back to an OS-specific default. Now, Electron explicitly sets the initial directory to Downloads, which also means the OS will no longer track and restore the last-used directory between dialog invocations.

To preserve the old behavior, you can track the last-used directory yourself and pass it as `defaultPath`:

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

### Removed: `showHiddenFiles` in Dialogs on Linux

The `showHiddenFiles` property is no longer supported on Linux.
It continues to work on macOS and Windows. GTK intends for this feature
to be a user choice rather than an app choice, and has removed the API
to do this programmatically.

## Notes

- Affected API areas: `BrowserWindow` `roundedCorners` option; Window Controls Overlay (`titleBarOverlay`); `NativeImage.toBitmap()` / `getBitmap()`; Chrome extension support (`chrome.scripting`); `dialog.showOpenDialog` / `showOpenDialogSync` / `showSaveDialog` / `showSaveDialogSync`.
- The `dialog` entries concern OS-native file dialogs opened from the Electron main process. Web UI dialog components are covered by ark-ui and chakra-ui; native dialog APIs of other platforms by windows-winui-controls, apple-appkit and android-compose-components.
- Window frame / title bar entries concern Electron's `BrowserWindow`; native window APIs are covered by windows-winui-ui and apple-appkit.

## Related

- [Breaking API Changes (44.0)](./breaking-changes-v44.md)
- [Breaking API Changes (42.0)](./breaking-changes-v42.md)
- [Breaking API Changes (41.0, 40.0)](./breaking-changes-v41-v40.md)
