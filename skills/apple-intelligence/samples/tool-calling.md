---
source: https://developer.apple.com/documentation/foundationmodels/expanding-generation-with-tool-calling
---

# Tool Calling

Define a `Tool` with `@Generable` arguments, pass it to a session, control the tool calling mode, and handle `ToolCallError`.

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

```swift
let response = try await session.respond(
    to: "What's a good sourdough recipe?",
    options: GenerationOptions(toolCallingMode: .required)
)
```

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

## Notes

- Tool output can be a string, a `GeneratedContent` object, or any `@Generable` type. The model can call a tool several times in parallel, and `call(arguments:)` may run concurrently with itself or other tools.
- With `.required`, define an exit condition (throw from `call(arguments:)` or change the mode dynamically with a `LanguageModelSession.DynamicProfile`); otherwise the model keeps calling the tool. `.disallowed` suppresses tool calls for a request.
- When a tool throws, the framework rolls back the transcript to a previously known valid state; `transcriptErrorHandlingPolicy` controls whether it is preserved.
- `ToolCallingMode` and `DynamicProfile` usage in the article relies on iOS 27 APIs; see the `tools` and `dynamic-profiles` reference categories.
