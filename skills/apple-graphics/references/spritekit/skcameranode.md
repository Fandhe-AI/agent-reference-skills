# SKCameraNode

A node that controls which portion of the scene is visible in the view. Assign to `scene.camera` to activate.

## Signature / Usage

```swift
let camera = SKCameraNode()
camera.position = CGPoint(x: scene.frame.midX, y: scene.frame.midY)
scene.addChild(camera)
scene.camera = camera

// Zoom in 2×
camera.setScale(0.5)

// Follow the player each frame
camera.position = player.position
```

## Notes

- Available: iOS 9+, macOS 10.11+, tvOS 9+, visionOS 1+, watchOS 2+.
- The camera must be added to the scene's node tree **and** assigned to `scene.camera` to take effect.
- Without a camera, the visible region is controlled by `SKScene.anchorPoint`.
- Scaling the camera (`xScale`/`yScale` inherited from `SKNode`) zooms the viewport: scale < 1 zooms in, scale > 1 zooms out.
- Rotating the camera rotates the entire view.
- Attach constraints to the camera (e.g., `SKConstraint.distance`) to implement smooth follow or bounds-clamping camera behaviors.

### Key Methods

```swift
// Check whether a node is currently visible in the camera's viewport
func contains(_ node: SKNode) -> Bool

// Return the set of all visible nodes
func containedNodeSet() -> Set<SKNode>
```

## Related

- [SKScene](./skscene.md)
- [SKNode](./sknode.md)
- [SKConstraint](./skconstraint.md)
