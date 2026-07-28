# PendingIntent

A token wrapping an `Intent` that grants another component (the system, another app) permission to execute it later, with the same identity/permissions as your app. Used to deliver `AlarmManager` alarms and other deferred actions.

## Signature / Usage

```kotlin
val alarmIntent = Intent(context, AlarmReceiver::class.java).let { intent ->
    PendingIntent.getBroadcast(
        context,
        /* requestCode = */ 0,
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getBroadcast(context, requestCode, intent, flags)` | static method | — | Creates a `PendingIntent` that performs a `sendBroadcast()` when triggered; used for `AlarmManager` and notification actions targeting a `BroadcastReceiver`. |
| `getActivity(context, requestCode, intent, flags)` | static method | — | Creates a `PendingIntent` that starts an activity when triggered. |
| `getService(context, requestCode, intent, flags)` | static method | — | Creates a `PendingIntent` that starts a service when triggered. |
| `FLAG_IMMUTABLE` | `int` flag | — | Marks the `PendingIntent` as immutable, so the receiving component cannot fill in or modify the wrapped `Intent`. |
| `FLAG_UPDATE_CURRENT` | `int` flag | — | Replaces the extra data of an existing matching `PendingIntent` instead of creating a new one. |
| `FLAG_NO_CREATE` | `int` flag | — | Returns `null` instead of creating a new `PendingIntent` if one matching the request does not already exist; useful to check/cancel without recreating. |

## Notes

- To cancel an alarm, recreate the `PendingIntent` with the same `requestCode`/`Intent` (and `FLAG_NO_CREATE` to avoid creating a fresh one) and pass it to `AlarmManager.cancel()`.

## Related

- [AlarmManager](./alarmmanager.md)
- [Registering broadcast receivers](./registering-receivers.md)
