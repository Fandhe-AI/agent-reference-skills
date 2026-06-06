# Span

Applies different text styles to a range of characters within a `Text` component. Must be a child of `Text` or another `Span`.

## Signature / Usage

```tsx
<Text fontSize={16}>
  Normal text{" "}
  <Span fill="#e53935" fontWeight="bold">important</Span>
  {" "}text
</Text>
```

## Options / Props

Span inherits all text styling props from `Text` but has no defaults of its own — unset props fall through to the parent.

| Prop | Type | Description |
|------|------|-------------|
| `fontFamily` | `string` | Font family override |
| `fontSize` | `number` | Font size override (min 1) |
| `fontWeight` | `number \| FontWeight` | Font weight override |
| `italic` | `boolean` | Italic style |
| `textCase` | `TextCase` | Case override |
| `textDecoration` | `"underline" \| "strikethrough"` | Decoration |
| `letterSpacing` | `number \| string` | Letter spacing |
| `fill` | `HexCode \| Color \| Paint[]` | Text color override |
| `href` | `string` | Makes the span a clickable link |

## Notes

- `Span` cannot be the root of a widget, and it cannot contain non-text children.
- Any prop not set on a `Span` inherits its value from the parent `Text`.
- Use `href` on a `Span` to make only part of a text node a hyperlink.

## Related

- [Text](./Text.md)
- [Input](./Input.md)
