# BodyTrackingComponent

A component that animates a virtual character by tracking a real person's body pose.

## Signature / Usage

```swift
struct BodyTrackingComponent: Component

// Attach to a BodyTrackedEntity backed by a rigged model
let bodyEntity = try await Entity.load(named: "character")
bodyEntity.components.set(BodyTrackingComponent())

// Or target a specific person
bodyEntity.components.set(BodyTrackingComponent(.firstPerson))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `target` | `BodyTrackingComponent.Target` | Which person to track |
| `isPaused` | `Bool` | Freeze the pose without removing the component |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, Mac Catalyst 14.0+ only (not macOS, not visionOS).
- Requires ARKit body tracking (`ARBodyTrackingConfiguration`) and a compatible rigged 3D model.
- Use alongside `BodyTrackedEntity` which wraps `Entity` with `HasBodyTracking`.
- Conforms to `Component`, `Equatable`.

## Related

- [Entity](./entity.md)
- [Component](./component.md)
