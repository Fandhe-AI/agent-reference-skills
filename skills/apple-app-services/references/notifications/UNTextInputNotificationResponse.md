# UNTextInputNotificationResponse

The user's response to an actionable notification, including any custom text the user typed or dictated.

## Signature / Usage

```swift
func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
) {
    if let textResponse = response as? UNTextInputNotificationResponse {
        print(textResponse.userText)
    }
    completionHandler()
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `userText` | `String` | The text response provided by the user |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Inherits from `UNNotificationResponse`
- You don't create these objects directly; the shared user notification center creates them and delivers them to `userNotificationCenter(_:didReceive:withCompletionHandler:)` when the user interacts with a `UNTextInputNotificationAction`

## Related

- [UNNotificationResponse](./UNNotificationResponse.md)
- [UNTextInputNotificationAction](./UNTextInputNotificationAction.md)
- [UNUserNotificationCenterDelegate](./UNUserNotificationCenterDelegate.md)
