---
source: https://developer.apple.com/documentation/appintents/deleteintent
---

# DeleteIntent

Delete the associated entity(s).

## Signature / Usage

```swift
protocol DeleteIntent : SystemIntent
```

Required members (from the Topics section):

```swift
associatedtype Entity : AppEntity
var entities: [Self.Entity] { get }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `Entity` | `associatedtype Entity : AppEntity` | The entity type to delete (no abstract on the page). |
| `entities` | `var entities: [Self.Entity]` | The entities to delete (no abstract on the page). |
| `Target` | `associatedtype Target : AppEntityCollectionValue = [Self.Entity]` | iOS 27.3 beta. The type of target: an array or set of entities, or an `EntityCollection`. |
| `target` | `var target: Self.Target { get }` | iOS 27.3 beta. The entities to delete. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (version not listed on the page), watchOS 9.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- The page has no overview text beyond the abstract.
### target (iOS 27.3 beta)

Implement either `target` or `entities`, not both. Declare `target` as an array or set of entities, or as an `EntityCollection` to receive the entity identifiers without resolving each one, which saves time and memory when someone deletes many entities at once (example from the `target` page):

```swift
struct DeleteNotesIntent: DeleteIntent {
    static let title: LocalizedStringResource = "Delete Notes"

    @Parameter(title: "Notes")
    var target: EntityCollection<NoteEntity>

    func perform() async throws -> some IntentResult {
        try await NoteStore.shared.delete(target.identifiers)
        return .result()
    }
}
```

When `target` is an array or a set, the default implementation of `entities` returns its entities. When it is an `EntityCollection`, which only guarantees entity identifiers, the default implementation returns an empty array; read the identifiers from `target` instead. Platform metadata: iOS 27.3+ (beta), iPadOS, Mac Catalyst, macOS, tvOS, visionOS, watchOS 27.3+.

- Source: https://developer.apple.com/documentation/appintents/deleteintent/target-1cesv and https://developer.apple.com/documentation/appintents/deleteintent/target-swift.associatedtype (fetched 2026-11-14)

## Related

- [SystemIntent](./systemintent.md)
- [OpenIntent](./openintent.md)
- [SetValueIntent](./setvalueintent.md)
- [DeprecatedAppIntent](./deprecatedappintent.md)
- [AppEntityCollectionValue](../entities/appentitycollectionvalue.md)
