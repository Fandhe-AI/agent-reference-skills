# NSSplitViewItemAccessoryViewController

A view controller for an accessory view attached to the top or bottom of an `NSSplitViewItem`.

## Signature / Usage

```swift
class NSSplitViewItemAccessoryViewController : NSViewController

// Attach to a split view item
splitViewItem.addTopAlignedAccessoryViewController(accessory)
splitViewItem.addBottomAlignedAccessoryViewController(accessory)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `preferredScrollEdgeEffectStyle` | `NSScrollEdgeEffectStyle` | The accessory's preferred effect for content scrolling behind it |
| `automaticallyAppliesContentInsets` | `Bool` | Whether standard content insets are applied to the view. Defaults to YES |
| `isHidden` | `Bool` | Collapses the accessory view to 0 height (animatable) without removing it from the window. Set through the animator object to animate |
| `viewWillAppear()` / `viewDidAppear()` | methods | Appearance callbacks |
| `viewWillDisappear()` / `viewDidDisappear()` | methods | Disappearance callbacks |

## Notes

- macOS 26.0+.
- Inherits from `NSViewController`.
- Attach through the accessory APIs on `NSSplitViewItem` (`topAlignedAccessoryViewControllers`, `bottomAlignedAccessoryViewControllers`, and add/insert/remove methods).

## Related

- [NSSplitViewItem](./nssplitviewitem.md)
- [NSViewController](./nsviewcontroller.md)
