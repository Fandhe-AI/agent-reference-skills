# UIActivityIndicatorView

A view that shows a spinning animation to indicate that a task is in progress.

## Signature / Usage

```swift
@MainActor
class UIActivityIndicatorView : UIView

let spinner = UIActivityIndicatorView(style: .medium)
spinner.hidesWhenStopped = true
spinner.startAnimating()
view.addSubview(spinner)

// Stop when task completes
spinner.stopAnimating()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `style` | `UIActivityIndicatorView.Style` | Visual size and color style (`.medium`, `.large`, `.mediumWhite`, `.large White`, `.gray`—legacy styles deprecated) |
| `color` | `UIColor!` | Custom indicator color, overriding the style's default |
| `isAnimating` | `Bool` | Read-only; `true` while animation is running |
| `hidesWhenStopped` | `Bool` | Automatically hides the view when not animating (default `true`) |

**Control methods:**

| Method | Description |
|--------|-------------|
| `startAnimating()` | Starts the spin animation |
| `stopAnimating()` | Stops the spin animation |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- For tasks with known completion fraction, use `UIProgressView` instead.
- Must be accessed on the main thread (`@MainActor`).

## Related

- [UIProgressView](./uiprogressview.md)
- [UIView](./uiview.md)
