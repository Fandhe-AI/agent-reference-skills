# Identify and Optimize Wake Lock Use Cases

Reference of wake lock name patterns reported by debugging tools and Play vitals, mapped to the API/service that acquired them, with per-source optimization recommendations.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `*alarm*` | wake lock name | — | Acquired by `AlarmManager` when an alarm fires; released when `onReceive()` completes. Prefer inexact alarms, mind alarm quotas, avoid lengthy `onReceive()` work. |
| `AudioBitPerfect`, `AudioDirectOut`, `AudioDup`, `AudioIn`, `AudioMix`, `AudioOffload`, `AudioSpatial`, `AudioUnknown`, `MmapCapture`, `MmapPlayback` | wake lock names | — | Held by audio/media APIs for playback, capture, or offload scenarios; don't declare these manually, rely on the media APIs, and end sessions/foreground services when done. |
| `GOOGLE_C2DM` (Android 15-) / `GCM_MESSAGE` (Android 16+) | wake lock name | — | Held by Firebase Cloud Messaging until `onMessageReceived()` completes; avoid unnecessary high-priority FCM and finish `onMessageReceived()` quickly, deferring extra work to a worker. |
| `*job*u/@<namespace>@/<package_name>/<classname>` etc. | wake lock name pattern | — | Held by `JobScheduler` jobs (user-initiated/expedited/regular variants differ by Android version); use the [UIDT API](./user-initiated-data-transfer.md) for user-initiated transfers and inspect `JobParameters.getStopReason()`. |
| `*job*/<package_name>/androidx.work.impl.background.systemjob.SystemJobService` etc. | wake lock name pattern | — | Held by `WorkManager` jobs (it schedules through `JobScheduler`); set `WorkRequest.Builder.setTraceTag()` for a readable tag on Android 16 QPR2+, and inspect worker stop reasons. |
| `CollectionLib-SigCollector`, `NetworkLocationLocator`, `NetworkLocationScanner`, `NlpCollectorWakeLock`, `NlpWakeLock`, `*location*` | wake lock names | — | Held by location APIs; use timeouts and batching, and avoid acquiring separate wake locks just to cache locations. |
| `_UNKNOWN` | wake lock name | — | Reported when the real wake lock name contains PII, which debugging tools hide; fix by following wake lock naming best practices. |

## Notes

- Bluetooth and remote-messaging (socket/network-event) wakeups are mostly kernel wake locks and are not attributable to a specific app; avoid acquiring app-level wake locks just to listen for network events.
- Device sensor use cases should prefer `SensorManager` batching (`maxReportLatencyUs` > 30s) or higher-level APIs (Health Connect, Recording API, Wear Health Services) over manual wake locks.
- See [Follow wake lock best practices](./wakelock-best-practices.md#name) for how to avoid the `_UNKNOWN` name.

## Related

- [WakeLock and PowerManager](./wakelock.md)
- [Follow wake lock best practices](./wakelock-best-practices.md)
- [Debug wake locks locally](./wakelock-debug-locally.md)
- [JobScheduler](./jobscheduler.md)
- [User-Initiated Data Transfer Jobs](./user-initiated-data-transfer.md)
