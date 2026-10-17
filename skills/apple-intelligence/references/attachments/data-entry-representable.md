---
source: https://developer.apple.com/documentation/foundationmodels/dataentryrepresentable
---

# DataEntryRepresentable

A type that a model can produce and represent as a top-level transcript entry.

## Signature / Usage

```swift
protocol DataEntryRepresentable : Sendable
```

Conform to this protocol to describe how a value serializes into, and deserializes back from, a `Transcript.DataEntry`.

`transcriptRepresentation` is non-throwing: any fallible encoding should be surfaced from the conformer's own initializer, where the developer is already deciding what input to accept. `init(_:)` is throwing because the wire representation may come from a persisted transcript, from over the network, or from any source the conformer doesn't control, and could be malformed. The asymmetry mirrors Foundation's `String.init(data:encoding:)` (failable) and `String.utf8` (total).

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init(_:)` | `init(Transcript.DataEntry) throws` | Rehydrate this type from its transcript representation. Beta. |
| `transcriptRepresentation` | `var transcriptRepresentation: Transcript.DataEntry` | How this type appears when recorded in a session transcript. Beta. |

## Notes

- Availability: Beta: iOS 27.2+, iPadOS 27.2+, Mac Catalyst 27.2+, macOS 27.2+, visionOS 27.2+, watchOS 27.2+.
- Source fetched 2026-10-16 (DocC JSON; no version in URL). The page carries no code listing, so the declaration above is the only snippet.

## Related

- [DataAttachmentRepresentable](./data-attachment-representable.md)
- [Attachment](./attachment.md)
