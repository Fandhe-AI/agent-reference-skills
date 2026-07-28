# D2D1CreateFactory

Creates a factory object that can be used to create Direct2D resources.

## Signature / Usage

```cpp
HRESULT D2D1CreateFactory(
  [in]           D2D1_FACTORY_TYPE          factoryType,
  [in]           REFIID                     riid,
  [in, optional] const D2D1_FACTORY_OPTIONS *pFactoryOptions,
  [out]          void                       **ppIFactory
);

ID2D1Factory* pFactory = nullptr;
hr = D2D1CreateFactory(D2D1_FACTORY_TYPE_SINGLE_THREADED, &pFactory);
```

## Options / Props

| Parameter | Type | Description |
|------|------|-------------|
| factoryType | D2D1_FACTORY_TYPE | The threading model of the factory and the resources it creates (single-threaded or multithreaded). |
| riid | REFIID | The IID of [ID2D1Factory](./id2d1factory.md) or [ID2D1Factory1](./id2d1factory1.md), e.g. `__uuidof(ID2D1Factory1)`. |
| pFactoryOptions | const D2D1_FACTORY_OPTIONS* | Optional; the level of detail provided to the debugging layer. |
| ppIFactory | void** | Receives a pointer to the new factory. |

## Notes

- Namespace: Win32 DLL export (d2d1.h, D2d1.lib/D2d1.dll).
- An object created from one factory instance can generally be used with other resources created from that instance, but not with resources from a different factory instance.
- To obtain [ID2D1Factory1](./id2d1factory1.md) (needed for `CreateDevice`/effects), pass `__uuidof(ID2D1Factory1)` as `riid`.

## Related

- [ID2D1Factory](./id2d1factory.md)
- [ID2D1Factory1](./id2d1factory1.md)
