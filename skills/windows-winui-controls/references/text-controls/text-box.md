# TextBox

A single-line or multi-line plain text field for user input.

## Signature / Usage

```xaml
<TextBox x:Name="nameInput"
         Header="Enter your name:"
         PlaceholderText="Name"
         Width="300"
         HorizontalAlignment="Left"/>
```

Multi-line, wrapping TextBox:

```xaml
<TextBox AcceptsReturn="True"
         TextWrapping="Wrap"
         MaxHeight="172"
         Width="300"
         Header="Description"
         ScrollViewer.VerticalScrollBarVisibility="Auto"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Text | string | The text contents of the TextBox. |
| PlaceholderText | string | Text displayed until the value is changed by user action. |
| InputScope | InputScope | Context for input (e.g. `Number`, `Email`, `Url`); affects the touch keyboard layout. |
| TextWrapping | TextWrapping | How line breaking occurs if text extends beyond available width. |
| MaxLength | int | Maximum number of characters allowed for user input. |
| SelectionStart | int | Starting position of the currently selected text. |
| SelectionLength | int | Number of characters in the current selection. |
| AcceptsReturn | bool | Whether the control allows and displays newline/return characters (enables multi-line input). |
| IsReadOnly | bool | Whether the user can change the text. |
| IsSpellCheckEnabled | bool | Whether input interacts with a spell check engine. |
| IsTextPredictionEnabled | bool | Whether text prediction ("autocomplete") is enabled. |
| Header / HeaderTemplate | object / DataTemplate | Content/template for the control's header label. |
| Description | object | Content shown below the control providing additional guidance. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.TextBox` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose `TextField`.
- Key methods: `Select(start, length)`, `SelectAll()`, `CopySelectionToClipboard()`, `CutSelectionToClipboard()`, `PasteFromClipboard()`, `ClearUndoRedoHistory()`.
- Key events: `TextChanged`, `TextChanging`, `SelectionChanged`, `Paste`.
- Use `InputScope="Number"` combined with `MaxLength` for constrained numeric-style entry such as PIN input.

## Related

- [PasswordBox](./password-box.md)
- [AutoSuggestBox](./auto-suggest-box.md)
- [RichEditBox](./rich-edit-box.md)
- [NumberBox](./number-box.md)
