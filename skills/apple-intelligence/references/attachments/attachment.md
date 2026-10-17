---
source: https://developer.apple.com/documentation/foundationmodels/attachment
---

# Attachment

An asset provided to the model. Use `Attachment` to include media such as images alongside text in your prompts and instructions.

## Signature / Usage

```swift
struct Attachment<Content>
```

```swift
let response = try await session.respond {
    "Describe this image:"
    Attachment(image)
}
```

Assign a label with `label(_:)` so the model can identify specific attachments when making tool calls:

```swift
Prompt {
    "Compare these two images:"
    Attachment(firstImage)
        .label("image-0")
    Attachment(secondImage)
        .label("image-1")
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `init(_:orientation:)` | Creates an attachment from a Core Graphics image. |
| `init(imageURL:orientation:)` | Creates an attachment from a file URL pointing to an image. Parameters: `imageURL: URL`, `orientation: CGImagePropertyOrientation?`. |
| `label(_:)` | Assigns a label to an attachment. Signature: `func label(_: String) -> Attachment<Content>`. |
| `init(_:)` | Creates an attachment from data content (Beta: iOS 27.2+). Declared as `init(Content)`. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+. `init(_:)` is Beta: iOS 27.2+ (see DataAttachmentRepresentable).
- Per the `ImageAttachmentContent` page, image attachments are created via the `Attachment` initializers from a `CGImage`, `CIImage`, `CVPixelBuffer`, or image file URL.
- Source fetched 2026-10-16 (DocC JSON; no version in URL).

## Related

- [ImageAttachmentContent](./image-attachment-content.md)
- [ImageReference](./image-reference.md)
- [DataAttachmentRepresentable](./data-attachment-representable.md)
