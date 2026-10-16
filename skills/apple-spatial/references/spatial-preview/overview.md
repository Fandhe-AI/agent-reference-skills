# Working with content from your Mac app using Spatial Preview

The Spatial Preview framework enables Mac apps to send content to a nearby Apple Vision Pro so people can view it spatially and immersively. Send and update documents, and work with 3D content live from your Mac app to a visionOS device.

## Signature / Usage

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

Bridging an external OpenUSD runtime: write overrides into a thin edit layer, export it to disk, and copy the changes into USDKit's stage.

```swift
@MainActor
func syncEdits(editLayerPath: String) {
    guard let srcLayer = USDLayer.find(identifier: editLayerPath) else {
        return
    }
    for rootPrim in srcLayer.pseudoRoot.nameChildren {
        let path = rootPrim.path

        editLayer.copy(from: srcLayer, to: path, in: path)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SpatialPreviewEndpoint` | struct | Identifies the target visionOS device |
| `SpatialPreviewSession` | protocol | Manages the active preview connection and the flow of content |
| `DocumentPreviewSession` | class | Streams general file content (for example, stereo HEIC images) |
| `USDPreviewSession` | class | Presents a USD stage and syncs edits in both directions |

## Notes

- Module availability: macOS 27.0+ and visionOS 27.0+. The sample code project is listed for macOS 27.0 and Xcode 27.0.
- The sample includes two examples: a spatial photo gallery that streams stereo HEIC images with `DocumentPreviewSession`, and a 3D interior design example that adjusts furniture layouts live with override layers (plus an asset-review workflow with text annotations) using `USDPreviewSession`. It is associated with WWDC26 session 282, "Discover the Spatial Preview framework".
- USDKit is recommended for Spatial Preview because it works without any additional setup. Apps that use USDKit to access USD data automatically sync their edits with Spatial Preview sessions.
- With your own USD runtime, the two apps do not share memory or a stage cache. Writing a USD file to disk does not notify USDKit of changes, and edits made on the connected Apple Vision Pro are not automatically visible to your app.
- Layer stack on the Mac side: Scene export (full scene written by your external runtime, root of the composition that USDKit loads), Wrapper stage (thin USDKit stage that sublayers the scene export and stays open for the session), Edit layer (lightweight layer holding only the overrides used for interchange).
- All USDKit edit operations must run on the main actor. Batch edits from an external OpenUSD runtime at a reasonable interval (for example, 30 ms) to avoid locking the main actor.
- When applying edits read from the Spatial Preview stage to your own stage, do not treat them as new changes; otherwise your app echoes them back and creates an infinite feedback loop.
- Apps that cannot produce a minimal edit layer can export the complete scene and call `USDStage.reload()` or `USDLayer.reload()`. USDKit diffs the old and new stage and only deltas are synced, but the full scene is exported on every change, which can be slow for large scenes.
- Read `state` before any sync call: `waiting` (no device yet, sync calls have no effect), `connected` (push edits), `interrupted` (queue pending edits and replay when `connected` again), `invalidated` (release the session and create a new one to reconnect).
- Distinct from Core ML / Create ML (apple-ml skill) and RealityKit rendering; this framework is a macOS-to-visionOS content bridge.

## Related

- [SpatialPreviewSession](./spatialpreviewsession.md)
- [DocumentPreviewSession](./documentpreviewsession.md)
- [USDPreviewSession](./usdpreviewsession.md)
- [SpatialPreviewEndpoint](./spatialpreviewendpoint.md)
- [SpatialPreviewSessionState](./spatialpreviewsessionstate.md)
