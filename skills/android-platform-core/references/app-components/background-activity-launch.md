# Background activity launch (BAL) restrictions

The platform restricts activities from being started while an app is in the background, to protect users from UI hijacking, phishing, tapjacking, and unwanted app awakening. `ActivityOptions` opt-in flags let a `PendingIntent` sender and creator explicitly grant background-launch privileges for legitimate cases (e.g. notification taps).

## Signature / Usage

```kotlin
// Sender side (required when the sending app targets Android 14 / API 34+)
val options = ActivityOptions.makeBasic().apply {
    pendingIntentBackgroundActivityStartMode = ActivityOptions.MODE_BACKGROUND_ACTIVITY_START_ALLOW_IF_VISIBLE
}

try {
    myPendingIntent.send(options.toBundle())
} catch (e: PendingIntent.CanceledException) {
    Log.e(TAG, "The PendingIntent was canceled", e)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ActivityOptions.setPendingIntentBackgroundActivityStartMode()` | method | — | Sender-side opt-in on the `ActivityOptions` passed to `PendingIntent.send()`; required when the sending app targets Android 14 (API 34) or higher, which no longer grants BAL privileges to a sent `PendingIntent` by default. |
| `MODE_BACKGROUND_ACTIVITY_START_ALLOW_IF_VISIBLE` | constant | — | Grants BAL privilege only if the sending app has a visible window at send time; the safer, recommended mode. |
| `MODE_BACKGROUND_ACTIVITY_START_ALLOWED` | constant | — | Always grants BAL privilege regardless of visibility; reserve for cases where the sender is genuinely not visible (e.g. a `BroadcastReceiver`). |
| `ActivityOptions.setPendingIntentCreatorBackgroundActivityStartMode()` | method | — | Creator-side opt-in set when building the `PendingIntent`; required when the creating app targets Android 15 (API 35) or higher, which no longer grants its own BAL privileges to a created `PendingIntent` by default. |
| `Context.startIntentSender()` | method | — | Also subject to sender-side opt-in starting with Android 14 (API 34); `ActivityResultLauncher<IntentSenderRequest>` uses this internally and is affected the same way. |
| `IntentSender.sendIntent()` | method | — | Requires sender-side opt-in starting with Android 17 (API 37+). |
| `android:allowCrossUidActivitySwitchFromBelow` | manifest attribute (`<application>`) | — | Task-hijacking-prevention control: set `false` to opt an app targeting API 37+ into the rule that an activity can only be launched, within a task, by another activity sharing the top-most activity's UID. |
| `setAllowCrossUidActivitySwitchFromBelow()` | `Activity` method | — | Per-activity exemption from the cross-UID task-switch restriction, called from `onCreate()`. |
| `StrictMode.VmPolicy.Builder().detectBlockedBackgroundActivityLaunch()` | method | — | Starting with Android 16, logs (`penaltyLog()`) when an activity launch is blocked or at risk of being blocked once the app's target SDK is raised. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Android 15 introduces the in-task "hijacking" prevention rules, but they only take effect for apps targeting API level 37 or higher.
- An activity can still be started from the background without any opt-in when it comes from a visible app window, the current IME, the device launcher, a `SYSTEM_ALERT_WINDOW`-holding app, the `START_ACTIVITIES_FROM_BACKGROUND` permission, or core OS components (e.g. the incoming-call screen).
- For long-running work that needs to interact with the user without launching an activity from the background, prefer a foreground service with a persistent notification instead of working around BAL.
- Filter Logcat by the `ActivityTaskManager` tag for `"Background activity launch blocked!"` diagnostics; the log includes `realCallingPackage` (sender) and `callingPackage` (creator).

## Related

- [Activity](./activity.md)
- [Intent](./intent.md)
- [Package visibility](./package-visibility.md)
