# Substring

A slice of a string that shares storage with the original string for efficient, zero-copy slicing.

## Signature

```swift
@frozen struct Substring
```

## Usage

```swift
let greeting = "Hi there! It's nice to meet you!"
let endOfFirst = greeting.firstIndex(of: "!")!
let firstSentence = greeting[...endOfFirst]  // Substring
let shout = firstSentence.uppercased()       // "HI THERE!" — String
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an empty substring |
| `init(_:)` | Creates from a string or encoding view |
| `base` | The underlying `String` from which this is sliced |
| `isEmpty` | `true` when there are no characters |
| `count` | Number of grapheme cluster characters |
| `first` / `last` | First or last character (optional) |
| `filter(_:)` | Returns a new `String` keeping characters satisfying a predicate |
| `withUTF8(_:)` | Run a closure over contiguous UTF-8 bytes |
| `makeContiguousUTF8()` | Ensure storage is contiguous UTF-8 |
| `isContiguousUTF8` | Whether storage is already contiguous UTF-8 |

Substring exposes the same `StringProtocol` interface as `String` (prefix, suffix, split, hasPrefix, hasSuffix, etc.).

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `StringProtocol`, `BidirectionalCollection`, `RangeReplaceableCollection`, `Hashable`, `Comparable`.
- A `Substring` keeps the entire original string's storage alive. Convert to `String` (`String(substring)`) before long-term storage to avoid unintended memory retention.

## Related

- [String](./string.md)
- [Character](./character.md)
