# Updating views automatically with observation tracking in AppKit

Use Swift Observation and automatic tracking to update your views in response to model data updates.

## Signature / Usage

```swift
@Observable
class MessageModel {
    var showStatus: Bool
    var statusText: String
}
```

```swift
override func viewWillLayout() {
    super.viewWillLayout()
    statusLabel.alphaValue = model.showStatus ? 1.0 : 0.0
    statusLabel.stringValue = model.statusText
}
```

Custom cell drawing is tracked as well:

```swift
@Observable
class SliderAppearance {
    var knobColor: NSColor
    var trackColor: NSColor
}

class CustomSliderCell: NSSliderCell {
    var appearance: SliderAppearance

    override func drawKnob(_ knobRect: NSRect) {
        appearance.knobColor.setFill()
        NSBezierPath(ovalIn: knobRect).fill()
    }

    override func drawBar(inside rect: NSRect, flipped: Bool) {
        appearance.trackColor.setFill()
        NSBezierPath(roundedRect: rect, xRadius: 2, yRadius: 2).fill()
    }
}
```

## Notes

- Mark models with the `Observable` macro (Swift Observation). When combined with AppKit, the system watches for property changes and updates views; no manual invalidation is needed.
- Methods where automatic tracking happens: in a view subclass, `updateConstraints()`, `layout()` and `draw(_:)` track any `Observable` properties read, and AppKit updates the view when those properties change. `NSViewController.viewWillLayout()` also tracks `Observable` properties and updates views when they change; `NSView.layout()` can be used in a custom view.
- Drawing: `Observable` properties read inside a `draw(_:)` override (and any methods it calls) are tracked; on change AppKit invalidates and redraws the view. This covers cell subclass overrides such as `NSSliderCell.drawKnob(_:)` and `drawBar(inside:flipped:)`.
- macOS 15: the system does not enable automatic observation tracking by default. Add the `NSObservationTrackingEnabled` key to the app's information property list and set it to `true`.
- Related documentation on the source page: `NSViewController.viewWillLayout()`, `NSViewController.updateViewConstraints()`, `NSView.draw(_:)`, `NSView.layout()`, `NSView.updateConstraints()`, `NSView.updateLayer()`.
- Distinct from SwiftUI's built-in observation of `@Observable` models (see apple-swiftui).
- The code listings above are verbatim excerpts from the source article and omit initialization: in real code, give the stored properties of `MessageModel` / `SliderAppearance` default values or an initializer, and initialize `CustomSliderCell.appearance` (for example in `init` or as a default value).
- Source: https://developer.apple.com/documentation/appkit/updating-views-automatically-with-observation-tracking-in-appkit

## Related

- [NSView](./nsview.md)
- [NSSlider](./nsslider.md)
