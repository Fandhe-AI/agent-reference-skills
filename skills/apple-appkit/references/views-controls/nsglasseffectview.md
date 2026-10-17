# NSGlassEffectView

A view that embeds its content view in a dynamic glass effect.

## Signature / Usage

```swift
class NSGlassEffectView : NSView
```

```swift
var contentView: NSView? { get set }
var cornerRadius: CGFloat { get set }
var effectIsInteractive: Bool { get set }
var style: NSGlassEffectView.Style { get set }
var tintColor: NSColor? { get set }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `contentView` | `NSView?` | The view to embed in glass. |
| `cornerRadius` | `CGFloat` | The amount of curvature for all corners of the glass. |
| `effectIsInteractive` | `Bool` | Enables interactive glass behavior, which adds a visual response to user interactions. |
| `style` | `NSGlassEffectView.Style` | The style of glass this view uses. |
| `tintColor` | `NSColor?` | The color the glass effect view uses to tint the background and glass effect toward. |

## Notes

- Platform: macOS 26.0+.
- Inherits from `NSView`. Listed under "Liquid Glass effects" together with `NSGlassEffectContainerView` and `NSGlassEffectView.Style`.
- The property declarations above are taken from the symbol's property fragments; the cases of `NSGlassEffectView.Style` are not listed on the source page and are not recorded here.
- Distinct from SwiftUI's glass effect APIs (see apple-swiftui); this is the AppKit view class.
- Objective-C name: `NSGlassEffectView`; the style enum is `NSGlassEffectViewStyle`.
- Source: https://developer.apple.com/documentation/appkit/nsglasseffectview

## Related

- [NSGlassEffectContainerView](./nsglasseffectcontainerview.md)
- [NSView](./nsview.md)
