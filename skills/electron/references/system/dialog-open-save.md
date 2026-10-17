---
source: https://www.electronjs.org/docs/latest/api/dialog
---

# dialog: showOpenDialog / showSaveDialog

Display native system dialogs for opening and saving files, alerting, etc. Process: Main. This page covers the open and save dialogs and the `FileFilter` structure; message boxes, error boxes and certificate dialogs are in the companion page.

## Signature / Usage

```js
const { dialog } = require('electron')

console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

### Methods

#### `dialog.showOpenDialogSync([window, ]options)`

* `window` BaseWindow (optional)
* `options` Object
  * `title` string (optional)
  * `defaultPath` string (optional) - Absolute directory path, absolute file path, or file name to use by default. If not provided, the dialog will default to the user's Downloads folder, or their home directory if Downloads doesn't exist.
  * `buttonLabel` string (optional) - Custom label for the confirmation button, when left empty the default label will be used.
  * `filters` FileFilter[] (optional)
  * `properties` string[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Allow files to be selected.
    * `openDirectory` - Allow directories to be selected.
    * `multiSelections` - Allow multiple paths to be selected.
    * `showHiddenFiles` _macOS_ _Windows_ - Show hidden files in dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. This does not actually create the file at the path but allows non-existent paths to be returned that should be created by the application.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` string (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` boolean (optional) _macOS_ _mas_ - Create security scoped bookmarks when packaged for the Mac App Store.

Returns `string[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

The `window` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. For example:

```json5
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

The `extensions` array should contain extensions without wildcards or dots (e.g. `'png'` is good but `'.png'` and `'*.png'` are bad). To show all files, use the `'*'` wildcard (no other wildcard is supported).

> [!NOTE]
> On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

> [!NOTE]
> On Linux `defaultPath` is not supported when using portal file chooser dialogs unless the portal backend is version 4 or higher. You can use `--xdg-portal-required-version` command-line switch to force gtk or kde dialogs.

#### `dialog.showOpenDialog([window, ]options)`

Takes the same `window` and `options` as `dialog.showOpenDialogSync`.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` boolean - whether or not the dialog was canceled.
* `filePaths` string[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` string[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated. (For return values, see the Bookmarks array table in the companion page.)

```js
dialog
  .showOpenDialog(mainWindow, {
    properties: ['openFile', 'openDirectory']
  })
  .then((result) => {
    console.log(result.canceled)
    console.log(result.filePaths)
  })
  .catch((err) => {
    console.log(err)
  })
```

#### `dialog.showSaveDialogSync([window, ]options)`

* `window` BaseWindow (optional)
* `options` Object
  * `title` string (optional) - The dialog title. Cannot be displayed on some _Linux_ desktop environments.
  * `defaultPath` string (optional) - Absolute directory path, absolute file path, or file name to use by default. If not provided, the dialog will default to the user's Downloads folder, or their home directory if Downloads doesn't exist.
  * `buttonLabel` string (optional) - Custom label for the confirmation button, when left empty the default label will be used.
  * `filters` FileFilter[] (optional)
  * `message` string (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` string (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` string[] (optional)
    * `showHiddenFiles` _macOS_ _Windows_ - Show hidden files in dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` boolean (optional) _macOS_ _mas_ - Create a security scoped bookmark when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `string`, the path of the file chosen by the user; if the dialog is cancelled it returns an empty string.

The `window` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

#### `dialog.showSaveDialog([window, ]options)`

Takes the same `window` and `options` as `dialog.showSaveDialogSync`.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` boolean - whether or not the dialog was canceled.
* `filePath` string - If the dialog is canceled, this will be an empty string.
* `bookmark` string (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

> [!NOTE]
> On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### FileFilter Object

* `name` string
* `extensions` string[]

## Options / Props

Common `options` of `showOpenDialog` / `showOpenDialogSync` (full list per method above):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string (optional) | — | Dialog title. |
| defaultPath | string (optional) | Downloads folder, or home directory if Downloads doesn't exist | Absolute directory path, absolute file path, or file name to use by default. |
| buttonLabel | string (optional) | — | Custom label for the confirmation button, when left empty the default label will be used. |
| filters | FileFilter[] (optional) | — | File type filters. |
| properties | string[] (optional) | — | Features the dialog should use: `openFile`, `openDirectory`, `multiSelections`, `showHiddenFiles`, `createDirectory`, `promptToCreate`, `noResolveAliases`, `treatPackageAsDirectory`, `dontAddToRecent`. |
| message | string (optional) _macOS_ | — | Message to display above input boxes. |
| securityScopedBookmarks | boolean (optional) _macOS_ _mas_ | — | Create security scoped bookmarks when packaged for the Mac App Store. |

## Notes

* `dialog.showOpenDialog` and `dialog.showSaveDialog` returning a Promise instead of using a callback is a past breaking change (see the breaking-changes category, "API Changed: callback-based versions of promisified APIs").
* Distinction: this page documents OS-native file dialogs opened from the main process via Electron's `dialog` module. Web UI dialog/modal components belong to ark-ui / chakra-ui / fandhe-frontend; native counterparts on other platforms are in android-compose-components, windows-winui-controls and apple-appkit.

## Related

* [dialog: showMessageBox / showErrorBox / showCertificateTrustDialog / sheets](./dialog-message-box-certificate.md)
* [BaseWindow](../windows/base-window-overview.md)
