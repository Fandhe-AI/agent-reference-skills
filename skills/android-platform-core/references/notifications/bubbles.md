# Notification bubbles (BubbleMetadata)

Notification bubbles float on top of other app content and expand into an activity you choose. A notification becomes a bubble when `BubbleMetadata` is attached to it.

## Signature / Usage

Bubble activity declaration (must be resizeable and embedded):

```xml
<activity
  android:name=".bubbles.BubbleActivity"
  android:theme="@style/AppTheme.NoActionBar"
  android:label="@string/title_activity_bubble"
  android:allowEmbedded="true"
  android:resizeableActivity="true"
/>
```

Sending a bubble:

```kotlin
// Create a bubble intent.
val target = Intent(context, BubbleActivity::class.java)
val bubbleIntent =
    PendingIntent.getActivity(context, 0, target, PendingIntent.FLAG_IMMUTABLE /* flags */)
val category = "com.example.category.IMG_SHARE_TARGET"

val chatPartner = Person.Builder()
    .setName("Chat partner")
    .setImportant(true)
    .build()

// Create a sharing shortcut.
val shortcutId = generateShortcutId()
val shortcut =
    ShortcutInfoCompat.Builder(context, shortcutId)
        .setCategories(setOf(category))
        .setIntent(Intent(Intent.ACTION_DEFAULT))
        .setLongLived(true)
        .setShortLabel("Chat partner name")
        .build()
// Publish the shortcut, otherwise the bubble metadata will not apply.
ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)

// Create a bubble metadata.
val bubbleData = NotificationCompat.BubbleMetadata.Builder(bubbleIntent,
    IconCompat.createWithResource(context, R.drawable.ic_logo))
    .setDesiredHeight(600)
    .build()

// Create a notification, referencing the sharing shortcut.
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentIntent(contentIntent)
    .setSmallIcon(R.drawable.chat)
    .setBubbleMetadata(bubbleData)
    .setShortcutId(shortcutId)
    .addPerson(chatPartner)
```

Auto-expanded bubble (fragment; flags only):

```kotlin
val bubbleMetadata = NotificationCompat.BubbleMetadata.Builder()
    .setDesiredHeight(600)
    .setIntent(bubbleIntent)
    .setAutoExpandBubble(true)
    .setSuppressNotification(true)
    .build()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `BubbleMetadata.Builder(PendingIntent, Icon)` | constructor | Creates metadata from an explicit bubble intent and icon. |
| `BubbleMetadata.Builder(String)` | constructor | Creates metadata that references a shortcut ID. |
| `setBubbleMetadata()` | `Notification.Builder` method | Attaches the metadata to the notification. |
| `setDesiredHeight(int)` | method | Desired height of the expanded bubble. |
| `setAutoExpandBubble(boolean)` | method | Presents the bubble in expanded state automatically. Recommended only when the user action results in the bubble (e.g. starting a new chat). |
| `setSuppressNotification(boolean)` | method | Suppresses the initial notification; also removes the unread badge when the user has opened the message. |

## Notes

- The bubble activity must be resizeable and embedded; otherwise the system displays the notification as a normal notification.
- For multiple bubbles of the same type (e.g. several chats), the activity must be able to launch multiple instances. On Android 10 and lower, set `documentLaunchMode` to `"always"`; from Android 11 the system sets it automatically for all conversations.
- If targeting Android 11 (API level 30) or higher, the bubble metadata or notification must reference a sharing shortcut, and the notification must meet the conversation requirements to appear as a bubble.
- The official sending snippet omits `MessagingStyle`. To meet the conversation requirements on Android 11+, the notification needs a `Person` and messages via `NotificationCompat.MessagingStyle` set with `setStyle()` (conversation requirements: https://developer.android.com/guide/topics/ui/conversations). The bubbles page itself only links to the requirements without listing them, so confirm details there.
- The official snippet uses `PendingIntent.FLAG_IMMUTABLE` for the bubble intent. The PendingIntent mutability guide lists "Placing conversations in bubbles using instances of `PendingIntent`" as a use case that requires `FLAG_MUTABLE` ("A mutable `PendingIntent` object allows the system to apply the correct flags, such as `FLAG_ACTIVITY_MULTIPLE_TASK` and `FLAG_ACTIVITY_NEW_DOCUMENT`"), and recommends an explicit intent with the `ComponentName` filled in for mutable intents. Source: https://developer.android.com/guide/components/intents-filters (PendingIntent mutability section). The bubbles page does not state this, so verify against your target API level.
- The auto-expanded snippet is a fragment showing only the expand/suppress flags. `Builder()` with no arguments plus `setIntent()` still needs `setIcon()`; use the `Builder(bubbleIntent, IconCompat)` form from the first example or `Builder(shortcutId)`. (Not stated on the official page; based on the AndroidX `BubbleMetadata` builder contract, so verify before relying on it.)
- If targeting Android 10 (API level 29) or lower, a notification appears as a bubble only if one of: it uses `MessagingStyle` with a `Person`; it comes from `Service.startForeground` with `CATEGORY_CALL` and a `Person`; or the app is in the foreground when it is sent.
- The first notification that shows a bubble must be in a channel with `IMPORTANCE_MIN` or higher. If the app is in the foreground, importance is ignored and the bubble is always shown unless the user blocks bubbles or notifications.
- Do not cancel notifications that appear as bubbles: canceling removes the bubble. Opening a bubble hides its associated notification automatically.
- Users control bubbles: block all, allow selected (those bubbled via the bubble button), or allow all (all notifications with `BubbleMetadata`). As of Android 17, bubbles is formalized as a windowing mode (like split screen), so users can add any app to the bubble UI.
- Lifecycle: expanding a bubble runs the activity through the normal process lifecycle (app becomes a foreground process); collapsing or dismissing destroys the activity.
- Launching activities from a bubble: use the activity context (`activity.startActivity(intent)`) and do not set `FLAG_ACTIVITY_NEW_TASK` to stay in the same task and bubbled window; otherwise the activity starts in a new fullscreen task and the bubble collapses.
- Best practices: bubble only important notifications; ensure the notification still works as a normal notification when bubbles are disabled; use the `BackHandler` composable with `enabled` tied to UI state so the bubble collapses once the handler disables itself.
- To clear the unread badge on a collapsed bubble when the user opens the message, update `BubbleMetadata` with `setSuppressNotification()` and set `Notification.Builder.setOnlyAlertOnce(true)` to avoid sound or vibration.
- Sample app: SociaLite (https://github.com/android/socialite).
- Source: https://developer.android.com/develop/ui/compose/notifications/bubbles (fetched 2026-10-17)

## Related

- [notification-builder](./notification-builder.md)
- [notification-channels](./notification-channels.md)
- [call-style](./call-style.md)
