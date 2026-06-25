# Dictionary

A collection of key-value pairs where each key is unique. Provides O(1) average-case access.

## Signature

```swift
@frozen struct Dictionary<Key, Value> where Key : Hashable
```

## Usage

```swift
var scores: [String: Int] = ["Alice": 95, "Bob": 87]
scores["Charlie"] = 72
if let score = scores["Alice"] {
    print("Alice: \(score)")
}
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an empty dictionary |
| `init(minimumCapacity:)` | Creates with pre-allocated space |
| `init(uniqueKeysWithValues:)` | Creates from a sequence of `(Key, Value)` pairs |
| `init(_:uniquingKeysWith:)` | Creates from a sequence, resolving duplicate keys with a closure |
| `init(grouping:by:)` | Groups a sequence's elements into a dictionary by a key |
| `isEmpty` / `count` / `capacity` | Inspection properties |
| `subscript(_:)` | Access or update value for a key; returns optional |
| `subscript(_:default:)` | Access value for a key with a default |
| `keys` | A collection of all keys |
| `values` | A collection (mutable) of all values |
| `index(forKey:)` | Returns the index for a given key |
| `first` | An arbitrary key-value pair (optional) |
| `randomElement()` | A random key-value pair (optional) |
| `updateValue(_:forKey:)` | Update or insert; returns old value if replaced |
| `removeValue(forKey:)` | Remove a key-value pair; returns removed value |
| `removeAll(keepingCapacity:)` | Remove all pairs |
| `contains(where:)` | `true` if any pair matches a predicate |
| `filter(_:)` | Return dictionary with pairs satisfying a predicate |
| `mapValues(_:)` | Transform all values |
| `compactMapValues(_:)` | Transform values, discarding `nil` results |
| `merge(_:uniquingKeysWith:)` | Merge another dictionary or sequence into self |
| `merging(_:uniquingKeysWith:)` | Return merged copy |
| `sorted(by:)` | Return sorted array of key-value pairs |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `Collection`, `Hashable` (when both `Key` and `Value` are `Hashable`), `Codable` (when both conform), `Sendable`.
- Iteration order is unordered and may vary between runs.
- Uses copy-on-write semantics.

## Related

- [Array](./array.md)
- [Set](./set.md)
