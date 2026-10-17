---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/toolcallerror
---

# LanguageModelSession.ToolCallError

An error that occurs while a language model is calling a tool.

## Signature / Usage

```swift
struct ToolCallError
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| init(tool:underlyingError:) | initializer | Creates a tool call error. |
| tool | property | The tool that produced the error. |
| errorDescription | property | A string representation of the error description. |
| underlyingError | property | The underlying error that was thrown during a tool call. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+.
- `LocalizedError` implementations are provided by default.

## Related

- [Tool](./tool.md)
- [GenerationOptions.ToolCallingMode](./tool-calling-mode.md)
- [Session errors](../sessions/session-errors.md)
