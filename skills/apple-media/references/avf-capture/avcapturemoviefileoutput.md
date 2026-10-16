# AVCaptureMovieFileOutput

A capture output that records video and audio to QuickTime movie files.

## Signature / Usage

```swift
let movieOutput = AVCaptureMovieFileOutput()
if session.canAddOutput(movieOutput) {
    session.addOutput(movieOutput)
}

// Start recording
let outputURL = URL(fileURLWithPath: "/path/to/output.mov")
movieOutput.startRecording(to: outputURL, recordingDelegate: self)

// Stop recording
movieOutput.stopRecording()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `movieFragmentInterval` | `CMTime` | — | Interval at which movie fragments are written to disk |
| `metadata` | `[AVMetadataItem]?` | — | Metadata written to each recorded file |
| `availableVideoCodecTypes` | `[AVVideoCodecType]` | — | Supported video codecs for output |
| `isSpatialVideoCaptureEnabled` | `Bool` | — | Enable spatial video capture |
| `isSpatialVideoCaptureSupported` | `Bool` | — | Whether spatial video capture is supported |
| `isPrimaryConstituentDeviceSwitchingBehaviorForRecordingEnabled` | `Bool` | — | Allow camera switching during recording |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+
- Inherits from `AVCaptureFileOutput`, which provides `maxRecordedDuration`, `maxRecordedFileSize`, `recordedDuration`, and `recordedFileSize`.
- `AVCaptureFileOutput` `pauseRecording()` / `resumeRecording()` / `isRecordingPaused` are available on iOS/iPadOS/tvOS 18.0+ (macOS 10.7+), so recording can be paused and resumed on iOS.
- Use `setOutputSettings(_:for:)` to configure codec and compression per connection.
- Use `setRecordsVideoOrientationAndMirroringChangesAsMetadataTrack(_:for:)` to embed orientation changes as a metadata track.
- Implement `AVCaptureFileOutputRecordingDelegate` to respond to recording start/finish events and errors.

## Related

- [AVCaptureOutput](./avcaptureoutput.md)
- [AVCaptureSession](./avcapturesession.md)
