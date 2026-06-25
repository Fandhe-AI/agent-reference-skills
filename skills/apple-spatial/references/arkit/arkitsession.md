# ARKitSession

The main entry point for receiving AR data on visionOS. Manages data providers and handles user authorization for ARKit capabilities.

## Signature / Usage

```swift
let session = ARKitSession()
let planeData = PlaneDetectionProvider(alignments: [.horizontal, .vertical])

Task {
    let authResult = await session.requestAuthorization(for: [.worldSensing])
    try await session.run([planeData])
    for await update in planeData.anchorUpdates {
        // handle PlaneAnchor updates
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dataProviders` | `[any DataProvider]` | Active data providers on the session |
| `events` | `AsyncSequence` | Stream of authorization status change events |

## Notes

- visionOS 1.0+, macOS 26.0+
- Call `requestAuthorization(for:)` before `run(_:)` for explicit permission prompts; use `queryAuthorization(for:)` to check status without prompting.
- The session stops when deallocated; keep a strong reference for the lifetime of AR use.
- Key authorization type: `.worldSensing` (required for plane detection, scene reconstruction, image tracking).
- `init(device:)` overload connects to a remote device via `RemoteDeviceIdentifier`.

## Related

- [WorldTrackingProvider](./worldtrackingprovider.md)
- [HandTrackingProvider](./handtrackingprovider.md)
- [SceneReconstructionProvider](./scenereconstructionprovider.md)
- [PlaneDetectionProvider](./planedetectionprovider.md)
