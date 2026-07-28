# Exact alarm permissions

Runtime and manifest permissions required to schedule exact alarms (`setExact`, `setExactAndAllowWhileIdle`, `setAlarmClock`) on Android 12+.

## Signature / Usage

```xml
<!-- Android 12: only SCHEDULE_EXACT_ALARM -->
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>

<!-- Android 13+: choose one -->
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>
<!-- OR -->
<uses-permission android:name="android.permission.USE_EXACT_ALARM"/>
```

```kotlin
if (alarmManager.canScheduleExactAlarms()) {
    alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerAtMillis, alarmIntent)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SCHEDULE_EXACT_ALARM` | manifest permission | — | Required on Android 12+ to call exact-alarm methods. User-granted via the "Alarms & reminders" special app access screen; revocable by the user or system. |
| `USE_EXACT_ALARM` | manifest permission | — | Available Android 13+ as an alternative; automatically granted at install for a limited set of use cases (e.g. alarm clock, calendar apps), not revocable, not pre-granted on upgrade from earlier targetSdk. |
| `canScheduleExactAlarms()` | `AlarmManager` method | — | Runtime check of whether the app currently has exact-alarm access; call before invoking `setExact`/`setExactAndAllowWhileIdle`/`setAlarmClock`. |
| `ACTION_SCHEDULE_EXACT_ALARM_PERMISSION_STATE_CHANGED` | broadcast action | — | Sent when the user grants/revokes exact-alarm access; a receiver can use it to reschedule alarms. |

## Notes

- Exact alarms are for user-facing, time-critical features only (alarm clocks, timers, calendar reminders); inexact alarms or WorkManager should be used otherwise.
- Check `canScheduleExactAlarms()` before calling an exact-alarm method rather than assuming access is granted.
- For testing, the `REQUIRE_EXACT_ALARM_PERMISSION` compat change can be toggled via `adb shell am compat disable REQUIRE_EXACT_ALARM_PERMISSION <package>` on debuggable builds.

## Related

- [AlarmManager](./alarmmanager.md)
- [Alarm types](./alarm-types.md)
