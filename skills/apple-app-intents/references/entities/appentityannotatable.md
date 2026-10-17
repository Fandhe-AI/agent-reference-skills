---
source: https://developer.apple.com/documentation/appintents/appentityannotatable
---

# AppEntityAnnotatable

An interface that system types adopt and use to manage their relationship to app entities.

## Signature / Usage

```swift
protocol AppEntityAnnotatable
```

```swift
var appEntityIdentifier: EntityIdentifier?
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `appEntityIdentifier` | `var appEntityIdentifier: EntityIdentifier?` (required) | The identifier of an app entity you want to associate with a system type. |

## Notes

- iOS 18.2+, iPadOS 18.2+, Mac Catalyst 18.2+, macOS 15.2+, tvOS 18.2+, visionOS 2.2+, watchOS 11.2+
- System types adopt this protocol to store a reference to an app entity. Do not add support for this protocol to your own custom types; the system incorporates it into types like `NSUserActivity` to support your custom entities. The presence of an entity improves system experiences like Apple Intelligence, Siri, and Shortcuts.
- Conforming types listed on the page: `ShortcutsUIButton`, `SiriTipUIView`.
- Article: Providing contextual cues to Apple Intelligence and Siri (annotating your interface with app entities).

## Related

- [EntityIdentifier](./entityidentifier.md)
- [AppEntity](./appentity.md)
