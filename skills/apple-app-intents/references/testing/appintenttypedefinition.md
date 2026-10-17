---
source: https://developer.apple.com/documentation/appintentstesting/appintenttypedefinition
---

# AppIntentTypeDefinition

A protocol that associates a definition type with its corresponding instance type.

## Signature / Usage

```swift
protocol AppIntentTypeDefinition
```

`AppIntentTypeDefinition` bridges a definition type you use to retrieve your intent, entity, and enum type, and the type-erased instance of your concrete intent, entity, or enum. For example, it bridges `AppEntityDefinition` to `AnyAppEntity`. Validate that a given instance was produced from the correct definition using `isInstance(_:)`.

```swift
associatedtype Instance : IntentValueConvertible

func isInstance(Self.Instance) throws
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `Instance` | `associatedtype Instance : IntentValueConvertible` | The instance type that corresponds to this definition type. (required) |
| `isInstance(_:)` | `func isInstance(Self.Instance) throws` | Validates that the provided value matches this definition's type. (required) |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforming types: `AppEntityDefinition`, `AppEnumDefinition`, `TransientAppEntityDefinition`.
- `DynamicPropertyPath.as(_:)` uses `IntentType.Instance` of this protocol as its return type.

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [AnyAppEntity](./anyappentity.md)
- [DynamicPropertyPath](./dynamicpropertypath.md)
- [IntentValuePropertiesCallable](./intentvaluepropertiescallable.md)
