# SpatialPreviewSession

A session that manages the lifecycle and connection state of a spatial preview on a visionOS device.

## Signature / Usage

```swift
protocol SpatialPreviewSession : AnyObject, Observable
```

```swift
var progress: ProgressReporter { get }
var state: SpatialPreviewSessionState { get }
func close() async throws
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `progress` | `ProgressReporter` | Reports the progress of the session |
| `state` | `SpatialPreviewSessionState` | Can observe this state |
| `close()` | `func close() async throws` | Gracefully close the session |

## Notes

- Available: macOS 27.0+.
- All three members are protocol requirements.
- Conforming types: `DocumentPreviewSession`, `USDPreviewSession`. Inherits from `Observable`.
- Source: https://developer.apple.com/documentation/spatialpreview/spatialpreviewsession (fetched 2026-10 from the DocC JSON).

## Related

- [DocumentPreviewSession](./documentpreviewsession.md)
- [USDPreviewSession](./usdpreviewsession.md)
- [SpatialPreviewSessionState](./spatialpreviewsessionstate.md)
