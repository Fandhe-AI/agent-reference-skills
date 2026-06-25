# SKView

A `UIView`/`NSView` subclass that renders a SpriteKit scene; the primary display surface for SpriteKit content.

## Signature / Usage

```swift
let skView = SKView(frame: view.bounds)
view.addSubview(skView)

let scene = SKScene(size: skView.bounds.size)
skView.presentScene(scene)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scene` | `SKScene?` | The scene currently presented (read-only) |
| `isPaused` | `Bool` | Pauses scene animations when `true` |
| `preferredFramesPerSecond` | `Int` | Target frame rate (default 60) |
| `delegate` | `SKViewDelegate?` | Dynamic control over the render rate |
| `allowsTransparency` | `Bool` | Enables transparent rendering to show content beneath |
| `ignoresSiblingOrder` | `Bool` | Allows renderer to reorder siblings for performance |
| `shouldCullNonVisibleNodes` | `Bool` | Automatically skips off-screen nodes |
| `isAsynchronous` | `Bool` | Renders content asynchronously |
| `showsFPS` | `Bool` | Overlay showing current frame rate |
| `showsNodeCount` | `Bool` | Overlay showing active node count |
| `showsDrawCount` | `Bool` | Overlay showing draw pass count |
| `showsPhysics` | `Bool` | Overlay showing physics body outlines |
| `showsFields` | `Bool` | Overlay showing physics field regions |
| `showsQuadCount` | `Bool` | Overlay showing rectangle count |

## Notes

- Presenting a new scene replaces the previous one; use `presentScene(_:transition:)` for animated transitions.
- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+.

### Key Methods

```swift
// Present scenes
func presentScene(_ scene: SKScene?)
func presentScene(_ scene: SKScene, transition: SKTransition)

// Render to texture
func texture(from node: SKNode) -> SKTexture?
func texture(from node: SKNode, crop: CGRect) -> SKTexture?

// Coordinate conversion
func convert(_ point: CGPoint, from scene: SKScene) -> CGPoint
func convert(_ point: CGPoint, to scene: SKScene) -> CGPoint
```

## Related

- [SKScene](./skscene.md)
- [SKTransition](https://developer.apple.com/documentation/spritekit/sktransition)
