# PhotosPickerItem

A struct representing a selected item from `PhotosPicker`. Used to asynchronously load the underlying image or video data.

## Signature / Usage

```swift
// Async/await style (preferred)
if let image = try? await pickerItem.loadTransferable(type: Image.self) {
    self.selectedImage = image
}

// Completion handler style (with progress tracking)
let progress = pickerItem.loadTransferable(type: Image.self) { result in
    DispatchQueue.main.async {
        switch result {
        case .success(let image?):
            self.selectedImage = image
        case .success(nil):
            break // no data
        case .failure(let error):
            print(error)
        }
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `loadTransferable(type:)` | `async throws -> T?` | Loads the item as the specified `Transferable` type |
| `loadTransferable(type:completionHandler:)` | `Progress` | Completion-handler variant; returns a cancellable `Progress` |
| `itemIdentifier` | `String?` | Local identifier of the item in the photo library |
| `supportedContentTypes` | `[UTType]` | Content types the item can provide, ordered by preference |

## Notes

iOS 16.0+, iPadOS 16.0+, macOS 13.0+, watchOS 9.0+, visionOS 1.0+. SwiftUI's built-in `Image` `Transferable` conformance only decodes PNG. For JPEG, HEIF, or video, define a custom `Transferable` model (e.g., wrapping `Data`). Loading may fail if the asset is in iCloud and the network is unavailable.

## Related

- [PhotosPicker](./photospicker.md)
