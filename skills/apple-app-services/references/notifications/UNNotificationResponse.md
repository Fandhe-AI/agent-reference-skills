# UNNotificationResponse

The user's response to an actionable notification. Created by the system and delivered to your delegate when the user interacts with a notification.

## Signature / Usage

```swift
func userNotificationCenter(_ center: UNUserNotificationCenter,
                            didReceive response: UNNotificationResponse,
                            withCompletionHandler completionHandler: @escaping () -> Void) {
    switch response.actionIdentifier {
    case UNNotificationDefaultActionIdentifier:
        // User tapped the notification itself
    case UNNotificationDismissActionIdentifier:
        // User dismissed without selecting an action
    case "REPLY_ACTION":
        // Handle custom action
    default:
        break
    }
    completionHandler()
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `actionIdentifier` | `String` | The identifier of the action the user selected |
| `notification` | `UNNotification` | The notification to which the user responded |
| `targetScene` | `UIScene?` | The scene where the system reflects the user's response |

### Special Action Identifiers

| Constant | Description |
|----------|-------------|
| `UNNotificationDefaultActionIdentifier` | The user opened the app by tapping the notification |
| `UNNotificationDismissActionIdentifier` | The user explicitly dismissed the notification without selecting an action |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Do not create instances directly; the system creates them and delivers them via `UNUserNotificationCenterDelegate`
- Subclassed by `UNTextInputNotificationResponse`, which adds a `userText` property containing text the user typed or dictated

## Related

- [UNUserNotificationCenterDelegate](./UNUserNotificationCenterDelegate.md)
- [UNNotificationAction](./UNNotificationAction.md)
- [UNNotificationCategory](./UNNotificationCategory.md)
