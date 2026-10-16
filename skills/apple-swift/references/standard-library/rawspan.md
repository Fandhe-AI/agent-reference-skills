# RawSpan

`RawSpan` represents a contiguous region of memory which contains initialized bytes.

## Signature

```swift
@frozen struct RawSpan
```

## Usage

`RawSpan` suits parsing and decoding of heterogeneously-typed memory. It loads values with `unsafeLoad(fromByteOffset:as:)` and `unsafeLoadUnaligned(fromByteOffset:as:)` (signatures from SE-0447).

```swift
public func unsafeLoad<T>(
  fromByteOffset offset: Int = 0, as: T.Type
) -> T

public func unsafeLoadUnaligned<T: BitwiseCopyable>(
  fromByteOffset offset: Int = 0, as: T.Type
) -> T
```

## Key APIs

| Name | Description |
|------|-------------|
| `byteCount` | The number of bytes in the span |
| `byteOffsets` | The indices that are valid for subscripting the span, in ascending order (`Range<Int>`) |
| `isEmpty` | A Boolean value indicating whether the span is empty |
| `subscript(_:)` / `subscript(unchecked:)` | Accesses the byte (`UInt8`) at the specified offset |
| `init()` | Create an empty span |
| `init(elements:)` | View a typed `Span` as a raw span |
| `init(unsafeElements:)` | Unsafely view a typed `Span` as a raw span |
| `load(fromByteOffset:as:)` / `load(fromByteOffset:as:_:)` | Returns a value constructed from the raw memory at the offset (second form takes a `ByteOrder`) |
| `unsafeLoad(fromByteOffset:as:)` / `unsafeLoad(fromUncheckedByteOffset:as:)` | Returns a new instance of the given type from the raw memory at the offset |
| `unsafeLoadUnaligned(fromByteOffset:as:)` / `unsafeLoadUnaligned(fromUncheckedByteOffset:as:)` | Same, without alignment requirement |
| `byteOffsets(of:)` | Byte offsets within this span where another span's memory is located, or `nil` |
| `extracting(...)` | Sub-span methods (range, first, last, droppingFirst, droppingLast, unchecked) |
| `isIdentical(to:)` / `isTriviallyIdentical(to:)` | Whether two instances refer to the same memory region |
| `withUnsafeBytes(_:)` | Calls a closure with a pointer to the underlying bytes |

## Notes

- A `RawSpan` is a non-owning, non-escaping view into memory with the same temporal and spatial safety guarantees as `Span`.
- Availability on the documentation page: iOS 12.2+, iPadOS 12.2+, Mac Catalyst 12.2+, macOS 10.14.4+, tvOS 12.2+, visionOS 1.0+, watchOS 5.2+ (back-deployment). Vending properties such as `Array.span` may carry later availability.
- `unsafeLoad` operations are not type-safe: the loaded value can be invalid and violate type invariants, and the memory must be properly aligned and initialized to `T` or a layout-compatible type.
- Conforms to `BitwiseCopyable`, `ContiguousBytes`, `Iterable`, `Sendable`, `SendableMetatype`.
- Introduced by SE-0447 (status: Implemented, Swift 6.2).

## Related

- [Span](./span.md)
- [MutableRawSpan](./mutablerawspan.md)
- [MutableSpan](./mutablespan.md)
- [UTF8Span](./utf8span.md)
