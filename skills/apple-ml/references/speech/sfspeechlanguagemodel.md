# SFSpeechLanguageModel

A language model built from custom training data. Create it with `prepareCustomLanguageModel(for:configuration:completion:)` or the `ignoresCache:` variant.

## Signature / Usage

```swift
class SFSpeechLanguageModel
```

```swift
class func prepareCustomLanguageModel(
    for: URL,
    configuration: SFSpeechLanguageModel.Configuration,
    completion: @escaping ((any Error)?) -> Void
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `class prepareCustomLanguageModel(for:configuration:completion:)` | method | Creates a language model from custom training data. |
| `class prepareCustomLanguageModel(for:configuration:ignoresCache:completion:)` | method | Creates a language model from custom training data, with a cache-bypass flag. |
| `class prepareCustomLanguageModel(for:clientIdentifier:configuration:completion:)` | method | Deprecated. |
| `class prepareCustomLanguageModel(for:clientIdentifier:configuration:ignoresCache:completion:)` | method | Deprecated. |
| `Configuration` | class | Describes the location of a custom language model and specialized vocabulary. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, visionOS 1.0+. Inherits `NSObject`.
- The two `clientIdentifier:` variants are marked deprecated.
- Use with `DictationTranscriber.ContentHint.customizedLanguage(modelConfiguration:)` or `SFSpeechRecognitionRequest.customizedLanguageModel`.
- Source: https://developer.apple.com/documentation/speech/sfspeechlanguagemodel

## Related

- [SFSpeechLanguageModel.Configuration](./sfspeechlanguagemodel-configuration.md)
- [SFCustomLanguageModelData](./sfcustomlanguagemodeldata.md)
- `AnalysisContext`
- [DictationTranscriber](./dictationtranscriber.md)
