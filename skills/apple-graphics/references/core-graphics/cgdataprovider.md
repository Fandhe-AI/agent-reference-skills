# CGDataProvider

An abstraction for data-reading tasks used to supply raw pixel or font data to `CGImage` and `CGFont` without managing a memory buffer directly.

## Signature / Usage

```swift
// From a URL (e.g., a PNG file on disk)
let url = Bundle.main.url(forResource: "photo", withExtension: "png")!
let provider = CGDataProvider(url: url as CFURL)!

// Use with CGImage
let image = CGImage(pngDataProviderSource: provider,
                    decode: nil,
                    shouldInterpolate: true,
                    intent: .defaultIntent)
```

## Options / Props

### Creating a Data Provider

| Initializer | Description |
|-------------|-------------|
| `init?(url:)` | From a `CFURL` (file or network URL); direct-access |
| `init?(data:)` | From an in-memory `CFData` object |
| `init?(filename:)` | From a C string file path; direct-access |
| `init?(dataInfo:data:size:releaseData:)` | From a raw pointer with a release callback |
| `init?(directInfo:size:callbacks:)` | Direct-access provider with custom callbacks |
| `init?(sequentialInfo:callbacks:)` | Sequential-access provider with custom callbacks |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `data` | `CFData?` | Returns a copy of the provider's data (available for memory-backed providers) |
| `info` | `UnsafeMutableRawPointer?` | Custom context pointer supplied at creation |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Direct-access providers (URL, file, data) are preferred for images because Core Graphics can seek within the data. Sequential providers are appropriate for streaming or non-seekable sources.

## Related

- [CGImage](./cgimage.md)
- [CGFont](./cgfont.md)
