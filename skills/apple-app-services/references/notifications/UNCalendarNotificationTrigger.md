# UNCalendarNotificationTrigger

A trigger that delivers a notification at a specific date and time described by `DateComponents`.

## Signature / Usage

```swift
// Deliver daily at 8:30 AM
var date = DateComponents()
date.hour = 8
date.minute = 30
let trigger = UNCalendarNotificationTrigger(dateMatching: date, repeats: true)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `init(dateMatching:repeats:)` | `convenience init` | Creates the trigger from date components and a repeat flag |
| `dateComponents` | `DateComponents` | The date components used to construct the trigger |
| `repeats` | `Bool` | Whether to reschedule the notification after delivery |
| `nextTriggerDate()` | `func -> Date?` | The next date at which the trigger conditions are met |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Subclass of `UNNotificationTrigger`
- Specify only the date component values you need; the system matches any date that satisfies all specified components

## Related

- [UNNotificationTrigger](./UNNotificationTrigger.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
