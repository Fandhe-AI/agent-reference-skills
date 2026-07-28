# Bold

An inline-level content element that causes its enclosed content to render with a bold font weight.

## Signature / Usage

```xaml
<TextBlock>Text can be <Bold>bold</Bold>, <Underline>underlined</Underline>,
    <Italic>italic</Italic>, or a <Bold><Italic>combination</Italic></Bold>.</TextBlock>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Inlines | InlineCollection | Inherited from `Span`; contains the nested inline content rendered in bold. |
| FontFamily / FontSize / FontStyle | various | Inherited from `TextElement`; additional formatting combinable with the bold weight. |

## Notes

- Package: `Microsoft.UI.Xaml.Documents` (WinUI 3). Sealed class, inherits from `Span` → `Inline` → `TextElement`.
- Can be nested with other inline elements (e.g. `<Bold><Italic>combination</Italic></Bold>`) to combine formatting.
- Using inline elements like `Bold` inside a `TextBlock`/`RichTextBlock` disables the fast text-rendering path.

## Related

- [Span](./span.md)
- [Italic](./italic.md)
- [Run](./run.md)
