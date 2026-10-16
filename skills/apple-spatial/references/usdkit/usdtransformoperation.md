# USDTransformOperation

A single transform applied to a prim, such as a translation, rotation, scale, or matrix.

## Signature / Usage

```swift
struct USDTransformOperation

init(attribute: USDPrim.Attribute, inverted: Bool)
func transform(at: USDStage.TimeCode) -> USDValue.Matrix4d
func timeSamples(in: ClosedRange<USDStage.TimeCode>) -> [USDStage.TimeCode]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `attribute` | `USDPrim.Attribute` | The attribute backing this operation |
| `name` | `USDToken` | Full name of the operation |
| `baseName` | `USDToken` | Base name without namespace |
| `kind` | `USDTransformOperation.Kind?` | Kind of operation; `nil` if the operation is not defined |
| `precision` | `USDTransformOperation.Precision` | Numeric precision of the operation's value |
| `isDefined` | `Bool` | Whether this operation is defined |
| `isInverse` | `Bool` | Whether this is an inverse operation |
| `hasTimeSamples` | `Bool` | Whether the operation has authored time samples |
| `timeSamples` | `[USDStage.TimeCode]` | All time samples authored for this operation |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit. Conforms to `Equatable`, `Hashable`.
- `transform(at:)` computes the transformation matrix at the specified time.
- Add operations to a prim with `USDPrim.addTransformOperation(type:)` (takes a `USDTransformOperation.Kind`); remove all with `USDPrim.clearTransformOperations()`.
- Source: https://developer.apple.com/documentation/usdkit/usdtransformoperation (fetched 2026-10 from the DocC JSON).

## Related

- [USDPrim](./usdprim.md)
- [USDStage](./usdstage.md)
- [USDValue](./usdvalue.md)
