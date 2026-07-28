# PipsPager

Lets users navigate paginated content using a configurable collection of glyphs (pips), each representing a page, without needing explicit page numbers.

## Signature / Usage

```xaml
<PipsPager x:Name="FlipViewPipsPager"
    HorizontalAlignment="Center"
    NumberOfPages="{x:Bind Pictures.Count}"
    SelectedPageIndex="{x:Bind Path=Gallery.SelectedIndex, Mode=TwoWay}" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NumberOfPages` | `int` | Total number of pages/pips. |
| `SelectedPageIndex` | `int` | Gets/sets the currently selected page index. |
| `MaxVisiblePips` | `int` | Maximum number of pips shown before scrolling (default 5). |
| `Orientation` | `Orientation` | `Horizontal` (default) or `Vertical`. |
| `PreviousButtonVisibility` / `NextButtonVisibility` | `PipsPagerButtonVisibility` | `Collapsed` (default), `Visible`, or `VisibleOnPointerOver`. |
| `PreviousButtonStyle` / `NextButtonStyle` | `Style` | Custom styles for the navigation buttons; take precedence over the `*Visibility` properties. |
| `SelectedPipStyle` / `NormalPipStyle` | `Style` | Custom styles for selected/unselected pips. |
| `WrapMode` | `PipsPagerWrapMode` | `None` (default) or `Wrap` (navigate continuously between first and last item; Windows App SDK 1.6+). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- Commonly paired with a `FlipView` by binding `SelectedPageIndex` to `FlipView.SelectedIndex`.
- Set `IsEnabled="False"` to use PipsPager purely as a page indicator without user interaction.

## Related

- [NavigationView](./navigationview.md)
