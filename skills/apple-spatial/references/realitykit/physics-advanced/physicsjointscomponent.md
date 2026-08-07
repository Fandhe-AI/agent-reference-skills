# PhysicsJointsComponent

A component that stores physics joints which RealityKit simulates, connecting entities under a shared physics simulation.

## Signature / Usage

```swift
struct PhysicsJointsComponent: Component, Equatable

var jointsComponent = PhysicsJointsComponent()
let joint = PhysicsRevoluteJoint(pin0: doorPin, pin1: framePin)
joint.addToSimulation()
entity.components.set(jointsComponent)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `joints` | `PhysicsJoints` | The set of joints the component stores |

## Notes

- Available: iOS 18.0+, iPadOS 18.0+, macOS 15.0+, Mac Catalyst 18.0+, tvOS 26.0+, visionOS 2.0+
- Add this component to an entity (or a child of it) that also has a `PhysicsSimulationComponent`; all joints must reference entities under the same `PhysicsSimulationComponent` tree.
- Add a joint by calling its `PhysicsJoint.addToSimulation()` method rather than mutating `joints` directly.
- Joints connect `GeometricPin` locations on entities, stored via `GeometricPinsComponent` / `EntityGeometricPins`.
- Concrete joint types include `PhysicsRevoluteJoint` (one rotational degree of freedom, like a hinge) and `PhysicsSphericalJoint` (free rotational movement between two pins), both described by the `PhysicsJoint` type.
- Related: `AttachedTransformComponent` stores an optional source pin and target pin for simpler transform attachment without full joint simulation.

## Related

- [PhysicsBodyComponent](../physicsbodycomponent.md)
- [CollisionComponent](../collisioncomponent.md)
- [ForceEffectComponent](./forceeffectcomponent.md)
