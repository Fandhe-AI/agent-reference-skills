# NotificationCompat.Builder

Builds a basic notification. A minimal usable notification needs a small icon, a title, body text, a tap action (content intent), and — on API 26+ — a notification channel.

## Signature / Usage

```kotlin
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("My notification")
    .setContentText("Hello World!")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    .setContentIntent(pendingIntent)
    .setAutoCancel(true)

with(NotificationManagerCompat.from(context)) {
    if (ActivityCompat.checkSelfPermission(
            context,
            Manifest.permission.POST_NOTIFICATIONS
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        return@with
    }
    notify(notificationId, builder.build())
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setSmallIcon(Int)` | `Int` (drawable res) | — | Required. The only mandatory user-visible content. |
| `setContentTitle(CharSequence)` | `CharSequence` | — | Notification title. |
| `setContentText(CharSequence)` | `CharSequence` | — | Body text, truncated to one line when collapsed. |
| `setPriority(Int)` | `Int` | — | Alert behavior on Android 7.1 and earlier (`PRIORITY_MIN`..`PRIORITY_MAX`). Superseded by channel importance on API 26+. |
| `setContentIntent(PendingIntent)` | `PendingIntent` | — | Action fired when the user taps the notification. |
| `setAutoCancel(Boolean)` | `Boolean` | `false` | Dismisses the notification automatically when tapped. |

## Notes

- `Notification.Builder(context, CHANNEL_ID)` requires a channel ID on API 26+; without a valid, previously created channel the notification does not display.
- On API 33+, posting a notification requires the runtime `POST_NOTIFICATIONS` permission — see [notification-permission](./notification-permission.md).
- `NotificationCompat` provides compatibility back to older API levels while using the platform APIs on API 26+.
- Android rate-limits notification updates; only the first notification per second produces sound on API 27+ (Android 8.1).
- Artifact: `androidx.core:core` (Kotlin projects typically use `androidx.core:core-ktx`).

## Related

- [notification-channels](./notification-channels.md)
- [notification-manager](./notification-manager.md)
- [notification-permission](./notification-permission.md)
- [notification-actions](./notification-actions.md)
