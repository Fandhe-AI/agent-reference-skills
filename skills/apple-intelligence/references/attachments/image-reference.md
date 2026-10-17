---
source: https://developer.apple.com/documentation/foundationmodels/imagereference
---

# ImageReference

A reference to an image in a session's transcript. Use `ImageReference` to allow the model to reference images from the transcript of the current `LanguageModelSession`.

## Signature / Usage

```swift
struct ImageReference
```

Define an `ImageReference` as an argument to a `Tool`, and retrieve the referenced image from the transcript during the tool call:

```swift
struct MyTool: Tool {
  @SessionProperty(\.history) var history

  @Generable
  struct Arguments {
    var image: ImageReference
  }

  public func call(arguments: Arguments) async throws -> Output {
    guard let imageAttachment = arguments.image.resolved(in: history) else {
      throw ImageToolError.imageNotFound(arguments.image.attachmentLabel)
    }
    let image = imageAttachment.cgImage
    ...
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `attachmentLabel` | `let attachmentLabel: String` | The label of the referenced image. |
| `resolved(in:)` | method | Returns the referenced image from the transcript. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Conforms to `Generable` (with `ConvertibleFromGeneratedContent` / `ConvertibleToGeneratedContent`), `Equatable`, `Sendable`.
- The label is the one assigned with `Attachment.label(_:)`.
- Source fetched 2026-10-16 (DocC JSON; no version in URL).

## Related

- [Attachment](./attachment.md)
- [ImageAttachmentContent](./image-attachment-content.md)
