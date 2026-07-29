# ID2D1Layer

Represents the backing store required to render a layer — an offscreen buffer used with `PushLayer`/`PopLayer` to apply an opacity, opacity-mask brush, or geometric mask to a group of drawing operations. `PushAxisAlignedClip`/`PopAxisAlignedClip` provide a lighter-weight, layer-free alternative for simple rectangular clipping.

## Signature / Usage

```cpp
ID2D1Layer* pLayer = nullptr;
hr = pRenderTarget->CreateLayer(nullptr, &pLayer);

pRenderTarget->PushLayer(
    D2D1::LayerParameters(D2D1::InfiniteRect(), m_pPathGeometry),
    pLayer
    );
pRenderTarget->DrawBitmap(m_pBitmap, D2D1::RectF(0, 0, 200, 133));
pRenderTarget->PopLayer();

// Lightweight rectangular clip without a layer resource
pRenderTarget->PushAxisAlignedClip(&clipRect, D2D1_ANTIALIAS_MODE_ALIASED);
pRenderTarget->DrawRectangle(&rc, m_pBlackBrush);
pRenderTarget->PopAxisAlignedClip();
```

## Options / Props

| Method | Description |
|------|-------------|
| GetSize | Gets the size of the layer in device-independent pixels. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Resource. Created via `ID2D1RenderTarget::CreateLayer`; used with `PushLayer`/`PopLayer` and `PushAxisAlignedClip`/`PopAxisAlignedClip` on [ID2D1RenderTarget](./id2d1rendertarget.md).
- If no size is passed to `CreateLayer`, the following `PushLayer` call determines the minimum backing-store size from the layer content bounds and geometric mask; the layer resource only grows, never shrinks, across reuse.
- Between a `PushLayer` and its matching `PopLayer`, the layer is in use and cannot be used with another render target.
- A device-dependent resource: recreate it whenever the render target is recreated.

## Related

- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1Geometry](./id2d1geometry.md)
