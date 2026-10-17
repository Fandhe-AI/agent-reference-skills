---
source: https://developer.apple.com/documentation/imageplayground/imageplaygroundviewcontroller, https://developer.apple.com/documentation/imageplayground/imageplaygroundviewcontroller/delegate-swift.protocol
---

# ImagePlaygroundViewController

Displays a standard system interface to generate images from the provided input.

## Signature / Usage

```swift
@MainActor @objc @preconcurrency class ImagePlaygroundViewController
```

```swift
@objc(ImageGenerationViewControllerDelegate) protocol Delegate : NSObjectProtocol
```

```swift
@MainActor @preconcurrency dynamic convenience init()
@MainActor @objc @preconcurrency weak var delegate: (any ImagePlaygroundViewController.Delegate)?
@MainActor @preconcurrency var concepts: [ImagePlaygroundConcept] { get set }
```

## Options / Props

| Name | Declaration | Description |
|------|-------------|-------------|
| init() | `init()` | Creates a new image-generation view controller for you to present. |
| delegate | `weak var delegate: (any ImagePlaygroundViewController.Delegate)?` | Receives the generated image and handles events from the view controller. |
| concepts | `var concepts: [ImagePlaygroundConcept] { get set }` | Elements that describe the expected contents of the image. |
| sourceImage | `var sourceImage: UIImage? { get set }` / `var sourceImage: NSImage? { get set }` | Image used as source input. |
| selectedGenerationStyle | `var selectedGenerationStyle: ImagePlaygroundStyle { get set }` | Style to pre-select, among those in `allowedGenerationStyles`. |
| allowedGenerationStyles | `var allowedGenerationStyles: [ImagePlaygroundStyle] { get set }` | Styles to choose from in the playground. |
| options | `var options: ImagePlaygroundOptions { get set }` | Options that influence the image-generation process. |
| personalizationPolicy | `var personalizationPolicy: ImagePlaygroundPersonalizationPolicy { get set }` | Deprecated. |
| isAvailable | `@objc(available) nonisolated dynamic class var isAvailable: Bool { get }` | Whether image generation is available on the current device. |
| isModalInPresentation | `@MainActor @preconcurrency override dynamic var isModalInPresentation: Bool { get set }` | A Boolean value indicating whether the view controller enforces a modal behavior. |
| modalPresentationStyle | | The presentation style for modal view controllers. |
| preferredContentSize | `@MainActor @preconcurrency override dynamic var preferredContentSize: CGSize { get set }` | The preferred size for the view controller's view. |
| viewDidLoad() | `@MainActor @preconcurrency override dynamic func viewDidLoad()` | Called after the controller's view is loaded into memory. |
| viewWillAppear() | `@MainActor @preconcurrency override dynamic func viewWillAppear()` | Notifies the view controller that its view is about to be added to a view hierarchy. |
| viewDidDisappear() | `@MainActor @preconcurrency override dynamic func viewDidDisappear()` | Notifies the view controller that its view is about to be removed from a view hierarchy. |

Delegate methods (`ImagePlaygroundViewController.Delegate`):

| Name | Description |
|------|-------------|
| imagePlaygroundViewController(_:didCreateImageAt:) | Returns the generated image to the delegate. |
| imagePlaygroundViewControllerDidCancel(_:) | Notifies the delegate that the person canceled the generation of the image. |
| imagePlaygroundViewController(_:didCreate:) | Returns the generated genmoji to the delegate. |

## Notes

- Availability: iOS 18.1+, iPadOS 18.1+, Mac Catalyst 18.1+, macOS 15.1+, visionOS 2.4+. `selectedGenerationStyle` / `allowedGenerationStyles` / `personalizationPolicy`: iOS 18.4+, macOS 15.4+, visionOS 2.4+. `options`: iOS / iPadOS / Mac Catalyst / macOS / visionOS 26.4+.
- Create the view controller, configure it with `concepts` (text description) and optionally `sourceImage`, present it, and wait for results on the `delegate`. If the person approves the image, the view controller sends it via the delegate; the delegate is also notified on cancel.
- `sourceImage`: expected minimum size is 384 x 384 pixels, recommended maximum is 4096 x 4096 pixels. Without a source image, the system creates the new image from the prompt text.
- `allowedGenerationStyles` is expected to include `selectedGenerationStyle`. Use `ImagePlaygroundStyle.all` to list all styles and pass a subset.
- `personalizationPolicy` is deprecated: use `options` that takes an `ImagePlaygroundOptions.Personalization` instead. Its default is `.automatic`, which corresponds to `.enabled`.
- Full parameter signatures of the three delegate methods are not in the saved source (only titles and abstracts); see the official page.
- This is a UIKit / AppKit view controller; for UIKit see apple-uikit and for AppKit see apple-appkit. The SwiftUI counterpart is `imagePlaygroundSheet`.

## Related

- [imagePlaygroundSheet](./image-playground-sheet.md)
- [ImagePlaygroundConcept](./image-playground-concept.md)
- [ImagePlaygroundStyle](./image-playground-style.md)
- [ImagePlaygroundOptions](./image-playground-options.md)
- [ImagePlaygroundPersonalizationPolicy](./image-playground-personalization-policy.md)
