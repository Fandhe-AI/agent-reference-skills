# Rescheduling alarms on BOOT_COMPLETED

`AlarmManager` alarms do not survive a device reboot; apps that need alarms to persist must reschedule them when the system finishes booting.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

<receiver android:name=".SampleBootReceiver" android:enabled="false">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED"/>
    </intent-filter>
</receiver>
```

```kotlin
class SampleBootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == "android.intent.action.BOOT_COMPLETED") {
            // Reschedule alarms here
        }
    }
}

// Toggle the receiver on/off instead of leaving it always enabled
val receiver = ComponentName(context, SampleBootReceiver::class.java)
context.packageManager.setComponentEnabledSetting(
    receiver,
    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
    PackageManager.DONT_KILL_APP
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `RECEIVE_BOOT_COMPLETED` | manifest permission | — | Required to receive `BOOT_COMPLETED`. |
| `ACTION_BOOT_COMPLETED` | broadcast action | — | Sent once after the system finishes booting; one of the documented exemptions from the Android 8+ implicit-broadcast restriction, so a manifest-declared receiver still works. |
| `PackageManager.setComponentEnabledSetting()` | method | — | Enables/disables the boot receiver component at runtime, so it only stays active while the app actually has alarms scheduled. |

## Notes

- Declare the receiver `android:enabled="false"` by default and enable it only when an alarm is actually scheduled, to avoid unnecessary wake-ups on every boot.
- See [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md) for the full list of exempted implicit broadcasts.

## Related

- [AlarmManager](./alarmmanager.md)
- [Registering broadcast receivers](./registering-receivers.md)
