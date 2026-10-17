---
source: https://developer.apple.com/documentation/appintentstesting/anytransientappentity
---

# AnyTransientAppEntity

A type-erased representation of a transient app entity that provides dynamic property access.

## Signature / Usage

```swift
@dynamicMemberLookup struct AnyTransientAppEntity
```

Use `AnyTransientAppEntity` to work with transient entities when you don't know the specific entity type at compile time:

```swift
// Getting transient entity definitions.
let definitions = IntentDefinitions(bundleIdentifier: "com.apple.example")
let sessionEntity = definitions.transientEntities["UserSessionEntity"]

// Creating a transient entity with properties.
var entity = sessionEntity.withProperties(
    name: "John Doe",
    age: 30
)

// Accessing properties with type safety.
let userName: String? = try entity.name
let userAge: Int? = try entity.age

// Accessing nested properties (requires try).
if try entity.profile.name == "John Doe" {
    print("User found")
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `entityType` | `var entityType: AttributedTypeIdentifier` | The type of transient app entity represented by this identifier. |
| `exported(as:)` | `func exported<T>(as: T.Type) async throws -> T` | Exports this transient entity as a transferable intent value type. |
| `exported(as:)` | `func exported(as: UTType?) async throws -> IntentFile` | Exports this transient entity's content as an `IntentFile`. |
| `exported(as:)` | `func exported<T>(as: T.Type) async throws -> T` | Exports this transient entity as a system intent value type. |
| `subscript<T>(dynamicMember:)` | `subscript<T>(dynamicMember _: String) -> T` | Accesses an entity property by name, for comparison with a known value. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> DynamicPropertyPath` | Accesses a nested entity property by name. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> (any IntentValueExpressing)?` | Accesses an entity property by name, without casting. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Copyable`, `Equatable`, `Escapable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`.
- Create instances through `IntentDefinitions.transientEntities[...]` and `TransientAppEntityDefinition.makeEntity` (an `IntentValuePropertiesCallable<AnyTransientAppEntity>`). The `withProperties(...)` call in the example is from the page's code listing; its declaration is not in this reference set.
- Apple's reference lists three `exported(as:)` overloads whose constraint differences are not shown in the rendered fragments.

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [IntentValuePropertiesCallable](./intentvaluepropertiescallable.md)
- [AnyAppEntity](./anyappentity.md)
- [DynamicPropertyPath](./dynamicpropertypath.md)
