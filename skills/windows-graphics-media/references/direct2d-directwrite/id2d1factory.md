# ID2D1Factory

Creates Direct2D resources. It is the starting point for using Direct2D; you use it to create render targets, drawing state blocks, and geometries.

## Signature / Usage

```cpp
ID2D1Factory* m_pDirect2dFactory;

hr = D2D1CreateFactory(D2D1_FACTORY_TYPE_SINGLE_THREADED, &m_pDirect2dFactory);

hr = m_pDirect2dFactory->CreateHwndRenderTarget(
    D2D1::RenderTargetProperties(),
    D2D1::HwndRenderTargetProperties(m_hwnd, size),
    &m_pRenderTarget
    );
```

## Options / Props

| Method | Description |
|------|-------------|
| CreateHwndRenderTarget | Creates an ID2D1HwndRenderTarget that renders to a window. |
| CreateDxgiSurfaceRenderTarget | Creates a render target that draws to a DXGI surface (Direct3D interop). |
| CreateWicBitmapRenderTarget | Creates a render target that renders to a WIC bitmap. |
| CreateDCRenderTarget | Creates a render target that draws to a GDI device context. |
| CreatePathGeometry | Creates an empty ID2D1PathGeometry. |
| CreateRectangleGeometry / CreateEllipseGeometry / CreateRoundedRectangleGeometry | Creates simple geometries. |
| CreateStrokeStyle | Creates an ID2D1StrokeStyle. |
| CreateDrawingStateBlock | Creates a drawing state block for SaveDrawingState/RestoreDrawingState. |
| GetDesktopDpi | Retrieves the current desktop DPI. |

## Notes

- Namespace: Win32 COM (d2d1.h). Created via `D2D1CreateFactory`.
- Retain the factory instance for the lifetime of the app; you generally don't need to recreate it.
- Can be created as single-threaded (best CPU scaling) or multithreaded (serialized calls, shared resources).
- Superseded for device/effect creation by [ID2D1Factory1](./id2d1factory1.md), obtained via QueryInterface or created directly.

## Related

- [ID2D1Factory1](./id2d1factory1.md)
- [D2D1CreateFactory](./d2d1createfactory.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1PathGeometry](./id2d1pathgeometry.md)
- [ID2D1StrokeStyle](./id2d1strokestyle.md)
