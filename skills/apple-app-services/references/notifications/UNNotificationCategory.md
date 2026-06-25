# UNNotificationCategory

Defines a type of notification your app supports and the custom actions the system displays to users in response.

## Signature / Usage

```swift
let replyAction = UNNotificationAction(
    identifier: "REPLY_ACTION",
    title: "Reply",
    options: .foreground
)

let category = UNNotificationCategory(
    identifier: "MESSAGE_CATEGORY",
    actions: [replyAction],
    intentIdentifiers: [],
    options: .customDismissAction
)

UNUserNotificationCenter.current().setNotificationCategories([category])
```

Associate a category with a local notification:
```swift
content.categoryIdentifier = "MESSAGE_CATEGORY"
```

## Options / Props

### Initializer

```swift
convenience init(
    identifier: String,
    actions: [UNNotificationAction],
    intentIdentifiers: [String],
    hiddenPreviewsBodyPlaceholder: String?,
    categorySummaryFormat: String?,
    options: UNNotificationCategoryOptions
)
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `identifier` | `String` | Unique string that identifies the category; must match `categoryIdentifier` on the content |
| `actions` | `[UNNotificationAction]` | Action buttons displayed with the notification (up to 10; max 2 in limited space) |
| `intentIdentifiers` | `[String]` | Related Siri intent identifiers |
| `options` | `UNNotificationCategoryOptions` | Behavioral options for the category |
| `hiddenPreviewsBodyPlaceholder` | `String` | Placeholder text when notification previews are hidden |
| `categorySummaryFormat` | `String?` | Format string for grouped notification summaries |

### UNNotificationCategoryOptions Values

| Option | Description |
|--------|-------------|
| `.customDismissAction` | Sends dismiss events to the delegate |
| `.allowInCarPlay` | Allows display in CarPlay |
| `.hiddenPreviewsShowTitle` | Shows the title even when previews are hidden |
| `.hiddenPreviewsShowSubtitle` | Shows the subtitle even when previews are hidden |
| `.allowAnnouncement` | Allows Siri to announce the notification |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Call `setNotificationCategories(_:)` before scheduling any notifications that use the category
- On Apple Watch Series 9 / Ultra 2, a Double Tap gesture invokes the first nondestructive action in the category

## Related

- [UNNotificationAction](./UNNotificationAction.md)
- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
