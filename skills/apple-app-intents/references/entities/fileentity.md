---
source: https://developer.apple.com/documentation/appintents/fileentity
---

# FileEntity

An entity that refers to a document or other file.

## Signature / Usage

```swift
protocol FileEntity : AppEntity where Self.ID == FileEntityIdentifier
```

```swift
static var supportedContentTypes: [UTType]
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `supportedContentTypes` | `static var supportedContentTypes: [UTType]` (required) | A list of selectable type identifiers. The default value is 'public.item'. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- `ID` must be `FileEntityIdentifier` ("An identifier for an app entity that refers to a document or other file."). See the EntityIdentifier page.
- The source page has no overview text or code listing beyond the declaration above.

## Related

- [AppEntity](./appentity.md)
- [EntityIdentifier](./entityidentifier.md)
- [IndexedEntity](./indexedentity.md)
