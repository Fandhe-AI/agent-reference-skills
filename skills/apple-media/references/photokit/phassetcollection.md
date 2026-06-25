# PHAssetCollection

Represents a Photos asset grouping such as a user-created album, smart album, or moment. Collections do not directly reference their members; fetch assets separately via `PHAsset`.

## Signature / Usage

```swift
// Fetch all user-created albums
let albums = PHAssetCollection.fetchAssetCollections(
    with: .album,
    subtype: .any,
    options: nil
)

// Fetch assets inside a collection
let assets = PHAsset.fetchAssets(in: albums.firstObject!, options: nil)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `assetCollectionType` | `PHAssetCollectionType` | `.album`, `.smartAlbum`, or `.moment` |
| `assetCollectionSubtype` | `PHAssetCollectionSubtype` | Specific kind within the type (e.g., `.albumRegular`, `.smartAlbumFavorites`) |
| `estimatedAssetCount` | `Int` | Approximate number of assets; may be `NSNotFound` before fetch |
| `startDate` | `Date?` | Earliest asset creation date in the collection |
| `endDate` | `Date?` | Latest asset creation date in the collection |
| `approximateLocation` | `CLLocation?` | Representative location for the collection |
| `localizedLocationNames` | `[String]` | Human-readable location names |

**Key class methods:**

| Method | Description |
|--------|-------------|
| `fetchAssetCollections(with:subtype:options:)` | Fetch by type and subtype |
| `fetchAssetCollections(withLocalIdentifiers:options:)` | Fetch by local identifiers |
| `fetchAssetCollectionsContaining(_:with:options:)` | Fetch collections that contain a given asset |
| `transientAssetCollection(with:title:)` | Create an in-memory (non-persisted) collection |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, Mac Catalyst 13.1+, tvOS 10.0+, visionOS 1.0+. Collections are immutable; use `PHAssetCollectionChangeRequest` inside a change block to create, rename, delete, or modify membership. `NSPhotoLibraryUsageDescription` must be present in `Info.plist`.

## Related

- [PHAsset](./phasset.md)
- [PHFetchResult](./phfetchresult.md)
- [PHFetchOptions](./phfetchoptions.md)
- [PHPhotoLibrary](./phphotolibrary.md)
