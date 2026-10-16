# USDPreviewSession

A session that enables you to present the contents of a Universal Scene Description (USD) stage.

## Signature / Usage

```swift
final class USDPreviewSession
```

```swift
let observer = ConnectedSpatialEndpointObserver()

let session = USDPreviewSession(stage: usdStage)

// Wait for a device to become available.
let endpoint = try await observer.endpoint

try await session.start(endpoint: endpoint)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(stage:)` | `convenience init(stage: USDStage)` | Creates a session for a USDKit stage |
| `start(endpoint:parameters:viewerOptions:)` | `func start(endpoint: SpatialPreviewEndpoint, parameters: USDPreviewSession.OptimizationParameters, viewerOptions: USDPreviewSession.SpatialViewerOptions) async throws` | Connects to the specified endpoint and begins streaming the USD stage for spatial preview |
| `updateUndoRedoCounts(undo:redo:)` | `func updateUndoRedoCounts(undo: UInt, redo: UInt) async throws` | Update the count of undoable and redoable actions, reflected in the UI on visionOS |
| `delegate` | `(any USDPreviewSession.ChangeListDelegate)?` | Optional synchronous undo/redo event delegate |
| `events` | `any AsyncSequence<USDPreviewSession.Event, Never>` | Async sequence of session events |
| `isPlaying` | `Bool` | Animation playback state (no description in the source page) |
| `time` | `TimeInterval` | Animation time (no description in the source page) |
| `OptimizationSteps` | struct | A set of optimization steps to apply to a USD stage before previewing on a device |
| `SpatialViewerOptions` | struct | Configuration options that control interaction capabilities for a USD document session |
| `OptimizationParameters` | enum | No description in the source page |
| `ChangeListDelegate` | protocol | A protocol to provide shared undo/redo tracking in a USDPreviewSession |
| `Error` | enum | Errors that can occur during a USD preview session |
| `Event` | enum | Events emitted during a USD preview session |

## Notes

- Available: macOS 27.0+. Module `SpatialPreview` (related module `USDKit`).
- After `start(endpoint:parameters:viewerOptions:)` returns, `state` transitions to `connected` and the device starts loading the USD content. Edit the `USDStage` through USDKit to update content; changes made on visionOS are automatically synchronized back to USDKit in the macOS app.
- `USDPreviewSession.Error` cases: `assetUnshareable` (the stage became too complex to sync), `readOnlyStage` (the stage was replaced during optimization and changes made to the stage won't be synced).
- `USDPreviewSession.Event` cases: `error(_:)` (session error, such as editing a read-only stage), `playbackStateChanged(isPlaying:)` (USD animation playback state changed), `timeChanged(_:)` (USD animation timecode changed). Both enums are Sendable; `Error` also conforms to `Error`, `Equatable`, `Hashable`.
- For an app with its own OpenUSD runtime, see the bridging article summarized in overview.md.
- Conforms to `SpatialPreviewSession`, `Observable`, `Sendable`, `SendableMetatype`.

## Related

- [SpatialPreviewSession](./spatialpreviewsession.md)
- [DocumentPreviewSession](./documentpreviewsession.md)
- [SpatialPreviewEndpoint](./spatialpreviewendpoint.md)
- [SpatialPreviewSessionState](./spatialpreviewsessionstate.md)
- [Overview](./overview.md)
