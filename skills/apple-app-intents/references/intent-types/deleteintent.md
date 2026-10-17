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

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (version not listed on the page), watchOS 9.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- The page has no overview text beyond the abstract.

## Related

- [SystemIntent](./systemintent.md)
- [OpenIntent](./openintent.md)
- [SetValueIntent](./setvalueintent.md)
- [DeprecatedAppIntent](./deprecatedappintent.md)
