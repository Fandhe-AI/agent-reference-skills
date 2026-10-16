---
source: https://developer.apple.com/documentation/appintents/appvalue
---

# AppValue / AnyIntentValue

`AppValue` is an interface that describes conceptual types you use in app intents. `AnyIntentValue` is a type the system uses to access a parameter or property value.

## Signature / Usage

```swift
protocol AppValue : PersistentlyIdentifiable, TypeDisplayRepresentable, _IntentValue, Sendable
```

```swift
protocol AnyIntentValue : Sendable
```

```swift
// AnyIntentValue members
associatedtype Value : _IntentValue, Sendable
var title: LocalizedStringResource
var isOptional: Bool
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `Value` | `associatedtype Value : _IntentValue, Sendable` (required) | `AnyIntentValue`: getting the value type (no abstract in the source). |
| `title` | `var title: LocalizedStringResource` (required) | `AnyIntentValue`: type-specific information (no abstract in the source). |
| `isOptional` | `var isOptional: Bool` (required) | `AnyIntentValue`: type-specific information (no abstract in the source). |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON; the framework is visionOS 1.0+). Applies to both `AppValue` and `AnyIntentValue`.
- `AppValue` serves as the base type for conceptual interfaces like `AppEntity` or `AppEnum`.
- `AppValue` inherits from `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.
- `AppValue` inherited by: `AppEntity`, `AppEnum`, `AppUnionValueCasesProviding`, `AssistantEntity`, `AssistantEnum`, `AssistantSchemaEntity`, `AssistantSchemaEnum`, `FileEntity`, `IndexedEntity`, `OwnershipProvidingEntity`, `SyncableEntity`, `TransientAppEntity`, `URLRepresentableEntity`, `URLRepresentableEnum`, `UniqueAppEntity`. Conforming types: `StringSearchScope`, `VideoCategory`.
- `AnyIntentValue` conforming types: `EntityProperty`, `IntentParameter`, `IntentParameterContext`. It inherits from `Sendable` and `SendableMetatype`.

## Related

- [AppEntity](./appentity.md)
- [AppEnum](./appenum.md)
- [PersistentlyIdentifiable](./persistentlyidentifiable.md)
- [EntityProperty](./entityproperty.md)
