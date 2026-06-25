# Unicode

A namespace for Unicode utilities, scalar values, encoding codecs, and classification types.

## Signature

```swift
@frozen enum Unicode
```

## Key Nested Types

| Name | Description |
|------|-------------|
| `Unicode.Scalar` | A Unicode scalar value (a 21-bit code point, `U+0000`–`U+10FFFF`) |
| `Unicode.Scalar.Properties` | Detailed Unicode properties of a scalar (name, category, numeric value, etc.) |
| `Unicode.GeneralCategory` | Enumeration of Unicode general categories (letter, mark, number, …) |
| `Unicode.CanonicalCombiningClass` | Used in the Canonical Ordering Algorithm |
| `Unicode.NumericType` | Numeric type of a scalar (`decimal`, `digit`, `numeric`) |
| `Unicode.ASCII` | ASCII encoding form |
| `Unicode.UTF8` | UTF-8 encoding form (maps to `UInt8` code units) |
| `Unicode.UTF16` | UTF-16 encoding form (maps to `UInt16` code units) |
| `Unicode.UTF32` | UTF-32 encoding form (maps to `Unicode.Scalar` directly) |
| `Unicode.Version` | A Unicode Standard version (major + minor components) |
| `UnicodeDecodingResult` | The result of a single decode step (`.scalarValue`, `.emptyInput`, `.error`) |

## Key Free Function

| Name | Description |
|------|-------------|
| `transcode(_:from:to:stoppingOnError:into:)` | Translate a sequence of code units from one encoding to another |

## Usage

```swift
let scalar = Unicode.Scalar("A")           // Unicode.Scalar
let value: UInt32 = scalar.value           // 65
let props = scalar.properties
print(props.generalCategory)               // .uppercaseLetter

// Transcode UTF-8 bytes to UTF-16
let utf8: [UInt8] = [0x68, 0x65, 0x6C, 0x6C, 0x6F]
var utf16: [UInt16] = []
transcode(utf8.makeIterator(), from: UTF8.self, to: UTF16.self,
          stoppingOnError: false) { utf16.append($0) }
```

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- `Unicode.Scalar` is distinct from `Character` — a `Character` may consist of multiple scalars.
- Access a string's scalars via `string.unicodeScalars` (`String.UnicodeScalarView`).

## Related

- [String](./string.md)
- [Character](./character.md)
