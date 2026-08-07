# Troubleshoot foreground services

Common exceptions and ANR crashes thrown by foreground services, their causes, and how to fix them.

## Signature / Usage

```
Fatal Exception: android.app.RemoteServiceException: "A foreground service of
    type FOREGROUND_SERVICE_TYPE_SHORT_SERVICE did not stop within its timeout:
    [component name]"
```

## Notes

- `shortService` runs too long: the type has a ~3-minute limit; when it expires the system calls `Service.onTimeout(int, int)`, and if the service doesn't call `stopSelf()` in time the system crashes it with a `RemoteServiceException` ("did not stop within its timeout"). The same pattern applies to `dataSync`/`mediaProcessing` services that exceed their system time limit while the app is in the background (see [Foreground service time limits](./foreground-service-timeout.md)); fix by implementing `onTimeout()` to call `stopSelf()`/`stopForeground()` promptly.
- `ForegroundServiceDidNotStartInTimeException`: thrown when a service launched via `context.startForegroundService()` fails to call `ServiceCompat.startForeground()` within the time limit. Logcat shows `Context.startForegroundService() did not then call Service.startForeground()`. Fixed for overlapping WorkManager workers in WorkManager 2.10.5+.
- `ForegroundServiceStartNotAllowedException`: thrown on Android 12+ when the app tries to start a foreground service from the background without a valid exemption — commonly when the user triggers a launch and the app is backgrounded before the service actually starts, or an exemption (e.g. a high-priority FCM message) has a short validity window. See [Foreground service launch restrictions](./foreground-service-restrictions.md).
- `SecurityException`: thrown when the app is missing `FOREGROUND_SERVICE` (required since Android 9/API 28), missing a type-specific permission such as `FOREGROUND_SERVICE_REMOTE_MESSAGING` (required for apps targeting Android 14/API 34+, see [foregroundServiceType](./foreground-service-types.md)), or when a required while-in-use permission (camera, microphone, location) was not actually granted at runtime before the service launched.
- Before debugging further, check [Changes to foreground services](./fgs-changes.md) for a behavior change matching the app's target SDK version or the platform release being tested against — this is the first thing to check when previously working code starts failing.
- Diagnostic tools: Logcat for the exact exception message, Android Studio stack traces, and ANR reports for `RemoteServiceException` traces.

## Related

- [Foreground service](./foreground-service.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
- [Foreground service launch restrictions](./foreground-service-restrictions.md)
- [Changes to foreground services](./fgs-changes.md)
