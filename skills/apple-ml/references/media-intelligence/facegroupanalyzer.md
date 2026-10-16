# FaceGroupAnalyzer

An object that detects faces in images and groups them by person. It stores face data persistently in a working directory and clusters faces into entities, each representing a distinct person.

## Signature / Usage

```swift
final class FaceGroupAnalyzer

let analyzer = try FaceGroupAnalyzer(workingDirectory: workingDirectory)
let results = try await analyzer.insertOrUpdateAssets(assets)
if await analyzer.state == .stale {
    try await analyzer.update()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(workingDirectory:)` | `(URL) throws` | Creates a face group analyzer at the specified directory |
| `workingDirectory` | `URL` | Directory where the analyzer stores its face data and metadata |
| `insertOrUpdateAssets(_:)` | `([MediaIntelligenceImageAsset]) async throws -> some AsyncSequence<(assetID: MediaIntelligenceImageAsset.ID, faces: Array<FaceGroupAnalyzer.Face>), any Error>` | Adds or replaces image assets in the analyzer |
| `deleteAssets(_:)` | `([MediaIntelligenceImageAsset.ID]) async throws` | Removes the specified assets and their associated face data |
| `deleteAllAssets()` | `async throws` | Removes all assets and their associated face data |
| `purge(workingDirectory:)` | `static (URL) async throws` | Removes all analyzer data from the specified directory |
| `state` | `FaceGroupAnalyzer.State` | Current processing state (`ready` / `stale` / `updating`) |
| `update(subprogress:)` | `(consuming Subprogress?) async throws` | Clusters faces into entities and updates their assignments |
| `allFaces` | `some AsyncSequence<FaceGroupAnalyzer.Face, any Error>` | All faces in the analyzer |
| `allFacesByEntityID` | `some AsyncSequence<(entityID: Entity.ID, faces: Array<Face>), any Error>` | All faces, grouped by entity |
| `allEntities` | `some AsyncSequence<FaceGroupAnalyzer.Entity, any Error>` | All entities in the analyzer |
| `allAssetIDs` | `some AsyncSequence<MediaIntelligenceImageAsset.ID, any Error>` | All asset identifiers |
| `allAssetIDsByEntityID` | `some AsyncSequence<(entityID: Entity.ID, assetIDs: Array<MediaIntelligenceImageAsset.ID>), any Error>` | All asset identifiers, grouped by entity |
| `fetchFaces(_:)` | `([Face.ID]) throws -> some AsyncSequence<Face, any Error>` | Returns the faces with the specified identifiers |
| `fetchFaces(for:)` | `([Entity.ID]) throws -> some AsyncSequence<(entityID, faces), any Error>` | Returns the faces belonging to the specified entities |
| `fetchFaces(in:)` | `([MediaIntelligenceImageAsset.ID]) throws -> some AsyncSequence<(assetID, faces), any Error>` | Returns the faces from the specified assets |
| `fetchAssetIDs(for:)` | `([Entity.ID]) throws -> some AsyncSequence<(entityID, assetIDs), any Error>` | Returns the asset identifiers for the specified entities |
| `identifyFaces(in:)` | `([MediaIntelligenceImageAsset]) async throws -> some AsyncSequence<(assetID, faces), any Error>` | Detects and identifies faces without modifying the analyzer's data |

### Face

`struct FaceGroupAnalyzer.Face` — a face detected in an image asset.

| Name | Type | Description |
|------|------|-------------|
| `id` | `FaceGroupAnalyzer.Face.ID` | Unique identifier for the face |
| `bounds` | `CGRect` | Normalized rectangle of the face within its source image |
| `assetID` | `MediaIntelligenceImageAsset.ID` | Identifier of the image asset containing the face |
| `entityID` | `FaceGroupAnalyzer.Entity.ID?` | Identifier of the entity this face belongs to |

### State

| Case | Description |
|------|-------------|
| `ready` | All faces have up-to-date cluster assignments |
| `stale` | New faces need cluster assignments |
| `updating` | The clustering algorithm is running |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- `final class`; conforms to `Sendable` and `SendableMetatype`.
- The working directory persists between launches; subsequent runs resume where the previous session ended.
- `FaceGroupAnalyzer.Entity` is "a cluster of faces that belong to the same person".
- Not related to Vision face APIs (`DetectFaceRectanglesRequest`, `VNDetectFaceRectanglesRequest`): those return per-image observations and do not group faces by person or persist data.

## Related

- [Detecting and grouping faces in images](./detecting-and-grouping-faces-in-images.md)
- [MediaIntelligenceImageAsset](./mediaintelligenceimageasset.md)
- [MediaIntelligenceError](./mediaintelligenceerror.md)
