# CISampler

Retrieves pixel samples from a `CIImage` for processing inside a `CIKernel`. Encapsulates coordinate transforms, interpolation mode, and edge-wrap mode. Passed as an argument to `CIKernel.apply`.

## Signature / Usage

```swift
// Basic sampler
let sampler = CISampler(image: inputImage)

// Sampler with options
let sampler = CISampler(image: inputImage, options: [
    kCISamplerFilterMode: kCISamplerFilterNearest,
    kCISamplerWrapMode: kCISamplerWrapBlack
])

// Pass to kernel
let output = kernel.apply(
    extent: inputImage.extent,
    roiCallback: { _, rect in rect },
    arguments: [sampler]
)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `convenience init(image: CIImage)` | Default sampler for the image |
| `init(image: CIImage, options: [AnyHashable: Any]?)` | Sampler with custom options |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `extent` | `CGRect` | Sampling extent of the sampler |
| `definition` | `CIFilterShape` | Domain of definition (DOD) |

### Sampler Options

| Key | Values | Description |
|-----|--------|-------------|
| `kCISamplerFilterMode` | `kCISamplerFilterNearest`, `kCISamplerFilterLinear` | Interpolation mode |
| `kCISamplerWrapMode` | `kCISamplerWrapBlack`, `kCISamplerWrapClamp` | Edge-wrap behavior |
| `kCISamplerColorSpace` | `CGColorSpace` | Color space for sampling |
| `kCISamplerAffineMatrix` | `CIVector` (6 values) | Coordinate transform matrix |

## Notes

- iOS 9.0+, iPadOS 9.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+
- In Metal kernel language, use the `sampler` type directly rather than `CISampler`; `CISampler` is primarily for the legacy Core Image Kernel Language.
- Conforms to `NSCopying`.

## Related

- [CIKernel](./cikernel.md)
- [CIColorKernel](./cicolorkernel.md)
- [CIImage](./ciimage.md)
