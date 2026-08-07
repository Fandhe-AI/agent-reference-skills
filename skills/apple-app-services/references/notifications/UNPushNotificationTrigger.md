# UNPushNotificationTrigger

A trigger condition that indicates Apple Push Notification service (APNs) sent the notification.

## Signature / Usage

```swift
// The system creates instances; you only encounter them when inspecting delivered requests
if request.trigger is UNPushNotificationTrigger {
    // The notification originated from APNs
}
```

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Inherits from `UNNotificationTrigger`
- You don't create instances yourself; the system creates them and assigns them to the `trigger` property of requests that originated from APNs

## Related

- [UNNotificationTrigger](./UNNotificationTrigger.md)
- [UNCalendarNotificationTrigger](./UNCalendarNotificationTrigger.md)
- [UNTimeIntervalNotificationTrigger](./UNTimeIntervalNotificationTrigger.md)
- [UNLocationNotificationTrigger](./UNLocationNotificationTrigger.md)
