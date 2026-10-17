---
source: https://developer.apple.com/documentation/appintents/entityproperty
---

# EntityProperty

A property wrapper that exposes the associated property to the system.

## Signature / Usage

```swift
@propertyWrapper final class EntityProperty<Value> where Value : _IntentValue, Value : Sendable
```

The `AppEntity` page uses the wrapper through the `AppEntity.Property` type alias (`@Property`):

```swift
@Property var name: String

@Property(title: "Region")
var regionDescription: String

@Property var trailLength: Measurement<UnitLength>
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `wrappedValue` | `var wrappedValue: ...` | No abstract in the source; the declared value type is not recorded in the saved fragments beyond the name. |
| `projectedValue` | `var projectedValue: ...` | No abstract in the source; same note as above. |
| `init()` and variants | many `init(...)` overloads constrained by `Value` (for example `Value.ValueType` is `IntentCurrencyAmount`, `Date`, `Measurement<UnitAngle>`, and so on) | "Creates an app intent entity property." One overload per supported value type; the saved topic list names them all `init()` with differing generic constraints. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- The source page has no overview text or code listing. The initializer list is generated (Initializers / Instance Properties) and consists of per-value-type `init()` overloads; their individual parameter lists were not captured in the saved JSON, so none are reproduced here.
- Related "Property declarations" group: `ComputedProperty()` overloads, `DeferredProperty()` overloads, `EntityPropertyModifiers`, Property comparators.
- Referenced from this page: `AnyIntentValue` ("A type the system uses to access a parameter or property value.").

## Related

- [ComputedProperty() macro](./computedproperty.md)
- [DeferredProperty() macro](./deferredproperty.md)
- [AppEntity](./appentity.md)
- [AppValue / AnyIntentValue](./appvalue.md)
