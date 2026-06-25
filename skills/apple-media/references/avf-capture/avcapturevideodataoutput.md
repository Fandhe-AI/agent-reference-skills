# AVCaptureVideoDataOutput

A capture output that records video and provides access to video frames for processing.

## Signature / Usage

```swift
let videoOutput = AVCaptureVideoDataOutput()
videoOutput.videoSettings = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
]
videoOutput.alwaysDiscardsLateVideoFrames = true

let queue = DispatchQueue(label: "com.example.videoQueue")
videoOutput.setSampleBufferDelegate(self, queue: queue)

session.addOutput(videoOutput)

// In delegate:
// func captureOutput(_ output: AVCaptureOutput,
//                    didOutput sampleBuffer: CMSampleBuffer,
//                    from connection: AVCaptureConnection)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `videoSettings` | `[String: Any]` | Compression/pixel format settings for output frames |
| `alwaysDiscardsLateVideoFrames` | `Bool` | Drop frames that arrive late when delegate is busy |
| `automaticallyConfiguresOutputBufferDimensions` | `Bool` | Auto-configure output buffer size based on session preset |
| `deliversPreviewSizedOutputBuffers` | `Bool` | Deliver preview-sized buffers for live preview |
| `preservesDynamicHDRMetadata` | `Bool` | Preserve HDR metadata on output sample buffers |
| `availableVideoPixelFormatTypes` | `[OSType]` | Pixel formats supported on this device |
| `availableVideoCodecTypes` | `[AVVideoCodecType]` | Video codecs supported for Asset Writer output |
| `sampleBufferDelegate` | `AVCaptureVideoDataOutputSampleBufferDelegate?` | Delegate receiving video frames |
| `sampleBufferCallbackQueue` | `DispatchQueue?` | Queue on which delegate callbacks are invoked |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 1.0+
- Avoid BGRA pixel formats when possible — they require conversion and use more memory than native formats (see TN3121).
- The delegate and its queue must remain valid for the lifetime of the output.
- Use `recommendedVideoSettings(forVideoCodecType:assetWriterOutputFileType:)` to get settings compatible with `AVAssetWriter`.

## Related

- [AVCaptureOutput](./avcaptureoutput.md)
- [AVCaptureSession](./avcapturesession.md)
