# RecognizeTextRequest

Modern async/await replacement for `VNRecognizeTextRequest`, introduced in iOS 18. Recognizes text in an image and returns `RecognizedTextObservation` objects.

## Signature / Usage

```swift
var request = RecognizeTextRequest()
request.recognitionLevel = .accurate
request.recognitionLanguages = [Locale.Language(identifier: "en-US")]

let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)

for obs in observations {
    print(obs.transcript) // top candidate string, direct access
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `recognitionLevel` | `RecognizeTextRequest.RecognitionLevel` | `.accurate` or `.fast` |
| `recognitionLanguages` | `[Locale.Language]` | Languages in priority order |
| `automaticallyDetectsLanguage` | `Bool` | Auto-detect language |
| `usesLanguageCorrection` | `Bool` | Apply language-model correction |
| `customWords` | `[String]` | Supplementary vocabulary |
| `minimumTextHeightFraction` | `Float` | Minimum text height as fraction of image height |
| `supportedRecognitionLanguages` | `[Locale.Language]` | Read-only; available languages for current config |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+
- Uses `[Locale.Language]` instead of `[String]` for language specification (vs. `VNRecognizeTextRequest`).
- Property `minimumTextHeight` renamed to `minimumTextHeightFraction`.
- `RecognizedTextObservation.transcript` provides direct access to the top candidate without calling `topCandidates(1)`.

## Related

- [VNRecognizeTextRequest](./vnrecognizetextrequest.md)
- [VNRecognizedTextObservation](./vnrecognizedtextobservation.md)
- [ImageRequestHandler](./imagerequesthandler.md)
