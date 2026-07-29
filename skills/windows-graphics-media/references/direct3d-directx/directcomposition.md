# Native DirectComposition (dcomp.h, IDCompositionDevice / IDCompositionVisual)

DirectComposition is a Win32 COM API (`dcomp.h`) for composing bitmap content — including DXGI swap chains and DXGI surfaces — into a retained-mode visual tree with hardware-accelerated 2D/3D transforms, effects, and animations, independent of the UI thread. It is the native predecessor to `Microsoft.UI.Composition`/`Windows.UI.Composition`; Microsoft's current guidance is to prefer those WinRT visual-layer APIs on Windows 10+ and to reach for native DirectComposition only from plain Win32/HWND apps that cannot host a `Compositor`.

## Signature / Usage

```cpp
HRESULT DCompositionCreateDevice3(
  IUnknown *renderingDevice,
  REFIID   iid,
  void     **dcompositionDevice
);
```

```cpp
// Device from the D3D11/DXGI device, target bound to an HWND, one visual holding a swap chain.
ComPtr<IDXGIDevice> dxgiDevice;
d3dDevice.As(&dxgiDevice);

ComPtr<IDCompositionDesktopDevice> dcompDevice;
DCompositionCreateDevice3(dxgiDevice.Get(), IID_PPV_ARGS(&dcompDevice));

ComPtr<IDCompositionTarget> target;
dcompDevice->CreateTargetForHwnd(hwnd, TRUE /* topmost */, &target);

ComPtr<IDCompositionVisual2> visual;
dcompDevice->CreateVisual(&visual);
visual->SetContent(swapChain.Get());

target->SetRoot(visual.Get());
dcompDevice->Commit();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DCompositionCreateDevice3(renderingDevice, iid, dcompositionDevice) | function | Creates the device; `renderingDevice` is the `IDXGIDevice`/`ID2D1Device` used to create composition surfaces; `iid` selects `IDCompositionDevice` or `IDCompositionDesktopDevice`. |
| IDCompositionDesktopDevice::CreateTargetForHwnd(hwnd, topmost, target) | method | Creates an `IDCompositionTarget` bound to a window; `topmost = TRUE` renders the composition tree above the window's own GDI/DirectX content. |
| IDCompositionDevice::CreateVisual(visual) | method | Creates an `IDCompositionVisual` (or `IDCompositionVisual2`) node; visuals are assembled into a tree with `AddVisual`/`RemoveVisual` on a parent visual. |
| IDCompositionVisual2::SetContent(content) | method | Sets the visual's bitmap content — an `IDXGISwapChain`/`IDXGISwapChain1`, an `IDCompositionSurface`, or another visual (for nesting). |
| IDCompositionVisual::SetOffsetX / SetOffsetY / SetTransform / SetClip / SetOpacity | methods | Configure the visual's 2D transform, clip rectangle, and opacity; `IDCompositionVisual3` adds 3D transforms (`SetTransform` with a `IDCompositionRotateTransform3D` etc.) and shadow. |
| IDCompositionTarget::SetRoot(visual) | method | Sets the visual tree's root visual for this target. |
| IDCompositionDevice::Commit() | method | Atomically submits all pending changes (visual-tree edits, property changes, animations) to the composition engine in one batch. |

## Notes

- Requires Windows 8+; `DCompositionCreateDevice3` (the current entry point, returning `IDCompositionDevice`/`IDCompositionDesktopDevice`) supersedes the older `DCompositionCreateDevice`/`DCompositionCreateDevice2`.
- Changes to visuals, transforms, and content take effect only after `IDCompositionDevice::Commit()` is called; batch multiple property changes before committing for atomic updates.
- A swap chain handed to `SetContent` should use a flip-model `DXGI_SWAP_EFFECT` (`FLIP_SEQUENTIAL`/`FLIP_DISCARD`) and be created with `IDXGIFactory2::CreateSwapChainForComposition`, mirroring how `SwapChainPanel`/`ISwapChainPanelNative` consumes a composition swap chain in XAML apps.
- Namespace: Win32 COM (`dcomp.h`, links `Dcomp.lib`). Distinct from `Microsoft.UI.Composition`/`Windows.UI.Composition` (the `Compositor`/`Visual` WinRT API used by WinUI/UWP apps) — that is the recommended API for apps that can host a XAML/WinUI visual tree; this native COM surface exists for plain Win32 apps with no XAML host.

## Related

- [SwapChainPanel / ISwapChainPanelNative (DirectX and XAML composition)](./directx-xaml-composition.md)
- [IDXGIFactory2 / IDXGIAdapter](./dxgi-factory-adapter.md)
- [DXGI swap chain](./dxgi-swap-chain.md)
