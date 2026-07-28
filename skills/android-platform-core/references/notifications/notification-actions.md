# Notification actions (addAction / RemoteInput)

Adds up to three action buttons to a notification, letting users respond without opening the app. Actions can trigger a `PendingIntent` directly, or capture inline text via `RemoteInput` for direct reply.

## Signature / Usage

```kotlin
// Simple action button
val snoozePendingIntent: PendingIntent =
    PendingIntent.getBroadcast(context, 0, snoozeIntent, PendingIntent.FLAG_IMMUTABLE)

val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .addAction(R.drawable.snooze, context.getString(R.string.snooze), snoozePendingIntent)

// Direct reply action
val remoteInput: RemoteInput = RemoteInput.Builder(KEY_TEXT_REPLY)
    .setLabel(replyLabel)
    .build()

val replyPendingIntent: PendingIntent =
    PendingIntent.getBroadcast(context, conversationId, replyIntent, PendingIntent.FLAG_MUTABLE)

val replyAction = NotificationCompat.Action.Builder(
    R.drawable.reply, context.getString(R.string.reply_label), replyPendingIntent
)
    .addRemoteInput(remoteInput)
    .build()

builder.addAction(replyAction)

// In the BroadcastReceiver handling replyIntent:
val replyText: CharSequence? = RemoteInput.getResultsFromIntent(intent)?.getCharSequence(KEY_TEXT_REPLY)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `addAction(icon, title, PendingIntent)` | `(Int, CharSequence, PendingIntent)` | — | Adds a simple action button. Up to 3 per notification. |
| `addAction(NotificationCompat.Action)` | `Action` | — | Adds a prebuilt action, e.g. one with an attached `RemoteInput`. |
| `RemoteInput.Builder(resultKey)` | `String` | — | Key used to retrieve the reply text from the result intent. |
| `RemoteInput.Builder#setLabel(CharSequence)` | `CharSequence` | — | Placeholder hint text shown in the reply field. |
| `RemoteInput.Builder#setAllowDataType(mimeType, Boolean)` | `(String, Boolean)` | — | Allows non-text results (e.g. `image/*`) alongside or instead of text. |
| `Action.Builder#addRemoteInput(RemoteInput)` | `RemoteInput` | — | Attaches the input definition to the action. |
| `Action.Builder#setAllowGeneratedReplies(Boolean)` | `Boolean` | `false` | Enables system Smart Reply suggestions. |

## Notes

- Action `PendingIntent`s typically target a `BroadcastReceiver` for background work; don't duplicate the action already triggered by tapping the notification body.
- Use a **unique request code per conversation** for reply `PendingIntent`s to avoid reusing/overwriting instances.
- Retrieve the typed text with `RemoteInput.getResultsFromIntent(intent)`; retrieve non-text data with `RemoteInput.getDataResultsFromIntent(intent, key)`.
- After handling a reply, update the existing notification (don't cancel it) — for messaging apps, prefer calling `MessagingStyle.addMessage()` and reposting. See [expanded-notifications](./expanded-notifications.md).
- Direct reply requires **API 24+ (Android 7.0)**; on lower API levels the action falls back to a normal tap-to-open action.
- For Wear OS, call `Action.WearableExtender.setHintDisplayInlineAction(true)`.
- General `PendingIntent` flag semantics (`FLAG_IMMUTABLE` / `FLAG_MUTABLE` / `FLAG_UPDATE_CURRENT`) are covered in the `android-background-work` skill; this page only documents notification-specific usage.
- Artifact: `androidx.core:core`.

## Related

- [notification-builder](./notification-builder.md)
- [expanded-notifications](./expanded-notifications.md)
- [notification-groups](./notification-groups.md)
