---
source: https://www.electronjs.org/docs/latest/api/app#properties
---

# app Properties

Properties of the `app` object. Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

if (app.isPackaged) {
  // production
}
app.userAgentFallback = 'MyApp/1.0'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `app.accessibilitySupportEnabled` _macOS_ _Windows_ | boolean | `true` if Chromium's accessibility support is enabled. `true` if use of assistive technologies such as screen readers has been detected. Setting it to `true` manually enables the support. Disabled by default. |
| `app.applicationMenu` | `Menu \| null` | Returns the `Menu` if one has been set and `null` otherwise. Users can pass a `Menu` to set this property. |
| `app.badgeCount` _Linux_ _macOS_ | Integer | Badge count for the current app. Setting `0` hides the badge. A nonzero integer shows the count on the Dock icon on macOS, or on the launcher on Linux. |
| `app.commandLine` _Readonly_ | CommandLine | Object to read and manipulate the command line arguments that Chromium uses. |
| `app.dock` _macOS_ _Readonly_ | `Dock \| undefined` | `Dock` on macOS, `undefined` on all other platforms; allows actions on your app icon in the user's dock. |
| `app.isPackaged` _Readonly_ | boolean | `true` if the app is packaged, `false` otherwise. For many apps, can be used to distinguish development and production environments. |
| `app.toastActivatorCLSID` _Windows_ _Readonly_ | string | The app's Toast Activator CLSID. |
| `app.name` | string | The current application's name, which is the name in the application's `package.json` file. Usually `name` is a short lowercase name according to the npm modules spec. You should usually also specify a `productName` field, your application's full capitalized name, which will be preferred over `name` by Electron. |
| `app.userAgentFallback` | string | The user agent string Electron will use as a global fallback. Used when no user agent is set at the `webContents` or `session` level. Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used. |
| `app.runningUnderARM64Translation` _Readonly_ _macOS_ _Windows_ | boolean | `true` when the app is currently running under an ARM64 translator (like the macOS Rosetta Translator Environment or Windows WOW). Use it to prompt users to download the arm64 version when they are mistakenly running the x64 version under Rosetta or WOW. |

## Notes

* `app.accessibilitySupportEnabled` must be used after the `ready` event is emitted. Rendering the accessibility tree can significantly affect the performance of your app; it should not be enabled by default.
* On macOS, your application needs permission to display notifications for `app.badgeCount` to take effect.

## Related

* [app Login Items, Accessibility, About Panel, Sandbox, Proxy](./app-login-accessibility-misc.md)
* [app.getPath / setPath / getName / getLocale](./app-paths-name-locale.md)
