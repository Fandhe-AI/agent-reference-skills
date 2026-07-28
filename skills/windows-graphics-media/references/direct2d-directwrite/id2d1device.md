# ID2D1Device

Represents a resource domain whose objects and device contexts can be used together. It is created from a DXGI device and is the entry point for creating device contexts.

## Signature / Usage

```cpp
ID2D1Device* pDevice = nullptr;
hr = pFactory1->CreateDevice(dxgiDevice, &pDevice);

ID2D1DeviceContext* pContext = nullptr;
hr = pDevice->CreateDeviceContext(D2D1_DEVICE_CONTEXT_OPTIONS_NONE, &pContext);
```

## Options / Props

| Method | Description |
|------|-------------|
| CreateDeviceContext | Creates a new ID2D1DeviceContext from a Direct2D device. |
| CreatePrintControl | Creates an ID2D1PrintControl for converting Direct2D primitives to a fixed page representation. |
| ClearResources | Clears all of the rendering resources used by Direct2D. |
| GetMaximumTextureMemory / SetMaximumTextureMemory | Gets/sets the maximum texture memory Direct2D accumulates before purging caches. |

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from ID2D1Resource. Created via [ID2D1Factory1::CreateDevice](./id2d1factory1.md).
- Any resource created from a device context can be shared with resources from another context created on the same device.

## Related

- [ID2D1Factory1](./id2d1factory1.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
