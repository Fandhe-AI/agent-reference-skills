# @Relationship

Specifies the options SwiftData uses to manage a persistent relationship between two model classes, including the delete rule and optional inverse.

## Signature / Usage

```swift
@attached(peer)
macro Relationship(
    _ options: Schema.Relationship.Option...,
    deleteRule: Schema.Relationship.DeleteRule = .nullify,
    minimumModelCount: Int? = 0,
    maximumModelCount: Int? = 0,
    originalName: String? = nil,
    inverse: AnyKeyPath? = nil,
    hashModifier: String? = nil
)
```

```swift
@Model
class Trip {
    var name: String
    @Relationship(deleteRule: .cascade, inverse: \Destination.trip)
    var destinations: [Destination] = []

    init(name: String) { self.name = name }
}

@Model
class Destination {
    var name: String
    var trip: Trip?

    init(name: String) { self.name = name }
}
```

## Options / Props

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `options` | `Schema.Relationship.Option...` | — | Additional relationship options |
| `deleteRule` | `Schema.Relationship.DeleteRule` | `.nullify` | What happens to related models when the owner is deleted |
| `minimumModelCount` | `Int?` | `0` | Minimum relationship cardinality |
| `maximumModelCount` | `Int?` | `0` | Maximum relationship cardinality (0 = unlimited) |
| `originalName` | `String?` | `nil` | Previous name, for lightweight rename migrations |
| `inverse` | `AnyKeyPath?` | `nil` | Key path of the inverse side of the relationship |
| `hashModifier` | `String?` | `nil` | Forces schema version bump for the property |

### `Schema.Relationship.DeleteRule` values

| Value | Description |
|-------|-------------|
| `.nullify` | Sets the inverse to `nil` (default) |
| `.cascade` | Deletes related objects when the owner is deleted |
| `.deny` | Prevents deletion if related objects exist |
| `.noAction` | No action taken on related objects |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- SwiftData infers relationships automatically for properties typed as another `@Model` class; use `@Relationship` to override delete rules or declare inverses explicitly
- Optional relationship properties are exempt from `minimumModelCount`/`maximumModelCount` when `nil`

## Related

- [@Model](./model-macro.md)
- [@Attribute](./attribute-macro.md)
