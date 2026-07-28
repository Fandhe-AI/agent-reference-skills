# DirectX and WinUI 3 integration

WinUI 3 (Windows App SDK) desktop apps render DirectX content the same way UWP apps do — via `SwapChainPanel` and `ISwapChainPanelNative` — but the `SwapChainPanel` class lives in the `Microsoft.UI.Xaml.Controls` namespace instead of `Windows.UI.Xaml.Controls`, and getting the app window's native `HWND` (e.g. for a top-level `CreateSwapChainForHwnd` render surface) goes through the Windows App SDK's `IWindowNative` interop interface rather than `CoreWindow`.

## Signature / Usage

```cpp
// Get the HWND of a WinUI 3 Window for HWND-based interop (e.g. window sizing, non-XAML rendering).
winrt::com_ptr<IWindowNative> windowNative;
myWindow.as(windowNative);
HWND hwnd{ nullptr };
windowNative->get_WindowHandle(&hwnd);
```

```cpp
// XAML-hosted DirectX content still goes through SwapChainPanel + ISwapChainPanelNative,
// exactly as in DirectX and XAML composition, but the panel type is
// Microsoft.UI.Xaml.Controls.SwapChainPanel (Windows App SDK), not the UWP control.
Microsoft::WRL::ComPtr<ISwapChainPanelNative> panelNative;
winrt::com_ptr<IInspectable> panelInspectable = swapChainPanel.as<IInspectable>();
panelInspectable->QueryInterface(__uuidof(ISwapChainPanelNative), (void**)&panelNative);
panelNative->SetSwapChain(swapChain.Get());
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IWindowNative::get_WindowHandle | method | Retrieves the `HWND` of the native window backing a `Microsoft.UI.Xaml.Window`; implemented by `Microsoft.UI.Xaml.Window`. |
| Microsoft.UI.Xaml.Controls.SwapChainPanel | class | Windows App SDK/WinUI 3 port of the XAML `SwapChainPanel` control; same DirectX hosting role as the UWP control, obtained via `ISwapChainPanelNative` for native interop. |

## Notes

- `IWindowNative` requires Windows App SDK 0.5+ on Windows 10 version 1809 or later.
- For an `HWND`-hosted swap chain in a WinUI 3 desktop app (rather than a `SwapChainPanel`-hosted one), retrieve the `HWND` via `IWindowNative` and pass it to `IDXGIFactory2::CreateSwapChainForHwnd` as in DXGI swap chain.
- For a XAML-composed swap chain, follow the same `CreateSwapChainForComposition` + `ISwapChainPanelNative::SetSwapChain` pattern described in DirectX and XAML composition; only the panel's namespace changes (`Microsoft.UI.Xaml.Controls` instead of `Windows.UI.Xaml.Controls`).
- Namespace: Windows App SDK (`Microsoft.UI.Xaml.*`, `microsoft.ui.xaml.window.h`). Distinct from the UWP `Windows.UI.Xaml.*` namespace used by `directx-and-xaml-interop`, and unrelated to other frameworks' windowing APIs.

## Related

- [DirectX and XAML composition (SwapChainPanel)](./directx-xaml-composition.md)
- [DXGI swap chain](./dxgi-swap-chain.md)
