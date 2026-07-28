# ScrollViewer

Represents a scrollable area that can contain other visible elements.

## Signature / Usage

```xaml
<ScrollViewer Height="200" Width="300"
              HorizontalScrollBarVisibility="Auto"
              VerticalScrollBarVisibility="Auto">
    <TextBlock Width="500" TextWrapping="Wrap"
        Text="Lorem ipsum dolor sit amet..." />
</ScrollViewer>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Content | `object` | The scrollable content (inherited from `ContentControl`) |
| HorizontalScrollBarVisibility / VerticalScrollBarVisibility | `ScrollBarVisibility` | `Auto`, `Visible`, `Hidden`, or `Disabled` scrollbar display |
| HorizontalScrollMode / VerticalScrollMode | `ScrollMode` | Whether scrolling is enabled, disabled, or auto in that axis |
| ZoomMode | `ZoomMode` | Enables/disables pinch-zoom of content |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `ContentControl`. In this layout-panels scope, `ScrollView` (`Microsoft.UI.Xaml.Controls.ScrollView`, WinUI 3's newer scrolling control) is the successor to `ScrollViewer` and shares similar layout intent (viewport vs. extent, scroll-bar visibility); prefer `ScrollView` in new WinUI 3 code where available, and `ScrollViewer` for compatibility with controls that embed it internally (e.g. `ListView`, `TextBox`).
- The visible area is the *viewport*; the total content area is the *extent*.
- Commonly embedded inside other controls (`ListView`, `GridView`, `TextBox`, `RichEditBox`) to provide scrolling.

## Related

- [Grid](./grid.md)
- [SplitView](./splitview.md)
