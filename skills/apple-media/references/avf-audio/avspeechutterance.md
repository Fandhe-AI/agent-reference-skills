# AVSpeechUtterance

The basic unit of speech synthesis. Encapsulates text and parameters (voice, rate, pitch, volume, timing) passed to `AVSpeechSynthesizer`.

## Signature / Usage

```swift
let utterance = AVSpeechUtterance(string: "This is important!")
utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
utterance.rate = AVSpeechUtteranceDefaultSpeechRate
utterance.pitchMultiplier = 1.2
utterance.postUtteranceDelay = 0.5

synthesizer.speak(utterance)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `voice` | `AVSpeechSynthesisVoice?` | Voice used for synthesis |
| `rate` | `Float` | Speech rate; bounded by `AVSpeechUtteranceMinimumSpeechRate` and `AVSpeechUtteranceMaximumSpeechRate` |
| `pitchMultiplier` | `Float` | Baseline pitch adjustment (default 1.0) |
| `volume` | `Float` | Speech output volume (0.0–1.0) |
| `preUtteranceDelay` | `TimeInterval` | Pause before speaking begins |
| `postUtteranceDelay` | `TimeInterval` | Pause after speaking ends |
| `prefersAssistiveTechnologySettings` | `Bool` | When `true`, respects the user's accessibility speech settings |
| `speechString` | `String` | Plain text content (read-only) |
| `attributedSpeechString` | `NSAttributedString` | Formatted text with pronunciation attributes (read-only) |

### Rate Constants

| Constant | Value |
|----------|-------|
| `AVSpeechUtteranceMinimumSpeechRate` | Slowest allowed rate |
| `AVSpeechUtteranceDefaultSpeechRate` | Normal speed |
| `AVSpeechUtteranceMaximumSpeechRate` | Fastest allowed rate |

## Notes

- iOS 7.0+, macOS 10.14+, tvOS (all), watchOS 2.0+, visionOS 1.0+
- Create separate utterances to apply different parameters to different portions of text
- Use `init(attributedString:)` with `AVSpeechSynthesisIPANotationAttribute` for IPA-based pronunciation control
- Use `init(ssmlRepresentation:)` to drive synthesis from SSML markup

## Related

- [AVSpeechSynthesizer](./avspeechsynthesizer.md)
