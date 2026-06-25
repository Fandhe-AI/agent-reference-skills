# SKLabelNode

A node that renders a text string in a SpriteKit scene, styled via font properties or `NSAttributedString`.

## Signature / Usage

```swift
let label = SKLabelNode(text: "Score: 0")
label.fontName = "AvenirNext-Bold"
label.fontSize = 32
label.fontColor = .white
label.position = CGPoint(x: frame.midX, y: frame.midY)
addChild(label)
```

## Options / Props

### Text Content

| Name | Type | Description |
|------|------|-------------|
| `text` | `String?` | The string displayed by the label |
| `attributedText` | `NSAttributedString?` | Styled text with per-character formatting |

### Font

| Name | Type | Description |
|------|------|-------------|
| `fontName` | `String?` | Font family name (PostScript name recommended) |
| `fontSize` | `CGFloat` | Font size in points |
| `fontColor` | `UIColor?` | Color of the text |

### Alignment

| Name | Type | Description |
|------|------|-------------|
| `horizontalAlignmentMode` | `SKLabelHorizontalAlignmentMode` | `.left`, `.center`, `.right` relative to `position` |
| `verticalAlignmentMode` | `SKLabelVerticalAlignmentMode` | `.baseline`, `.center`, `.top`, `.bottom` |

### Multi-line Layout

| Name | Type | Description |
|------|------|-------------|
| `numberOfLines` | `Int` | Max lines to draw (0 = unlimited) |
| `lineBreakMode` | `NSLineBreakMode` | How long lines are wrapped or truncated |
| `preferredMaxLayoutWidth` | `CGFloat` | Width after which line breaking applies |

### Blending

| Name | Type | Description |
|------|------|-------------|
| `color` | `UIColor?` | Secondary color for blending with `fontColor` |
| `colorBlendFactor` | `CGFloat` | Blend ratio between `fontColor` and `color` |
| `blendMode` | `SKBlendMode` | How the label composites onto its parent |

### Initializers

```swift
init(fontNamed fontName: String?)
convenience init(text: String?)
convenience init(attributedText: NSAttributedString?)
```

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- `attributedText` overrides `fontName`, `fontSize`, and `fontColor` for the characters it covers.
- For animated score updates, update `text` directly; the node re-renders automatically.

## Related

- [SKNode](./sknode.md)
- [SKSpriteNode](./skspritenode.md)
