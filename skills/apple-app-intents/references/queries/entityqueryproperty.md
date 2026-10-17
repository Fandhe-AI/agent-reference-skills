---
source: https://developer.apple.com/documentation/appintents/entityqueryproperty
---

# EntityQueryProperty

An object that provides the supported comparators you use to describe the different ways users can query against a property of an app entity.

## Signature / Usage

```swift
final class EntityQueryProperty<Entity, Subject, Property, PropertyType, ComparatorMappingType> where Entity : AppEntity, Subject : AppEntity, Property : EntityProperty<PropertyType>, PropertyType : _IntentValue, PropertyType : Sendable
```

```swift
convenience init(
    KeyPath<Subject, Property>,
    comparators: () -> EntityQueryProperty<Entity, Subject, Property, PropertyType, ComparatorMappingType>.QueryComparators
)

init(
    KeyPath<Subject, Property>,
    entityProvider: (Entity) -> Subject,
    comparators: () -> EntityQueryProperty<Entity, Subject, Property, PropertyType, ComparatorMappingType>.QueryComparators
)
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(_:comparators:)` | `convenience init(KeyPath<Subject, Property>, comparators: () -> ...QueryComparators)` | Initializes an `EntityQueryProperty` that applies to the entity property at the provided key path. |
| `init(_:entityProvider:comparators:)` | `init(KeyPath<Subject, Property>, entityProvider: (Entity) -> Subject, comparators: () -> ...QueryComparators)` | Initializes an `EntityQueryProperty` that applies to the entity property at the provided key path, using `entityProvider` to get from the query's `Entity` to the `Subject`. |
| `QueryComparators` | `typealias QueryComparators` | A type alias for the type that represents a collection of query comparators. |
| `EntityQueryComparatorsBuilder` | `enum EntityQueryComparatorsBuilder` | A result builder that allows you to declaratively describe the comparators for a queryable property. |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- An entity query property is defined by providing a `KeyPath` to an `AppEntity` property in your data model that the property applies to, then specifying the set of supported `EntityQueryComparator`s for it. Inherits from `EntityQueryPropertyDeclaration`.
- You can define more than one comparator, with functionality beyond strict equality. The available comparators depend on the property type: an `Equatable` type allows `EqualToComparator` and `NotEqualToComparator`; a `Comparable` type adds `GreaterThanComparator`, `GreaterThanOrEqualToComparator`, `LessThanComparator`, and `LessThanOrEqualToComparator`.
- An `EntityQueryProperty` does not necessarily apply to a property of its parent query's `Entity`. For example, with Photo and Album entities, in an `EntityPropertyQuery` whose `Entity` is Photo you can define an `EntityQueryProperty` mapping to a name property of the Album entity, as long as the `entityProvider` closure contains the logic to get from a Photo entity to an Album entity (`init(_:entityProvider:comparators:)`).
- The official page has no code listing; the snippets above are declarations only.

## Related

- [EntityPropertyQuery](./entitypropertyquery.md)
- [EntityQueryProperties](./entityqueryproperties.md)
- [Property comparators](./property-comparators.md)
