# CGLayer

An offscreen rendering destination associated with an existing `CGContext`. Allows expensive drawing to be cached and replicated efficiently without recalculation.

## Signature / Usage

```swift
// Create a layer the size of the view
let layer = CGLayer(context, size: CGSize(width: 200, height: 200), auxiliaryInfo: nil)!

// Draw into the layer's own context
if let layerCtx = layer.context {
    layerCtx.setFillColor(CGColor(srgbRed: 0, green: 0.5, blue: 1, alpha: 1))
    layerCtx.fill(CGRect(x: 0, y: 0, width: 200, height: 200))
}

// Stamp the cached layer into the main context (cheap)
context.draw(layer, at: .zero)
context.draw(layer, at: CGPoint(x: 210, y: 0))
```

## Options / Props

### Creating a Layer

| Initializer | Description |
|-------------|-------------|
| `init?(_ context: CGContext, size: CGSize, auxiliaryInfo: CFDictionary?)` | Creates a layer tied to an existing context |

Pass `nil` for `auxiliaryInfo` in most cases.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `context` | `CGContext?` | The offscreen drawing context for the layer |
| `size` | `CGSize` | Width and height of the layer |

### Drawing a Layer via CGContext

| Method | Description |
|--------|-------------|
| `CGContext.draw(_:at:)` | Draws the layer with its origin at the specified point |
| `CGContext.draw(_:in:)` | Draws the layer scaled to fill a rectangle |

## Notes

Available on iOS 3.2+, macOS 10.4+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Drawing into a `CGLayer` uses the same coordinate space as the parent context. Prefer `CGLayer` over repeatedly constructing and drawing a `CGImage` when the content is static and reused many times.

## Related

- [CGContext](./cgcontext.md)
- [CGImage](./cgimage.md)
- [CGSize](./cgsize.md)
