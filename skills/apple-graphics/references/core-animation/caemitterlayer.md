# CAEmitterLayer

A layer that emits, animates, and renders a particle system. Particles are drawn above the layer's background color and border.

## Signature / Usage

```swift
class CAEmitterLayer : CALayer

let emitter = CAEmitterLayer()
emitter.emitterPosition = CGPoint(x: view.bounds.midX, y: view.bounds.midY)
emitter.emitterShape = .circle
emitter.emitterSize = CGSize(width: 10, height: 10)

let cell = CAEmitterCell()
cell.birthRate = 50
cell.lifetime = 3
cell.velocity = 80
cell.scale = 0.1
cell.emissionRange = .pi * 2
cell.contents = UIImage(named: "particle")?.cgImage

emitter.emitterCells = [cell]
view.layer.addSublayer(emitter)
```

## Options / Props

### Emitter Layer

| Name | Type | Description |
|------|------|-------------|
| `emitterCells` | `[CAEmitterCell]?` | Array of `CAEmitterCell` objects defining particle appearance and behavior. |
| `emitterPosition` | `CGPoint` | Center of the emitter in layer coordinate space. Animatable. |
| `emitterShape` | `CAEmitterLayerEmitterShape` | Emitter geometry: `.point`, `.line`, `.rectangle`, `.circle`, `.cuboid`, `.sphere`. |
| `emitterMode` | `CAEmitterLayerEmitterMode` | Where particles originate: `.points`, `.outline`, `.surface`, `.volume`. |
| `emitterSize` | `CGSize` | Size of the emitter shape. Animatable. |
| `emitterZPosition` | `CGFloat` | Emitter center along the z-axis. Animatable. |
| `emitterDepth` | `CGFloat` | Depth of the emitter shape. |
| `birthRate` | `Float` | Multiplier applied to each cell's `birthRate`. Animatable. |
| `velocity` | `Float` | Multiplier applied to each cell's `velocity`. Animatable. |
| `scale` | `Float` | Multiplier applied to each cell's `scale`. |
| `spin` | `Float` | Multiplier applied to each cell's `spin`. Animatable. |
| `lifetime` | `Float` | Multiplier applied to each cell's `lifetime`. Animatable. |
| `renderMode` | `CAEmitterLayerRenderMode` | Compositing mode: `.unordered`, `.oldestFirst`, `.oldestLast`, `.backToFront`, `.additive`. |
| `preservesDepth` | `Bool` | When `true`, particles are not flattened into the layer plane. |
| `seed` | `UInt32` | Seed for the random number generator. |

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.6+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Layer-level properties (`birthRate`, `velocity`, `scale`, `spin`, `lifetime`) act as multipliers on top of the per-cell values.
- Setting `birthRate` to `0` stops emission while existing particles continue their lifecycle.
- For best performance, use small pre-rendered images for `cell.contents` and minimize the number of cells.

## Related

- [CALayer](./calayer.md)
