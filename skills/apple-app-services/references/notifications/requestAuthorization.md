# requestAuthorization

Requests the user's permission to display notifications. Must be called before scheduling any local notifications.

## Signature / Usage

```swift
let center = UNUserNotificationCenter.current()

// Async/await
do {
    try await center.requestAuthorization(options: [.alert, .sound, .badge])
} catch {
    // Handle the error
}

// Completion handler variant
center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
    if granted {
        // Schedule notifications
    }
}
```

## Options / Props

### Method Signature

```swift
func requestAuthorization(
    options: UNAuthorizationOptions,
    completionHandler: @escaping (Bool, (any Error)?) -> Void
)
```

### UNAuthorizationOptions Values

| Option | Description |
|--------|-------------|
| `.alert` | Display visual alerts |
| `.sound` | Play notification sounds |
| `.badge` | Update the app icon badge |
| `.carPlay` | Send notifications to CarPlay |
| `.criticalAlert` | Send critical alerts that bypass the mute switch (requires entitlement) |
| `.providesAppNotificationSettings` | Show a button in system Settings linking to in-app notification settings |
| `.provisional` | Send trial notifications silently to Notification Center without asking permission upfront |
| `.ephemeral` | Temporary authorization granted to App Clips (iOS 14+) |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- The system only prompts the user on the first call; subsequent calls return the existing authorization status without a prompt
- With `.provisional`, the authorization status is `.provisional` and notifications appear silently in Notification Center until the user chooses to keep or turn off notifications
- Always check `UNNotificationSettings.authorizationStatus` before scheduling, as users can change permissions in Settings at any time

## Related

- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
- [UNNotificationSettings](./UNNotificationSettings.md)
