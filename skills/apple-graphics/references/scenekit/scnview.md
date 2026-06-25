# SCNView

A view for displaying 3D SceneKit content. Subclasses `UIView` (iOS/tvOS) or `NSView` (macOS).

## Signature / Usage

```swift
let sceneView = SCNView(frame: CGRect(x: 0, y: 0, width: 300, height: 300))
sceneView.scene = SCNScene(named: "art.scnassets/scene.scn")
sceneView.allowsCameraControl = true
sceneView.autoenablesDefaultLighting = true
sceneView.antialiasingMode = .multisampling4X
sceneView.preferredFramesPerSecond = 60
view.addSubview(sceneView)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scene` | `SCNScene?` | The scene to display |
| `allowsCameraControl` | `Bool` | Enables built-in gesture-based camera manipulation |
| `autoenablesDefaultLighting` | `Bool` | Adds an omnidirectional light when no other lights exist |
| `antialiasingMode` | `SCNAntialiasingMode` | Multisampling mode (`.none`, `.multisampling2X`, `.multisampling4X`) |
| `preferredFramesPerSecond` | `Int` | Target frame rate for rendering |
| `rendersContinuously` | `Bool` | Render every frame vs. only on scene changes |
| `backgroundColor` | `UIColor` / `NSColor` | Background color of the view |
| `defaultCameraController` | `SCNCameraController` | Programmatic access to the built-in camera controller |
| `cameraControlConfiguration` | `any SCNCameraControlConfiguration` | Tuning for built-in camera gesture behavior |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Conforms to `SCNSceneRenderer` and `SCNTechniqueSupport`.
- `snapshot() -> UIImage` renders the current frame to an image.
- `play(_:)` / `pause(_:)` / `stop(_:)` control scene playback.
- Initialize with `init(frame:options:)` passing `SCNView.Option` keys for Metal device selection.

## Related

- [SCNScene](./scnscene.md)
- [SCNNode](./scnnode.md)
- [SCNCamera](./scncamera.md)
