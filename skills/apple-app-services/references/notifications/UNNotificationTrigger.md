# UNNotificationTrigger

Abstract base class representing an event that triggers the delivery of a local or remote notification. Do not instantiate directly; use one of its concrete subclasses.

## Signature / Usage

```swift
// Use a concrete subclass
let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
let request = UNNotificationRequest(identifier: "id", content: content, trigger: trigger)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `repeats` | `Bool` | Whether the system reschedules the notification after delivery |

### Concrete Subclasses

| Class | Trigger Condition |
|-------|-------------------|
| `UNTimeIntervalNotificationTrigger` | After a specified time interval elapses |
| `UNCalendarNotificationTrigger` | At a specific date and time |
| `UNLocationNotificationTrigger` | When the device enters or exits a geographic region |
| `UNPushNotificationTrigger` | Delivery via APNs (read-only, set by the system) |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Pass `nil` as the trigger in `UNNotificationRequest` to deliver the notification immediately

## Related

- [UNTimeIntervalNotificationTrigger](./UNTimeIntervalNotificationTrigger.md)
- [UNCalendarNotificationTrigger](./UNCalendarNotificationTrigger.md)
- [UNLocationNotificationTrigger](./UNLocationNotificationTrigger.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
