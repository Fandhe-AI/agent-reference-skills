---
source: https://developer.apple.com/documentation/foundationmodels/imageattachmentcontent
---

# ImageAttachmentContent

A type that holds image data.

## Signature / Usage

```swift
struct ImageAttachmentContent
```

You don't create `ImageAttachmentContent` directly. Use one of the `Attachment` initializers to attach a `CGImage`, `CIImage`, `CVPixelBuffer`, or image file URL.

```swift
let response = try await session.respond {
    "Describe this image:"
    Attachment(image)
}
```

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- The page lists no members.
- Source fetched 2026-10-16 (DocC JSON; no version in URL).

## Related

- [Attachment](./attachment.md)
- [ImageReference](./image-reference.md)
