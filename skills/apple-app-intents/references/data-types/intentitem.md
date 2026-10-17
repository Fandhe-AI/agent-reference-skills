---
source: https://developer.apple.com/documentation/appintents/intentitem
---

# IntentItem

A type describing a value returned from a dynamic options provider, plus information about how to display it to users.

## Signature / Usage

```swift
struct IntentItem<Value> where Value : _IntentValue
```

```swift
init(_: Value)
init(_: Value, title: LocalizedStringResource, subtitle: LocalizedStringResource?, image: DisplayRepresentation.Image?)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(_:)` | `init(_: Value)` | Initialize an `IntentItem` and use `displayRepresentation` from `value`. |
| `init(_:title:subtitle:image:)` | `init(_: Value, title: LocalizedStringResource, subtitle: LocalizedStringResource?, image: DisplayRepresentation.Image?)` | Creates an item with the specified value and visual attributes. |
| `value` | `var value: Value` | The wrapped value. |
| `description` | `var description: DisplayRepresentation` | How the item is displayed. |
| `Builder` | `enum Builder` | Available when `Value` conforms to `_IntentValue`. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `Sendable`, `SendableMetatype`.
- Listed under "Items and collections" together with `IntentItemCollection`, `IntentItemSection`, `IntentCollectionSize`, `IntentResponseStream`.

## Related

- [IntentItemCollection](./intentitemcollection.md)
- [IntentItemSection](./intentitemsection.md)
- [IntentCollectionSize](./intentcollectionsize.md)
- [IntentResponseStream](./intentresponsestream.md)
