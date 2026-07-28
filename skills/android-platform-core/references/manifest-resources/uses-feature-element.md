# uses-feature element

Declares a single hardware or software feature used by the app, used mainly for Google Play device filtering.

## Signature / Usage

```xml
<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:glEsVersion="0x00020000" android:required="true" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | — | Case-sensitive feature constant, e.g. `"android.hardware.camera"`, `"android.software.webview"`. One feature per `<uses-feature>` element. |
| `android:required` | Boolean | `"true"` | `"true"`: app cannot function without the feature, Google Play filters devices lacking it. `"false"`: app uses the feature if present but functions without it, no filtering applied. Available since API level 5; older apps assume all declared features are required. |
| `android:glEsVersion` | Integer (hex) | OpenGL ES 1.0 if omitted | Required OpenGL ES version; upper 16 bits = major, lower 16 bits = minor (e.g. `0x00020000` = ES 2.0). At most one declaration per manifest; the highest value takes precedence. |

## Notes

- Contained in: `<manifest>`. Introduced API level 4.
- Google Play also infers required features implicitly from `<uses-permission>` (e.g. `CAMERA` permission implies `android.hardware.camera` + `android.hardware.camera.autofocus`); override with an explicit `android:required="false"` declaration of the same feature name.
- Declarations are informational only; the Android system does not enforce them at install time, but Google Play uses them for store-visibility filtering (via `PackageManager.getSystemAvailableFeatures()` on-device).
- Use `aapt2 dump badging <apk>` to verify how Google Play will filter the app based on declared features/permissions.
- For large-screen devices (e.g. Chromebooks), set `android:required="false"` on camera-related features to avoid unnecessary filtering.

## Related

- [uses-permission / permission elements](./uses-permission-element.md)
- [uses-sdk element](./uses-sdk-element.md)
