# StereoPropertiesProvider

The StereoPropertiesProvider serves the latest viewpoint properties on the device.

## Signature / Usage

```swift
final class StereoPropertiesProvider

init()
var latestViewpointProperties: ViewpointProperties?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | — | Initialize the StereoPropertiesProvider. |
| `latestViewpointProperties` | `ViewpointProperties?` | The latest viewpoint properties, if available. |
| `state` | `DataProviderState` | The state of this stereo properties provider. |
| `isSupported` | `Bool` (static) | Determines whether this device supports the stereo properties provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization type(s) required by the stereo properties provider. |

## Notes

- visionOS 2.4+. Conforms to `DataProvider`.
- `ViewpointProperties` (struct): a record of render camera transforms at some particular time.

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
