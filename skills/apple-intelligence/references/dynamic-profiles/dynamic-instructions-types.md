---
source: https://developer.apple.com/documentation/foundationmodels/anydynamicinstructions, https://developer.apple.com/documentation/foundationmodels/conditionaldynamicinstructions, https://developer.apple.com/documentation/foundationmodels/emptydynamicinstructions, https://developer.apple.com/documentation/foundationmodels/tupledynamicinstructions
---

# AnyDynamicInstructions / ConditionalDynamicInstructions / EmptyDynamicInstructions / TupleDynamicInstructions

Supporting types that `DynamicInstructionsBuilder` produces when combining dynamic instructions.

## Signature / Usage

### AnyDynamicInstructions

A dynamic instructions type that's type-erased.

```swift
struct AnyDynamicInstructions
```

### ConditionalDynamicInstructions

A dynamic instructions type that conditionally selects between two conditions.

```swift
struct ConditionalDynamicInstructions<TrueContent, FalseContent> where TrueContent : DynamicInstructions, FalseContent : DynamicInstructions
```

### EmptyDynamicInstructions

An empty dynamic instructions type.

```swift
struct EmptyDynamicInstructions
```

### TupleDynamicInstructions

A dynamic instructions type that represents a tuple.

```swift
struct TupleDynamicInstructions<each Content> where repeat each Content : DynamicInstructions
```

## Options / Props

### AnyDynamicInstructions

| Member | Description |
| --- | --- |
| `init(_:)` | Creates an instance from the dynamic instructions you specify. |
| `init(erasing:)` | Creates an instance from the dynamic instructions you specify. |

### ConditionalDynamicInstructions

| Member | Description |
| --- | --- |
| `init(_:)` | Creates a dynamic instructions instance that selects between two conditions. |
| `ConditionalDynamicInstructions.Branch` | An enumeration that represents a condition to evaluate. |

### EmptyDynamicInstructions

| Member | Description |
| --- | --- |
| `init()` | Creates an empty instance. |

### TupleDynamicInstructions

| Member | Description |
| --- | --- |
| `init(_:)` | Creates a dynamic instructions instance that represents a tuple. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+ (all four types).
- The official pages carry no prose overview for these types; they are listed under "Building dynamic instructions" alongside `DynamicInstructionsBuilder`.

## Related

- [DynamicInstructions](./dynamic-instructions.md)
- [DynamicInstructionsForEach](./dynamic-instructions-for-each.md)
- [Dynamic profile types](./dynamic-profile-types.md)
