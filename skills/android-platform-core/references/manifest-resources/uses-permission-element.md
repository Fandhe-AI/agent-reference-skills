# uses-permission / permission elements

`<uses-permission>` declares that the app requires a system or custom permission at install/runtime. `<permission>` declares a custom permission that other apps can request.

## Signature / Usage

```xml
<manifest ... >
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission
        android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        android:maxSdkVersion="18" />

    <permission
        android:name="com.example.myapp.permission.MY_CUSTOM_PERMISSION"
        android:protectionLevel="normal"
        android:label="@string/permission_label"
        android:description="@string/permission_description" />
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` (uses-permission) | String | — | Required. Name of a system permission (e.g. `android.permission.CAMERA`), a permission defined by another app, or a custom permission defined by this app. |
| `android:maxSdkVersion` (uses-permission) | Integer | — | Highest API level at which the permission is granted; useful when a permission is no longer needed at a later API level. |
| `android:name` (permission) | String | — | Required. Name of the custom permission, typically prefixed with the package name. |
| `android:protectionLevel` (permission) | Enum | — | Required. Security level: `normal`, `dangerous`, `signature`, `signatureOrSystem`. |
| `android:label` (permission) | String resource | — | User-readable label describing the permission. |
| `android:description` (permission) | String resource | — | User-readable description of the permission. |
| `android:icon` (permission) | Drawable resource | — | Icon representing the permission. |

## Notes

- Both contained in: `<manifest>`. `<uses-permission>` introduced API level 1.
- Runtime approval is required on Android 6.0+ (API 23+) for dangerous permissions; on lower versions permissions are granted at install time. Declaration in the manifest is required regardless of platform version.
- Hardware-implying permissions (e.g. `CAMERA`) can cause Google Play to implicitly filter devices lacking that hardware; pair with `<uses-feature android:required="false">` to opt out of implicit filtering.
- The **request flow** (runtime `requestPermissions`, rationale UI) is documented separately; this page covers manifest declaration only.

## Related

- [uses-feature element](./uses-feature-element.md)
- [permission / permission-group / permission-tree elements](./permission-element.md)
