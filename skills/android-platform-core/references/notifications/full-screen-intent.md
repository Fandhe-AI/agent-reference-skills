# Heads-up and full-screen intent notifications

Time-sensitive notifications that interrupt the user immediately: heads-up notifications (a brief banner while the device is in use) and full-screen intents (a full-screen launch, e.g. for incoming calls or alarms) via `setFullScreenIntent()`.

## Signature / Usage

```kotlin
val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
val channel = NotificationChannel(CHANNEL_ID, "High priority notifications", NotificationManager.IMPORTANCE_HIGH)
notificationManager.createNotificationChannel(channel)

val notification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("Incoming call")
    .setContentText("Jane Doe")
    .setPriority(NotificationCompat.PRIORITY_HIGH)
    .setCategory(NotificationCompat.CATEGORY_CALL)
    .setFullScreenIntent(fullScreenPendingIntent, true)
    .build()
```

```kotlin
// API 34+: check and request the USE_FULL_SCREEN_INTENT permission
if (notificationManager.canUseFullScreenIntent()) {
    // allowed to use setFullScreenIntent()
} else {
    startActivity(Intent(Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setFullScreenIntent(PendingIntent, Boolean)` | `(PendingIntent, highPriority: Boolean)` | — | Launches the given intent full-screen when the notification fires (subject to permission and device state). |
| `NotificationManager.canUseFullScreenIntent()` | `Boolean` | — | API 34+. Checks whether the app currently holds `USE_FULL_SCREEN_INTENT`. |
| `Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT` | `Intent` action | — | API 34+. Opens the system settings screen where the user can grant the permission. |

## Notes

- **API 34+ (targeting Android 14) restriction**: `USE_FULL_SCREEN_INTENT` is limited to apps that provide calling and alarms only; Google Play revokes the default grant for apps outside that profile (deadline enforced since May 31, 2024). The permission stays enabled for apps already installed before a device upgrades to Android 14, and users can toggle it manually.
- Even with permission, the system may show a heads-up notification instead of launching full-screen while the user is actively using the device.
- Use `<uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT"/>` in the manifest; declaring the permission alone does not guarantee the launch will occur.
- Pair with `IMPORTANCE_HIGH` (channel) / `PRIORITY_HIGH` (pre-26) so the notification also produces a heads-up banner.
- Reserve this feature for incoming calls and user-configured alarms; other use cases should use ordinary high-priority notifications instead.
- Artifact: `androidx.core:core`; `canUseFullScreenIntent()` is a platform `android.app.NotificationManager` API (API 34+), not currently mirrored on `NotificationManagerCompat`.

## Related

- [notification-builder](./notification-builder.md)
- [notification-channels](./notification-channels.md)
- [notification-navigation](./notification-navigation.md)
