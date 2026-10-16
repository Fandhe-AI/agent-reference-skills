# GaussianSplatEvents

A namespace for events about Gaussian splat rendering.

## Signature / Usage

```swift
enum GaussianSplatEvents {
    struct RenderingChanged
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RenderingChanged` | `struct` | An event that signals the framework changed how it renders an entity's splats to manage performance |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+
- `RenderingChanged` is published on the entity that owns the affected `GaussianSplatComponent`. Subscribers receive the entity and the state change; the event does not describe which mitigation the renderer applied.
- Throttling: Gaussian splat assets vary in rendering cost by orders of magnitude, so the renderer applies internal mitigations and emits this event. Apps should listen and reduce asset complexity as needed.
- Thermal state: the system does not automatically limit splat rendering in response to thermal state. Observe `thermalStateDidChangeNotification` and, when `ProcessInfo.thermalState` reaches serious or critical, reduce entity complexity until it returns to fair or better.
- Complexity reduction approaches named in the guidelines: truncating, decimating, downsampling (one splat per voxel), and culling low-opacity or very small splats; lower level-of-detail assets can be swapped in.
- Source: https://developer.apple.com/documentation/realitykit/gaussiansplatevents (fetched 2026-10 from the DocC JSON).

## Related

- [GaussianSplatComponent](./gaussiansplatcomponent.md)
- [GaussianSplatResource](./gaussiansplatresource.md)
