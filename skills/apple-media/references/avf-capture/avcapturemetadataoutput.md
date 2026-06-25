# AVCaptureMetadataOutput

A capture output that intercepts and forwards timed metadata (e.g., QR codes, faces) from a capture session.

## Signature / Usage

```swift
let metadataOutput = AVCaptureMetadataOutput()
if session.canAddOutput(metadataOutput) {
    session.addOutput(metadataOutput)
    // Set types after adding to session
    metadataOutput.metadataObjectTypes = [.qr, .face]
    metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
    // Optionally restrict scan area
    metadataOutput.rectOfInterest = CGRect(x: 0.2, y: 0.2, width: 0.6, height: 0.6)
}

// Delegate:
// func metadataOutput(_ output: AVCaptureMetadataOutput,
//                     didOutput metadataObjects: [AVMetadataObject],
//                     from connection: AVCaptureConnection)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `metadataObjectTypes` | `[AVMetadataObject.ObjectType]` | Types of metadata to detect and forward |
| `availableMetadataObjectTypes` | `[AVMetadataObject.ObjectType]` | Types the current session configuration can detect |
| `rectOfInterest` | `CGRect` | Normalized rectangle (0–1) limiting the detection area |
| `metadataObjectsDelegate` | `AVCaptureMetadataOutputObjectsDelegate?` | Delegate receiving metadata objects |
| `metadataObjectsCallbackQueue` | `DispatchQueue?` | Queue on which delegate callbacks are delivered |

## Notes

- iOS 6.0+, iPadOS 6.0+, macOS 13.0+, Mac Catalyst 14.0+, tvOS 17.0+
- `metadataObjectTypes` must be set **after** adding the output to the session; available types depend on the current inputs.
- `rectOfInterest` uses metadata coordinate space (origin at top-left, values 0–1); convert from layer coordinates using `AVCaptureVideoPreviewLayer.metadataOutputRectConverted(fromLayerRect:)`.
- Implement `AVCaptureMetadataOutputObjectsDelegate` to receive detected objects.

## Related

- [AVCaptureOutput](./avcaptureoutput.md)
- [AVCaptureVideoPreviewLayer](./avcapturevideopreviewlayer.md)
- [AVCaptureSession](./avcapturesession.md)
