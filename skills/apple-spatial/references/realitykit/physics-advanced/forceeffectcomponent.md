# ForceEffectComponent

A component that defines the forces that affect an entity's physics simulation, including custom forces you define.

## Signature / Usage

```swift
struct ForceEffectComponent: Component

// Single effect, plays automatically
entity.components.set(ForceEffectComponent(effect: VortexForceEffect()))

// Multiple effects with explicit simulation state
let component = ForceEffectComponent(
    effects: [ConstantForceEffect(force: [0, -9.8, 0]), DragForceEffect()],
    simulationState: nil
)
entity.components.set(component)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `effects` | `[any ForceEffectBase]` | One or more effects used to simulate forces |
| `simulationState` | `ForceEffectComponent.SimulationState?` | Desired simulation runtime state, including a `.pause` case to defer force application |

## Notes

- Available: iOS 18.0+, iPadOS 18.0+, macOS 15.0+, Mac Catalyst 18.0+, tvOS 26.0+, visionOS 2.0+
- Conforms to `Component`.
- Built-in effects: `ConstantForceEffect`, `ConstantRadialForceEffect`, `DragForceEffect`, `RadialForceEffect`, `TurbulenceForceEffect`, `VortexForceEffect`.
- `ForceEffect` defines a force effect's system and type-specific properties; custom effects conform to `ForceEffectProtocol`, which requires `parameterTypes`, `forceMode`, and an `update` function.
- The affected entity must also have a `PhysicsBodyComponent` for forces to influence its motion.

## Related

- [PhysicsJointsComponent](./physicsjointscomponent.md)
- [PhysicsBodyComponent](../physicsbodycomponent.md)
