# ConnectedSpatialEndpointObserver

An observer that provides access to the endpoint for a device connected via Mac Virtual Display.

## Signature / Usage

```swift
@MainActor final class ConnectedSpatialEndpointObserver
```

```swift
let observer = ConnectedSpatialEndpointObserver()

// Wait for a device to become available.
let endpoint = try await observer.endpoint
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init()` | `init()` | Creates a new observer for monitoring connected device endpoint availability |
| `endpoint` | `var endpoint: SpatialPreviewEndpoint` | The endpoint for the visionOS device currently connected via Mac Virtual Display |
| `isEndpointAvailable` | `var isEndpointAvailable: Bool` | Indicates whether a connected device endpoint is currently connected |
| `UnavailableError` | struct | Nested error type |

## Notes

- Available: macOS 27.0+.
- `ConnectedSpatialEndpointObserver.UnavailableError` is thrown when accessing `endpoint` while no Mac Virtual Display device is available.
- To discover another device instead, use `SpatialPreviewDevicePicker`.
- Conforms to `Observable`, `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/spatialpreview/connectedspatialendpointobserver (fetched 2026-10 from the DocC JSON).

## Related

- [SpatialPreviewEndpoint](./spatialpreviewendpoint.md)
- [SpatialPreviewDevicePicker](./spatialpreviewdevicepicker.md)
- [DocumentPreviewSession](./documentpreviewsession.md)
