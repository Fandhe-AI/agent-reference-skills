# AutoSuggestBox

A text input control that provides a list of suggestions for a user to select from as they type; commonly used to implement search.

## Signature / Usage

```xaml
<AutoSuggestBox PlaceholderText="Search" QueryIcon="Find" Width="200"
                TextChanged="AutoSuggestBox_TextChanged"
                QuerySubmitted="AutoSuggestBox_QuerySubmitted"
                SuggestionChosen="AutoSuggestBox_SuggestionChosen"/>
```

```csharp
private void AutoSuggestBox_TextChanged(AutoSuggestBox sender, AutoSuggestBoxTextChangedEventArgs args)
{
    if (args.Reason == AutoSuggestionBoxTextChangeReason.UserInput)
    {
        sender.ItemsSource = GetFilteredSuggestions(sender.Text);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Text | string | The text shown in the control. |
| PlaceholderText | string | Placeholder text displayed in the control. |
| ItemsSource | object | Source used to generate the content of the suggestion list (inherited from `ItemsControl`). |
| TextMemberPath | string | Property path used to populate the text box when an item is selected; should typically match `DisplayMemberPath`. |
| QueryIcon | IconElement | Graphic content of the button clicked to submit a query (e.g. a 'find' icon for search UIs). |
| IsSuggestionListOpen | bool | Whether the suggestion drop-down is open. |
| MaxSuggestionListHeight | double | Maximum height of the suggestion drop-down. |
| UpdateTextOnSelect | bool | With `TextMemberPath`, whether selecting an item updates the editable text. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls` AutoCompleteBox-style controls (WPF) and the JS/Compose combobox families.
- Three key events drive typical usage: `TextChanged` (filter suggestions on `AutoSuggestionBoxTextChangeReason.UserInput`), `SuggestionChosen` (user picked an item from the list), and `QuerySubmitted` (user committed a query via Enter/click; check `args.ChosenSuggestion` vs `args.QueryText`).
- Use `DisplayMemberPath` or `ItemTemplate` (inherited from `ItemsControl`) to control how suggestion items are rendered.
- Display a single-line "No results" message when a search yields no suggestions, so users know the search executed.

## Related

- [TextBox](./text-box.md)
- [NumberBox](./number-box.md)
