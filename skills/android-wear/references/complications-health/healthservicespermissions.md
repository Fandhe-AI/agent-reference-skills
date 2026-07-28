# Health Services Permissions

Runtime permissions required to read specific `DataType`s through `MeasureClient`, `ExerciseClient`, and `PassiveMonitoringClient`.

## Signature / Usage

```xml
<!-- Heart rate (Wear OS 6 / API 36+) -->
<uses-permission android:name="android.permission.health.READ_HEART_RATE" />
<!-- Legacy heart rate / other body sensors (API 35 and lower) -->
<uses-permission android:name="android.permission.BODY_SENSORS" android:maxSdkVersion="35" />

<!-- Steps, calories, distance, pace, speed, floors, reps, etc. -->
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />

<!-- Location / absolute elevation, and isGpsEnabled = true in ExerciseConfig -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Background body sensor access via PassiveMonitoringClient -->
<uses-permission android:name="android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND" />
<uses-permission android:name="android.permission.BODY_SENSORS_BACKGROUND" android:maxSdkVersion="35" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `READ_HEART_RATE` (health permission) | manifest permission | — | Required for `DataType.HEART_RATE_BPM` on Wear OS 6 (API 36) and above. |
| `BODY_SENSORS` | manifest permission | — | Legacy heart rate / body sensor permission for Wear OS 5.1 (API 35) and below; cap with `maxSdkVersion="35"` when migrating. |
| `ACTIVITY_RECOGNITION` | manifest permission | — | Required for step/calorie/distance/pace/speed/floors/rep-count family data types. |
| `ACCESS_FINE_LOCATION` | manifest permission | — | Required for `DataType.LOCATION` / `ABSOLUTE_ELEVATION`, and whenever `ExerciseConfig.isGpsEnabled = true`. |
| `BODY_SENSORS_BACKGROUND` | manifest permission | — | Background body sensor access on API 33–35, alongside `BODY_SENSORS`. |
| `READ_HEALTH_DATA_IN_BACKGROUND` | manifest permission | — | Background body sensor access on API 36+, replacing `BODY_SENSORS_BACKGROUND`. |

## Notes

- Runtime permission request flow itself (e.g. `ActivityResultContracts.RequestPermission`) is generic Android platform API — see the `android-platform-core` skill; this page documents only the Health Services–specific permission names.
- This is the Wear OS Health Services API — distinct from Health Connect, which uses its own separate permission model (`androidx.health.connect.client.permission.HealthPermission`) not covered here.
- Package: `androidx.health.services.client`. Artifact: `androidx.health:health-services-client`.

## Related

- [DataType](./datatype.md)
- [ExerciseClient](./exerciseclient.md)
- [PassiveMonitoringClient](./passivemonitoringclient.md)
