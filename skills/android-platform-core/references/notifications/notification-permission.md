# POST_NOTIFICATIONS permission

Runtime permission introduced in Android 13 (API level 33) that lets users control which apps can post non-exempt notifications, including foreground service notifications.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
```

```kotlin
val permissionLauncher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted ->
    if (isGranted) {
        // Permission granted, notifications can be sent.
    } else {
        // Permission denied, handle accordingly.
    }
}

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
}
```

## Notes

- **API 33+ only.** Not required on lower API levels.
- New installs on API 33+ have notifications off by default until the user grants the permission; existing apps upgrading a device may be auto-granted if previously eligible.
- Exempt from this permission: media session notifications, and self-managed phone call apps (`ConnectionService` + `MANAGE_OWN_CALLS`) posting `Notification.CallStyle` notifications.
- Apps don't need this permission to start a foreground service, but the service must still supply a notification.
- Best practice: request contextually (e.g. when the user taps a notification bell), not on first launch. Check `notificationManager.areNotificationsEnabled()` before attempting to send.
- If the user denies the permission on Android 12L or lower and later upgrades, the denial persists.
- Test with `adb shell pm revoke PACKAGE_NAME android.permission.POST_NOTIFICATIONS` / `adb shell pm grant ...`.

## Related

- [notification-manager](./notification-manager.md)
- [notification-builder](./notification-builder.md)
