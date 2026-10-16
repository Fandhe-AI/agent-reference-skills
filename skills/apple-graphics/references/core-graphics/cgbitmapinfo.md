# CGBitmapInfo

An option set specifying the memory layout of pixel components in a bitmap, including byte ordering and floating-point component flags. Used when creating `CGContext` (bitmap) and `CGImage` objects.

## Signature / Usage

```swift
// Typed API: 8-bit RGBA, premultiplied alpha, 32-bit big-endian byte order
let bitmapInfo = CGBitmapInfo(alpha: .premultipliedLast,
                              component: .integer,
                              byteOrder: .order32Big)

let context = CGContext(data: nil,
                        width: 512, height: 512,
                        bitsPerComponent: 8, bytesPerRow: 0,
                        space: CGColorSpaceCreateDeviceRGB(),
                        bitmapInfo: bitmapInfo)
```

## Options / Props

### Typed API

| Member | Type | Description |
|--------|------|-------------|
| `alpha` | `CGImageAlphaInfo` | Alpha arrangement (iOS 7.0+) |
| `byteOrder` | `CGImageByteOrderInfo` | Byte ordering of pixel formats (iOS 7.0+) |
| `component` | `CGImageComponentInfo` | Component format, integer or float (iOS 7.0+) |
| `pixelFormat` | `CGImagePixelFormatInfo` | Pixel format (iOS 12.0+) |
| `init(alpha:component:byteOrder:)` | initializer | Builds a `CGBitmapInfo` from typed values (iOS 7.0+) |
| `init(alpha:component:byteOrder:pixelFormat:)` | initializer | Same, with a pixel format (iOS 12.0+) |

`init(alpha:component:byteOrder:pixelFormat:)` defaults are `.none` / `.integer` / `.orderDefault` / `.packed`.

The flags below are the `OptionSet` constants.

### Byte Order Flags

| Flag | Description |
|------|-------------|
| `byteOrderDefault` | Default byte order (host native) |
| `byteOrder16Little` | 16-bit pixels, little-endian |
| `byteOrder16Big` | 16-bit pixels, big-endian |
| `byteOrder32Little` | 32-bit pixels, little-endian (common on x86/ARM) |
| `byteOrder32Big` | 32-bit pixels, big-endian |

### Component Format Flag

| Flag | Description |
|------|-------------|
| `floatComponents` | Pixel components are IEEE 754 floating-point values |

### Alpha Arrangement (via `CGImageAlphaInfo`)

Combine with `CGBitmapInfo` using bitwise OR:

| Case | Description |
|------|-------------|
| `.none` | No alpha channel |
| `.premultipliedLast` | Alpha is last component; color values pre-multiplied by alpha (e.g., RGBA) |
| `.premultipliedFirst` | Alpha is first component; color values pre-multiplied (e.g., ARGB) |
| `.last` | Alpha last, not premultiplied (e.g., RGBA) |
| `.first` | Alpha first, not premultiplied (e.g., ARGB) |
| `.noneSkipLast` | No alpha; last component ignored (e.g., RGBX) |
| `.noneSkipFirst` | No alpha; first component ignored (e.g., XRGB) |
| `.only` | Image contains only the alpha channel |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `OptionSet`. Incorrect byte-order settings produce misread colors; on most Apple hardware `byteOrder32Little` with `premultipliedFirst` (BGRA layout) is the most efficient format for bitmap contexts. Check `CGImage.bitmapInfo` and `CGImage.alphaInfo` to read these values from an existing image.

In the iOS 27.2 beta SDK (beta at the time of retrieval), `byteOrderDefault` / `byteOrder16Little` / `byteOrder16Big` / `byteOrder32Little` / `byteOrder32Big` are renamed to `CGImageByteOrderInfo.order*`, and `floatComponents` is renamed to `CGImageComponentInfo.float`. `alphaInfoMask` / `byteOrderMask` / `floatInfoMask` are deprecated ("Use .alpha / .byteOrder / .component instead"), and `init(_:)` (Sequence) is deprecated ("Use init(alpha:component:byteOrder:pixelFormat:) instead").

## Related

- [CGImage](./cgimage.md)
- [CGContext](./cgcontext.md)
- [CGColorSpace](./cgcolorspace.md)
