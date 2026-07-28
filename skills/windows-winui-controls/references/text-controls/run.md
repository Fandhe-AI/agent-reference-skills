# Run

Represents a discrete section of formatted or unformatted text, used inside a `TextBlock` or `RichTextBlock`.

## Signature / Usage

```xaml
<TextBlock><Run Text="This is some text."/></TextBlock>
```

```csharp
TextBlock textblock = new TextBlock();
Run run = new Run();
run.Text = "This is some text.";
textblock.Inlines.Add(run);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Text | string | The text content of the `Run`; content property in XAML. Cannot contain mixed content or further inlines (unlike `Span`). |
| FontFamily / FontSize / FontStyle / FontWeight | various | Inherited from `TextElement`; formatting applied to this discrete text section. |
| Foreground | Brush | Inherited from `TextElement`; brush applied to this text section. |
| CharacterSpacing | int | Inherited from `TextElement`; uniform spacing between characters. |

## Notes

- Package: `Microsoft.UI.Xaml.Documents` (WinUI 3). Inherits from `Inline` → `TextElement` → `DependencyObject`.
- Setting `TextBlock.Text` directly has the best performance; use `Run` only when formatting a discrete section of text differently within a `TextBlock` or `RichTextBlock`.
- Multiple `Run` elements can be placed inside a `Span` to combine with mixed content.
- Distinct from `System.Windows.Documents.Run` (WPF), though conceptually similar.

## Related

- [TextBlock](./text-block.md)
- [RichTextBlock](./rich-text-block.md)
- [Span](./span.md)
