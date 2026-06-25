# AVAudioRecorder

Records audio data to a file. Supports metering, scheduled recording, and multiple audio formats.

## Signature / Usage

```swift
let settings: [String: Any] = [
    AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
    AVSampleRateKey: 44100,
    AVNumberOfChannelsKey: 2,
    AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
]
let recorder = try AVAudioRecorder(url: outputURL, settings: settings)
recorder.prepareToRecord()
recorder.record()
// ...
recorder.stop()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `URL` | Output file URL (read-only) |
| `format` | `AVAudioFormat` | Format of the recorded audio (read-only) |
| `settings` | `[String: Any]` | Audio format settings (read-only) |
| `isRecording` | `Bool` | Whether recording is active (read-only) |
| `currentTime` | `TimeInterval` | Time elapsed since recording began (read-only) |
| `isMeteringEnabled` | `Bool` | Enables audio-level metering |
| `delegate` | `AVAudioRecorderDelegate?` | Receives recording events and encoding errors |

## Notes

- iOS 3.0+, macOS 10.7+, tvOS 17.0+, watchOS 4.0+, visionOS 1.0+
- On iOS/tvOS, configure `AVAudioSession` with `.record` or `.playAndRecord` category before recording
- Call `prepareToRecord()` to pre-create the file and minimize latency when `record()` is called
- Use `record(forDuration:)` to automatically stop after a fixed duration
- Use `deleteRecording()` to remove the output file; only valid when not recording

## Related

- [AVAudioPlayer](./avaudioplayer.md)
- [AVAudioSession](./avaudiosession.md)
- [AVAudioEngine](./avaudioengine.md)
