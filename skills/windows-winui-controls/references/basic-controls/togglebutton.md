# ToggleButton

A button that can be on or off (and optionally indeterminate). Base class for `CheckBox` and `RadioButton`.

## Signature / Usage

```xaml
<ToggleButton Content="Two State" Width="150" IsThreeState="False"/>
<ToggleButton Content="Three State" Width="150" IsThreeState="True"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsChecked | bool? | `true` (checked), `false` (unchecked), or `null` (indeterminate). |
| IsThreeState | bool | Whether the control supports the indeterminate state. Default `false`. |
| Checked | event | Fires when `IsChecked` becomes `true`. |
| Unchecked | event | Fires when `IsChecked` becomes `false`. |
| Indeterminate | event | Fires when `IsChecked` becomes `null`. Only occurs when `IsThreeState` is `true`. |
| Click | event | Occurs when clicked (inherited from ButtonBase). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.Primitives` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` toggle primitives and Jetpack Compose `ToggleButton`.
- Derived classes: `AppBarToggleButton`, `CheckBox`, `RadioButton`.
- The indeterminate and unchecked states share the same default visual state on `ToggleButton` itself; derived controls like `CheckBox` define distinct visuals.

## Related

- [CheckBox](./checkbox.md)
- [RadioButton](./radiobutton.md)
- [ToggleSwitch](./toggleswitch.md)
