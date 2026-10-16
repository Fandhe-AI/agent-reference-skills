---
source: https://developer.apple.com/documentation/appintents/transientappentity
---

# TransientAppEntity

A type that represents a transient model object which exposes its interface to App Intents via properties. Note that `TransientAppEntity` types are not meant to be queried.

## Signature / Usage

```swift
protocol TransientAppEntity : AppEntity
```

```swift
init()
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init()` | `init()` (required) | Transient entities must be initializable so they can be initialized and populated by the system. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- Not meant to be queried (contrast with `AppEntity`, which requires `defaultQuery`).
- The source page has no overview text or code listing beyond the declaration.

## Related

- [AppEntity](./appentity.md)
- [UniqueAppEntity](./uniqueappentity.md)
