---
source: https://developer.apple.com/documentation/appintentstesting/anyappenum
---

# AnyAppEnum

A type-erased representation of an app enumeration that provides dynamic enumeration value access.

## Signature / Usage

```swift
struct AnyAppEnum
```

Use `AnyAppEnum` to work with enumerations when you don't know the specific enumeration type at compile time:

```swift
let definitions = IntentDefinitions(
    bundleIdentifier: "com.apple.example"
)
let colorEnum = definitions.enums["Color"]
let priorityEnum = definitions.enums["Priority"]

// Creating enumeration cases.
let redCase = colorEnum.makeCase("red")
let highPriority = priorityEnum.makeCase("high")

// Accessing enumeration properties.
let rawValue = redCase.rawValue  // "red"

// Converting raw values in a type-safe way.
let colorName = try redCase.as(String.self)
let priorityLevel = try highPriority.as(String.self)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(typeIdentifier:rawValue:)` | `init(typeIdentifier: String, rawValue: String)` | Creates a new instance with the specified enumeration identifier and raw value. |
| `init(typeIdentifier:value:)` | `init(typeIdentifier: String, value: any LosslessStringConvertible)` | Creates an enumeration with a typed raw value. |
| `typeIdentifier` | `var typeIdentifier: String` | The enumeration's type identifier. |
| `rawValue` | `var rawValue: String` | The raw value of the selected enumeration option. |
| `as(_:)` | `func `as`<T>(T.Type) throws -> T` | Casts the raw value to the specified type. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Copyable`, `CustomStringConvertible`, `Equatable`, `Escapable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`.

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [AnyAppIntent](./anyappintent.md)
- [AnyAppEntity](./anyappentity.md)
