# CATextLayer

A layer that provides simple text layout and rendering of plain or attributed strings.

## Signature / Usage

```swift
class CATextLayer : CALayer

let textLayer = CATextLayer()
textLayer.frame = CGRect(x: 0, y: 0, width: 200, height: 44)
textLayer.string = "Hello, Core Animation"
textLayer.fontSize = 17
textLayer.foregroundColor = UIColor.white.cgColor
textLayer.contentsScale = UIScreen.main.scale
view.layer.addSublayer(textLayer)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `string` | `Any?` | Text to render. Accepts `String`, `NSString`, or `NSAttributedString`. |
| `font` | `CFTypeRef?` | Font reference — `CGFont`, `CTFont`, or `NSFont`. If `nil`, uses Helvetica. |
| `fontSize` | `CGFloat` | Font size in points. Animatable. |
| `foregroundColor` | `CGColor?` | Text color. Animatable. |
| `alignmentMode` | `CATextLayerAlignmentMode` | Horizontal alignment: `.natural`, `.left`, `.center`, `.right`, `.justified`. |
| `truncationMode` | `CATextLayerTruncationMode` | Truncation style: `.none`, `.start`, `.middle`, `.end`. |
| `isWrapped` | `Bool` | Wrap text to fit within bounds when `true`. |
| `allowsFontSubpixelQuantization` | `Bool` | Enables subpixel font quantization for the rendering context. |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- `CATextLayer` does **not** use sub-pixel antialiasing; set a non-transparent background or accept slightly softer text rendering.
- Always set `contentsScale` to `UIScreen.main.scale` (or `NSScreen.main?.backingScaleFactor`) for sharp rendering on HiDPI/Retina displays.
- On macOS, when laid out via `CAConstraintLayoutManager`, bounds are auto-resized to fit the text content.
- Pass an `NSAttributedString` to `string` for per-character font, color, or paragraph style control.

## Related

- [CALayer](./calayer.md)
