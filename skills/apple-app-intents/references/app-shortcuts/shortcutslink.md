---
source: https://developer.apple.com/documentation/appintents/shortcutslink
---

# ShortcutsLink / ShortcutsLinkStyle

`ShortcutsLink` is a button that brings users to the current app’s App Shortcuts page in the Shortcuts app. `ShortcutsLinkStyle` holds the styles to apply to buttons you use to open your app’s page in the Shortcuts app.

## Signature / Usage

```swift
@MainActor @preconcurrency struct ShortcutsLink

init(action: () -> Void)
```

Create a button by calling the initializer with an additional closure, which gets called whenever the button is tapped before opening the Shortcuts app.

```swift
ShortcutsLink(action: handleTap)
    .shortcutsLinkStyle(.dark)
```

`ShortcutsLinkStyle` (declaration from the symbol reference):

```swift
struct ShortcutsLinkStyle
```

## Options / Props

| `ShortcutsLinkStyle` style | Description |
|-------|-------------|
| automatic | The default button style, based on the current color scheme. |
| automaticOutline | The default button style with an outline, based on the current color scheme. |
| dark | A button style that applies a dark background with light text. |
| darkOutline | A button style that applies a dark background with light text along with a light outline. |
| light | A button style that applies a light background with dark text. |
| lightOutline | A button style that applies a light background with dark text along with a dark outline. |

## Notes

- The Options / Props table lists the `ShortcutsLinkStyle` members under “Getting the styles”.
- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, visionOS (no introduced version listed). `ShortcutsLinkStyle`: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+.
- Conforms to `View`, `Sendable`, `SendableMetatype`. The `.shortcutsLinkStyle(_:)` modifier call is shown in the page’s snippet; its own symbol page is not part of this set.
- SwiftUI view; `View` and `Button` themselves belong to apple-swiftui.

## Related

- [ShortcutsUIButton](./shortcutsuibutton.md)
- [SiriTipView / SiriTipViewStyle](./siritipview.md)
