# RichTextBlock

A control that displays formatted, read-only text with support for multiple paragraphs, inline UI elements, and multi-column overflow layouts.

## Signature / Usage

```xaml
<RichTextBlock TextIndent="12" IsTextSelectionEnabled="True" TextWrapping="Wrap">
  <Paragraph TextIndent="24">First paragraph.</Paragraph>
  <Paragraph>Second paragraph.</Paragraph>
  <Paragraph>Third paragraph. <Bold>With an inline.</Bold></Paragraph>
</RichTextBlock>
```

Embedding a UI element inline:

```xaml
<RichTextBlock>
    <Paragraph>
        <Italic>This is an inline image.</Italic>
        <InlineUIContainer>
            <Image Source="Assets/Square44x44Logo.png" Height="30" Width="30"/>
        </InlineUIContainer>
        Mauris auctor tincidunt auctor.
    </Paragraph>
</RichTextBlock>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Blocks | BlockCollection | Content property; contains one or more `Paragraph` elements. |
| TextIndent | double | Indentation applied to all paragraphs; can be overridden per-paragraph via `Paragraph.TextIndent`. |
| TextWrapping | TextWrapping | Controls whether text wraps if a line extends beyond the available width. |
| IsTextSelectionEnabled | bool | Whether the text content can be selected for clipboard/drag or UI styling. |
| OverflowContentTarget | RichTextBlockOverflow | Links this control's overflow text to a `RichTextBlockOverflow` element, enabling multi-column layouts. |
| HasOverflowContent | bool | Whether content extends beyond the control's bounds and can flow to an `OverflowContentTarget`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.RichTextBox` (WPF) and the JS/Compose text component families.
- Use `RichTextBlock` instead of `TextBlock` when multiple paragraphs, multi-column text, or inline UI elements (like images) are required.
- Has no `Text` property; content is defined through `Paragraph` elements in `Blocks`.
- `InlineUIContainer` lets any `UIElement` (image, button, checkbox, etc.) be embedded inline with text.
- `RichTextBlockOverflow` elements, linked via `OverflowContentTarget`, allow multi-column or advanced page layouts driven from a single `RichTextBlock`.

## Related

- [TextBlock](./text-block.md)
- [RichEditBox](./rich-edit-box.md)
- [Run](./run.md)
- [Span](./span.md)
