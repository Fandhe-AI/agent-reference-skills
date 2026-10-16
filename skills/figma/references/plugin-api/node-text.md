# TextNode

A text layer. Both the whole node and individual character ranges can carry independent font, size, color, and decoration properties.

## Signature / Usage

```ts
const text = figma.createText();

// Always load font before setting characters
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
text.characters = 'Hello World';
text.fontSize = 24;
text.textAlignHorizontal = 'CENTER';

// Per-range styling
await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
text.setRangeFontSize(0, 5, 32);  // 'Hello' is larger
text.setRangeFillStyleIdAsync(6, 11, styleId);
```

## Options / Props

### Type

| Name | Type | Description |
|------|------|-------------|
| `type` | `'TEXT'` (readonly) | Node type identifier |

### Text Content

| Name | Type | Description |
|------|------|-------------|
| `characters` | `string` | Raw text content |
| `autoRename` | `boolean` | Whether name tracks characters |
| `hasMissingFont` | `boolean` (readonly) | Missing font flag |

### Typography (node-level or mixed)

| Name | Type | Description |
|------|------|-------------|
| `fontSize` | `number \| typeof figma.mixed` | Font size in px |
| `fontName` | `FontName \| typeof figma.mixed` | Read: `{ family, style, variationSettings? }` (`variationSettings` lists every axis for a variable font). Write: `FontName` or `FontNameInput` (`style` optional; `variationSettings` overrides axes; Update 138) |
| `fontWeight` | `number` (readonly) | Computed font weight |
| `textCase` | `TextCase \| typeof figma.mixed` | `'ORIGINAL' \| 'UPPER' \| 'LOWER' \| 'TITLE' \| 'SMALL_CAPS'` |
| `textDecoration` | `TextDecoration \| typeof figma.mixed` | `'NONE' \| 'UNDERLINE' \| 'STRIKETHROUGH'` |
| `letterSpacing` | `LetterSpacing \| typeof figma.mixed` | `{ value, unit: 'PIXELS' \| 'PERCENT' }` |
| `lineHeight` | `LineHeight \| typeof figma.mixed` | `{ value?, unit: 'PIXELS' \| 'PERCENT' \| 'AUTO' }` |
| `hyperlink` | `HyperlinkTarget \| null \| typeof figma.mixed` | URL or node link |

### Layout & Sizing

| Name | Type | Description |
|------|------|-------------|
| `textAlignHorizontal` | `'LEFT' \| 'CENTER' \| 'RIGHT' \| 'JUSTIFIED'` | Horizontal alignment |
| `textAlignVertical` | `'TOP' \| 'CENTER' \| 'BOTTOM'` | Vertical alignment |
| `textAutoResize` | `'NONE' \| 'WIDTH_AND_HEIGHT' \| 'HEIGHT' \| 'TRUNCATE'` | Auto-resize behavior |
| `textWrapStyle` | `TextWrapStyle \| typeof figma.mixed` | Paragraph-level wrap: `'AUTO'` (default), `'BALANCE'` (equalized line lengths), `'PRETTY'` (fewer orphaned words). Requires the font to be loaded when set (Update 134) |
| `textTruncation` | `'DISABLED' \| 'ENDING'` | Truncation mode |
| `maxLines` | `number \| null` | Max visible lines (with truncation) |

### Range Methods

| Name | Description |
|------|-------------|
| `insertCharacters(start, chars, useStyle?)` | Insert characters at index |
| `deleteCharacters(start, end)` | Remove character range |
| `getRangeFontSize(start, end)` | Get font size for range |
| `setRangeFontSize(start, end, value)` | Set font size for range |
| `getRangeFontName(start, end)` | Get font name for range |
| `setRangeFontName(start, end, value: FontNameInput)` | Set font name for range; `style` may be omitted and `variationSettings` may override variable-font axes |
| `getRangeTextWrapStyle(start, end)` | `TextWrapStyle \| typeof figma.mixed` for the paragraph containing the range |
| `setRangeTextWrapStyle(start, end, value: TextWrapStyle)` | Set the wrap style for the paragraph containing the range; requires the font to be loaded |
| `getRangeFills(start, end)` | Get fills for range |
| `setRangeFills(start, end, value)` | Set fills for range |
| `getStyledTextSegments(fields)` | Get styled segments for given fields |

## Notes

- Always call `await figma.loadFontAsync(fontName)` before modifying `characters` or font properties, otherwise Figma throws.
- `TextStyle.textWrapStyle` reads or writes the wrap style on a saved text style
- Variable fonts: use `figma.getFontFamilyVariationAxes(family)` to discover valid axis tags; setting an axis the family does not define throws. `loadFontAsync({ family })` (no `style`) loads every style of the family
- `figma.mixed` is returned for range properties when the range contains multiple distinct values.
- Range indices are character positions (0-based), `end` is exclusive.

## Related

- [FrameNode](./node-frame.md)
- [data-types](./data-types.md)
- [node-properties](./node-properties.md)
