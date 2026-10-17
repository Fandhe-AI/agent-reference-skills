# NSBackgroundExtensionView

A view that extends content to fill its own bounds.

## Signature / Usage

```swift
class NSBackgroundExtensionView : NSView
```

```swift
var automaticallyPlacesContentView: Bool { get set }
var contentView: NSView? { get set }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `contentView` | `NSView?` | The content view to extend to fill the `NSBackgroundExtensionView`. |
| `automaticallyPlacesContentView` | `Bool` | Controls the automatic safe area placement of the `contentView` within the container. |

## Notes

- Platform: macOS 26.0+.
- A background extension view can be laid out to extend outside the safe area, such as under the titlebar, sidebar, or inspector.
- By default it lays out its content to stay within the safe area, and uses modifications of the content along the edges to fill the container view.
- Source: https://developer.apple.com/documentation/appkit/nsbackgroundextensionview

## Related

- [NSView](./nsview.md)
- [NSSplitView](./nssplitview.md)
