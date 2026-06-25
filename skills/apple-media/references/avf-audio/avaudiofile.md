# AVAudioFile

Represents an audio file opened for reading or writing. Automatically converts between the on-disk file format and a processing format used with `AVAudioPCMBuffer`.

## Signature / Usage

```swift
// Reading
let audioFile = try AVAudioFile(forReading: url)
let buffer = AVAudioPCMBuffer(
    pcmFormat: audioFile.processingFormat,
    frameCapacity: AVAudioFrameCount(audioFile.length)
)!
try audioFile.read(into: buffer)

// Writing
let settings: [String: Any] = [AVFormatIDKey: Int(kAudioFormatLinearPCM), AVSampleRateKey: 44100]
let outFile = try AVAudioFile(forWriting: url, settings: settings)
try outFile.write(from: buffer)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `URL` | Location of the audio file (read-only) |
| `fileFormat` | `AVAudioFormat` | On-disk format of the file (read-only) |
| `processingFormat` | `AVAudioFormat` | Format used for read/write buffers (read-only) |
| `length` | `AVAudioFramePosition` | Total number of sample frames (read-only) |
| `framePosition` | `AVAudioFramePosition` | Current read/write position; set directly for random access |
| `isOpen` | `Bool` | Whether the file is currently open (read-only) |

## Notes

- iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Reads and writes proceed sequentially; set `framePosition` for random access
- Format conversion between `fileFormat` and `processingFormat` happens automatically
- Use `AVReadOnlyAudioPCMBuffer` (from `read(frameCount:)`) for thread-safe concurrent reading

## Related

- [AVAudioPCMBuffer](./avaudiopcmbuffer.md)
- [AVAudioPlayerNode](./avaudioplayernode.md)
- [AVAudioEngine](./avaudioengine.md)
