# Hyperlink

An inline-level content element that hosts a clickable hyperlink inside a `TextBlock` or `RichTextBlock`.

## Signature / Usage

```xaml
<TextBlock><Hyperlink NavigateUri="http://www.bing.com">Go to Bing</Hyperlink></TextBlock>
```

```csharp
Hyperlink hyperlink = new Hyperlink();
Run run = new Run { Text = "Go to Bing" };
hyperlink.NavigateUri = new Uri("http://www.bing.com");
hyperlink.Inlines.Add(run);
textBlock.Inlines.Add(hyperlink);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| NavigateUri | Uri | URI to navigate to (opens in the default browser) when the hyperlink is activated. Mutually exclusive with handling `Click`. |
| UnderlineStyle | UnderlineStyle | Kind of underline shown; hyperlinks are underlined by default for accessibility (color-blind users rely on it). |
| FocusState | FocusState | Whether the hyperlink has focus and how focus was obtained. |
| IsTabStop | bool | Whether the hyperlink participates in Tab-key navigation. |
| Inlines | InlineCollection | Inherited from `Span`; restricted to `Run` and non-`Hyperlink` `Span` types (no `InlineUIContainer`). |

## Notes

- Package: `Microsoft.UI.Xaml.Documents` (WinUI 3). Sealed class, inherits from `Span` → `Inline` → `TextElement`. Distinct from `HyperlinkButton` (`Microsoft.UI.Xaml.Controls`), a `Button`-derived control usable anywhere, not just inline with text.
- Key event: `Click`, fired when the hyperlink is activated. Use `Click` for in-app navigation (e.g. `Frame.Navigate`) instead of setting `NavigateUri`; don't set both.
- Not a `UIElement` — has no pointer/tap events of its own beyond `Click`, `GotFocus`, `LostFocus`.
- Doesn't inherit from `Control`, so it has no `Style`/`Template`; only `TextElement`-inherited formatting properties (`Foreground`, `FontFamily`, etc.) can be customized.
- When placed inside a `Span` with adjacent text in XAML, apply `xml:space="preserve"` on the `Span` to keep surrounding whitespace.

## Related

- [Span](./span.md)
- [Run](./run.md)
- [TextBlock](./text-block.md)
- [RichTextBlock](./rich-text-block.md)
