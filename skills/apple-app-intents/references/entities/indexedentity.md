---
source: https://developer.apple.com/documentation/appintents/indexedentity
---

# IndexedEntity

An interface that allows you to include an entity in your app's Spotlight index.

## Signature / Usage

```swift
protocol IndexedEntity : AppEntity
```

```swift
var attributeSet: CSSearchableItemAttributeSet
var defaultAttributeSet: CSSearchableItemAttributeSet
var hideInSpotlight: Bool
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `attributeSet` | `var attributeSet: CSSearchableItemAttributeSet` (required; 1 default implementation) | A custom attribute set that you include with your entity to improve search accuracy. |
| `defaultAttributeSet` | `var defaultAttributeSet: CSSearchableItemAttributeSet` | The default set of attributes to include with your app entity in the Spotlight index. |
| `hideInSpotlight` | `var hideInSpotlight: Bool` (required; 1 default implementation) | A Boolean value that indicates whether Spotlight prevents the inclusion of the entity in the index. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+ (no tvOS / watchOS entry in the source)
- Adopt this protocol in app entities you want to include in your app's Spotlight index. Adding entities to Spotlight makes them discoverable by Apple Intelligence, and serves as the first step in letting Spotlight launch your app and display items that appear in search results.
- Use the properties of this protocol to configure additional Spotlight metadata to accompany your app entity in the index.
- Article: Making app entities available in Spotlight (indexing and donating entities). `CSSearchableItemAttributeSet` itself belongs to Core Spotlight, which is outside this skill.

## Related

- [AppEntity](./appentity.md)
- [FileEntity](./fileentity.md)
