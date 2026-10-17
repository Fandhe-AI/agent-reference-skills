---
source: https://developer.apple.com/documentation/foundationmodels/transcript/response, https://developer.apple.com/documentation/foundationmodels/transcript/reasoning
---

# Transcript.Response / Transcript.Reasoning

Transcript entries for a response from the model and for a reasoning entry from the model.

## Signature / Usage

### Transcript.Response

A response from the model.

```swift
struct Response
```

### Transcript.Reasoning

A reasoning entry from the model.

```swift
struct Reasoning
```

## Options / Props

### Transcript.Response

| Name | Description |
|------|-------------|
| init(id:assetIDs:segments:) | Creates a response that contains the segments you provide. |
| init(id:metadata:segments:) | Creates a response that contains the metadata and segments you provide. |
| segments | Ordered response segments. |
| assetIDs | Version-aware identifiers for all assets used to generate this response. |
| metadata | Metadata associated with generating the response. |

### Transcript.Reasoning

| Name | Description |
|------|-------------|
| init(id:metadata:segments:signature:) | Creates a reasoning entry that contains the segments you provide. |
| description | A textual representation of the reasoning entry. |
| metadata | Metadata produced by the model while generating this reasoning entry. |
| segments | Ordered reasoning segments. |
| signature | Opaque producer-supplied signature for this reasoning entry. |

## Notes

- Availability, `Transcript.Response`: iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+.
- Availability, `Transcript.Reasoning`: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+.

## Related

- [Transcript.Entry](./transcript-entry.md)
- [Transcript.Segment](./transcript-segment.md)
- [Transcript.Instructions / Transcript.Prompt](./transcript-instructions-prompt.md)
