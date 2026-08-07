# CATiledLayer

A layer that provides a way to asynchronously provide tiles of the layer's content, potentially cached at multiple levels of detail.

## Signature / Usage

```swift
class CATiledLayer : CALayer

class TiledContentLayer: CATiledLayer {
    override class func fadeDuration() -> CFTimeInterval { 0.3 }
    override func draw(_ ctx: CGContext) {
        // draw the requested tile based on ctx clip bounds / CTM
    }
}

let layer = TiledContentLayer()
layer.tileSize = CGSize(width: 256, height: 256)
layer.levelsOfDetail = 4
layer.levelsOfDetailBias = 3
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tileSize` | `CGSize` | Maximum size of each tile used to create the layer's content. |
| `levelsOfDetail` | `Int` | Number of levels of detail maintained by this layer. |
| `levelsOfDetailBias` | `Int` | Number of magnified levels of detail for this layer. |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- `draw(in:)` is called on one or more background threads to supply drawing operations for individual tiles; the clip bounds and CTM of the drawing context determine the requested tile's bounds and resolution.
- Do not directly modify the `contents` property — doing so disables asynchronous tiling and converts the layer into a regular `CALayer`.
- Regions can be invalidated with `setNeedsDisplay(_:)`, though updates happen asynchronously.
- `fadeDuration()` controls how long newly added tile images take to fade in.

## Related

- [CALayer](./calayer.md)
- [CAScrollLayer](./cascrolllayer.md)
- [CATransformLayer](./catransformlayer.md)
