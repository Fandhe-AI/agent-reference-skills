---
source: https://developer.apple.com/documentation/appintentstesting/dynamicpropertypath
---

# DynamicPropertyPath / DynamicPropertyPathCollection

A type-safe, dynamic path to access nested intent values (`DynamicPropertyPath`), and the indexed result items from an intent value query (`DynamicPropertyPathCollection`).

## Signature / Usage

```swift
@dynamicMemberLookup struct DynamicPropertyPath
```

```swift
struct DynamicPropertyPathCollection
```

You typically don't create instances of `DynamicPropertyPath` directly. The system returns instances of the type to indicate that you can further traverse a nested property. Use it for chained property access and array indexing on entities and intent results.

```swift
// Navigate nested properties.
let name: String = try entity.profile.name

// Index properties into an array.
let first: String = try entity.tags[0]

// Cast the entity to a known entity type definition.
let coffee: AnyAppEntity = try result.value.as(CoffeeEntity)
```

## Options / Props

`DynamicPropertyPath` members:

| Member | Declaration | Description |
|--------|-------------|-------------|
| `as(_:)` | `func `as`<T>(T.Type) throws -> T` | Casts a property to the provided type. |
| `as(_:)` | `func `as`<IntentType>(IntentType) throws -> IntentType.Instance` | Casts the value to the given type. |
| `subscript<T>(_:)` | `subscript<T>(Int) -> T` | Accesses a collection element by index, for comparison with a known value. |
| `subscript(_:)` | `subscript(Int) -> DynamicPropertyPath` | Accesses a nested property on a collection element by index. |
| `subscript(_:)` | `subscript(Int) -> (any IntentValueExpressing)?` | Accesses a collection element by index, without casting. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> DynamicPropertyPath` | Creates a dynamic path for navigating deeper into a nested property hierarchy. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> (any IntentValueExpressing)?` | Accesses a property by name without casting. |
| `subscript<T>(dynamicMember:)` | `subscript<T>(dynamicMember _: String) -> T` | Accesses a typed property at the current path by name. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- `DynamicPropertyPath` conforms to `Sendable`, `SendableMetatype`.
- `DynamicPropertyPathCollection` is documented only by its abstract ("Indexed result items from an intent value query.") and its declaration in the App Intents Testing topic list; it is the type of `ResolvedValueQueryResult.items`. Its member page is not in this reference set.

## Related

- [ResolvedIntentResult](./resolvedintentresult.md)
- [ResolvedValueQueryResult](./resolvedvaluequeryresult.md)
- [AppIntentTypeDefinition](./appintenttypedefinition.md)
- [IntentValuePropertiesCallable](./intentvaluepropertiescallable.md)
