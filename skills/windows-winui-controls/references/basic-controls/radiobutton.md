# RadioButton

Lets a user select one option from a group of two or more mutually exclusive, related options. Radio buttons are always used in groups.

## Signature / Usage

```xaml
<StackPanel Orientation="Horizontal">
    <RadioButton Content="Green" Tag="green" GroupName="Background" Checked="BGRadioButton_Checked"/>
    <RadioButton Content="Yellow" Tag="yellow" GroupName="Background" Checked="BGRadioButton_Checked"/>
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| GroupName | string | Groups individual `RadioButton` controls that are mutually exclusive, even across different parent containers. |
| IsChecked | bool? | `true` when selected, `false` when cleared. Inherited from `ToggleButton`. Can't be set to `false` by re-selecting the same button; clear it programmatically instead. |
| Checked | event | Occurs when the radio button is selected. |
| Unchecked | event | Occurs when the radio button is cleared. |
| Click | event | Occurs when clicked (inherited from `ButtonBase`). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Inherits from `ToggleButton`. Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `RadioGroup` and Jetpack Compose `RadioButton`.
- Grouping: put radio buttons inside the same parent container (implicit grouping) or set the same `GroupName` on each (explicit grouping, works across containers).
- Prefer the `RadioButtons` control over hand-grouped `RadioButton` elements — it handles layout, keyboard navigation, and accessibility automatically. Individual `RadioButton` elements can still be used as items inside a `RadioButtons` group; when doing so, `RadioButton.GroupName` is ignored because `RadioButtons` owns the group.

## Related

- [RadioButtons](./radiobuttons.md)
- [ToggleButton](./togglebutton.md)
- [CheckBox](./checkbox.md)
