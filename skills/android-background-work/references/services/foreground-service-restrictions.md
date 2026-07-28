# Foreground service launch restrictions

Rules that block apps from starting a foreground service while running in the background, introduced in Android 12 (API 31) and tightened in later releases.

## Signature / Usage

```kotlin
try {
    context.startForegroundService(intent)
} catch (e: Exception) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S &&
        e is ForegroundServiceStartNotAllowedException
    ) {
        // App was not in a state that allows starting a foreground service.
    }
}
```

## Notes

- API 31+ (Android 12+, targeting): apps targeting this level or higher throw `android.app.ForegroundServiceStartNotAllowedException` when calling `startForegroundService()`/`bindService()` from the background, unless one of the exemptions below applies.
- Background-start exemptions: user-visible transition from an activity or similarly visible component; background-activity-start capability; a high-priority FCM message (`RemoteMessage.getPriority() == PRIORITY_HIGH`); user interaction with a bubble, notification, widget, or activity; an exact alarm invoked to complete a user-requested action; being the device's current input method; geofencing/activity-recognition callbacks; system broadcasts such as `ACTION_BOOT_COMPLETED`, `ACTION_MY_PACKAGE_REPLACED`, `ACTION_TIMEZONE_CHANGED` (API 34+/Android 14+ restricts some foreground service types from `BOOT_COMPLETED`); and device/profile owner, Companion Device Manager, battery-optimization exemption, or `SYSTEM_ALERT_WINDOW` status.
- API 34+ (Android 14+): foreground services requiring while-in-use permissions (camera, microphone, location, body sensors) additionally cannot be *created* from the background even under an exemption above; the system throws `SecurityException` immediately. On API 33 (Android 13) and below, the service was created but lacked runtime access instead.
- Additional exemptions specific to while-in-use permissions: system component start, widget/notification interaction, a visible app's `PendingIntent`, device policy controller, `VoiceInteractionService`, or holding `START_ACTIVITIES_FROM_BACKGROUND`.
- A `location`-typed service started under an exemption plus `ACCESS_BACKGROUND_LOCATION` may access location continuously even in the background.
- Logcat prints `Foreground service started from background can not have location/camera/microphone access: service SERVICE_NAME` when access is restricted.

## Related

- [Foreground service](./foreground-service.md)
- [foregroundServiceType](./foreground-service-types.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
