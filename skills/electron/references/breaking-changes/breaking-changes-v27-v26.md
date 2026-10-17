---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-270
---

# Breaking API Changes (27.0, 26.0)

All breaking changes listed for Electron 27.0 and 26.0, verbatim from the official document.

## Signature / Usage

From "Removed: `alternate-selected-control-text` value for `systemPreferences.getColor`" (27.0):

```js
// Removed
systemPreferences.getColor('alternate-selected-control-text')
// Replace with
systemPreferences.getColor('selected-content-background')
```

## Breaking API Changes (27.0)

### Removed: macOS 10.13 / 10.14 support

macOS 10.13 (High Sierra) and macOS 10.14 (Mojave) are no longer supported by [Chromium](https://chromium-review.googlesource.com/c/chromium/src/+/4629466).

Older versions of Electron will continue to run on these operating systems, but macOS 10.15 (Catalina)
or later will be required to run Electron v27.0.0 and higher.

### Deprecated: `ipcRenderer.sendTo()`

The `ipcRenderer.sendTo()` API has been deprecated. It should be replaced by setting up a [`MessageChannel`](https://www.electronjs.org/docs/latest/tutorial/message-ports#setting-up-a-messagechannel-between-two-renderers) between the renderers.

The `senderId` and `senderIsMainFrame` properties of `IpcRendererEvent` have been deprecated as well.

### Removed: color scheme events in `systemPreferences`

The following `systemPreferences` events have been removed:

- `inverted-color-scheme-changed`
- `high-contrast-color-scheme-changed`

Use the new `updated` event on the `nativeTheme` module instead.

```js
// Removed
systemPreferences.on('inverted-color-scheme-changed', () => {
  /* ... */
})
systemPreferences.on('high-contrast-color-scheme-changed', () => {
  /* ... */
})

// Replace with
nativeTheme.on('updated', () => {
  /* ... */
})
```

### Removed: Some `window.setVibrancy` options on macOS

The following vibrancy options have been removed:

- 'light'
- 'medium-light'
- 'dark'
- 'ultra-dark'
- 'appearance-based'

These were previously deprecated and have been removed by Apple in 10.15.

### Removed: `webContents.getPrinters`

The `webContents.getPrinters` method has been removed. Use
`webContents.getPrintersAsync` instead.

```js
const w = new BrowserWindow({ show: false })

// Removed
console.log(w.webContents.getPrinters())
// Replace with
w.webContents.getPrintersAsync().then((printers) => {
  console.log(printers)
})
```

### Removed: `systemPreferences.{get,set}AppLevelAppearance` and `systemPreferences.appLevelAppearance`

The `systemPreferences.getAppLevelAppearance` and `systemPreferences.setAppLevelAppearance`
methods have been removed, as well as the `systemPreferences.appLevelAppearance` property.
Use the `nativeTheme` module instead.

```js
// Removed
systemPreferences.getAppLevelAppearance()
// Replace with
nativeTheme.shouldUseDarkColors

// Removed
systemPreferences.appLevelAppearance
// Replace with
nativeTheme.shouldUseDarkColors

// Removed
systemPreferences.setAppLevelAppearance('dark')
// Replace with
nativeTheme.themeSource = 'dark'
```

### Removed: `alternate-selected-control-text` value for `systemPreferences.getColor`

The `alternate-selected-control-text` value for `systemPreferences.getColor`
has been removed. Use `selected-content-background` instead.

```js
// Removed
systemPreferences.getColor('alternate-selected-control-text')
// Replace with
systemPreferences.getColor('selected-content-background')
```

## Breaking API Changes (26.0)

### Deprecated: `webContents.getPrinters`

The `webContents.getPrinters` method has been deprecated. Use
`webContents.getPrintersAsync` instead.

```js
const w = new BrowserWindow({ show: false })

// Deprecated
console.log(w.webContents.getPrinters())
// Replace with
w.webContents.getPrintersAsync().then((printers) => {
  console.log(printers)
})
```

### Deprecated: `systemPreferences.{get,set}AppLevelAppearance` and `systemPreferences.appLevelAppearance`

The `systemPreferences.getAppLevelAppearance` and `systemPreferences.setAppLevelAppearance`
methods have been deprecated, as well as the `systemPreferences.appLevelAppearance` property.
Use the `nativeTheme` module instead.

```js
// Deprecated
systemPreferences.getAppLevelAppearance()
// Replace with
nativeTheme.shouldUseDarkColors

// Deprecated
systemPreferences.appLevelAppearance
// Replace with
nativeTheme.shouldUseDarkColors

// Deprecated
systemPreferences.setAppLevelAppearance('dark')
// Replace with
nativeTheme.themeSource = 'dark'
```

### Deprecated: `alternate-selected-control-text` value for `systemPreferences.getColor`

The `alternate-selected-control-text` value for `systemPreferences.getColor`
has been deprecated. Use `selected-content-background` instead.

```js
// Deprecated
systemPreferences.getColor('alternate-selected-control-text')
// Replace with
systemPreferences.getColor('selected-content-background')
```

## Notes

- Affected API areas: `ipcRenderer.sendTo()` (deprecated in 27.0, removed in 28.0); `systemPreferences` color scheme events and app-level appearance (moved to `nativeTheme`); `window.setVibrancy` options (macOS); `webContents.getPrinters` (replaced by `getPrintersAsync`); `systemPreferences.getColor`; macOS 10.13 / 10.14 support.
- Vibrancy / appearance entries concern Electron's macOS options; native macOS UI APIs are covered by apple-appkit.

## Related

- [Breaking API Changes (28.0)](./breaking-changes-v28.md)
- [Breaking API Changes (25.0 - 23.0)](./breaking-changes-v25-v23.md)
