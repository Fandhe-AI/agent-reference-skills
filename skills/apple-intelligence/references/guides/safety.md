---
source: https://developer.apple.com/documentation/foundationmodels/improving-the-safety-of-generative-model-output
---

# Improving the safety of generative model output

Create generative experiences that appropriately handle sensitive inputs and respect people.

## Signature / Usage

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

Refusals with guided generation:

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

Bounding output with a Generable enumeration:

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

Safety instructions:

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

Deny list:

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

Permissive guardrail mode:

```swift
let model = SystemLanguageModel(guardrails: .permissiveContentTransformations)
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- Two base safety layers: Apple Foundation Models (on-device and on Private Cloud Compute) trained to handle sensitive topics with care, and guardrails that aim to block harmful or sensitive content such as self-harm, violence, and adult materials. Some harms might bypass both; consider additional app-specific safety layers.
- Guardrails are tied to a specific model. On-device `SystemLanguageModel` guardrails check input prompt and model output and are configurable via `SystemLanguageModel.Guardrails`. PCC guardrails have different policies that you cannot directly configure.
- Questions to consider early: does the model have configurable guardrails; when does it throw `LanguageModelError.guardrailViolation(_:)` or `LanguageModelError.refusal(_:)`; when might it reply with a refusal message; where might it be too permissive or too restrictive.
- On a guardrail violation for built-in prompts, re-phrase to find the activating phrases; for user-created prompts show a clear message and offer another prompt.
- Refusals: with string responses a refusal may appear as a message like "Sorry, I can't help with that..." and may not be programmatically distinguishable (if critical, prompt a new session to classify). With guided generation there is no placeholder, so `LanguageModelError.refusal(_:)` is thrown; the explanation is retrieved asynchronously.
- Multimodal: Apple's guardrails cover both image and text input. Consider each media input individually and the full input together. If personal photos are used, be transparent about privacy risks, since some model providers may use photos for training.
- Boundaries: avoid open input in prompts; the highest input safety is a fixed set of prompts. For free input, bound the output with `@Generable` enumerations. Instructions take priority over prompts, so use uppercase to emphasize and never put unverified input in instructions (prompt injection). Give the model a clear role at the start of the Instructions to reduce over-blocking. Wrap user input in a format string within your own prompt text.
- Deny list: a list of strings shipped in the app, or hosted on a server so it can be updated without an app update.
- `.permissiveContentTransformations` only works for string generation; with guided generation the default guardrails and errors apply as usual. In this mode the session skips the guardrail checks and never throws `guardrailViolation` for string responses, but the on-device model may still refuse.
- Risk assessment: list each AI feature, possible safety risks, severity (mild to critical), and mitigation. Safety tests: nonsensical input, code snippets, random characters, sensitive content, controversial topics, vague input; log timestamp, full prompt, response, and whether mitigations activated. Evaluations are tests for generative model features; use the Evaluations framework. Do not engage in testing that could cause you or others harm.
- Reporting: include a way for people to report harmful content; report unhandled concerns to Apple via Feedback Assistant including the model, prompt and guided generation types, tool names and argument types, and language and region; use `logFeedbackAttachment(sentiment:issues:desiredOutput:)`.
- When the on-device model updates (regular OS updates; beta program lets you test ahead), re-run all prompt tests and adversarial safety tests; use the Evaluations framework to track results.
- Distinct from cloud API guardrails: see openai-agents, openai-api-core and anthropic-api-tools-mcp for guardrails in those platforms. This page covers on-device Foundation Models safety.

## Related

- [SystemLanguageModel.Guardrails](../models/guardrails.md)
- [LanguageModelError](../models/language-model-error.md)
- [Inspecting session transcripts and reporting model feedback](./inspecting-transcripts.md)
- [Supporting languages and locales with Foundation Models](./languages-and-locales.md)
