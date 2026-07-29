# ID3D11SamplerState / ID3D11ShaderResourceView (texture sampling)

`ID3D11ShaderResourceView` (SRV) exposes a texture (or buffer) to a shader stage as a readable resource; `ID3D11SamplerState` configures how a shader's `Sample`/`SampleLevel` HLSL intrinsics filter and address that texture. Both are bound to a shader stage — typically the pixel shader — alongside the shader itself.

## Signature / Usage

```cpp
// Shader resource view over a texture loaded from disk / created earlier.
D3D11_SHADER_RESOURCE_VIEW_DESC srvDesc = {};
srvDesc.Format = texDesc.Format;
srvDesc.ViewDimension = D3D11_SRV_DIMENSION_TEXTURE2D;
srvDesc.Texture2D.MipLevels = texDesc.MipLevels;

ComPtr<ID3D11ShaderResourceView> srv;
device->CreateShaderResourceView(texture.Get(), &srvDesc, &srv);

// Sampler: linear filtering, wrap addressing.
D3D11_SAMPLER_DESC sampDesc = {};
sampDesc.Filter = D3D11_FILTER_MIN_MAG_MIP_LINEAR;
sampDesc.AddressU = D3D11_TEXTURE_ADDRESS_WRAP;
sampDesc.AddressV = D3D11_TEXTURE_ADDRESS_WRAP;
sampDesc.AddressW = D3D11_TEXTURE_ADDRESS_WRAP;
sampDesc.ComparisonFunc = D3D11_COMPARISON_NEVER;
sampDesc.MaxLOD = D3D11_FLOAT32_MAX;

ComPtr<ID3D11SamplerState> sampler;
device->CreateSamplerState(&sampDesc, &sampler);

// Per frame:
context->PSSetShaderResources(0, 1, srv.GetAddressOf());
context->PSSetSamplers(0, 1, sampler.GetAddressOf());
```

```hlsl
Texture2D tex : register(t0);
SamplerState samp : register(s0);

float4 main(float2 uv : TEXCOORD0) : SV_TARGET
{
    return tex.Sample(samp, uv);
}
```

## Options / Props

`D3D11_SAMPLER_DESC` key fields:

| Name | Type | Description |
|------|------|-------------|
| Filter | D3D11_FILTER | Minification/magnification/mip filter combination (e.g. `MIN_MAG_MIP_LINEAR`, `MIN_MAG_MIP_POINT`, `ANISOTROPIC`). |
| AddressU / AddressV / AddressW | D3D11_TEXTURE_ADDRESS_MODE | Behavior for texture coordinates outside `[0, 1]`: `WRAP`, `CLAMP`, `MIRROR`, `BORDER`. |
| MaxAnisotropy | UINT | Clamp level when `Filter` is anisotropic (1–16). |
| ComparisonFunc | D3D11_COMPARISON_FUNC | Used only when `Filter` includes `D3D11_FILTER_COMPARISON_*` (shadow-map PCF sampling via `SampleCmp`). |
| MinLOD / MaxLOD | FLOAT | Clamp range for the mip level accessed. |

| Name | Type | Description |
|------|------|-------------|
| ID3D11Device::CreateShaderResourceView(pResource, pDesc, ppSRV) | method | Creates a view exposing a buffer or texture resource for shader reads; `pDesc` may be `nullptr` to view the whole resource with its native format. |
| ID3D11Device::CreateSamplerState(pDesc, ppSampler) | method | Creates a reusable filtering/addressing configuration. |
| ID3D11DeviceContext::PSSetShaderResources(StartSlot, NumViews, ppSRVs) | method | Binds SRVs to the pixel shader stage (`t#` registers); other stages have their own `*SetShaderResources` (VS/GS/HS/DS/CS). |
| ID3D11DeviceContext::PSSetSamplers(StartSlot, NumSamplers, ppSamplers) | method | Binds sampler states to the pixel shader stage (`s#` registers). |

## Notes

- The resource passed to `CreateShaderResourceView` must have been created with `D3D11_BIND_SHADER_RESOURCE` in `BindFlags`.
- A resource cannot be bound simultaneously as an SRV and a render-target/depth-stencil view; unbind the RTV/DSV first (`OMSetRenderTargets` with `nullptr`) when reusing it as a shader input in the same frame.
- Sampler state objects are deduplicated by the driver: creating two samplers with identical `D3D11_SAMPLER_DESC` values returns the same underlying object, so applications commonly cache a small fixed set (e.g. linear-wrap, point-clamp) rather than one sampler per texture.
- Namespace: Win32 COM (`d3d11.h`).

## Related

- [D3D11 resources: Buffer, Texture2D, RenderTargetView](./d3d11-resources.md)
- [D3D11 shaders and drawing pipeline](./d3d11-shaders-drawing.md)
- [Compute shaders (ID3D11ComputeShader, Dispatch, UAV)](./d3d11-compute-shader.md)
