# Notification badges and conversations

Launcher icon badges (notification dots) since Android 8.0 (API 26), plus conversation notifications that surface in the dedicated Conversation Space and can be linked to a `ShortcutInfoCompat`.

## Signature / Usage

```kotlin
// Disable badging on a channel
val channel = NotificationChannel(id, name, importance).apply {
    setShowBadge(false)
}

// Custom badge count and icon
NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentTitle("New Messages")
    .setContentText("You've received 3 new messages.")
    .setSmallIcon(R.drawable.ic_notify_status)
    .setNumber(messageCount)
    .setBadgeIconType(NotificationCompat.BADGE_ICON_SMALL)
    .build()
```

```kotlin
// Conversation notification linked to a long-lived shortcut
val person = Person.Builder().setName("Jane Doe").setIcon(icon).build()

val shortcut = ShortcutInfoCompat.Builder(context, "conversation_1")
    .setShortLabel("Jane Doe")
    .setIcon(shortcutIcon)
    .setPerson(person)
    .setLongLived(true)
    .setIsConversation()
    .build()
ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)

NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setStyle(
        NotificationCompat.MessagingStyle(Person.Builder().setName("Me").build())
            .addMessage("Hi there!", System.currentTimeMillis(), person)
    )
    .setCategory(NotificationCompat.CATEGORY_MESSAGE)
    .setShortcutId("conversation_1")
    .setPriority(NotificationCompat.PRIORITY_HIGH)
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `NotificationChannel#setShowBadge(Boolean)` | `Boolean` | `true` | Whether notifications on this channel contribute a launcher badge. |
| `setNumber(Int)` | `Int` | — | Overrides the default notification count shown in the badge/menu. |
| `setBadgeIconType(Int)` | `Int` | `BADGE_ICON_LARGE` | Icon shown in the touch-and-hold menu: `BADGE_ICON_NONE`, `BADGE_ICON_SMALL`, `BADGE_ICON_LARGE`. |
| `setShortcutId(String)` | `String` | — | Links the notification to a `ShortcutInfoCompat` — required for conversation notifications; also hides the duplicate app shortcut while the notification is active. |
| `ShortcutInfoCompat.Builder#setLongLived(Boolean)` | `Boolean` | `false` | Required (`true`) for a shortcut to back a conversation notification. |
| `ShortcutInfoCompat.Builder#setIsConversation()` | — | — | API 30+ (Android 11). Marks the shortcut as representing a conversation. |
| `ShortcutInfoCompat.Builder#setPerson(Person)` | `Person` | — | Associates the conversation participant. |
| `ShortcutInfoCompat.Builder#setLocusId(LocusIdCompat)` | `LocusIdCompat` | — | Recommended; improves system ranking and interaction timestamps. |

## Notes

- **API 26+**: badges appear by default on supporting launchers; disable per-channel with `setShowBadge(false)` (useful for ongoing/media/alarm/calendar notifications).
- **Conversation requirements (API 30+/Android 11)**: a notification counts as a conversation when it (1) uses `MessagingStyle`, (2) is linked via `setShortcutId()`/`setShortcutInfo()` to a valid long-lived shortcut, and (3) the user hasn't demoted it in settings. Meeting these requirements is also what allows the notification to be promoted to a bubble.
- Set `setCategory(NotificationCompat.CATEGORY_MESSAGE)` on conversation notifications; on API ≤29 without a linked shortcut, the system falls back to an older visual style with no bubble support.
- Use `ShortcutManagerCompat.pushDynamicShortcut()` to publish/update conversation shortcuts, and avoid removing cached shortcuts once created.
- Don't cancel a conversation notification before the user has seen it.
- Artifact: `androidx.core:core` (badges), `androidx.core:core` + `androidx.core.content.pm.ShortcutInfoCompat` (conversations).

## Related

- [notification-channels](./notification-channels.md)
- [expanded-notifications](./expanded-notifications.md)
