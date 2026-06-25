# PHAsset

Represents an image, video, or Live Photo in the Photos library. Provides access to asset metadata; asset objects are immutable.

## Signature / Usage

```swift
// Fetch all images
let options = PHFetchOptions()
options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
let result: PHFetchResult<PHAsset> = PHAsset.fetchAssets(with: .image, options: options)

// Mutate via change request (assets are immutable)
PHPhotoLibrary.shared().performChanges({
    let request = PHAssetChangeRequest(for: asset)
    request.isFavorite = true
})
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `mediaType` | `PHAssetMediaType` | `.image`, `.video`, or `.audio` |
| `mediaSubtypes` | `PHAssetMediaSubtype` | Panorama, screenshot, time-lapse, Live Photo, etc. |
| `pixelWidth` / `pixelHeight` | `Int` | Dimensions in pixels |
| `creationDate` | `Date?` | When the asset was originally captured |
| `modificationDate` | `Date?` | Last modification timestamp |
| `duration` | `TimeInterval` | Video duration in seconds; 0 for photos |
| `location` | `CLLocation?` | GPS location embedded with the asset |
| `isFavorite` | `Bool` | Whether marked as a user favorite |
| `isHidden` | `Bool` | Whether hidden from collections |
| `burstIdentifier` | `String?` | Shared identifier for burst photo sequences |
| `sourceType` | `PHAssetSourceType` | How the asset entered the library |

**Key class methods:**

| Method | Description |
|--------|-------------|
| `fetchAssets(with:options:)` | Fetch by media type |
| `fetchAssets(in:options:)` | Fetch from a specific collection |
| `fetchAssets(withLocalIdentifiers:options:)` | Fetch by local identifiers |
| `fetchAssets(withBurstIdentifier:options:)` | Fetch all photos in a burst |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, tvOS 10.0+, visionOS 1.0+. Assets hold only metadata; use `PHImageManager` to retrieve image/video data. Use `playbackStyle` to determine how to present an asset (photo, video, Live Photo).

## Related

- [PHFetchResult](./phfetchresult.md)
- [PHFetchOptions](./phfetchoptions.md)
- [PHImageManager](./phimagemanager.md)
- [PHAssetChangeRequest](./phassetchangerequest.md)
