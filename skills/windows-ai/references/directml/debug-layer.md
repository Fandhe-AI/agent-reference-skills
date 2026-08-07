# Using the DirectML Debug Layer

An optional development-time component (`DirectML.Debug.dll`, conditionally loaded by `DirectML.dll`) that wraps DirectML API calls with additional validation and diagnostic messages, enabled via `DML_CREATE_DEVICE_FLAG_DEBUG`.

## Signature / Usage

```cpp
// By default, disable the DirectML debug layer.
DML_CREATE_DEVICE_FLAGS dmlCreateDeviceFlags = DML_CREATE_DEVICE_FLAG_NONE;

#if defined(_DEBUG)
Microsoft::WRL::ComPtr<ID3D12Debug> debugController;
if (SUCCEEDED(D3D12GetDebugInterface(IID_PPV_ARGS(&debugController))))
{
    debugController->EnableDebugLayer(); // enable D3D12 debug layer first
}
dmlCreateDeviceFlags |= DML_CREATE_DEVICE_FLAG_DEBUG;
#endif

Microsoft::WRL::ComPtr<IDMLDevice> dmlDevice;
THROW_IF_FAILED(DMLCreateDevice(
    d3D12Device.Get(),
    dmlCreateDeviceFlags,
    IID_PPV_ARGS(&dmlDevice)));
```

## Notes

- Enabling both the Direct3D 12 debug layer and the DirectML debug layer is strongly recommended; without the D3D12 debug layer (and its `ID3D12InfoQueue`), errors fall back to `OutputDebugStringA` and some validation is unavailable. Enable the D3D12 debug layer (`ID3D12Debug::EnableDebugLayer`) *before* calling `DMLCreateDevice` with the debug flag.
- Up through `DML_FEATURE_LEVEL_5_2`, the D3D12 debug layer was a hard requirement for the DirectML debug layer — `DMLCreateDevice` returns `DXGI_ERROR_SDK_COMPONENT_MISSING` if the flag is set but debug layers aren't installed. Newer versions support basic parameter validation without it.
- When used as a system component, the debug layer requires the Graphics Tools Feature-on-Demand package: `Add-WindowsCapability -Online -Name "Tools.Graphics.DirectX~~~~0.0.1.0"` (or via Settings > Optional features > Graphics Tools). When used as the `Microsoft.AI.DirectML` NuGet redistributable, `DirectML.Debug.dll` ships alongside `DirectML.dll` and must be placed next to the app executable.
- Debug-layer error messages are prefixed `D3D12 ERROR` (sent to `ID3D12InfoQueue`) when the D3D12 debug layer is enabled, or `[DIRECTML ERROR]`/`[DIRECTML WARNING]` (sent via `OutputDebugStringA`) when it isn't.

## Related

- [DirectML Programming Guide](./programming-guide.md)
- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [Handling errors and device-removal in DirectML](./errors-and-device-removal.md)
