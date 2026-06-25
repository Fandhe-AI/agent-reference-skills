# SKPhysicsWorld

The physics engine driver for a scene. Configures global physics parameters and provides body query methods. Automatically created as `SKScene.physicsWorld`; do not instantiate directly.

## Signature / Usage

```swift
// Configure gravity and contact delegate in didMove(to:)
override func didMove(to view: SKView) {
    physicsWorld.gravity = CGVector(dx: 0, dy: -9.8)
    physicsWorld.contactDelegate = self
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `gravity` | `CGVector` | Gravitational acceleration applied to all dynamic bodies |
| `speed` | `CGFloat` | Simulation rate multiplier (default `1.0`; `0` = paused) |
| `contactDelegate` | `SKPhysicsContactDelegate?` | Notified when bodies matching `contactTestBitMask` touch or separate |

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- Implement `SKPhysicsContactDelegate` on the scene (or another object) and assign it to `contactDelegate` to receive `didBegin(_:)` and `didEnd(_:)` callbacks.

### Joint Management

```swift
func add(_ joint: SKPhysicsJoint)
func remove(_ joint: SKPhysicsJoint)
func removeAllJoints()
```

### Body Queries

```swift
// Single-body lookups
func body(at point: CGPoint) -> SKPhysicsBody?
func body(in rect: CGRect) -> SKPhysicsBody?
func body(alongRayStart start: CGPoint, end: CGPoint) -> SKPhysicsBody?

// Multi-body enumeration
func enumerateBodies(at point: CGPoint,
    using block: (SKPhysicsBody, UnsafeMutablePointer<ObjCBool>) -> Void)
func enumerateBodies(in rect: CGRect,
    using block: (SKPhysicsBody, UnsafeMutablePointer<ObjCBool>) -> Void)
func enumerateBodies(alongRayStart start: CGPoint, end: CGPoint,
    using block: (SKPhysicsBody, CGPoint, CGVector, UnsafeMutablePointer<ObjCBool>) -> Void)

// Field sampling
func sampleFields(at position: vector_float3) -> vector_float3
```

### Contact Delegate Protocol

```swift
protocol SKPhysicsContactDelegate {
    func didBegin(_ contact: SKPhysicsContact)
    func didEnd(_ contact: SKPhysicsContact)
}
```

`SKPhysicsContact` exposes `bodyA`, `bodyB`, `contactPoint`, `contactNormal`, and `collisionImpulse`.

## Related

- [SKPhysicsBody](./skphysicsbody.md)
- [SKFieldNode](./skfieldnode.md)
- [SKScene](./skscene.md)
