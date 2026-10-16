# VideoProcessor

An object that performs offline analysis of video content. It manages frame-by-frame processing and delivers results through async streams; multiple requests attached to the same instance operate on the same frames simultaneously.

## Signature / Usage

```swift
let videoURL = // A local `URL` path to the video you want to process.
let videoProcessor = VideoProcessor(videoURL)

// Calculate the aesthetics score for each frame.
let aestheticsScoresRequest = CalculateImageAestheticsScoresRequest()

// Perform face detection on each frame. 
let faceDetectionRequest = DetectFaceRectanglesRequest()

do {
    let asset = AVURLAsset(url: videoURL)
    let totalDuration = try await asset.load(.duration).seconds
    let framesToEvaluate: Double = 100

    // Create a time interval that processes 100 frames.
    let interval = CMTime(
        seconds: totalDuration / framesToEvaluate,
        preferredTimescale: 600
    )
    let cadence = VideoProcessor.Cadence.timeInterval(interval)

    // Add the requests to get an `AsyncSequence` stream that provides access 
    // to the observation results.
    let aestheticsScoreStream = try await videoProcessor.addRequest(aestheticsScoresRequest, 
                                                                    cadence: cadence)
    let faceDetectionStream = try await videoProcessor.addRequest(faceDetectionRequest, 
                                                                  cadence: cadence)

    // Start the analysis.
    videoProcessor.startAnalysis()

    var aestheticsResults: [CMTime: Float] = [:]
    for try await observation in aestheticsScoreStream {
        if let timeRange = observation.timeRange {
            aestheticsResults[timeRange.start] = observation.overallScore
        }
    }
} catch {
    print("Error processing the video: \(error.localizedDescription)")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(_:)` | `(URL)` | Creates a video processor to perform framework requests against the video asset you specify |
| `addRequest(_:cadence:)` | `<T>(T, cadence: VideoProcessor.Cadence?) async throws -> some AsyncSequence<T.Result, any Error>` | Adds a request to the video processor |
| `removeRequest(_:)` | `(any VisionRequest) async -> Bool` | Stops performing a request on future frames |
| `startAnalysis(of:)` | `(CMTimeRange?)` | Begins analyzing video frames |
| `cancel()` | `async` | Stops the video processor |
| `Cadence` | enum | Describes the video processing cadence; `Cadence.timeInterval(_: CMTime)` processes, at most, one frame during each interval you specify |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `final class` conforming to `Sendable` and `SendableMetatype`.
- Processing every frame gives the most accuracy but is computationally expensive; choose a `Cadence` before starting.
- Usage snippet combines the official listings into one scope (the result loop sits inside the `do` block so `aestheticsScoreStream` is in scope).
- The snippet joins the three source code blocks from the overview; the `startAnalysis()` call is written without arguments in the source while the documented signature is `startAnalysis(of: CMTimeRange?)`.
- Source: https://developer.apple.com/documentation/vision/videoprocessor

## Related

- [ImageRequestHandler](./imagerequesthandler.md)
- [TargetedImageRequestHandler](./targetedimagerequesthandler.md)
- [StatefulRequest](./statefulrequest.md)
- [CalculateImageAestheticsScoresRequest](./calculateimageaestheticsscoresrequest.md)
