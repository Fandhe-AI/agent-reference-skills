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
- `SCHEDULE_EXACT_ALARM` is not pre-granted to fresh installs targeting Android 13 (API 33)+; it is denied after a backup-and-restore to an Android 14 device, but an existing app that already holds it keeps it when the device upgrades to Android 14.
- An exact alarm set with an `OnAlarmListener` (for example the `setExact` overload taking one) does not require `SCHEDULE_EXACT_ALARM`.
- When `SCHEDULE_EXACT_ALARM` is revoked, the app is stopped and all its future exact alarms are canceled. Send users to the "Alarms & reminders" screen with an intent using `ACTION_REQUEST_SCHEDULE_EXACT_ALARM` after explaining why the app needs it. After `ACTION_SCHEDULE_EXACT_ALARM_PERMISSION_STATE_CHANGED`, re-check `canScheduleExactAlarms()` (the user may have revoked it again) before rescheduling.
- Exact alarms are not affected by foreground service launch restrictions.
- Source: https://developer.android.com/develop/background-work/services/alarms (fetched 2026-11-14)

## Related

- [AlarmManager](./alarmmanager.md)
- [Alarm types](./alarm-types.md)
