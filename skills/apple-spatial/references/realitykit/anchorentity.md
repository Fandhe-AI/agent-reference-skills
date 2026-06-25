# AnchorEntity

An anchor that tethers entities to a real-world scene location.

## Signature / Usage

```swift
@MainActor @preconcurrency class AnchorEntity: Entity

// Anchor to a horizontal surface
let anchor = AnchorEntity(.plane(.horizontal,
                                  classification: .any,
                                  minimumBounds: SIMD2<Float>(0.2, 0.2)))
// Anchor at a fixed world position
let anchor = AnchorEntity(world: SIMD3<Float>(0, 0, -1))

// Add to scene
arView.scene.addAnchor(anchor)
anchor.addChild(modelEntity)
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init()` | Empty anchor with no tracking target |
| `init(_ target: AnchoringComponent.Target)` | Anchor to a specific target type |
| `init(world: SIMD3<Float>)` | Fix at world-space position |
| `init(world: float4x4)` | Fix using a 4×4 transform matrix |
| `init(plane:classification:minimumBounds:)` | Attach to a detected plane |
| `init(anchor: ARAnchor)` | Wrap an existing ARKit anchor |
| `init(raycastResult: ARRaycastResult)` | Create from a raycast hit |

## AnchoringComponent.Target Values

| Target | Description |
|--------|-------------|
| `.world(transform:)` | Fixed world-space transform |
| `.plane(.horizontal/.vertical, classification:minimumBounds:)` | Detected surface |
| `.image(group:name:)` | Image marker tracking |
| `.face` | Front-facing face tracking |
| `.body` | Full-body skeleton tracking |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Conforms to `HasAnchoring`, `HasTransform`, `HasHierarchy`, `HasSynchronization`.
- On visionOS, world anchors are typically placed via `WorldTrackingProvider`.

## Related

- [Entity](./entity.md)
- [Scene](./scene.md)
