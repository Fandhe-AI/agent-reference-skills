# Text

The primary component for displaying text in a widget. Supports most Figma text styling properties and can contain `Span` children for mixed styling.

## Signature / Usage

```tsx
<Text
  fontSize={14}
  fontWeight="bold"
  fill="#333333"
  horizontalAlignText="center"
>
  Hello, Widget!
</Text>
```

## Options / Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fontFamily` | `string` | `"Inter"` | Font family; supports Google Fonts |
| `fontSize` | `number` | `16` | Font size in pixels (min 1) |
| `fontWeight` | `number \| FontWeight` | — | e.g., `400`, `700`, `"bold"`, `"medium"` |
| `italic` | `boolean` | — | Italic style |
| `textCase` | `TextCase` | — | `"upper"`, `"lower"`, `"title"`, `"small-caps"`, etc. |
| `textDecoration` | `"underline" \| "strikethrough"` | — | Text decoration |
| `lineHeight` | `number \| string \| "auto"` | — | Line height |
| `letterSpacing` | `number \| string` | — | Letter spacing |
| `paragraphIndent` | `number` | — | First-line indent |
| `paragraphSpacing` | `number` | — | Vertical gap between paragraphs |
| `horizontalAlignText` | `"left" \| "center" \| "right" \| "justified"` | `"left"` | Horizontal text alignment |
| `verticalAlignText` | `"top" \| "center" \| "bottom"` | — | Vertical text alignment |
| `fill` | `HexCode \| Color \| Paint[]` | `"#000000"` | Text color |
| `stroke` | `Paint \| Paint[]` | — | Text stroke |
| `strokeWidth` | `number` | — | Stroke thickness |
| `strokeAlign` | `"inside" \| "center" \| "outside"` | — | Stroke alignment |
| `width` | `Size` | `"hug-contents"` | Component width |
| `height` | `Size` | `"hug-contents"` | Component height |
| `opacity` | `number` | `1` | Opacity (0–1) |
| `blendMode` | `BlendMode` | — | Blend mode |
| `effect` | `Effect \| Effect[]` | — | Shadow/blur effects |
| `href` | `string` | — | Makes the text a clickable link |
| `onClick` | `(e: WidgetClickEvent) => void \| Promise<void>` | — | Click handler |
| `hoverStyle` | `HoverStyle` | — | Style on hover |
| `tooltip` | `string` | — | Tooltip text |
| `hidden` | `boolean` | — | Visibility toggle |
| `positioning` | `"auto" \| "absolute"` | — | Layout positioning in AutoLayout parent |
| `name` | `string` | — | Layer name for debugging |

## Notes

- Nest `<Span>` children inside `<Text>` to apply different styles to character ranges.
- Default dimensions are `"hug-contents"` — the text node sizes to its content.
- `href` turns the text into a link; `onClick` and `href` can coexist.

## Related

- [Span](./Span.md)
- [Input](./Input.md)
- [AutoLayout](./AutoLayout.md)
