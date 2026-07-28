# D3D11CreateDevice / ID3D11Device / ID3D11DeviceContext

`D3D11CreateDevice` creates the Direct3D 11 virtual-adapter device (`ID3D11Device`) and its immediate context (`ID3D11DeviceContext`). The device creates resources and state objects; the device context issues rendering commands.

## Signature / Usage

```cpp
HRESULT D3D11CreateDevice(
  IDXGIAdapter            *pAdapter,
  D3D_DRIVER_TYPE         DriverType,
  HMODULE                 Software,
  UINT                    Flags,
  const D3D_FEATURE_LEVEL *pFeatureLevels,
  UINT                    FeatureLevels,
  UINT                    SDKVersion,
  ID3D11Device            **ppDevice,
  D3D_FEATURE_LEVEL       *pFeatureLevel,
  ID3D11DeviceContext     **ppImmediateContext
);
```

```cpp
ComPtr<ID3D11Device> device;
ComPtr<ID3D11DeviceContext> context;
D3D11CreateDevice(
    nullptr, D3D_DRIVER_TYPE_HARDWARE, nullptr,
    D3D11_CREATE_DEVICE_BGRA_SUPPORT, nullptr, 0,
    D3D11_SDK_VERSION, &device, nullptr, &context);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| pAdapter | IDXGIAdapter* | Adapter to use, or `NULL` for the default. If non-`NULL`, `DriverType` must be `D3D_DRIVER_TYPE_UNKNOWN`. |
| DriverType | D3D_DRIVER_TYPE | Hardware, WARP, reference, or software driver type. |
| Software | HMODULE | Software rasterizer DLL handle; required when `DriverType` is `D3D_DRIVER_TYPE_SOFTWARE`. |
| Flags | UINT | `D3D11_CREATE_DEVICE_FLAG` bits (e.g. `D3D11_CREATE_DEVICE_DEBUG`, `D3D11_CREATE_DEVICE_BGRA_SUPPORT`). |
| pFeatureLevels / FeatureLevels | D3D_FEATURE_LEVEL* / UINT | Ordered array of feature levels to try; `NULL` uses a default 11_0-down-to-9_1 list (never picks 11_1). |
| SDKVersion | UINT | Always `D3D11_SDK_VERSION`. |
| ppDevice | ID3D11Device** | Receives the created device. |
| pFeatureLevel | D3D_FEATURE_LEVEL* | Receives the feature level actually created. |
| ppImmediateContext | ID3D11DeviceContext** | Receives the immediate device context. |

Key `ID3D11Device` creation methods: `CreateBuffer`, `CreateTexture1D/2D/3D`, `CreateRenderTargetView`, `CreateShaderResourceView`, `CreateDepthStencilView`, `CreateVertexShader`, `CreatePixelShader`, `CreateInputLayout`, `CreateSamplerState`, `CreateDeferredContext`, `CheckFeatureSupport`.

Key `ID3D11DeviceContext` categories: input-assembler (`IASetInputLayout`, `IASetVertexBuffers`, `IASetIndexBuffer`, `IASetPrimitiveTopology`), shader stages (`VSSetShader`/`PSSetShader`/... plus `*SetConstantBuffers`/`*SetShaderResources`/`*SetSamplers`), output-merger (`OMSetRenderTargets`, `OMSetBlendState`), rasterizer (`RSSetViewports`, `RSSetState`), drawing (`Draw`, `DrawIndexed`, `DrawInstanced`, `DrawIndexedInstanced`), resource updates (`Map`/`Unmap`, `UpdateSubresource`, `CopyResource`).

## Notes

- To create a swap chain and device together, use `D3D11CreateDeviceAndSwapChain`; to create swap chain separately, retrieve the `IDXGIFactory2` from the device (see IDXGIFactory2 / IDXGIAdapter) and call `CreateSwapChainForHwnd`/`CreateSwapChainForComposition`.
- The latest revision is `ID3D11Device5` / `ID3D11DeviceContext4`; obtain them via `QueryInterface` on the base device/context.
- `ID3D11DeviceContext` is the *immediate* context by default; additional *deferred* contexts (for multithreaded command recording) come from `ID3D11Device::CreateDeferredContext`.
- Namespace: Win32 COM (`d3d11.h`). Distinct from Windows.Graphics WinRT types and from other frameworks' GPU device abstractions.

## Related

- [D3D11 resources: Buffer, Texture2D, RenderTargetView](./d3d11-resources.md)
- [D3D11 shaders and drawing pipeline](./d3d11-shaders-drawing.md)
- [IDXGIFactory2 / IDXGIAdapter](./dxgi-factory-adapter.md)
