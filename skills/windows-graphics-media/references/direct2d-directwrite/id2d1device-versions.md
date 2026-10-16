# ID2D1Device1 – ID2D1Device7 (versioned device interfaces)

Successive versions of the Direct2D device (a resource domain whose objects and device contexts can be used together). Each version creates the matching versioned device context (`ID2D1DeviceContext2` … `ID2D1DeviceContext7`) and inherits from the previous one.

## Signature / Usage

```cpp
// Illustrative: the source pages contain no sample code.
// Upgrade a device to a newer interface with QueryInterface;
// ID2D1Device2::CreateDeviceContext then yields an ID2D1DeviceContext2
// (see the source API reference for the exact parameter list).
ID2D1Device2* pDevice2 = nullptr;
HRESULT hr = pDevice->QueryInterface(__uuidof(ID2D1Device2),
                                     reinterpret_cast<void**>(&pDevice2));
```

## Options / Props

| Interface | Header | Inherits from | Methods |
|-----------|--------|---------------|---------|
| ID2D1Device1 | d2d1_2.h | ID2D1Device | GetRenderingPriority (retrieves the current rendering priority of the device); SetRenderingPriority (sets the priority of Direct2D rendering operations performed on any device context associated with the device) |
| ID2D1Device2 | d2d1_3.h | ID2D1Device1 | CreateDeviceContext (new ID2D1DeviceContext2); FlushDeviceContexts (flush all device contexts that reference a given bitmap); GetDxgiDevice (returns the DXGI device associated with this Direct2D device) |
| ID2D1Device3 | d2d1_3.h | ID2D1Device2 | CreateDeviceContext (new ID2D1DeviceContext3) |
| ID2D1Device4 | d2d1_3.h | ID2D1Device3 | CreateDeviceContext (new ID2D1DeviceContext4); GetMaximumColorGlyphCacheMemory; SetMaximumColorGlyphCacheMemory (max capacity of the color glyph cache) |
| ID2D1Device5 | d2d1_3.h | ID2D1Device4 | CreateDeviceContext (new device context with no initially assigned target) |
| ID2D1Device6 | d2d1_3.h | ID2D1Device5 | CreateDeviceContext (new device context with no initially assigned target) |
| ID2D1Device7 | d2d1_3.h | ID2D1Device6 | CreateDeviceContext (new device context with no initially assigned target) |

## Notes

- Namespace: Win32 COM. Only ID2D1Device1 documents a minimum OS: Windows 8.1 / Windows Server 2012 R2 (desktop apps and UWP apps). The other pages leave it empty.
- ID2D1Device7 is marked `prerelease: true` in the sdk-api source (ms.date 09/15/2023): treat it as preview.
- Device2 – Device6 descriptions state that each performs all the same functions as the previous interface and additionally enables creation of the matching `ID2D1DeviceContextN` objects.
- Devices are created by the versioned factories; see [ID2D1Factory2 – ID2D1Factory8](./id2d1factory-versions.md).
- Source: https://learn.microsoft.com/en-us/windows/win32/api/d2d1_2/nn-d2d1_2-id2d1device1 and https://learn.microsoft.com/en-us/windows/win32/api/d2d1_3/nn-d2d1_3-id2d1device2 (through ID2D1Device7 in d2d1_3).

## Related

- [ID2D1Device](./id2d1device.md)
- [ID2D1Factory2 – ID2D1Factory8](./id2d1factory-versions.md)
- [ID2D1DeviceContext1 – ID2D1DeviceContext7](./id2d1devicecontext-versions.md)
