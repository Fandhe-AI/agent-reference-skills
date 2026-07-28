# Span

Groups other `Inline` content elements, supporting mixed content (plain text and nested inline tags in any order). Parent class for `Bold`, `Hyperlink`, `Italic`, and `Underline`.

## Signature / Usage

```xaml
<RichTextBlock>
  <Paragraph>
    <Span>This is <Bold>mixed content</Bold> with multiple text areas <Italic>and inlines</Italic>.</Span>
  </Paragraph>
</RichTextBlock>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Inlines | InlineCollection | Content property; contains the top-level inline elements (`Run`, `Bold`, `Italic`, plain text, etc.) inside the `Span`. |
| FontFamily / FontSize / FontStyle / FontWeight | various | Inherited from `TextElement`; formatting applied to the enclosed span of text. |
| Foreground | Brush | Inherited from `TextElement`. |

## Notes

- Package: `Microsoft.UI.Xaml.Documents` (WinUI 3). Inherits from `Inline` → `TextElement` → `DependencyObject`.
- Unlike `Run`, `Span` supports mixed content — plain text interleaved with nested `Inline` tags such as `Run`, `Bold`, `Italic`.
- When mixed content is parsed, plain-text regions are wrapped in generated `Run` objects at the appropriate position in the `InlineCollection`.
- Typically used as a child of a `Paragraph` (`Paragraph.Inlines`) or nested inside another `Span` (`Span.Inlines`).
- Derived classes: `Bold`, `Italic`, `Underline` (formatting-only decorations) and `Hyperlink` (adds click/navigation behavior).

## Related

- [Run](./run.md)
- [Bold](./bold.md)
- [Italic](./italic.md)
- [Hyperlink](./hyperlink.md)
- [RichTextBlock](./rich-text-block.md)
