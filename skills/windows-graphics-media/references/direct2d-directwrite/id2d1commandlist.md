# ID2D1CommandList

Represents a sequence of Direct2D drawing commands that can be recorded once and replayed with full vector fidelity. Bitmaps, effects, and geometries are stored as references while brushes are stored by value, so all resource creation/destruction happens outside the command list itself.

## Signature / Usage

```cpp
ID2D1CommandList* pCommandList = nullptr;
pDeviceContext->CreateCommandList(&pCommandList);

pDeviceContext->SetTarget(pCommandList);
pDeviceContext->BeginDraw();
RenderMyVectorContent(pDeviceContext);
hr = pDeviceContext->EndDraw();
pCommandList->Close();

// Replay later onto a bitmap target
pDeviceContext->SetTarget(pTargetBitmap);
pDeviceContext->BeginDraw();
pDeviceContext->DrawImage(pCommandList);
pDeviceContext->EndDraw();
```

## Options / Props

| Method | Description |
|------|-------------|
| Close | Stops the command list from accepting further commands so it can be used as an effect input or with `DrawImage`. |
| Stream | Streams the recorded commands to the specified `ID2D1CommandSink`. |

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from `ID2D1Image`. Created via [ID2D1DeviceContext::CreateCommandList](./id2d1devicecontext.md); set as the context's render target with `SetTarget`, same as a bitmap.
- Introduced with Direct2D 1.1. Unlike setting a bitmap as target (which rasterizes immediately), a command list retains vector content for later resolution-independent playback via `DrawImage`.
- Useful as the input to an `ID2D1ImageBrush` (tiling/pattern fills that stay vector) and as a lower-memory replacement for `CreateCompatibleRenderTarget` when printing or compositing.
- Direct3D/DXGI and GDI interop content is not recorded — it is rasterized in place and stored as an `ID2D1Bitmap`, losing resolution independence at that point.

## Related

- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1Device](./id2d1device.md)
