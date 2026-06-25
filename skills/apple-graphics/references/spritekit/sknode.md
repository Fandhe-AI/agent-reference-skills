# SKNode

Base class for all SpriteKit nodes. Provides positioning, transforms, hierarchy management, actions, and hit-testing. Does not draw content itself.

## Signature / Usage

```swift
let container = SKNode()
container.position = CGPoint(x: 200, y: 300)
container.name = "hud"
scene.addChild(container)
```

## Options / Props

### Transform

| Name | Type | Description |
|------|------|-------------|
| `position` | `CGPoint` | Position in parent's coordinate system |
| `zPosition` | `CGFloat` | Draw order depth (higher = drawn on top) |
| `xScale` | `CGFloat` | Horizontal scale factor |
| `yScale` | `CGFloat` | Vertical scale factor |
| `zRotation` | `CGFloat` | Rotation around z-axis in radians |

### Appearance

| Name | Type | Description |
|------|------|-------------|
| `alpha` | `CGFloat` | Opacity (0.0–1.0); propagates to children |
| `isHidden` | `Bool` | Hides the node and all descendants |

### Hierarchy

| Name | Type | Description |
|------|------|-------------|
| `parent` | `SKNode?` | Parent node (read-only) |
| `children` | `[SKNode]` | Ordered array of child nodes |
| `scene` | `SKScene?` | Containing scene (read-only) |
| `name` | `String?` | Identifier used with `childNode(withName:)` |

### Simulation

| Name | Type | Description |
|------|------|-------------|
| `physicsBody` | `SKPhysicsBody?` | Attached physics simulation body |
| `constraints` | `[SKConstraint]?` | Position/rotation constraints applied each frame |
| `speed` | `CGFloat` | Action speed multiplier (propagates to children) |
| `isPaused` | `Bool` | Suspends action processing for node and descendants |
| `userData` | `NSMutableDictionary?` | Custom key-value storage without subclassing |

## Notes

- Property changes on a parent (alpha, scale, position) propagate to all children.
- Draw order is determined by `zPosition`; use `SKView.ignoresSiblingOrder` to improve performance when siblings don't overlap.
- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.

### Hierarchy Methods

```swift
addChild(_ node: SKNode)
insertChild(_ node: SKNode, at index: Int)
removeFromParent()
removeAllChildren()
move(toParent parent: SKNode)
```

### Action Methods

```swift
run(_ action: SKAction)
run(_ action: SKAction, withKey key: String)
run(_ action: SKAction, completion: @escaping () -> Void)
action(forKey key: String) -> SKAction?
hasActions() -> Bool
removeAction(forKey key: String)
removeAllActions()
```

### Search Methods

```swift
childNode(withName name: String) -> SKNode?
enumerateChildNodes(withName name: String,
    using block: (SKNode, UnsafeMutablePointer<ObjCBool>) -> Void)
subscript(_ name: String) -> [SKNode]   // returns all nodes matching name
```

### Geometry & Hit-Testing

```swift
var frame: CGRect                          // Node bounds (excludes children)
func calculateAccumulatedFrame() -> CGRect // Bounds including all children
func setScale(_ scale: CGFloat)            // Sets xScale and yScale together
func contains(_ point: CGPoint) -> Bool
func atPoint(_ point: CGPoint) -> SKNode
func nodes(at point: CGPoint) -> [SKNode]
func intersects(_ node: SKNode) -> Bool
func convert(_ point: CGPoint, from node: SKNode) -> CGPoint
func convert(_ point: CGPoint, to node: SKNode) -> CGPoint
```

## Related

- [SKScene](./skscene.md)
- [SKAction](./skaction.md)
- [SKPhysicsBody](./skphysicsbody.md)
- [SKConstraint](./skconstraint.md)
