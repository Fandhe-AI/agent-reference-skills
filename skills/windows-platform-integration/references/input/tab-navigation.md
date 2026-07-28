# Tab navigation (TabIndex, IsTabStop, TabFocusNavigation)

The Tab key cycles focus between all interactive controls in the app; `IsTabStop`, `TabIndex`, and `TabFocusNavigation` customize which elements participate and in what order.

## Signature / Usage

```xaml
<StackPanel TabFocusNavigation="Cycle">
    <Button Name="B1" TabIndex="1" />
    <Button Name="B7" TabIndex="2" IsTabStop="False" />
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Control.IsTabStop` | `bool` | Must be `true` (with `IsEnabled` true) for a control to be included in the tab order; set `false` to exclude it. |
| `Control.TabIndex` | `int` | Overrides default tab order (document order); lower values receive focus first. Elements without an explicit value get the next-highest index. |
| `UIElement.TabFocusNavigation` | `KeyboardNavigationMode` | `Local` (default, tab indexes recognized in the local subtree), `Once` (container and children receive focus once, as a group), `Cycle` (focus cycles back to the first focusable element inside the container). |
| `Control.TabNavigation` | `KeyboardNavigationMode` | Legacy equivalent of `TabFocusNavigation` for objects using a `ControlTemplate`. |

## Notes

- Namespace: `Microsoft.UI.Xaml` (`UIElement.TabFocusNavigation`) and `Microsoft.UI.Xaml.Controls` (`Control.IsTabStop`, `Control.TabIndex`, `Control.TabNavigation`).
- Default tab order reflects the order controls are declared/created in the visual tree; use `TabIndex` to override without changing markup order.
- Recommend against making child elements of an `XYFocusKeyboardNavigation="Enabled"` directional area separate tab stops — arrow keys should handle inner navigation instead.

## Related

- [XY focus](./xy-focus.md)
- [Focus manager](./focus-manager.md)
