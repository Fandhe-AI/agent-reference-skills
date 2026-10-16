# CameraFrameProvider

An object that provides camera streams. You use `CameraFrameProvider` to receive camera images for selected video formats.

## Signature / Usage

```swift
final class CameraFrameProvider

init()
func cameraFrameUpdates(for: CameraVideoFormat) -> CameraFrameProvider.CameraFrameUpdates?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | — | Creates a camera frame provider. |
| `cameraFrameUpdates(for:)` | `(CameraVideoFormat) -> CameraFrameProvider.CameraFrameUpdates?` | Gets a sequence of camera frame updates for a given video format. |
| `CameraFrameUpdates` | `struct` | A sequence of camera frames. |
| `CameraPosition` | `enum` | Values that describe possible camera positions. |
| `CameraType` | `enum` | Values that describe possible camera types. |
| `CameraRectification` | `enum` | Enumeration of possible camera rectification types. |
| `state` | `DataProviderState` | The state of a camera frame provider. |
| `isSupported` | `Bool` (static) | Whether this device supports the camera frame provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization types you need to use the camera frame provider. |

## Notes

- visionOS 2.0+. Conforms to `DataProvider`.
- The page body states no entitlement or enterprise requirement. The requirement is gated by `requiredAuthorizations` only (`static var requiredAuthorizations: [ARKitSession.AuthorizationType]`).
- `CameraFrame` (struct): the representation of a camera frame.
- `CameraVideoFormat` (struct): a structure that represents a camera video format.

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
