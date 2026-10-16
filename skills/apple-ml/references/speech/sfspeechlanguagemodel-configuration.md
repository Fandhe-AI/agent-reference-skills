# SFSpeechLanguageModel.Configuration

An object describing the location of a custom language model and specialized vocabulary.

## Signature / Usage

```swift
class Configuration
```

```swift
init(languageModel: URL, vocabulary: URL?, weight: NSNumber?)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(languageModel:)` | `URL` | Creates a configuration with the location of a language model file. |
| `init(languageModel:vocabulary:)` | `URL`, `URL?` | Creates a configuration with the locations of language model and vocabulary files. |
| `init(languageModel:vocabulary:weight:)` | `URL`, `URL?`, `NSNumber?` | Same, with a custom weight. |
| `languageModel` | `URL` | The location of a compiled language model file. |
| `vocabulary` | `URL?` | The location of a compiled vocabulary file. |
| `weight` | `NSNumber?` | Relative weight of the customization; must be between 0.0 and 1.0 inclusive. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, visionOS 1.0+. Inherits `NSObject`; conforms to `NSCopying`, `NSSecureCoding`, `Sendable`.
- Pass it to `SFSpeechLanguageModel.prepareCustomLanguageModel(for:configuration:completion:)` to say where the model file is created, and to `SFSpeechRecognitionRequest.customizedLanguageModel` or `DictationTranscriber.ContentHint.customizedLanguage(modelConfiguration:)` to say where the system finds it.
- Source: https://developer.apple.com/documentation/speech/sfspeechlanguagemodel/configuration

## Related

- [SFSpeechLanguageModel](./sfspeechlanguagemodel.md)
- [SFCustomLanguageModelData](./sfcustomlanguagemodeldata.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SFSpeechRecognitionRequest](./sfspeechrecognitionrequest.md)
