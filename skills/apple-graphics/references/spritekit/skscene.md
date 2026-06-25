# SKScene

The root node of a SpriteKit scene; organizes all active content displayed in an `SKView`, `SKRenderer`, or `WKInterfaceSKScene`.

## Signature / Usage

```swift
let scene = SKScene(size: CGSize(width: 1024, height: 768))
scene.scaleMode = .aspectFill
scene.backgroundColor = .black
skView.presentScene(scene)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `CGSize` | Dimensions of the scene in points |
| `backgroundColor` | `UIColor` | Background color rendered behind all nodes |
| `scaleMode` | `SKSceneScaleMode` | How the scene maps to its view (`.aspectFill`, `.aspectFit`, `.fill`, `.resizeFill`) |
| `camera` | `SKCameraNode?` | Camera node determining the visible portion of the scene |
| `anchorPoint` | `CGPoint` | Point in the view corresponding to the scene's origin (default `(0, 0)`) |
| `physicsWorld` | `SKPhysicsWorld` | Physics simulation instance (auto-created) |
| `view` | `SKView?` | The view currently presenting the scene (read-only) |
| `delegate` | `SKSceneDelegate?` | Delegate for frame-cycle callbacks |
| `listener` | `SKNode?` | Node for positional audio |
| `audioEngine` | `AVAudioEngine` | Audio engine used by audio nodes in the scene |

## Notes

- Subclass of `SKEffectNode`; applying an effect to the whole scene has a performance cost.
- Frame-cycle order: `update(_:)` → actions → `didEvaluateActions()` → physics → `didSimulatePhysics()` → constraints → `didApplyConstraints()` → `didFinishUpdate()`.
- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.

### Lifecycle Methods

```swift
func sceneDidLoad()                    // Called once after the scene is loaded
func didMove(to view: SKView)          // Called when the scene is presented by a view
func willMove(from view: SKView)       // Called before the scene is removed from a view
func update(_ currentTime: TimeInterval) // Per-frame game logic
func didEvaluateActions()             // After actions are evaluated
func didSimulatePhysics()             // After physics simulation
func didApplyConstraints()            // After constraints are applied
func didFinishUpdate()                // Final callback before rendering
```

### Coordinate Conversion

```swift
func convertPoint(fromView point: CGPoint) -> CGPoint
func convertPoint(toView point: CGPoint) -> CGPoint
```

## Related

- [SKView](./skview.md)
- [SKNode](./sknode.md)
- [SKCameraNode](./skcameranode.md)
- [SKPhysicsWorld](./skphysicsworld.md)
