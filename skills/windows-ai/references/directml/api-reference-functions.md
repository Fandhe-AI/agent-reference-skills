# DirectML functions

Index of all free functions declared in `DirectML.h`.

## Signature / Usage

```cpp
HRESULT DMLCreateDevice(
  ID3D12Device            *d3d12Device,
  DML_CREATE_DEVICE_FLAGS flags,
  REFIID                  riid,
  void                    **ppv
);

HRESULT DMLCreateDevice1(
  ID3D12Device            *d3d12Device,
  DML_CREATE_DEVICE_FLAGS flags,
  DML_FEATURE_LEVEL       minimumFeatureLevel,
  REFIID                  riid,
  void                    **ppv
);
```

## Options / Props

| Function | Description |
|----------|-------------|
| `DMLCreateDevice` | Creates a DirectML device for a given Direct3D 12 device. |
| `DMLCreateDevice1` | Creates a DirectML device for a given Direct3D 12 device, additionally taking a minimum `DML_FEATURE_LEVEL`. |

## Notes

- `DMLCreateDevice` is equivalent to calling `DMLCreateDevice1` with `DML_FEATURE_LEVEL_1_0`.
- These are the only two free functions declared in `DirectML.h`; all other DirectML functionality is exposed through COM interface methods.

## Related

- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [DirectML interfaces](./api-reference-interfaces.md)
