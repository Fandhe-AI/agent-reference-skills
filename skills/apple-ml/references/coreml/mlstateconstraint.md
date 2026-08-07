# MLStateConstraint

A class that represents the constraint of a state feature value in Core ML.

## Signature / Usage

```swift
class MLStateConstraint

let constraint = modelDescription.stateDescriptionsByName["accumulator"]?.constraint
print(constraint?.bufferShape ?? [])
print(constraint?.dataType ?? .float32)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bufferShape` | `[Int]` | The shape of the state buffer |
| `dataType` | `MLMultiArrayDataType` | The data type of scalars in the state buffer |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Inherits from `NSObject`; conforms to `NSCoding` and `NSSecureCoding`

## Related

- [MLState](./mlstate.md)
- [MLModelDescription](./mlmodeldescription.md)
