---
source: https://developer.apple.com/documentation/foundationmodels/supporting-languages-and-locales-with-foundation-models
---

# Supporting languages and locales with Foundation Models

Generate content in the language people prefer when they interact with your app.

## Signature / Usage

```swift
if SystemLanguageModel.default.supportsLocale() {
    // Language is supported.
}
```

```swift
func localeInstructions(for locale: Locale = Locale.current) -> String {
    if Locale.Language(identifier: "en_US").isEquivalent(to: locale.language) {
        // Skip the locale phrase for U.S. English.
        return "" 
    } else {
        // Specify the person's locale with the exact phrase format.
        return "The person's locale is \(locale.identifier)."
    }
}
```

```swift
let session = LanguageModelSession(
    instructions: "You MUST respond in U.S. English."
)
let prompt = // A prompt that contains Spanish and Italian.
let response = try await session.respond(to: prompt)
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- The on-device system language model is multilingual and supports different languages for prompts, instructions, and output, in any language Apple Intelligence supports. See "Supported languages" in "How to get Apple Intelligence" (https://support.apple.com/en-us/121115).
- Write built-in prompts in a supported language. All inputs must be in a supported language, including `Generable` types and descriptions; property names such as `age` or `profile` matter as much as `@Guide` descriptions.
- People can set a per-app language in Settings. Before calling the model, run `supportsLocale(_:)`; by default it uses `Locale.current` and returns true if the locale is supported or similar enough to a supported one (such as `en-AU` and `en-NZ`). Use `supportedLanguages` for the full list. Language support improves over time in newer model and OS versions.
- On unsupported input (or a request to respond in an unsupported language), the session throws `LanguageModelError.unsupportedLanguageOrLocale(_:)`. Explain that the language is unsupported, disable the feature, or provide an alternative experience.
- Guardrails for input and output safety only apply to supported languages and locales. A short sensitive phrase in an unsupported language mixed into supported text might not throw the error, and guardrails might not flag it.
- For locales other than United States English, start `Instructions` with the exact English phrase "The person's locale is <identifier>." (from the model's training; reduces hallucinations in multilingual situations).
- By default the model responds in the language(s) of its inputs. Use `Instructions` to say which language to respond in (for example "You MUST respond in Italian"). Capitalized words like "MUST" or "ALWAYS" can strengthen instructions. Test thoroughly.
- The `#Playground` macro appears in the source's example for trying a generation.

## Related

- [Improving the safety of generative model output](./safety.md)
- [Updating prompts for new model versions](./updating-prompts-for-new-model-versions.md)
- [Categorizing and organizing data with content tags](./content-tags.md)
