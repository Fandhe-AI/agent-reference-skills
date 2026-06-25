# Identifiable

A class of types whose instances hold the value of an entity with stable identity.

## Signature

```swift
protocol Identifiable<ID>
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `ID` | associatedtype | The type of the stable identity; must conform to `Hashable` |
| `id` | `Self.ID` | The stable identity of the entity associated with this instance |

## Usage

```swift
struct User: Identifiable {
    let id: UUID
    var name: String
}

// SwiftUI List automatically uses `id` for diffing
List(users) { user in
    Text(user.name)
}
```

## Notes

- Availability: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Class types receive a default `id` implementation based on `ObjectIdentifier` (unique for the object's lifetime only)
- The scope and duration of identity is unspecified by the protocol; document the nature of identity in your conforming type
- Widely used in SwiftUI `List`, `ForEach`, and diffing APIs

## Related

- [Hashable](./hashable.md)
- [Equatable](./equatable.md)
