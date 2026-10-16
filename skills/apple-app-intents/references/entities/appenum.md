---
source: https://developer.apple.com/documentation/appintents/appenum
---

# AppEnum

An interface to express that a custom type has a predefined, static set of values.

## Signature / Usage

```swift
protocol AppEnum : AppValue, StaticDisplayRepresentable, RawRepresentable where Self.RawValue : LosslessStringConvertible
```

```swift
enum ActivityStyle: String, AppEnum {
    case biking
    case equestrian
    case hiking
    case jogging
    case crossCountrySkiing
    case snowshoeing

    // Describe the overall type.
    static var typeDisplayRepresentation: TypeDisplayRepresentation {
        TypeDisplayRepresentation(
            name: LocalizedStringResource("Activity style", table: "AppIntents"),
            numericFormat: LocalizedStringResource("\(placeholder: .int) data", table: "AppIntents"))
    }

    // Describe the individual cases.
    static var caseDisplayRepresentations: [Self: DisplayRepresentation] = [
        .biking: DisplayRepresentation(title: "Biking", subtitle: "Mountain bike ride"),
        .equestrian: DisplayRepresentation(title: "Equestrian", subtitle: "Equestrian sports"),
        .hiking: DisplayRepresentation(title: "Hiking", subtitle: "A lengthy outdoor walk"),
        .jogging: DisplayRepresentation(title: "Jogging", subtitle: "A gentle run"),
        .crossCountrySkiing: DisplayRepresentation(title: "Skiing", subtitle: "Cross-country skiing"),
        .snowshoeing: DisplayRepresentation(title: "Snowshoeing", subtitle: "Walking in the snow")
    ]
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: some ResolverSpecification` | Resolving the type (no abstract in the source). |
| `typeDisplayRepresentation` | `static var typeDisplayRepresentation: TypeDisplayRepresentation` (required, via `TypeDisplayRepresentable`) | A short, localized, human-readable name for the type. |
| `caseDisplayRepresentations` | `static var caseDisplayRepresentations: [Self : DisplayRepresentation]` (required, via `CaseDisplayRepresentable`) | A dictionary that maps each value to the visual elements that represent it. |
| `EnumURLRepresentation` | `struct EnumURLRepresentation` | URL representation; see URLRepresentableEnum. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON; the framework is visionOS 1.0+)
- When you want an app intent parameter or app entity property to have a fixed set of values, set the type of the underlying property to one that adopts `AppEnum`. For best results, base the enumeration on a type easily convertible to a string such as `String` or `Int`.
- You are responsible for implementing `TypeDisplayRepresentable` and `CaseDisplayRepresentable`, providing descriptions of the type and of each case. The system uses them in dialogs and to resolve parameters more quickly.
- Don't adopt `AppEntity` and `AppEnum` in the same type. An app entity represents data that can change dynamically; an `AppEnum` represents static data that doesn't change.
- Inherits from: `AppValue`, `CaseDisplayRepresentable`, `CaseIterable`, `CustomLocalizedStringResourceConvertible`, `Equatable`, `Hashable`, `PersistentlyIdentifiable`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `StaticDisplayRepresentable`, `TypeDisplayRepresentable`.
- Inherited by: `AppUnionValueCasesProviding`, `AssistantEnum`, `AssistantSchemaEnum`, `URLRepresentableEnum`. Conforming types: `StringSearchScope`, `VideoCategory`.
- Articles: Adding parameters to an app intent; Defining app entities for your custom data types; Responding to the Action button on Apple Watch Ultra; Getting started with the App Intents framework.

## Related

- [AppValue](./appvalue.md)
- [AppEntity](./appentity.md)
- [DisplayRepresentable protocols](./display-representable-protocols.md)
- [URLRepresentableEnum](./urlrepresentableenum.md)
- [UnionValue](./unionvalue.md)
