# Character

A single extended grapheme cluster that approximates a user-perceived character.

## Signature

```swift
@frozen struct Character
```

## Usage

```swift
let c: Character = "A"
let emoji: Character = "🐥"
print(c.isLetter)   // true
print(c.isUppercase) // true
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(_:)` | Create from a single-character `String` or `Unicode.Scalar` |
| `isLetter` | `true` for letters |
| `isNumber` / `isWholeNumber` | `true` for numeric characters |
| `isHexDigit` | `true` for hexadecimal digit characters |
| `isPunctuation` / `isSymbol` | Category predicates |
| `isMathSymbol` / `isCurrencySymbol` | Symbol sub-category predicates |
| `isWhitespace` / `isNewline` | Whitespace predicates |
| `isCased` / `isUppercase` / `isLowercase` | Case predicates |
| `uppercased()` / `lowercased()` | Return a `String` with case applied |
| `isASCII` | `true` if representable as ASCII |
| `asciiValue` | The ASCII value as `UInt8`, if available |
| `unicodeScalars` | The scalar values comprising this character |
| `utf8` / `utf16` | Encoding views |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `Comparable`, `Hashable`, `CustomStringConvertible`, `LosslessStringConvertible`, `Sendable`.
- A single `Character` may consist of multiple Unicode scalar values (e.g., combined emoji sequences).
- `String` is a `Collection` of `Character` instances.

## Related

- [String](./string.md)
- [Unicode](./unicode.md)
