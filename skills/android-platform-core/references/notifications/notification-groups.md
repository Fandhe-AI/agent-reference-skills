# Notification grouping (setGroup / setGroupSummary)

Bundles related notifications so they collapse together under one summary while remaining individually expandable. Available since Android 7.0 (API level 24).

## Signature / Usage

```kotlin
val GROUP_KEY_WORK_EMAIL = "com.android.example.WORK_EMAIL"

val newMessageNotification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.new_mail)
    .setContentTitle(sender)
    .setContentText(subject)
    .setGroup(GROUP_KEY_WORK_EMAIL)
    .build()

val summaryNotification = NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentTitle("2 new messages")
    .setSmallIcon(R.drawable.ic_notify_summary_status)
    .setStyle(
        NotificationCompat.InboxStyle()
            .addLine("Alex Faarborg  Check this out")
            .addLine("Jeff Chang    Launch Party")
            .setSummaryText("janedoe@example.com")
    )
    .setGroup(GROUP_KEY_WORK_EMAIL)
    .setGroupSummary(true)
    .build()

NotificationManagerCompat.from(context).apply {
    notify(emailNotificationId1, newMessageNotification)
    notify(SUMMARY_ID, summaryNotification)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setGroup(String)` | `String` | `null` | Adds this notification to the given group key. |
| `setGroupSummary(Boolean)` | `Boolean` | `false` | Marks this notification as the group's summary (typically `InboxStyle`). |
| `setSortKey(String)` | `String` | — | Overrides default ordering (post time) within a group. |
| `setGroupAlertBehavior(Int)` | `Int` | `GROUP_ALERT_ALL` | Controls which notifications in the group alert: `GROUP_ALERT_ALL`, `GROUP_ALERT_SUMMARY`, `GROUP_ALERT_CHILDREN`. |

## Notes

- A summary notification (`setGroupSummary(true)`) is **required** to enable grouped display; without it, children are posted individually.
- The summary notification's ID must stay constant across updates so it can be reposted in place.
- On Android < 7.0 (API < 24) only the summary is shown; on API 24+ the summary appears as a nested group the user can expand to see individual notifications.
- If an app posts 4 or more notifications without specifying a group, the system automatically groups them on API 24+.
- Artifact: `androidx.core:core`.

## Related

- [notification-builder](./notification-builder.md)
- [expanded-notifications](./expanded-notifications.md)
