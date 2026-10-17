---
source: https://developer.apple.com/documentation/imageplayground/imageplaygroundoptions
---

# ImagePlaygroundOptions

A type that stores the options that affect the image-generation process.

## Signature / Usage

```swift
struct ImagePlaygroundOptions
```

```swift
init()
var creationStrategy: ImagePlaygroundOptions.CreationStrategy
var creationVariety: ImagePlaygroundOptions.CreationVariety
var personalization: ImagePlaygroundOptions.Personalization
var sizeSpecification: ImagePlaygroundOptions.SizeSpecification
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| creationStrategy | ImagePlaygroundOptions.CreationStrategy | How to interpret the content in the provided input image. Cases: `automatic` (system selects), `editExisting` (closely resembles the original image plus your modifications), `generateNew` (new image driven primarily by the concepts, loosely inspired by the input image). |
| creationVariety | ImagePlaygroundOptions.CreationVariety | Amount to vary creation parameters when generating multiple images from the same inputs. Cases: `automatic`, `high`, `low`. Applies only when creating multiple images at once. |
| personalization | ImagePlaygroundOptions.Personalization | Enable or disable personalization features. Cases: `automatic`, `disabled`, `enabled`. |
| sizeSpecification | ImagePlaygroundOptions.SizeSpecification | Requested size for generated images. |

`ImagePlaygroundOptions.SizeSpecification` is created with the static `closest(to:)` method, which returns a supported size that most closely matches the requested resolution and aspect ratio.

## Notes

- Availability: iOS 26.4+, iPadOS 26.4+, Mac Catalyst 26.4+, macOS 26.4+, visionOS 26.4+. `CreationStrategy` and `SizeSpecification`: 27.0+ on the same platforms; `CreationVariety` and `Personalization`: 26.4+.
- Apply options to a SwiftUI sheet with the `imagePlaygroundOptions(_:)` modifier, or assign them to the `options` property of `ImagePlaygroundViewController` or `ImageCreator` before generating images.
- Personalization lets the system derive the appearance of people from additional sources such as the Photos library; disabled, the system uses only the provided prompts and starting image.
- The framework supports a finite set of image sizes and aspect ratios.

## Related

- [ImagePlaygroundViewController](./image-playground-view-controller.md)
- [imagePlaygroundSheet](./image-playground-sheet.md)
- [ImagePlaygroundPersonalizationPolicy](./image-playground-personalization-policy.md)
- [ImageCreator (deprecated)](./image-creator.md)
