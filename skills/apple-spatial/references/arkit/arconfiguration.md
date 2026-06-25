# ARConfiguration

Abstract base class for AR session configurations. Do not instantiate directly; use a concrete subclass.

## Signature / Usage

```swift
// Use a concrete subclass:
let config = ARWorldTrackingConfiguration()
config.isLightEstimationEnabled = true
session.run(config)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `worldAlignment` | `ARConfiguration.WorldAlignment` | How device motion maps to the 3D coordinate system |
| `isLightEstimationEnabled` | `Bool` | Whether ARKit analyzes scene lighting in camera images |
| `providesAudioData` | `Bool` | Whether the session captures audio |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+
- Key subclasses: `ARWorldTrackingConfiguration`, `ARBodyTrackingConfiguration`, `ARFaceTrackingConfiguration`, `ARImageTrackingConfiguration`, `ARObjectScanningConfiguration`, `ARGeoTrackingConfiguration`, `AROrientationTrackingConfiguration`, `ARPositionalTrackingConfiguration`.

## Related

- [ARWorldTrackingConfiguration](./arworldtrackingconfiguration.md)
- [ARSession](./arsession.md)
