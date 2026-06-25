# CKAsset

An external file associated with a `CKRecord`. Use for binary data (images, video, large blobs) or any field value that exceeds a few kilobytes. Asset data is stored separately from the record on CloudKit servers.

## Signature / Usage

```swift
// Attach an asset to a record
let fileURL = Bundle.main.url(forResource: "photo", withExtension: "jpg")!
let asset   = CKAsset(fileURL: fileURL)
record["photo"] = asset

// Save record (CloudKit saves both record and asset)
let saved = try await db.save(record)

// Read a fetched asset
if let fetchedAsset = fetchedRecord["photo"] as? CKAsset,
   let assetURL = fetchedAsset.fileURL {
    let data = try Data(contentsOf: assetURL)
    // Move data out of the staging area immediately
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(fileURL:)` | `init` | Creates an asset referencing a local file |
| `fileURL` | `URL?` | Local URL where CloudKit has staged the fetched asset data |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Asset data does not count toward the 1 MB per-record data limit
- After fetching, the asset is stored in a **temporary staging area**; copy the data into your app's container immediately — the system periodically purges the staging area
- CloudKit stores only the asset's bytes, not its filename; use separate record fields to persist file metadata
- To exclude assets from fetch results (for performance), use `desiredKeys` and omit the asset field key
- To delete an asset, set the field to `nil` and save the record; CloudKit periodically purges orphaned assets from the server — do not attempt to delete assets directly

## Related

- [CKRecord](./ckrecord.md)
- [CKFetchRecordsOperation](./ckfetchrecordsoperation.md)
- [CKQueryOperation](./ckqueryoperation.md)
