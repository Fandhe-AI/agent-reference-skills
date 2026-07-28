# POST_NOTIFICATIONS Runtime Permission

Runtime permission introduced in Android 13 (API level 33) that gates whether an app can post non-exempt notifications, including those required by foreground services.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
```

```kotlin
private val permissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted ->
    if (isGranted) {
        // can post notifications now
    }
}

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android.permission.POST_NOTIFICATIONS` | dangerous permission | denied by default | Required (API 33+) to post any non-exempt notification. |
| `NotificationManager.areNotificationsEnabled()` | function | — | Checks whether notifications are currently allowed before posting. |

## Notes

- New installs on API 33+ start with notifications OFF; apps targeting API 33+ fully control when the request dialog appears, while apps targeting 12L or lower have the system show it automatically on first notification-channel creation.
- Apps updated from a pre-33 target with existing notification channels are auto-granted the permission; a prior explicit user denial on 12L or lower carries over after the OS upgrade.
- Exempt from the permission: media session (playback) notifications, and `CallStyle` notifications from apps declaring `MANAGE_OWN_CALLS`, implementing `ConnectionService`, and registered with the telecom provider.
- A foreground service can still be *started* without this permission, but must supply the required notification when doing so; without the permission that notification simply will not be shown to the user.
- Request in context (e.g. when the user taps a notification-related control), not at first launch. Test with `adb shell pm revoke/grant PACKAGE_NAME android.permission.POST_NOTIFICATIONS`.

## Related

- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [requesting-permissions-in-compose](./requesting-permissions-in-compose.md)
- [special-permissions-overview](./special-permissions-overview.md)
