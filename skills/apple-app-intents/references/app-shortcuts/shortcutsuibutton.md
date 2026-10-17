---
source: https://developer.apple.com/documentation/appintents/shortcutsuibutton
---

# ShortcutsUIButton

A button that opens the current app’s page in the Shortcuts app. UIKit counterpart of `ShortcutsLink`.

## Signature / Usage

```swift
@MainActor @objc @preconcurrency final class ShortcutsUIButton
```

Members:

```swift
init(style: ShortcutsLinkStyle)
var style: ShortcutsLinkStyle
func addTarget(Any?, action: Selector, for: UIControl.Event)
func sizeThatFits(CGSize) -> CGSize
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| style | ShortcutsLinkStyle | The style to use for the button |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, visionOS (no introduced version listed).
- Inherits from `UIButton`. You can add additional targets to observe when the button is tapped (`addTarget(_:action:for:)`).
- UIKit button; for the SwiftUI equivalent see `ShortcutsLink`. `UIButton` itself belongs to apple-uikit.

## Related

- [ShortcutsLink / ShortcutsLinkStyle](./shortcutslink.md)
