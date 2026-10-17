---
source: https://developer.apple.com/documentation/foundationmodels/transcript/segment, https://developer.apple.com/documentation/foundationmodels/transcript/textsegment, https://developer.apple.com/documentation/foundationmodels/transcript/structuredsegment, https://developer.apple.com/documentation/foundationmodels/transcript/attachmentsegment
---

# Transcript.Segment / TextSegment / StructuredSegment / AttachmentSegment

The segment types that may be included in a transcript entry: text, structured content, or an attached file or image.

## Signature / Usage

### Transcript.Segment

The types of segments that may be included in a transcript entry.

```swift
@nonexhaustive enum Segment
```

### Transcript.TextSegment

A segment containing text.

```swift
struct TextSegment
```

### Transcript.StructuredSegment

A segment containing structured content.

```swift
struct StructuredSegment
```

### Transcript.AttachmentSegment

A segment containing attached files or images.

```swift
struct AttachmentSegment
```

## Options / Props

### Transcript.Segment cases

| Case | Description |
|------|-------------|
| text(_:) | A segment containing text. |
| attachment(_:) | A segment containing an attachment. |
| structure(_:) | A segment containing structured content. |

### Transcript.TextSegment

| Name | Description |
|------|-------------|
| init(id:content:) | Creates a text segment that contains the text you provide. |
| content | The text of the segment. |

### Transcript.StructuredSegment

| Name | Description |
|------|-------------|
| init(id:schemaName:content:) | Creates a structured segment that contains the generated content you provide. |
| init(id:source:content:) | Deprecated. |
| content | The content of the segment. |
| schemaName | A name that can be used to understand which type the content represents. |
| source | A source that can be used to understand which type the content represents. Deprecated. |

### Transcript.AttachmentSegment

| Name | Description |
|------|-------------|
| init(id:content:label:) | Creates an attachment segment that wraps the content you provide. |
| content | The attached file or image. |
| label | An optional label that identifies the attachment. |

## Notes

- Availability, `Segment` / `TextSegment` / `StructuredSegment`: iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+.
- Availability, `AttachmentSegment`: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+.
- `StructuredSegment.init(id:source:content:)` and `StructuredSegment.source` are deprecated; use `schemaName` instead.

## Related

- [Transcript.Attachment](./transcript-attachment.md)
- [Transcript.Entry](./transcript-entry.md)
- [GeneratedContent](../structured-output/generated-content.md)
