# Text / TextLine / Glyph / TextRunStyle and text enums

`Text` shapes and lays out styled runs of text with the runtime's shaper (real line breaking and bidirectional ordering). Append runs, set the box, then draw it in one call or walk its lines and glyphs to draw them yourself. Codepoint indices are 1 based like `utf8.offset`.

## Signature / Usage

```lua
type Label = {
  text: Text,
  paint: Paint,
}

function init(self: Label, context: Context): boolean
  local font = context:font('IBM Plex Sans Arabic')
  self.text:append('مرحبا بالعالم', { font = font, size = 32, paint = self.paint })
  self.text.sizing = 'fixed'
  self.text.maxWidth = 240
  self.text.align = 'start'
  return true
end

function draw(self: Label, renderer: Renderer)
  self.text:draw(renderer)
end
```

Walking lines and glyphs (`TextLine` is iterable in visual order, left to right, whatever the writing direction):

```lua
for _, line in text:lines() do
  for _, glyph in line do
    renderer:save()
    renderer:transform(glyph.transform)
    renderer:drawPath(glyph.font:glyphPath(glyph.id), paint)
    renderer:restore()
  end
end
```

## Options / Props

### Text

Fields: `sizing`, `overflow`, `align`, `wrap`, `wordBreak`, `origin`, `direction` (typed by the enums below), plus:

| Name | Description |
|------|-------------|
| `maxWidth` | Wrap width when sizing is not 'autoWidth' |
| `maxHeight` | Height the text overflows at when sizing is 'fixed' |
| `paragraphSpacing` | Space between paragraphs separated by a newline |
| `length` | Number of codepoints appended |
| `isEmpty` | (no description in source) |
| `lineCount` | (no description in source) |

Constructor and methods:

| Name | Signature | Description |
|------|-----------|-------------|
| `new` | `new() -> Text` | Creates an empty text |
| `append` | `append(text: string, style: TextRunStyle) -> ()` | Appends a styled run. Runs join into one string; a newline starts a paragraph |
| `clear` | `clear() -> ()` | Removes every run |
| `draw` | `draw(renderer: Renderer, paint: Paint?) -> ()` | Draws every run with its own paint, or all of them with the given paint |
| `bounds` | `bounds() -> (Vector, Vector)` | Minimum and maximum corner of the laid out text |
| `line` | `line(index: number) -> TextLine` | The line at a 1 based index, top to bottom |
| `lines` | `lines() -> {TextLine}` | Every line, top to bottom |
| `hitTest` | `hitTest(position: Vector) -> number` | The codepoint index nearest a point in the text's local space |
| `caret` | `caret(index: number) -> (number, number, number)` | The caret before the codepoint at index: its x, top and bottom. Nil when the text is empty |
| `selectionRects` | `selectionRects(from: number, to: number) -> {{min: Vector, max: Vector}}` | Rectangles covering the codepoints from one index to another, one per glyph |

### TextRunStyle

Style of one run appended to a `Text`.

| Name | Description |
|------|-------------|
| `font` | Font for the run |
| `size` | Font size, 16 when omitted |
| `lineHeight` | Line height, the font's own when omitted |
| `letterSpacing` | Letter spacing |
| `paint` | Runs sharing a paint draw as one path. A run without a paint only draws when `Text:draw` is given one |
| `foregroundColor` | Color used by emoji layers that take the text color |

### TextLine

One line of a `Text` after wrapping.

| Name | Description |
|------|-------------|
| `index` | 1 based index of the line within the text |
| `x` | Left edge after alignment |
| `top`, `baseline`, `bottom`, `width` | Line metrics |
| `direction` | Base direction of the paragraph the line belongs to |
| `firstIndex`, `lastIndex` | First and last codepoint index on the line, 1 based |
| `glyphCount` | Number of glyphs |
| `glyph(index: number) -> Glyph` | The glyph at a 1 based visual position |
| `glyphs() -> {Glyph}` | All glyphs in visual order |
| `__iter()` | Iterates the glyphs in visual order: `for _, glyph in line do` |

### Glyph

One glyph placed by a `Text` layout, in the text's local space.

| Name | Description |
|------|-------------|
| `id` | Glyph id within `font` |
| `font`, `size`, `y`, `advance` | Font, size, baseline y position, advance |
| `x` | Pen position on the baseline, the shaper's offset included |
| `textIndex` | Index of the first codepoint this glyph draws, 1 based |
| `direction` | Direction of the run the glyph belongs to |
| `isColor` | Whether this is a color glyph (emoji) drawn as layers rather than one outline |
| `transform` | Places the 1 point outline from `Font:glyphPath` at this glyph's size and position |
| `path() -> Path` | The outline placed by `transform`, as a new Path |

### FontAxis

A variable axis of a Font, such as weight or width.

| Name | Description |
|------|-------------|
| `tag` | Four letter axis tag, for example 'wght' |
| `min`, `default`, `max` | Axis range and default |

### Text enums

| Type | Source description |
|------|--------------------|
| `TextAlign` | 'start' and 'end' follow the direction of the first paragraph, so right to left text starts on the right |
| `TextDirection` | 'auto' detects each paragraph's direction from its text |
| `TextOrigin` | (no description in source) |
| `TextOverflow` | (no description in source) |
| `TextSizing` | (no description in source) |
| `TextWordBreak` | (no description in source) |
| `TextWrap` | (no description in source) |

## Notes

- The source pages for the text enums list no member values beyond the literals seen in examples ('start', 'fixed', 'autoWidth', 'auto', 'end'); the full member lists are not stated.
- Font itself is documented in the existing Font page.

## Related

- [font.md](./font.md)
- [renderer.md](./renderer.md)
- [path.md](./path.md)
- [paint.md](./paint.md)

Source: https://rive.app/docs/scripting/api-reference/text/text, https://rive.app/docs/scripting/api-reference/text/font, https://rive.app/docs/scripting/api-reference/text/font-axis, https://rive.app/docs/scripting/api-reference/text/glyph, https://rive.app/docs/scripting/api-reference/text/text-line, https://rive.app/docs/scripting/api-reference/text/text-run-style, https://rive.app/docs/scripting/api-reference/text/text-align, https://rive.app/docs/scripting/api-reference/text/text-direction, https://rive.app/docs/scripting/api-reference/text/text-origin, https://rive.app/docs/scripting/api-reference/text/text-overflow, https://rive.app/docs/scripting/api-reference/text/text-sizing, https://rive.app/docs/scripting/api-reference/text/text-word-break, https://rive.app/docs/scripting/api-reference/text/text-wrap (fetched 2026-10)
