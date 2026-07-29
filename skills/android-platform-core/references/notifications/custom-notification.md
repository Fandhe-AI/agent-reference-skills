# Custom notification layouts (RemoteViews)

Fully or partially custom notification content built from a `RemoteViews` layout instead of a built-in style. `NotificationCompat.DecoratedCustomViewStyle` (or `DecoratedMediaCustomViewStyle` for media playback) wraps the custom view in the standard system decoration (icon, expand affordance); omitting it produces an undecorated notification, which is discouraged.

## Signature / Usage

```kotlin
val notificationLayout = RemoteViews(packageName, R.layout.notification_small)
val notificationLayoutExpanded = RemoteViews(packageName, R.layout.notification_large)

val customNotification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.notification_icon)
    .setStyle(NotificationCompat.DecoratedCustomViewStyle())
    .setCustomContentView(notificationLayout)
    .setCustomBigContentView(notificationLayoutExpanded)
    .build()

notificationManager.notify(notificationId, customNotification)
```

```xml
<!-- res/layout/notification_small.xml — collapsed view -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <TextView
        android:id="@+id/notification_title"
        style="@style/TextAppearance.Compat.Notification.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Small notification, showing only a title" />
</LinearLayout>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setStyle(NotificationCompat.DecoratedCustomViewStyle())` | style | — | Wraps the custom `RemoteViews` in the standard system notification chrome. Use `DecoratedMediaCustomViewStyle` instead for media-playback notifications. |
| `setCustomContentView(RemoteViews)` | `RemoteViews` | — | Collapsed-state layout. |
| `setCustomBigContentView(RemoteViews)` | `RemoteViews` | — | Expanded-state layout, shown when the user expands the notification. |
| `setCustomHeadsUpContentView(RemoteViews)` | `RemoteViews` | — | Layout used for the heads-up (peek) presentation. |

## Notes

- The height available for a custom layout depends on the Android version: on some versions the collapsed view is limited to as little as 48dp, the heads-up view to as little as 88dp, and the expanded view to as little as 252dp. These are the caps a layout may be squeezed into, not minimum design heights.
- Use the Support Library text styles `TextAppearance.Compat.Notification.Title` / `TextAppearance.Compat.Notification.Line2` so custom text matches system notification typography; avoid background images on the `RemoteViews`, which tend to break text readability across themes.
- **Android 12 (API level 31) and higher**: apps can no longer render a fully custom (undecorated) notification — the system applies a standard template that behaves like `DecoratedCustomViewStyle` regardless of whether the style was set.
- A Live Update notification must **not** set a custom `RemoteViews` via `setCustomContentView()` — that alone disqualifies it from promotion.
- This is `android.widget.RemoteViews` used as notification content, not the app-widget `RemoteViews` path described in `glance-widgets` (Glance app widgets compile down to the same `RemoteViews` mechanism, but for the home-screen widget surface, not notifications).
- Artifact: `androidx.core:core`.

## Related

- [expanded-notifications](./expanded-notifications.md)
- [notification-builder](./notification-builder.md)
- [live-update](./live-update.md)
- [remoteviews-legacy](../glance-widgets/remoteviews-legacy.md)
