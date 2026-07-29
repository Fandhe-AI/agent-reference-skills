# CompositionDrawingSurface / CompositionGraphicsDevice

`CompositionDrawingSurface` is a fixed-size `ICompositionSurface` that can be painted onto a [SpriteVisual](./sprite-visual.md) via [CompositionSurfaceBrush](./composition-surface-brush.md), and drawn into using Win2D (Direct2D) or a `MediaPlayer` frame. `CompositionGraphicsDevice` is the factory that creates drawing surfaces bound to a particular DirectX device; it also exposes `CreateVirtualDrawingSurface` (for `CompositionVirtualDrawingSurface`, a surface with deferred/tiled realization) and `CreateMipmapSurface`.

## Signature / Usage

```csharp
// 1. Wrap a Win2D CanvasDevice as a CompositionGraphicsDevice.
CanvasDevice canvasDevice = CanvasDevice.GetSharedDevice();
CompositionGraphicsDevice graphicsDevice =
    CanvasComposition.CreateCompositionGraphicsDevice(compositor, canvasDevice);

// 2. Create a fixed-size drawing surface from the device.
CompositionDrawingSurface surface = graphicsDevice.CreateDrawingSurface(
    new Size(100, 100),
    DirectXPixelFormat.B8G8R8A8UIntNormalized,
    DirectXAlphaMode.Premultiplied);

// 3. Draw Win2D content onto the surface (Win2D interop, Microsoft.Graphics.Canvas.UI.Composition).
using (CanvasDrawingSession ds = CanvasComposition.CreateDrawingSession(surface))
{
    ds.Clear(Colors.Transparent);
    ds.FillEllipse(50, 50, 40, 40, Colors.SeaGreen);
}

// 4. Paint a SpriteVisual with the surface.
CompositionSurfaceBrush brush = compositor.CreateSurfaceBrush(surface);
spriteVisual.Brush = brush;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CompositionGraphicsDevice.CreateDrawingSurface(Size, DirectXPixelFormat, DirectXAlphaMode) | method | Creates a fixed-size `CompositionDrawingSurface`. |
| CompositionGraphicsDevice.CreateVirtualDrawingSurface(SizeInt32, DirectXPixelFormat, DirectXAlphaMode) | method | Creates a `CompositionVirtualDrawingSurface` — a much larger addressable surface whose tiles are realized/drawn on demand, for large scrollable/zoomable content. |
| CompositionGraphicsDevice.CreateMipmapSurface(SizeInt32, DirectXPixelFormat, DirectXAlphaMode) | method | Creates a `CompositionMipMapSurface` with precomputed mip levels. |
| CompositionGraphicsDevice.CaptureAsync(Visual, SizeInt32, ...) | method | Captures a `Visual` subtree into a composition surface. |
| CompositionGraphicsDevice.RenderingDeviceReplaced | event | Fires when the underlying DirectX device is lost/replaced (e.g. GPU driver reset); surfaces must be redrawn in the handler. |
| CompositionDrawingSurface.Size / SizeInt32 | Size / SizeInt32 | Dimensions of the drawing surface. |
| CompositionDrawingSurface.Resize(SizeInt32) | method | Resizes the surface (content is not automatically preserved/redrawn). |
| CompositionDrawingSurface.Scroll(PointInt32) / Scroll(PointInt32, RectInt32) / ScrollWithClip(...) | method | Shifts existing pixel content within the surface (with an optional source/clip rectangle) instead of a full redraw — used for smooth-scrolling large drawn content. |
| CanvasComposition.CreateCompositionGraphicsDevice(Compositor, CanvasDevice) | static method (Win2D interop) | Creates a `CompositionGraphicsDevice` backed by a Win2D `CanvasDevice`. |
| CanvasComposition.CreateDrawingSession(CompositionDrawingSurface) | static method (Win2D interop) | Opens a `CanvasDrawingSession` for drawing Win2D (Direct2D) content into the surface (or a sub-region, with an overload taking a `Rect`). |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3) for `CompositionDrawingSurface`/`CompositionGraphicsDevice` themselves; the Win2D interop types (`CanvasComposition`, `CanvasDevice`, `CanvasDrawingSession`) live in `Microsoft.Graphics.Canvas.UI.Composition` / `Microsoft.Graphics.Canvas` (the WinUI 3 Win2D package, not the older UWP Win2D). The UWP equivalents are `Windows.UI.Composition.CompositionDrawingSurface` / `CompositionGraphicsDevice`.
- `CompositionGraphicsDevice` is obtained per DirectX device (typically once per app, from a shared `CanvasDevice`), not per surface; multiple `CompositionDrawingSurface`s are created from the same graphics device.
- Alternative content sources for a drawing surface: `LoadedImageSurface` (see [LoadedImageSurface](./loaded-image-surface.md)) for a downloaded/decoded image, or a `MediaPlayer` frame for video — both are simpler than the Win2D drawing-session path when no custom drawing is needed.
- Handle `RenderingDeviceReplaced` to recreate the `CanvasDevice`/`CompositionGraphicsDevice` and redraw all surfaces after a GPU device-lost event; without this, surfaces go blank after a driver reset.
- For lower-level C++/COM Direct2D-on-Direct3D interop (DXGI surface render targets, not the WinRT composition surface), see `direct2d-direct3d-interop` in this skill's direct2d-directwrite category — that page covers `ID2D1RenderTarget`/DXGI-level interop rather than this WinRT/Win2D composition-surface path.

## Related

- [CompositionSurfaceBrush](./composition-surface-brush.md)
- [SpriteVisual](./sprite-visual.md)
- [LoadedImageSurface](./loaded-image-surface.md)
- [Compositor](./compositor.md)
