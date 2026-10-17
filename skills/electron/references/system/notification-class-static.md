---
source: https://www.electronjs.org/docs/latest/api/notification
---

# Notification: constructor and static methods

Create OS desktop notifications. Process: Main. `Notification` is an EventEmitter. This page covers the constructor options and static methods; instance events, methods and properties are in the companion page.

## Signature / Usage

```js
const { Notification, app } = require('electron')

app.whenReady().then(() => {
  // Windows only: register handler for all notification activations
  if (process.platform === 'win32') {
    Notification.handleActivation((details) => {
      console.log('Notification activated:', details.type)
      if (details.type === 'reply') {
        console.log('User reply:', details.reply)
      } else if (details.type === 'action') {
        console.log('Action index:', details.actionIndex)
      }
    })
  }
})
```

> [!NOTE]
> If you want to show notifications from a renderer process you should use the web Notifications API (see the Notifications tutorial).

> [!NOTE]
> On MacOS, notifications use the UNNotification API as their underlying framework. This API requires an application to be code-signed in order for notifications to appear. Unsigned binaries will emit a `failed` event when notifications are called.

> [!WARNING]
> Electron's built-in classes cannot be subclassed in user code.

### Static Methods

#### `Notification.isSupported()`

Returns `boolean` - Whether or not desktop notifications are supported on the current system

#### `Notification.handleActivation(callback)` _Windows_

* `callback` Function
  * `details` ActivationArguments - Details about the notification activation.

Registers a callback to handle all notification activations. The callback is invoked whenever a notification is clicked, replied to, or has an action button pressed - regardless of whether the original `Notification` object is still in memory.

This method handles timing automatically:

* If an activation already occurred before calling this method, the callback is invoked immediately with those details.
* For all subsequent activations, the callback is invoked when they occur.

The callback remains registered until replaced by another call to `handleActivation`.

This provides a centralized way to handle notification interactions that works in all scenarios:

* Cold start (app launched from notification click)
* Notifications persisted in AC that have no in-memory representation after app re-start
* Notification object was garbage collected
* Notification object is still in memory (callback is invoked in addition to instance events)

#### `Notification.getHistory()` _macOS_

Returns `Promise<Notification[]>` - Resolves with an array of `Notification` objects representing all delivered notifications still present in Notification Center.

Each returned `Notification` is a live object connected to the corresponding delivered notification. Interaction events (`click`, `reply`, `action`, `close`) will fire on these objects when the user interacts with the notification in Notification Center. This is useful after an app restart to re-attach event handlers to notifications from a previous session.

The returned notifications have their `id`, `groupId`, `title`, `subtitle`, and `body` properties populated from information available in the Notification Center. Other properties (e.g., `actions`, `silent`, `icon`) are not available from delivered notifications and will have default values.

> [!NOTE]
> Like all macOS notification APIs, this method requires the application to be code-signed. In unsigned development builds, notifications are not delivered to Notification Center and this method will resolve with an empty array.

> [!NOTE]
> Unlike notifications created with `new Notification()`, notifications returned by `getHistory()` will remain visible in Notification Center when the object is garbage collected. Calling `show()` on a restored notification will remove the original from Notification Center and post a new one with the same properties.

```js
const { Notification, app } = require('electron')

app.whenReady().then(async () => {
  // Restore notifications from a previous session
  const notifications = await Notification.getHistory()
  for (const n of notifications) {
    console.log(`Found delivered notification: ${n.id} - ${n.title}`)
    n.on('click', () => {
      console.log(`User clicked: ${n.id}`)
    })
    n.on('reply', (event) => {
      console.log(`User replied to ${n.id}: ${event.reply}`)
    })
  }
  // Keep references so events continue to fire
})
```

#### `Notification.remove(id)` _macOS_

* `id` (string | string[]) - The notification identifier(s) to remove. These correspond to the `id` values set in the `Notification` constructor.

Removes one or more delivered notifications from Notification Center by their identifier(s).

```js
const { Notification } = require('electron')

// Remove a single notification
Notification.remove('my-notification-id')

// Remove multiple notifications
Notification.remove(['msg-1', 'msg-2', 'msg-3'])
```

#### `Notification.removeAll()` _macOS_

Removes all of the app's delivered notifications from Notification Center.

```js
const { Notification } = require('electron')

Notification.removeAll()
```

#### `Notification.removeGroup(groupId)` _macOS_

* `groupId` string - The group identifier of the notifications to remove. This corresponds to the `groupId` value set in the `Notification` constructor.

Removes all delivered notifications with the given `groupId` from Notification Center.

```js
const { Notification } = require('electron')

// Remove all notifications in the 'chat-thread-1' group
Notification.removeGroup('chat-thread-1')
```

## Options / Props

`new Notification([options])` - `options` Object (optional):

| Name | Type | Description |
|------|------|-------------|
| id | string (optional) _macOS_ _Windows_ | A unique identifier for the notification. On macOS, maps to `UNNotificationRequest`'s `identifier` property. On Windows, maps to the toast notification's `Tag` property. Defaults to a random UUID if not provided or if an empty string is passed. Use this identifier with `Notification.remove()` to remove specific delivered notifications, or with `Notification.getHistory()` to identify them. |
| groupId | string (optional) _macOS_ _Windows_ | A string identifier used to visually group notifications together in Notification Center / Action Center. On macOS, maps to `UNNotificationContent`'s `threadIdentifier` property. On Windows, maps to the toast notification's `Group` property. Use this identifier with `Notification.removeGroup()` to remove all notifications in a group. |
| groupTitle | string (optional) _Windows_ | A title for the notification group header. When both `groupId` and `groupTitle` are specified, Windows will display a header above the notification that groups related notifications together. Maps to the toast notification's `header` element. |
| title | string (optional) | A title for the notification, which will be displayed at the top of the notification window when it is shown. |
| subtitle | string (optional) _macOS_ | A subtitle for the notification, which will be displayed below the title. |
| body | string (optional) | The body text of the notification, which will be displayed below the title or subtitle. |
| silent | boolean (optional) | Whether or not to suppress the OS notification noise when showing the notification. |
| icon | string \| NativeImage (optional) | An icon to use in the notification. If a string is passed, it must be a valid path to a local icon file. |
| hasReply | boolean (optional) _macOS_ _Windows_ | Whether or not to add an inline reply option to the notification. |
| timeoutType | string (optional) _Linux_ _Windows_ | The timeout duration of the notification. Can be 'default' or 'never'. |
| replyPlaceholder | string (optional) _macOS_ _Windows_ | The placeholder to write in the inline reply input field. |
| sound | string (optional) _macOS_ | The name of the sound file to play when the notification is shown. |
| urgency | string (optional) _Linux_ _Windows_ | The urgency level of the notification. Can be 'normal', 'critical', or 'low'. |
| actions | NotificationAction[] (optional) | Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation. |
| closeButtonText | string (optional) _macOS_ | A custom title for the close button of an alert. An empty string will cause the default localized text to be used. |
| toastXml | string (optional) _Windows_ | A custom description of the Notification on Windows superseding all properties above. Provides full customization of design and behavior of the notification. |

## Notes

* On Windows, `urgency` type 'critical' sorts the notification higher in Action Center (above default priority notifications), but does not prevent auto-dismissal. To prevent auto-dismissal, you should also set `timeoutType` to 'never'.
* Distinction: this is Electron's main-process `Notification` class for OS desktop notifications. Platform notification frameworks (UserNotifications / APNs) are covered by apple-app-services, Android notifications by android-platform-core, and Windows App Notifications by windows-app-sdk.

## Related

* [Notification: instance events, methods, properties, sounds](./notification-events-methods.md)
* [pushNotifications](./push-notifications.md)
* [nativeImage](./native-image.md)
