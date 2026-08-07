# CAScrollLayer

A layer that displays scrollable content larger than its own bounds.

## Signature / Usage

```swift
class CAScrollLayer : CALayer

let scrollLayer = CAScrollLayer()
scrollLayer.scrollMode = .vertically
scrollLayer.bounds = CGRect(x: 0, y: 0, width: 300, height: 200)

let content = CALayer()
content.bounds = CGRect(x: 0, y: 0, width: 300, height: 1000)
scrollLayer.addSublayer(content)

scrollLayer.scroll(to: CGPoint(x: 0, y: 400))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scrollMode` | `CAScrollLayerScrollMode` | Axes in which the layer may be scrolled. |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- The extent of the scrollable area is defined by the layout of its sublayers.
- Does not provide keyboard or mouse event-handling, nor visible scrollers — application code must implement those.
- Use `scroll(to:)` with a `CGPoint` origin, or with a `CGRect` to ensure that rectangle becomes visible.

## Related

- [CALayer](./calayer.md)
- [CATiledLayer](./catiledlayer.md)
- [CATransformLayer](./catransformlayer.md)
