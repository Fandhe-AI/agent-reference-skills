---
source: https://developer.apple.com/documentation/appintents/property-comparators
---

# Property comparators (EqualToComparator and 10 related types)

Specify the type of comparison to perform during a property-matched query.

## Signature / Usage

```swift
final class EqualToComparator<Property, PropertyType, ComparatorMappingType> where Property : EntityProperty<PropertyType>, PropertyType : _IntentValue, PropertyType : Equatable, PropertyType : Sendable

init(mappingTransform: (PropertyType) -> ComparatorMappingType)

init<Spec>(withResolvers: () -> Spec, mappingTransform: (PropertyType) -> ComparatorMappingType)
```

```swift
final class IsBetweenComparator<Property, PropertyType, InputType, ComparatorMappingType> where Property : EntityProperty<PropertyType>, PropertyType : _IntentValue, PropertyType : Sendable, InputType : Comparable, InputType == PropertyType.UnwrappedType

init(mappingTransform: (InputType, InputType) -> ComparatorMappingType)
```

## Options / Props

| Name | Group | Description |
| --- | --- | --- |
| `EqualToComparator` | Equatable comparisons | Determines whether the value of an equatable property is equal to the specified value. |
| `NotEqualToComparator` | Equatable comparisons | Determines whether the value of an equatable property is not equal to the specified value. |
| `GreaterThanComparator` | Equatable comparisons | Determines whether the value of a comparable property is greater than the specified value. |
| `GreaterThanOrEqualToComparator` | Equatable comparisons | Determines whether the value of a comparable property is greater than or equal to the specified value. |
| `LessThanComparator` | Equatable comparisons | Determines whether the value of a comparable property is less than the specified value. |
| `LessThanOrEqualToComparator` | Equatable comparisons | Determines whether the value of a comparable property is less than or equal to the specified value. |
| `IsBetweenComparator` | Equatable comparisons | Only supported for `Date` types in Shortcuts. Initializers: `init(mappingTransform:)`, `init(withResolvers:mappingTransform:)` ("Declares support for `Between` comparisons between a property and user-supplied values."). |
| `HasPrefixComparator` | String comparisons | Determines whether the value of a string property has the specified prefix. Declares support for the `hasPrefix` operator between a `String` property and user-supplied values. |
| `HasSuffixComparator` | String comparisons | Determines whether the value of a string property has the specified suffix. |
| `StringComparisonOperator` | String comparisons | `enum StringComparisonOperator` (no abstract on the page). |
| `ContainsComparator` | Containment comparisons | Determines whether the value of a sequence property contains the specified value. Overloads declare `contains` support for `String`, `String?`, `AttributedString`, `AttributedString?`, `Array`, and optional `Array` properties; each exists as `init(mappingTransform:)` and `init(withResolvers:mappingTransform:)`. |

## Notes

- Platforms (each comparator page, except `StringComparisonOperator`, whose page is not saved in the source): iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- All concrete comparators inherit from `EntityQueryComparator` ("the base class for all concrete entity query comparators") and are used inside an `EntityQueryProperty` / `EntityQueryProperties` block. The `mappingTransform` closure turns the runtime user-supplied value into your `ComparatorMappingType`, which is later passed to `EntityPropertyQuery.entities(matching:mode:sortedBy:limit:)`.
- `EqualToComparator` declares support for `Equatable` `==` comparisons between a property and user-supplied values. `withResolvers:` initializers take a resolver specification (`Spec`) closure.
- `EqualToComparator` and `NotEqualToComparator` require an `Equatable` property type; the four ordering comparators require a `Comparable` property type.
- Full generic declarations are reproduced above only for `EqualToComparator` and `IsBetweenComparator`; for the other comparators the source pages were not read for generic constraints beyond what is stated above. Check the official page before relying on a signature.
- The collection page also lists property declaration macros and types under "See Also" (`ComputedProperty()`, `DeferredProperty()`, `EntityProperty`, `EntityPropertyModifiers`); those belong to entity property declarations, not to this page.

## Related

- [EntityQueryProperty](./entityqueryproperty.md)
- [EntityQueryProperties](./entityqueryproperties.md)
- [EntityPropertyQuery](./entitypropertyquery.md)
