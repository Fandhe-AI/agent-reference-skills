# Health Services Device Compatibility

Guidance for building Health Services apps that adjust gracefully to per-device differences in sensor availability, sampling rate, and batching, since only a small core of data types is guaranteed across all Wear OS 3+ devices.

## Signature / Usage

```kotlin
// Always query capabilities before relying on an optional data type
val capabilities = exerciseClient.getCapabilitiesAsync().await()
val supportedDataTypes = capabilities.typeToCapabilities[ExerciseType.RUNNING]?.supportedDataTypes

if (DataType.ELEVATION_GAIN in (supportedDataTypes ?: emptySet())) {
    // Show elevation UI
} else {
    // Hide elevation UI — not every device has an altimeter
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `HEART_RATE_BPM`, `CALORIES` (total/daily), `STEPS` (or `STEPS_DAILY`), `DISTANCE` (or `DISTANCE_DAILY`) | `DataType` | Required — guaranteed present on every Wear OS 3+ device, for both `ExerciseClient` and `PassiveMonitoringClient`. |
| `ELEVATION_GAIN`, `ELEVATION_LOSS`, `ABSOLUTE_ELEVATION`, `STEPS_PER_MINUTE`, `WHEELCHAIR_PUSHES`, `REP_COUNT`, `SWIM_STROKE_COUNT`, `SWIM_LAP_COUNT`, `RUNNING_STEPS`, `WALKING_STEPS` | `DataType` | Optional — device/OEM-specific; only available when present in `ExerciseTypeCapabilities.supportedDataTypes` / `PassiveMonitoringCapabilities.supportedDataTypesPassiveMonitoring`. |

## Notes

- WHS (Wear Health Services) is mandatory on all Wear OS 3+ devices, but the *set of data types, sampling rate, and delivery pattern* it supports varies by hardware/OEM — always check `ExerciseClient.getCapabilitiesAsync()` / `PassiveMonitoringClient.getCapabilitiesAsync()` before enabling a feature (see [Health Services Capabilities](./healthservicescapabilities.md)).
- Heart rate sampling frequency is not guaranteed: some devices deliver every second, others only on value change.
- Passive monitoring batching intervals are unpredictable — do not assume a fixed delivery interval; batches arrive on buffer-full, display interaction, or other system events.
- All `DataType` values are derived solely from sensors on the watch itself, never from a paired phone — e.g. `LOCATION` requires the watch's own GPS.
- Distance during an active exercise prefers GPS with a fallback to step-derived estimation; passive/daily distance always uses steps/accelerometer only (no GPS), to preserve privacy for users with location services disabled.
- Supported data varies by `ExerciseType` — e.g. meditation exposes only heart rate/calories, while biking excludes `STEPS`.

## Related

- [Health Services Capabilities](./healthservicescapabilities.md)
- [DataType](./datatype.md)
- [ExerciseClient](./exerciseclient.md)
- [PassiveMonitoringClient](./passivemonitoringclient.md)
