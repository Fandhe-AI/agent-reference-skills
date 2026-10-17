---
source: https://developer.apple.com/documentation/foundationmodels/supporting-languages-and-locales-with-foundation-models
---

# Languages and Locales

Check locale support before calling the model, set the locale phrase in instructions, and force an output language.

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

```swift
@Generable(description: "Basic profile information about a cat")
struct CatProfile {
    var name: String

    @Guide(description: "The age of the cat", .range(0...20))
    var age: Int

    @Guide(description: "One sentence about this cat's personality")
    var profile: String
}

#Playground {
    let response = try await LanguageModelSession().respond(
        to: "Generate a rescue cat",
        generating: CatProfile.self
    )
}
```

## Notes

- An unsupported language in a request throws `LanguageModelError.unsupportedLanguageOrLocale(_:)`; handle it by explaining the limitation, disabling the feature, or offering an alternative experience.
- Guardrails apply only to supported languages; a short unsupported-language phrase mixed into a supported-language prompt may not be detected.
- All inputs, including `Generable` type names and `@Guide` descriptions, must be in a supported language.
- `supportedLanguages` returns the full list of languages supported by the on-device model.
