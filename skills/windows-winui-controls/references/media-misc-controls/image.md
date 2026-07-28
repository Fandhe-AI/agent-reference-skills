# Image

A control that displays image content (`Image` element) or paints another object with an image (`ImageBrush`).

## Signature / Usage

```xaml
<Image Width="200" Source="sunset.jpg" />

<Ellipse Height="200" Width="300">
   <Ellipse.Fill>
     <ImageBrush ImageSource="sunset.jpg" />
   </Ellipse.Fill>
</Ellipse>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | ImageSource | The image to display. Accepts an absolute URL or a URL relative to the app packaging structure. |
| Stretch | Stretch | `None`, `Uniform` (default), `UniformToFill`, or `Fill`. Controls how the image fills the containing rectangle set by `Width`/`Height`. |
| Clip | Geometry | Clips the image output area; only rectangular clipping (`RectangleGeometry`) is currently supported. |
| Opacity | double | 0.0 (transparent) to 1.0 (opaque, default). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.Image` / `Microsoft.UI.Xaml.Media.ImageBrush` (WinUI 3). Distinct from `System.Windows.Controls.Image` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, Jetpack Compose `Image`, and Three.js texture-based image usage.
- Supported formats: JPEG, PNG, BMP, GIF, TIFF, JPEG XR, ICO.
- Setting `Source`/`ImageSource` in code requires a `BitmapImage` (not a raw `Uri`); use `BitmapSource.SetSourceAsync` for streams.
- `WriteableBitmap` provides a modifiable `BitmapSource`; `RenderTargetBitmap` captures the XAML UI tree to a bitmap.

## Related

- [MediaPlayerElement](./media-player-element.md)
- [AnimatedIcon](./animated-icon.md)
