# HKSampleType

Abstract subclass of `HKObjectType` that identifies sample-based health data types — measurements with a start date and end date. Never instantiated directly.

## Signature / Usage

```swift
// Used when requesting authorization or creating queries
let typesToShare: Set<HKSampleType> = [
    HKQuantityType(.stepCount),
    HKQuantityType(.heartRate)
]
try await healthStore.requestAuthorization(toShare: typesToShare, read: [])
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `isMinimumDurationRestricted` | `Bool` | Whether samples must have a minimum start-to-end duration |
| `minimumAllowedDuration` | `TimeInterval` | Minimum required sample duration (when restricted) |
| `isMaximumDurationRestricted` | `Bool` | Whether samples must be shorter than a maximum duration |
| `maximumAllowedDuration` | `TimeInterval` | Maximum allowed sample duration (when restricted) |
| `allowsRecalibrationForEstimates` | `Bool` | Whether HealthKit supports recalibrating prediction algorithms for this type |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Concrete subclasses: `HKQuantityType`, `HKCategoryType`, `HKCorrelationType`, `HKWorkoutType`, `HKAudiogramSampleType`, `HKElectrocardiogramType`, `HKClinicalType`, `HKSeriesType`, `HKDocumentType`, `HKPrescriptionType`, `HKStateOfMindType`. Use `HKSampleType` in API signatures when accepting multiple concrete types.

## Related

- [hkobjecttype.md](./hkobjecttype.md)
- [hkquantitytype.md](./hkquantitytype.md)
- [hkquantitysample.md](./hkquantitysample.md)
