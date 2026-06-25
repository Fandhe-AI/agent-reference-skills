# AVCaptureVideoPreviewLayer

A Core Animation layer that displays live video from a camera device.

## Signature / Usage

```swift
class PreviewView: UIView {
    override class var layerClass: AnyClass {
        AVCaptureVideoPreviewLayer.self
    }

    var previewLayer: AVCaptureVideoPreviewLayer {
        layer as! AVCaptureVideoPreviewLayer
    }

    func configure(with session: AVCaptureSession) {
        previewLayer.session = session
        previewLayer.videoGravity = .resizeAspectFill
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `session` | `AVCaptureSession?` | The capture session providing video to preview |
| `connection` | `AVCaptureConnection?` | The connection from this layer to a video input port |
| `videoGravity` | `AVLayerVideoGravity` | How video content is scaled/cropped within the layer bounds |
| `isPreviewing` | `Bool` | Whether the layer is currently rendering video frames |
| `isDeferredStartEnabled` | `Bool` | Whether to defer starting the preview |
| `isDeferredStartSupported` | `Bool` | Whether deferred start is supported |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+
- Use `init(session:)` for automatic connection setup; use `init(sessionWithNoConnection:)` for manual connection management.
- Override `layerClass` in a `UIView` subclass to use the preview layer as the backing layer — more efficient than adding it as a sublayer.
- Coordinate conversion methods (`layerPointConverted(fromCaptureDevicePoint:)`, `metadataOutputRectConverted(fromLayerRect:)`, etc.) translate between layer coordinates and capture/metadata coordinate spaces.

## Related

- [AVCaptureSession](./avcapturesession.md)
- [AVCaptureMetadataOutput](./avcapturemetadataoutput.md)
