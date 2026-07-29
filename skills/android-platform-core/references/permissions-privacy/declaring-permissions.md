# Declaring Permissions in the Manifest

Permissions an app might request must be declared in `AndroidManifest.xml` with `<uses-permission>` before they can be checked or requested at runtime.

## Signature / Usage

```xml
<manifest ...>
    <uses-permission android:name="android.permission.CAMERA"/>

    <!-- Only requested on Android 9 (API 28) and lower -->
    <uses-permission
        android:name="android.permission.READ_EXTERNAL_STORAGE"
        android:maxSdkVersion="28" />

    <application ...>
        ...
    </application>
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | permission string | — | Fully-qualified permission name, e.g. `android.permission.CAMERA`. |
| `android:maxSdkVersion` | int | none | Upper bound API level for which the permission is requested; omit the declaration entirely on newer versions where it is unnecessary. |

## Notes

- [`<uses-permission-sdk-23>`](https://developer.android.com/guide/topics/manifest/uses-permission-sdk-23-element) declares a permission only for devices running Android 6.0 (API 23) and higher, for apps that support runtime permission requests exclusively.
- For hardware-dependent permissions (e.g. `CAMERA`), pair the declaration with `<uses-feature android:required="false">` so the app remains installable on devices without that hardware, and check availability at runtime with `PackageManager.hasSystemFeature()`.
- Declare only permissions the app actually uses; unused declarations increase install-time friction and Play Store review scrutiny.

## Related

- [permission-types-and-protection-levels](./permission-types-and-protection-levels.md)
- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [evaluating-permission-need](./evaluating-permission-need.md)
- [defining-custom-permissions](./defining-custom-permissions.md)
