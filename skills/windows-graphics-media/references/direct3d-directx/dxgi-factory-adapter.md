# IDXGIFactory2 / IDXGIAdapter

`IDXGIFactory2` creates DXGI 1.2+ swap chains (`CreateSwapChainForHwnd`, `CreateSwapChainForComposition`, `CreateSwapChainForCoreWindow`) and monitors stereoscopic 3D. `IDXGIAdapter` represents a display subsystem (GPU, video memory) that you enumerate to pick a rendering device.

## Signature / Usage

```cpp
// Get the factory used to create a Direct3D device, then create a swap chain from it.
ComPtr<IDXGIDevice2> dxgiDevice;
d3dDevice.As(&dxgiDevice);

ComPtr<IDXGIAdapter> adapter;
dxgiDevice->GetParent(__uuidof(IDXGIAdapter), &adapter);

ComPtr<IDXGIFactory2> factory;
adapter->GetParent(__uuidof(IDXGIFactory2), &factory);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateSwapChainForHwnd | method | Creates an `IDXGISwapChain1` bound to an `HWND` (desktop apps only). |
| CreateSwapChainForCoreWindow | method | Creates a swap chain bound to a `CoreWindow` (UWP `ICoreWindow` apps). |
| CreateSwapChainForComposition | method | Creates a swap chain for use with DirectComposition or a XAML `SwapChainPanel`. |
| IDXGIAdapter.GetDesc | method | Returns a `DXGI_ADAPTER_DESC` (vendor, memory size) for the adapter. |
| IDXGIAdapter.EnumOutputs | method | Enumerates the monitors (`IDXGIOutput`) attached to the adapter. |
| IDXGIAdapter.CheckInterfaceSupport | method | Checks whether the system supports a given device interface for the adapter. |

## Notes

- `IDXGIFactory2` inherits from `IDXGIFactory1`; create it via `CreateDXGIFactory1`/`CreateDXGIFactory2` or `QueryInterface` from an existing factory.
- Do not mix DXGI 1.0 (`IDXGIFactory`) and DXGI 1.1+ (`IDXGIFactory1`) factories in one application.
- To enumerate adapters, use `IDXGIFactory1::EnumAdapters` (or `EnumAdapters1`/`EnumWarpAdapter` for a software/WARP device).
- Namespace: Win32 COM (`dxgi1_2.h` / `dxgi.h`), not WinRT. Distinct from any managed graphics device abstraction in other frameworks.

## Related

- [DXGI swap chain](./dxgi-swap-chain.md)
- [D3D11CreateDevice / ID3D11Device / ID3D11DeviceContext](./d3d11-device-context.md)
