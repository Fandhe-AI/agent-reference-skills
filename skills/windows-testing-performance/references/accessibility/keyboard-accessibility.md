# Keyboard accessibility

Keyboard access should be treated as a primary interaction model, not a fallback. Any UI activatable by pointer must also be operable and invokable by keyboard, with a predictable tab order and discoverable shortcuts.

## Signature / Usage

```xaml
<!-- Explicit tab order -->
<TextBox x:Name="GroomFirstName" Grid.Row="1" Grid.Column="1" TabIndex="1"/>
<TextBox x:Name="BrideFirstName" Grid.Row="1" Grid.Column="2" TabIndex="3"/>

<!-- Keyboard accelerator + accessible shortcut metadata -->
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

| Name | Type | Description |
|------|------|-------------|
| `UIElement.TabIndex` | `int` | Explicit tab-order value. Default is `Int32.MaxValue` (declaration order). Elements with `TabIndex == 0` follow declaration order; `> 0` ascend by value; `< 0` come before zero-valued elements. |
| `UIElement.IsTabStop` | `bool` | Set `false` to keep an element focusable through other mechanisms (e.g. programmatic focus) while excluding it from Tab traversal. Setting `Control.IsEnabled = false` also removes an element from tab order but disables interaction entirely. |
| `KeyboardAccelerator` | class (`Microsoft.UI.Xaml.Input`) | Declarative key-combination binding (e.g. `Modifiers="Control" Key="P"`) attached via `UIElement.KeyboardAccelerators`; implements the actual shortcut behavior. |
| `AutomationProperties.AcceleratorKey` | `string` | Exposes command-shortcut text (e.g. `"Ctrl+P"`) to UI Automation/screen readers. Metadata only — does not implement the shortcut. |
| `AutomationProperties.AccessKey` | `string` | Exposes mnemonic-shortcut text (e.g. `"Alt+P"`) to UI Automation/screen readers. Metadata only — access-key underline styling is not automatic; render it explicitly if desired. |
| `UIElement.KeyDown` / `KeyUp` | routed events | Use for custom key routing logic beyond declarative `KeyboardAccelerator`; bubble from children to parent containers. |
| `Control.OnKeyDown` / `OnKeyUp` | protected virtual methods | Override in custom controls for arrow-key or orientation-specific navigation (e.g. expand/collapse on left/right arrow). |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.UIElement`, `Microsoft.UI.Xaml.Input.KeyboardAccelerator`, `Microsoft.UI.Xaml.Automation.AutomationProperties`).
- `ListView`, `GridView`, `ListBox`, and `FlipView` provide built-in arrow-key navigation among their items; the composite root typically stays the single tab stop while children are internally managed active descendants.
- **F6** should move focus between major application panes (e.g. address bar, nav pane, content); you must implement this explicitly — it is not automatic. **Shift+F6** should reverse the cycle. F6 regions can align with, but don't need to exactly match, landmarks/headings.
- Composition over custom pointer handling: wrap an `Image` in a `Button` rather than handling `PointerPressed` directly, to inherit keyboard activation, focus, and automation behavior for free.
- Focus-visual toggling in a custom `ControlTemplate` uses a `FocusStates` `VisualStateGroup` with `Focused` / `Unfocused` / `PointerFocused` states — see [Focus visuals](./focus-visuals.md) for `UseSystemFocusVisuals` and related properties.
- Devices without a hardware keyboard: Narrator provides gesture equivalents for Tab and directional navigation via the Soft Input Panel, so coherent tab order still matters.

## Related

- [AutomationProperties (attached properties)](./automation-properties.md)
- [Focus visuals](./focus-visuals.md)
- [Landmarks and headings](./landmarks-and-headings.md)
- [Custom automation peers](./automation-peers.md)
