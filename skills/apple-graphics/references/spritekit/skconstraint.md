# SKConstraint

A specification that constrains a node's position or rotation. The scene applies all constraints in order after actions and physics are evaluated each frame.

## Signature / Usage

```swift
// Keep a turret always pointing at a target node
let orient = SKConstraint.orient(to: targetNode, offset: SKRange(constantValue: 0))

// Keep a node within a horizontal band
let clampY = SKConstraint.positionY(SKRange(lowerLimit: 100, upperLimit: 500))

turret.constraints = [orient, clampY]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `Bool` | Activate or deactivate without removing from the array |
| `referenceNode` | `SKNode?` | Coordinate space used to evaluate position/orientation targets |

### Factory Methods

#### Orientation (Rotation)

```swift
// Face a node
SKConstraint.orient(to node: SKNode, offset: SKRange) -> SKConstraint

// Face a fixed point
SKConstraint.orient(to point: CGPoint, offset: SKRange) -> SKConstraint

// Face a point in another node's coordinate space
SKConstraint.orient(to point: CGPoint, in node: SKNode, offset: SKRange) -> SKConstraint

// Restrict rotation to a range
SKConstraint.zRotation(_ range: SKRange) -> SKConstraint
```

#### Position

```swift
SKConstraint.positionX(_ range: SKRange) -> SKConstraint
SKConstraint.positionY(_ range: SKRange) -> SKConstraint
SKConstraint.positionX(_ xRange: SKRange, y yRange: SKRange) -> SKConstraint
```

#### Distance

```swift
SKConstraint.distance(_ range: SKRange, to node: SKNode) -> SKConstraint
SKConstraint.distance(_ range: SKRange, to point: CGPoint) -> SKConstraint
SKConstraint.distance(_ range: SKRange, to point: CGPoint, in node: SKNode) -> SKConstraint
```

### SKRange Helper

```swift
SKRange(constantValue: CGFloat)                   // exact value
SKRange(lowerLimit: CGFloat)                      // minimum, no maximum
SKRange(upperLimit: CGFloat)                      // maximum, no minimum
SKRange(lowerLimit: CGFloat, upperLimit: CGFloat) // clamped range
```

## Notes

- Available: iOS 8+, macOS 10.10+, tvOS 9+, visionOS 1+, watchOS 2+.
- Constraints are immutable after creation; toggle `enabled` to temporarily suspend one.
- Constraints execute in array order; order matters when multiple constraints interact.
- Inverse kinematics chains use `SKReachConstraints` alongside `SKAction.reach` actions.

## Related

- [SKNode](./sknode.md)
- [SKScene](./skscene.md)
