# SCNCamera

Defines a set of camera attributes attached to an `SCNNode` to provide a point of view for displaying a 3D scene.

## Signature / Usage

```swift
let camera = SCNCamera()
camera.fieldOfView = 60
camera.zNear = 0.1
camera.zFar = 1000
camera.wantsHDR = true
camera.wantsDepthOfField = true
camera.focusDistance = 10

let cameraNode = SCNNode()
cameraNode.camera = camera
cameraNode.position = SCNVector3(0, 5, 15)
scene.rootNode.addChildNode(cameraNode)
sceneView.pointOfView = cameraNode
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fieldOfView` | `CGFloat` | Vertical (or horizontal) FOV in degrees |
| `projectionDirection` | `SCNCameraProjectionDirection` | Axis for FOV measurement |
| `usesOrthographicProjection` | `Bool` | Orthographic vs. perspective projection |
| `orthographicScale` | `Double` | Magnification factor for orthographic mode |
| `zNear` | `Double` | Near clipping distance (animatable) |
| `zFar` | `Double` | Far clipping distance (animatable) |
| `automaticallyAdjustsZRange` | `Bool` | Auto-tune zNear/zFar to fit scene |
| `motionBlurIntensity` | `CGFloat` | Motion blur strength (animatable) |
| `wantsDepthOfField` | `Bool` | Enable depth-of-field blur |
| `focusDistance` | `CGFloat` | Distance at which objects are sharp (animatable) |
| `fStop` | `CGFloat` | Simulated aperture for DOF (animatable) |
| `apertureBladeCount` | `Int` | Aperture blade count for bokeh shape |
| `wantsHDR` | `Bool` | Enable HDR post-processing |
| `wantsExposureAdaptation` | `Bool` | Auto-adjust exposure level |
| `exposureOffset` | `CGFloat` | Logarithmic tone-mapping bias |
| `exposureAdaptationBrighteningSpeedFactor` | `CGFloat` | Speed of dark-to-bright eye adaptation |
| `exposureAdaptationDarkeningSpeedFactor` | `CGFloat` | Speed of bright-to-dark eye adaptation |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Camera always looks along the **negative z-axis** of its node's local coordinate space.
- Aim the camera by setting node `position`/`rotation`, or attach `SCNLookAtConstraint`.
- Assign the camera node to `SCNSceneRenderer.pointOfView` to activate it.
- Conforms to `SCNAnimatable`, `SCNTechniqueSupport`.

## Related

- [SCNNode](./scnnode.md)
- [SCNView](./scnview.md)
- [SCNScene](./scnscene.md)
