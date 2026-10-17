---
source: https://developer.apple.com/documentation/appintents/siritipview
---

# SiriTipView / SiriTipViewStyle

A SwiftUI view that displays the phrase someone uses to invoke an App Shortcut. `SiriTipViewStyle` holds the styles to apply to the tip views you use to display spoken phrases.

## Signature / Usage

```swift
@MainActor @preconcurrency struct SiriTipView

init<Intent>(intent: Intent, isVisible: Binding<Bool>?)
```

Include an instance of your intent when you create the view, and bind the view to a Boolean to handle the view’s presentation. The following example configures a reorder intent and binds it to an `isVisible` variable.

```swift
SiriTipView(intent: ReorderIntent(), isVisible: $isVisible)
    .siriTipViewStyle(.dark)
```

`SiriTipViewStyle` (declaration from the symbol reference):

```swift
struct SiriTipViewStyle
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| intent | Intent | The app intent whose phrase is displayed |
| isVisible | Binding<Bool>? | Displays the view when true |
| `SiriTipViewStyle.automatic`, `SiriTipViewStyle.dark`, `SiriTipViewStyle.light` | SiriTipViewStyle | Members listed under “Getting the styles”. |

## Notes

- `SiriTipViewStyle` is applied with the `siriTipViewStyle(_:)` view modifier (“Sets the given style for SiriTipView within the view hierarchy”).
- `SiriTipView`: iOS 16.0+, iPadOS 16.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no introduced version listed). `SiriTipViewStyle`: same set without visionOS.
- You must use the `AppIntent` in an `AppShortcut`. Otherwise this will display an empty view.
- Conforms to `View`, `Sendable`, `SendableMetatype`.
- SwiftUI view; `View` and `Button` themselves belong to apple-swiftui. UIKit counterpart: `SiriTipUIView`.

## Related

- [SiriTipUIView](./siritipuiview.md)
- [AppShortcut](./appshortcut.md)
- [ShortcutsLink / ShortcutsLinkStyle](./shortcutslink.md)
