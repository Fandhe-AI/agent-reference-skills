# NSImageView

A display of image data in a frame. Can be static (display-only) or editable (allowing drag-in replacement).

## Signature / Usage

```swift
class NSImageView : NSControl
```

```swift
// Display an image
let imageView = NSImageView()
imageView.image = NSImage(named: "logo")
imageView.imageScaling = .scaleProportionallyDown
imageView.imageAlignment = .alignCenter

// SF Symbol with configuration
let symbolView = NSImageView()
symbolView.image = NSImage(systemSymbolName: "star.fill", accessibilityDescription: "Favorite")
symbolView.symbolConfiguration = NSImage.SymbolConfiguration(pointSize: 24, weight: .medium)
symbolView.contentTintColor = .systemYellow
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `image` | `NSImage?` | The image displayed by the view |
| `imageScaling` | `NSImageScaling` | How the image is scaled to fit the frame |
| `imageAlignment` | `NSImageAlignment` | Alignment of the image within the view |
| `imageFrameStyle` | `NSImageView.FrameStyle` | Visual frame style drawn around the image |
| `isEditable` | `Bool` | Allow drag-in image replacement by the user |
| `allowsCutCopyPaste` | `Bool` | Allow cut/copy/paste of image content |
| `animates` | `Bool` | Whether animated images (e.g., GIF) play automatically |
| `symbolConfiguration` | `NSImage.SymbolConfiguration?` | Point size, weight, and scale for SF Symbols |
| `contentTintColor` | `NSColor?` | Tint color applied to template and symbol images |

## Notes

- Platform: macOS (and Mac Catalyst).
- The action method is only called when a user drags an image into an editable view; to respond to clicks, use `NSButton` instead.

## Related

- [NSControl](./nscontrol.md)
- [NSButton](./nsbutton.md)
