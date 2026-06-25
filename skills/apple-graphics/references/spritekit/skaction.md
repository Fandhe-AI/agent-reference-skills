# SKAction

An animation executed by an `SKNode` to change its properties, structure, or content over time. Actions are composable, reversible, and reusable.

## Signature / Usage

```swift
// Move a node, fade it out, then remove it
let move = SKAction.move(to: CGPoint(x: 400, y: 300), duration: 1.0)
let fade = SKAction.fadeOut(withDuration: 0.5)
let remove = SKAction.removeFromParent()
node.run(SKAction.sequence([move, fade, remove]))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `duration` | `TimeInterval` | Total time the action takes to complete |
| `timingMode` | `SKActionTimingMode` | Speed curve: `.linear`, `.easeIn`, `.easeOut`, `.easeInEaseOut` |
| `speed` | `CGFloat` | Multiplier applied to the action's rate (default `1.0`) |
| `timingFunction` | `SKActionTimingFunction` | Custom timing closure `(Float) -> Float` |

## Action Factory Methods

### Movement
```swift
SKAction.move(to: CGPoint, duration: TimeInterval)
SKAction.move(by: CGVector, duration: TimeInterval)
SKAction.moveBy(x: CGFloat, y: CGFloat, duration: TimeInterval)
SKAction.follow(_ path: CGPath, duration: TimeInterval)
SKAction.follow(_ path: CGPath, speed: CGFloat)
```

### Rotation
```swift
SKAction.rotate(byAngle: CGFloat, duration: TimeInterval)
SKAction.rotate(toAngle: CGFloat, duration: TimeInterval)
SKAction.rotate(toAngle: CGFloat, duration: TimeInterval, shortestUnitArc: Bool)
```

### Scaling
```swift
SKAction.scale(by: CGFloat, duration: TimeInterval)
SKAction.scale(to: CGFloat, duration: TimeInterval)
SKAction.scaleX(to: CGFloat, duration: TimeInterval)
SKAction.scaleY(to: CGFloat, duration: TimeInterval)
SKAction.resize(toWidth: CGFloat, height: CGFloat, duration: TimeInterval)
```

### Fading
```swift
SKAction.fadeIn(withDuration: TimeInterval)
SKAction.fadeOut(withDuration: TimeInterval)
SKAction.fadeAlpha(to: CGFloat, duration: TimeInterval)
SKAction.fadeAlpha(by: CGFloat, duration: TimeInterval)
```

### Color
```swift
SKAction.colorize(with: UIColor, colorBlendFactor: CGFloat, duration: TimeInterval)
SKAction.colorize(withColorBlendFactor: CGFloat, duration: TimeInterval)
```

### Timing / Waiting
```swift
SKAction.wait(forDuration: TimeInterval)
SKAction.wait(forDuration: TimeInterval, withRange: TimeInterval) // randomized wait
```

### Composition
```swift
SKAction.sequence(_ actions: [SKAction])          // run in order
SKAction.group(_ actions: [SKAction])             // run simultaneously
SKAction.repeat(_ action: SKAction, count: Int)
SKAction.repeatForever(_ action: SKAction)
SKAction.reversed() -> SKAction                   // instance method
SKAction.speed(_ speed: CGFloat, duration: TimeInterval)
```

### Node Management
```swift
SKAction.removeFromParent()
SKAction.hide()
SKAction.unhide()
```

### Code Execution
```swift
SKAction.run(_ block: @escaping () -> Void)
SKAction.run(_ action: SKAction, onChildWithName: String)
SKAction.customAction(withDuration: TimeInterval,
    actionBlock: @escaping (SKNode, CGFloat) -> Void)
```

### Texture Animation
```swift
SKAction.animate(with textures: [SKTexture], timePerFrame: TimeInterval)
SKAction.animate(with textures: [SKTexture], timePerFrame: TimeInterval,
    resize: Bool, restore: Bool)
SKAction.setTexture(_ texture: SKTexture)
```

### Sound
```swift
SKAction.playSoundFileNamed(_ soundFile: String, waitForCompletion: Bool)
```

### Physics
```swift
SKAction.applyForce(_ force: CGVector, duration: TimeInterval)
SKAction.applyTorque(_ torque: CGFloat, duration: TimeInterval)
SKAction.applyImpulse(_ impulse: CGVector, duration: TimeInterval)
SKAction.changeCharge(to: CGFloat, duration: TimeInterval)
SKAction.changeMass(to: CGFloat, duration: TimeInterval)
SKAction.changeRestitution(to: CGFloat, duration: TimeInterval)
SKAction.changeFriction(to: CGFloat, duration: TimeInterval)
SKAction.changeLinearDamping(to: CGFloat, duration: TimeInterval)
SKAction.changeAngularDamping(to: CGFloat, duration: TimeInterval)
```

### Loading from File
```swift
SKAction(named: String)
SKAction(named: String, from: URL)
SKAction(named: String, duration: TimeInterval)
```

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- Actions run by `node.run(_:withKey:)` can be paused/removed by key; useful for cancellable animations.
- `SKAction.speed` on a node (not the action) scales all actions on that node and its descendants.
- `reversed()` is supported by most but not all actions (e.g., `removeFromParent` has no reverse).

## Related

- [SKNode](./sknode.md)
- [SKScene](./skscene.md)
