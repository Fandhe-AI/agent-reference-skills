# ID3D11DepthStencilState / ID3D11DepthStencilView

`ID3D11DepthStencilView` binds a depth/stencil texture to the output-merger stage so the pipeline can perform depth testing (occlusion) and stencil testing (masking) during rendering. `ID3D11DepthStencilState` configures how those tests behave (comparison function, write mask, stencil operations) and is set on the context alongside the view.

## Signature / Usage

```cpp
// Depth/stencil texture + view, sized to match the render target.
D3D11_TEXTURE2D_DESC dsDesc = {};
dsDesc.Width = width;
dsDesc.Height = height;
dsDesc.MipLevels = 1;
dsDesc.ArraySize = 1;
dsDesc.Format = DXGI_FORMAT_D24_UNORM_S8_UINT;
dsDesc.SampleDesc.Count = 1;
dsDesc.BindFlags = D3D11_BIND_DEPTH_STENCIL;

ComPtr<ID3D11Texture2D> depthStencilBuffer;
device->CreateTexture2D(&dsDesc, nullptr, &depthStencilBuffer);

ComPtr<ID3D11DepthStencilView> dsv;
device->CreateDepthStencilView(depthStencilBuffer.Get(), nullptr, &dsv);

// State: enable depth testing, disable stencil.
D3D11_DEPTH_STENCIL_DESC stateDesc = {};
stateDesc.DepthEnable = TRUE;
stateDesc.DepthWriteMask = D3D11_DEPTH_WRITE_MASK_ALL;
stateDesc.DepthFunc = D3D11_COMPARISON_LESS;
stateDesc.StencilEnable = FALSE;

ComPtr<ID3D11DepthStencilState> dsState;
device->CreateDepthStencilState(&stateDesc, &dsState);

// Per frame:
context->OMSetDepthStencilState(dsState.Get(), 0);
context->OMSetRenderTargets(1, rtv.GetAddressOf(), dsv.Get());
context->ClearDepthStencilView(dsv.Get(), D3D11_CLEAR_DEPTH | D3D11_CLEAR_STENCIL, 1.0f, 0);
```

## Options / Props

`D3D11_DEPTH_STENCIL_DESC` key fields:

| Name | Type | Description |
|------|------|-------------|
| DepthEnable | BOOL | Enables depth testing; when `FALSE`, depth reads/writes are skipped. |
| DepthWriteMask | D3D11_DEPTH_WRITE_MASK | `ALL` writes depth on a passing test, `ZERO` performs the test without writing (e.g. transparent geometry). |
| DepthFunc | D3D11_COMPARISON_FUNC | Comparison used against the existing depth value (e.g. `D3D11_COMPARISON_LESS`, `LESS_EQUAL`). |
| StencilEnable | BOOL | Enables stencil testing. |
| StencilReadMask / StencilWriteMask | UINT8 | Masks applied when reading/writing the stencil buffer. |
| FrontFace / BackFace | D3D11_DEPTH_STENCILOP_DESC | Per-face stencil fail/depth-fail/pass operations (`StencilFailOp`, `StencilDepthFailOp`, `StencilPassOp`) and `StencilFunc`. |

| Name | Type | Description |
|------|------|-------------|
| ID3D11Device::CreateDepthStencilState(pDesc, ppState) | method | Creates a reusable depth/stencil test configuration. |
| ID3D11Device::CreateDepthStencilView(pResource, pDesc, ppView) | method | Creates a view of a depth/stencil-bindable texture (`D3D11_BIND_DEPTH_STENCIL`) for use as the depth/stencil target. |
| ID3D11DeviceContext::OMSetDepthStencilState(pState, StencilRef) | method | Binds the depth/stencil state; `StencilRef` is the reference value compared by `D3D11_COMPARISON_FUNC` stencil ops. |
| ID3D11DeviceContext::ClearDepthStencilView(pView, ClearFlags, Depth, Stencil) | method | Clears the depth and/or stencil planes of the view. |

## Notes

- The depth/stencil view is passed as the `pDepthStencilView` argument to `OMSetRenderTargets`, alongside the render-target views.
- A depth-only format (e.g. `DXGI_FORMAT_D32_FLOAT`) has no stencil plane; use a combined format (`DXGI_FORMAT_D24_UNORM_S8_UINT`, `DXGI_FORMAT_D32_FLOAT_S8X24_UINT`) to enable stencil testing.
- If `OMSetDepthStencilState` is never called, the pipeline uses a default state equivalent to `DepthEnable = TRUE`, `DepthWriteMask = ALL`, `DepthFunc = LESS`, `StencilEnable = FALSE`.
- Namespace: Win32 COM (`d3d11.h`).

## Related

- [D3D11 resources: Buffer, Texture2D, RenderTargetView](./d3d11-resources.md)
- [D3D11 shaders and drawing pipeline](./d3d11-shaders-drawing.md)
- [ID3D11BlendState / ID3D11RasterizerState](./d3d11-blend-rasterizer.md)
