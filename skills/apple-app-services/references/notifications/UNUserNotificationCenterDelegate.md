# UNUserNotificationCenterDelegate

An interface for processing incoming notifications and responding to notification actions.

## Signature / Usage

```swift
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        return true
    }

    // Called when a notification arrives while the app is in the foreground
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.banner, .sound])
    }

    // Called when the user responds to a notification
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        let actionID = response.actionIdentifier
        // Handle action
        completionHandler()
    }
}
```

## Options / Props

### Delegate Methods

| Method | Required | Description |
|--------|----------|-------------|
| `userNotificationCenter(_:willPresent:withCompletionHandler:)` | Optional | How to present a notification arriving while the app is in the foreground |
| `userNotificationCenter(_:didReceive:withCompletionHandler:)` | Optional | Process the user's response to a delivered notification |
| `userNotificationCenter(_:openSettingsFor:)` | Optional | Display in-app notification settings |

### Method Details

**`willPresent`** — call the completion handler with presentation options:
- `UNNotificationPresentationOptions`: `.banner`, `.list`, `.sound`, `.badge`
- Pass an empty set `[]` to suppress display entirely

**`didReceive`** — check `response.actionIdentifier` against:
- `UNNotificationDefaultActionIdentifier` — user opened the app from the notification
- `UNNotificationDismissActionIdentifier` — user dismissed the notification
- Custom action identifiers defined in `UNNotificationAction`

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Assign the delegate to `UNUserNotificationCenter.current().delegate` in `application(_:willFinishLaunchingWithOptions:)` or `application(_:didFinishLaunchingWithOptions:)`; assigning later may cause missed notifications
- Always call the `completionHandler` in both delegate methods

## Related

- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
- [UNNotificationResponse](./UNNotificationResponse.md)
- [UNNotificationAction](./UNNotificationAction.md)
