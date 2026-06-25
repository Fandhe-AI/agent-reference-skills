# VNRecognizeTextRequest

Locates and recognizes text in an image. Returns `VNRecognizedTextObservation` objects containing candidate strings with confidence scores.

## Signature / Usage

```swift
let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.recognitionLanguages = ["en-US"]

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

if let observations = request.results {
    for obs in observations {
        let topCandidate = obs.topCandidates(1).first
        print(topCandidate?.string ?? "")
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `recognitionLevel` | `VNRequestTextRecognitionLevel` | `.accurate` (default) or `.fast` |
| `recognitionLanguages` | `[String]` | BCP-47 language tags in priority order (e.g. `["en-US", "fr-FR"]`) |
| `automaticallyDetectsLanguage` | `Bool` | Auto-detect language before choosing model |
| `usesLanguageCorrection` | `Bool` | Apply language-model correction (default `true`) |
| `customWords` | `[String]` | Additional vocabulary to improve recognition |
| `minimumTextHeight` | `Float` | Minimum text height as fraction of image height |

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / visionOS 1.0+
- Results type: `[VNRecognizedTextObservation]?`.
- Call `supportedRecognitionLanguages()` to get valid language codes for the chosen `recognitionLevel`.
- **New Swift API (iOS 18+):** `RecognizeTextRequest` uses `async/await` and `[Locale.Language]` for `recognitionLanguages`. Property `minimumTextHeight` renamed to `minimumTextHeightFraction`.

## Related

- [VNRecognizedTextObservation](./vnrecognizedtextobservation.md)
- [RecognizeTextRequest (Swift API)](./recognizetextrequest.md)
- [VNImageRequestHandler](./vnimagerequesthandler.md)
