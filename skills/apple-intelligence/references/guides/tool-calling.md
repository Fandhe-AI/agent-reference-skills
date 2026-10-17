---
source: https://developer.apple.com/documentation/foundationmodels/expanding-generation-with-tool-calling
---

# Expanding generation with tool calling

Build tools that enable the model to perform tasks that are specific to your use case.

## Signature / Usage

```swift
struct BreadDatabaseTool: Tool {
    let name = "searchBreadDatabase"
    let description = "Searches a local database for bread recipes."

    @Generable
    struct Arguments {
        @Guide(description: "The type of bread to search for")
        var searchTerm: String
        @Guide(description: "The number of recipes to get", .range(1...6))
        var limit: Int
    }

    @Generable
    struct Recipe {
        var name: String
        var description: String
        var link: String
    }
    
    func call(arguments: Arguments) async throws -> [Recipe] {
        var recipes: [Recipe] = []
        
        // Put your code here to retrieve a list of recipes from your database.
        
        return recipes
    }
}
```

```swift
let session = LanguageModelSession(
    tools: [BreadDatabaseTool()]
)

let response = try await session.respond(
    to: "Find three sourdough bread recipes"
)
```

Tool calling mode:

```swift
let response = try await session.respond(
    to: "What's a good sourdough recipe?",
    options: GenerationOptions(toolCallingMode: .required)
)
```

```swift
let response = try await session.respond(
    to: "Summarize the recipes you found",
    options: GenerationOptions(toolCallingMode: .disallowed)
)
```

Changing the mode from required to allowed after the first tool call:

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

Handling tool errors:

```swift
do {
    let answer = try await session.respond(to: "Find a recipe for tomato soup.")
} catch let error as LanguageModelSession.ToolCallError {
        
    // Access the name of the tool, like BreadDatabaseTool.
    print(error.tool.name) 
        
    // Access an underlying error that your tool throws and check if the tool 
    // encounters a specific condition.
    if case .databaseIsEmpty = error.underlyingError as? SearchBreadDatabaseToolError {
        // Display an error in the UI.
    }

} catch {
    print("Some other error: \(error)")
}
```

```swift
// Configure a profile to preserve the transcript when an error occurs.
Profile {
    // Your dynamic instructions and tools.
}
.temperature(0.9)
.transcriptErrorHandlingPolicy(.preserveTranscript)
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). `ToolCallingMode` and `DynamicProfile` usage shown here is iOS 27.0+ API; see the tools and dynamic-profiles pages.
- Tools let the model fetch up-to-date information, ground responses in sources you provide, and perform side effects. Examples: query your app's database, perform actions in your app, integrate with frameworks like Contacts or HealthKit that use existing privacy and security mechanisms.
- The framework processes a request in six phases (see the diagram on the official page). The model decides whether to call a tool, calls it with arguments, the tool returns control with output, and the model uses the output in its final response.
- A tool conforms to `Tool`; `call(arguments:)` can be called concurrently with itself or with other tools. `Arguments` use guided generation.
- Keep descriptions short; long descriptions take up context size and add latency.
- Tools passed at session creation are available for all future interactions with that session.
- Tool output can be a string, a `GeneratedContent` object, or any `@Generable` type. The model can call a tool multiple times in parallel (for example weather for several cities).
- By default the model decides whether to call a tool. `GenerationOptions.ToolCallingMode` supports three modes (`.allowed`, `.required`, `.disallowed`); use `.required` when a rule says the model must always call a tool, and `.disallowed` when the session already has enough context.
- When mode is `.required`, you must define an exit condition by either throwing an error from a tool's `call(arguments:)` or changing the mode dynamically using a `LanguageModelSession.DynamicProfile`; otherwise the model continues to call the tool.
- Errors thrown during tool calling surface as `LanguageModelSession.ToolCallError` (with `tool` and `underlyingError`). Alternatively a tool can return a short string such as "Cannot access the database."
- When errors are thrown from a tool, the framework rolls back the transcript to a previously known valid state. `transcriptErrorHandlingPolicy` decides whether the transcript is preserved or reverted; when preserving, the last entry may be partially generated.
- The observable `transcript` property lets you track when and how many times tools are called, and pairs well with SwiftUI to visualize session history (entry cases: `.instructions`, `.prompt`, `.toolCalls`, `.toolOutput`, `.response`, `.reasoning`).

## Related

- Tool
- GenerationOptions.ToolCallingMode
- LanguageModelSession.ToolCallError
- [Generating Swift data structures with guided generation](./guided-generation.md)
- [Managing the context window](./managing-the-context-window.md)
