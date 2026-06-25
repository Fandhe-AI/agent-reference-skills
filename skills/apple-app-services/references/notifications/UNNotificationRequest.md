# UNNotificationRequest

A request to schedule a local notification, encapsulating the notification's content and the trigger conditions for delivery.

## Signature / Usage

```swift
let content = UNMutableNotificationContent()
content.title = "Lunch time"
content.body = "Food is cooked... let's eat!"

let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 60.0, repeats: false)

let request = UNNotificationRequest(
    identifier: "com.example.mynotification",
    content: content,
    trigger: trigger
)

UNUserNotificationCenter.current().add(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `identifier` | `String` | Unique identifier for this notification request; used to remove pending/delivered notifications |
| `content` | `UNNotificationContent` | The content associated with the notification |
| `trigger` | `UNNotificationTrigger?` | The conditions that trigger delivery; `nil` delivers the notification immediately |

### Initializer

```swift
convenience init(
    identifier: String,
    content: UNNotificationContent,
    trigger: UNNotificationTrigger?
)
```

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Schedule by passing to `UNUserNotificationCenter.add(_:withCompletionHandler:)`
- Use `identifier` to cancel pending notifications via `removePendingNotificationRequests(withIdentifiers:)`

## Related

- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNNotificationTrigger](./UNNotificationTrigger.md)
- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
