# CGFont

A set of character glyphs and layout information for drawing text at the Quartz 2D level. Provides low-level access to font metrics and glyph outlines.

## Signature / Usage

```swift
// Load a font by PostScript name
guard let font = CGFont("Helvetica-Bold" as CFString) else { return }

context.setFont(font)
context.setFontSize(24)
context.setFillColor(CGColor.black)

// Show glyphs (low-level; prefer TextKit for full Unicode support)
var glyphs: [CGGlyph] = [font.getGlyphWithGlyphName(name: "A" as CFString)]
var positions: [CGPoint] = [CGPoint(x: 50, y: 100)]
context.showGlyphs(glyphs, at: positions)
```

## Options / Props

### Creating a Font

| Initializer | Description |
|-------------|-------------|
| `init?(_ name: CFString)` | From a PostScript or full font name |
| `init?(_ provider: CGDataProvider)` | From a data provider containing font file data |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `numberOfGlyphs` | `Int` | Total number of glyphs in the font |
| `fullName` | `CFString?` | Full human-readable font name |
| `postScriptName` | `CFString?` | PostScript name (for programmatic use) |
| `ascent` | `Int32` | Typographic ascent in glyph-space units |
| `descent` | `Int32` | Typographic descent (typically negative) |
| `leading` | `Int32` | Line gap / leading |
| `unitsPerEm` | `Int32` | Glyph-space units per em square |
| `xHeight` | `Int32` | Height of lowercase 'x' |
| `capHeight` | `Int32` | Height of uppercase letters |
| `fontBBox` | `CGRect` | Bounding box containing all glyphs |
| `italicAngle` | `CGFloat` | Italic angle in degrees |
| `stemV` | `CGFloat` | Dominant vertical stem width |
| `variationAxes` | `CFArray?` | Available variation axes |
| `variations` | `CFDictionary?` | Current variation settings |
| `tableTags` | `CFArray?` | All font table tags |

### Glyph Operations

| Method | Description |
|--------|-------------|
| `getGlyphWithGlyphName(name:)` | Returns the `CGGlyph` for a named glyph |
| `name(for:)` | Returns the name for a glyph index |
| `getGlyphBBoxes(glyphs:count:bboxes:)` | Fills an array with per-glyph bounding boxes |
| `getGlyphAdvances(glyphs:count:advances:)` | Fills an array with per-glyph advance widths |

### Copying with Variations

| Method | Description |
|--------|-------------|
| `copy(withVariations:)` | Returns a copy of the font with variation settings applied |
| `table(for:)` | Returns the data for a font table identified by its tag |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Font metrics are in glyph-space units; divide by `unitsPerEm` and multiply by point size to obtain point values. For full Unicode layout (ligatures, bidirectional text, etc.) use TextKit (`NSLayoutManager`, `CTFont`, `CTLine`) instead.

## Related

- [CGContext](./cgcontext.md)
- [CGDataProvider](./cgdataprovider.md)
