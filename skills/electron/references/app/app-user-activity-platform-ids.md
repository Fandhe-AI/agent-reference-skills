---
source: https://www.electronjs.org/docs/latest/api/app#appsetuseractivitytype-userinfo-webpageurl-macos
---

# app User Activity, AppUserModelId, Activation Policy, importCertificate

macOS Handoff user activity methods, Windows AppUserModelId / toast activator CLSID, macOS activation policy and Linux certificate import. Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

app.setActivationPolicy('accessory')
```

## Methods

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` string - Uniquely identifies the activity. Maps to `NSUserActivity.activityType`.
* `userInfo` any - App-specific state to store for use by another device.
* `webpageURL` string (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for Handoff to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Returns `string` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` _macOS_

Invalidates the current Handoff user activity.

### `app.resignCurrentActivity()` _macOS_

Marks the current Handoff user activity as inactive without invalidating it.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` string - Uniquely identifies the activity. Maps to `NSUserActivity.activityType`.
* `userInfo` any - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` _Windows_

* `id` string

Changes the Application User Model ID to `id`.

### `app.setToastActivatorCLSID(id)` _Windows_

* `id` string

Changes the Toast Activator CLSID to `id`. If one is not set via this method, it will be randomly generated for the app.

* The value must be a valid GUID/CLSID in one of the following forms:
  * Canonical brace-wrapped: `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}` (preferred)
  * Canonical without braces: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX` (braces will be added automatically)
* Hex digits are case-insensitive.

This method should be called early (before showing notifications) so the value is baked into the registration/shortcut. Supplying an empty string or an unparsable value throws and leaves the existing (or generated) CLSID unchanged. If this method is never called, a random CLSID is generated once per run and exposed via `app.toastActivatorCLSID`.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` string - Can be 'regular', 'accessory', or 'prohibited'.

Sets the activation policy for a given app. Activation policy types:

* 'regular' - The application is an ordinary app that appears in the Dock and may have a user interface.
* 'accessory' - The application doesn't appear in the Dock and doesn't have a menu bar, but it may be activated programmatically or by clicking on one of its windows.
* 'prohibited' - The application doesn't appear in the Dock and may not create windows or be activated.

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `certificate` string - Path for the pkcs12 file.
  * `password` string - Passphrase for the certificate.
* `callback` Function
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium `net_error_list`.

## Notes

* `NSUserActivity` / Handoff and AppUserModelId / toast activator are the OS concepts that Electron wraps. For the native Apple side see apple-appkit and apple-app-services; for Windows App Notifications see windows-app-sdk and windows-platform-integration.

## Related

* [app Events: lifecycle and macOS](./app-events-lifecycle.md)
* [app Properties](./app-properties.md)
