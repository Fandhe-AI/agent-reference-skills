# EntityAction

A protocol that defines an action for an entity. Types conforming to `EntityAction` hold the data an `ActionAnimation` plays back through RealityKit's action/ECS animation system.

## Signature / Usage

```swift
protocol EntityAction

// Register a built-in action's event handling once at startup
FromToByAction<Transform>.registerAction()

// Play an action on an entity
let action = FromToByAction<Transform>(to: .init(scale: .one * 2))
entity.playAction(action)

// Subscribe to an action's lifecycle events
FromToByAction<Transform>.subscribe(to: .completed) { event in
    print("action finished on \(event.entity)")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `EventParameterType` | associated type | The event parameter type carried by the action's events. Default: `Never` |
| `animatedValueType` | `(any AnimatableData.Type)?` | The type this action animates, if it animates a target value |
| `isAdditive` | `Bool` | Whether this action additively blends with the prior stage (default implementation provided) |
| `isReversible` | `Bool` | Whether the action reverses prior operations when playback is reversed (default implementation provided) |

## Notes

- Available: iOS 18.0+, iPadOS 18.0+, macOS 15.0+, Mac Catalyst 18.0+, tvOS 26.0+, visionOS 2.0+
- Built-in conforming types: `BillboardAction`, `EmphasizeAction`, `FromToByAction`, `ImpulseAction`, `OrbitEntityAction`, `PlayAnimationAction`, `PlayAudioAction`, `SetEntityEnabledAction`; `BehaviorTreeAction` inherits from it.
- If an app needs to serialize the action's animation resource to a file, the conforming structure must also adopt `Codable`.
- Custom actions don't support animating `BlendShapeWeights`.
- Use the type methods `registerAction()`, `subscribe(to:_:)`, `unsubscribe(from:)`, and `unsubscribeAll()` to manage the action-types registry and its events.

## Related

- [Entity](./entity.md)
- [Component](./component.md)
- [Transform](./transform.md)
