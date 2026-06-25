# AVCapturePhotoSettings

An object that specifies the features and settings for a single photo capture request.

## Signature / Usage

```swift
// Basic JPEG capture
let settings = AVCapturePhotoSettings()
settings.flashMode = .auto
settings.isHighResolutionPhotoEnabled = true
photoOutput.capturePhoto(with: settings, delegate: self)

// RAW + JPEG capture
let rawFormat = photoOutput.availableRawPhotoPixelFormatTypes.first!
let processedFormat = [AVVideoCodecKey: AVVideoCodecType.hevc]
let rawSettings = AVCapturePhotoSettings(
    rawPixelFormatType: rawFormat,
    processedFormat: processedFormat
)
photoOutput.capturePhoto(with: rawSettings, delegate: self)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `flashMode` | `AVCaptureDevice.FlashMode` | Flash behavior: `.auto`, `.on`, `.off` |
| `photoQualityPrioritization` | `AVCapturePhotoOutput.QualityPrioritization` | Trade-off between quality and delivery speed |
| `isHighResolutionPhotoEnabled` | `Bool` | Capture at the highest supported resolution |
| `maxPhotoDimensions` | `CMVideoDimensions` | Maximum resolution cap for the capture |
| `isDepthDataDeliveryEnabled` | `Bool` | Include a depth map with the photo |
| `isPortraitEffectsMatteDeliveryEnabled` | `Bool` | Include portrait effects matte |
| `isAutoRedEyeReductionEnabled` | `Bool` | Apply automatic red-eye reduction |
| `isConstantColorEnabled` | `Bool` | Capture with constant color |
| `isAutoContentAwareDistortionCorrectionEnabled` | `Bool` | Apply content-aware distortion correction |
| `isAutoVirtualDeviceFusionEnabled` | `Bool` | Enable virtual device sensor fusion |
| `isShutterSoundSuppressionEnabled` | `Bool` | Suppress the shutter sound |
| `livePhotoMovieFileURL` | `URL?` | Output URL for the Live Photo movie component |
| `livePhotoVideoCodecType` | `AVVideoCodecType` | Codec for the Live Photo movie |
| `rawPhotoPixelFormatType` | `OSType` | Bayer RAW pixel format for RAW capture |
| `rawFileType` | `AVFileType?` | Container format for RAW output |
| `processedFileType` | `AVFileType?` | Container format for processed output |
| `previewPhotoFormat` | `[String: Any]?` | Format dictionary for a preview-sized image |
| `embeddedThumbnailPhotoFormat` | `[String: Any]?` | Format for an embedded thumbnail |
| `uniqueID` | `Int64` | Unique identifier for this settings object |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 14.0+, tvOS 17.0+
- Each settings instance can only be used **once**. Reusing the same object throws `NSInvalidArgumentException`. Use `init(from:)` to copy settings for repeated captures.
- Properties like `isDepthDataDeliveryEnabled` must be supported by the photo output (`isDepthDataDeliverySupported`) before enabling.

## Related

- [AVCapturePhotoOutput](./avcapturephotooutput.md)
