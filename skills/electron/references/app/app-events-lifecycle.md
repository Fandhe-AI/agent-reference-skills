---
source: https://www.electronjs.org/docs/latest/api/app
---

# app Events: lifecycle and macOS

Control your application's event lifecycle. Process: Main. This page covers the lifecycle events and the macOS-specific activation / Handoff events of `app`.

## Signature / Usage

```js
const { app } = require('electron')

app.on('window-all-closed', () => {
  app.quit()
})
```

## Options / Props

| Name | Arguments | Returns | Description |
| --- | --- | --- | --- |
| Event: `'will-finish-launching'` | — | — | Emitted when the application has finished basic startup. On Windows and Linux, the `will-finish-launching` event is the same as the `ready` event; on macOS, this event represents the `applicationWillFinishLaunching` notification of `NSApplication`. In most cases, you should do everything in the `ready` event handler. |
| Event: `'ready'` | `event` Event<br>`launchInfo` Record\<string, any\> \| NotificationResponse _macOS_ | — | Emitted once, when Electron has finished initializing. On macOS, `launchInfo` holds the `userInfo` of the `NSUserNotification` or information from `UNNotificationResponse` that was used to open the application, if it was launched from Notification Center. You can also call `app.isReady()` to check if this event has already fired and `app.whenReady()` to get a Promise that is fulfilled when Electron is initialized. See Notes. |
| Event: `'window-all-closed'` | — | — | Emitted when all windows have been closed. If you do not subscribe to this event and all windows are closed, the default behavior is to quit the app; however, if you subscribe, you control whether the app quits or not. If the user pressed `Cmd + Q`, or the developer called `app.quit()`, Electron will first try to close all the windows and then emit the `will-quit` event, and in this case the `window-all-closed` event would not be emitted. |
| Event: `'before-quit'` | `event` Event | — | Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application. See Notes. |
| Event: `'will-quit'` | `event` Event | — | Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application. See the description of the `window-all-closed` event for the differences between the `will-quit` and `window-all-closed` events. On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout. |
| Event: `'quit'` | `event` Event<br>`exitCode` Integer | — | Emitted when the application is quitting. On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout. |
| Event: `'open-file'` _macOS_ | `event` Event<br>`path` string | — | Emitted when the user wants to open a file with the application. The `open-file` event is usually emitted when the application is already open and the OS wants to reuse the application to open the file. `open-file` is also emitted when a file is dropped onto the dock and the application is not yet running. Make sure to listen for the `open-file` event very early in your application startup to handle this case (even before the `ready` event is emitted). You should call `event.preventDefault()` if you want to handle this event. On Windows, you have to parse `process.argv` (in the main process) to get the filepath. |
| Event: `'open-url'` _macOS_ | `event` Event<br>`url` string | — | Emitted when the user wants to open a URL with the application. Your application's `Info.plist` file must define the URL scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`. As with the `open-file` event, be sure to register a listener for the `open-url` event early in your application startup to detect if the application is being opened to handle a URL. If you register the listener in response to a `ready` event, you'll miss URLs that trigger the launch of your application. |
| Event: `'activate'` _macOS_ | `event` Event<br>`hasVisibleWindows` boolean | — | Emitted when the application is activated. Various actions can trigger this event, such as launching the application for the first time, attempting to re-launch the application when it's already running, or clicking on the application's dock or taskbar icon. |
| Event: `'did-become-active'` _macOS_ | `event` Event | — | Emitted when the application becomes active. This differs from the `activate` event in that `did-become-active` is emitted every time the app becomes active, not only when Dock icon is clicked or application is re-launched. It is also emitted when a user switches to the app via the macOS App Switcher. |
| Event: `'did-resign-active'` _macOS_ | `event` Event | — | Emitted when the app is no longer active and doesn't have focus. This can be triggered, for example, by clicking on another application or by using the macOS App Switcher to switch to another application. |
| Event: `'continue-activity'` _macOS_ | `event` Event<br>`type` string - A string identifying the activity. Maps to `NSUserActivity.activityType`.<br>`userInfo` unknown - Contains app-specific state stored by the activity on another device.<br>`details` Object<br>`details.webpageURL` string (optional) - A string identifying the URL of the webpage accessed by the activity on another device, if available. | — | Emitted during Handoff when an activity from a different device wants to be resumed. You should call `event.preventDefault()` if you want to handle this event. See Notes. |
| Event: `'will-continue-activity'` _macOS_ | `event` Event<br>`type` string - A string identifying the activity. Maps to `NSUserActivity.activityType`. | — | Emitted during Handoff before an activity from a different device wants to be resumed. You should call `event.preventDefault()` if you want to handle this event. |
| Event: `'continue-activity-error'` _macOS_ | `event` Event<br>`type` string - A string identifying the activity. Maps to `NSUserActivity.activityType`.<br>`error` string - A string with the error's localized description. | — | Emitted during Handoff when an activity from a different device fails to be resumed. |
| Event: `'activity-was-continued'` _macOS_ | `event` Event<br>`type` string - A string identifying the activity. Maps to `NSUserActivity.activityType`.<br>`userInfo` unknown - Contains app-specific state stored by the activity. | — | Emitted during Handoff after an activity from this device was successfully resumed on another one. |
| Event: `'update-activity-state'` _macOS_ | `event` Event<br>`type` string - A string identifying the activity. Maps to `NSUserActivity.activityType`.<br>`userInfo` unknown - Contains app-specific state stored by the activity. | — | Emitted when Handoff is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActivity()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called. |
| Event: `'new-window-for-tab'` _macOS_ | `event` Event | — | Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`. You must create a window in this handler in order for macOS tabbing to work as expected. |

## Notes

* `ready`: the event is only fired after the main process has finished running the first tick of the event loop. If an Electron API needs to be called before the `ready` event, ensure that it is called synchronously in the top-level context of the main process.
* `before-quit`:
  * If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted _after_ emitting `close` event on all windows and closing them.
  * On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.
* `continue-activity`: a user activity can be continued only in an app that has the same developer Team ID as the activity's source app and that supports the activity's type. Supported activity types are specified in the app's `Info.plist` under the `NSUserActivityTypes` key.
* Electron `app` is the main-process application object (lifecycle, paths, OS integration), not a UI component. For NSApplication / UIApplication lifecycle in native apps see apple-appkit and apple-uikit; for Windows App SDK app lifecycle see windows-app-sdk.
* The `ready` `launchInfo` and Handoff events map to Apple's UserNotifications / `NSUserActivity` concepts; apple-app-services covers the native side.

## Related

* [app Events: windows, certificates, login, child processes](./app-events-windows-security.md)
* [app.quit / exit / relaunch / whenReady / focus](./app-lifecycle-methods.md)
* [app User Activity, AppUserModelId, Activation Policy, importCertificate](./app-user-activity-platform-ids.md)
