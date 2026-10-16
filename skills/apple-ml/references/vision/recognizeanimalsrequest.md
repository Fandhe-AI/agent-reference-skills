# RecognizeAnimalsRequest

A request that recognizes animals in an image, generating `RecognizedObjectObservation` objects that describe the animals the request detects.

## Signature / Usage

```swift
struct RecognizeAnimalsRequest
```

Creating a request: `init(_ revision: RecognizeAnimalsRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `supportedAnimals` | `[RecognizeAnimalsRequest.Animal]` | The collection of animals that the request can detect |
| `supportedIdentifiers` | `[RecognizeAnimalsRequest.Identifier]` | The collection of animal identifiers that the request can detect |
| `revision` | `RecognizeAnimalsRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[RecognizeAnimalsRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `Animal` is "an identifier for a recognizable animal"; `Identifier` is a separate nested enum (no abstract in the docs).
- Apple sample: "Classifying images for categorization and search".

## Related

- [ClassifyImageRequest](./classifyimagerequest.md)
- [DetectHumanRectanglesRequest](./detecthumanrectanglesrequest.md)
- [DetectAnimalBodyPoseRequest](./detectanimalbodyposerequest.md)
