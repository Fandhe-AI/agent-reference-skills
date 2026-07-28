# Explaining Permission Access to Users

Guidance and platform hooks for telling users why a permission is needed, both in-app (before the system dialog) and via the system Privacy Dashboard (after the fact).

## Signature / Usage

In-app rationale, gated by `shouldShowRequestPermissionRationale()` (see [requesting-runtime-permissions](./requesting-runtime-permissions.md)):

```kotlin
ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.ACCESS_FINE_LOCATION) -> {
    showInContextUI {
        requestPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
    }
}
```

Privacy Dashboard rationale activity (Android 12+, API 31+):

```xml
<activity android:name=".DataAccessRationaleActivity"
          android:permission="android.permission.START_VIEW_PERMISSION_USAGE"
          android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW_PERMISSION_USAGE" />
        <action android:name="android.intent.action.VIEW_PERMISSION_USAGE_FOR_PERIOD" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `VIEW_PERMISSION_USAGE` | intent action | — | Shows an info icon linking to your rationale activity on the app's permissions page in system settings. Extra: `EXTRA_PERMISSION_GROUP_NAME`. |
| `VIEW_PERMISSION_USAGE_FOR_PERIOD` | intent action | — | Same, but on the Privacy Dashboard timeline for a specific period. Extras: `EXTRA_PERMISSION_GROUP_NAME`, `EXTRA_ATTRIBUTION_TAGS`, `EXTRA_START_TIME`, `EXTRA_END_TIME`. |
| `START_VIEW_PERMISSION_USAGE` | manifest permission | — | Required on the rationale `<activity>` so only the system can launch it. |

## Notes

- Wait for user interaction with the relevant feature before requesting sensitive permissions (location, camera, microphone); do not request at app startup.
- Request `ACCESS_BACKGROUND_LOCATION` only after foreground location (`ACCESS_COARSE_LOCATION`/`ACCESS_FINE_LOCATION`) has already been granted — the system rejects combined requests since Android 11 (API 30).
- On Android 12+ (API 31+), a status-bar indicator appears while an app accesses the microphone or camera; use `WindowInsets.getPrivacyIndicatorBounds()` to avoid overlapping it in immersive/edge-to-edge layouts.
- On Android 12+, users can globally disable camera/microphone access via `SensorPrivacyManager`; check `supportsSensorToggle(Sensors.CAMERA/MICROPHONE)` to detect device support.

## Related

- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [permission-groups-and-one-time-permission](./permission-groups-and-one-time-permission.md)
- [data-safety-and-privacy-policy](./data-safety-and-privacy-policy.md)
