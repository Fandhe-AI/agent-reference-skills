# UNNotificationActionIcon

An icon associated with an action.

## Signature / Usage

```swift
class UNNotificationActionIcon
```

Adapted (not in the official docs): minimal usage built from the declared initializers; the official page has no code example.

```swift
import UserNotifications

let icon = UNNotificationActionIcon(systemImageName: "star")
let action = UNNotificationAction(identifier: "FAVORITE",
                                  title: "Favorite",
                                  options: [],
                                  icon: icon)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(systemImageName:)` | `convenience init(systemImageName: String)` | Creates an action icon by using a system symbol image |
| `init(templateImageName:)` | `convenience init(templateImageName: String)` | Creates an action icon based on an image in your app's bundle, preferably in an asset catalog |

## Notes

- Available iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, tvOS 15.0+, visionOS 1.0+, watchOS 8.0+. Inherits from `NSObject`.
- Pass the icon to `UNNotificationAction.init(identifier:title:options:icon:)`; the action's `icon` property is `UNNotificationActionIcon?`. The system displays it in the notification interface to help the user identify the action.
- Source: https://developer.apple.com/documentation/usernotifications/unnotificationactionicon (fetched 2026-11-14)

## Related

- [UNNotificationAction](./UNNotificationAction.md)
- [UNNotificationCategory](./UNNotificationCategory.md)
