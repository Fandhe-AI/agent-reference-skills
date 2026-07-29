# Promoted notifications (FLAG_PROMOTED_ONGOING)

Android 16 (API level 36) mechanism that lets the system pin an eligible ongoing notification to elevated surfaces (status-bar chip, lock screen) as a Live Update. `Notification.FLAG_PROMOTED_ONGOING` is the flag the system sets on a notification once it decides to promote it; a matching manifest permission and a set of query APIs let an app request and check that promotion.

## Signature / Usage

```xml
<!-- AndroidManifest.xml — required, non-runtime permission -->
<uses-permission android:name="android.permission.POST_PROMOTED_NOTIFICATIONS"/>
```

```kotlin
// Ask whether the system will consider promoting this notification
// (ignores whether the user disabled Live Updates for the app).
val canPromote = notification.hasPromotableCharacteristics()

// Ask whether the app is currently allowed to post promoted notifications
// (does consider the user's Settings toggle).
val allowed = notificationManager.canPostPromotedNotifications()

// Send the user to the Settings screen for this feature.
startActivity(Intent(Settings.ACTION_MANAGE_APP_PROMOTED_NOTIFICATIONS))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Notification.FLAG_PROMOTED_ONGOING` | flag (`Int`) | — | Set by the system on a `Notification` instance once it has actually been promoted; read-only signal, not something the app sets directly. |
| `Notification#hasPromotableCharacteristics()` | `Boolean` | — | Whether the notification meets the structural requirements for promotion (style, `ongoing`, `contentTitle`, no custom `RemoteViews`/group-summary/`colorized`, channel not `IMPORTANCE_MIN`). Ignores the user's per-app Live Updates setting. |
| `NotificationManager#canPostPromotedNotifications()` | `Boolean` | — | Whether the app can currently post a promoted notification, taking the user's Settings toggle into account. |
| `Settings.ACTION_MANAGE_APP_PROMOTED_NOTIFICATIONS` | intent action | — | Deep-links to the system Settings screen where the user enables/disables promoted notifications for the app. |

## Notes

- `POST_PROMOTED_NOTIFICATIONS` is a normal (non-runtime) manifest permission — no runtime prompt, unlike `POST_NOTIFICATIONS`.
- Actually requesting promotion on a given notification is done via `NotificationCompat.Builder#setRequestPromotedOngoing(true)` (or the `EXTRA_REQUEST_PROMOTED_ONGOING` extra); the full eligibility checklist lives on the Live Update page since the two features share one requirements list.
- OEMs may layer additional eligibility criteria on top of the platform's own checks.
- The guide does not spell out whether `ACTION_MANAGE_APP_PROMOTED_NOTIFICATIONS` needs an app-package extra (similar per-app settings intents, e.g. `ACTION_APP_NOTIFICATION_SETTINGS`, require one) — check the current `Settings` reference before shipping this intent.
- Artifact: `android.app.Notification` (platform) for the flag and `hasPromotableCharacteristics()`; `android.app.NotificationManager` for `canPostPromotedNotifications()`. Neither is part of `androidx.core` `NotificationCompat`/`NotificationManagerCompat` at the time of writing.

## Related

- [live-update](./live-update.md)
- [notification-permission](./notification-permission.md)
- [notification-manager](./notification-manager.md)
