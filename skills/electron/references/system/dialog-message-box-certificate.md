---
source: https://www.electronjs.org/docs/latest/api/dialog#dialogshowmessageboxsyncwindow-options
---

# dialog: showMessageBox / showErrorBox / showCertificateTrustDialog / sheets

Message boxes, error boxes and certificate trust dialogs of the `dialog` module, plus the Bookmarks array table and macOS sheets. Process: Main.

## Signature / Usage

```js
const { dialog } = require('electron')

dialog.showErrorBox('Startup error', 'Could not read configuration')
```

### Methods

#### `dialog.showMessageBoxSync([window, ]options)`

* `window` BaseWindow (optional)
* `options` Object
  * `message` string - Content of the message box.
  * `type` string (optional) - Can be `none`, `info`, `error`, `question` or `warning`. On Windows, `question` displays the same icon as `info`, unless you set an icon using the `icon` option. On macOS, both `warning` and `error` display the same warning icon.
  * `buttons` string[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` string (optional) - Title of the message box, some platforms will not show it.
  * `detail` string (optional) - Extra information of the message.
  * `icon` (NativeImage | string) (optional)
  * `textWidth` Integer (optional) _macOS_ - Custom width of the text in the message box.
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` boolean (optional) - Normalize the keyboard access keys across platforms. Default is `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

The `window` argument allows the dialog to attach itself to a parent window, making it modal. If `window` is not shown dialog will not be attached to it. In such case it will be displayed as an independent window.

#### `dialog.showMessageBox([window, ]options)`

* `window` BaseWindow (optional)
* `options` Object
  * `message` string - Content of the message box.
  * `type` string (optional) - Can be `none`, `info`, `error`, `question` or `warning`. On Windows, `question` displays the same icon as `info`, unless you set an icon using the `icon` option. On macOS, both `warning` and `error` display the same warning icon.
  * `buttons` string[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `signal` AbortSignal (optional) - Pass an instance of AbortSignal to optionally close the message box, the message box will behave as if it was cancelled by the user. On macOS, `signal` does not work with message boxes that do not have a parent window, since those message boxes run synchronously due to platform limitations.
  * `title` string (optional) - Title of the message box, some platforms will not show it.
  * `detail` string (optional) - Extra information of the message.
  * `checkboxLabel` string (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` (NativeImage | string) (optional)
  * `textWidth` Integer (optional) _macOS_ - Custom width of the text in the message box.
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` boolean (optional) - Normalize the keyboard access keys across platforms. Default is `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:

* `response` number - The index of the clicked button.
* `checkboxChecked` boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box.

The `window` argument allows the dialog to attach itself to a parent window, making it modal.

#### `dialog.showErrorBox(title, content)`

* `title` string - The title to display in the error box.
* `content` string - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready` event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

#### `dialog.showCertificateTrustDialog([window, ]options)` _macOS_ _Windows_

* `window` BaseWindow (optional)
* `options` Object
  * `certificate` Certificate - The certificate to trust/import.
  * `message` string - The message to display to the user.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `window` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `window` argument is ignored since it is not possible to make this confirmation dialog modal.

### Bookmarks array

`showOpenDialog` and `showSaveDialog` resolve to an object with a `bookmarks` field. This field is an array of Base64 encoded strings that contain the security scoped bookmark data for the saved file. The `securityScopedBookmarks` option must be enabled for this to be present.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
|------------|---------------------------------|:-----------:|--------------------------------|
| macOS mas  | True                            |   Success   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Error    | `['']` (array of empty string) |
| macOS mas  | False                           |      NA     | `[]` (empty array)             |
| non mas    | any                             |      NA     | `[]` (empty array)             |

### Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a BaseWindow reference in the `window` parameter, or modals if no window is provided.

You can call `win.setSheetOffset(offsetY[, offsetX])` on the parent BaseWindow instance to change the offset from the window frame where sheets are attached.

## Options / Props

Main `options` of `dialog.showMessageBox` (see the method above for the full list):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| message | string | — | Content of the message box. |
| type | string (optional) | — | `none`, `info`, `error`, `question` or `warning`. |
| buttons | string[] (optional) | — | Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK". |
| defaultId | Integer (optional) | — | Index of the button selected by default when the message box opens. |
| signal | AbortSignal (optional) | — | Closes the message box as if cancelled by the user. |
| title | string (optional) | — | Title of the message box, some platforms will not show it. |
| detail | string (optional) | — | Extra information of the message. |
| checkboxLabel | string (optional) | — | If provided, the message box will include a checkbox with the given label. |
| checkboxChecked | boolean (optional) | `false` | Initial checked state of the checkbox. |
| cancelId | Integer (optional) | — | Index of the button used to cancel the dialog via `Esc`. |
| noLink | boolean (optional) | — | On Windows, set `true` to avoid command-link style buttons. |

## Notes

* The official dialog docs reference `BaseWindow.getCurrentWindow()` for sheet offsets, which does not exist on BaseWindow; use the instance method `win.setSheetOffset()` (see BaseWindow docs).
* `dialog.showMessageBox` returning a Promise instead of using a callback is a past breaking change; the `signal` and `textWidth` options were added in later releases.
* Distinction: these are OS-native message boxes created from the main process by Electron's `dialog` module. Web UI dialog/modal components belong to ark-ui / chakra-ui / fandhe-frontend; native counterparts on other platforms are in android-compose-components, windows-winui-controls and apple-appkit.

## Related

* [dialog: showOpenDialog / showSaveDialog](./dialog-open-save.md)
* [nativeImage](./native-image.md)
