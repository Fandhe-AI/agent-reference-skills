# UILabel

A view that displays one or more lines of read-only text.

## Signature / Usage

```swift
@MainActor
class UILabel : UIView

let label = UILabel()
label.text = "Hello, World!"
label.font = UIFont.systemFont(ofSize: 17)
label.textColor = .label
label.textAlignment = .center
label.numberOfLines = 0          // unlimited lines
label.lineBreakMode = .byWordWrapping
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String?` | Plain text content |
| `attributedText` | `NSAttributedString?` | Styled text; overrides `text` |
| `font` | `UIFont!` | Font applied to the label |
| `textColor` | `UIColor!` | Text color |
| `textAlignment` | `NSTextAlignment` | Horizontal alignment (`.left`, `.center`, `.right`, `.natural`, `.justified`) |
| `numberOfLines` | `Int` | Max lines; `0` = unlimited |
| `lineBreakMode` | `NSLineBreakMode` | Wrapping / truncation strategy |
| `adjustsFontSizeToFitWidth` | `Bool` | Shrinks font to fit width when `true` |
| `minimumScaleFactor` | `CGFloat` | Minimum font scale factor (0.0–1.0) when shrinking |
| `allowsDefaultTighteningForTruncation` | `Bool` | Tightens character spacing before truncating |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Setting `attributedText` ignores separately set `font`, `textColor`, etc.—attributes in the string take precedence.
- With Auto Layout, the intrinsic content size reflects single-line width; constrain the width to enable multi-line expansion.
- Use Dynamic Type text styles (e.g., `UIFont.preferredFont(forTextStyle: .body)`) to respect user font-size preferences.

## Related

- [UIView](./uiview.md)
- [UITextField](./uitextfield.md)
- [UITextView](./uitextview.md)
