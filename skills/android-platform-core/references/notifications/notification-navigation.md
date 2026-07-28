# Notification tap navigation (TaskStackBuilder)

Controls what happens when a user taps a notification: launching a regular activity with a synthetic back stack, or a special activity dedicated to the notification.

## Signature / Usage

```kotlin
// Regular activity: build a synthetic back stack
val resultIntent = Intent(context, ResultActivity::class.java)
val resultPendingIntent: PendingIntent? = TaskStackBuilder.create(context).run {
    addNextIntentWithParentStack(resultIntent)
    getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
}

builder.setContentIntent(resultPendingIntent)
```

```kotlin
// Special activity: no back stack, launched only from the notification
val notifyIntent = Intent(context, ResultActivity::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
}
val notifyPendingIntent = PendingIntent.getActivity(
    context, 0, notifyIntent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `TaskStackBuilder.create(Context)` | static factory | — | Creates a builder for constructing a synthetic back stack. |
| `addNextIntentWithParentStack(Intent)` | `Intent` | — | Inflates the back stack using `android:parentActivityName` declared in the manifest. |
| `getPendingIntent(requestCode, flags)` | `(Int, Int)` | — | Returns a `PendingIntent` covering the whole constructed stack. |

## Notes

- **Regular activity**: part of the app's normal navigation flow. Declare `android:parentActivityName` on the target activity in `AndroidManifest.xml` so `addNextIntentWithParentStack()` can build the hierarchy; tapping Back walks up through the app to Home, and the task appears normally in Recents.
- **Special activity**: only reachable from the notification, extends the notification's UI, and needs no back stack. Configure it in the manifest with `android:taskAffinity=""` and `android:excludeFromRecents="true"`, and launch it with `FLAG_ACTIVITY_NEW_TASK | FLAG_ACTIVITY_CLEAR_TASK` instead of `TaskStackBuilder`.
- `AndroidManifest.xml` activity declarations in general (intent filters, exported, etc.) are covered by the `manifest-resources` category of this skill; this page only documents the notification-navigation-specific attributes.
- General `PendingIntent` construction/flags are documented in the `android-background-work` skill; this page covers only the navigation-specific call pattern.
- Artifact: `androidx.core:core` (`androidx.core.app.TaskStackBuilder`).

## Related

- [notification-builder](./notification-builder.md)
- [full-screen-intent](./full-screen-intent.md)
