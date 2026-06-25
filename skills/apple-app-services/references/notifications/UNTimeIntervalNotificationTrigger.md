# UNTimeIntervalNotificationTrigger

A trigger that delivers a notification after a specified time interval elapses.

## Signature / Usage

```swift
// Fire in 30 minutes
let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 30 * 60, repeats: false)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `init(timeInterval:repeats:)` | `convenience init` | Creates the trigger with the given interval and repeat flag |
| `timeInterval` | `TimeInterval` | The time interval in seconds before delivery |
| `repeats` | `Bool` | Whether to reschedule the notification after delivery |
| `nextTriggerDate()` | `func -> Date?` | The next date at which the trigger conditions are met |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Subclass of `UNNotificationTrigger`
- When `repeats` is `true`, `timeInterval` must be at least 60 seconds

## Related

- [UNNotificationTrigger](./UNNotificationTrigger.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
