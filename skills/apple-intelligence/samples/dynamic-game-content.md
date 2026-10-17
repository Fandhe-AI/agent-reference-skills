---
source: https://developer.apple.com/documentation/foundationmodels/generate-dynamic-game-content-with-guided-generation-and-tools
---

# Dynamic Game Content

Generate NPC dialog with a per-character session, a random encounter with a `@Generable` type, and personalize content with tools.

```swift
let instructions = """
    A multiturn conversation between a game character and the player of this game. \
    You are \(character.displayName). Refer to \(character.displayName) in the first-person \
    (like "I" or "me"). You must respond in the voice of \(character.persona).\

    Keep your responses short and positive. Remember: Because this is the dream realm, \
    everything is free at this coffee shop and the baristas are paid in creative inpiration.

    You just said: "\(startWith)"
    """
```

```swift
let response = try await session.respond(
    to: userInput
)
let dialog = response.content

// Verify whether the input contains any blocked words or phrases.
if textIsOK(dialog) {
    nextUtterance = dialog
    isGenerating = false
} else {
    nextUtterance = character.errorResponse
    isGenerating = false
    resetSession(character, startWith: character.resumeConversationLine)
}
```

```swift
@Generable
struct NPC: Equatable {
    let name: String
    let coffeeOrder: String
    let picture: GenerableImage
}
```

```swift
let session = LanguageModelSession {
    """
    A conversation between the Player and a helpful assistant. This is a fantasy 
    RPG game that takes place at Dream Coffee, the beloved coffee shop of the 
    dream realm. Your role is to use your imagination to generate fun game characters.
    """
}
let prompt = """
    Create an NPC customer with a fun personality suitable for the dream realm. Have the customer order
    coffee. Here are some examples to inspire you:
    {name: "Thimblefoot", imageDescription: "A horse with a rainbow mane",
    coffeeOrder: "I would like a coffee that's refreshing and sweet like grass of a summer meadow"}
    {name: "Spiderkid", imageDescription: "A furry spider with a cool baseball cap",
    coffeeOrder: "An iced coffee please, that's as spooky as me!"}
    {name: "Wise Fairy", imageDescription: "A blue glowing fairy that radiates wisdom and sparkles",
    coffeeOrder: "Something simple and plant-based please, that will restore my wise energy."}
    """

// Generate the NPC using the custom generable type.
let npc = try await session.respond(
    to: prompt,
    generating: NPC.self,
).content
```

```swift
if let customer = character as? GeneratedCustomer {
    newSession = LanguageModelSession(
        tools: [CalendarTool(contactName: customer.displayName)],
        instructions: instructions
    )
}
```

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, Xcode 26.0+ (sample-code page; associated with WWDC25 session 301).
- Each character keeps its own `LanguageModelSession`, so dialog is persistent and contextual. The app resets the session and returns a fixed error response when output contains blocked terms.
- `Character`, `DialogEngine`, `GenerableImage`, and `CalendarTool` are types of the sample project; their full source is in the downloadable project and is not reproduced here.
