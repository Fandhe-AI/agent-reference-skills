# WPF Basic Controls: Button, Grid, StackPanel

Core WPF layout and content controls from `System.Windows.Controls`. `Grid` and `StackPanel` are layout panels; `Button` is a `ContentControl` deriving from `ButtonBase`.

## Signature / Usage

```xaml
<Grid Margin="10">
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>

    <StackPanel Orientation="Horizontal" Grid.Row="0">
        <Button Content="OK" Width="80" Click="OkButton_Click"/>
        <Button Content="Cancel" Width="80" Margin="8,0,0,0"/>
    </StackPanel>
</Grid>
```

```csharp
private void OkButton_Click(object sender, RoutedEventArgs e)
{
    MessageBox.Show("OK clicked");
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Grid.RowDefinitions` / `ColumnDefinitions` | collection | Declares rows/columns; use `Grid.Row`/`Grid.Column` attached properties on children |
| `StackPanel.Orientation` | `Orientation` | `Vertical` (default) or `Horizontal` stacking |
| `Button.Content` | `object` | `ContentControl` content (text, or any element) |
| `Button.Click` | routed event (`RoutedEventHandler`) | Bubbling routed event raised on click |
| `Button.IsDefault` / `IsCancel` | `bool` | Wires the button to Enter / Esc key |
| `FrameworkElement.Margin` / `Padding` | `Thickness` | Spacing outside/inside the element |

## Notes

- `Button.Click` is a **bubbling routed event** (see `wpf-routed-events.md`), unlike a plain CLR event.
- `Grid` supports star (`*`) sizing for proportional layout; `StackPanel` only stacks children along one axis and ignores available space beyond content size.
- These are `System.Windows.Controls.*` (WPF) types. `Microsoft.UI.Xaml.Controls.Button` / `Grid` / `StackPanel` (WinUI 3) and `System.Windows.Forms.Button` (WinForms, event-driven, not routed) are separate, same-named APIs — see `wpf-vs-winui3.md`.

## Related

- [wpf-routed-events.md](./wpf-routed-events.md)
- [wpf-dependency-property.md](./wpf-dependency-property.md)
- [wpf-styles-templates.md](./wpf-styles-templates.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
