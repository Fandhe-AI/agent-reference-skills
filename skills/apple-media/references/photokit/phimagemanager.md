# PHImageManager

Facilitates retrieving or generating preview thumbnails and full asset data from the Photos library. Results are cached automatically.

## Signature / Usage

```swift
let manager = PHImageManager.default()
let requestOptions = PHImageRequestOptions()
requestOptions.isSynchronous = false
requestOptions.deliveryMode = .highQualityFormat

let requestID = manager.requestImage(
    for: asset,
    targetSize: CGSize(width: 300, height: 300),
    contentMode: .aspectFill,
    options: requestOptions
) { image, info in
    // image may be delivered multiple times (low-res then high-res)
    guard let image else { return }
    imageView.image = image
}

// Cancel if no longer needed
manager.cancelImageRequest(requestID)
```

## Options / Props

| Method | Returns | Description |
|--------|---------|-------------|
| `default()` | `PHImageManager` | Returns the shared image manager singleton |
| `requestImage(for:targetSize:contentMode:options:resultHandler:)` | `PHImageRequestID` | Requests a `UIImage` for the asset at the given size |
| `requestImageDataAndOrientation(for:options:resultHandler:)` | `PHImageRequestID` | Requests raw `Data` plus EXIF orientation |
| `requestPlayerItem(forVideo:options:resultHandler:)` | `PHImageRequestID` | Requests an `AVPlayerItem` for playback |
| `requestAVAsset(forVideo:options:resultHandler:)` | `PHImageRequestID` | Requests an `AVAsset` for editing/export |
| `requestExportSession(forVideo:options:exportPreset:resultHandler:)` | `PHImageRequestID` | Requests an `AVAssetExportSession` |
| `cancelImageRequest(_:)` | `Void` | Cancels an in-flight request by ID |

**PHImageRequestOptions key properties:**

| Property | Type | Description |
|----------|------|-------------|
| `deliveryMode` | `PHImageRequestOptionsDeliveryMode` | `.opportunistic`, `.highQualityFormat`, `.fastFormat` |
| `resizeMode` | `PHImageRequestOptionsResizeMode` | Controls how the image is scaled |
| `isSynchronous` | `Bool` | If `true`, blocks the calling thread until delivery |
| `isNetworkAccessAllowed` | `Bool` | Whether to download iCloud assets |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, tvOS 10.0+, visionOS 1.0+. The result handler may be called multiple times (progressive delivery). Use `PHCachingImageManager` instead when pre-loading large numbers of thumbnails for collection views.

## Related

- [PHCachingImageManager](./phcachingimagemanager.md)
- [PHAsset](./phasset.md)
