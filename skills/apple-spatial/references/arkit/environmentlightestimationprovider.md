# EnvironmentLightEstimationProvider

A source of live data about lighting information in the environment. Use the anchor this provider returns to reflect lighting from a person's surroundings on the surfaces of virtual objects.

## Signature / Usage

```swift
final class EnvironmentLightEstimationProvider

convenience init()
var anchorUpdates: AnchorUpdateSequence<EnvironmentProbeAnchor>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | — | Creates an environment light estimation provider. |
| `anchorUpdates` | `AnchorUpdateSequence<EnvironmentProbeAnchor>` | An asynchronous sequence of all anchor updates. |
| `state` | `DataProviderState` | The state of an environment light estimation provider. |
| `isSupported` | `Bool` (static) | A Boolean value that indicates whether a device supports the environment light estimation provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization types that an environment light estimation provider requires. |

## Notes

- visionOS 2.0+. Conforms to `DataProvider`.
- `EnvironmentProbeAnchor` (struct): an environment probe in the world.

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
