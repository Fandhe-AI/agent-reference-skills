# UNNotificationSettings

The object containing the current authorization status and notification-related settings for your app. Obtained from `UNUserNotificationCenter`; do not instantiate directly.

## Signature / Usage

```swift
UNUserNotificationCenter.current().getNotificationSettings { settings in
    guard settings.authorizationStatus == .authorized else { return }
    // Schedule notifications
}
```

## Options / Props

### Authorization

| Property | Type | Description |
|----------|------|-------------|
| `authorizationStatus` | `UNAuthorizationStatus` | The app's overall ability to schedule and receive notifications |

### UNAuthorizationStatus Values

| Value | Description |
|-------|-------------|
| `.notDetermined` | The user has not yet made a choice |
| `.denied` | The user denied authorization |
| `.authorized` | The user granted authorization |
| `.provisional` | The app is provisionally authorized (trial notifications, no interruptions) |
| `.ephemeral` | Temporary authorization (iOS 14+) |

### Per-Feature Settings

| Property | Type | Description |
|----------|------|-------------|
| `alertSetting` | `UNNotificationSetting` | Authorization status for displaying alerts |
| `soundSetting` | `UNNotificationSetting` | Authorization status for playing sounds |
| `badgeSetting` | `UNNotificationSetting` | Authorization status for badging the app icon |
| `notificationCenterSetting` | `UNNotificationSetting` | Whether notifications appear in Notification Center |
| `lockScreenSetting` | `UNNotificationSetting` | Whether notifications appear on the Lock screen |
| `carPlaySetting` | `UNNotificationSetting` | Whether notifications appear in CarPlay |
| `criticalAlertSetting` | `UNNotificationSetting` | Authorization status for critical alerts |
| `announcementSetting` | `UNNotificationSetting` | Whether Siri can announce notifications |
| `scheduledDeliverySetting` | `UNNotificationSetting` | Whether the system schedules delivery |
| `timeSensitiveSetting` | `UNNotificationSetting` | Whether the system treats notifications as time-sensitive |
| `directMessagesSetting` | `UNNotificationSetting` | Authorization status for direct message notifications |

### UNNotificationSetting Values

| Value | Description |
|-------|-------------|
| `.notSupported` | The feature is not supported on this device |
| `.disabled` | The feature is disabled |
| `.enabled` | The feature is enabled |

### Interface Settings

| Property | Type | Description |
|----------|------|-------------|
| `alertStyle` | `UNAlertStyle` | The alert presentation style when the device is unlocked (`.none`, `.banner`, `.alert`) |
| `showPreviewsSetting` | `UNShowPreviewsSetting` | Whether the app shows notification content previews (`.always`, `.whenAuthenticated`, `.never`) |
| `providesAppNotificationSettings` | `Bool` | Whether the system shows a button for in-app notification settings |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Always check `authorizationStatus` before scheduling notifications; users can revoke permission at any time in Settings

## Related

- [UNUserNotificationCenter](./UNUserNotificationCenter.md)
- [requestAuthorization](./UNUserNotificationCenter.md)
