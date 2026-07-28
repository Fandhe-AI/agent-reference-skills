# Special Permissions Overview

Special permissions (`appop` protection level) guard powerful actions that are not directly tied to user-data privacy. They are never granted through a runtime dialog — the user must enable them manually on a "Special app access" system settings page, so the request flow directs the user there instead of calling a launcher.

## Signature / Usage

```kotlin
val alarmManager = getSystemService<AlarmManager>()!!
when {
    alarmManager.canScheduleExactAlarms() -> {
        alarmManager.setExact(...)
    }
    else -> {
        startActivity(Intent(ACTION_REQUEST_SCHEDULE_EXACT_ALARM))
    }
}

override fun onResume() {
    super.onResume()
    if (alarmManager.canScheduleExactAlarms()) {
        alarmManager.setExact(...)
    } else {
        alarmManager.setWindow(...) // graceful degradation
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AlarmManager.canScheduleExactAlarms()` | check function | — | Checks `SCHEDULE_EXACT_ALARM`. |
| `Environment.isExternalStorageManager()` | check function | — | Checks `MANAGE_EXTERNAL_STORAGE`; see [manage-external-storage](./manage-external-storage.md). |
| `Settings.canDrawOverlays(context)` | check function | — | Checks `SYSTEM_ALERT_WINDOW`; see [system-alert-window](./system-alert-window.md). |

## Notes

- General flow: declare the permission in the manifest → design the UX around the specific action that needs it → wait for the user to trigger that action → check via the permission's dedicated check function → show in-app rationale → launch the relevant `Settings` intent (no system permission dialog appears) → re-check the result in `onResume()`, since there is no activity-result callback for these settings screens.
- Because there is no dialog, an app must re-check the permission's own check function every time it performs the protected operation, typically in `onResume()`.
- Use special permissions sparingly; misuse risks Google Play policy rejection, and some (e.g. `SCHEDULE_EXACT_ALARM`) are further restricted per Play policy even when granted.

## Related

- [system-alert-window](./system-alert-window.md)
- [manage-external-storage](./manage-external-storage.md)
- [post-notifications-permission](./post-notifications-permission.md)
- [permission-types-and-protection-levels](./permission-types-and-protection-levels.md)
