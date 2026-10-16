# MutableRawSpan

`MutableRawSpan` represents a contiguous region of memory which contains initialized bytes, and allows mutation of those bytes.

## Signature

```swift
@frozen struct MutableRawSpan
```

## Usage

`MutableRawSpan` is obtained from a typed `MutableSpan` (via `mutableBytes` or `init(mutating:)` / `init(elements:)`) and is the mutable counterpart of `RawSpan`. Declarations from the documentation page:

```swift
init<Element>(mutating: inout MutableSpan<Element>)

func storeBytes<T>(of: T, toByteOffset: Int, as: T.Type)

func storeBytes<T>(repeating: T, count: Int, as: T.Type)
```

## Key APIs

| Name | Description |
|------|-------------|
| `byteCount` | The number of bytes in the span |
| `byteOffsets` | The valid byte offsets for accessing this span, in ascending order |
| `isEmpty` | A Boolean value indicating whether the span is empty |
| `bytes` | Borrow the underlying initialized memory for read-only access (`RawSpan`) |
| `subscript(_:)` / `subscript(unchecked:)` | Accesses the byte (`UInt8`) at the specified offset |
| `init()` | Create an empty span |
| `init(elements:)` | Convert a typed span to a raw span (`consuming MutableSpan<Element>`) |
| `init(mutating:)` | Mutate the elements of a typed span as bytes (`inout MutableSpan<Element>`) |
| `init(unsafeElements:)` | Unsafely convert a typed span to a raw span |
| `storeBytes(of:toByteOffset:as:)` | Stores the given value's bytes at the specified offset (overloads incl. a `ByteOrder` form and `toUncheckedByteOffset:`) |
| `storeBytes(repeating:count:as:)` | Stores the given value's bytes repeatedly into this span's memory |
| `load(fromByteOffset:as:)` / `load(fromByteOffset:as:_:)` | Returns a value constructed from the raw memory at the offset |
| `unsafeLoad(...)` / `unsafeLoadUnaligned(...)` | Returns a new instance of the given type from the raw memory (checked and unchecked offsets) |
| `extracting(...)` | Sub-span methods (range, first, last, droppingFirst, droppingLast, unchecked) |
| `withUnsafeBytes(_:)` | Calls a closure with a pointer to the underlying bytes |
| `withUnsafeMutableBytes(_:)` | Calls a closure with a mutable pointer to the underlying bytes |

## Notes

- Availability on the documentation page: iOS 12.2+, iPadOS 12.2+, Mac Catalyst 12.2+, macOS 10.14.4+, tvOS 12.2+, visionOS 1.0+, watchOS 5.2+ (back-deployment).
- The documentation page marks every `extracting(...)` overload as deprecated (same as `MutableSpan`); confirm the replacement in the current SDK.
- Introduced with `MutableSpan` in SE-0467. Instances derived from a `MutableRawSpan` represent a mutation of the same memory, so the source cannot be accessed while the derived span exists.
- Conforms to `ContiguousBytes`, `Iterable`, `Sendable`, `SendableMetatype`.

## Related

- [MutableSpan](./mutablespan.md)
- [RawSpan](./rawspan.md)
- [Span](./span.md)
