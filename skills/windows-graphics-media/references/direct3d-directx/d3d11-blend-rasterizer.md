# ID3D11BlendState / ID3D11RasterizerState

`ID3D11BlendState` configures how the output-merger combines a pixel shader's output color with the value already in the render target (alpha blending, per-render-target write masks). `ID3D11RasterizerState` configures the rasterizer stage that converts primitives to pixels (fill mode, cull mode, depth bias, scissor clipping).

## Signature / Usage

```cpp
// Standard alpha blending: srcColor * srcAlpha + dstColor * (1 - srcAlpha).
D3D11_BLEND_DESC blendDesc = {};
auto& rt = blendDesc.RenderTarget[0];
rt.BlendEnable = TRUE;
rt.SrcBlend = D3D11_BLEND_SRC_ALPHA;
rt.DestBlend = D3D11_BLEND_INV_SRC_ALPHA;
rt.BlendOp = D3D11_BLEND_OP_ADD;
rt.SrcBlendAlpha = D3D11_BLEND_ONE;
rt.DestBlendAlpha = D3D11_BLEND_ZERO;
rt.BlendOpAlpha = D3D11_BLEND_OP_ADD;
rt.RenderTargetWriteMask = D3D11_COLOR_WRITE_ENABLE_ALL;

ComPtr<ID3D11BlendState> blendState;
device->CreateBlendState(&blendDesc, &blendState);

// Cull back faces, solid fill.
D3D11_RASTERIZER_DESC rastDesc = {};
rastDesc.FillMode = D3D11_FILL_SOLID;
rastDesc.CullMode = D3D11_CULL_BACK;
rastDesc.FrontCounterClockwise = FALSE;

ComPtr<ID3D11RasterizerState> rasterState;
device->CreateRasterizerState(&rastDesc, &rasterState);

// Per frame:
float blendFactor[4] = { 0, 0, 0, 0 };
context->OMSetBlendState(blendState.Get(), blendFactor, 0xffffffff);
context->RSSetState(rasterState.Get());
```

## Options / Props

`D3D11_RENDER_TARGET_BLEND_DESC` (per render target, up to 8):

| Name | Type | Description |
|------|------|-------------|
| BlendEnable | BOOL | Enables blending for this render-target slot; when `FALSE`, the shader output overwrites the target directly. |
| SrcBlend / DestBlend | D3D11_BLEND | Factors applied to the source (shader output) and destination (existing target) RGB before `BlendOp` combines them. |
| BlendOp | D3D11_BLEND_OP | Combine operator: `ADD`, `SUBTRACT`, `REV_SUBTRACT`, `MIN`, `MAX`. |
| SrcBlendAlpha / DestBlendAlpha / BlendOpAlpha | — | Same, applied to the alpha channel separately. |
| RenderTargetWriteMask | UINT8 | `D3D11_COLOR_WRITE_ENABLE_*` bitmask selecting which RGBA channels are written. |

`D3D11_RASTERIZER_DESC` key fields:

| Name | Type | Description |
|------|------|-------------|
| FillMode | D3D11_FILL_MODE | `SOLID` or `WIREFRAME`. |
| CullMode | D3D11_CULL_MODE | `NONE`, `FRONT`, or `BACK`; which winding is "front" is set by `FrontCounterClockwise`. |
| FrontCounterClockwise | BOOL | When `TRUE`, counter-clockwise-wound triangles are front-facing (default `FALSE` treats clockwise as front). |
| DepthBias / SlopeScaledDepthBias | INT / FLOAT | Offsets applied to depth values to reduce z-fighting (e.g. shadow-map rendering). |
| ScissorEnable | BOOL | Enables clipping to the rectangles set by `RSSetScissorRects`. |
| MultisampleEnable / AntialiasedLineEnable | BOOL | Multisample rasterization behavior for lines/edges. |

| Name | Type | Description |
|------|------|-------------|
| ID3D11Device::CreateBlendState(pDesc, ppBlendState) | method | Creates a reusable blend configuration (up to 8 independent render-target slots unless `IndependentBlendEnable = FALSE`, which reuses slot 0 for all). |
| ID3D11Device::CreateRasterizerState(pDesc, ppRasterizerState) | method | Creates a reusable rasterizer configuration. |
| ID3D11DeviceContext::OMSetBlendState(pState, BlendFactor, SampleMask) | method | Binds the blend state; `BlendFactor` supplies the RGBA constant used by `D3D11_BLEND_BLEND_FACTOR`. |
| ID3D11DeviceContext::RSSetState(pRasterizerState) | method | Binds the rasterizer state. |

## Notes

- If `OMSetBlendState`/`RSSetState` is never called, the pipeline uses default states: blending disabled, `FillMode = SOLID`, `CullMode = BACK`.
- `ScissorEnable = TRUE` requires `RSSetScissorRects` to also be called each frame the scissor rectangle changes; otherwise the previous rectangles (or none) remain in effect.
- Namespace: Win32 COM (`d3d11.h`).

## Related

- [D3D11 shaders and drawing pipeline](./d3d11-shaders-drawing.md)
- [ID3D11DepthStencilState / ID3D11DepthStencilView](./d3d11-depth-stencil.md)
