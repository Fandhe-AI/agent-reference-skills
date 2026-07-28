# Permission Types and Protection Levels

Android permissions are grouped into install-time, runtime, and special permissions, each with a corresponding protection level (`normal`, `signature`, `dangerous`, `appop`).

## Signature / Usage

```xml
<!-- Install-time, normal protection level -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Install-time, signature protection level (system/privileged use) -->
<uses-permission android:name="android.permission.BIND_AUTOFILL_SERVICE" />

<!-- Runtime, dangerous protection level -->
<uses-permission android:name="android.permission.CAMERA" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `normal` | protection level | — | Install-time permission with minimal privacy risk; auto-granted at install. |
| `signature` | protection level | — | Install-time permission auto-granted only if the requesting app is signed with the same certificate as the app/OS declaring the permission. Used by privileged system-bound services. |
| `dangerous` | protection level | — | Runtime permission; grants substantial access to restricted data or actions; requires an explicit user prompt. |
| `appop` | protection level | — | Special permission; toggled by the user from the "Special app access" system settings page rather than a permission dialog. |

## Notes

- Runtime (`dangerous`) permissions apply from Android 6.0 (API level 23) onward; on earlier versions all permissions are granted at install time.
- Permissions in the same permission group can surface in a single system dialog. Groupings can change across releases — do not hard-code assumptions about which permissions share a group.
- The full permission catalog and each permission's protection level is in the [`Manifest.permission`](https://developer.android.com/reference/android/Manifest.permission) API reference.
- Some `signature` permissions are reserved for system/OEM use and are not grantable to third-party apps regardless of signing.

## Related

- [declaring-permissions](./declaring-permissions.md)
- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [special-permissions-overview](./special-permissions-overview.md)
- [permission-groups-and-one-time-permission](./permission-groups-and-one-time-permission.md)
