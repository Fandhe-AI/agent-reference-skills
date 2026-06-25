# ARSession

Manages all major AR processes for an iOS session: device motion reading, camera control, image analysis, and real-world/virtual-space correspondence.

## Signature / Usage

```swift
let session = ARSession()
session.delegate = self

let configuration = ARWorldTrackingConfiguration()
session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `configuration` | `ARConfiguration?` | Active configuration defining tracking behavior |
| `currentFrame` | `ARFrame?` | Most recent captured video frame with AR interpretation |
| `identifier` | `UUID` | Unique identifier of the running session |
| `delegate` | `(any ARSessionDelegate)?` | Receives frames, tracking info, and status changes |
| `delegateQueue` | `dispatch_queue_t?` | Queue on which delegate methods are called |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+, visionOS 1.0+
- If using `ARView`, `ARSCNView`, or `ARSKView`, the renderer owns and manages the session automatically.
- Delegate methods are called on `delegateQueue` if set; otherwise on an arbitrary background queue.
- Key methods: `run(_:options:)`, `pause()`, `add(anchor:)`, `remove(anchor:)`, `raycast(_:)`, `trackedRaycast(_:updateHandler:)`, `getCurrentWorldMap(completionHandler:)`, `setWorldOrigin(relativeTransform:)`.

## Related

- [ARConfiguration](./arconfiguration.md)
- [ARWorldTrackingConfiguration](./arworldtrackingconfiguration.md)
- [ARFrame](./arframe.md)
- [ARAnchor](./aranchor.md)
- [ARRaycastQuery](./arraycastquery.md)
