# AlarmManager

System service that enables time-based operations outside your app's lifetime, firing an `Intent` (via `PendingIntent`) at a set time or interval, even while the device sleeps.

## Signature / Usage

```kotlin
val alarmMgr = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

val alarmIntent = Intent(context, AlarmReceiver::class.java).let { intent ->
    PendingIntent.getBroadcast(
        context, 0, intent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
    )
}

// Inexact, recommended by default
alarmMgr.setInexactRepeating(
    AlarmManager.ELAPSED_REALTIME_WAKEUP,
    SystemClock.elapsedRealtime() + AlarmManager.INTERVAL_HALF_HOUR,
    AlarmManager.INTERVAL_HALF_HOUR,
    alarmIntent
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `set(type, triggerAtMillis, operation)` | method | — | Inexact one-shot alarm; fires after (never before) the trigger time. |
| `setWindow(type, windowStartMillis, windowLengthMillis, operation)` | method | — | Fires within the given window from the trigger time. Android 12+ minimum window is 10 minutes and delivery may be delayed at least 10 minutes. |
| `setRepeating(type, triggerAtMillis, intervalMillis, operation)` | method | — | Repeating alarm; since Android 4.4 all repeating alarms are inexact. |
| `setInexactRepeating(type, triggerAtMillis, intervalMillis, operation)` | method | — | First alarm fires within a time window, subsequent ones after the interval elapses. Must use `AlarmManager.INTERVAL_*` constants (e.g. `INTERVAL_HALF_HOUR`, `INTERVAL_DAY`) so alarms from multiple apps can be batched. |
| `setAndAllowWhileIdle(type, triggerAtMillis, operation)` | method | — | Inexact alarm that still fires during Doze; rate-limited to about once per 9 minutes per app. |
| `setExact(type, triggerAtMillis, operation)` | method | — | Fires at (nearly) the exact time, subject to battery-saving deferral. Requires `SCHEDULE_EXACT_ALARM` on Android 12+. |
| `setExactAndAllowWhileIdle(type, triggerAtMillis, operation)` | method | — | Exact alarm that still fires during Doze; same ~9 minute rate limit as `setAndAllowWhileIdle`. Requires `SCHEDULE_EXACT_ALARM`. |
| `setAlarmClock(info, operation)` | method | — | Most precise, user-facing alarm (alarm clocks, reminders); never adjusted, system exits low-power modes to deliver it. Significant battery impact. |
| `cancel(operation)` | method | — | Cancels the alarm associated with the given `PendingIntent`. |

## Notes

- Prefer inexact alarms (`setInexactRepeating`, `set`) by default; the system batches them across apps for battery efficiency.
- Exact alarms (`setExact`, `setExactAndAllowWhileIdle`, `setAlarmClock`) should only be used when core functionality requires precise timing (alarm clocks, timers, calendar events).
- For flexible, deferrable periodic work, prefer WorkManager over `setRepeating`/`setInexactRepeating` — see the [workmanager README](../workmanager/README.md).
- All standard (non-`AllowWhileIdle`) alarms are deferred until the next Doze maintenance window; see [Doze and App Standby](./doze-app-standby.md).

## Related

- [Alarm types](./alarm-types.md)
- [Exact alarm permissions](./exact-alarm-permissions.md)
- [PendingIntent](./pendingintent.md)
- [Doze and App Standby](./doze-app-standby.md)
- [Rescheduling alarms on BOOT_COMPLETED](./boot-completed.md)
