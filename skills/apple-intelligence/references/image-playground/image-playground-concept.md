---
source: https://developer.apple.com/documentation/imageplayground/imageplaygroundconcept
---

# ImagePlaygroundConcept

Text elements that specify the content to include in the image.

## Signature / Usage

```swift
struct ImagePlaygroundConcept
```

```swift
static func text(_ text: String) -> ImagePlaygroundConcept
static func extracted(from text: String, title: String? = nil) -> ImagePlaygroundConcept
static func drawing(_ drawing: PKDrawing) -> ImagePlaygroundConcept
static func image(_ image: CGImage) -> ImagePlaygroundConcept
static func image(_ url: URL) -> ImagePlaygroundConcept?
```

## Options / Props

| Name | Description |
|------|-------------|
| text(_:) | Short text description. Short strings are passed in their entirety as input to the diffusion model; long strings are reduced to relevant details. |
| extracted(from:title:) | Long-form string plus a title that guides the extraction of concepts. |
| drawing(_:) | From a PencilKit drawing. Typically combined with text concepts; include at most one drawing, more yields unpredictable results. |
| image(_:) (CGImage) | From an image object. Include at most one image among the concepts. |
| image(_:) (URL) | From the image at a URL; returns `nil`-able `ImagePlaygroundConcept?`. Include at most one image among the concepts. |

## Notes

- Availability: iOS 18.1+, iPadOS 18.1+, Mac Catalyst 18.1+, macOS 15.1+, visionOS 2.4+.
- Used by `imagePlaygroundSheet(isPresented:concepts:...)`, `ImagePlaygroundViewController.concepts` and (deprecated) `ImageCreator.images(for:style:limit:)`.

## Related

- [imagePlaygroundSheet](./image-playground-sheet.md)
- [ImagePlaygroundViewController](./image-playground-view-controller.md)
- [ImagePlaygroundStyle](./image-playground-style.md)
