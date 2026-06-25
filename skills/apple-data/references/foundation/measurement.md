# Measurement

A generic struct pairing a numeric value with a unit of measure. Supports type-safe unit conversion and unit-aware arithmetic.

```swift
struct Measurement<UnitType> where UnitType : Unit
```

## Signature / Usage

```swift
let distance = Measurement(value: 5.0, unit: UnitLength.kilometers)
let miles = distance.converted(to: .miles)
print(miles.value)  // ~3.107

let temp = Measurement(value: 98.6, unit: UnitTemperature.fahrenheit)
print(temp.formatted())  // "98.6°F"

// Arithmetic
let total = distance + Measurement(value: 3, unit: .kilometers)
```

## Options / Props

| Initializer / Property / Method | Type | Description |
|---------------------------------|------|-------------|
| `init(value:unit:)` | `Measurement<UnitType>` | Create with value and unit |
| `value` | `Double` | Numeric quantity |
| `unit` | `UnitType` | Unit of measure |
| `converted(to:)` | `Measurement<UnitType>` | New measurement in target unit (requires `Dimension`) |
| `convert(to:)` | `Void` (mutating) | Convert in place |
| `+`, `-` | `Measurement` | Unit-aware addition/subtraction |
| `*`, `/` (scalar) | `Measurement` | Scale by a `Double` |
| `==`, `<`, `>` | `Bool` | Comparison operators |
| `formatted()` | `String` | Locale-aware string |
| `formatted(_:)` | `F.FormatOutput` | Custom format style |

**Common unit types:** `UnitLength`, `UnitMass`, `UnitTemperature`, `UnitSpeed`, `UnitVolume`, `UnitDuration`, `UnitEnergy`, `UnitPressure`, `UnitAngle`, `UnitArea`, `UnitPower`, `UnitFrequency`

## Notes

- Available iOS 10.0+, macOS 10.12+.
- Conforms to `Codable`, `Comparable`, `Hashable`, `Sendable`.
- Unit conversion requires `UnitType` to be a subclass of `Dimension` (which provides a base unit and linear converters).
- Cross-unit addition/subtraction automatically converts to the left operand's unit.

## Related

- [Locale](./locale.md)
