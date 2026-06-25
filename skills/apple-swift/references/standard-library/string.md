# String

A Unicode string value that is a collection of characters. Strings are Unicode-correct, locale-insensitive, and bridge to Objective-C's `NSString`.

## Signature

```swift
@frozen struct String
```

## Usage

```swift
let greeting = "Hello, world!"
let personalized = "Hello, \(name)!"           // string interpolation
let multiline = """
    line one
    line two
    """
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an empty string |
| `init(repeating:count:)` | Creates a string by repeating a value |
| `init(decoding:as:)` | Decode from a sequence of code units |
| `isEmpty` | `true` when the string has no characters |
| `count` | Number of `Character` elements (Unicode grapheme clusters) |
| `first` / `last` | First or last character (optional) |
| `hasPrefix(_:)` / `hasSuffix(_:)` | Check prefix/suffix |
| `contains(_:)` | Check for a character or substring |
| `firstIndex(of:)` / `lastIndex(of:)` | Find position of a character |
| `prefix(_:)` / `suffix(_:)` | Extract a prefix or suffix as `Substring` |
| `split(separator:)` | Split into an array of `Substring` values |
| `lowercased()` / `uppercased()` | Case-converted copy |
| `trimmingCharacters(in:)` | Remove characters from a `CharacterSet` at both ends |
| `replacingOccurrences(of:with:)` | Replace substrings (Foundation) |
| `append(_:)` | Append a character or string in place |
| `insert(_:at:)` | Insert at a `String.Index` position |
| `remove(at:)` / `removeFirst()` / `removeLast()` | Remove characters |
| `replaceSubrange(_:with:)` | Replace a range with new content |
| `utf8` | UTF-8 view (`String.UTF8View`) |
| `utf16` | UTF-16 view (`String.UTF16View`) |
| `unicodeScalars` | Unicode scalar view (`String.UnicodeScalarView`) |
| `withUTF8(_:)` | Execute a closure over contiguous UTF-8 bytes |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `StringProtocol`, `BidirectionalCollection`, `RangeReplaceableCollection`, `Hashable`, `Codable`.
- A single `String` can report different lengths depending on the view used — `count` (grapheme clusters), `utf8.count`, `utf16.count`, `unicodeScalars.count` may all differ.
- Uses copy-on-write semantics; storage is shared until mutation.

## Related

- [Character](./character.md)
- [Substring](./substring.md)
- [Unicode](./unicode.md)
