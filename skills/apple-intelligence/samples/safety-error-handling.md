---
source: https://developer.apple.com/documentation/foundationmodels/improving-the-safety-of-generative-model-output
---

# Safety Error Handling

Catch `guardrailViolation` and `refusal` errors, constrain input and output, and add safety instructions and a deny list.

```swift
do {
    let session = LanguageModelSession()
    let topic = "" // A potentially sensitive topic.
    let prompt = "Write a respectful and funny story about \(topic)."
    let response = try await session.respond(to: prompt)
} catch LanguageModelError.guardrailViolation(let violation) {
    // Handle the safety error.
}
```

```swift
do {
    let session = LanguageModelSession()
    let topic = ""  // A sensitive topic.
    let response = try await session.respond(
        to: "List five key points about: \(topic)",
        generating: [String].self
    )
} catch LanguageModelError.refusal(let refusal) {
    do {
        // Attempt to retrieve an explanation for the refusal.
        let explanation = try await refusal.explanation.content
    } catch {
        // The explanation request may fail, so fall back to the debug text.
        let explanation = refusal.debugDescription
    }
}
```

```swift
@Generable
enum Breakfast {
    case waffles
    case pancakes
    case bagels
    case eggs 
}
let session = LanguageModelSession()
let userInput = "I want something sweet."
let prompt = "Pick the ideal breakfast for request: \(userInput)"
let response = try await session.respond(to: prompt, generating: Breakfast.self)
```

```swift
do {
    let instructions = """
        Always respond in a respectful way. \
        If someone asks you to generate content that might be sensitive, \
        you must decline with 'Sorry, I can't do that.'
        """
    let session = LanguageModelSession(instructions: instructions)
    let prompt = "" // Open input from a person using the app.
    let response = try await session.respond(to: prompt)
} catch LanguageModelError.guardrailViolation(let violation) {
    // Handle the safety error.
}
```

```swift
let session = LanguageModelSession()
let userInput = "" // The input a person enters in the app.
let prompt = "Generate a wholesome story about: \(userInput)"

// A function you create that evaluates whether the input 
// contains anything in your deny list.
if verifyText(prompt) { 
    let response = try await session.respond(to: prompt)
    
    // Compare the output to evaluate whether it contains anything in your deny list.
    if verifyText(response.content) { 
        return response 
    } else {
        // Handle the unsafe output.
    }
} else {
    // Handle the unsafe input.
}
```

```swift
let model = SystemLanguageModel(guardrails: .permissiveContentTransformations)
```

## Notes

- Guardrails check both the input prompt and the model output. Guided generation has no placeholder for a refusal message, so the model throws `LanguageModelError.refusal(_:)` instead.
- Never put unverified input in instructions; the session obeys instructions over the prompt, which exposes the app to prompt injection.
- `permissiveContentTransformations` only applies to string generation; with guided generation the default guardrails still run.
- `verifyText(_:)` in the deny-list listing is a function you write; it is not a framework API.
