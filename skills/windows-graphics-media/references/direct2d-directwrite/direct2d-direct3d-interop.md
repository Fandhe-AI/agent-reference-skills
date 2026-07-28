# Direct2D and Direct3D interoperability

Direct2D interoperates with Direct3D through DXGI, allowing 2D content to be mixed with 3D rendering: draw Direct2D content directly to a Direct3D surface, or use a Direct3D scene as a Direct2D bitmap.

## Signature / Usage

```cpp
// Obtain a DXGI surface from a swap chain back buffer.
hr = m_pSwapChain->GetBuffer(0, IID_PPV_ARGS(&pBackBuffer));

D2D1_RENDER_TARGET_PROPERTIES props = D2D1::RenderTargetProperties(
    D2D1_RENDER_TARGET_TYPE_DEFAULT,
    D2D1::PixelFormat(DXGI_FORMAT_UNKNOWN, D2D1_ALPHA_MODE_PREMULTIPLIED),
    dpiX, dpiY);

hr = m_pD2DFactory->CreateDxgiSurfaceRenderTarget(pBackBuffer, &props, &m_pBackBufferRT);

m_pBackBufferRT->BeginDraw();
m_pBackBufferRT->FillRectangle(&rect, m_pGradientBrush);
hr = m_pBackBufferRT->EndDraw();
```

## Options / Props

| Approach | Description |
|------|-------------|
| ID2D1Factory::CreateDxgiSurfaceRenderTarget | Wraps an IDXGISurface as an [ID2D1RenderTarget](./id2d1rendertarget.md) so Direct2D can draw directly onto a Direct3D swap-chain buffer or texture. |
| ID2D1RenderTarget::CreateSharedBitmap | Creates an [ID2D1Bitmap1](./id2d1bitmap1.md) from an IDXGISurface so a Direct3D-rendered scene can be drawn/composited with Direct2D. |
| ID2D1DeviceContext::CreateBitmapFromDxgiSurface | Device-context equivalent that creates an ID2D1Bitmap1 target/source bound to a DXGI surface (Direct2D 1.1+). |

## Notes

- Direct3D 10.1+ interop requires DirectX 11.0; Direct3D 11 interop requires DirectX 11.1+.
- The `ID3D10Device1`/`ID3D11Device` used to create the DXGI surface must support BGRA formats (`D3D10_CREATE_DEVICE_BGRA_SUPPORT` / `D3D11_CREATE_DEVICE_BGRA_SUPPORT`).
- A DXGI surface render target does not support `Resize`; release and recreate it when the surface changes size. Keep at least one Direct2D resource created by the render target (e.g. an `ID2D1Bitmap`) alive across recreation to avoid destroying the underlying Direct3D device.
- The render target and the DXGI surface must use the same DXGI format (or `DXGI_FORMAT_UNKNOWN` to inherit the surface's format).

## Related

- [ID2D1Factory](./id2d1factory.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1Bitmap1](./id2d1bitmap1.md)
