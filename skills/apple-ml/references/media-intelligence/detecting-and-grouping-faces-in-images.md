# Detecting and grouping faces in images

Organize photos by person using on-device face detection. `FaceGroupAnalyzer` detects faces, stores them in a working directory you provide, and clusters them into entities (one per person).

## Signature / Usage

```swift
let workingDirectory = URL.documentsDirectory
    .appending(path: "FaceGroupData", directoryHint: .isDirectory)

// Create the directory if it doesn't already exist.
try FileManager.default.createDirectory(
    at: workingDirectory,
    withIntermediateDirectories: true
)

let analyzer = try FaceGroupAnalyzer(workingDirectory: workingDirectory)

// 1. Add images and detect faces.
let assets = imageURLs.map { url in
    MediaIntelligenceImageAsset(
        id: MediaIntelligenceImageAsset.ID(url.lastPathComponent),
        kind: .url(url)
    )
}
let results = try await analyzer.insertOrUpdateAssets(assets)
for try await (assetID, faces) in results {
    for face in faces {
        print("Found face \(face.id) at \(face.bounds) in asset \(face.assetID).")
    }
}

// 2. Group faces by person.
if await analyzer.state == .stale {
    try await analyzer.update()
}

// 3. Retrieve results.
for try await (entityID, faces) in analyzer.allFacesByEntityID {
    // Use entityID and faces to build person-based features.
}
```

## Notes

- Workflow has three phases: add images to detect faces, group the detected faces by person, retrieve the results.
- All processing happens on device; no network connection is required.
- The framework exclusively manages the working directory contents. Interact with the data only through the `FaceGroupAnalyzer` API. Data persists between launches and the analyzer resumes where it left off.
- `Face.entityID` is `nil` after `insertOrUpdateAssets(_:)`; it is assigned by `update(subprogress:)`.
- `state` values: `ready` (all faces have current group assignments), `stale` (faces added, updated or removed; run grouping), `updating` (grouping algorithm running). If the app exits while updating, the state returns to `stale` on next launch and stored face data is preserved; call `update(subprogress:)` again.
- `identifyFaces(in:)` detects and matches faces without storing data. Call it when state is `ready` or `stale`; call `update(subprogress:)` first for best accuracy (stale state still works but is less accurate). Matched faces carry an `entityID`.
- `fetchFaces(for:)` and `fetchAssetIDs(for:)` return synchronously from the local store (no `await`).
- Deleting assets: `deleteAssets(_:)`, `deleteAllAssets()`; afterwards state becomes `stale` if faces remain (existing group assignments remain valid until regrouped). `FaceGroupAnalyzer.purge(workingDirectory:)` permanently deletes all face data, group assignments and metadata.
- Use the same asset identifier consistently per image; the framework uses it to match new submissions against existing data.

## Related

- [FaceGroupAnalyzer](./facegroupanalyzer.md)
- [MediaIntelligenceImageAsset](./mediaintelligenceimageasset.md)
- [MediaIntelligenceError](./mediaintelligenceerror.md)
