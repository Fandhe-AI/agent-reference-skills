# ARSCNView

A UIView subclass that blends SceneKit 3D content into an ARKit camera feed, automatically synchronizing SceneKit's coordinate system with AR world tracking.

> **Deprecated** in iOS/iPadOS/Mac Catalyst 26.0. Migrate to `RealityKit` and `RealityView`.

## Signature / Usage

```swift
let arView = ARSCNView(frame: view.bounds)
arView.delegate = self
arView.automaticallyUpdatesLighting = true

let configuration = ARWorldTrackingConfiguration()
arView.session.run(configuration)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `session` | `ARSession` | The AR session managing tracking and camera |
| `scene` | `SCNScene` | SceneKit scene rendered in the view |
| `delegate` | `ARSCNViewDelegate?` | Synchronizes AR anchor updates with SceneKit nodes |
| `automaticallyUpdatesLighting` | `Bool` | Auto-creates SceneKit lights from real-world lighting estimates |
| `rendersCameraGrain` | `Bool` | Applies camera grain texture to virtual content |
| `rendersMotionBlur` | `Bool` | Enables motion blur on virtual content |

## Notes

- iOS 11.0–26.0, iPadOS 11.0–26.0, Mac Catalyst 13.1–26.0
- Requires Metal; does not support OpenGL ES rendering.
- Key methods: `anchor(for:)`, `node(for:)`, `raycastQuery(from:allowing:alignment:)`, `unprojectPoint(_:ontoPlane:)`.
- `hitTest(_:types:)` is deprecated; use `raycastQuery` + `session.raycast(_:)` instead.

## Related

- [ARSession](./arsession.md)
- [ARRaycastQuery](./arraycastquery.md)
- [ARWorldTrackingConfiguration](./arworldtrackingconfiguration.md)
