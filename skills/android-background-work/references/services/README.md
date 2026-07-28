# services

| Name | Description | Path |
|------|-------------|------|
| Service | Application component for long-running background work; lifecycle callbacks and started/bound modes. | [service.md](./service.md) |
| `<service>` manifest element | Manifest declaration required for every `Service` subclass. | [service-manifest.md](./service-manifest.md) |
| onStartCommand() return values | `START_STICKY` / `START_NOT_STICKY` / `START_REDELIVER_INTENT` restart semantics. | [start-command-return-values.md](./start-command-return-values.md) |
| startService / startForegroundService / stopSelf / stopService | Methods to launch and terminate a started service. | [start-stop-service.md](./start-stop-service.md) |
| Foreground service | User-noticeable service that must show a persistent notification. | [foreground-service.md](./foreground-service.md) |
| foregroundServiceType | Manifest attribute declaring a foreground service's type and required permission (API 34+). | [foreground-service-types.md](./foreground-service-types.md) |
| Foreground service launch restrictions | Background-start restrictions introduced in Android 12+ and tightened in 14+. | [foreground-service-restrictions.md](./foreground-service-restrictions.md) |
| Foreground service time limits (Android 15+) | Running-time limits for `dataSync`/`mediaProcessing`/`shortService` types. | [foreground-service-timeout.md](./foreground-service-timeout.md) |
| Bound service | Client-server service accessed via `bindService()`/`ServiceConnection`/`IBinder`. | [bound-service.md](./bound-service.md) |
| Messenger | Single-threaded, queue-based cross-process binding technique. | [messenger.md](./messenger.md) |
| AIDL | Interface definition language for multithreaded cross-application IPC. | [aidl.md](./aidl.md) |
| Processes and threads | Default process/thread model; services run on the main thread unless moved off it. | [processes-and-threads.md](./processes-and-threads.md) |
