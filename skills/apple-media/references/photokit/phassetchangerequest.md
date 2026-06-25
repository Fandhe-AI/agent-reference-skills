# PHAssetChangeRequest

Creates, deletes, or modifies Photos assets within a photo library change block. Acts as the mutable counterpart to the immutable `PHAsset`.

## Signature / Usage

```swift
// Toggle favorite
PHPhotoLibrary.shared().performChanges({
    let request = PHAssetChangeRequest(for: asset)
    request.isFavorite = !asset.isFavorite
}, completionHandler: { success, error in
    if !success { print(error!.localizedDescription) }
})

// Create asset from UIImage
PHPhotoLibrary.shared().performChanges({
    PHAssetChangeRequest.creationRequestForAsset(from: uiImage)
})

// Delete assets
PHPhotoLibrary.shared().performChanges({
    PHAssetChangeRequest.deleteAssets([asset] as NSArray)
})
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(for:)` | Initializer | Creates a change request for an existing `PHAsset` |
| `creationRequestForAsset(from:)` | Class method | Creates a new asset from a `UIImage` |
| `creationRequestForAssetFromImage(atFileURL:)` | Class method | Creates a new asset from an image file URL |
| `creationRequestForAssetFromVideo(atFileURL:)` | Class method | Creates a new asset from a video file URL |
| `deleteAssets(_:)` | Class method | Deletes the specified assets |
| `isFavorite` | `Bool` | Marks the asset as a user favorite |
| `isHidden` | `Bool` | Hides the asset from collections |
| `creationDate` | `Date?` | Sets the original creation date |
| `location` | `CLLocation?` | Sets the GPS location |
| `contentEditingOutput` | `PHContentEditingOutput?` | Attaches editing output to be applied |
| `placeholderForCreatedAsset` | `PHObjectPlaceholder?` | Proxy for a newly created asset (available after the change block) |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.15+, tvOS 10.0+, visionOS 1.0+. Change requests must be created and used **only** inside `PHPhotoLibrary.performChanges` or `performChangesAndWait`; using them outside raises an Objective-C exception.

## Related

- [PHPhotoLibrary](./phphotolibrary.md)
- [PHAsset](./phasset.md)
