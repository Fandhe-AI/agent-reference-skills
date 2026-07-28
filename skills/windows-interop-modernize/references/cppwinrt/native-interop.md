# Native Interop: ISwapChainPanelNative / IWindowNative

Native interop interfaces let C++/WinRT code bridge to non-WinRT native concepts — a Win32 `HWND` for a WinUI 3 `Window`, or a DirectX swap chain for a XAML `SwapChainPanel`. Both are obtained by querying (`.as<T>()`) the projected XAML object for the native COM interface.

## Signature / Usage

Retrieve the `HWND` of a WinUI 3 `Window`:

```cppwinrt
// pch.h
#include <microsoft.ui.xaml.window.h>

// MainWindow.xaml.cpp
void MainWindow::myButton_Click(IInspectable const&, RoutedEventArgs const&)
{
    auto windowNative{ this->m_inner.as<::IWindowNative>() };
    HWND hWnd{ 0 };
    windowNative->get_WindowHandle(&hWnd);
}
```

Set a DirectX swap chain on a XAML `SwapChainPanel`:

```cppwinrt
// pch.h
#include <windows.ui.xaml.media.dxinterop.h>

// Get native interface for the named SwapChainPanel ("swapChainPanel" in XAML).
auto panelNative{ swapChainPanel().as<ISwapChainPanelNative>() };

winrt::check_hresult(
    panelNative->SetSwapChain(swapChain.get())
);
```

## Options / Props

| Interface / member | Description |
|------|-------------|
| `IWindowNative::get_WindowHandle(HWND*)` | Retrieves the `HWND` backing a `Microsoft.UI.Xaml.Window` (WinUI 3 / Windows App SDK). Declared in `microsoft.ui.xaml.window.h`. |
| `ISwapChainPanelNative::SetSwapChain(IDXGISwapChain*)` | Associates a DirectX swap chain (created via `IDXGIFactory2::CreateSwapChainForComposition`) with a `SwapChainPanel`. Declared in `windows.ui.xaml.media.dxinterop.h`. |
| `ISurfaceImageSourceNativeWithD2D` | Similar native interop interface for `SurfaceImageSource`/`VirtualSurfaceImageSource` (shared-surface DirectX drawing rather than a dedicated swap chain); obtained the same way via `.as<...>()`. |

## Notes

- `ISwapChainPanelNative` / `ISurfaceImageSourceNativeWithD2D` are documented under UWP `Windows.UI.Xaml.*` (`windows.ui.xaml.media.dxinterop.h`); DirectX APIs themselves are not WinRT types, so this interop is inherently ABI/native-pointer based even from C++/WinRT.
- Limit `SwapChainPanel` instances to at most 4 per app; set the swap chain's `DXGI_SWAP_CHAIN_DESC1` scaling mode to `DXGI_SCALING_STRETCH` and create it with `IDXGIFactory2::CreateSwapChainForComposition` (not `CreateSwapChain`).
- `IWindowNative` is the WinUI 3 (Windows App SDK) equivalent for retrieving a window handle; there is no `CoreWindow` in WinUI 3 desktop apps, so `get_WindowHandle` is the standard way to bridge to Win32 windowing APIs (dialogs, `SetForegroundWindow`, etc.).
- These are distinct, single-purpose native COM interfaces — don't confuse them with the general ABI interop helpers (`winrt::get_abi`, `copy_to_abi`, etc.) described in `interop-abi.md`; those convert between C++/WinRT and generic WinRT ABI types, whereas `IWindowNative`/`ISwapChainPanelNative` are specific bridges to classic Win32/DirectX concepts that have no WinRT projection at all.

## Related

- [Interop with the ABI](./interop-abi.md)
- [XAML x:Bind](./xaml-binding.md)
