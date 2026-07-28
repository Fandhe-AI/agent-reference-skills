# Italic

An inline-level flow content element that causes its enclosed content to render with an italic font style.

## Signature / Usage

```xaml
<TextBlock>Text can be <Bold>bold</Bold>, <Underline>underlined</Underline>,
    <Italic>italic</Italic>, or a <Bold><Italic>combination</Italic></Bold>.</TextBlock>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Inlines | InlineCollection | Inherited from `Span`; contains the nested inline content rendered in italic. |
| FontFamily / FontSize / FontWeight | various | Inherited from `TextElement`; additional formatting combinable with the italic style. |

## Notes

- Package: `Microsoft.UI.Xaml.Documents` (WinUI 3). Sealed class, inherits from `Span` → `Inline` → `TextElement`.
- Can be combined with other inline elements, e.g. nested inside `Bold`, or wrapping a `Hyperlink`'s text.
- Using inline elements like `Italic` inside a `TextBlock`/`RichTextBlock` disables the fast text-rendering path.

## Related

- [Span](./span.md)
- [Bold](./bold.md)
- [Run](./run.md)
