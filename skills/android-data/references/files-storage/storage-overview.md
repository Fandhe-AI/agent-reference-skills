# Storage Options Overview

Android offers app-specific storage, shared storage, preferences, and databases; the right choice depends on data sensitivity, size, and whether other apps need access.

## Signature / Usage

```kotlin
// App-specific internal storage
val file = File(context.filesDir, "myfile")

// App-specific external storage
val extFile = File(context.getExternalFilesDir(null), "myfile")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| App-specific storage | internal / external | — | Files private to the app; deleted on uninstall. No permissions needed. |
| Shared storage | media / documents | — | Files intended for other apps (`MediaStore`, Storage Access Framework); persists after uninstall. |
| Shared preferences | key-value | — | Small primitive key-value data via `getSharedPreferences()`. |
| Databases | Room | — | Structured data; private to the app. |

## Notes

- Scoped storage is the default for apps targeting Android 10 (API level 29) and higher: apps get unrestricted access only to their app-specific directory and to media they created.
- Internal storage is always available, smaller, and more reliable; external storage has larger capacity but may be removable or unavailable.
- Choose based on: available space, reliability needs, data type, and whether data must remain private.
- Room is covered separately — see the `room` category in this skill.

## Related

- [App-specific storage](./app-specific-storage.md)
- [Scoped storage and MANAGE_EXTERNAL_STORAGE](./scoped-storage.md)
- [SharedPreferences](./shared-preferences.md)
- [MediaStore](./mediastore.md)
