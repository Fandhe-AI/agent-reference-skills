---
source: https://developer.apple.com/documentation/foundationmodels/updating-prompts-for-new-model-versions
---

# Updating prompts for new model versions

Manage the prompts your app uses by versioning them to make the most out of model improvements.

## Signature / Usage

```swift
if #available(iOS 26.4, macOS 26.4, visionOS 26.4, *) {
    // Use the prompt that you update for the the latest system version.
} else {
    // Use the prompt for the model in 26.0 to 26.3.
}
```

Prompt versioning with an Xcode string catalog:

```swift
if #available(iOS 26.4, macOS 26.4, visionOS 26.4, *) {
    return String(localized: "support-ticket-summarizer-v1.1", table: "Prompts")
} else {
    return String(localized: "support-ticket-summarizer-v1.0", table: "Prompts")
}
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- When a new model version becomes available, test your prompts against the old and new versions to check for unexpected output differences. New versions bring improvements such as improved tool calling and instruction following.
- Workflow: monitor Foundation Models updates (https://developer.apple.com/documentation/updates/foundationmodels); record the output your prompt produces for the previous model version; compare previous output against the new model; if needed, version your prompts for each supported model.
- Order the availability attribute from newest to oldest. The asterisk (`*`) indicates availability to future versions. The framework starts at 26.0, so no checks for earlier versions are needed.
- Because the older model is only included as part of the beta program, record the output your prompt produced with the prior model before updating.
- Keep prompts in individual text files (JSON or YAML for extra detail) with a clear naming structure that includes the version, for example `support-ticket-summarizer-v1.0`; keep a changelog per prompt.
- String catalog setup: in Xcode choose File > New > File from Template, select String Catalog, name it (for example "Prompts"), then add keys such as `support-ticket-summarizer-v1.0`. Localizing prompts is not required for every language, but can help the model respond reliably in the correct language.
- Server-based versioning lets the app fetch prompts at runtime, test iterations on a small subset of people, and roll back. On app launch, check the server for the latest prompt configuration and cache locally so prompts are available offline.

## Related

- [Prompting an on-device foundation model](./prompting.md)
- [Supporting languages and locales with Foundation Models](./languages-and-locales.md)
