# UNMutableNotificationContent

The editable content for local notifications. Subclass of `UNNotificationContent` with writable properties.

## Signature / Usage

```swift
let content = UNMutableNotificationContent()
content.title = NSString.localizedUserNotificationString(forKey: "Hello!", arguments: nil)
content.body = NSString.localizedUserNotificationString(forKey: "Hello_message_body", arguments: nil)
content.sound = UNNotificationSound.default
content.categoryIdentifier = "MESSAGE_CATEGORY"

let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
let request = UNNotificationRequest(identifier: "FiveSecond", content: content, trigger: trigger)
UNUserNotificationCenter.current().add(request)
```

## Options / Props

### Primary Content

| Property | Type | Description |
|----------|------|-------------|
| `title` | `String` | The notification's primary description |
| `subtitle` | `String` | The notification's secondary description |
| `body` | `String` | The notification's main content text |

### Supplementary Content

| Property | Type | Description |
|----------|------|-------------|
| `attachments` | `[UNNotificationAttachment]` | Visual and audio attachments |
| `userInfo` | `[AnyHashable: Any]` | Custom data to associate with the notification |
| `sound` | `UNNotificationSound?` | The sound that plays on delivery |
| `badge` | `NSNumber?` | The app icon badge number |
| `launchImageName` | `String` | Image or storyboard used when the app launches from this notification |

### Grouping & Routing

| Property | Type | Description |
|----------|------|-------------|
| `threadIdentifier` | `String` | Groups related notifications together |
| `categoryIdentifier` | `String` | Associates this notification with a registered `UNNotificationCategory` |
| `targetContentIdentifier` | `String?` | Determines which scene to display to handle the notification |

### System Integration

| Property | Type | Description |
|----------|------|-------------|
| `interruptionLevel` | `UNNotificationInterruptionLevel` | The notification's importance and delivery timing |
| `relevanceScore` | `Double` | Score used to select the summary's featured notification |
| `filterCriteria` | `String?` | Criteria for displaying in the current Focus |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Use `NSString.localizedUserNotificationString(forKey:arguments:)` instead of `NSLocalizedString()` — it delays string loading until delivery, ensuring the correct language even if the user changes settings after scheduling
- Authorization is required; the system silently ignores notifications for unauthorized apps

## Related

- [UNNotificationContent](./UNNotificationContent.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
- [UNNotificationCategory](./UNNotificationCategory.md)
