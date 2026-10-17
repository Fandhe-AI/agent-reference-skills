---
source: https://www.electronjs.org/docs/latest/api/shell
---

# shell

Manage files and URLs using their default applications. Process: Main, Renderer (non-sandboxed only).

The `shell` module provides functions related to desktop integration.

> [!WARNING]
> While the `shell` module can be used in the renderer process, it will not function in a sandboxed renderer.

## Signature / Usage

```js
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## Methods

### `shell.showItemInFolder(fullPath)`

* `fullPath` string

Show the given file in a file manager. If possible, select the file.

### `shell.openPath(path)`

* `path` string

Returns `Promise<string>` - Resolves with a string containing the error message corresponding to the failure if a failure occurred, otherwise "".

Open the given file in the desktop's default manner.

### `shell.openExternal(url[, options])`

* `url` string - Max 2081 characters on Windows.
* `options` Object (optional)
  * `activate` boolean (optional) _macOS_ - `true` to bring the opened application to the foreground. The default is `true`.
  * `workingDirectory` string (optional) _Windows_ - The working directory.
  * `logUsage` boolean (optional) _Windows_ - Indicates a user initiated launch that enables tracking of frequently used programs and other behaviors. The default is `false`.

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.trashItem(path)`

* `path` string - path to the item to be moved to the trash.

Returns `Promise<void>` - Resolves when the operation has been completed. Rejects if there was an error while deleting the requested item.

This moves a path to the OS-specific trash location (Trash on macOS, Recycle Bin on Windows, and a desktop-environment-specific location on Linux).

The path must use the default path separator for the platform (backslash on Windows). Use `path.resolve()` from the `node:path` module to ensure correct handling on all filesystems.

### `shell.beep()`

Play the beep sound.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` string
* `operation` string (optional) - Default is `create`, can be one of following:
  * `create` - Creates a new shortcut, overwriting if necessary.
  * `update` - Updates specified properties only on an existing shortcut.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` ShortcutDetails

Returns `boolean` - Whether the shortcut was created successfully.

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` string

Returns `ShortcutDetails`

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.

## ShortcutDetails Object

| Name | Type | Description |
|------|------|-------------|
| target | string | The target to launch from this shortcut. |
| cwd | string (optional) | The working directory. Default is empty. |
| args | string (optional) | The arguments to be applied to `target` when launching from this shortcut. Default is empty. |
| description | string (optional) | The description of the shortcut. Default is empty. |
| icon | string (optional) | The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon. |
| iconIndex | number (optional) | The resource ID of icon when `icon` is a DLL or EXE. Default is 0. |
| appUserModelId | string (optional) | The Application User Model ID. Default is empty. |
| toastActivatorClsid | string (optional) | The Application Toast Activator CLSID. Needed for participating in Action Center. |

## Notes

* `shell.openPath` replaces the former `shell.openItem`; `shell.trashItem` replaces the deprecated `shell.moveItemToTrash` (see the breaking-changes category).
* Structure page: https://www.electronjs.org/docs/latest/api/structures/shortcut-details
* Distinction: `shell.writeShortcutLink` / `readShortcutLink` handle Windows `.lnk` shortcuts from Electron; Windows shell/taskbar integration beyond this is in windows-platform-integration.

## Related

* [Notification: constructor and static methods](./notification-class-static.md)
