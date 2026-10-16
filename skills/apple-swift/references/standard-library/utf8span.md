# UTF8Span

A borrowed view into contiguous memory that contains validly-encoded UTF-8 code units.

## Signature

```swift
@frozen struct UTF8Span
```

## Usage

A `UTF8Span` is validated at initialization time; encoding errors are diagnosed and thrown. Initializer and `String` bridge from SE-0464:

```swift
extension UTF8Span {
  public init(validating codeUnits: Span<UInt8>) throws(UTF8.EncodingError)
}

extension String {
  public init(copying codeUnits: UTF8Span)
}
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(validating:)` | Creates a `UTF8Span` from a `Span<UInt8>`, validating that the input is valid UTF-8, otherwise throws |
| `init(unchecked:isKnownASCII:)` | Creates a `UTF8Span` bypassing safety and security checks; the caller must guarantee valid UTF-8 |
| `count` | The number of UTF-8 code units in the span |
| `isEmpty` | Whether the UTF-8 span is empty |
| `span` | A `Span<UInt8>` used to access the code units |
| `isKnownASCII` | Whether contents are known to be all-ASCII (`false` means there may be non-ASCII content) |
| `isKnownNFC` | Whether contents are known to be NFC; set by `checkForNFC` |
| `checkForASCII()` | Scan for whether the contents are all-ASCII |
| `checkForNFC(quickCheck:)` | Scan for whether the contents are in Normal Form C |
| `bytesEqual(to:)` | Whether this span has the same bytes as another sequence of `UInt8` |
| `unicodeScalarsEqual(to:)` | Whether this span has the same `Unicode.Scalar`s as another sequence |
| `charactersEqual(to:)` | Whether this span has the same `Character`s as another sequence |
| `isCanonicallyEquivalent(to:)` | Equivalence under Unicode Canonical Equivalence |
| `isCanonicallyLessThan(_:)` | Ordering under Unicode Canonical Equivalence using normalized code-unit order (NFC) |
| `isTriviallyIdentical(to:)` | Whether two instances refer to the same memory region and have the same flags |
| `makeUnicodeScalarIterator()` | Returns a `UTF8Span.UnicodeScalarIterator` that decodes code units into `Unicode.Scalar`s |
| `makeCharacterIterator()` | Returns a `UTF8Span.CharacterIterator` that constructs `Character`s from the UTF-8 content |

## Notes

- Available on iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+.
- The documentation page lists `init(validating:)` as throwing `UTF8.ValidationError`; the SE-0464 proposal text shows `UTF8.EncodingError`. Prefer the SDK's declaration.
- The SE-0464 proposal also shows an `@unsafe init(unsafeAssumingValidUTF8:)`; the documentation page lists `init(unchecked:isKnownASCII:)` instead.
- `UnicodeScalarIterator` and `CharacterIterator` are non-escapable, so they cannot conform to `IteratorProtocol`.
- Conforms to `BitwiseCopyable` and `ContiguousBytes`.
- Introduced by SE-0464 (status: Implemented, Swift 6.2). `String.init(copying:)` creates a `String` from a `UTF8Span` without re-validating.

## Related

- [Span](./span.md)
- [RawSpan](./rawspan.md)
- [String](./string.md)
- [Unicode](./unicode.md)
