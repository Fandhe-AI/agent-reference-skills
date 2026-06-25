# ARFrame

A video image captured by an AR session, bundled with position-tracking information, scene analysis, and all currently tracked anchors.

## Signature / Usage

```swift
// Poll current frame
if let frame = session.currentFrame {
    let image = frame.capturedImage
    let camera = frame.camera
}

// Or receive via delegate
func session(_ session: ARSession, didUpdate frame: ARFrame) {
    // process frame
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `capturedImage` | `CVPixelBuffer` | Raw pixel buffer from the device camera |
| `camera` | `ARCamera` | Camera position, orientation, and imaging parameters |
| `timestamp` | `TimeInterval` | Capture time of the frame |
| `anchors` | `[ARAnchor]` | All currently tracked anchors |
| `lightEstimate` | `ARLightEstimate?` | Estimated scene lighting conditions |
| `worldMappingStatus` | `ARFrame.WorldMappingStatus` | Readiness for saving/relocalizing a world map |
| `rawFeaturePoints` | `ARPointCloud?` | Intermediate scene analysis feature points |
| `sceneDepth` | `ARDepthData?` | Depth measurements from the rear camera (LiDAR) |
| `smoothedSceneDepth` | `ARDepthData?` | Averaged depth for smoother rendering |
| `segmentationBuffer` | `CVPixelBuffer?` | Per-pixel object segmentation for occlusion |
| `detectedBody` | `ARBody2D?` | Screen-space position of detected person |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+
- Use `raycastQuery(from:allowing:alignment:)` on the frame to create hit-test queries; prefer this over the deprecated `hitTest(_:types:)`.

## Related

- [ARCamera](./arcamera.md)
- [ARAnchor](./aranchor.md)
- [ARSession](./arsession.md)
- [ARRaycastQuery](./arraycastquery.md)
