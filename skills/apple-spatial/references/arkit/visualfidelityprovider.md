# VisualFidelityProvider

A data provider that delivers visual fidelity monitoring data.

## Signature / Usage

```swift
final class VisualFidelityProvider

convenience init(fieldOfView: VisualFidelityProvider.FieldOfView?, requestDeviceFitUpdates: Bool, presentCoachingAlerts: Bool)
var anchorUpdates: AnchorUpdateSequence<FieldOfViewAnchor>
var fidelityDataUpdates: some AsyncSequence<VisualFidelityData, Never>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(fieldOfView:requestDeviceFitUpdates:presentCoachingAlerts:)` | `(FieldOfView?, Bool, Bool)` | Create a visual fidelity data provider. |
| `anchorUpdates` | `AnchorUpdateSequence<FieldOfViewAnchor>` | An async sequence of anchor updates for visualizing a preset field of view (FoV). |
| `fidelityDataUpdates` | `some AsyncSequence<VisualFidelityData, Never>` | An async sequence of visual fidelity data updates. |
| `state` | `DataProviderState` | The state of this visual fidelity data provider. |
| `isSupported` | `Bool` (static) | Determines whether this device supports the visual fidelity data provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization type(s) required by the visual fidelity data provider. |
| `FieldOfView` | `struct` | A field of view (FoV) specification. |

## Notes

- New in visionOS 27.0. Conforms to `DataProvider`. The page body has no overview text; the descriptions below come from the ARKit symbol abstracts.
- `VisualFidelityData` (struct): visual fidelity data containing device fit and field of view verification.
- `FieldOfViewAnchor` (struct): an anchor representing a set of field of view (FoV) boundary polygon points in immersive space.
- `DeviceFitStatus` (enum): device fit validation status indicating the user's eye position relative to the optimal device fit range.

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
