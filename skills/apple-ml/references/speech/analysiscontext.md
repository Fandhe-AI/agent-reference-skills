# AnalysisContext

Contextual information that may be shared among analyzers.

## Signature / Usage

```swift
final class AnalysisContext

// Creating a context
@objc init()

// Providing textual context
final var contextualStrings: [AnalysisContext.ContextualStringsTag : [String]] { get set }

// Preserving app-specific context
final var userData: [AnalysisContext.UserDataTag : any Sendable] { get set }
```

Adapted (not in the official docs): minimal usage assembled from the declarations above and the `SpeechAnalyzer.setContext(_:)` call shown on the DictationTranscriber page; the phrase is a placeholder.

```swift
let context = AnalysisContext()
context.contextualStrings[.general] = ["MyAppName"]
try await analyzer.setContext(context)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | initializer | Creates a context. |
| `contextualStrings` | `[AnalysisContext.ContextualStringsTag : [String]]` | Words or phrases, grouped by tag, that should be recognized even if they are not in the system vocabulary. |
| `AnalysisContext.ContextualStringsTag` | struct | Tag that groups contextual strings. Created with `init(_:)`; the predefined `general` tag is for applications that have no need to distinguish between sets of contextual strings. |
| `userData` | `[AnalysisContext.UserDataTag : any Sendable]` | A dictionary of application-specific contextual information. |
| `AnalysisContext.UserDataTag` | struct | Tag that keys the entries of `userData`. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Conforms to `Sendable`, `SendableMetatype`.
- With the `DictationTranscriber` module, use `contextualStrings` for short custom phrases unique to the app, such as names of characters, products, or places. Keep phrases to one or two words whenever possible, and limit the total number of phrases across all tags to no more than 100.
- Domain-specific terms or made-up words may have pronunciations estimated incorrectly; provide a custom language model with correct pronunciations by initializing `DictationTranscriber` with the `customizedLanguage(modelConfiguration:)` content hint.
- Use the tag to swap out some of the strings while leaving others in place.
- Source: https://developer.apple.com/documentation/speech/analysiscontext (fetched 2026-11-14)
- Source: https://developer.apple.com/documentation/speech/analysiscontext/contextualstrings (fetched 2026-11-14)

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SFSpeechLanguageModel](./sfspeechlanguagemodel.md)
- [SFCustomLanguageModelData](./sfcustomlanguagemodeldata.md)
