# Foreground service time limits (Android 15+)

For apps targeting Android 15 (API 35) or higher, `dataSync`, `mediaProcessing`, and `shortService` foreground services are subject to running-time limits while the app is in the background.

## Signature / Usage

```bash
# Enable the time-limit behavior on a device even if the app doesn't yet target API 35
adb shell am compat enable FGS_INTRODUCE_TIME_LIMITS your-package-name

# Adjust the timeout duration for testing (milliseconds)
adb shell device_config put activity_manager data_sync_fgs_timeout_duration <ms>
adb shell device_config put activity_manager media_processing_fgs_timeout_duration <ms>
```

## Notes

- Limits by type: `dataSync` — 6 hours per rolling 24-hour period, shared across all of the app's `dataSync` services. `mediaProcessing` — 6 hours per rolling 24-hour period, tracked independently from `dataSync`. `shortService` — about 3 minutes from `startForeground()`, per service instance (see [foregroundServiceType](./foreground-service-types.md)).
- When the limit is reached, the system calls `Service.onTimeout(int, int)`; the service has only a few seconds to call `stopSelf()` before the system throws a fatal `RemoteServiceException` ("did not stop within its timeout").
- The 6-hour timer resets whenever the user brings the app to the foreground; it does not reset merely by stopping and restarting the service in the background.
- Starting a `dataSync` service after its budget is exhausted (without the user reopening the app) throws `ForegroundServiceStartNotAllowedException` with message "Time limit already exhausted for foreground service type dataSync".
- Prefer starting `dataSync`/`mediaProcessing` foreground services as a direct result of user interaction so the full 6-hour window is available once the app backgrounds; consider `WorkManager` as an alternative for data sync work.

## Related

- [Foreground service](./foreground-service.md)
- [foregroundServiceType](./foreground-service-types.md)
- [Foreground service launch restrictions](./foreground-service-restrictions.md)
