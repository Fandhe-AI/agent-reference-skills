---
source: https://www.electronjs.org/docs/latest/api/app#appaddrecentdocumentpath-macos-windows
---

# app Recent Documents and Default Protocol Client

Methods of `app` for the OS recent documents list and for registering the app as the default handler of a protocol (URI scheme). Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

const path = require('node:path')

const file = path.join(app.getPath('desktop'), 'foo.txt')
app.addRecentDocument(file)

const recents = app.getRecentDocuments()
console.log(recents) // ['/path/to/desktop/foo.txt'}
```

## Options / Props

| Name | Arguments | Returns | Description |
| --- | --- | --- | --- |
| `app.addRecentDocument(path)` _macOS_ _Windows_ | `path` string | void | Adds `path` to the recent documents list. This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu. |
| `app.clearRecentDocuments()` _macOS_ _Windows_ | — | void | Clears the recent documents list. |
| `app.getRecentDocuments()` _macOS_ _Windows_ | — | `string[]` | An array containing documents in the most recent documents list. |
| `app.setAsDefaultProtocolClient(protocol[, path, args])` | `protocol` string - The name of your protocol, without `://`. For example, if you want your app to handle `electron://` links, call this method with `electron` as the parameter.<br>`path` string (optional) _Windows_ - The path to the Electron executable. Defaults to `process.execPath`<br>`args` string[] (optional) _Windows_ - Arguments passed to the executable. Defaults to an empty array | `boolean` | Whether the call succeeded. Sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter. The API uses the Windows Registry and `LSSetDefaultHandlerForURLScheme` internally. |
| `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_ | `protocol` string - The name of your protocol, without `://`.<br>`path` string (optional) _Windows_ - Defaults to `process.execPath`<br>`args` string[] (optional) _Windows_ - Defaults to an empty array | `boolean` | Whether the call succeeded. This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler. |
| `app.isDefaultProtocolClient(protocol[, path, args])` | `protocol` string - The name of your protocol, without `://`.<br>`path` string (optional) _Windows_ - Defaults to `process.execPath`<br>`args` string[] (optional) _Windows_ - Defaults to an empty array | `boolean` | Whether the current executable is the default handler for a protocol (aka URI scheme). The API uses the Windows Registry and `LSCopyDefaultHandlerForURLScheme` internally. |
| `app.getApplicationNameForProtocol(url)` | `url` string - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`). | `string` | Name of the application handling the protocol, or an empty string if there is no handler. For instance, if Electron is the default handler of the URL, this could be `Electron` on Windows and Mac. However, don't rely on the precise format which is not guaranteed to remain unchanged. Expect a different format on Linux, possibly with a `.desktop` suffix. |
| `app.getApplicationInfoForProtocol(url)` | `url` string - a URL with the protocol name to check. Unlike the other methods in this family, this accepts an entire URL, including `://` at a minimum (e.g. `https://`). | `Promise<Object>` | Resolve with an object containing the following: `icon` NativeImage - the display icon of the app handling the protocol; `path` string - installation path of the app handling the protocol; `name` string - display name of the app handling the protocol. |

## Notes

* On macOS, you can only register protocols that have been added to your app's `info.plist`, which cannot be modified at runtime. However, you can change the file during build time via Electron Forge, Electron Packager, or by editing `info.plist` with a text editor. Refer to Apple's documentation (`CFBundleURLTypes`) for details.
* On macOS, `app.isDefaultProtocolClient` can be used to check whether the app has been registered as the default protocol handler; this can also be verified by checking `~/Library/Preferences/com.apple.LaunchServices.plist`.
* In a Windows Store environment (when packaged as an `appx`) `app.setAsDefaultProtocolClient` returns `true` for all calls but the registry key it sets won't be accessible by other applications. To register your Windows Store application as a default protocol handler you must declare the protocol in your manifest (`uap:Protocol`). See windows-packaging-publish for MSIX manifests.
* This is the OS-level URI scheme registration (deep links). The `protocol` module of Electron (custom schemes served inside the app) is a different API.

## Related

* [app Events: lifecycle and macOS](./app-events-lifecycle.md)
* [app Jump List, User Tasks and Single Instance Lock](./app-jump-list-single-instance.md)
