# PHFetchOptions

Configuration object controlling how the Photos framework filters, sorts, and manages results from fetch methods.

## Signature / Usage

```swift
let options = PHFetchOptions()
options.predicate = NSPredicate(format: "mediaType == %d", PHAssetMediaType.image.rawValue)
options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
options.fetchLimit = 50
options.includeHiddenAssets = false

let result = PHAsset.fetchAssets(with: options)
```

## Options / Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `predicate` | `NSPredicate?` | `nil` | Filter expression; only specific keys are supported per fetch class |
| `sortDescriptors` | `[NSSortDescriptor]?` | `nil` | Ordering of results |
| `fetchLimit` | `Int` | `0` (no limit) | Maximum number of objects returned |
| `includeHiddenAssets` | `Bool` | `false` | Whether to include user-hidden assets |
| `includeAllBurstAssets` | `Bool` | `false` | Whether to include all burst photos instead of only the representative |
| `includeAssetSourceTypes` | `PHAssetSourceType` | all | Which source types (local, cloud, synced) to include |
| `wantsIncrementalChangeDetails` | `Bool` | `false` | Whether change observers receive detailed incremental updates for this fetch result |

**Supported predicate keys for `PHAsset`:** `localIdentifier`, `creationDate`, `modificationDate`, `mediaType`, `mediaSubtypes`, `duration`, `pixelWidth`, `pixelHeight`, `isFavorite`, `isHidden`, `burstIdentifier`.

**Supported predicate keys for `PHAssetCollection` / `PHCollectionList`:** `localIdentifier`, `localizedTitle`, `startDate`, `endDate`, `estimatedAssetCount`.

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, tvOS 10.0+, visionOS 1.0+. Only keys listed above are valid in `predicate` and `sortDescriptors`; unsupported keys raise an exception at runtime.

## Related

- [PHAsset](./phasset.md)
- [PHAssetCollection](./phassetcollection.md)
- [PHFetchResult](./phfetchresult.md)
