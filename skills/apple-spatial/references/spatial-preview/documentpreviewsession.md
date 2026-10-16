# DocumentPreviewSession

A session that streams document content to a connected visionOS device for spatial preview.

## Signature / Usage

```swift
final class DocumentPreviewSession
```

```swift
let observer = ConnectedSpatialEndpointObserver()

// Wait for a device to become available.
let endpoint = try await observer.endpoint

// Create and start the session.
let session = DocumentPreviewSession(name: "My Spatial Content", contentType: .jpeg)

try await session.start(endpoint: endpoint)

// Push initial content, then update as the document changes.
let spatialContentURL = URL(filePath: "/path/to/spatialContent.jpeg")
try await session.updateContents(url: spatialContentURL)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(name:contentType:)` | `convenience init(name: String, contentType: UTType)` | Create a new session with the name and contentType, used for all content updates |
| `name` | `let name: String` | The display name of the document on the spatial preview |
| `contentType` | `let contentType: UTType` | The content type of the document. All updates must provide documents conforming to this content type |
| `start(endpoint:)` | `func start(endpoint: SpatialPreviewEndpoint) async throws` | Connects to the specified endpoint and prepares the session to send document updates |
| `updateContents(data:)` | `func updateContents(data: Data) async throws` | Update the contents of the document with the provided data |
| `updateContents(url:)` | `func updateContents(url: URL) async throws` | Update the contents of the document with the provided URL |

## Notes

- Available: macOS 27.0+.
- Obtain a `SpatialPreviewEndpoint` through `ConnectedSpatialEndpointObserver` (device already connected via Mac Virtual Display; observe `isEndpointAvailable`, then read `endpoint`) or `SpatialPreviewDevicePicker` (interactive selection).
- Use `updateContents(data:)` when content is already in memory; use `updateContents(url:)` to stream from a file URL and avoid loading the entire file into memory. Call either each time the document changes.
- Track connection changes with `SpatialPreviewSessionState`; call `close()` to end the session cleanly.
- Conforms to `SpatialPreviewSession`, `Observable`, `Sendable`, `SendableMetatype`.

## Related

- [SpatialPreviewSession](./spatialpreviewsession.md)
- [SpatialPreviewEndpoint](./spatialpreviewendpoint.md)
- [ConnectedSpatialEndpointObserver](./connectedspatialendpointobserver.md)
- [SpatialPreviewDevicePicker](./spatialpreviewdevicepicker.md)
- [SpatialPreviewSessionState](./spatialpreviewsessionstate.md)
