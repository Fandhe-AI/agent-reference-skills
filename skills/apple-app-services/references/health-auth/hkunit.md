# HKUnit

Represents a unit of measure used with `HKQuantity`. Supports SI units, SI prefixes, non-SI equivalents, and compound units built by arithmetic combination.

## Signature / Usage

```swift
// Built-in unit factories
let steps    = HKUnit.count()
let bpm      = HKUnit(from: "count/min")
let kcal     = HKUnit.kilocalorie()
let meters   = HKUnit.meter()
let kg       = HKUnit.gramUnit(with: .kilo)

// Compound unit: km/h
let speed = HKUnit.meterUnit(with: .kilo)
             .unitDivided(by: HKUnit.hour())

// Parse from string
let mmHg = HKUnit(from: "mmHg")

// Use with HKQuantity
let heartRate = HKQuantity(unit: HKUnit(from: "count/min"), doubleValue: 72)
let value = heartRate.doubleValue(for: HKUnit(from: "count/min"))
```

## Options / Props

**Common factory methods:**

| Category | Examples |
|----------|---------|
| Count | `count()` |
| Length | `meter()`, `inch()`, `foot()`, `mile()` — with prefix: `meterUnit(with: .kilo)` |
| Mass | `gram()`, `pound()`, `ounce()` — with prefix: `gramUnit(with: .kilo)` |
| Energy | `kilocalorie()`, `joule()`, `largeCalorie()` |
| Time | `second()`, `minute()`, `hour()`, `day()` |
| Temperature | `degreeCelsius()`, `degreeFahrenheit()`, `kelvin()` |
| Pressure | `millimeterOfMercury()`, `pascal()` |
| Volume | `liter()`, `fluidOunceUS()` — with prefix: `literUnit(with: .deci)` |

**Arithmetic methods:**

| Method | Description |
|--------|-------------|
| `unitMultiplied(by:)` | Multiply two units |
| `unitDivided(by:)` | Divide by a unit |
| `unitRaised(toPower:)` | Raise to an integer power |
| `reciprocal()` | 1 / unit |

| Property | Type | Description |
|----------|------|-------------|
| `unitString` | `String` | String representation (e.g. `"kg"`, `"kcal"`, `"m/s"`) |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 13.0+, watchOS 2.0+, visionOS 1.0+. Unit instances are shared (flyweight pattern) — do not subclass. Use `HKQuantityType.is(compatibleWith:)` to verify a unit is valid for a given type before querying. `HKUnit(from:)` accepts the same string representations returned by `unitString`.

## Related

- [hkquantitysample.md](./hkquantitysample.md)
- [hkquantitytype.md](./hkquantitytype.md)
