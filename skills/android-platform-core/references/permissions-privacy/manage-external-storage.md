# MANAGE_EXTERNAL_STORAGE (All-Files Access)

Special permission, introduced in Android 11 (API 30), that grants read/write access to nearly all files in shared storage outside the app's own sandbox and MediaStore-managed files.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
```

```kotlin
val intent = Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION)
startActivity(intent)

if (Environment.isExternalStorageManager()) {
    // all-files access granted
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION` | intent action | — | Opens the system settings screen where the user enables "Allow access to manage all files" for the app. |
| `Environment.isExternalStorageManager()` | function | — | Returns `true` if the app currently has all-files access. |

## Notes

- Grants read/write to shared storage (including `/sdcard/Android/media`), the MediaStore.Files table, and USB OTG/SD card roots; still cannot access other apps' app-specific directories under `Android/data/`.
- Request this permission only when Storage Access Framework or MediaStore APIs cannot satisfy the use case; Google Play restricts it to file managers, backup/restore, anti-virus, document management, on-device search, and disk/file encryption apps, and device-to-device migration tools.
- Test with `adb shell appops set --uid PACKAGE_NAME MANAGE_EXTERNAL_STORAGE allow` since there is no interactive dialog to automate.

## Related

- [special-permissions-overview](./special-permissions-overview.md)
- [media-permissions](./media-permissions.md)
- [evaluating-permission-need](./evaluating-permission-need.md)
