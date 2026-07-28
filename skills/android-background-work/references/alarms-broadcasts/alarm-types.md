# Alarm types

The `type` argument passed to `AlarmManager` scheduling methods, controlling the clock base and whether the device wakes up.

## Signature / Usage

```kotlin
alarmMgr.set(
    AlarmManager.RTC_WAKEUP,
    calendar.timeInMillis,
    alarmIntent
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ELAPSED_REALTIME` | `int` constant | — | Time since device boot (`SystemClock.elapsedRealtime()`); does not wake the device; unaffected by timezone/clock changes. |
| `ELAPSED_REALTIME_WAKEUP` | `int` constant | — | Same base as `ELAPSED_REALTIME`, but wakes the device for time-critical operations. |
| `RTC` | `int` constant | — | Wall-clock time (`System.currentTimeMillis()`); does not wake the device; locale/timezone dependent. |
| `RTC_WAKEUP` | `int` constant | — | Wall-clock time and wakes the device (e.g. firing daily at 2:00 PM). |

## Notes

- Prefer `ELAPSED_REALTIME`/`ELAPSED_REALTIME_WAKEUP` when the alarm does not need to correspond to a specific wall-clock time, since they are unaffected by the user changing the system clock or timezone.

## Related

- [AlarmManager](./alarmmanager.md)
