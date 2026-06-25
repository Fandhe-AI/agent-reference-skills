# CGBitmapInfo

An option set specifying the memory layout of pixel components in a bitmap, including byte ordering and floating-point component flags. Used when creating `CGContext` (bitmap) and `CGImage` objects.

## Signature / Usage

```swift
// Common setup: 8-bit RGBA, premultiplied alpha, native byte order
let bitmapInfo = CGBitmapInfo(rawValue:
    CGImageAlphaInfo.premultipliedLast.rawValue |
    CGBitmapInfo.byteOrder32Big.rawValue)

let context = CGContext(data: nil,
                        width: 512, height: 512,
                        bitsPerComponent: 8, bytesPerRow: 0,
                        space: CGColorSpaceCreateDeviceRGB(),
                        bitmapInfo: bitmapInfo.rawValue)
```

## Options / Props

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

## Related

- [CGImage](./cgimage.md)
- [CGContext](./cgcontext.md)
- [CGColorSpace](./cgcolorspace.md)
