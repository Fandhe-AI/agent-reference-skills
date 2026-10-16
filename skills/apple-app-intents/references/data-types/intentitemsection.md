---
source: https://developer.apple.com/documentation/appintents/intentitemsection
---

# IntentItemSection

An object you use to divide dynamic options into sections.

## Signature / Usage

```swift
struct IntentItemSection<Result> where Result : _IntentValue
```

```swift
init(_: LocalizedStringResource, items: [Result])
init(_: LocalizedStringResource, items: [IntentItem<Result>])
init(_: LocalizedStringResource?, itemsBuilder: () -> [IntentItem<Result>])
init(_: LocalizedStringResource, subtitle: LocalizedStringResource?, image: DisplayRepresentation.Image?, itemsBuilder: () -> [IntentItem<Result>])
init(items: [IntentItem<Result>])
```

The system returns an `IntentItemSection` within an `IntentItemCollection`.

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `items` | `var items: [IntentItem<Result>]` | The items in the section. |
| `description` | `var description: DisplayRepresentation?` | How the section header is displayed. |
| `Builder` | `enum Builder` | Available when `Result` conforms to `_IntentValue`. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Deprecated: `init(title: LocalizedStringResource, items: [IntentItem<Result>])` is flagged deprecated in the source; no replacement text is given.
- Conforms to `Sendable`, `SendableMetatype`.

## Related

- [IntentItemCollection](./intentitemcollection.md)
- [IntentItem](./intentitem.md)
