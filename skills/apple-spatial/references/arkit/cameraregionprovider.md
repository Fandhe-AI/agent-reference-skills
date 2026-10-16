# CameraRegionProvider

A camera region provider.

## Signature / Usage

```swift
final class CameraRegionProvider

init()
func addAnchor(CameraRegionAnchor) async throws
func removeAnchor(CameraRegionAnchor) async throws
func removeAnchor(forID: UUID) async throws
func anchorUpdates(forID: UUID) -> AnchorUpdateSequence<CameraRegionAnchor>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | — | Create a camera region provider. |
| `addAnchor(_:)` | `(CameraRegionAnchor) async throws` | Add a camera region anchor. |
| `removeAnchor(_:)` | `(CameraRegionAnchor) async throws` | Remove a camera region anchor. |
| `removeAnchor(forID:)` | `(UUID) async throws` | Remove an anchor with a given ID from camera region. |
| `anchorUpdates(forID:)` | `(UUID) -> AnchorUpdateSequence<CameraRegionAnchor>` | An async sequence of anchor updates for a specific anchor. |
| `state` | `DataProviderState` | The state of this camera region provider. |
| `isSupported` | `Bool` (static) | Determines whether this device supports the camera region provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization type(s) required by the camera region provider. |
| `Error` | `struct` | A camera region error. |

## Notes

- visionOS 26.0+. Conforms to `DataProvider`. Enterprise-only.
- An enterprise license is required to use the CameraRegionProvider. The provider will not deliver any data without it. The app must include the Camera Region access entitlement. (Entitlement key: `com.apple.developer.arkit.camera-region.allow`.)
- `CameraRegionAnchor` (struct): represents a region in space for capturing a camera stream.
- Source: https://developer.apple.com/documentation/arkit/cameraregionprovider (fetched 2026-10 from the DocC JSON).

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
