---
source: https://developer.apple.com/documentation/foundationmodels/transcript/attachment, https://developer.apple.com/documentation/foundationmodels/transcript/imageattachment
---

# Transcript.Attachment / Transcript.ImageAttachment

The attached content carried by an attachment segment, and the image attachment type.

## Signature / Usage

### Transcript.Attachment

The types of attached content.

```swift
@nonexhaustive enum Attachment
```

### Transcript.ImageAttachment

An image attachment in a transcript entry.

```swift
struct ImageAttachment
```

## Options / Props

### Transcript.Attachment cases

| Case | Description |
|------|-------------|
| image(_:) | An attached image. |
| data(_:) | An attached data payload identified by a content type identifier. (beta) |

### Transcript.ImageAttachment

| Name | Description |
|------|-------------|
| init(_:orientation:) | Creates an image attachment from a Core Graphics image. |
| init(imageURL:orientation:) | Creates an image attachment from a file URL pointing to an image. |
| cgImage | The image as a Core Graphics image. |
| ciImage | The image as a Core Image image. |
| orientation | The display orientation of the image. |
| url | The URL of the original image asset, if the attachment was created from a URL. |
| pixelBuffer(resolution:pixelFormat:) | Returns the image as a pixel buffer, optionally resampled to a given resolution and pixel format. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+.
- Beta: iOS 27.2+ for `Transcript.Attachment.data(_:)`.

## Related

- [Transcript.Segment](./transcript-segment.md)
- [Attachment](../attachments/attachment.md)
- [ImageAttachmentContent](../attachments/image-attachment-content.md)
- [Multimodal prompting](../guides/multimodal-prompting.md)
