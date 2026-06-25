# ARCamera

Provides position, orientation, and imaging parameters of the device camera for a given `ARFrame`.

## Signature / Usage

```swift
func session(_ session: ARSession, didUpdate frame: ARFrame) {
    let camera = frame.camera
    guard camera.trackingState == .normal else { return }
    let transform = camera.transform
    let projection = camera.projectionMatrix
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `transform` | `simd_float4x4` | Camera position and orientation in world coordinate space |
| `eulerAngles` | `simd_float3` | Orientation as roll, pitch, and yaw |
| `trackingState` | `ARCamera.TrackingState` | Quality of position tracking (`.normal`, `.limited`, `.notAvailable`) |
| `trackingStateReason` | `ARCamera.TrackingStateReason` | Reason for limited tracking (initializing, excessiveMotion, etc.) |
| `imageResolution` | `CGSize` | Pixel dimensions of the captured camera image |
| `intrinsics` | `simd_float3x3` | Matrix converting between 2D camera plane and 3D world space |
| `projectionMatrix` | `simd_float4x4` | Projection matrix for rendering 3D content matching the captured image |
| `exposureDuration` | `TimeInterval` | Exposure duration for motion-blur rendering |
| `exposureOffset` | `Float` | Exposure offset for custom lighting in shaders |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+
- Not instantiated directly; always obtained from `ARFrame.camera`.
- Use `projectionMatrix(for:viewportSize:zNear:zFar:)` for custom near/far clipping planes.
- Use `projectPoint(_:orientation:viewportSize:)` / `unprojectPoint(_:ontoPlane:orientation:viewportSize:)` for 2D↔3D conversions.

## Related

- [ARFrame](./arframe.md)
- [ARSession](./arsession.md)
