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
- Background-start exemptions: user-visible transition from an activity or similarly visible component; background-activity-start capability; a high-priority FCM message (`RemoteMessage.getPriority() == PRIORITY_HIGH`); user interaction with a bubble, notification, widget, or activity; an exact alarm invoked to complete a user-requested action; being the device's current input method; geofencing/activity-recognition callbacks; system broadcasts such as `ACTION_BOOT_COMPLETED`, `ACTION_LOCKED_BOOT_COMPLETED`, `ACTION_MY_PACKAGE_REPLACED`, `ACTION_TIMEZONE_CHANGED`, `ACTION_TIME_CHANGED`, `ACTION_LOCALE_CHANGED` (API 34+/Android 14+ restricts some foreground service types from `BOOT_COMPLETED`); `ACTION_TRANSACTION_DETECTED` from `NfcService`; and device/profile owner, Companion Device Manager (`REQUEST_COMPANION_START_FOREGROUND_SERVICES_FROM_BACKGROUND`, preferred, or `REQUEST_COMPANION_RUN_IN_BACKGROUND`), battery-optimization exemption, or `SYSTEM_ALERT_WINDOW` status.
- API 34+ (Android 14+): foreground services requiring while-in-use permissions (camera, microphone, location, body sensors) additionally cannot be *created* from the background even under an exemption above; the system throws `SecurityException` immediately. On API 33 (Android 13) and below, the service was created but lacked runtime access instead.
- Additional exemptions specific to while-in-use permissions: system component start, widget/notification interaction, a visible app's `PendingIntent`, device policy controller, `VoiceInteractionService`, or holding `START_ACTIVITIES_FROM_BACKGROUND`.
- A `location`-typed service started under an exemption plus `ACCESS_BACKGROUND_LOCATION` may access location continuously even in the background.
- Logcat prints `Foreground service started from background can not have location/camera/microphone access: service SERVICE_NAME` when access is restricted.
- Apps targeting Android 15 or higher qualify through `SYSTEM_ALERT_WINDOW` only while they currently have a visible overlay window.
- A high-priority FCM message can be downgraded to normal priority; then starting a foreground service throws `ForegroundServiceStartNotAllowedException`, so check `RemoteMessage.getPriority()` first.
- If one app calls `Context.startForegroundService()` for a service owned by another app, these restrictions apply only when both apps target Android 12 or higher.
- `PermissionChecker.checkSelfPermission()` returns `PERMISSION_GRANTED` for a while-in-use permission even in the background, so it does not prevent the exception; the `SecurityException` for a background health service applies when it needs `BODY_SENSORS` (not when it needs `ACTIVITY_RECOGNITION`).
- Source: https://developer.android.com/develop/background-work/services/fgs/restrictions-bg-start (fetched 2026-11-14)

## Related

- [Foreground service](./foreground-service.md)
- [foregroundServiceType](./foreground-service-types.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
