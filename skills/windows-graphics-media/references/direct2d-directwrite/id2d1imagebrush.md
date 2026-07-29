# ID2D1ImageBrush

Represents a brush based on an [ID2D1Image](./id2d1devicecontext.md) (an effect output, command list, or bitmap) rather than a fixed bitmap, allowing an arbitrary image graph to be used as fill content.

## Signature / Usage

```cpp
D2D1_IMAGE_BRUSH_PROPERTIES brushProps = D2D1::ImageBrushProperties(
    sourceRectangle,               // D2D1_RECT_F: region of the image space to tile/interpolate
    D2D1_EXTEND_MODE_CLAMP,        // extendModeX
    D2D1_EXTEND_MODE_CLAMP,        // extendModeY
    D2D1_INTERPOLATION_MODE_LINEAR // interpolationMode
    );

ID2D1ImageBrush* pImageBrush = nullptr;
hr = pDeviceContext->CreateImageBrush(pImage, brushProps, &pImageBrush);

pDeviceContext->FillRectangle(&destRect, pImageBrush);
```

## Options / Props

| Method | Description |
|------|-------------|
| GetImage / SetImage | Gets/sets the `ID2D1Image` (bitmap, effect output, or command list) the brush paints with. |
| GetSourceRectangle / SetSourceRectangle | Gets/sets the rectangle, in the image's own space, used as the bounds of the image when drawn as a brush. |
| GetExtendModeX / SetExtendModeX | Gets/sets how content inside the source rectangle is extended on the x-axis (`D2D1_EXTEND_MODE_CLAMP`, `_WRAP`, `_MIRROR`). |
| GetExtendModeY / SetExtendModeY | Gets/sets the extend mode on the y-axis. |
| GetInterpolationMode / SetInterpolationMode | Gets/sets the interpolation mode used when the image is scaled. |

`D2D1_IMAGE_BRUSH_PROPERTIES` (built via the `D2D1::ImageBrushProperties` helper) bundles `sourceRectangle`, `extendModeX`, `extendModeY`, and `interpolationMode` for brush creation.

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from ID2D1Brush, like [ID2D1BitmapBrush](./id2d1bitmapbrush.md), [ID2D1SolidColorBrush](./id2d1solidcolorbrush.md), [ID2D1LinearGradientBrush](./id2d1lineargradientbrush.md), and [ID2D1RadialGradientBrush](./id2d1radialgradientbrush.md). Created via `ID2D1DeviceContext::CreateImageBrush` (see [ID2D1DeviceContext](./id2d1devicecontext.md)) — not available on the base `ID2D1RenderTarget`.
- Unlike `ID2D1BitmapBrush`, the source is any `ID2D1Image` — including an effect graph ([ID2D1Effect](./id2d1effect.md)) or an [ID2D1CommandList](./id2d1commandlist.md) — so the brush can paint with computed or recorded content, not just a decoded bitmap.
- Requires Direct2D 1.1 (Windows 8 and the Platform Update for Windows 7).
- A device-dependent resource: recreate it whenever the device context is recreated.

## Related

- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1BitmapBrush](./id2d1bitmapbrush.md)
- [ID2D1Effect](./id2d1effect.md)
- [ID2D1CommandList](./id2d1commandlist.md)
