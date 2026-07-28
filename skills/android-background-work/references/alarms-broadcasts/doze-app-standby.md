# Doze and App Standby

System power-management states that defer background CPU/network activity, alarms, and jobs when the device is idle, to reduce battery consumption.

## Signature / Usage

```bash
# Testing with adb
adb shell dumpsys deviceidle force-idle   # force Doze
adb shell dumpsys deviceidle unforce      # exit Doze
adb shell dumpsys battery unplug
adb shell am set-inactive <packageName> true   # force App Standby
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Doze | device state | — | Entered when unplugged, stationary, and screen off for an extended period. Suspends network access, ignores `PowerManager.WakeLock`, defers standard alarms/sync adapters/`JobScheduler` (and therefore `WorkManager`) until the next maintenance window. |
| Maintenance window | period | — | Periodic brief window during Doze where pending syncs, jobs, and alarms run and network is available; windows become less frequent the longer the device stays idle. |
| App Standby | app state | — | Applied per-app when the user hasn't interacted with it recently and it has no foreground process or user-visible notification; while unplugged, idle apps get network access roughly once per day. |
| `AlarmManager.setAndAllowWhileIdle()` | method | — | Fires even during Doze; rate-limited to about once per 9 minutes per app. |
| `AlarmManager.setExactAndAllowWhileIdle()` | method | — | Exact-timed variant of the above, same rate limit. |
| `AlarmManager.setAlarmClock()` | method | — | Unaffected by Doze; system exits Doze shortly before firing. |
| `PowerManager.isIgnoringBatteryOptimizations()` | method | — | Checks whether the app is exempt from Doze/App Standby battery optimizations. |

## Notes

- Standard alarms (`set`, `setExact`, `setWindow`, `setRepeating`) are deferred to the next maintenance window while in Doze; use the `*AllowWhileIdle` variants for alarms that must still fire.
- Google Play policy restricts requesting `ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` exemption to cases where the core app function is adversely affected.
- FCM high-priority messages can wake an app during Doze/App Standby with temporary network access; normal-priority messages wait for a maintenance window.

## Related

- [AlarmManager](./alarmmanager.md)
- [Exact alarm permissions](./exact-alarm-permissions.md)
