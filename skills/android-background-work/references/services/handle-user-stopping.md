# Handle user-initiated stopping of foreground services

Starting in Android 13 (API 33), the notification drawer's Task Manager lets users stop an app that has an ongoing foreground service — regardless of the app's target SDK version — from an **Active apps** list with a **Stop** button per app.

## Signature / Usage

```kotlin
// The system sends no callback when the user taps Stop. Check for it on next launch instead.
val reason = context.getSystemService(ActivityManager::class.java)
    .getHistoricalProcessExitReasons(null, 0, 1)
    .firstOrNull()

if (reason?.reason == ApplicationExitInfo.REASON_USER_REQUESTED) {
    // App was stopped by the user via Task Manager; adjust restart/resume behavior.
}
```

```bash
# Simulate a Task Manager stop for testing
adb shell cmd activity stop-app PACKAGE_NAME
```

## Notes

- Pressing **Stop** kills the entire app process (not just the foreground service): it clears the activity back stack, stops media playback, and removes the foreground service's notification. The app remains in device history.
- Scheduled `WorkManager`/`JobScheduler` jobs still execute at their scheduled time, and `AlarmManager` alarms still fire at their scheduled time or window, even after the app was stopped this way.
- This is a distinct mechanism from the system-imposed `dataSync`/`mediaProcessing`/`shortService` running-time limits: those call `Service.onTimeout(int, int)` on the running service (see foreground-service-timeout.md); a user-initiated Task Manager stop delivers no callback at all and simply terminates the process.
- Detect a prior user stop via `ApplicationExitInfo.REASON_USER_REQUESTED`, read from `ActivityManager.getHistoricalProcessExitReasons()`.

## Related

- [Foreground service](./foreground-service.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
- [Foreground service launch restrictions](./foreground-service-restrictions.md)
