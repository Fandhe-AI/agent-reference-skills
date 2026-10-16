---
source: https://developer.apple.com/documentation/foundationmodels/dataattachmentrepresentable
---

# DataAttachmentRepresentable

A type that you use as the content of a data attachment.

## Signature / Usage

```swift
protocol DataAttachmentRepresentable : Sendable
```

Conform to this protocol to describe how a value serializes into, and deserializes back from, a `Transcript.DataAttachment`. The serialized form is a portable `Data` blob identified by a content type identifier, which is what gets persisted when a `Transcript` is encoded, so a transcript remains readable even in environments where the declaring package isn't installed.

A `LanguageModel` advertises which content types it accepts through `supportsDataAttachmentType(_:)`; the framework validates each data attachment's `contentType` against that predicate before dispatching to the executor.

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init(_:)` | `init(Transcript.DataAttachment) throws` | Rehydrates this content from its transcript representation. Beta. |
| `transcriptRepresentation` | `var transcriptRepresentation: Transcript.DataAttachment` | The transcript representation of this content. Beta. |

## Notes

- Availability: Beta: iOS 27.2+, iPadOS 27.2+, Mac Catalyst 27.2+, macOS 27.2+, visionOS 27.2+, watchOS 27.2+.
- `supportsDataAttachmentType(_:)` is declared as `func supportsDataAttachmentType(UTType) async throws -> Bool` on `LanguageModel`.
- `Transcript.DataAttachment` exposes `content: Data` and `contentType: UTType`.
- Source fetched 2026-10-16 (DocC JSON; no version in URL). The page carries no code listing, so the declaration above is the only snippet.

## Related

- [Attachment](./attachment.md)
- [DataEntryRepresentable](./data-entry-representable.md)
