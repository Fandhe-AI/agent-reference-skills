# TwoPaneView

A layout control that manages the display of apps with two distinct areas of content (e.g. list/detail), automatically rearranging Pane1/Pane2 side-by-side, top-bottom, or as a single pane based on available window space.

## Signature / Usage

```xaml
<TwoPaneView x:Name="MyTwoPaneView"
             MinWideModeWidth="959"
             MinTallModeHeight="863"
             ModeChanged="TwoPaneView_ModeChanged">
    <TwoPaneView.Pane1>
        <Grid Background="{ThemeResource LayerFillColorDefaultBrush}">
            <TextBlock Text="Pane 1" Margin="24"/>
        </Grid>
    </TwoPaneView.Pane1>

    <TwoPaneView.Pane2>
        <Grid Background="{ThemeResource LayerFillColorAltBrush}">
            <TextBlock Text="Pane 2" Margin="24"/>
        </Grid>
    </TwoPaneView.Pane2>
</TwoPaneView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Pane1` | `UIElement` | Content of the first pane. |
| `Pane2` | `UIElement` | Content of the second pane. |
| `Pane1Length` | `GridLength` | Size of Pane1; supports `Auto`/`*`. Default `Auto` (sizes to content). |
| `Pane2Length` | `GridLength` | Size of Pane2; supports `Auto`/`*`. Default `*` (fills remaining space). |
| `PanePriority` | `TwoPaneViewPriority` | Which pane shows in `SinglePane` mode: `Pane1` (default) or `Pane2`. |
| `MinWideModeWidth` | `double` | Width above which the control enters `Wide` mode. Default 641px. `Double.PositiveInfinity` disables Wide mode. |
| `MinTallModeHeight` | `double` | Height above which the control enters `Tall` mode (when not Wide). Default 641px. `Double.PositiveInfinity` disables Tall mode; `0` disables `SinglePane` mode. |
| `WideModeConfiguration` | `TwoPaneViewWideModeConfiguration` | `SinglePane`, `LeftRight` (default), or `RightLeft`. |
| `TallModeConfiguration` | `TwoPaneViewTallModeConfiguration` | `SinglePane`, `TopBottom` (default), or `BottomTop`. |
| `Mode` | `TwoPaneViewMode` (read-only) | Current layout: `SinglePane`, `Wide`, or `Tall`. |

## Events

- `ModeChanged` — raised before rendering when `Mode` changes (not raised on initial load, so default XAML must represent the initial layout).

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- In a right-to-left (RTL) context, `LeftRight` and `RightLeft` wide-mode configurations automatically swap.
- For a simple expandable/collapsible pane plus content area, prefer `SplitView`. For adaptive resizing and rearrangement between two content areas, use `TwoPaneView`.
- Not the same as `NavigationView`, which is for overall app navigation; `TwoPaneView` is commonly nested inside a `NavigationView`.

## Related

- [SplitView](./splitview.md)
- [NavigationView](./navigationview.md)
