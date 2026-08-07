# Debug Wake Locks Locally

Tools for finding wake locks held by a locally-running app, including ones acquired implicitly by libraries such as WorkManager without explicit app code.

## Signature / Usage

```bash
adb shell dumpsys batterystats
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `adb shell dumpsys batterystats` | command | — | Prints a detailed history of wake locks held by each app. |
| System tracing | tool | — | Records device activity over a short period into a trace file that helps diagnose wake lock and performance issues (Perfetto). |
| Background Task Inspector | Android Studio tool | — | Monitors wake locks, alarms, and jobs/workers in real time, including wake locks held internally by `WorkManager`'s `JobScheduler`-backed execution. |

## Notes

- `WorkManager` uses `JobScheduler` to schedule and execute jobs; during execution these jobs hold a wake lock attributed to the app, visible in Background Task Inspector.
- An app can hold wake locks it never explicitly requested, because other APIs/libraries acquire them on its behalf; when a wake lock name is unfamiliar, look it up in [Identify and optimize wake lock use cases](./wakelock-identify-use-cases.md).

## Related

- [WakeLock and PowerManager](./wakelock.md)
- [Follow wake lock best practices](./wakelock-best-practices.md)
- [Identify and optimize wake lock use cases](./wakelock-identify-use-cases.md)
