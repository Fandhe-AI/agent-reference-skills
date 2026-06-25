# AVCaptureOutput

Abstract superclass for objects that provide output destinations for a capture session.

## Signature / Usage

```swift
// Do not instantiate directly — use a concrete subclass
let photoOutput = AVCapturePhotoOutput()
if session.canAddOutput(photoOutput) {
    session.addOutput(photoOutput)
}
let connection = photoOutput.connection(with: .video)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `connections` | `[AVCaptureConnection]` | All connections attached to this output |
| `isDeferredStartEnabled` | `Bool` | Whether to defer starting this output |
| `isDeferredStartSupported` | `Bool` | Whether the output supports deferred start |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 1.0+
- Concrete subclasses: `AVCapturePhotoOutput`, `AVCaptureMovieFileOutput`, `AVCaptureVideoDataOutput`, `AVCaptureMetadataOutput`, `AVCaptureAudioDataOutput`, `AVCaptureDepthDataOutput`.
- Outputs have no connections when created; the session automatically forms connections when the output is added.
- Use `connection(with:)` to retrieve the connection for a specific media type.
- Coordinate-conversion methods (`metadataOutputRectConverted(fromOutputRect:)`, etc.) translate between output and metadata coordinate spaces.

## Related

- [AVCapturePhotoOutput](./avcapturephotooutput.md)
- [AVCaptureMovieFileOutput](./avcapturemoviefileoutput.md)
- [AVCaptureVideoDataOutput](./avcapturevideodataoutput.md)
- [AVCaptureMetadataOutput](./avcapturemetadataoutput.md)
- [AVCaptureSession](./avcapturesession.md)
