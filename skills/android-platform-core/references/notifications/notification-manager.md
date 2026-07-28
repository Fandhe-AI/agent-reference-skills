# NotificationManagerCompat

Posts, updates, and cancels notifications. Each notification is identified by an integer ID (plus an optional tag), which is reused to update or remove it later.

## Signature / Usage

```kotlin
val notificationManager = NotificationManagerCompat.from(context)
notificationManager.notify(notificationId, builder.build())

// later, to update:
notificationManager.notify(notificationId, updatedBuilder.build())

// to remove:
notificationManager.cancel(notificationId)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `NotificationManagerCompat.from(Context)` | static factory | — | Returns the manager instance for the given context. |
| `notify(Int, Notification)` | `(id: Int, notification: Notification)` | — | Posts or updates a notification with the given ID. |
| `notify(String, Int, Notification)` | `(tag: String, id: Int, notification: Notification)` | — | Same as above, scoped by an additional string tag. |
| `cancel(Int)` | `(id: Int)` | — | Removes the notification with the given ID. |
| `cancelAll()` | — | — | Removes all of this app's notifications. |
| `areNotificationsEnabled()` | `Boolean` | — | Whether the user has notifications enabled for the app overall. |

## Notes

- Save the ID passed to `notify()` — it's required to update the same notification in place or cancel it later.
- On API 33+, `notify()` requires the runtime `POST_NOTIFICATIONS` permission; check it before calling or the call is a no-op. See [notification-permission](./notification-permission.md).
- On API 26+, the target notification channel must already exist (see [notification-channels](./notification-channels.md)) or the notification does not display.
- Android rate-limits update frequency to avoid excessive interruptions.
- Artifact: `androidx.core:core`.

## Related

- [notification-builder](./notification-builder.md)
- [notification-channels](./notification-channels.md)
- [notification-permission](./notification-permission.md)
