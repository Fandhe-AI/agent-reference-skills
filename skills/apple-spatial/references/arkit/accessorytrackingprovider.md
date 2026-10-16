# AccessoryTrackingProvider

Provides the real time position of accessories in the user's environment.

## Signature / Usage

```swift
final class AccessoryTrackingProvider

convenience init(accessories: [Accessory])
func predictAnchor(for: AccessoryAnchor, at: TimeInterval) -> AccessoryAnchor?
func updateAccessories([Accessory]) async throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(accessories:)` | `[Accessory]` | Create an accessory tracking provider. |
| `anchorUpdates` | `AnchorUpdateSequence<AccessoryAnchor>` | An async sequence of all anchor updates. |
| `latestAnchors` | `[AccessoryAnchor]` | The latest accessory anchors updated with the most recent inertial data. |
| `state` | `DataProviderState` | The state of this accessory tracking provider. |
| `predictAnchor(for:at:)` | `(AccessoryAnchor, TimeInterval) -> AccessoryAnchor?` | Predict an accessory anchor to a target timestamp. |
| `updateAccessories(_:)` | `([Accessory]) async throws` | Updates the accessories being tracked by a provider. |
| `isSupported` | `Bool` (static) | Determines whether this device supports the accessory tracking provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization type(s) required by the accessory tracking provider. |
| `Error` | `struct` | An accessory tracking error. |

## Notes

- visionOS 26.0+. Conforms to `DataProvider`.
- `Accessory` (struct): represents an accessory to be tracked.
- `AccessoryAnchor` (struct): represents a tracked accessory.
- Official articles: "Preparing spatial accessories for tracking in your visionOS app", "Working with generic spatial accessories", "Tracking accessories in volumetric windows", "Tracking a handheld accessory as a virtual sculpting tool".
- Source: https://developer.apple.com/documentation/arkit/accessorytrackingprovider (fetched 2026-10 from the DocC JSON).

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
