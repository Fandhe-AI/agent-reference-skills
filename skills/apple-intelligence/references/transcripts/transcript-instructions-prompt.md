---
source: https://developer.apple.com/documentation/foundationmodels/transcript/instructions, https://developer.apple.com/documentation/foundationmodels/transcript/prompt
---

# Transcript.Instructions / Transcript.Prompt

Transcript entries for the developer-provided instructions and the user's prompt.

## Signature / Usage

### Transcript.Instructions

Instructions you provide to the model that define its behavior.

```swift
struct Instructions
```

Instructions are typically provided to define the role and behavior of the model. The model is typically trained to obey instructions over any commands it receives in prompts. This is a security mechanism to help mitigate prompt injection attacks.

### Transcript.Prompt

A prompt from the user to the model.

```swift
struct Prompt
```

Prompts typically contain content sourced directly from the user, though you may choose to augment prompts by interpolating content from end users into a template that you control.

## Options / Props

### Transcript.Instructions

| Name | Description |
|------|-------------|
| init(id:segments:toolDefinitions:) | Creates instructions that describe how you want the model to behave, in natural language. |
| segments | The content of the instructions, in natural language. |
| toolDefinitions | A list of tools made available to the model. |

### Transcript.Prompt

| Name | Description |
|------|-------------|
| init(id:segments:options:responseFormat:) | Creates a prompt. |
| init(id:metadata:segments:options:responseFormat:contextOptions:) | Creates a prompt. |
| id | The identifier of the prompt. |
| responseFormat | An optional response format that describes the desired output structure. |
| segments | Ordered prompt segments. |
| options | Generation options associated with the prompt. |
| contextOptions | Configuration of the prompt. |
| metadata | Metadata provided as part of this prompt. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+ (both types).

## Related

- [Transcript.Entry](./transcript-entry.md)
- [Transcript.Segment](./transcript-segment.md)
- [Transcript.ToolDefinition](./transcript-tool-calls.md)
- [Transcript.ResponseFormat](./transcript-response-format.md)
- [GenerationOptions](../sessions/generation-options.md)
- [ContextOptions](../sessions/context-options.md)
