# Follow Wake Lock Best Practices

Practices for correctly acquiring, holding, and releasing a `PowerManager.WakeLock` to avoid battery-life pitfalls and stuck wake locks.

## Signature / Usage

```kotlin
// Problematic: release() is skipped if doTheWork() throws
wakeLock.apply {
    acquire()
    doTheWork()
    release()
}

// Corrected: release() always runs
wakeLock.apply {
    try {
        acquire()
        doTheWork()
    } finally {
        release()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Wake lock tag naming | practice | — | Include the package/class/method name as a hard-coded string (not built at runtime, to survive obfuscation); reuse the same tag consistently so the system can aggregate usage; never embed PII. |
| Foreground visibility | practice | — | Hold the wake lock from a foreground service so a notification is shown while the device stays awake; if a foreground service does not fit the use case, a wake lock probably shouldn't be used either. |
| Simple acquire/release logic | practice | — | Avoid tying acquire/release to complex state machines, timeouts, executor pools, or callback events; subtle bugs there are hard to diagnose and can hold the lock indefinitely. |
| `try`/`finally` release | practice | — | Wrap `acquire()`/work in `try` and call `release()` in `finally` so the lock is released even when the wrapped code throws. |

## Notes

- The system logs `_UNKNOWN` instead of the tag when it detects PII in a wake lock name; see [Identify and optimize wake lock use cases](./wakelock-identify-use-cases.md) for the `_UNKNOWN` case.
- These practices apply to `android.os.PowerManager.WakeLock`; see [WakeLock and PowerManager](./wakelock.md) for the base API.

## Related

- [WakeLock and PowerManager](./wakelock.md)
- [Debug wake locks locally](./wakelock-debug-locally.md)
- [Identify and optimize wake lock use cases](./wakelock-identify-use-cases.md)
