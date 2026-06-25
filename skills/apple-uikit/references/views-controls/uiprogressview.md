# UIProgressView

A view that depicts the progress of a task as a filled bar.

## Signature / Usage

```swift
@MainActor
class UIProgressView : UIView

let progressView = UIProgressView(progressViewStyle: .default)
progressView.progress = 0.0

// Update as task advances
progressView.setProgress(0.75, animated: true)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `progress` | `Float` | Current progress, 0.0–1.0 |
| `progressViewStyle` | `UIProgressView.Style` | Bar appearance (`.default` or `.bar`) |
| `progressTintColor` | `UIColor?` | Color for the filled portion |
| `trackTintColor` | `UIColor?` | Color for the unfilled track |
| `progressImage` | `UIImage?` | Custom image for the filled portion |
| `trackImage` | `UIImage?` | Custom image for the unfilled portion |
| `observedProgress` | `Progress?` | Binds to a `Foundation.Progress` object for automatic updates |

**Key method:**

| Method | Description |
|--------|-------------|
| `setProgress(_:animated:)` | Set progress value with optional animation |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- For indeterminate tasks (unknown duration) use `UIActivityIndicatorView` instead.
- `observedProgress` automatically updates the bar from a `Progress` object on the main thread.

## Related

- [UIActivityIndicatorView](./uiactivityindicatorview.md)
- [UIView](./uiview.md)
