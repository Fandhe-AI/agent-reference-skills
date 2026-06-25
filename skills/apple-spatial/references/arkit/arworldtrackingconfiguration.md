# ARWorldTrackingConfiguration

Tracks device position and orientation relative to the physical environment with six degrees of freedom (6DOF): roll, pitch, yaw, and x/y/z translation.

## Signature / Usage

```swift
let configuration = ARWorldTrackingConfiguration()
configuration.planeDetection = [.horizontal, .vertical]
configuration.environmentTexturing = .automatic
session.run(configuration)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `planeDetection` | `ARWorldTrackingConfiguration.PlaneDetection` | Enables horizontal/vertical surface detection; adds `ARPlaneAnchor` objects |
| `environmentTexturing` | `ARWorldTrackingConfiguration.EnvironmentTexturing` | Generates environment textures for reflections |
| `wantsHDREnvironmentTextures` | `Bool` | Whether environment textures use HDR |
| `initialWorldMap` | `ARWorldMap?` | Saved world map used to restore a previous session |
| `userFaceTrackingEnabled` | `Bool` | Enables simultaneous front-camera face tracking |
| `isAutoFocusEnabled` | `Bool` | Controls camera autofocus behavior |
| `isCollaborationEnabled` | `Bool` | Enables multiuser collaborative sessions |
| `sceneReconstruction` | `ARConfiguration.SceneReconstruction` | Reconstructs 3D scene geometry (LiDAR) |
| `detectionImages` | `Set<ARReferenceImage>` | Reference images to detect in the scene |
| `detectionObjects` | `Set<ARReferenceObject>` | Reference 3D objects to detect |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+
- Check `ARWorldTrackingConfiguration.isSupported` before use.
- `userFaceTrackingEnabled` requires `ARFaceTrackingConfiguration.supportsUserFaceTracking`.

## Related

- [ARConfiguration](./arconfiguration.md)
- [ARPlaneAnchor](./arplaneanchor.md)
- [ARSession](./arsession.md)
