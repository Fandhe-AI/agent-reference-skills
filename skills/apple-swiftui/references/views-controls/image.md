# Image

A view that displays an image.

## Signature / Usage

```swift
@frozen struct Image
```

```swift
// Asset catalog
Image("logo")

// SF Symbol
Image(systemName: "star.fill")

// Resizable asset
Image("hero")
    .resizable()
    .scaledToFit()
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:bundle:)` | Named image from an asset catalog |
| `init(_:variableValue:bundle:)` | Variable-value SF Symbol or asset |
| `init(systemName:)` | SF Symbol by name |
| `init(systemName:variableValue:)` | Variable-value SF Symbol |
| `init(decorative:bundle:)` | Image hidden from accessibility |
| `init(_:bundle:label:)` | Named image with explicit accessibility label |
| `init(uiImage:)` | Create from a `UIImage` (iOS/tvOS) |
| `init(nsImage:)` | Create from an `NSImage` (macOS) |
| `init(size:label:opaque:colorMode:renderer:)` | Draw image programmatically |

### Key modifiers

| Modifier | Description |
|---|---|
| `resizable(capInsets:resizingMode:)` | Make image resizable; required before size modifiers |
| `scaledToFit()` / `scaledToFill()` | Aspect-ratio scaling |
| `renderingMode(_:)` | `.original` or `.template` |
| `symbolRenderingMode(_:)` | SF Symbol rendering: `.monochrome`, `.hierarchical`, `.palette`, `.multicolor` |
| `interpolation(_:)` | Pixel interpolation quality |
| `antialiased(_:)` | Enable/disable antialiasing |
| `allowedDynamicRange(_:)` | HDR/EDR handling |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- Images used for pure decoration should use `init(decorative:)` to be hidden from VoiceOver.
- `resizable()` must be called before frame-based layout modifiers for proper sizing.
- Variable-value SF Symbols accept a `Double` in `0.0...1.0` to control fill level.

## Related

- [Label](./label.md)
