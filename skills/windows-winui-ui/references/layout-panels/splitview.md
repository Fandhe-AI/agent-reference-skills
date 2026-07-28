# SplitView

Represents a container with two views: one for the main content and another (the pane) typically used for navigation commands.

## Signature / Usage

```xaml
<SplitView IsPaneOpen="True"
           DisplayMode="Inline"
           OpenPaneLength="296">
    <SplitView.Pane>
        <TextBlock Text="Pane" FontSize="24"/>
    </SplitView.Pane>
    <Grid>
        <TextBlock Text="Content" FontSize="24"/>
    </Grid>
</SplitView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Content | `object` | Main content area, always present |
| Pane | `object` | Pane content, typically navigation commands |
| IsPaneOpen | `bool` | Whether the pane is expanded to its full width |
| DisplayMode | `SplitViewDisplayMode` | `Overlay`, `Inline`, `CompactOverlay`, or `CompactInline` — how the pane interacts with the content |
| OpenPaneLength | `double` | Width of the pane when fully expanded |
| CompactPaneLength | `double` | Width of the pane in a compact display mode |
| PanePlacement | `SplitViewPanePlacement` | Whether the pane appears on the left or right side of the content |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Control`. Distinct from `@ark-ui/react` / `@chakra-ui/react` drawer primitives and Jetpack Compose `ModalNavigationDrawer`.
- With `Overlay` (default), the pane overlays the content and disappears entirely when closed; `Inline`/`CompactInline` place the pane and content side by side; the `Compact*` modes keep a narrow sliver of the pane visible even when closed.
- SplitView has no built-in toggle affordance — provide your own button bound to `IsPaneOpen`.
- Commonly paired with `AdaptiveTrigger`/`VisualState` to switch `DisplayMode` at width breakpoints (e.g. `Inline` on wide windows, `CompactInline`/`Overlay` on narrow ones).

## Related

- [ScrollViewer](./scrollviewer.md)
- [Responsive Layouts](./responsive-layouts.md)
