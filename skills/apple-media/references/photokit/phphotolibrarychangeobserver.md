# PHPhotoLibraryChangeObserver

Protocol that notifies your app of changes to the photo library, whether made by your app, the Photos app, or any other app using the Photos framework.

## Signature / Usage

```swift
class MyViewController: UIViewController, PHPhotoLibraryChangeObserver {

    var fetchResult: PHFetchResult<PHAsset>!

    override func viewDidLoad() {
        super.viewDidLoad()
        fetchResult = PHAsset.fetchAssets(with: nil)
        PHPhotoLibrary.shared().register(self)
    }

    deinit {
        PHPhotoLibrary.shared().unregisterChangeObserver(self)
    }

    func photoLibraryDidChange(_ changeInstance: PHChange) {
        guard let changes = changeInstance.changeDetails(for: fetchResult) else { return }
        DispatchQueue.main.async {
            self.fetchResult = changes.fetchResultAfterChanges
            if changes.hasIncrementalChanges {
                self.collectionView.performBatchUpdates({
                    if let removed = changes.removedIndexes {
                        self.collectionView.deleteItems(at: removed.map { IndexPath(item: $0, section: 0) })
                    }
                    if let inserted = changes.insertedIndexes {
                        self.collectionView.insertItems(at: inserted.map { IndexPath(item: $0, section: 0) })
                    }
                })
            } else {
                self.collectionView.reloadData()
            }
        }
    }
}
```

## Options / Props

| Member | Description |
|--------|-------------|
| `photoLibraryDidChange(_:)` | **Required.** Called on a background queue when the library changes. |
| `PHChange.changeDetails(for:)` | Returns `PHObjectChangeDetails` (metadata changes) or `PHFetchResultChangeDetails` (list changes) |
| `PHFetchResultChangeDetails.fetchResultAfterChanges` | Updated fetch result to replace the old one |
| `PHFetchResultChangeDetails.hasIncrementalChanges` | `true` when inserted/removed/moved index sets are available |

**Registration:**

```swift
PHPhotoLibrary.shared().register(observer)       // subscribe
PHPhotoLibrary.shared().unregisterChangeObserver(observer) // unsubscribe
```

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, tvOS 10.0+, visionOS 1.0+. `photoLibraryDidChange(_:)` is called on a **background queue**; dispatch UI updates to the main queue. Always unregister the observer before the object is deallocated.

## Related

- [PHPhotoLibrary](./phphotolibrary.md)
- [PHFetchResult](./phfetchresult.md)
