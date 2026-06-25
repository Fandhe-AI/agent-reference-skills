# PhotosPicker

SwiftUI view that presents a system Photos picker interface for selecting images and videos. Part of the PhotosUI framework.

## Signature / Usage

```swift
import SwiftUI
import PhotosUI

struct ContentView: View {
    @State private var selectedItems: [PhotosPickerItem] = []
    @State private var selectedImages: [Image] = []

    var body: some View {
        PhotosPicker(
            selection: $selectedItems,
            maxSelectionCount: 5,
            matching: .images
        ) {
            Label("Select Photos", systemImage: "photo.on.rectangle")
        }
        .onChange(of: selectedItems) { _, items in
            Task {
                selectedImages = []
                for item in items {
                    if let image = try? await item.loadTransferable(type: Image.self) {
                        selectedImages.append(image)
                    }
                }
            }
        }
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `selection` | `Binding<PhotosPickerItem?>` or `Binding<[PhotosPickerItem]>` | Single or multiple selection binding |
| `maxSelectionCount` | `Int?` | Max number of items; `nil` means system default |
| `selectionBehavior` | `PhotosPickerSelectionBehavior` | `.default`, `.ordered`, or `.continuous` |
| `matching` | `PHPickerFilter?` | Filter for displayed content (`.images`, `.videos`, `.any(of:)`, `.not(_:)`) |
| `preferredItemEncoding` | `PhotosPickerItem.EncodingDisambiguationPolicy` | How to resolve ambiguous encoding formats |
| `photoLibrary` | `PHPhotoLibrary` | Custom photo library source; defaults to `PHPhotoLibrary.shared()` |
| `label` | `() -> Label` | View used as the picker's trigger button |

## Notes

iOS 16.0+, iPadOS 16.0+, macOS 13.0+, watchOS 9.0+, visionOS 1.0+. SwiftUI's `Image` `Transferable` conformance only supports PNG; use a custom `Transferable` model to handle JPEG and other formats. Network errors may occur when loading iCloud assets.

## Related

- [PhotosPickerItem](./photospickeritem.md)
