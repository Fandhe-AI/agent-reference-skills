# CIImage

A representation of an image to be processed or produced by Core Image filters. CIImage is an "image recipe" — it contains all information necessary to produce an image, but Core Image defers rendering until explicitly requested (lazy evaluation).

## Signature / Usage

```swift
// From URL
let image = CIImage(contentsOf: url)

// From CGImage
let image = CIImage(cgImage: cgImage)

// From CVPixelBuffer
let image = CIImage(cvPixelBuffer: pixelBuffer)

// Apply a filter by name
let output = image.applyingFilter("CISepiaTone", parameters: ["inputIntensity": 0.9])

// Chain transforms
let result = image
    .cropped(to: rect)
    .oriented(.up)
    .applyingGaussianBlur(sigma: 5)
```

## Options / Props

### Key Initializers

| Initializer | Description |
|-------------|-------------|
| `init?(contentsOf: URL, options:)` | Load from file URL |
| `init(cgImage: CGImage, options:)` | Wrap a Quartz 2D image |
| `init?(image: UIImage, options:)` | Wrap a UIImage |
| `init(cvPixelBuffer: CVPixelBuffer, options:)` | Wrap a CVPixelBuffer |
| `init?(mtlTexture: MTLTexture, options:)` | Wrap a Metal texture |
| `init(bitmapData:bytesPerRow:size:format:colorSpace:)` | From raw bitmap data |
| `init(color: CIColor)` | Solid color, infinite extent |
| `class func empty() -> CIImage` | Empty image |

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `extent` | `CGRect` | Rectangle specifying the image extent |
| `colorSpace` | `CGColorSpace?` | The image's color space |
| `cgImage` | `CGImage?` | Underlying CGImage if available |
| `pixelBuffer` | `CVPixelBuffer?` | Underlying CVPixelBuffer if available |
| `properties` | `[String: Any]` | Image metadata dictionary |
| `isOpaque` | `Bool` | Whether the image is fully opaque |

### Key Methods

| Method | Description |
|--------|-------------|
| `applyingFilter(_:parameters:)` | Apply a named filter, returns new CIImage |
| `transformed(by: CGAffineTransform)` | Apply affine transform |
| `cropped(to: CGRect)` | Crop to rectangle |
| `oriented(_ orientation: CGImagePropertyOrientation)` | Apply EXIF orientation |
| `composited(over: CIImage)` | Composite over another image |
| `clampedToExtent()` | Extend edges infinitely |
| `applyingGaussianBlur(sigma:)` | Apply Gaussian blur |
| `samplingNearest()` | Use nearest-neighbor sampling |
| `insertingIntermediate(cache:)` | Insert a rendering break point |
| `autoAdjustmentFilters(options:)` | Get suggested auto-adjustment filters |

### Static Color Constants

`CIImage.black`, `.white`, `.red`, `.green`, `.blue`, `.cyan`, `.magenta`, `.yellow`, `.gray`, `.clear`

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Immutable and thread-safe; CIFilter instances are not.
- Does not render until `CIContext` explicitly requests rendering.
- `CIImage` objects are "recipes" — chaining operations builds a filter graph without executing it.

## Related

- [CIFilter](./cifilter.md)
- [CIContext](./cicontext.md)
- [CIColor](./cicolor.md)
