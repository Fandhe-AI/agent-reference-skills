# SpatialPreviewEndpoint

An endpoint representing a visionOS device you can connect to for spatial preview.

## Signature / Usage

```swift
struct SpatialPreviewEndpoint
```

```swift
let observer = ConnectedSpatialEndpointObserver()
let endpoint: SpatialPreviewEndpoint = try await observer.endpoint
try await session.start(endpoint: endpoint)
```

## Notes

- Available: macOS 27.0+.
- Obtain an endpoint from `ConnectedSpatialEndpointObserver.endpoint` when a device is connected via Mac Virtual Display, or let the user select one with `SpatialPreviewDevicePicker`. Pass it to `DocumentPreviewSession.start(endpoint:)` or `USDPreviewSession.start(endpoint:parameters:viewerOptions:)` to begin a session.
- Conforms to `CustomReflectable`, `CustomStringConvertible`, `Decodable`, `Encodable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/spatialpreview/spatialpreviewendpoint (fetched 2026-10 from the DocC JSON).

## Related

- [ConnectedSpatialEndpointObserver](./connectedspatialendpointobserver.md)
- [SpatialPreviewDevicePicker](./spatialpreviewdevicepicker.md)
- [DocumentPreviewSession](./documentpreviewsession.md)
- [USDPreviewSession](./usdpreviewsession.md)
