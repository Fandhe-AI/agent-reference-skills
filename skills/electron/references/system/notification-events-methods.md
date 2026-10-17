---
source: https://www.electronjs.org/docs/latest/api/notification#instance-events
---

# Notification: instance events, methods, properties, sounds

Instance events, methods and properties of objects created with `new Notification`, plus the `NotificationAction`, `NotificationResponse` and `ActivationArguments` structures. Process: Main.

## Signature / Usage

```js
const { Notification, app } = require('electron')

app.whenReady().then(() => {
  const n = new Notification({
    title: 'Send a Message',
    body: 'Body Text',
    hasReply: true,
    replyPlaceholder: 'Message text...'
  })

  n.on('reply', (e, reply) => console.log(`User replied: ${reply}`))
  n.on('click', () => console.log('Notification clicked'))

  n.show()
})
```

## Instance Events

Some events are only available on specific operating systems and are labeled as such.

### Event: 'show'

* `event` Event

Emitted when the notification is shown to the user. Note that this event can be fired multiple times as a notification can be shown multiple times through the `show()` method.

### Event: 'click'

* `event` Event

Emitted when the notification is clicked by the user.

### Event: 'close'

* `details` Event<>
  * `reason` _Windows_ string (optional) - The reason the notification was closed. This can be 'userCanceled', 'applicationHidden', or 'timedOut'.

Emitted when the notification is closed by manual intervention from the user.

This event is not guaranteed to be emitted in all cases where the notification is closed.

On Windows, the `close` event can be emitted in one of three ways: programmatic dismissal with `notification.close()`, by the user closing the notification, or via system timeout. If a notification is in the Action Center after the initial `close` event is emitted, a call to `notification.close()` will remove the notification from the action center but the `close` event will not be emitted again.

### Event: 'reply' _macOS_ _Windows_

* `details` Event<>
  * `reply` string - The string the user entered into the inline reply field.
* `reply` string _Deprecated_

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

### Event: 'action'

* `details` Event<>
  * `actionIndex` number - The index of the action that was activated.
  * `selectionIndex` number _Windows_ - The index of the selected item, if one was chosen. -1 if none was chosen.
* `actionIndex` number _Deprecated_
* `selectionIndex` number _Windows_ _Deprecated_

```js
const { Notification, app } = require('electron')

app.whenReady().then(() => {
  const items = ['One', 'Two', 'Three']
  const n = new Notification({
    title: 'Choose an Action!',
    actions: [
      { type: 'button', text: 'Action 1' },
      { type: 'button', text: 'Action 2' },
      { type: 'selection', text: 'Apply', items }
    ]
  })

  n.on('click', () => console.log('Notification clicked'))
  n.on('action', (e) => {
    console.log(`User triggered action at index: ${e.actionIndex}`)
    if (e.selectionIndex > -1) {
      console.log(`User chose selection item '${items[e.selectionIndex]}'`)
    }
  })

  n.show()
})
```

### Event: 'failed' _macOS_ _Windows_

* `event` Event
* `error` string - The error encountered during execution of the `show()` method.

Emitted when an error is encountered while creating and showing the native notification.

## Instance Methods

### `notification.show()`

Immediately shows the notification to the user. Unlike the web notification API, instantiating a `new Notification()` does not immediately show it to the user. Instead, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

On macOS, calling `show()` on a notification returned by `Notification.getHistory()` will remove the original notification from Notification Center and post a new one with the same properties.

### `notification.close()`

Dismisses the notification.

On Windows, calling `notification.close()` while the notification is visible on screen will dismiss the notification and remove it from the Action Center. If `notification.close()` is called after the notification is no longer visible on screen, calling `notification.close()` will try remove it from the Action Center.

```js
const { Notification, app } = require('electron')

app.whenReady().then(() => {
  const n = new Notification({
    title: 'Title!',
    subtitle: 'Subtitle!',
    body: 'Body!'
  })

  n.show()

  setTimeout(() => n.close(), 5000)
})
```

## Instance Properties

### `notification.id` _macOS_ _Windows_ _Readonly_

A `string` property representing the unique identifier of the notification. This is set at construction time — either from the `id` option or as a generated UUID if none was provided.

### `notification.groupId` _macOS_ _Windows_ _Readonly_

A `string` property representing the group identifier of the notification. Notifications with the same `groupId` will be visually grouped together in Notification Center (macOS) or Action Center (Windows).

### `notification.groupTitle` _Windows_ _Readonly_

A `string` property representing the title of the notification group header.

### `notification.title`

A `string` property representing the title of the notification.

### `notification.subtitle`

A `string` property representing the subtitle of the notification.

### `notification.body`

A `string` property representing the body of the notification.

### `notification.replyPlaceholder`

A `string` property representing the reply placeholder of the notification.

### `notification.sound`

A `string` property representing the sound of the notification.

### `notification.closeButtonText`

A `string` property representing the close button text of the notification.

### `notification.silent`

A `boolean` property representing whether the notification is silent.

### `notification.hasReply`

A `boolean` property representing whether the notification has a reply action.

### `notification.urgency` _Linux_

A `string` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Default is 'low' - see NotifyUrgency (GNOME notification spec, urgency levels) for more information.

### `notification.timeoutType` _Linux_ _Windows_

A `string` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

### `notification.actions`

A `NotificationAction[]` property representing the actions of the notification.

### `notification.toastXml` _Windows_

A `string` property representing the custom Toast XML of the notification.

## Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the `NSSound` docs (developer.apple.com/documentation/appkit/nssound) for more information.

## NotificationAction Object

* `type` string - The type of action, can be `button` or `selection`. `selection` is only supported on Windows.
* `text` string (optional) - The label for the given action.
* `items` string[] (optional) _Windows_ - The list of items for the `selection` action `type`.

| Action Type | Platform Support | Usage of `text` | Default `text` | Limitations |
|-------------|------------------|-----------------|----------------|-------------|
| `button`    | macOS, Windows, Linux | Used as the label for the button | "Show" on macOS (localized) if first `button`, otherwise empty; Windows uses provided `text`; Linux does not show a button without `text` | macOS: Only the first one is used as primary; others shown as additional actions (hover). Incompatible with `hasReply` (beyond first ignored). Linux: Requires a notification server with the `actions` capability. |
| `selection` | Windows          | Used as the label for the submit button for the selection menu | "Select" | Requires an `items` array property specifying option labels. Emits the `action` event with `(index, selectedIndex)` where `selectedIndex` is the chosen option (>= 0). Ignored on platforms that do not support selection actions. |

### Button support on macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has its `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button won't appear.

### Button support on Linux

Buttons are shown only if the desktop's notification server advertises the `actions` capability. Otherwise the notification is shown without them.

In a Flatpak or Snap sandbox, a notification that has buttons also shows its default action as a "Show" button, which emits `click`.

### Selection support on Windows

To add a selection (combo box) style action, include an action with `type: 'selection'`, a `text` label for the submit button, and an `items` array of strings:

```js
const { Notification, app } = require('electron')

app.whenReady().then(() => {
  const items = ['One', 'Two', 'Three']
  const n = new Notification({
    title: 'Choose an option',
    actions: [
      {
        type: 'selection',
        text: 'Apply',
        items
      }
    ]
  })

  n.on('action', (e) => {
    console.log(`User triggered action at index: ${e.actionIndex}`)
    if (e.selectionIndex > 0) {
      console.log(`User chose selection item '${items[e.selectionIndex]}'`)
    }
  })

  n.show()
})
```

When the user activates the selection action, the notification's `action` event will be emitted with two parameters: `actionIndex` (the action's index in the `actions` array) and `selectedIndex` (the zero-based index of the chosen item, or `-1` if unavailable). On non-Windows platforms selection actions are ignored.

## NotificationResponse Object

* `actionIdentifier` string - The identifier string of the action that the user selected.
* `date` number - The delivery date of the notification.
* `identifier` string - The unique identifier for this notification request.
* `userInfo` Record<string, any> - A dictionary of custom information associated with the notification.
* `userText` string (optional) - The text entered or chosen by the user.

## ActivationArguments Object

Used on Windows only.

* `type` string - The type of activation that launched the app: `'click'`, `'action'`, or `'reply'`.
* `arguments` string - The raw activation arguments string from Windows.
* `actionIndex` number (optional) - For `'action'` type, the index of the button that was clicked.
* `reply` string (optional) - For `'reply'` type, the text the user entered in the reply field.
* `userInputs` Record<string, string> (optional) - A dictionary of all user inputs from the notification.

## Notes

* The `reply` event's positional `reply` argument and the `action` event's positional `actionIndex` / `selectionIndex` arguments are marked _Deprecated_ in favor of the `details` object.
* Structure pages: https://www.electronjs.org/docs/latest/api/structures/notification-action , .../notification-response , .../activation-arguments.
* Distinction: Electron's main-process `Notification` class for OS desktop notifications. Platform notification frameworks (UserNotifications / APNs) are covered by apple-app-services, Android notifications by android-platform-core, and Windows App Notifications by windows-app-sdk.

## Related

* [Notification: constructor and static methods](./notification-class-static.md)
* [pushNotifications](./push-notifications.md)
