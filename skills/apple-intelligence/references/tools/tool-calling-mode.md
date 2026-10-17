---
source: https://developer.apple.com/documentation/foundationmodels/generationoptions/toolcallingmode-swift.struct
---

# GenerationOptions.ToolCallingMode

A value that describes how the model uses tools.

## Signature / Usage

```swift
struct ToolCallingMode
```

```swift
extension SessionPropertyValues {
    @SessionPropertyEntry
    var toolCallCount: Int = 0
}

struct RecipeDynamicProfile: LanguageModelSession.DynamicProfile {
    @SessionProperty(\.toolCallCount)
    var toolCallCount
    var body: some LanguageModelSession.DynamicProfile {
        Profile {
            BreadDatabaseTool()
        }
        .toolCallingMode(toolCallCount < 1 ? .required : .allowed)
        .onToolCall {
            toolCallCount += 1
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| allowed | static value | The model may or may not call tools. |
| disallowed | static value | The model may not call any tool. |
| required | static value | The model must call one or multiple tools. |
| kind | property | The tool-calling behavior this mode represents. |
| GenerationOptions.ToolCallingMode.Kind | enum | A representation of the different ways a model can use tools. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Use this to control how the model interacts with tools for a given request. Per the overview, the "may call tools" mode is the default behavior.
- When the mode is `required`, you must define an exit condition by either throwing an error from a tool's `call(arguments:)` method or by changing the mode dynamically using a `LanguageModelSession.DynamicProfile`; otherwise, the model continues to call the tool.
- Conforms to `Equatable` and `Sendable`. Set via `GenerationOptions.toolCallingMode`.

## Related

- [Tool](./tool.md)
- [LanguageModelSession.ToolCallError](./tool-call-error.md)
- [GenerationOptions](../sessions/generation-options.md)
