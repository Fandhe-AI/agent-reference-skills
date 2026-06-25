# UIImageView

A view that displays a single image or an animated sequence of images.

## Signature / Usage

```swift
@MainActor
class UIImageView : UIView

let imageView = UIImageView(image: UIImage(named: "photo"))
imageView.contentMode = .scaleAspectFit
imageView.clipsToBounds = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `image` | `UIImage?` | The image currently displayed |
| `highlightedImage` | `UIImage?` | Image shown when `isHighlighted` is `true` |
| `isHighlighted` | `Bool` | Displays `highlightedImage` when `true` |
| `animationImages` | `[UIImage]?` | Image sequence for frame animation |
| `highlightedAnimationImages` | `[UIImage]?` | Animation images for highlighted state |
| `animationDuration` | `TimeInterval` | Duration of one full animation cycle |
| `animationRepeatCount` | `Int` | Number of repetitions; `0` = loop forever |
| `isAnimating` | `Bool` | Read-only; `true` while animation is running |
| `isUserInteractionEnabled` | `Bool` | Defaults to `false`; set `true` to receive touch events |
| `contentMode` | `UIView.ContentMode` | Scaling strategy (`.scaleAspectFit`, `.scaleAspectFill`, `.scaleToFill`, etc.) |

**Animation control:**

| Method | Description |
|--------|-------------|
| `startAnimating()` | Begins the frame animation |
| `stopAnimating()` | Stops the frame animation |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Set `isOpaque = true` when the image has no transparency to avoid expensive compositing.
- All images in an animation sequence must have the same size and scale factor.
- For SF Symbol animations use `addSymbolEffect(_:)` and `setSymbolImage(_:contentTransition:)`.

## Related

- [UIView](./uiview.md)
- [UIProgressView](./uiprogressview.md)
