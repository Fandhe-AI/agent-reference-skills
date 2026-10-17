---
source: https://developer.apple.com/documentation/swiftui/view/imageplaygroundsheet(ispresented:concept:sourceimage:oncompletion:oncancellation:), https://developer.apple.com/documentation/swiftui/view/imageplaygroundsheet(ispresented:concepts:sourceimage:oncompletion:oncancellation:), https://developer.apple.com/documentation/swiftui/view/imageplaygroundsheet(ispresented:concepts:sourceimageurl:oncompletion:oncancellation:)
---

# imagePlaygroundSheet(isPresented:...) (SwiftUI)

SwiftUI view modifier that presents the system sheet to create an image from a text description, one or more concepts, and an optional starting image.

## Signature / Usage

```swift
@MainActor @preconcurrency func imagePlaygroundSheet(isPresented: Binding<Bool>, concept: String, sourceImage: Image? = nil, onCompletion: @escaping (URL) -> Void, onCancellation: (() -> Void)? = nil) -> some View
```

```swift
@MainActor @preconcurrency func imagePlaygroundSheet(isPresented: Binding<Bool>, concepts: [ImagePlaygroundConcept] = [], sourceImage: Image? = nil, onCompletion: @escaping (URL) -> Void, onCancellation: (() -> Void)? = nil) -> some View
```

```swift
@MainActor @preconcurrency func imagePlaygroundSheet(isPresented: Binding<Bool>, concepts: [ImagePlaygroundConcept] = [], sourceImageURL: URL, onCompletion: @escaping (URL) -> Void, onCancellation: (() -> Void)? = nil) -> some View
```

```swift
@State private var showSheet = false
@State private var createdImageURL: URL? = nil
@Environment(\.supportsImagePlayground) private var supportsImagePlayground
// ....

if supportsImagePlayground {
  Button("Show Generation Sheet") {
    showSheet = true
  }.imagePlaygroundSheet(
      isPresented: $showSheet,
      concept: "Dog on a surfboard",
      sourceImage: sourceImage) { url in
      createdImageURL = url
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| isPresented | Binding<Bool> | Controls whether the sheet is shown. |
| concept | String | Text description of the image (single-string overload). |
| concepts | [ImagePlaygroundConcept] | One or more concepts describing the image; defaults to `[]`. |
| sourceImage | Image? | Optional starting image (SwiftUI `Image`); defaults to `nil`. |
| sourceImageURL | URL | Starting image URL (required in the URL overload). |
| onCompletion | (URL) -> Void | Called with the URL of the generated image. |
| onCancellation | (() -> Void)? | Called when the person cancels; defaults to `nil`. |

## Notes

- Availability: iOS 18.1+, iPadOS 18.1+, Mac Catalyst 18.1+, macOS 15.1+, visionOS 2.4+.
- The sheet gives the person controls to modify the image before returning it to the app. When the sheet is dismissed, the system runs one of the provided blocks; use the completion block to integrate the generated image into the app.
- The modifier works only on devices that support creating new images. Check the `supportsImagePlayground` environment value before showing the button.
- Three overloads are covered here (`concept:` + `sourceImage:`, `concepts:` + `sourceImage:`, `concepts:` + `sourceImageURL:`). The official See Also list also names overloads with `onAdaptiveImageGlyphCreation:` and a `concept:` + `sourceImageURL:` form; they are not covered on this page.
- Related SwiftUI modifiers listed in the official See Also: `imagePlaygroundGenerationStyle(_:in:)`, `imagePlaygroundOptions(_:)`.
- This is a `View` extension of SwiftUI; for the SwiftUI view layer itself see apple-swiftui. The UIKit / AppKit counterpart is `ImagePlaygroundViewController`.

## Related

- [ImagePlaygroundViewController](./image-playground-view-controller.md)
- [ImagePlaygroundConcept](./image-playground-concept.md)
- [ImagePlaygroundOptions](./image-playground-options.md)
- [ImagePlaygroundStyle](./image-playground-style.md)
