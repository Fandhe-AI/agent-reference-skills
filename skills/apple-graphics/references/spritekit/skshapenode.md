# SKShapeNode

A node that renders a mathematical shape defined by a `CGPath`, dynamically rasterized at runtime for crisp edges at any scale.

## Signature / Usage

```swift
let circle = SKShapeNode(circleOfRadius: 40)
circle.fillColor = .blue
circle.strokeColor = .white
circle.lineWidth = 2
scene.addChild(circle)
```

## Options / Props

### Geometry

| Name | Type | Description |
|------|------|-------------|
| `path` | `CGPath?` | Core Graphics path defining the shape |

### Fill

| Name | Type | Description |
|------|------|-------------|
| `fillColor` | `UIColor` | Color used to fill the interior of the shape |
| `fillTexture` | `SKTexture?` | Texture mapped to the filled area |
| `fillShader` | `SKShader?` | Custom shader for the fill |

### Stroke

| Name | Type | Description |
|------|------|-------------|
| `strokeColor` | `UIColor` | Color used to stroke the path outline |
| `lineWidth` | `CGFloat` | Width of the stroke in points |
| `glowWidth` | `CGFloat` | Extra glow extending outward from the stroke |
| `strokeTexture` | `SKTexture?` | Texture mapped along the stroke |
| `strokeShader` | `SKShader?` | Custom shader for the stroke |
| `lineCap` | `CGLineCap` | Style of stroke endpoints (`.butt`, `.round`, `.square`) |
| `lineJoin` | `CGLineJoin` | Style of stroke junctions |
| `miterLimit` | `CGFloat` | Limit for miter join style |
| `isAntialiased` | `Bool` | Smooths stroked path edges |
| `lineLength` | `CGFloat` | Total length of the path (read-only) |

### Compositing

| Name | Type | Description |
|------|------|-------------|
| `blendMode` | `SKBlendMode` | How the shape composites onto its parent |

### Convenience Initializers

```swift
// Rectangles
SKShapeNode(rect: CGRect)
SKShapeNode(rect: CGRect, cornerRadius: CGFloat)
SKShapeNode(rectOf: CGSize)
SKShapeNode(rectOf: CGSize, cornerRadius: CGFloat)

// Circles & ellipses
SKShapeNode(circleOfRadius: CGFloat)
SKShapeNode(ellipseOf: CGSize)
SKShapeNode(ellipseIn: CGRect)

// Paths
SKShapeNode(path: CGPath)
SKShapeNode(path: CGPath, centered: Bool)

// Point arrays
SKShapeNode(points: UnsafeMutablePointer<CGPoint>, count: Int)       // jagged
SKShapeNode(splinePoints: UnsafeMutablePointer<CGPoint>, count: Int) // smooth
```

## Notes

- Available: iOS 8+, macOS 10.10+, tvOS 9+, visionOS 1+, watchOS 10+.
- Shapes are rasterized dynamically; prefer `SKSpriteNode` with pre-rendered textures for performance-critical use.
- Set `strokeColor = .clear` to render a fill-only shape; set `fillColor = .clear` for stroke-only.

## Related

- [SKNode](./sknode.md)
- [SKSpriteNode](./skspritenode.md)
