# RichEditBox

A rich text editing control that supports formatted text, hyperlinks, images, and math equations. Typically used to enter/edit standalone documents (e.g. saved to `.rtf`) rather than to capture simple user input.

## Signature / Usage

```xaml
<RichEditBox x:Name="editor" Height="200"/>
```

```csharp
// Load an .rtf file into the document
editor.Document.LoadFromStream(Microsoft.UI.Text.TextSetOptions.FormatRtf, randAccStream);

// Toggle bold on the current selection
Microsoft.UI.Text.ITextSelection selectedText = editor.Document.Selection;
if (selectedText != null)
{
    Microsoft.UI.Text.ITextCharacterFormat charFormatting = selectedText.CharacterFormat;
    charFormatting.Bold = Microsoft.UI.Text.FormatEffect.Toggle;
    selectedText.CharacterFormat = charFormatting;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Document / TextDocument | ITextDocument | Access to the text object model (`Microsoft.UI.Text.ITextDocument`); load/save streams, get selection, undo/redo, set default formatting. |
| IsReadOnly | bool | Makes the control read-only when `true`. |
| IsSpellCheckEnabled | bool | Enables/disables the built-in spell checker (enabled by default). |
| PlaceholderText | string | Text displayed until the value is changed by user action. |
| TextAlignment / HorizontalTextAlignment | TextAlignment | Horizontal alignment of the text. |
| TextWrapping | TextWrapping | How line breaking occurs if text extends beyond available width. |
| MaxLength | int | Maximum number of characters allowed for user input. |
| InputScope | InputScope | Context for input; affects the touch keyboard layout. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.RichTextBox` (WPF).
- Content is exposed as an `ITextDocument` (`Microsoft.UI.Text` namespace) rather than the `Block`/`Paragraph` object model used by `RichTextBlock`.
- Supports math equation input/editing via `UnicodeMath`, stored as MathML: call `TextDocument.SetMathMode(RichEditMathMode.MathOnly)` to enable, `GetMathML` / `SetMathML` to read/write.
- Use a plain `TextBox` when the primary purpose is capturing simple user input rather than editing rich documents; use `RichTextBlock` for read-only rich text display.
- No built-in formatting toolbar — apps must provide their own styling buttons (bold, italic, underline, etc.) and implement their actions against `Document.Selection.CharacterFormat`.

## Related

- [RichTextBlock](./rich-text-block.md)
- [TextBox](./text-box.md)
