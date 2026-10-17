---
source: https://developer.apple.com/documentation/imageplayground/imagecreator
---

# ImageCreator (deprecated)

Generates images programmatically from the description and style information you specify. Deprecated as of 27.0.

## Signature / Usage

```swift
final class ImageCreator
```

```swift
init() async throws
final func images(for concepts: [ImagePlaygroundConcept], style: ImagePlaygroundStyle, limit: Int) -> some AsyncSequence<ImageCreator.CreatedImage, any Error>
final func images(for concepts: [ImagePlaygroundConcept], style: ImagePlaygroundStyle, options: ImagePlaygroundOptions, limit: Int) -> some AsyncSequence<ImageCreator.CreatedImage, any Error>
final let availableStyles: [ImagePlaygroundStyle]
```

```swift
do {
    let creator = try await ImageCreator()
    guard let style = creator.availableStyles.first else { return }

    let images = creator.images(
        for: [.text("A cat wearing mittens.")]
        style: style,
        limit: 4)

    // Receive the images.
    for try await image in images {
        let anImage = image.cgImage

        // Do something with the image.
    }
}
catch ImageCreator.Error.notSupported {
    print(“Image creation not supported on the current device.”)
}
```

## Options / Props

| Name | Description |
|------|-------------|
| init() | Creates a new image creator; throws if the device does not support image creation or the feature is currently unavailable. |
| images(for:style:limit:) | Starts image creation from concepts and a style; results arrive asynchronously as an `AsyncSequence`. |
| images(for:style:options:limit:) | Same, with `ImagePlaygroundOptions` (iOS / iPadOS / Mac Catalyst / macOS / visionOS 26.4+). |
| availableStyles | Styles you can apply to the images you create. |
| ImageCreator.CreatedImage | Struct that stores a generated image; exposes `cgImage`. Cannot be created by the app. |
| ImageCreator.Error | Cases: `notSupported`, `unavailable`, `creationCancelled`, `faceInImageTooSmall`, `unsupportedLanguage`, `unsupportedInputImage`, `backgroundCreationForbidden`, `creationFailed`, `conceptsRequirePersonIdentity`. |

## Notes

- Availability: iOS 18.4+, iPadOS 18.4+, Mac Catalyst 18.4+, macOS 15.4+, visionOS 2.4+. Deprecated at 27.0 on all platforms (members also marked deprecated).
- Deprecation message: "Use ImagePlaygroundViewController or imagePlaygroundSheet."
- The official page documents deprecation only; it does not state that the API stops working in iOS 27.
- Per the `init()` page: `ImageCreator.Error.notSupported` on iOS 27.0+, macOS 27.0+, and visionOS 27.0+.
- Image generation occurs asynchronously and returns results through an `AsyncSequence`.

## Related

- [ImagePlaygroundConcept](./image-playground-concept.md)
- [ImagePlaygroundStyle](./image-playground-style.md)
- [ImagePlaygroundOptions](./image-playground-options.md)
- [ImagePlaygroundViewController](./image-playground-view-controller.md)
- [imagePlaygroundSheet](./image-playground-sheet.md)
