# ID2D1Factory1

Creates Direct2D resources. Extends [ID2D1Factory](./id2d1factory.md) with device creation, effect registration, and GDI metafile support.

## Signature / Usage

```cpp
ID2D1Factory1* pFactory1 = nullptr;
hr = D2D1CreateFactory(
    D2D1_FACTORY_TYPE_SINGLE_THREADED,
    __uuidof(ID2D1Factory1),
    reinterpret_cast<void**>(&pFactory1)
    );

ID2D1Device* pDevice = nullptr;
hr = pFactory1->CreateDevice(dxgiDevice, &pDevice);
```

## Options / Props

| Method | Description |
|------|-------------|
| CreateDevice | Creates an ID2D1Device object from a DXGI device. |
| CreatePathGeometry | Creates an ID2D1PathGeometry1 object. |
| CreateStrokeStyle | Creates an ID2D1StrokeStyle1 object. |
| RegisterEffectFromStream / RegisterEffectFromString | Registers a custom effect within the factory instance. |
| UnregisterEffect | Unregisters a previously registered effect. |
| GetRegisteredEffects | Returns the class IDs of currently registered effects. |
| GetEffectProperties | Retrieves the properties of an effect. |
| CreateGdiMetafile | Creates an ID2D1GdiMetafile object. |

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from [ID2D1Factory](./id2d1factory.md).
- Introduced with Direct2D 1.1 (Windows 8 / Platform Update for Windows 7).
- Used to create [ID2D1Device](./id2d1device.md), the entry point for device-context-based drawing and effects.

## Related

- [ID2D1Factory](./id2d1factory.md)
- [ID2D1Device](./id2d1device.md)
- [ID2D1Effect](./id2d1effect.md)
