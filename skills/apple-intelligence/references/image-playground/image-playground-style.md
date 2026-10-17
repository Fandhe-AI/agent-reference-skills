---
source: https://developer.apple.com/documentation/imageplayground/imageplaygroundstyle
---

# ImagePlaygroundStyle

Style options that determine the appearance of generated images.

## Signature / Usage

```swift
struct ImagePlaygroundStyle
```

```swift
static let any: ImagePlaygroundStyle
static let externalProvider: ImagePlaygroundStyle
static var all: [ImagePlaygroundStyle] { get }
let id: String
```

## Options / Props

| Name | Description |
|------|-------------|
| animation | `static let animation` Yields animated images. |
| illustration | `static let illustration` Yields images in a 2D cartoon style. |
| sketch | `static let sketch` Yields images in the style of a hand-drawn sketch. |
| all | `static var all: [ImagePlaygroundStyle] { get }` Allows the creation of images in any style. |
| id | `let id: String` Text-based description of the style option. |
| any | `static let any` Yields images in a style inferred from the prompt (iOS / iPadOS / Mac Catalyst / macOS / visionOS 27.0+). |
| emoji | `static let emoji` Yields images in an emoji style. |
| externalProvider | `static let externalProvider` Yields images in a style provided by an external provider (iOS / iPadOS / Mac Catalyst / macOS / visionOS 26.0+). |

## Notes

- Availability: iOS 18.4+, iPadOS 18.4+, Mac Catalyst 18.4+, macOS 15.4+, visionOS 2.4+.
- When creating images programmatically, the generative model applies the requested style to the content it generates.
- Used with `ImagePlaygroundViewController.selectedGenerationStyle` / `allowedGenerationStyles`.

## Related

- [ImagePlaygroundConcept](./image-playground-concept.md)
- [ImagePlaygroundViewController](./image-playground-view-controller.md)
