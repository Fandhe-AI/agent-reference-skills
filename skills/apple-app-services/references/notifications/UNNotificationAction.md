# UNNotificationAction

A task your app performs in response to a delivered notification. Displayed as an action button on the notification interface.

## Signature / Usage

```swift
let action = UNNotificationAction(
    identifier: "REPLY_ACTION",
    title: "Reply",
    options: .foreground
)

// Add to a category
let category = UNNotificationCategory(
    identifier: "MESSAGE_CATEGORY",
    actions: [action],
    intentIdentifiers: [],
    options: []
)
UNUserNotificationCenter.current().setNotificationCategories([category])
```

## Options / Props

### Initializers

```swift
convenience init(identifier: String, title: String, options: UNNotificationActionOptions)
convenience init(identifier: String, title: String, options: UNNotificationActionOptions, icon: UNNotificationActionIcon?)
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `identifier` | `String` | Unique string identifying this action; appears in `UNNotificationResponse.actionIdentifier` |
| `title` | `String` | Localized text displayed on the action button |
| `options` | `UNNotificationActionOptions` | Behavioral options for the action |
| `icon` | `UNNotificationActionIcon?` | Icon displayed on the action button |

### UNNotificationActionOptions Values

| Option | Description |
|--------|-------------|
| `.authenticationRequired` | The action requires the user to unlock the device first |
| `.destructive` | Marks the action as destructive; displayed in red |
| `.foreground` | Launches the app to the foreground when the action is selected |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Handle the selected action in `UNUserNotificationCenterDelegate.userNotificationCenter(_:didReceive:withCompletionHandler:)` by checking `response.actionIdentifier`
- On Apple Watch Series 9 / Ultra 2, a Double Tap invokes the first nondestructive action; avoid placing destructive actions first
- Subclassed by `UNTextInputNotificationAction` for actions requiring text input

## Related

- [UNNotificationCategory](./UNNotificationCategory.md)
- [UNNotificationResponse](./UNNotificationResponse.md)
- [UNUserNotificationCenterDelegate](./UNUserNotificationCenterDelegate.md)
