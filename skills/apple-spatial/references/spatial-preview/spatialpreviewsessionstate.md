# SpatialPreviewSessionState

Indicates the state of the session and the health of the underlying connection.

## Signature / Usage

```swift
enum SpatialPreviewSessionState
```

```swift
let state: SpatialPreviewSessionState = session.state
if state == .connected {
    // push edits
}
```

## Options / Props

| Case / Member | Description |
|---------------|-------------|
| `waiting` | The session has been created, but not started. No device is connected yet; sync calls have no effect |
| `connected` | The session is actively connected; push edits |
| `interrupted` | The session connection has been interrupted, but may resume. Queue pending edits and replay when state returns to `connected` |
| `invalidated` | The session has been invalidated and is no longer available. Release it and create a new session to reconnect |
| `isInvalidated` | `Bool` instance property (no description in the source page) |

## Notes

- Available: macOS 27.0+. Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.
- Read `state` before calling any sync operation to confirm the session is ready.
- `SpatialPreviewSessionError` cases: `invalidSpatialPreviewEndpoint` (use of an invalid spatial preview device), `invalidated` (no description in the source page), `tooManySessions` (reached a maximum number of sessions for the receiving device). It conforms to `Error`, `Equatable`, `Hashable`, `Sendable`.
- Source: https://developer.apple.com/documentation/spatialpreview/spatialpreviewsessionstate (fetched 2026-10 from the DocC JSON).

## Related

- [SpatialPreviewSession](./spatialpreviewsession.md)
- [USDPreviewSession](./usdpreviewsession.md)
- [DocumentPreviewSession](./documentpreviewsession.md)
