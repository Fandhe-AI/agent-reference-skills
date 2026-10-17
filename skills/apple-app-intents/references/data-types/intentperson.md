---
source: https://developer.apple.com/documentation/appintents/intentperson
---

# IntentPerson

Information that identifies a person participating in an intents-based interaction.

## Signature / Usage

```swift
struct IntentPerson
```

```swift
init(identifier: IntentPerson.Identifier, name: IntentPerson.Name, handle: IntentPerson.Handle?, aliases: [IntentPerson.Handle], isMe: Bool, image: DisplayRepresentation.Image?)

init(handle: IntentPerson.Handle)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `name` | `var name: IntentPerson.Name` | The name of this `IntentPerson`. |
| `handle` | `var handle: IntentPerson.Handle?` | The primary `Handle` used to contact this `IntentPerson`. |
| `aliases` | `var aliases: [IntentPerson.Handle]` | Other secondary `Handle`s used to contact this `IntentPerson`, if any. |
| `isMe` | `var isMe: Bool` | Whether this `IntentPerson` represents the owner of the device. |
| `image` | `var image: DisplayRepresentation.Image?` | An image representing this `IntentPerson`. |
| `identifier` | `var identifier: IntentPerson.Identifier` | Person-related identifier (no abstract in source). |
| `init(handle:)` | `init(handle: IntentPerson.Handle)` | Initializes an `IntentPerson` from a raw handle, like a phone number or an email address. Use this initializer when the value is not linked to a known contact. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: EmptyResolverSpecification<IntentPerson>` | Type property. |
| `IntentPerson.Name` | `enum` (nested type) | Stores name-related information. |
| `IntentPerson.Handle` | `struct` (nested type) | A single way to contact a person. |
| `IntentPerson.Identifier` | `enum` (nested type) | Manages a unique identifier for a person. |
| `IntentPerson.ParameterMode` | `enum` (nested type) | The type of interface to show when someone chooses a parameter that contains information about a person. |
| `Specification`, `UnwrappedType`, `ValueType` | Type aliases | — |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `Copyable`, `CustomLocalizedStringResourceConvertible`, `Decodable`, `DisplayRepresentable`, `Encodable`, `Equatable`, `Escapable`, `InstanceDisplayRepresentable`, `IntentValueConvertible`, `IntentValueExpressing`, `Sendable`, `SendableMetatype`, `Transferable`, `TypeDisplayRepresentable`.
- Mentioned in the articles "Defining app entities for your custom data types", "Providing contextual cues to Apple Intelligence and Siri", and "Adding parameters to an app intent".
- Only the page-level declarations and the member titles/abstracts above were available in the saved source; the nested type members (`Name` cases, `Handle` properties, `Identifier` cases, `ParameterMode` cases) were not fetched and are not listed.

## Related

- [IntentValueConvertible](./intentvalueconvertible.md)
- [IntentValueExpressing](./intentvalueexpressing.md)
- [IntentFile](./intentfile.md)
