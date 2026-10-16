# Isolating an object from a tap, box, or scribble

Generate and refine a mask that isolates an object in an image based on a person's selection, using `GenerateIterativeSegmentationRequest`.

## Signature / Usage

```swift
let request = GenerateIterativeSegmentationRequest(
    seedPoint: NormalizedPoint(x: 0.5, y: 0.5)
)
let handler = ImageRequestHandler(URL(filePath: "/path/to/image.jpg"))

let observation = try await handler.perform(request)
let mask = observation?.pixelBuffer
```

Download the model on first use:

```swift
let request = GenerateIterativeSegmentationRequest(seedPoint: NormalizedPoint(x: 0.5, y: 0.5))

switch await request.assetStatus {
case .ready:
    break
case .notReady:
    try await request.downloadAssets()
case .downloading, .error:
    return
@unknown default:
    return
}
```

Seed from a point, box, or scribble:

```swift
let boxRequest = GenerateIterativeSegmentationRequest(
    seedBox: NormalizedRect(x: 0.2, y: 0.3, width: 0.4, height: 0.5)
)

let scribbleRequest = GenerateIterativeSegmentationRequest(
    seedScribbleBuffer: CVReadOnlyPixelBuffer(unsafeBuffer: scribblePixelBuffer)
)
```

Refine the mask and set quality:

```swift
try request.addIncludedPoint(NormalizedPoint(x: 0.6, y: 0.4))
try request.addExcludedPoint(NormalizedPoint(x: 0.2, y: 0.8))

let refinedObservation = try await handler.perform(request)
let refinedMask = refinedObservation?.pixelBuffer

request.qualityLevel = .accurate
```

## Notes

- Unlike automatic segmentation requests that detect specific categories (people, documents), iterative segmentation works on arbitrary objects based on coordinates the app provides: a point (tap inside the object), a bounding box (`NormalizedRect`), or a scribble (pixel buffer with strokes).
- The result is a `PixelBufferObservation` whose `pixelBuffer` holds the alpha mask.
- Refinement flow: initial selection, then include points (expand) or exclude points (trim), then perform the request again with the same handler to get the updated mask.
- Reuse the same `ImageRequestHandler` when refining; it preserves intermediate image representations so the mask updates quickly. To isolate a different object, create a new request and a new handler.
- Limits: 13 total points when created with a point or scribble, 11 with a bounding box; adding past the limit throws.
- Vision downloads the model on demand. Check `assetStatus` and call `downloadAssets()` (or `downloadAssets(progress:)` for UI progress) when `.notReady`; the request throws if performed before the model is downloaded.
- Point and rectangle initializers use Vision's normalized coordinates (0 to 1, origin at lower-left). UIKit and SwiftUI use a top-left origin, so convert and flip the y-axis first.
- Each initializer takes an optional revision; if omitted, the SDK default is used. See `supportedRevisions`.
- Quality levels: `fast` (low resolution, quickest), `balanced` (default), `accurate` (highest resolution, slowest).
- Companion sample code: "Segmenting objects using taps, scribbles or rectangles".
- Source: https://developer.apple.com/documentation/vision/segmenting-objects-with-iterative-refinement

## Related

- [GenerateIterativeSegmentationRequest](./generateiterativesegmentationrequest.md)
- [DownloadableAssetsRequest](./downloadableassetsrequest.md)
- [DownloadableAssetsRequestStatus](./downloadableassetsrequeststatus.md)
- [ImageRequestHandler](./imagerequesthandler.md)
- [GenerateForegroundInstanceMaskRequest](./generateforegroundinstancemaskrequest.md)
