# Optional

A type that represents either a wrapped value or the absence of a value.

## Signature

```swift
@frozen enum Optional<Wrapped> where Wrapped : ~Copyable, Wrapped : ~Escapable
```

## Cases

| Case | Description |
|------|-------------|
| `some(Wrapped)` | The presence of a value |
| `none` | The absence of a value (equivalent to `nil`) |

## Usage

```swift
let maybeInt: Int? = Int("42")    // Optional.some(42)
let noInt: Int?   = Int("hello")  // Optional.none  →  nil

// Optional binding
if let value = maybeInt {
    print(value)
}

// Nil-coalescing
let result = maybeInt ?? 0

// Optional chaining
let length = maybeInt?.description.count
```

## Key APIs

| Name | Description |
|------|-------------|
| `map(_:)` | Apply a transform to the wrapped value if present; return `nil` otherwise |
| `flatMap(_:)` | Like `map`, but the transform itself returns an optional |
| `unsafelyUnwrapped` | Access the wrapped value without a nil check (crashes if `nil`) |
| `??(_:_:)` | Nil-coalescing operator — return wrapped value or a default |
| `!` (postfix) | Force-unwrap — return wrapped value or crash if `nil` |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- The shorthand `T?` is syntactic sugar for `Optional<T>`.
- Conforms to `Equatable` (when `Wrapped: Equatable`), `Hashable` (when `Wrapped: Hashable`), `Sendable`.
- Prefer optional binding (`if let`, `guard let`) or `??` over force-unwrapping to avoid runtime crashes.

## Related

- [Result](./result.md)
- [Bool](./bool.md)
