---
source: https://developer.apple.com/documentation/appintentstesting/anyappentity
---

# AnyAppEntity

A type-erased, intermediate representation of your app entity for testing purposes.

## Signature / Usage

```swift
@dynamicMemberLookup struct AnyAppEntity
```

The structure resolves to your actual entity type and gives you access to its properties:

```swift
// Define your app entity type from your app bundle:
let definitions = IntentDefinitions(
    bundleIdentifier: "com.apple.example"
)
let exampleEntity = definitions.entities[
    "ExampleEntity"
]

// Create an entity from an identifier.
let entity = exampleEntity.makeReference(
    identifier: "my-example"
)

// Type-safe access to the entity's properties.
let name: String? = entity.name
let itemCount: Int? = entity.itemCount

// Accessing nested properties (requires try).
if try entity.profile.name == "John Doe" {
    print("User found")
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `identifier` | `var identifier: AttributedEntityIdentifier` | The value that uniquely identifies the app entity. |
| `exported(as:)` | `func exported<T>(as: T.Type) async throws -> T` | Exports this entity as a system intent value type. |
| `exported(as:)` | `func exported<T>(as: T.Type) async throws -> T` | Exports this entity as a transferable intent value type. |
| `exported(as:)` | `func exported(as: UTType?) async throws -> IntentFile` | Exports this entity's content as an `IntentFile`. |
| `subscript<T>(dynamicMember:)` | `subscript<T>(dynamicMember _: String) -> T` | Accesses an entity property by name, for comparison with a known value. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> DynamicPropertyPath` | Accesses a nested entity property by name. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> (any IntentValueExpressing)?` | Accesses an entity property by name, without casting. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Copyable`, `Equatable`, `Escapable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`.
- The page lists the first two `exported(as:)` overloads with identical generic declarations; the original constraints that distinguish them (system intent value type vs transferable intent value type) are not shown in the rendered fragments.

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [AnyAppIntent](./anyappintent.md)
- [AnyEntityQuery](./anyentityquery.md)
- [AnyTransientAppEntity](./anytransientappentity.md)
- [DynamicPropertyPath](./dynamicpropertypath.md)
