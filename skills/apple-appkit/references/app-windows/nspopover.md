# NSPopover

A means to display additional content related to existing content on the screen.

## Signature / Usage

```swift
class NSPopover : NSResponder

func show(relativeTo: NSToolbarItem)
func performClose(_ sender: Any?)
func close()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `contentViewController` | `NSViewController?` | The view controller that manages the popover content |
| `contentSize` | `NSSize` | The content size of the popover |
| `behavior` | `NSPopover.Behavior` | The appearance and disappearance behavior |
| `animates` | `Bool` | Whether the popover is animated |
| `appearance` | `NSAppearance?` | The appearance of the popover |
| `effectiveAppearance` | `NSAppearance` | The appearance used when displayed onscreen |
| `hasFullSizeContent` | `Bool` | Whether the content view extends into the arrow region |
| `positioningRect` | `NSRect` | The rectangle within the positioning view relative to which the popover is positioned |
| `isShown` | `Bool` | The display state of the popover |
| `isDetached` | `Bool` | Whether the window created by the popover's detachment is automatically created |
| `delegate` | `(any NSPopoverDelegate)?` | Delegate for show/close/detach callbacks |
| `show(relativeTo:ofView:preferredEdge:)` | method | Shows the popover anchored to the specified view (ObjC: `showRelativeToRect:ofView:preferredEdge:`) |
| `show(relativeTo: NSToolbarItem)` | method | Shows the popover anchored to the specified toolbar item |
| `performClose(_:)` | method | Attempts to close the popover |
| `close()` | method | Forces the popover to close without consulting its delegate |

## Notes

- macOS 10.7+. Inherits from `NSResponder`.
- The system positions the popover relative to its positioning view and moves it whenever the view moves.
- A popover can be detached into a separate window by dragging when the appropriate delegate method is implemented.
- `NSPopover.Appearance` enum is marked deprecated; use `appearance` with `NSAppearance`.
- Related types: `NSPopover.CloseReason`, `NSPopover.DidShowMessage`, `DidCloseMessage`, `WillShowMessage`, `WillCloseMessage`, `closeReasonUserInfoKey`.

## Related

- [NSResponder](./nsresponder.md)
- [NSViewController](./nsviewcontroller.md)
- [NSToolbarItem](./nstoolbaritem.md)
