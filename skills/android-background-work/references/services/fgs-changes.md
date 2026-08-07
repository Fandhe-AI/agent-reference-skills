# Changes to foreground services

A per-Android-version summary of behavior changes and new requirements for foreground services, used as a reference when a target SDK bump breaks previously working code.

## Notes

- Android 16 (API 36): background jobs started from a foreground service (via `JobScheduler`, `WorkManager`, or `DownloadManager`) must adhere to their ordinary runtime quotas; use user-initiated data transfer jobs for user-triggered data transfer to stay exempt from those quotas.
- Android 15 (API 35), for apps targeting this level+: new timeout restrictions on `dataSync` and `mediaProcessing` service types (see [Foreground service time limits](./foreground-service-timeout.md)); `BOOT_COMPLETED`-triggered foreground services can no longer launch certain service types; `SYSTEM_ALERT_WINDOW` permission holders may only launch background foreground services while they have a visible overlay window.
- Android 14 (API 34), for apps targeting this level+: every foreground service must declare its `foregroundServiceType` and request the matching permission (e.g. a camera service needs both `FOREGROUND_SERVICE` and `FOREGROUND_SERVICE_CAMERA`); the system throws `SecurityException` if the type-specific permission is missing. See [foregroundServiceType](./foreground-service-types.md).
- Android 12 (API 31), for apps targeting this level+: apps cannot launch a foreground service while running in the background except under specific exemptions. See [Foreground service launch restrictions](./foreground-service-restrictions.md).
- Android 11 (API 30), for apps targeting this level+: foreground services using the camera or microphone must declare the corresponding `camera`/`microphone` service type.
- Android 10 (API 29), for apps targeting this level+: foreground services using location must declare the `location` service type.
- Android 9 (API 28): introduces the mandatory `FOREGROUND_SERVICE` permission; creating a foreground service without it throws `SecurityException`.
- When foreground service code that used to work starts failing, or when testing against a new platform release or a changed target API level, check this page first before deeper troubleshooting (see [Troubleshoot foreground services](./fgs-troubleshooting.md)).

## Related

- [Troubleshoot foreground services](./fgs-troubleshooting.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
- [Foreground service launch restrictions](./foreground-service-restrictions.md)
- [foregroundServiceType](./foreground-service-types.md)
