# MediaNotification.Provider / DefaultMediaNotificationProvider

`MediaNotification.Provider` builds the notification shown in the drawer for a `MediaSessionService`. `DefaultMediaNotificationProvider` is the built-in implementation, kept in sync with the session's `CommandButton` layout and `Player` state.

## Signature / Usage

```kotlin
val notificationProvider = DefaultMediaNotificationProvider.Builder(context)
    .setChannelId("playback_channel")
    .setChannelName(R.string.notification_channel_name)
    .setNotificationId(2001)
    .build()

mediaSessionService.setMediaNotificationProvider(notificationProvider)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DefaultMediaNotificationProvider.Builder(context)` | `Context` | — | Constructor. |
| `setNotificationId(id)` | `Int` | `1001` | Fixed notification ID used for all sessions handled by this provider. |
| `setNotificationIdProvider(provider)` | `NotificationIdProvider` | none | Function to derive a per-session notification ID dynamically. |
| `setChannelId(channelId)` | `String` | `"default_channel_id"` | `NotificationChannel` ID to post to. |
| `setChannelName(resId)` | `@StringRes Int` | system default | String resource for the channel name shown to the user. |
| `build()` | — | — | Returns the provider (callable once). |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- `createNotification()` renders play/pause, previous/next, and up to two custom `CommandButton`s from `setMediaButtonPreferences()`, plus title/artist/artwork from `MediaMetadata`.
- Artwork is fetched via the session's `BitmapLoader` (`SimpleBitmapLoader` by default); inject a custom loader (e.g. wrapping Glide) via `MediaSession.Builder.setBitmapLoader()`.
- To fully customize notification content/behavior, implement `MediaNotification.Provider` directly instead of subclassing `DefaultMediaNotificationProvider`, and set it via `MediaSessionService.setMediaNotificationProvider()`.
- Building a custom `NotificationCompat` notification manually (legacy `MediaStyle` approach) is documented as a fallback for apps not using Media3; prefer `DefaultMediaNotificationProvider` for automatic state sync.
- General `NotificationCompat` / channel creation mechanics are owned by the `android-platform-core` skill's `notifications` category; this page covers only the media3-specific provider.

## Related

- [MediaSessionService](./media-session-service.md)
- [CommandButton](./command-button.md)
- [MediaButtonReceiver](./media-button-receiver.md)
