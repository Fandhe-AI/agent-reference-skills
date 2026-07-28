# RepeatButton

A button that raises the `Click` event repeatedly while it is pressed and held. Useful for incrementing/decrementing values.

## Signature / Usage

```xaml
<StackPanel>
    <RepeatButton Width="100" Delay="500" Interval="100" Click="Increase_Click">Increase</RepeatButton>
    <RepeatButton Width="100" Delay="500" Interval="100" Click="Decrease_Click">Decrease</RepeatButton>
</StackPanel>
```

```csharp
private void Increase_Click(object sender, RoutedEventArgs e)
{
    _clicks += 1;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Delay | int (ms) | Time waited after the button is pressed before it starts repeating the click action. |
| Interval | int (ms) | Time between repetitions of the click action once repeating starts. |
| Content | object | The content of the button (inherited from ContentControl). |
| Click | event | Occurs repeatedly while the button is pressed (inherited from ButtonBase). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.Primitives` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` and Jetpack Compose button primitives.
- Inherits directly from `ButtonBase`, not `Button`.

## Related

- [Button](./button.md)
