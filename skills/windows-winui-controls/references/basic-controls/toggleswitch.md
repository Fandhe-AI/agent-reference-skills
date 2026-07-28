# ToggleSwitch

Represents a physical on/off switch. Use for binary settings whose changes take effect immediately, unlike `CheckBox` which is for status that can be committed later.

## Signature / Usage

```xaml
<ToggleSwitch x:Name="lightToggle" Header="Kitchen Lights" IsOn="True"
              Toggled="ToggleSwitch_Toggled"/>
```

```csharp
private void ToggleSwitch_Toggled(object sender, RoutedEventArgs e)
{
    var toggleSwitch = sender as ToggleSwitch;
    bool isOn = toggleSwitch.IsOn;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsOn | bool | Whether the switch is "On". |
| Header | object | Label content for the control. |
| OnContent | object | Content shown when the state is "On" (default label: "On"). |
| OffContent | object | Content shown when the state is "Off" (default label: "Off"). |
| OnContentTemplate | DataTemplate | Template for more complex `OnContent`. |
| OffContentTemplate | DataTemplate | Template for more complex `OffContent`. |
| Toggled | event | Occurs when `IsOn` changes. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `Switch` and Jetpack Compose `Switch`.
- Use a toggle switch for binary settings that take effect immediately after the user flips it (e.g. WiFi on/off). Use `CheckBox` when the change requires an extra confirmation step, or when multiple related items can be selected.
- The default On/Off labels are localized automatically; avoid replacing them unless necessary for the toggle to make sense.

## Related

- [CheckBox](./checkbox.md)
