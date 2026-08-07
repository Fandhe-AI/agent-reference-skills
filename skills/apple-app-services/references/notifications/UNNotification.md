# UNNotification

The data for a local or remote notification the system delivers to your app.

## Signature / Usage

```swift
func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
) {
    let request = notification.request
    print(request.content.title)
    completionHandler([.banner, .sound])
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `request` | `UNNotificationRequest` | The notification request containing the payload and trigger condition for the notification |
| `date` | `Date` | The delivery date of the notification |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Don't create `UNNotification` objects directly; the system delivers them to your `UNUserNotificationCenterDelegate` object, or retrieve delivered ones via `UNUserNotificationCenter.getDeliveredNotifications(completionHandler:)`

## Related

- [UNNotificationRequest](./UNNotificationRequest.md)
- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
- [UNUserNotificationCenterDelegate](./UNUserNotificationCenterDelegate.md)
