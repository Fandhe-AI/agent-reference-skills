# Handling Errors and Device-Removal in DirectML

Describes how DirectML surfaces unrecoverable errors as device-removal, how to detect it, and the only supported recovery path (destroy and recreate).

## Signature / Usage

```cpp
HRESULT hr = dmlDevice->Xyz(...); // any IDMLDevice/IDMLCommandRecorder call
if (hr == DXGI_ERROR_DEVICE_REMOVED)
{
    HRESULT reason = dmlDevice->GetDeviceRemovedReason();
    // Release dmlDevice and every object it created, then call
    // DMLCreateDevice again to recover.
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `DXGI_ERROR_DEVICE_REMOVED` | HRESULT returned by any DirectML method that returns an HRESULT, once the device has entered the removed state. |
| `IDMLDevice::GetDeviceRemovedReason` | Retrieves a more detailed error code explaining why the device was removed. |
| `DML_CREATE_DEVICE_FLAG_DEBUG` | Enables the DirectML debug layer, which surfaces invalid-API-usage errors (the most common cause of device-removal) as descriptive debug output before they reach device-removal. |

## Notes

- Unrecoverable errors that cause device-removal include invalid API usage (for methods without an HRESULT return), driver error, hardware fault, or out-of-memory (OOM) conditions.
- Once a DirectML device is removed, every method call on the device, and on every object created by that device, becomes a no-op.
- There is no recovery from device-removal other than releasing the affected device and all its children, then re-creating the DirectML device from scratch via `DMLCreateDevice`.
- Device-removal of the underlying Direct3D 12 device also removes the DirectML device, but not vice versa: DirectML device-removal doesn't necessarily remove the underlying `ID3D12Device`.
- The most common cause of errors is invalid API usage, which can surface as `E_INVALIDARG` or as device-removal; enabling the DirectML debug layer during development is strongly recommended to catch and diagnose these before they cause a removal.

## Related

- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [DirectML Programming Guide](./programming-guide.md)
