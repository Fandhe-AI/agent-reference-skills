---
source: https://www.electronjs.org/docs/latest/api/system-preferences
---

# systemPreferences

Get system preferences. Process: Main, Utility.

## Signature / Usage

```js
const { systemPreferences } = require('electron')

console.log(systemPreferences.getEffectiveAppearance())
```

### Events

#### Event: 'accent-color-changed' _Windows_ _Linux_

* `event` Event
* `newColor` string - The new RGBA color the user assigned to be their system accent color.

#### Event: 'color-changed' _Windows_

* `event` Event

### Methods

#### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

Returns `boolean` - Whether the Swipe between pages setting is on.

#### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS_

* `event` string
* `userInfo` Record<string, any>
* `deliverImmediately` boolean (optional) - `true` to post notifications immediately even when the subscribing app is inactive.

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

#### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` string
* `userInfo` Record<string, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

#### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` string
* `userInfo` Record<string, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

#### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` string | null
* `callback` Function
  * `event` string
  * `userInfo` Record<string, unknown>
  * `object` string

Returns `number` - The ID of this subscription

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification. The `object` is the sender of the notification, and only supports `NSString` values for now.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

If `event` is null, the `NSDistributedNotificationCenter` doesn't use it as criteria for delivery to the observer.

#### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` string | null
* `callback` Function
  * `event` string
  * `userInfo` Record<string, unknown>
  * `object` string

Returns `number` - The ID of this subscription

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

If `event` is null, the `NSNotificationCenter` doesn't use it as criteria for delivery to the observer.

#### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` string | null
* `callback` Function
  * `event` string
  * `userInfo` Record<string, unknown>
  * `object` string

Returns `number` - The ID of this subscription

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

If `event` is null, the `NSWorkspaceNotificationCenter` doesn't use it as criteria for delivery to the observer.

#### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Removes the subscriber with `id`.

#### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

#### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

#### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<string, string | boolean | number> - a dictionary of (`key: value`) user defaults

Add the specified defaults to your application's `NSUserDefaults`.

#### `systemPreferences.getUserDefault<Type extends keyof UserDefaultTypes>(key, type)` _macOS_

* `key` string
* `type` Type - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Returns `UserDefaultTypes[Type]` - The value of `key` in `NSUserDefaults`.

Some popular `key` and `type`s are:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

#### `systemPreferences.setUserDefault<Type extends keyof UserDefaultTypes>(key, type, value)` _macOS_

* `key` string
* `type` Type - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.
* `value` UserDefaultTypes[Type]

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

#### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` string

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

#### `systemPreferences.getAccentColor()`

Returns `string` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

#### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` string - One of the following values:
  * On **Windows**: `3d-dark-shadow` (dark shadow for three-dimensional display elements), `3d-face` (face color for three-dimensional display elements and for dialog box backgrounds), `3d-highlight`, `3d-light`, `3d-shadow`, `active-border`, `active-caption` (active window title bar; left side color in the gradient if enabled), `active-caption-gradient` (right side color), `app-workspace` (background color of MDI applications), `button-text`, `caption-text`, `desktop`, `disabled-text`, `highlight` (item(s) selected in a control), `highlight-text`, `hotlight` (color for a hyperlink or hot-tracked item), `inactive-border`, `inactive-caption`, `inactive-caption-gradient`, `inactive-caption-text`, `info-background` (tooltip background), `info-text` (tooltip text), `menu`, `menu-highlight`, `menubar`, `menu-text`, `scrollbar`, `window`, `window-frame`, `window-text`.
  * On **macOS**: `control-background` (background of a large interface element, such as a browser or table), `control`, `control-text` (text of a control that isn't disabled), `disabled-control-text`, `find-highlight` (color of a find indicator), `grid`, `header-text`, `highlight` (the virtual light source onscreen), `keyboard-focus-indicator`, `label`, `link`, `placeholder-text`, `quaternary-label`, `scrubber-textured-background` (background of a scrubber in the Touch Bar), `secondary-label`, `selected-content-background`, `selected-control`, `selected-control-text`, `selected-menu-item-text`, `selected-text-background`, `selected-text`, `separator`, `shadow`, `tertiary-label`, `text-background`, `text`, `under-page-background`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, `unemphasized-selected-text`, `window-background`, `window-frame-text`.

Returns `string` - The system color setting in RGBA hexadecimal form (`#RRGGBBAA`). See the Windows `GetSysColor` docs and the macOS dynamic system colors docs for more details.

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

#### `systemPreferences.getSystemColor(color)` _macOS_

* `color` string - One of the following values: `blue`, `brown`, `gray`, `green`, `orange`, `pink`, `purple`, `red`, `yellow`.

Returns `string` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'.

#### `systemPreferences.getEffectiveAppearance()` _macOS_

Returns `string` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to NSApplication.effectiveAppearance

#### `systemPreferences.canPromptTouchID()` _macOS_

Returns `boolean` - whether or not this device has the ability to use Touch ID.

#### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` string - The reason you are asking for Touch ID authentication

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```js
const { systemPreferences } = require('electron')

systemPreferences
  .promptTouchID('To get consent for a Security-Gated Thing')
  .then((success) => {
    console.log('You have successfully authenticated with Touch ID!')
  })
  .catch((err) => {
    console.log(err)
  })
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set Access Control Constants like `kSecAccessControlUserPresence` on their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with `node-keytar`, such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

#### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` boolean - whether or not the user will be informed via prompt if the current process is untrusted.

Returns `boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

#### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` string - Can be `microphone`, `camera` or `screen`.

Returns `string` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

Windows 10 has a global setting controlling `microphone` and `camera` access for all win32 applications. It will always return `granted` for `screen` and for all media types on older versions of Windows.

#### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` string - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you must set the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See Electron Application Distribution (Rebranding with downloaded binaries) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra.

#### `systemPreferences.getAnimationSettings()`

Returns `Object`:

* `shouldRenderRichAnimation` boolean - Returns true if rich animations should be rendered. Looks at session type (e.g. remote desktop) and accessibility settings to give guidance for heavy animations.
* `scrollAnimationsEnabledBySystem` boolean - Determines on a per-platform basis whether scroll animations (e.g. produced by home/end key) should be enabled.
* `prefersReducedMotion` boolean - Determines whether the user desires reduced motion based on platform APIs.

Returns an object with system animation settings.

### Properties

#### `systemPreferences.accessibilityDisplayShouldReduceTransparency` _macOS_ _Deprecated_

A `boolean` property which determines whether the app avoids using semitransparent backgrounds. This maps to NSWorkspace.accessibilityDisplayShouldReduceTransparency

**Deprecated:** Use the new `nativeTheme.prefersReducedTransparency` API.

#### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

A `string` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to NSApplication.effectiveAppearance

### UserDefaultTypes Object

Helper alias for `getUserDefault` / `setUserDefault`; no object will ever exist of this type.

| Key | Type |
|-----|------|
| string | string |
| boolean | boolean |
| integer | number |
| float | number |
| double | number |
| url | string |
| array | Array<unknown> |
| dictionary | Record<string, unknown> |

## Notes

* Structure page: https://www.electronjs.org/docs/latest/api/structures/user-default-types
* `systemPreferences.postNotification` / `subscribeNotification` operate on macOS `NSDistributedNotificationCenter` and are unrelated to the `Notification` class (OS desktop notifications). For UserNotifications / APNs see apple-app-services; for AppKit see apple-appkit.

## Related

* [nativeTheme](./native-theme.md)
* [desktopCapturer](./desktop-capturer.md)
