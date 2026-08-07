# CIRAWFilter

A `CIFilter` subclass that produces an image by manipulating RAW image sensor data from a digital camera or scanner.

## Signature / Usage

```swift
// Create from a RAW image URL
let filter = CIRAWFilter(imageURL: rawFileURL)
filter.exposure = 0.5
filter.baselineExposure = 0.0
let outputImage = filter.outputImage
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(cvPixelBuffer:properties:)` | Creates a RAW filter from the pixel buffer and its properties |
| `init(imageData:identifierHint:)` | Creates a RAW filter from image data and a type hint |
| `init(imageURL:)` | Creates a RAW filter from the image at the specified URL |

### Properties (selected)

| Property | Type | Description |
|----------|------|-------------|
| `supportedCameraModels` | `[String]` | Names of all supported camera models |
| `supportedDecoderVersions` | `[CIRAWDecoderVersion]` | Supported decoder versions for the given image type |
| `nativeSize` | `CGSize` | Full native size of the unscaled image |
| `baselineExposure` | `Float` | Baseline exposure to apply to the image |
| `boostAmount` | `Float` | Amount of global tone curve to apply |
| `exposure` | `Float` | Amount of exposure to apply |
| `decoderVersion` | `CIRAWDecoderVersion` | Decoder version to use |
| `isDraftModeEnabled` | `Bool` | Whether draft mode is enabled |
| `isGamutMappingEnabled` | `Bool` | Whether gamut mapping is enabled |
| `linearSpaceFilter` | `CIFilter?` | Filter applied to the RAW image while in linear space |
| `neutralTemperature` | `Float` | White balance based on temperature values |
| `neutralTint` | `Float` | White balance based on tint values |
| `orientation` | `CGImagePropertyOrientation` | Orientation of the image |
| `previewImage` | `CIImage?` | Auxiliary image representing a preview of the original image |
| `scaleFactor` | `Float` | Desired scale factor to draw the output image |
| `sharpnessAmount` | `Float` | Amount of sharpness to apply to edges |

### Type Methods

| Method | Description |
|--------|-------------|
| `supportedCameraModels(with:)` | Returns `[String]` of supported camera models for a given decoder version |

## Notes

- iOS 15.0+, iPadOS 15.0+, macOS 12.0+, Mac Catalyst 15.0+, tvOS 15.0+, visionOS 1.0+
- Query `is*Supported` properties (e.g. `isLensCorrectionSupported`, `isDetailSupported`) before enabling the corresponding adjustment, since RAW support varies by camera/decoder.
- Inherits from `CIFilter`; use in conjunction with `CIContext` for rendering.

## Related

- [CIFilter](./cifilter.md)
- [CIColor](./cicolor.md)
- [CIVector](./civector.md)
