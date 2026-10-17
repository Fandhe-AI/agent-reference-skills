---
source: https://developer.apple.com/documentation/foundationmodels/optimizing-key-value-caching-in-language-model-sessions
---

# Key-Value Caching

Keep a stable instruction and tool prefix, prewarm the session, and order dynamic instructions so the key-value cache stays valid.

```swift
let session = LanguageModelSession(
    tools: [RecipeDatabaseTool()],
    instructions: """
        You are a helpful cooking assistant. Suggest recipes \
        based on available ingredients and dietary preferences.
        """
)

// Perform a key-value cache computation for the instructions, tools, and the 
// provided prefix before sending the person's request.
session.prewarm(
    promptPrefix: "Suggest a recipe using"
)
```

```swift
struct PresentationInstructions: DynamicInstructions {
    var isEditingImage: Bool = false

    var body: some DynamicInstructions {
        // Static elements that are always present and cached across turns.
        Instructions {
            "You help create presentations."
        }
        ListSlidesTool()
        AddSlideTool()
        
        // Place a conditional at the end to minimize invalidation
        // when an event toggles it.        
        if isEditingImage {
            ImageEditingInstructions()
        }
    }
}
```

```swift
let transcript = // Load a transcript you save from a previous conversation.

let session = LanguageModelSession(
    transcript: transcript
)

// Begin rebuilding the cache before the person's next prompt arrives --- at
// least one to two seconds in the future.
session.prewarm()
```

## Notes

- Each cached value depends on every preceding token; appending via `respond` / stream methods is cache-friendly, while changing instructions or tools invalidates everything after the change.
- Prewarm when usage is at least one or two seconds in the future. A session restored from a saved transcript starts with no cache and reprocesses the full transcript on the first call.
- Prefer stateless `historyTransform(_:)` over stateful updates in callbacks such as `onResponse`; defer trimming until the context window is nearly full.
- How a provider manages the cache is up to the model provider; use the Foundation Models instrument to measure cache hit rate (cached input tokens divided by total input tokens).
