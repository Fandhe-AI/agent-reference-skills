---
source: https://developer.apple.com/documentation/foundationmodels/transcript/responseformat
---

# Transcript.ResponseFormat

A response format that the model must conform its output to.

## Signature / Usage

```swift
struct ResponseFormat
```

## Options / Props

| Name | Description |
|------|-------------|
| init(schema:) | Creates a response format with a schema. |
| init(type:) | Creates a response format with type you specify. |
| name | A name associated with the response format. |
| kind | The way the response format constrains the model's output. |
| Transcript.ResponseFormat.Kind | A representation of the different ways a response format can constrain model output. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+.
- `Transcript.Prompt` carries an optional `responseFormat` describing the desired output structure.

## Related

- [Transcript.Instructions / Transcript.Prompt](./transcript-instructions-prompt.md)
- [GenerationSchema](../structured-output/generation-schema.md)
