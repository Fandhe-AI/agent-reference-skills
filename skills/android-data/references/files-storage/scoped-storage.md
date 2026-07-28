# Scoped Storage and MANAGE_EXTERNAL_STORAGE

Scoped storage restricts apps targeting Android 10+ (API level 29+) to their app-specific directory and self-created media; `MANAGE_EXTERNAL_STORAGE` is the special permission that opts specific, narrowly-permitted app categories out of that restriction.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
```

```kotlin
// Send the user to the system settings toggle
startActivity(Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION))

// Check current status
val hasPermission = Environment.isExternalStorageManager()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android.permission.MANAGE_EXTERNAL_STORAGE` | manifest permission | — | Broad read/write access to shared storage, granted only through a dedicated Settings screen. |
| `Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION` | intent action | — | Opens the "Allow access to manage all files" system settings page. |
| `Environment.isExternalStorageManager()` | `() -> Boolean` | — | Checks whether the app currently holds the permission. |

## Notes

- Scoped storage is mandatory (no opt-out) on Android 11+ (API level 30+); Android 10 apps can temporarily opt out with `requestLegacyExternalStorage="true"`; Android 9 and lower use the legacy full-storage model.
- Google Play restricts `MANAGE_EXTERNAL_STORAGE` to specific use cases: file managers, backup/restore, anti-virus, document management, on-device search, disk/file encryption, and device-to-device migration.
- Even with the permission granted, apps still cannot access other apps' `Android/data/` subdirectories.
- For testing: `adb shell appops set --uid PACKAGE_NAME MANAGE_EXTERNAL_STORAGE allow`.
- Prefer `MediaStore` or the Storage Access Framework over this permission whenever the use case allows — it is rarely needed and heavily scrutinized on Play.

## Related

- [Storage options overview](./storage-overview.md)
- [MediaStore](./mediastore.md)
- [App-specific storage](./app-specific-storage.md)
