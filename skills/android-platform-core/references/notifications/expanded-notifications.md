# Expandable notification styles

Five `NotificationCompat` style classes that expand the collapsed notification into a larger view: `BigTextStyle`, `BigPictureStyle`, `InboxStyle`, `MessagingStyle`, and `MediaStyle`. Applied via `setStyle()` on a basic notification.

## Signature / Usage

```kotlin
// BigTextStyle
NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("Sender name")
    .setContentText("Email subject")
    .setStyle(NotificationCompat.BigTextStyle().bigText(someVeryLongMessage))
    .build()

// MessagingStyle
NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setStyle(
        NotificationCompat.MessagingStyle(Person.Builder().setName("Me").build())
            .addMessage(message1)
            .addMessage(message2)
    )
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `BigPictureStyle#bigPicture(Bitmap)` | `Bitmap` | — | Large image shown when expanded. |
| `BigPictureStyle#bigLargeIcon(Bitmap?)` | `Bitmap?` | — | Icon override/hide when expanded (pass `null` to hide). |
| `BigTextStyle#bigText(CharSequence)` | `CharSequence` | — | Long text block (supports HTML markup for bold/italic/line breaks). |
| `InboxStyle#addLine(CharSequence)` | `CharSequence` | — | Adds a summary line; only the first 6 are shown. |
| `MessagingStyle(Person)` | `Person` | — | Constructs the style with the local user's `Person`. |
| `MessagingStyle#addMessage(Message)` | `Message` | — | Adds a message (text, timestamp, sender) to the thread. |
| `MessagingStyle#setConversationTitle(CharSequence)` | `CharSequence` | — | Group conversation title; omit for one-on-one chats. |
| `MediaStyleNotificationHelper.MediaStyle(mediaSession)` | media session | — | Media-style layout; pair with `addAction()` for transport controls. |
| `MediaStyle#setShowActionsInCompactView(vararg Int)` | `IntArray` | — | Indices (up to 3) of actions shown in the collapsed view. |

## Notes

- `MessagingStyle` **ignores** `setContentTitle()` / `setContentText()`; content comes entirely from added messages. Compatible API 24+, with automatic fallback on older versions.
- `InboxStyle` shows a maximum of 6 lines even if more are added.
- `MediaStyle` supports up to 5 `addAction()` calls (transport controls); `setCategory()` is automatically set to `CATEGORY_TRANSPORT`. When using AndroidX Media3, notifications for playback are created automatically by the library instead — see the `android-media-camera` skill's `MediaNotification.Provider` for that path; this page only documents the general `MediaStyle` shape.
- For conversation notifications built on `MessagingStyle` (linked to a `ShortcutInfoCompat`), see [notification-badges](./notification-badges.md).
- Custom (non-template) layouts use `NotificationCompat.DecoratedCustomViewStyle` with `setCustomContentView()` / `setCustomBigContentView()` and `RemoteViews`; fully undecorated custom notifications are discouraged and unsupported on API 31+ (Android 12).
- Artifact: `androidx.core:core`.

## Related

- [notification-builder](./notification-builder.md)
- [notification-actions](./notification-actions.md)
- [notification-groups](./notification-groups.md)
- [notification-badges](./notification-badges.md)
