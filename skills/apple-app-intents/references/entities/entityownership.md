---
source: https://developer.apple.com/documentation/appintents/entityownership
---

# EntityOwnership

A type that represents the ownership and sharing characteristics of an app entity.

## Signature / Usage

```swift
struct EntityOwnership
```

```swift
// Single ownership and sharing state:
var ownership: EntityOwnership { .shared }

// or

// Combined ownership and sharing states:
var ownership: EntityOwnership { [.shared, .public] }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `public` | `static let public: EntityOwnership` | A state that indicates the entity represents data a person shares publicly. |
| `shared` | `static let shared: EntityOwnership` | A state that indicates a person shares the entity with specific collaborators. |
| `unknown` | `static let unknown: EntityOwnership` | A state that indicates that entity ownership or sharing status is unknown or unspecified. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Provides flag-based ownership information. Specify a single state, or combine states using an `OptionSet`.
- Conforms to: `Equatable`, `ExpressibleByArrayLiteral`, `OptionSet`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `SetAlgebra`.
- Listed in the June 2026 updates (see updates/appintents).

## Related

- [OwnershipProvidingEntity](./ownershipprovidingentity.md)
- [AppEntity](./appentity.md)
