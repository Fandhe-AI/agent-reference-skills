# Keyboard accessibility

Keyboard access should be treated as a primary interaction model, not a secondary fallback — it supports users with vision, learning, dexterity/mobility, and language/communication disabilities, and improves productivity for keyboard-first users.

## Signature / Usage

By default, tab order follows declaration/insertion order. Use `TabIndex` to align traversal with visual flow when layout diverges from reading order.

```xaml
<Grid>
  <Grid.RowDefinitions>...</Grid.RowDefinitions>
  <Grid.ColumnDefinitions>...</Grid.ColumnDefinitions>

  <TextBlock Grid.Column="1" HorizontalAlignment="Center">Groom</TextBlock>
  <TextBlock Grid.Column="2" HorizontalAlignment="Center">Bride</TextBlock>

  <TextBox x:Name="GroomFirstName" Grid.Row="1" Grid.Column="1" TabIndex="1"/>
  <TextBox x:Name="BrideFirstName" Grid.Row="1" Grid.Column="2" TabIndex="3"/>
</Grid>
```

Keyboard shortcuts (accelerators and access keys) should be exposed to assistive technology via automation metadata, in addition to being implemented in code:

```xaml
<Button x:Name="PlayButton" Click="MediaButton_Click"
  ToolTipService.ToolTip="Shortcut key: Ctrl+P"
  AutomationProperties.AcceleratorKey="Ctrl+P"
  AutomationProperties.AccessKey="Alt+P">
  <Button.KeyboardAccelerators>
    <KeyboardAccelerator Modifiers="Control" Key="P"/>
  </Button.KeyboardAccelerators>
  <TextBlock>Play</TextBlock>
</Button>
```

## Options / Props

| Property | Type | Description |
|------|-------------|------|
| `TabIndex` | int | Explicit tab order; unset defaults to `Int32.MaxValue` (insertion order). 0 = insertion order among zero values; >0 ascending; <0 before zero values |
| `IsEnabled` | bool | `false` disables interaction and removes the element from tab order |
| `IsTabStop` | bool | `false` keeps an element interactive by other means but excludes it from Tab traversal |
| `AutomationProperties.AccessKey` | string | Exposes mnemonic shortcut metadata (e.g. `Alt+P`) to assistive technology |
| `AutomationProperties.AcceleratorKey` | string | Exposes command shortcut metadata (e.g. `Ctrl+P`) to assistive technology |

## Notes

- **F6** moves focus between major application panes (address bar, tab strip, content, etc.); it must be implemented explicitly — it is not automatic. **Shift+F6** should traverse the same cycle in reverse.
- Composite controls (`ListView`, `GridView`, `ListBox`, `FlipView`) provide built-in arrow-key navigation among child elements; keep the composite root in tab order and manage active descendants internally rather than exposing every child as a separate tab stop.
- Setting `AutomationProperties.AcceleratorKey`/`AccessKey` only exposes metadata — keyboard behavior must still be implemented via `KeyboardAccelerator`, `KeyDown`, or `KeyUp`.
- Any focusable custom control should expose a visible focus indicator, typically an overlay `Rectangle` toggled via `VisualStateManager` on `GotFocus`/`Unfocused` states. Built-in controls provide this by default; preserve equivalent focus visibility if you retemplate a control.
- On devices without a hardware keyboard, Narrator provides gesture equivalents for Tab-like traversal, so keyboard concepts (tab order, focus) still apply.
- `Grid`, `TextBlock`, `TextBox`, `Button`, `ListView`, `GridView`, `ListBox`, `FlipView`, `RichTextBlock` referenced here are `Microsoft.UI.Xaml.Controls` (WinUI 3) types, distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.

## Related

- [Accessibility overview](./accessibility-overview.md)
- [Accessible text requirements](./accessible-text-requirements.md)
- [Contrast themes](./high-contrast-themes.md)
