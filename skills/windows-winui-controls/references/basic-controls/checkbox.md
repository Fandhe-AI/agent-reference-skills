# CheckBox

Used to select or deselect action items. Supports a single item or a list of multiple items. Has three selection states: unselected, selected, and indeterminate.

## Signature / Usage

```xaml
<CheckBox x:Name="termsOfServiceCheckBox"
          Content="I agree to the terms of service."/>
```

```csharp
CheckBox termsOfServiceCheckBox = new CheckBox();
termsOfServiceCheckBox.Content = "I agree to the terms of service.";
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsChecked | bool? | `true` (checked), `false` (unchecked), or `null` (indeterminate). Inherited from `ToggleButton`. |
| IsThreeState | bool | Set `true` to allow the indeterminate state to be reported. Inherited from `ToggleButton`. |
| Content | object | Label displayed next to the checkbox. |
| Checked | event | Occurs when `IsChecked` becomes `true`. |
| Unchecked | event | Occurs when `IsChecked` becomes `false`. |
| Indeterminate | event | Occurs when `IsChecked` becomes `null` (requires `IsThreeState="True"`). |
| Click | event | Occurs on every state change; use `IsChecked` to inspect the new state. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). `CheckBox` defines no properties of its own; it inherits from `ToggleButton`. Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `Checkbox` and Jetpack Compose `Checkbox`.
- Use a single check box for a binary yes/no choice where the user can delay committing (e.g. as part of a form submit); use `ToggleSwitch` when the action should take effect immediately.
- Because `IsChecked` is a nullable boolean, binding it to a plain `bool` property requires a cast or value converter (e.g. `{x:Bind (x:Boolean)cb.IsChecked, Mode=OneWay}`).
- Use the indeterminate state only to represent a "select all" summary of sub-choices; don't let users set indeterminate directly.

## Related

- [ToggleButton](./togglebutton.md)
- [RadioButton](./radiobutton.md)
- [ToggleSwitch](./toggleswitch.md)
