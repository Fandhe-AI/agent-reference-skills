# CGImage

A bitmap image or image mask. Represents a rectangular array of pixels, each pixel being a sample from the source image data.

## Signature / Usage

```swift
// Create a 100x100 RGBA bitmap image from a data provider
let colorSpace = CGColorSpaceCreateDeviceRGB()
let bitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue)

let image = CGImage(width: 100, height: 100,
                    bitsPerComponent: 8,
                    bitsPerPixel: 32,
                    bytesPerRow: 400,
                    space: colorSpace,
                    bitmapInfo: bitmapInfo,
                    provider: dataProvider,
                    decode: nil,
                    shouldInterpolate: true,
                    intent: .defaultIntent)

// Draw into a context
context.draw(image!, in: CGRect(x: 0, y: 0, width: 100, height: 100))
```

## Options / Props

### Creating Images

| Initializer | Description |
|-------------|-------------|
| `init(width:height:bitsPerComponent:bitsPerPixel:bytesPerRow:space:bitmapInfo:provider:decode:shouldInterpolate:intent:)` | Creates a bitmap image from a data provider |
| `init(jpegDataProviderSource:decode:shouldInterpolate:intent:)` | From a JPEG data provider |
| `init(pngDataProviderSource:decode:shouldInterpolate:intent:)` | From a PNG data provider |
| `init(maskWidth:height:bitsPerComponent:bitsPerPixel:bytesPerRow:provider:decode:shouldInterpolate:)` | Creates an image mask |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | `Int` | Width in pixels |
| `height` | `Int` | Height in pixels |
| `bitsPerComponent` | `Int` | Bits per color component (e.g., 8 for 8-bit) |
| `bitsPerPixel` | `Int` | Total bits per pixel |
| `bytesPerRow` | `Int` | Bytes per pixel row |
| `colorSpace` | `CGColorSpace?` | Color space of the image |
| `alphaInfo` | `CGImageAlphaInfo` | Alpha channel arrangement |
| `bitmapInfo` | `CGBitmapInfo` | Bitmap component information |
| `dataProvider` | `CGDataProvider?` | Source data provider |
| `isMask` | `Bool` | Whether this is an image mask |
| `shouldInterpolate` | `Bool` | Whether interpolation is applied when scaling |
| `renderingIntent` | `CGColorRenderingIntent` | How out-of-gamut colors are handled |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `copy()` | `CGImage?` | Creates an exact copy |
| `copy(colorSpace:)` | `CGImage?` | Copy converted to a different color space |
| `cropping(to:)` | `CGImage?` | Creates a subimage from a rectangle |
| `masking(_:)` | `CGImage?` | Returns the image masked by another `CGImage` |
| `copy(maskingColorComponents:)` | `CGImage?` | Masks by color component ranges |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. To create a `CGImage` from a `UIView` or `NSView`, draw the view into a `CGContext` via `UIGraphicsImageRenderer` (UIKit) or `NSGraphicsContext` (AppKit), then retrieve the image from the context.

## Related

- [CGColorSpace](./cgcolorspace.md)
- [CGBitmapInfo](./cgbitmapinfo.md)
- [CGDataProvider](./cgdataprovider.md)
- [CGContext](./cgcontext.md)
