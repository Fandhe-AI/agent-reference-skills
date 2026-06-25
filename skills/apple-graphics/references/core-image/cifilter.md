# CIFilter

An image processor that produces a `CIImage` by manipulating one or more input images or generating new image data. Parameters are set via key-value coding or, for built-in filters, through type-safe protocols (see `CIFilterBuiltins`).

## Signature / Usage

```swift
// String-based (dynamic)
let filter = CIFilter(name: "CISepiaTone")!
filter.setValue(inputImage, forKey: kCIInputImageKey)
filter.setValue(0.9, forKey: kCIInputIntensityKey)
let output = filter.outputImage

// Type-safe (recommended, iOS 13+)
import CoreImage.CIFilterBuiltins
let sepia = CIFilter.sepiaTone()
sepia.inputImage = inputImage
sepia.intensity = 0.9
let output = sepia.outputImage
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init?(name: String)` | Create filter by registered name |
| `init?(name: String, parameters: [String: Any]?)` | Create with initial input parameters |

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `String` | Filter's registered name |
| `inputKeys` | `[String]` | Names of all input parameters |
| `outputKeys` | `[String]` | Names of all output parameters |
| `outputImage` | `CIImage?` | The filter's output image |
| `attributes` | `[String: Any]` | Dictionary describing the filter and its parameters |
| `isEnabled` | `Bool` | Whether the filter is applied |

### Key Methods

| Method | Description |
|--------|-------------|
| `setDefaults()` | Reset all inputs to their default values |
| `apply(_:arguments:options:)` | Apply a CIKernel to produce a CIImage |
| `class filterNames(inCategory:)` | List filter names by category |
| `class filterNames(inCategories:)` | List filter names by multiple categories |
| `class localizedName(forFilterName:)` | Human-readable filter name |

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- **Mutable and NOT thread-safe.** Each thread must create its own CIFilter instances.
- `CIImage` and `CIContext` are immutable and can be shared across threads.
- Conforms to `NSCoding`, `NSSecureCoding`, `NSCopying`.

## Related

- [CIImage](./ciimage.md)
- [CIContext](./cicontext.md)
- [CIFilterBuiltins](./cifilterbuiltins.md)
- [CIKernel](./cikernel.md)
