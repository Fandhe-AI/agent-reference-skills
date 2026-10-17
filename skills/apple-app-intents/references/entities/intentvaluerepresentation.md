---
source: https://developer.apple.com/documentation/appintents/intentvaluerepresentation
---

# IntentValueRepresentation

A transfer representation that enables bidirectional conversion between app entities and system intent values.

## Signature / Usage

```swift
struct IntentValueRepresentation<Item, IntentValue> where Item : Transferable, IntentValue : _IntentValue, IntentValue : Sendable
```

```swift
// Export only
ValueRepresentation(
    exporting: { entity in
        IntentPerson(name: .displayName(entity.name))
    }
)

// Import only
ValueRepresentation(
    importing: { person in
        ContactEntity(name: person.name.displayString)
    }
)

// Bidirectional
ValueRepresentation(
    exporting: { entity in
        IntentPerson(name: .displayName(entity.name))
    },
    importing: { person in
        ContactEntity(name: person.name.displayString)
    }
)
```

```swift
struct LocationEntity: TransientAppEntity, Transferable {
    @Property
    var place: PlaceDescriptor

    static var transferRepresentation: some TransferRepresentation {
        ValueRepresentation(exporting: \.place)
    }
}
```

## Options / Props

| Initializer | Declaration | Available when |
| --- | --- | --- |
| `init(exporting:)` | `init(exporting: (Item) async throws -> IntentValue)` | `Item` conforms to `Transferable` and `IntentValue` conforms to `_SystemIntentValue`. Exports an entity to a system intent value. |
| `init(exporting:)` | `init(exporting: (Item) async throws -> IntentValue)` | `Item` conforms to `Transferable` and `IntentValue` is `IntentPerson`. Exports an entity to an `IntentPerson`. |
| `init(exporting:importing:)` | `init(exporting: (Item) async throws -> IntentValue, importing: (IntentValue) async throws -> Item)` | `IntentValue` conforms to `_SystemIntentValue`. Bidirectional conversion between an entity and a system intent value. |
| `init(exporting:importing:)` | same shape | `IntentValue` is `IntentPerson`. Bidirectional conversion between an entity and an `IntentPerson`. |
| `init(importing:)` | `init(importing: (IntentValue) async throws -> Item)` | `IntentValue` is `IntentPerson`. Imports an `IntentPerson` into an entity. |
| `init(importing:)` | `init(importing: (IntentValue) async throws -> Item)` | `IntentValue` conforms to `_SystemIntentValue`. Imports a system intent value into an entity. |

## Notes

- iOS 26.4+, iPadOS 26.4+, Mac Catalyst 26.4+, macOS 26.4+, tvOS 26.4+, visionOS 26.4+, watchOS 26.4+
- Bridges custom `AppEntity` types and system-provided intent values (like `IntentPerson`, `PlaceDescriptor`, and other `_SystemIntentValue` types). Create a representation that supports export only, import only, or both.
- For entities that directly contain a system intent value property, use the key-path form `ValueRepresentation(exporting: \.place)`.
- `AppEntity.ValueRepresentation` is a type alias for `IntentValueRepresentation`, which is why the snippets write `ValueRepresentation(...)`.
- Conforms to: `Sendable`, `SendableMetatype`, `TransferRepresentation` (CoreTransferable).
- Articles: Defining app entities for your custom data types; Providing contextual cues to Apple Intelligence and Siri.

## Related

- [AppEntity](./appentity.md)
- [AppValue / AnyIntentValue](./appvalue.md)
- [TransientAppEntity](./transientappentity.md)
