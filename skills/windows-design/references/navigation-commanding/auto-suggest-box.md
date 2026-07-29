# Auto-suggest box (Search)

A simple, customizable control for text search with a list of suggestions that populates automatically as the user types. The standard control for implementing search in Windows apps.

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
        // sender.ItemsSource = filteredDataset;
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| QueryIcon | IconElement | Adds a button (e.g. "Find") on the right side of the text box; unset by default |
| DisplayMemberPath | string | Property to show for each item in the suggestion list |
| TextMemberPath | string | Property used to auto-populate the text box when a suggestion is chosen via keyboard |
| ItemTemplate | DataTemplate | Custom look for each suggestion list item |
| TextChanged | event | Fires on any text box content change; check `args.Reason == UserInput` before filtering |
| SuggestionChosen | event | Fires when the user picks a suggestion from the list |
| QuerySubmitted | event | Fires when the user commits a query (Enter, query icon, or selecting a suggestion); `args.ChosenSuggestion` is non-null only for the latter |

### Search-specific guidance

- Set `QueryIcon="Find"` to give the box a typical search-box appearance.
- When there are no results for the entered text, display a single-line "No results" message so users know the search executed.
- `NavigationView.AutoSuggestBox` is the standard place to host an app-level search box inside the navigation pane.

## Notes

- Package: `Microsoft.UI.Xaml.Controls.AutoSuggestBox` (WinUI 3). Distinct from Ark UI / Chakra UI `Combobox`/search inputs.

## Related

- [NavigationView](./navigationview.md)
