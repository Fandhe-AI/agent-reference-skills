# CIFilterBuiltins

A collection of type-safe protocols and `CIFilter` factory methods for built-in Core Image filters. Imported separately via `import CoreImage.CIFilterBuiltins`. Eliminates stringly-typed `setValue(_:forKey:)` calls and provides compile-time safety.

## Signature / Usage

```swift
import CoreImage
import CoreImage.CIFilterBuiltins

// Type-safe filter creation
let sepia = CIFilter.sepiaTone()
sepia.inputImage = inputImage
sepia.intensity = 0.9
let output = sepia.outputImage

// Chain multiple filters
let bloom = CIFilter.bloom()
bloom.inputImage = sepia.outputImage
bloom.intensity = 1.0
bloom.radius = 10
let final = bloom.outputImage
```

## Options / Props

### Filter Categories

| Category | Description |
|----------|-------------|
| Blur | Gaussian blur, motion blur, zoom blur, noise reduction |
| Color Adjustment | Exposure, hue, tint, white balance |
| Color Effect | Sepia tone, false color, dithering, photo effects |
| Composite Operations | Blend modes, compositing operators |
| Convolution | Sharpen, edge detect, emboss |
| Distortion | Bump, twirl, pinch distortions |
| Generator | Barcode, checkerboard, gradient generators |
| Geometry Adjustment | Crop, rotate, scale, perspective |
| Gradient | Linear and radial gradient generators |
| Halftone Effect | Monochrome and CMYK halftone screens |
| Reduction | Area average, histogram statistics |
| Sharpening | Unsharp mask, sharpen luminance |
| Stylizing | Pixellate, line overlay, crystallize |
| Tile Effect | Kaleidoscope, parallelogram tile |
| Transition | Page curl, swipe, dissolve transitions |

### API Pattern

Each built-in filter has a corresponding protocol (e.g., `CISepiaTone`) and a static factory method on `CIFilter` (e.g., `CIFilter.sepiaTone()`). The returned object:

- Conforms to the filter's protocol, giving typed property access.
- Returns a non-optional instance (unlike `CIFilter(name:)` which is failable).
- Exposes `inputImage`, `outputImage`, and filter-specific parameters as Swift properties.

## Notes

- iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.1+, tvOS 13.0+, visionOS 1.0+
- For filters not covered by type-safe protocols, fall back to `CIFilter(name: "CI...")`.
- The underlying object is still a `CIFilter`; KVC (`setValue(_:forKey:)`) still works on it.

## Related

- [CIFilter](./cifilter.md)
- [CIImage](./ciimage.md)
- [CIContext](./cicontext.md)
