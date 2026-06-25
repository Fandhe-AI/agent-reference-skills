# UNNotificationContent

The immutable content associated with a delivered notification. For local notifications, create `UNMutableNotificationContent` instead.

## Signature / Usage

```swift
// Access content from a delivered notification
func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: () -> Void
) {
    let content = response.notification.request.content
    print(content.title, content.body)
    completionHandler()
}
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
| `userInfo` | `[AnyHashable: Any]` | Custom data associated with the notification |
| `sound` | `UNNotificationSound?` | The sound that plays on delivery |
| `badge` | `NSNumber?` | The app icon badge number |

### Grouping & Routing

| Property | Type | Description |
|----------|------|-------------|
| `threadIdentifier` | `String` | Groups related notifications together |
| `categoryIdentifier` | `String` | Identifies the notification's category for actionable notifications |
| `targetContentIdentifier` | `String?` | Determines which scene to display to handle the notification |

### System Integration

| Property | Type | Description |
|----------|------|-------------|
| `interruptionLevel` | `UNNotificationInterruptionLevel` | The notification's importance and delivery timing |
| `relevanceScore` | `Double` | Score used to select the summary's featured notification |
| `filterCriteria` | `String?` | Criteria for displaying in the current Focus |
| `launchImageName` | `String` | Image or storyboard to use when the app launches from this notification |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Do not instantiate directly; for local notifications use `UNMutableNotificationContent`
- For remote notifications the system derives content from the APNs JSON payload

## Related

- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
