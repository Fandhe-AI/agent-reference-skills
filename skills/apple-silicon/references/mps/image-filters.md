# image-filters

The `MetalPerformanceShaders` image-filter collection: 55 `MPSImage*` classes grouped by the official topic sections. All operate on `MTLTexture` / `MPSImage` and are encoded like any other `MPSKernel`.

## Signature / Usage

```swift
let blur = MPSImageGaussianBlur(device: device, sigma: 4.0)
blur.encode(commandBuffer: commandBuffer, sourceTexture: source, destinationTexture: destination)
```

## Options / Props

| Name | Category | Description |
| --- | --- | --- |
| `MPSImageAreaMax` | Morphological | Per-pixel max over a rectangular window |
| `MPSImageAreaMin` | Morphological | Per-pixel min over a rectangular window |
| `MPSImageDilate` | Morphological | Grayscale dilation with an arbitrary structuring element |
| `MPSImageErode` | Morphological | Grayscale erosion with an arbitrary structuring element |
| `MPSImageConvolution` | Convolution | Generic 2D convolution with a custom kernel |
| `MPSImageMedian` | Convolution | Median filter over a square window |
| `MPSImageBox` | Convolution | Separable box blur |
| `MPSImageTent` | Convolution | Separable tent (triangle) blur |
| `MPSImageGaussianBlur` | Convolution | Separable Gaussian blur by sigma |
| `MPSImageGaussianPyramid` | Convolution | Builds a Gaussian image pyramid |
| `MPSImageSobel` | Convolution | Sobel edge-gradient filter |
| `MPSImageLaplacian` | Convolution | Laplacian edge filter |
| `MPSImageLaplacianPyramid` | Convolution | Builds a Laplacian image pyramid |
| `MPSImageLaplacianPyramidAdd` | Convolution | Adds a Laplacian pyramid level back into an image |
| `MPSImageLaplacianPyramidSubtract` | Convolution | Subtracts a Laplacian pyramid level from an image |
| `MPSImagePyramid` | Convolution | Base class shared by the pyramid filters |
| `MPSImageHistogram` | Histogram | Computes a per-channel histogram |
| `MPSImageHistogramEqualization` | Histogram | Equalizes an image using a histogram |
| `MPSImageHistogramSpecification` | Histogram | Matches an image's histogram to a target |
| `MPSImageThresholdBinary` | Threshold | Binary threshold |
| `MPSImageThresholdBinaryInverse` | Threshold | Inverse binary threshold |
| `MPSImageThresholdToZero` | Threshold | Zero-clamping threshold |
| `MPSImageThresholdToZeroInverse` | Threshold | Inverse zero-clamping threshold |
| `MPSImageThresholdTruncate` | Threshold | Truncating threshold |
| `MPSImageIntegral` | Integral | Summed-area table |
| `MPSImageIntegralOfSquares` | Integral | Squared summed-area table |
| `MPSImageConversion` | Manipulation | Pixel-format / color-space conversion |
| `MPSImageScale` | Manipulation | Generic resampling filter |
| `MPSImageLanczosScale` | Manipulation | Lanczos resampling filter |
| `MPSImageBilinearScale` | Manipulation | Bilinear resampling filter |
| `MPSImageTranspose` | Manipulation | Transposes rows and columns |
| `MPSImageStatisticsMean` | Statistics | Reduces an image to a per-channel mean |
| `MPSImageStatisticsMeanAndVariance` | Statistics | Reduces an image to per-channel mean and variance |
| `MPSImageStatisticsMinAndMax` | Statistics | Reduces an image to per-channel min and max |
| `MPSImageReduceRowMax` | Reduction | Row-wise max reduction |
| `MPSImageReduceRowMin` | Reduction | Row-wise min reduction |
| `MPSImageReduceRowSum` | Reduction | Row-wise sum reduction |
| `MPSImageReduceRowMean` | Reduction | Row-wise mean reduction |
| `MPSImageReduceColumnMax` | Reduction | Column-wise max reduction |
| `MPSImageReduceColumnMin` | Reduction | Column-wise min reduction |
| `MPSImageReduceColumnSum` | Reduction | Column-wise sum reduction |
| `MPSImageReduceColumnMean` | Reduction | Column-wise mean reduction |
| `MPSImageReduceUnary` | Reduction | Base class shared by the row/column reduction filters |
| `MPSImageAdd` | Arithmetic | Per-pixel addition of two images |
| `MPSImageSubtract` | Arithmetic | Per-pixel subtraction of two images |
| `MPSImageMultiply` | Arithmetic | Per-pixel multiplication of two images |
| `MPSImageDivide` | Arithmetic | Per-pixel division of two images |
| `MPSImageArithmetic` | Arithmetic | Base class shared by the binary arithmetic filters |
| `MPSImageEuclideanDistanceTransform` | Distance | Euclidean distance transform of a binary mask |
| `MPSImageGuidedFilter` | Edge-preserving | Fast guided filter (edge-preserving smoothing) |
| `MPSImageFindKeypoints` | Keypoints | Local-maxima keypoint detection |
| `MPSImageKeypointData` | Keypoints | Keypoint result buffer layout |
| `MPSImageKeypointRangeInfo` | Keypoints | Keypoint detection range configuration |
| `MPSUnaryImageKernel` | Base classes | Shared base for one-source image filters |
| `MPSBinaryImageKernel` | Base classes | Shared base for two-source image filters |

## Notes

- This table enumerates all 55 symbols from the official "Image Filters" API Collection (per `reference-template.md`'s table requirement); consult each class's own DocC page on developer.apple.com for full initializer signatures.
- `MPSImageGaussianBlur` / `MPSImageSobel` / histogram / threshold filters overlap in purpose (not API) with Core Image's `CIFilter` (`CIGaussianBlur`, `CIEdges`, histogram/threshold filters) documented in the apple-graphics skill — MPS filters operate on raw `MTLTexture`/`MPSImage` and have no `CIContext`/color-management layer.

## Related

- [MPSImage](./mpsimage.md)
- [MPSKernel](./mpskernel.md)
- [cnn-kernels](./cnn-kernels.md)
