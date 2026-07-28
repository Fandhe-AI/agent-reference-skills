# ParallaxView

A container control that ties the scroll position of a foreground element (e.g. a list) to a background element (e.g. an image), animating the background at a different rate as the foreground scrolls to create a depth/parallax effect.

## Signature / Usage

```xaml
<Grid>
    <ParallaxView Source="{x:Bind ForegroundElement}" VerticalShift="50">
        <!-- Background element -->
        <Image x:Name="BackgroundImage" Source="Assets/turntable.png" Stretch="UniformToFill"/>
    </ParallaxView>

    <!-- Foreground element -->
    <ListView x:Name="ForegroundElement">
        <x:String>Item 1</x:String>
        <x:String>Item 2</x:String>
    </ListView>
</Grid>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | `UIElement` | The foreground element to track; should be a `ScrollViewer` or an element containing one (e.g. `ListView`, `RichEditBox`). |
| VerticalShift | double | Total distance the background shifts vertically over the full parallax operation; `0` means no vertical movement. |
| HorizontalShift | double | Total distance the background shifts horizontally over the full parallax operation; `0` means no horizontal movement. |
| Child (content) | `UIElement` | The background element, added as a child of `ParallaxView` (e.g. an `Image` or a panel). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- Place the `ParallaxView` behind the foreground element using a layering panel (`Grid` or `Canvas`); it automatically resizes its background content so it never scrolls out of view.
- Larger `VerticalShift`/`HorizontalShift` values produce a more dramatic effect; both default to `0` (no movement).
- Recommended for lists with a background image, or `ListViewItem` content containing an image; avoid overusing parallax across an app.

## Related

- [Implicit Animations](./implicit-animations.md)
