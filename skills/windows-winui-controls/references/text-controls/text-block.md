# TextBlock

A lightweight control for displaying small amounts of read-only text, including single-line or multi-line text, inline hyperlinks, and text with formatting like bold, italic, or underlined.

## Signature / Usage

```xaml
<TextBlock Text="Hello, world!" />
```

```csharp
TextBlock textBlock1 = new TextBlock();
textBlock1.Text = "Hello, world!";
```

Content can also be set via the `Inlines` property (the default content property), which accepts `Run`, `Span`, `Bold`, `Italic`, `Hyperlink`, and `LineBreak` elements for mixed formatting:

```xaml
<TextBlock FontFamily="Segoe UI" Width="400" Text="Sample text formatting runs">
    <LineBreak/>
    <Run Foreground="Gray" FontFamily="Segoe UI Light" FontSize="24">
        Segoe UI Light 24
    </Run>
</TextBlock>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Text | string | The text contents of the TextBlock. Setting this directly (rather than via `Inlines`) enables the fast rendering path. |
| Inlines | InlineCollection | Default content property; holds `Run`, `Span`, `Bold`, `Italic`, `Hyperlink`, `LineBreak` elements for mixed formatting. |
| TextWrapping | TextWrapping | Controls line breaking when text extends beyond available width. |
| TextTrimming | TextTrimming | `None`, `CharacterEllipsis`, `WordEllipsis` keep the fast rendering path; `Clip` disables it. |
| FontFamily / FontSize / FontStyle / FontWeight | various | Standard font formatting properties. |
| Foreground | Brush | Brush applied to the text content. |
| CharacterSpacing | int | Uniform spacing between characters, in units of 1/1000 em. Only the default value of 0 keeps the fast rendering path. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.TextBlock` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose `Text`.
- TextBlock is designed to display a single paragraph and doesn't support text indentation; use `RichTextBlock` for multiple paragraphs or complex layouts.
- Setting `Text` in XAML or code (rather than using `Inlines`) keeps text rendering on the more efficient "fast path"; using `Inlines`, non-default `CharacterSpacing`, or `TextTrimming="Clip"` disables it.
- Elements derived from `Inline` (`Bold`, `Italic`, `Run`, `Span`, `LineBreak`, `Hyperlink`) enable formatting different parts of the text within a single TextBlock.
- `Typography` attached properties (e.g. `Typography.Capitals`) can be set on the TextBlock or on individual inline elements for OpenType typography features.

## Related

- [RichTextBlock](./rich-text-block.md)
- [Run](./run.md)
- [Span](./span.md)
- [Bold](./bold.md)
- [Italic](./italic.md)
- [Hyperlink](./hyperlink.md)
