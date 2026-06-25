# PHCachingImageManager

A `PHImageManager` subclass optimized for batch-preloading thumbnails. Use this instead of the shared `PHImageManager` when populating collection views or grids with many assets.

## Signature / Usage

```swift
let cachingManager = PHCachingImageManager()

// Start caching for a batch of assets about to scroll into view
cachingManager.startCachingImages(
    for: visibleAssets,
    targetSize: CGSize(width: 150, height: 150),
    contentMode: .aspectFill,
    options: nil
)

// Later, request (will be instant if pre-cached)
cachingManager.requestImage(
    for: asset,
    targetSize: CGSize(width: 150, height: 150),
    contentMode: .aspectFill,
    options: nil
) { image, _ in
    cell.imageView.image = image
}

// Stop caching assets that scrolled out of view
cachingManager.stopCachingImages(
    for: offscreenAssets,
    targetSize: CGSize(width: 150, height: 150),
    contentMode: .aspectFill,
    options: nil
)

// Cancel all pending cache work (e.g., on deinit)
cachingManager.stopCachingImagesForAllAssets()
```

## Options / Props

| Method | Description |
|--------|-------------|
| `startCachingImages(for:targetSize:contentMode:options:)` | Prepares images for the given assets in the background |
| `stopCachingImages(for:targetSize:contentMode:options:)` | Cancels preparation for the given assets |
| `stopCachingImagesForAllAssets()` | Cancels all in-progress caching |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.15+, Mac Catalyst 13.1+, tvOS 10.0+, visionOS 1.0+. Always create a dedicated instance; do not use the shared `PHImageManager.default()` for caching. Pass the **same** `targetSize`, `contentMode`, and `options` to both `startCachingImages` and `requestImage` to ensure cache hits. Stop caching off-screen assets to release memory.

## Related

- [PHImageManager](./phimagemanager.md)
- [PHAsset](./phasset.md)
