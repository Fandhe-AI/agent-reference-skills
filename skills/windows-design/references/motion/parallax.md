# Parallax

Parallax is a visual effect where items closer to the viewer move faster than items in the background, creating a feeling of depth, perspective, and movement as the UI scrolls or pans. In a XAML app, use the `ParallaxView` control to create this effect.

## Signature / Usage

```xaml
<Grid>
    <ParallaxView Source="{x:Bind ForegroundElement}" VerticalShift="50">
        <!-- Background element -->
        <Image x:Name="BackgroundImage" Source="Assets/turntable.png"
               Stretch="UniformToFill"/>
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
|---|---|---|
| Source | element reference | The foreground element whose scroll position drives the effect. Should be a `ScrollViewer`, or an element containing one, such as `ListView` or `RichEditBox`. |
| VerticalShift | double | How far the background shifts vertically over the entire parallax operation. `0` means no movement; larger values create a more dramatic effect. |
| HorizontalShift | double | How far the background shifts horizontally over the entire parallax operation. `0` means no movement; larger values create a more dramatic effect. |
| Background element (child) | `UIElement` | Set as a child of `ParallaxView`, e.g. an `Image` or a panel containing further UI. Automatically resized so it works for the parallax operation. |

### Recommendations

- Use parallax in lists with a background image.
- Consider using parallax in `ListViewItem`s that contain an image.
- Don't use it everywhere — overuse can diminish its impact.

## Notes

- `ParallaxView` must be placed behind the foreground element; `Grid` and `Canvas` panels work well for layering.
- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3) — `ParallaxView` class. Distinct from CSS/JS parallax scrolling libraries and the Motion (Framer Motion) `useScroll`-based parallax pattern.

## Related

- [Motion Overview](./motion-overview.md)
- [Motion Principles](./motion-principles.md)
