---
source: https://developer.apple.com/documentation/appintents/entityqueryproperties
---

# EntityQueryProperties

A type that provides the properties to include in a property-matched query.

## Signature / Usage

```swift
struct EntityQueryProperties<Entity, ComparatorMappingType> where Entity : AppEntity
```

```swift
var properties = QueryProperties {
    Property(\.$myDate) {
        LessThanComparator { /* ... body of mapping transform ... */ }
        GreaterThanComparator { /* ... body of mapping transform ... */ }
    }
    Property(\.$myArray) {
        ContainsComparator { /* ... body of mapping transform ... */ }
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(properties:)` | `init(properties: () -> [EntityQueryPropertyDeclaration<Entity, ComparatorMappingType>])` | Creates the query properties (no abstract on the page). |
| `EntityQueryPropertiesBuilder` | `enum EntityQueryPropertiesBuilder` | A result builder that allows you to declaratively describe the properties to include in a property-matched query. |
| `subscript(_:)` | `subscript(Int) -> EntityQueryPropertyDeclaration<Entity, ComparatorMappingType>` | Gets a query property by index (no abstract on the page). |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- Contains all the supported properties a user can query against an entity for a given query. Declare query properties with a block containing all applicable `EntityQueryProperty` objects.
- Used as the type of `EntityPropertyQuery.properties`.

## Related

- [EntityPropertyQuery](./entitypropertyquery.md)
- [EntityQueryProperty](./entityqueryproperty.md)
- [Property comparators](./property-comparators.md)
