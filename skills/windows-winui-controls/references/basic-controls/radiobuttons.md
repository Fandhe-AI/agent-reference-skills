# RadioButtons

Recommended control for creating a group of mutually exclusive options. Uses an `ItemsControl`-like content model, and provides optimized keyboard navigation, accessibility, and layout compared to hand-grouping individual `RadioButton` controls.

## Signature / Usage

```xaml
<RadioButtons Header="Background color"
              SelectedIndex="0"
              SelectionChanged="BackgroundColor_SelectionChanged">
    <x:String>Red</x:String>
    <x:String>Green</x:String>
    <x:String>Blue</x:String>
</RadioButtons>
```

```csharp
private void BackgroundColor_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    string colorName = (sender as RadioButtons)?.SelectedItem as string;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Items | IVector\<object\> | Collection used to generate content directly. |
| ItemsSource | object | Object source used to generate content via data binding. |
| SelectedIndex | int | Index of the selected radio button. Set to `-1` to clear the selection. |
| SelectedItem | object | The selected item's value. Set to `null` to clear the selection. |
| MaxColumns | int | Maximum number of columns radio buttons are arranged in (column-major order). Default is a single column. |
| Header | object | Label content for the group. |
| SelectionChanged | event | Occurs when the selected option changes. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `RadioGroup` and Jetpack Compose radio button groups.
- Can be populated with any object type (strings, `SymbolIcon`, custom data model items, or individual `RadioButton` controls). When `RadioButton` items are used, don't handle both `RadioButton.Checked` and `RadioButtons.SelectionChanged` — they can conflict; `RadioButton.GroupName` is ignored since `RadioButtons` owns the group.
- "Selection follows focus": keyboard Up/Down/Left/Right navigation changes the selection immediately; use Ctrl+arrow to move focus without changing selection, then Spacebar to select.
- Does not wrap focus from first to last item or vice versa.

## Related

- [RadioButton](./radiobutton.md)
