# IDXGISwapChain1 / DXGI_SWAP_CHAIN_DESC1 / Present

A swap chain is a set of buffers used to present rendered frames to a window, `CoreWindow`, or composition surface. `IDXGISwapChain1` extends `IDXGISwapChain` with dirty-rectangle/scroll-rectangle presentation. You create it from `IDXGIFactory2` and describe it with `DXGI_SWAP_CHAIN_DESC1`.

## Signature / Usage

```cpp
DXGI_SWAP_CHAIN_DESC1 desc = {};
desc.Width = 0;                                // 0 = use HWND client size
desc.Height = 0;
desc.Format = DXGI_FORMAT_B8G8R8A8_UNORM;
desc.SampleDesc.Count = 1;
desc.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;
desc.BufferCount = 2;
desc.SwapEffect = DXGI_SWAP_EFFECT_FLIP_DISCARD;

ComPtr<IDXGISwapChain1> swapChain;
factory->CreateSwapChainForHwnd(
    d3dDevice.Get(), hwnd, &desc, nullptr, nullptr, &swapChain);

// Every frame:
swapChain->Present(1, 0); // vsync on
```

## Options / Props

DXGI_SWAP_CHAIN_DESC1 members:

| Name | Type | Description |
|------|------|-------------|
| Width / Height | UINT | Back-buffer resolution; 0 for `CreateSwapChainForHwnd` derives size from the output window (not allowed for `CreateSwapChainForComposition`). |
| Format | DXGI_FORMAT | Back-buffer pixel format; flip-model swap chains require one of `R16G16B16A16_FLOAT`, `B8G8R8A8_UNORM`, `R8G8B8A8_UNORM`, `R10G10B10A2_UNORM`. |
| Stereo | BOOL | Enables stereoscopic 3D; requires a flip-model `SwapEffect`. |
| SampleDesc | DXGI_SAMPLE_DESC | Multisampling; valid only for bitblt-model swap chains (must be 1/0 for flip model). |
| BufferUsage | DXGI_USAGE | Back-buffer usage, typically `DXGI_USAGE_RENDER_TARGET_OUTPUT`. |
| BufferCount | UINT | Number of buffers (2-16 for flip-model). |
| Scaling | DXGI_SCALING | Resize behavior when the back buffer size differs from the target. |
| SwapEffect | DXGI_SWAP_EFFECT | Presentation model; `CreateSwapChainForComposition` requires `DXGI_SWAP_EFFECT_FLIP_SEQUENTIAL` (or `FLIP_DISCARD`). |
| AlphaMode | DXGI_ALPHA_MODE | Transparency behavior of the back buffer. |
| Flags | UINT | Bitwise-OR of `DXGI_SWAP_CHAIN_FLAG` values. |

`Present` parameters:

| Name | Type | Description |
|------|------|-------------|
| SyncInterval | UINT | 0 = present immediately (tearing allowed only with `DXGI_PRESENT_ALLOW_TEARING`); 1-4 = sync to the nth vertical blank. |
| Flags | UINT | Bitwise-OR of `DXGI_PRESENT` constants (e.g. `DXGI_PRESENT_DO_NOT_WAIT`, `DXGI_PRESENT_ALLOW_TEARING`). |

## Notes

- `CreateSwapChainForHwnd` must not be used in UWP apps; use `CreateSwapChainForCoreWindow` or `CreateSwapChainForComposition` there instead.
- `pDevice` for `CreateSwapChainForHwnd`/`CreateSwapChainForComposition` is the `ID3D11Device` (D3D11) or the `ID3D12CommandQueue` (D3D12) — D3D12 swap chains are created against the command queue, not the device.
- A successful `Present` (flip model) unbinds back buffer 0 from `OMSetRenderTargets` unless `DXGI_PRESENT_DO_NOT_SEQUENCE` is passed.
- Starting with D3D11.1, prefer `IDXGISwapChain1::Present1` for dirty-rectangle/scroll-rectangle optimizations.
- `DXGI_SWAP_CHAIN_DESC1` cannot be cast to/from `DXGI_SWAP_CHAIN_DESC`; use `IDXGISwapChain1::GetDesc1`.

## Related

- [IDXGIFactory2 / IDXGIAdapter](./dxgi-factory-adapter.md)
- [DirectX and XAML composition (SwapChainPanel)](./directx-xaml-composition.md)
