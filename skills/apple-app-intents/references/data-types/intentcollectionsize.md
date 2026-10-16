---
source: https://developer.apple.com/documentation/appintents/intentcollectionsize
---

# IntentCollectionSize

A size specification for a collection of intent values (the source page gives no abstract).

## Signature / Usage

```swift
struct IntentCollectionSize
```

```swift
init(exactly: Int)
init(min: Int, max: Int)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(exactly:)` | `init(exactly: Int)` | Initializer (no abstract in source). |
| `init(min:max:)` | `init(min: Int, max: Int)` | Initializer (no abstract in source). |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `Equatable`, `ExpressibleByIntegerLiteral`.
- The source page has no overview text; the semantics of `min` / `max` are not documented there and are not described here.

## Related

- [IntentItemCollection](./intentitemcollection.md)
- [IntentItem](./intentitem.md)
- [IntentResponseStream](./intentresponsestream.md)
