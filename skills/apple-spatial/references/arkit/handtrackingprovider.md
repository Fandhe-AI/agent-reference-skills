# HandTrackingProvider

A `DataProvider` that supplies live position and joint data for a person's hands in visionOS.

## Signature / Usage

```swift
let handTracking = HandTrackingProvider()
try await session.run([handTracking])

for await update in handTracking.anchorUpdates {
    let hand = update.anchor  // HandAnchor
    if let skeleton = hand.handSkeleton {
        let indexTip = skeleton.joint(.indexFingerTip)
        print(indexTip.anchorFromJointTransform)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anchorUpdates` | `AnchorUpdateSequence<HandAnchor>` | Async sequence of hand anchor updates |
| `latestAnchors` | `(leftHand: HandAnchor?, rightHand: HandAnchor?)` | Most recent anchors for each hand |
| `state` | `DataProviderState` | Current provider status |
| `isSupported` | `Bool` (static) | Whether the runtime supports hand tracking |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | Authorizations needed |

## Notes

- visionOS 1.0+ only (not available on iOS/macOS).
- `handAnchors(at:)` queries both hands at a specific timestamp.
- `HandAnchor` carries a `HandSkeleton` with per-joint transforms for all 25+ hand joints.
- Check `isSupported` before creating the provider.

## Related

- [ARKitSession](./arkitsession.md)
- [WorldTrackingProvider](./worldtrackingprovider.md)
