# WakeLock and PowerManager

`android.os.PowerManager` API for keeping the CPU (and optionally the screen) on past its normal sleep timeout; the mechanism `AlarmManager`- and `BroadcastReceiver.goAsync()`-triggered background work relies on to finish before the device suspends again.

## Signature / Usage

```java
PowerManager.WakeLock newWakeLock(int levelAndFlags, String tag)
```

```kotlin
val wakeLock: PowerManager.WakeLock =
    (getSystemService(POWER_SERVICE) as PowerManager).run {
        newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MyApp:MyWakelockTag").apply {
            acquire(WAKELOCK_TIMEOUT)
        }
    }

try {
    doTheWork()
} finally {
    wakeLock.release()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PowerManager.newWakeLock(levelAndFlags, tag)` | method | — | Creates (but does not acquire) a `WakeLock`; `tag` should include the package/class/method name for `adb shell dumpsys power` debugging. Use a hard-coded string (not a programmatic `getName()`, which tools like Proguard can obfuscate), avoid PII, and never append counters/unique IDs — the system aggregates usage by tag. |
| `PowerManager.PARTIAL_WAKE_LOCK` | level constant | — | Keeps the CPU running; screen and keyboard backlight may turn off. The level used by background alarm/broadcast work. |
| `WakeLock.acquire(long timeout)` | method | — | Acquires the lock; system force-releases it after `timeout` ms even if `release()` is never called. Recommended over the no-arg overload. |
| `WakeLock.acquire()` | method | — | Acquires the lock with no timeout; must be paired with a matching `release()` or it holds the CPU awake indefinitely. |
| `WakeLock.release()` | method | — | Releases the app's claim on the wake lock; call from a `finally` block so it runs on every code path. |
| `android.permission.WAKE_LOCK` | manifest permission | — | Required in `AndroidManifest.xml` to use any `PowerManager.WakeLock`. |

## Notes

- Wake locks have a significant battery-life cost; prefer a higher-level API (`AlarmManager.setExactAndAllowWhileIdle` waking only briefly, `WorkManager`, foreground services) over a manually held wake lock when one fits the use case.
- If the app is not otherwise visible while the wake lock is held, acquire/hold it from within a foreground service so a notification is shown to the user; if a foreground service is not appropriate for the use case, reconsider whether a wake lock is the right solution at all.
- Keep wake lock acquire/release logic simple; avoid tying it to complex state machines, timeouts, executor pools, or callback chains, which are more prone to bugs that leave a wake lock held too long.
- `BroadcastReceiver.onReceive()` and `goAsync()` work runs with an implicit wake lock held by the system only until the method returns or the returned `PendingResult` is finished; long-running follow-up work started from a receiver (e.g. handing off to a `JobService` or held thread) must acquire its own `PARTIAL_WAKE_LOCK` to survive past that window.
- During Doze, the system ignores held `PARTIAL_WAKE_LOCK`s; see [Doze and App Standby](./doze-app-standby.md) for the alarm variants that still fire.
- Always acquire with a timeout and release in a `finally` block; verify every code path (including exceptions) releases the lock.
- This page covers `android.os.PowerManager`/`PowerManager.WakeLock`, distinct from the WinRT `PowerManager` covered by the `windows-app-sdk` and `windows-platform-integration` skills.

## Related

- [AlarmManager](./alarmmanager.md)
- [BroadcastReceiver](./broadcastreceiver.md)
- [Doze and App Standby](./doze-app-standby.md)
