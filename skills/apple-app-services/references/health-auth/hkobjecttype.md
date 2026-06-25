# HKObjectType

Abstract superclass identifying a specific type of data in the HealthKit store. Never instantiated directly — use one of its concrete subclasses or the provided factory class methods.

## Signature / Usage

```swift
// Use factory methods on HKObjectType to get typed instances
let stepCountType = HKQuantityType.quantityType(forIdentifier: .stepCount)!
let heartRateType = HKObjectType.quantityType(forIdentifier: .heartRate)!
let categoryType  = HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!
```

## Options / Props

| Method / Property | Returns | Description |
|-------------------|---------|-------------|
| `identifier` | `String` | Unique string identifying the object type |
| `quantityType(forIdentifier:)` | `HKQuantityType?` | Numerical sample type |
| `categoryType(forIdentifier:)` | `HKCategoryType?` | Discrete-value sample type |
| `characteristicType(forIdentifier:)` | `HKCharacteristicType?` | Static user characteristic |
| `correlationType(forIdentifier:)` | `HKCorrelationType?` | Grouped subsamples |
| `workoutType()` | `HKWorkoutType` | Workout data |
| `activitySummaryType()` | `HKActivitySummaryType` | Daily activity ring summary |
| `electrocardiogramType()` | `HKElectrocardiogramType` | ECG data |
| `clinicalType(forIdentifier:)` | `HKClinicalType?` | Clinical record data |
| `requiresPerObjectAuthorization()` | `Bool` | Whether per-object authorization is needed (e.g. vision prescriptions) |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. The framework returns shared (singleton) instances for the same identifier — do not subclass. Concrete subclasses: `HKQuantityType`, `HKCategoryType`, `HKCharacteristicType`, `HKCorrelationType`, `HKWorkoutType`, `HKActivitySummaryType`, `HKElectrocardiogramType`, `HKClinicalType`, `HKSeriesType`.

## Related

- [hkquantitytype.md](./hkquantitytype.md)
- [hksampletype.md](./hksampletype.md)
- [hkhealthstore.md](./hkhealthstore.md)
