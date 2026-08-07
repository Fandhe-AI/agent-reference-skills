# UNNotificationServiceExtension

An object that modifies the content of a remote notification before it's delivered to the user. Provides the entry point for a notification service app extension; presents no UI of its own.

## Signature / Usage

```swift
class NotificationService: UNNotificationServiceExtension {
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(
        _ request: UNNotificationRequest,
        withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
    ) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

        if let bestAttemptContent {
            bestAttemptContent.title = "\(bestAttemptContent.title) [modified]"
            contentHandler(bestAttemptContent)
        }
    }

    override func serviceExtensionTimeWillExpire() {
        if let contentHandler, let bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `didReceive(_:withContentHandler:)` | `func didReceive(UNNotificationRequest, withContentHandler: (UNNotificationContent) -> Void)` | Required; make any needed changes to the notification and call the completion block before the extension's limited execution time expires |
| `serviceExtensionTimeWillExpire()` | `func serviceExtensionTimeWillExpire()` | Called when the system is about to terminate the extension; last chance to submit changes |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 6.0+, visionOS 1.0+
- `didReceive(_:withContentHandler:)` only runs when the remote notification's `aps` dictionary displays an alert and includes `mutable-content` set to `1`
- Silent notifications, and those that only play a sound or badge the app icon, cannot be modified
- If `serviceExtensionTimeWillExpire()` is not overridden or the completion block isn't called in time, the system displays the original notification content

## Related

- [UNNotificationRequest](./UNNotificationRequest.md)
- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNNotificationContent](./UNNotificationContent.md)
