# SwapChainPanel / ISwapChainPanelNative (DirectX and XAML composition)

`SwapChainPanel` is a XAML control that hosts a DirectX swap chain inside a XAML visual tree; unlike the older `SwapChainBackgroundPanel`, it can appear at any level of the tree and multiple instances can coexist. Native interop is done through `ISwapChainPanelNative`, obtained by querying the `SwapChainPanel` instance.

## Signature / Usage

```cpp
// XAML: <SwapChainPanel x:Name="swapChainPanel"/>

// Native interop:
Microsoft::WRL::ComPtr<ISwapChainPanelNative> panelNative;
IInspectable* panelInspectable =
    reinterpret_cast<IInspectable*>(swapChainPanel);
panelInspectable->QueryInterface(
    __uuidof(ISwapChainPanelNative), (void**)&panelNative);

// Create a composition swap chain and hand it to the panel.
DXGI_SWAP_CHAIN_DESC1 desc = {};
desc.Width = static_cast<UINT>(panelWidth);
desc.Height = static_cast<UINT>(panelHeight);
desc.Format = DXGI_FORMAT_B8G8R8A8_UNORM;
desc.SampleDesc.Count = 1;
desc.BufferCount = 2;
desc.Scaling = DXGI_SCALING_STRETCH;
desc.SwapEffect = DXGI_SWAP_EFFECT_FLIP_SEQUENTIAL;

ComPtr<IDXGISwapChain1> swapChain;
dxgiFactory->CreateSwapChainForComposition(d3dDevice.Get(), &desc, nullptr, &swapChain);

panelNative->SetSwapChain(swapChain.Get());
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ISwapChainPanelNative::SetSwapChain | method | Associates a DXGI composition swap chain (`IDXGISwapChain1` created with `CreateSwapChainForComposition`) with a `SwapChainPanel`. |

## Notes

- Obtain `ISwapChainPanelNative` by casting the `SwapChainPanel` instance to `IInspectable`/`IUnknown` and calling `QueryInterface` — there is no managed API for this step.
- The swap chain must be created with `IDXGIFactory2::CreateSwapChainForComposition`, `Scaling = DXGI_SCALING_STRETCH`, and a flip-model `SwapEffect` (`DXGI_SWAP_EFFECT_FLIP_SEQUENTIAL`).
- Microsoft recommends no more than 4 `SwapChainPanel` instances per app, and setting the swap chain's width/height to the panel's current rendered size (accounting for DPI).
- In WinUI 3, `SwapChainPanel` does not support transparency or `AcrylicBrush`/`CompositionBackdropBrush` effects layered over it.
- Namespace: `Windows.UI.Xaml.Media.DXInterop` (native interop header `windows.ui.xaml.media.dxinterop.h`) plus the WinRT `SwapChainPanel` control. Distinct from Windows.Graphics.Capture and from other frameworks' canvas/surface hosting controls.

## Related

- [DXGI swap chain](./dxgi-swap-chain.md)
- [DirectX and WinUI 3 integration](./directx-winui3-integration.md)
