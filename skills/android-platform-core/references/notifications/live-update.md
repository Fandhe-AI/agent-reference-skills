# Live Update notifications

Android 16 (API level 36) notification category for ongoing, user-initiated tasks (navigation, calls, rideshare, delivery). Live Updates are promoted (pinned) notifications rendered as a persistent status-bar chip and given elevated visibility on the lock screen; the underlying content is a normal notification (built with the platform `Notification.Builder` or `NotificationCompat.Builder`) plus one of a small set of supported styles.

## Signature / Usage

```kotlin
val notification = Notification.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_ride)
    .setContentTitle("Driver is 5 min away")
    .setShortCriticalText("5 min")
    .setOngoing(true) // FLAG_ONGOING_EVENT
    .setRequestPromotedOngoing(true)
    .setStyle(Notification.ProgressStyle() /* or BigTextStyle/CallStyle/MetricStyle */)
    .setColorized(false) // must NOT be true
    .build()

notificationManager.notify(notificationId, notification)
```

```xml
<!-- AndroidManifest.xml — non-runtime permission -->
<uses-permission android:name="android.permission.POST_PROMOTED_NOTIFICATIONS"/>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setRequestPromotedOngoing(Boolean)` | `Boolean` | `false` | Requests promotion of this notification to a Live Update; equivalent to setting the `EXTRA_REQUEST_PROMOTED_ONGOING` extra directly. |
| `setShortCriticalText(String)` | `String` | — | Short text conveyed in the status-bar chip alongside the icon. |
| `setUsesChronometer(Boolean)` / `setChronometerCountDown(Boolean)` | `Boolean` | `false` | Drives a running or counting-down timer shown in the chip in place of static text. |
| `setWhen(Long)` / `setShowWhen(Boolean)` | `Long` / `Boolean` | — | Absolute time backing the chip's countdown display. |
| `setDeleteIntent(PendingIntent)` | `PendingIntent` | — | Fired when the user dismisses the Live Update, so the app can stop treating it as active. |

## Notes

- **Eligibility requirements** (all must hold): style is Standard, `BigTextStyle`, `CallStyle`, `ProgressStyle`, or `MetricStyle`; manifest declares `POST_PROMOTED_NOTIFICATIONS`; promotion requested via `setRequestPromotedOngoing(true)` (or `EXTRA_REQUEST_PROMOTED_ONGOING`); `setOngoing(true)` / `FLAG_ONGOING_EVENT`; `contentTitle` is set; the notification channel does **not** use `IMPORTANCE_MIN`. Must **not**: set a custom `RemoteViews` via `setCustomContentView()`, be a group summary (`setGroupSummary(true)`), or `setColorized(true)`.
- **Status-bar chip**: max width 96dp, always shows the small icon; text under 7 characters is shown in full, longer text is shown only if it fits (otherwise icon-only) or truncated past ~50% fit. A future countdown of 2+ minutes shows remaining time (e.g. "5min"); a past time shows no text.
- To check whether the system will actually promote the notification, see `Notification.hasPromotableCharacteristics()` and `NotificationManager.canPostPromotedNotifications()` — covered on the promoted-notifications page, along with the `FLAG_PROMOTED_ONGOING` flag and the permission itself.
- OEMs can impose additional eligibility criteria beyond the platform's own list.
- Live Updates bridge to some connected Wear OS devices.
- Valid use cases: active navigation, ongoing calls, rideshare/delivery tracking. Not for ads, chat messages, alerts, upcoming calendar events, or low-urgency package tracking.
- The official guide documents `setRequestPromotedOngoing()` as available on `NotificationCompat.Builder` as well as the platform `Notification.Builder`; the other Live Update–specific methods here (`setShortCriticalText()`, chronometer/`setWhen()` controls) are documented against the platform `Notification.Builder`. The feature is only meaningful on Android 16 (API level 36) and above regardless of which builder exposes a given method. Artifact: `androidx.core:core` for the Compat surface, platform SDK for the rest.

## Related

- [promoted-notifications](./promoted-notifications.md)
- [notification-progress](./notification-progress.md)
- [metric-style](./metric-style.md)
- [notification-builder](./notification-builder.md)
