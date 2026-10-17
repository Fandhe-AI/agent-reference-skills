---
source: https://developer.apple.com/documentation/foundationmodels/tool
---

# Tool

A tool that a model can call to gather information at runtime or perform side effects.

## Signature / Usage

```swift
protocol Tool<Arguments, Output> : Sendable
```

```swift
struct FindContacts: Tool {
    let name = "findContacts"
    let description = "Finds a specific number of contacts"

    @Generable
    struct Arguments {
        @Guide(description: "The number of contacts to get", .range(1...10))
        let count: Int
    }

    func call(arguments: Arguments) async throws -> [String] {
        var contacts: [CNContact] = []
        // Fetch a number of contacts using the arguments.
        let formattedContacts = contacts.map {
            "\($0.givenName) \($0.familyName)"
        }
        return formattedContacts
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| call(arguments:) | method | Performs the tool's action when a language model wants to use this tool. |
| Arguments | associated type | The arguments that this tool should accept. |
| Output | associated type | The output that this tool produces for the language model to reason about in subsequent interactions. |
| name | property | A unique name for the tool. |
| description | property | A natural language description of when and how to use the tool. |
| parameters | property | A schema for the parameters this tool accepts. |
| includesSchemaInInstructions | property | A Boolean value that indicates whether the framework includes this tool's definition in the session's instructions. |
| Tool.SessionProperty | typealias (`LanguageModelSession.SessionProperty`) | A property wrapper that provides access to a session property from within a tool. iOS 27.0+, watchOS 27.0+. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- A tool includes a name and a description that the framework puts in the prompt to let the model decide when and how often to call it.
- `call(arguments:)` takes arguments conforming to `ConvertibleFromGeneratedContent` and returns an output conforming to `PromptRepresentable`; typically `Output` is a `String` or a `Generable` type.
- Tools must conform to `Sendable` so the framework can run them concurrently. If the model needs to pass the output of one tool as the input to another, it executes back-to-back tool calls.
- You control the life cycle of your tool, so you can track state between calls to the model.
- Providing tools contributes to the context window usage: the framework puts the tool definitions (name, description, parameter information) in the prompt.
- Distinct from cloud API tool calling, structured outputs and guardrails: see openai-agents, openai-api-core and anthropic-api-tools-mcp for those platforms. This page covers the on-device Foundation Models `Tool` protocol.

## Related

- [GenerationOptions.ToolCallingMode](./tool-calling-mode.md)
- [LanguageModelSession.ToolCallError](./tool-call-error.md)
- [OCRTool](./ocr-tool.md)
- [BarcodeReaderTool](./barcode-reader-tool.md)
