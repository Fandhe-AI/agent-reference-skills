---
source: https://developer.apple.com/documentation/foundationmodels/optimizing-key-value-caching-in-language-model-sessions
---

# Optimizing key-value caching in language model sessions

Prevent repeated token processing by preserving the cached state across turns.

## Signature / Usage

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

Static content first in dynamic instructions:

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

Stateless history transform (preserves cache) versus a stateful one:

```swift
Profile {
   // The instructions and tools for the profile.
}
.historyTransform { history in
    // Remove debug text from the history. The model sees the same number of
    // entries in the same order so previously cached tokens remain valid.
    clearDebugFromHistory(history)
}
```

```swift
// Define a session property to access the history for the session.
@SessionProperty(\.history) 
var history

Profile {
    // The instructions and tools for the profile.
}
.onResponse {
    // Compress the history and incur the cache invalidation on the next request.
    if history.count > 100 {
        history = history.suffix(50)
    }
}
```

Restoring from a saved transcript:

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

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). Listed under the "Custom language model provider" topic.
- Model providers might maintain a key-value (KV) cache of previously processed tokens so each new turn only processes added tokens. Cache management is up to the provider; how you structure the session determines whether the cache is preserved or invalidated.
- A session arranges content as instructions, then tool definitions, then transcript entries. Each cached value depends on every preceding token; changing a token invalidates the cache from that point forward. Appending at the end (respond or stream calls) is cache-friendly. A change to instructions invalidates tools and the entire transcript; a change deep in the transcript only invalidates what follows.
- Establish a stable prefix at session creation (for example `init(profile:history:)`), do not change instructions and tools over the session lifetime, and place varying content toward the end of instructions. Call `prewarm(promptPrefix:)` when usage is at least one or two seconds in the future.
- Modifying the transcript hurts accuracy: the model cannot tell information that never existed from information that was removed. Adding or removing tools mid-session invalidates the cache after the change point; define tools up front. Removing a tool the model previously used can produce unexpected results; if you remove a tool, also remove associated output. A tool added late may not be incorporated, since the model follows patterns from earlier turns.
- The framework re-evaluates a `DynamicInstructions` body before each request and flattens instructions and tools in declaration order, so keep constant content first and conditional content last. Switching profiles typically changes the entire prefix, so treat it as a deliberate reset at natural boundaries.
- Prefer stateless history transforms: a transform that replaces content in place (such as removing debug metadata) can preserve cache consistency; one that drops entries invalidates parts of the cache; a stateful transform changes the token sequence unpredictably.
- Defer trimming until the context window is nearly full and consolidate in one operation; removing only the most recent entries is cheaper than modifying earlier ones. On `LanguageModelError.contextSizeExceeded(_:)`, summarize and update `transcript` via `@SessionProperty`.
- Restored sessions start without a KV cache; first-call reprocessing latency is proportional to transcript size, so consider trimming before rehydrating.
- Use the Foundation Models instrument; cache hit rate = cached input tokens / total input tokens.

## Related

- [Composing dynamic sessions with instructions and profiles](./dynamic-sessions.md)
- [Managing the context window](./managing-the-context-window.md)
- [Analyzing the runtime performance of your Foundation Models app](./runtime-performance.md)
- [Running a Core AI model in a Foundation Models session](./core-ai-model-session.md)
