# DataProvider

A source of live data from ARKit.

## Signature / Usage

```swift
protocol DataProvider : AnyObject, CustomStringConvertible, Sendable
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `DataProviderState` | The current status of data coming from this provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The kinds of authorization you need to use a particular data provider type. |
| `isSupported` | `Bool` (static) | A Boolean value that indicates whether the current runtime environment supports a particular provider type. |

## Notes

- macOS 26.0+, visionOS 1.0+.
- Most providers supply an asynchronous sequence of updated anchors for the provider's data type. For example, a `HandTrackingProvider` instance's `anchorUpdates` property gives updates over time for hand anchors.
- Conforming types: `AccessoryTrackingProvider`, `BarcodeDetectionProvider`, `CameraFrameProvider`, `CameraRegionProvider`, `EnvironmentLightEstimationProvider`, `HandTrackingProvider`, `ImageTrackingProvider`, `ObjectTrackingProvider`, `PlaneDetectionProvider`, `RoomTrackingProvider`, `SceneReconstructionProvider`, `SharedCoordinateSpaceProvider`, `StereoPropertiesProvider`, `VisualFidelityProvider`, `WorldTrackingProvider`.

## Related

- [ARKitSession](./arkitsession.md)
- [HandTrackingProvider](./handtrackingprovider.md)
- [WorldTrackingProvider](./worldtrackingprovider.md)
