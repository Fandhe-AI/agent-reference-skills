# Core Image

| Name | Description | Path |
|------|-------------|------|
| CIImage | Immutable image recipe; lazy-evaluated representation of image data and filter graph | [ciimage.md](./ciimage.md) |
| CIFilter | Image processor producing a CIImage via KVC parameters or type-safe CIFilterBuiltins API | [cifilter.md](./cifilter.md) |
| CIContext | Rendering evaluation context backed by Metal or CPU; executes the CIImage filter graph | [cicontext.md](./cicontext.md) |
| CIColor | Unpremultiplied color with associated CGColorSpace; supports SDR and HDR component values | [cicolor.md](./cicolor.md) |
| CIVector | Container for one or more CGFloat values used as filter parameters (points, rects, matrices) | [civector.md](./civector.md) |
| CIKernel | GPU kernel (Metal or CIKL) for custom filters that process color and geometry | [cikernel.md](./cikernel.md) |
| CIColorKernel | CIKernel subclass restricted to per-pixel color transformations; no geometry access | [cicolorkernel.md](./cicolorkernel.md) |
| CIFilterBuiltins | Type-safe factory methods and protocols for all built-in Core Image filters (iOS 13+) | [cifilterbuiltins.md](./cifilterbuiltins.md) |
| CIDetector | Feature detector for faces, rectangles, text, and QR codes in still images or video | [cidetector.md](./cidetector.md) |
| CISampler | Pixel sampler passed to CIKernel; configures interpolation and edge-wrap modes | [cisampler.md](./cisampler.md) |
| CIImageProcessorKernel | Abstract base for integrating Metal, MPS, Accelerate, or CPU code into a CI filter chain | [ciimageprocessorkernel.md](./ciimageprocessorkernel.md) |
