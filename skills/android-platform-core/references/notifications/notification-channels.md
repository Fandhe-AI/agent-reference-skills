# NotificationChannel / NotificationChannelCompat

Groups notifications by type so users can control sound, vibration, and visual behavior per channel in system settings. Required on API 26+ (Android 8.0).

## Signature / Usage

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    val importance = NotificationManager.IMPORTANCE_DEFAULT
    val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
        description = descriptionText
    }
    val notificationManager = context.getSystemService(NotificationManager::class.java)
    notificationManager.createNotificationChannel(channel)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `NotificationChannel(id, name, importance)` | constructor | — | `id` is a unique app-scoped string, `name` is user-visible, `importance` controls interruption level. |
| `setDescription(String)` | `String` | — | User-visible explanation shown in channel settings. |
| `setGroup(String)` | `String` | `null` | Associates the channel with a `NotificationChannelGroup`. |
| `enableLights(Boolean)` / `setLightColor(Int)` | `Boolean` / `Int` | — | Notification light behavior. Only configurable before the channel is registered. |
| `setVibrationPattern(LongArray)` | `LongArray` | — | Custom vibration pattern. Only configurable before the channel is registered. |
| `setShowBadge(Boolean)` | `Boolean` | `true` | Whether this channel contributes to the launcher badge count. See [notification-badges](./notification-badges.md). |

### Importance levels

| User-visible level | API 26+ constant | API ≤25 equivalent | Behavior |
|------|------|------|------|
| Urgent | `IMPORTANCE_HIGH` | `PRIORITY_HIGH` / `PRIORITY_MAX` | Sound + heads-up notification |
| High | `IMPORTANCE_DEFAULT` | `PRIORITY_DEFAULT` | Sound only |
| Medium | `IMPORTANCE_LOW` | `PRIORITY_LOW` | No sound |
| Low | `IMPORTANCE_MIN` | `PRIORITY_MIN` | No sound, not shown in status bar |
| None | `IMPORTANCE_NONE` | — | No sound, minimal UI |

## Notes

- **API 26+ required.** Apps targeting API 26 or higher must post to a channel or the notification will not display. Guard channel creation with an SDK_INT check since the APIs don't exist on lower levels.
- Recreating a channel with the same ID and original values is a safe no-op; once created, importance/sound/vibration cannot be changed programmatically — only the user can change them via system settings.
- `notificationManager.getNotificationChannel(CHANNEL_ID)` reads back user-modified settings (`importance`, `vibrationPattern`, `sound`).
- `notificationManager.deleteNotificationChannel(channelId)` deletes a channel; deleted channels still show in settings as a spam-prevention measure.
- **Channel groups**: create with `notificationManager.createNotificationChannelGroup(NotificationChannelGroup(groupId, groupName))`, then call `channel.setGroup(groupId)` before registering the channel. Useful for multi-account apps.
- Direct users to a channel's settings screen with `Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS)` plus `EXTRA_APP_PACKAGE` / `EXTRA_CHANNEL_ID` extras.
- Artifact: `androidx.core:core` (`NotificationChannelCompat` / `NotificationManagerCompat`) or the platform `android.app.NotificationChannel` directly.

## Related

- [notification-builder](./notification-builder.md)
- [notification-manager](./notification-manager.md)
- [notification-badges](./notification-badges.md)
