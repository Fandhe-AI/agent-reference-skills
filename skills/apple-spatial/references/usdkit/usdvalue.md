# USDValue

A type-erased container for a value stored in a Universal Scene Description file.

## Signature / Usage

```swift
struct USDValue

init()                                   // empty value
init<T>(_: T)                            // wraps a value
func isHolding<T>(_: T.Type) -> Bool
func value<T>(as: T.Type) -> T?          // nil if the dynamic type differs
func unsafeValue<T>(assumingType: T.Type) -> T   // no dynamic type check

protocol USDValueProtocol
struct USDArray<Element> where Element : USDValueProtocol
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `typeName` | `String` | Name of the wrapped type |
| `isEmpty` | `Bool` | Whether the value is empty |
| `isArray` | `Bool` | Whether the wrapped value is an array |
| `arrayCount` | `Int?` | Element count if the value holds an array; `nil` otherwise |

### Nested value types

| Family | Types |
|--------|-------|
| Vectors | `Vec2d`, `Vec2f`, `Vec2h`, `Vec2i`, `Vec3d`, `Vec3f`, `Vec3h`, `Vec3i`, `Vec4d`, `Vec4f`, `Vec4h`, `Vec4i` (d = double, f = single, h = half, i = 32-bit integer) |
| Matrices | `Matrix2d`, `Matrix2f`, `Matrix3d`, `Matrix3f`, `Matrix4d`, `Matrix4f` |
| Quaternions | `Quatd`, `Quatf`, `Quath` |

### USDValueProtocol

A type that can be wrapped in a `USDValue`. Conforming types listed in the docs: `USDLayer.AssetPath`, `USDLayer.ListOperation`, `USDLayer.Path`, `USDLayer.PathExpression`, `USDLayer.Permission`, `USDLayer.TimeCode`, `USDLayer.TimeOffset`, `USDPrim.Property.Variability`, `USDPrim.Specifier`, `USDToken`, and all `USDValue.Vec*` / `Matrix*` / `Quat*` types above.

### USDArray

`USDArray<Element>` where `Element : USDValueProtocol`. Conforms to `BidirectionalCollection`, `Collection`, `Copyable`, `Escapable`, `ExpressibleByArrayLiteral`, `RandomAccessCollection`, `Sendable`, `SendableMetatype`, `Sequence`, and `USDPrim.Attribute.Value`.

| Member | Description |
|--------|-------------|
| `init()` | Empty array |
| `init(_: some Sequence<Element>)` | Array containing the elements of the sequence |
| `append(_:)` | Appends an element |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit. `USDValue` conforms to `Equatable`.
- `USDValue` wraps the value types USD recognises (numerics, strings, vectors, tokens, paths, asset paths, time codes, and so on) so they can pass through generic APIs without exposing the underlying C++ representation.
- Do not declare new conformances to `USDValueProtocol`. Only the types already supported by USDKit are valid conforming types.
- `USDArray` initializers for `Int` and `UInt` elements (`init()`, `init(_:)`, `init(arrayLiteral:)`) are marked deprecated in the docs.
- visionOS 27 release note (as relayed for this update): some USD attribute types that were not readable or modifiable were fixed (170653056), and array, vector, matrix, and quaternion types that could not be authored were fixed (178071414).

## Related

- [USDToken](./usdtoken.md)
- [USDLayer](./usdlayer.md)
- [USDPrim](./usdprim.md)
