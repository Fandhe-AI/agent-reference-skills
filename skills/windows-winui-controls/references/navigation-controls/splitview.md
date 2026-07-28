# SplitView

A control with an expandable/collapsible pane and an always-visible content area, positionable on either side of the window.

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
| `IsPaneOpen` | `bool` | Gets/sets whether the pane is expanded. |
| `OpenPaneLength` | `double` | Width of the pane when open. |
| `DisplayMode` | `SplitViewDisplayMode` | `Overlay`, `Inline`, `CompactOverlay`, `CompactInline`. |
| `PanePlacement` | `SplitViewPanePlacement` | `Left` (default) or `Right`. |
| `CompactPaneLength` | `double` | Width of the pane in its closed compact state (default 48px). |
| `Pane` | `UIElement` | Content of the pane area. |
| `Content` | `object` | Main content area (inherited `ContentControl`). |

## Events

- `PaneClosing` — raised before the pane closes; can be canceled.
- `PaneClosed` — raised after the pane has closed.

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- For a navigation menu with an expand/collapse button and a list of nav items, prefer `NavigationView` instead of building one from SplitView.
- Useful for generic "drawer" experiences, e.g. the list/details pattern.

## Related

- [NavigationView](./navigationview.md)
