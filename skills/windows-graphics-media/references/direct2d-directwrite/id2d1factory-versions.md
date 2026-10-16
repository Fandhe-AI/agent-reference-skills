# ID2D1Factory2 – ID2D1Factory8 (versioned factory interfaces)

Successive versions of the Direct2D factory. Each adds a `CreateDevice` overload that returns the matching versioned device interface (`ID2D1Device1` … `ID2D1Device7`). Each version inherits from the previous one, so the newest interface exposes everything below it.

## Signature / Usage

```cpp
// Illustrative: the source pages contain no sample code.
// Upgrade an existing factory to a newer interface with QueryInterface.
ID2D1Factory3* pFactory3 = nullptr;
HRESULT hr = pFactory1->QueryInterface(__uuidof(ID2D1Factory3),
                                       reinterpret_cast<void**>(&pFactory3));
// pFactory3->CreateDevice(...) creates an ID2D1Device2.
```

## Options / Props

| Interface | Header | Inherits from | Method | Creates |
|-----------|--------|---------------|--------|---------|
| ID2D1Factory2 | d2d1_2.h | ID2D1Factory1 | CreateDevice | ID2D1Device1 |
| ID2D1Factory3 | d2d1_3.h | ID2D1Factory2 | CreateDevice | ID2D1Device2 |
| ID2D1Factory4 | d2d1_3.h | ID2D1Factory3 | CreateDevice | ID2D1Device3 |
| ID2D1Factory5 | d2d1_3.h | ID2D1Factory4 | CreateDevice | ID2D1Device4 |
| ID2D1Factory6 | d2d1_3.h | ID2D1Factory5 | CreateDevice | ID2D1Device5 |
| ID2D1Factory7 | d2d1_3.h | ID2D1Factory6 | CreateDevice | ID2D1Device6 |
| ID2D1Factory8 | d2d1_3.h | ID2D1Factory7 | CreateDevice | ID2D1Device7 |

`CreateDevice` on Factory6 / Factory7 / Factory8 is described as "Creates a new Direct2D device from the given IDXGIDevice."

## Notes

- Namespace: Win32 COM. Only ID2D1Factory2 documents a minimum OS: Windows 8.1 / Windows Server 2012 R2 (desktop apps and UWP apps). The ID2D1Factory3 – 7 pages leave the minimum-OS rows empty.
- ID2D1Factory8 (and ID2D1Device7 / ID2D1DeviceContext7) are marked `prerelease: true` in the sdk-api source (ms.date 09/15/2023): treat them as preview and not as a stable API surface.
- Factory3 – Factory7 `ms.date` is 12/05/2018 in the sdk-api source.
- Factory2 introduces `ID2D1Device1`, which adds device rendering priority control. See [ID2D1Device1 – ID2D1Device7](./id2d1device-versions.md).
- Factory2 links to "Multithreaded Direct2D Apps" in its see-also list.
- Source: https://learn.microsoft.com/en-us/windows/win32/api/d2d1_2/nn-d2d1_2-id2d1factory2 and https://learn.microsoft.com/en-us/windows/win32/api/d2d1_3/nn-d2d1_3-id2d1factory3 (through ID2D1Factory8 in d2d1_3).

## Related

- [ID2D1Factory](./id2d1factory.md)
- [ID2D1Factory1](./id2d1factory1.md)
- [ID2D1Device1 – ID2D1Device7](./id2d1device-versions.md)
- [D2D1CreateFactory](./d2d1createfactory.md)
