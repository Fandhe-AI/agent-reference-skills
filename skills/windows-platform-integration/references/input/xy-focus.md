# XY focus (2D directional navigation)

Arrow-key / D-pad directional navigation between controls within a "directional area", controlled by `XYFocusKeyboardNavigation` and the `XYFocus*NavigationStrategy` properties.

## Signature / Usage

```xaml
<StackPanel Name="ContainerPrimary"
            XYFocusKeyboardNavigation="Enabled"
            Orientation="Horizontal">
    <Button Name="B1" Content="B1" />
    <Button Name="B2" Content="B2" />
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UIElement.XYFocusKeyboardNavigation` | `XYFocusKeyboardNavigationMode` | `Auto` (default; inherited from ancestors), `Enabled` (arrow keys navigate within the element and its children), `Disabled` (blocks directional navigation into the subtree). |
| `UIElement.XYFocusUpNavigationStrategy` / `DownNavigationStrategy` / `LeftNavigationStrategy` / `RightNavigationStrategy` | `XYFocusNavigationStrategy` | `Auto` (default), `Projection`, `NavigationDirectionDistance`, `RectilinearDistance` — algorithm used to pick the next focus candidate per direction. |
| `FindNextElementOptions.XYFocusNavigationStrategyOverride` | `XYFocusNavigationStrategyOverride` | Per-call override for `FocusManager.FindNextElement`. |

## Notes

- Namespace: `Microsoft.UI.Xaml` (`UIElement.XYFocusKeyboardNavigation` and strategy properties); `XYFocusKeyboardNavigationMode`/`XYFocusNavigationStrategy` are `Microsoft.UI.Xaml.Input`.
- `Tab` key navigation is independent of `XYFocusKeyboardNavigation`; see [Tab navigation](./tab-navigation.md).
- `Projection`: moves focus to the first element whose bounds intersect the projected edge of the focused element in the given direction. `RectilinearDistance`: picks the closest candidate by taxicab distance. `NavigationDirectionDistance`: picks the closest candidate along the extended projected edge.
- Applies to keyboard, gamepad, remote control, and accessibility tools (Narrator) uniformly — same underlying mechanism.

## Related

- [Focus manager](./focus-manager.md)
- [Tab navigation](./tab-navigation.md)
