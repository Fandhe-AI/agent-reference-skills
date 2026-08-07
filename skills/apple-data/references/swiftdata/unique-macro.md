# @Unique

Specifies the key-paths that SwiftData uses to enforce uniqueness of model instances. Supports single-attribute constraints, compound constraints across multiple attributes, or a combination.

## Signature / Usage

```swift
@freestanding(declaration)
macro Unique<T>(_ constraints: [PartialKeyPath<T>]...)
where T : PersistentModel
```

```swift
@Model
final class Person {
    // Declare any unique constraints as part of the model definition.
    #Unique<Person>([\.id], [\.givenName, \.familyName])

    var id: UUID
    var givenName: String
    var familyName: String

    init(id: UUID, givenName: String, familyName: String) {
        self.id = id
        self.givenName = givenName
        self.familyName = familyName
    }
}
```

This declares that every `Person` instance has a unique `id`, and that no two instances share the same `givenName` and `familyName` combination.

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `constraints` | `[PartialKeyPath<T>]...` | Arrays of model key-paths that form the unique constraints to apply to the enclosing model |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 1.0+, watchOS 11.0+
- Written as `#Unique<T>(...)` inside a `@Model` class body, unlike `@Attribute(.unique)` which is a property-level annotation
- For relationship attributes, SwiftData only supports unique constraints on relationships that reference a single persistent model, not an array of persistent models

## Related

- [@Model](./model-macro.md)
- [@Attribute](./attribute-macro.md)
- [@Index](./index-macro.md)
