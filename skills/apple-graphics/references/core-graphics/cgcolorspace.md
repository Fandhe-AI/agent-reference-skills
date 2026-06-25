# CGColorSpace

A profile that specifies how to interpret color component values. Each dimension in the color space represents a color component (e.g., red, green, blue for RGB).

## Signature / Usage

```swift
// Create sRGB color space by name
let srgb = CGColorSpace(name: CGColorSpace.sRGB)!

// Create a bitmap context using that color space
let context = CGContext(data: nil,
                        width: 512, height: 512,
                        bitsPerComponent: 8, bytesPerRow: 0,
                        space: srgb,
                        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)
```

## Options / Props

### Creating Color Spaces

| Method | Description |
|--------|-------------|
| `init?(name:)` | From a predefined color space name constant |
| `CGColorSpaceCreateDeviceRGB()` | Device RGB (not calibrated) |
| `CGColorSpaceCreateDeviceCMYK()` | Device CMYK (not calibrated) |
| `CGColorSpaceCreateDeviceGray()` | Device gray (not calibrated) |
| `init(iccData:)` | From ICC profile data (`CFData`) |
| `init?(iccProfileData:)` | From ICC profile data (`Data`) |
| `init(indexedBaseSpace:last:colorTable:)` | Indexed color space with lookup table |
| `init(patternBaseSpace:)` | Pattern color space |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `CFString?` | Name used to create the space (if named) |
| `model` | `CGColorSpaceModel` | Color model: `.rgb`, `.cmyk`, `.gray`, `.lab`, `.indexed`, `.pattern`, etc. |
| `numberOfComponents` | `Int` | Number of color components (not including alpha) |
| `baseColorSpace` | `CGColorSpace?` | Base space for indexed or pattern spaces |
| `colorTable` | `[UInt8]?` | Lookup table for indexed color spaces |
| `supportsOutput` | `Bool` | Whether the space can be used as an output destination |
| `isWideGamutRGB` | `Bool` | Covers significant NTSC color gamut |

### Predefined Color Space Names

#### Standard RGB
| Constant | Description |
|----------|-------------|
| `CGColorSpace.sRGB` | Standard sRGB |
| `CGColorSpace.linearSRGB` | sRGB with linear transfer function |
| `CGColorSpace.extendedSRGB` | Extended-range sRGB |
| `CGColorSpace.displayP3` | Apple Display P3 |
| `CGColorSpace.adobeRGB1998` | Adobe RGB (1998) |

#### Gray
| Constant | Description |
|----------|-------------|
| `CGColorSpace.genericGrayGamma2_2` | Generic gray, gamma 2.2 |
| `CGColorSpace.linearGray` | Gray with linear transfer function |
| `CGColorSpace.extendedGray` | Extended-range gray |

#### HDR / Broadcast
| Constant | Description |
|----------|-------------|
| `CGColorSpace.itur_2020` | ITU-R BT.2020 |
| `CGColorSpace.itur_2100_HLG` | ITU-R BT.2100 HLG |
| `CGColorSpace.itur_2100_PQ` | ITU-R BT.2100 PQ |
| `CGColorSpace.displayP3_HLG` | Display P3 HLG |
| `CGColorSpace.displayP3_PQ` | Display P3 PQ |

#### Other
| Constant | Description |
|----------|-------------|
| `CGColorSpace.genericCMYK` | Generic CMYK |
| `CGColorSpace.genericXYZ` | CIE 1931 XYZ |
| `CGColorSpace.genericLab` | Generic LAB |
| `CGColorSpace.dcip3` | DCI P3 (digital cinema) |
| `CGColorSpace.acescgLinear` | ACEScg linear |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `copyICCData()` | `CFData?` | Returns the ICC profile data |
| `isHDR()` | `Bool` | Whether the space is HDR |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Indexed and pattern color spaces cannot be used with `CGGradient`.

## Related

- [CGColor](./cgcolor.md)
- [CGImage](./cgimage.md)
- [CGContext](./cgcontext.md)
- [CGBitmapInfo](./cgbitmapinfo.md)
