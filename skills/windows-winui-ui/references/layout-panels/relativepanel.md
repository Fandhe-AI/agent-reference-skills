# RelativePanel

A layout container that positions and aligns child objects in relation to each other or the parent panel, useful for non-linear UI layouts.

## Signature / Usage

```xaml
<RelativePanel BorderBrush="Gray" BorderThickness="10">
    <Rectangle x:Name="RedRect" Fill="Red" MinHeight="100" MinWidth="100"/>
    <Rectangle x:Name="BlueRect" Fill="Blue" MinHeight="100" MinWidth="100"
               RelativePanel.RightOf="RedRect"/>
</RelativePanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| RelativePanel.Above / Below (attached) | element name | Position above/below a sibling |
| RelativePanel.LeftOf / RightOf (attached) | element name | Position left/right of a sibling |
| RelativePanel.AlignLeftWith / AlignTopWith / AlignRightWith / AlignBottomWith (attached) | element name | Align an edge with a sibling's edge |
| RelativePanel.AlignLeftWithPanel / AlignTopWithPanel / AlignRightWithPanel / AlignBottomWithPanel (attached) | `bool` | Align an edge with the panel's edge |
| RelativePanel.AlignHorizontalCenterWith / AlignVerticalCenterWith (attached) | element name | Center-align with a sibling |
| RelativePanel.AlignHorizontalCenterWithPanel / AlignVerticalCenterWithPanel (attached) | `bool` | Center-align with the panel |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel`. Distinct from `@ark-ui/react` / `@chakra-ui/react` relative-positioning primitives and Jetpack Compose `ConstraintLayout`.
- Unconstrained elements default to position (0,0). Conflicting relationships are resolved by priority: panel-alignment relationships first, then sibling alignment, then positional relationships.
- `Stretch` alignment values are ignored unless the attached-property relationships cause stretching (e.g. an element aligned to both the left and right panel edges).
- Well suited for use with `AdaptiveTrigger` / `VisualState` to build responsive UIs without a fixed linear pattern.

## Related

- [Grid](./grid.md)
- [Responsive Layouts](./responsive-layouts.md)
- [Panel](./panel.md)
