# UNUserNotificationCenter

The central object for managing notification-related activities for your app or app extension. Handles authorization, scheduling, delivery, and user interactions.

## Signature / Usage

```swift
// Get the shared notification center
let center = UNUserNotificationCenter.current()

// Request authorization
try await center.requestAuthorization(options: [.alert, .sound, .badge])

// Schedule a notification
center.add(request) { error in
    if let error { print(error) }
}
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `current()` | `class func -> UNUserNotificationCenter` | Returns the app's shared notification center instance |
| `delegate` | `(any UNUserNotificationCenterDelegate)?` | Processes incoming notifications and user actions; assign before app finishes launching |
| `supportsContentExtensions` | `Bool` | Indicates whether the device supports notification content extensions |
| `requestAuthorization(options:completionHandler:)` | `func` | Requests permission to display alerts, play sounds, or badge the icon |
| `add(_:withCompletionHandler:)` | `func` | Schedules the delivery of a local notification |
| `getPendingNotificationRequests(completionHandler:)` | `func` | Fetches all pending local notifications awaiting delivery |
| `removePendingNotificationRequests(withIdentifiers:)` | `func` | Removes specific pending notifications by identifier |
| `removeAllPendingNotificationRequests()` | `func` | Removes all pending local notifications |
| `getDeliveredNotifications(completionHandler:)` | `func` | Fetches all delivered notifications currently in Notification Center |
| `removeDeliveredNotifications(withIdentifiers:)` | `func` | Removes specific delivered notifications from Notification Center |
| `removeAllDeliveredNotifications()` | `func` | Removes all delivered notifications from Notification Center |
| `setNotificationCategories(_:)` | `func` | Registers notification categories for actionable notification types |
| `getNotificationCategories(completionHandler:)` | `func` | Fetches registered notification categories |
| `getNotificationSettings(completionHandler:)` | `func` | Retrieves authorization and feature-related settings |
| `setBadgeCount(_:withCompletionHandler:)` | `func` | Updates the badge count for the app's icon |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Thread-safe: the shared center can be used from any thread; it processes requests serially
- Assign `delegate` before the app finishes launching to avoid missing incoming notifications

## Related

- [UNUserNotificationCenterDelegate](./UNUserNotificationCenterDelegate.md)
- [UNNotificationRequest](./UNNotificationRequest.md)
- [UNNotificationSettings](./UNNotificationSettings.md)
- [UNNotificationCategory](./UNNotificationCategory.md)
