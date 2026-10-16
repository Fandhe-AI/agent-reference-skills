---
source: https://developer.apple.com/documentation/appintents/siritipuiview
---

# SiriTipUIView

A view that displays the phrase a person uses to invoke an App Shortcut. UIKit counterpart of `SiriTipView`.

## Signature / Usage

Create the view with a `SiriTipViewStyle`, call `setIntent(intent:)` with an `AppIntent`, then add it to a UIKit view hierarchy.

```swift
@MainActor @objc @preconcurrency final class SiriTipUIView
```

Members:

```swift
init(style: SiriTipViewStyle)
var style: SiriTipViewStyle
var allowsDismissal: Bool
var isPresented: Bool
var intrinsicContentSize: CGSize
func setIntent<Intent>(intent: Intent)
func didMoveToWindow()
func sizeThatFits(CGSize) -> CGSize
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| style | SiriTipViewStyle | The style to use for the view |
| allowsDismissal | Bool | Indicates if the tip view should display a dismissal button |
| isPresented | Bool | Determines if the view should be presented to the user |

## Notes

- Availability: iOS 16.0+, iPadOS 16.0+. visionOS is listed as a supported platform; the source gives no introduced version for it. The declaration also lists Mac Catalyst.
- You must call `setIntent(intent:)` before displaying the view (“Sets an AppIntent for this view. This must be called before presenting the view.”).
- Inherits from `UIView`. UIKit view; `UIView` itself belongs to apple-uikit.

## Related

- [SiriTipView / SiriTipViewStyle](./siritipview.md)
