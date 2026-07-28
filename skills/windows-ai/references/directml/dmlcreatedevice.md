# DMLCreateDevice / IDMLDevice

`DMLCreateDevice` creates a DirectML device (`IDMLDevice`) for a given Direct3D 12 device. `IDMLDevice` is the root object used to create operators, binding tables, command recorders, and other DirectML objects.

## Signature / Usage

```cpp
HRESULT DMLCreateDevice(
  ID3D12Device            *d3d12Device,
  DML_CREATE_DEVICE_FLAGS flags,
  REFIID                  riid,
  void                    **ppv
);
```

```cpp
ComPtr<ID3D12Device> d3d12Device = /* ... */;
ComPtr<IDMLDevice> dmlDevice;
DMLCreateDevice(
    d3d12Device.Get(),
    DML_CREATE_DEVICE_FLAG_NONE,
    IID_PPV_ARGS(&dmlDevice));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `d3d12Device` | `ID3D12Device*` | The Direct3D 12 device to create the DirectML device over. Any D3D feature level and any adapter (including WARP) is supported, though feature availability varies; the DirectML device holds a strong reference to it. |
| `flags` | `DML_CREATE_DEVICE_FLAGS` | Additional device creation options (for example, enabling the debug layer). |
| `riid` | `REFIID` | GUID of the interface to return in `ppv`, typically `IID_IDMLDevice`. |
| `ppv` | `void**` | Receives the created `IDMLDevice`. |

### IDMLDevice methods

| Name | Description |
|------|-------------|
| `CheckFeatureSupport` | Queries optional features/capabilities supported by the device. |
| `CompileOperator` | Compiles an `IDMLOperator` into an `IDMLCompiledOperator` suitable for GPU dispatch. |
| `CreateBindingTable` | Creates an `IDMLBindingTable` for binding resources to a dispatchable object. |
| `CreateCommandRecorder` | Creates an `IDMLCommandRecorder`. |
| `CreateOperator` | Creates an `IDMLOperator` from a `DML_OPERATOR_DESC`. |
| `CreateOperatorInitializer` | Creates an `IDMLOperatorInitializer` to initialize one or more compiled operators. |
| `Evict` / `MakeResident` | Evicts/restores pageable DirectML objects from/to GPU memory. |
| `GetDeviceRemovedReason` | Retrieves the reason the device was removed. |
| `GetParentDevice` | Retrieves the underlying `ID3D12Device`. |

## Notes

- A newer overload, `DMLCreateDevice1`, was introduced in DirectML 1.1.0 and additionally takes a minimum `DML_FEATURE_LEVEL`; `DMLCreateDevice` is equivalent to calling it with `DML_FEATURE_LEVEL_1_0`.
- `IDMLDevice` inherits from `IDMLObject`; it is thread-safe, and unlike the Direct3D 12 device is not a singleton (multiple DirectML devices can wrap the same D3D12 device, though there's little benefit to doing so since it has no mutable state).
- `IDMLDevice1` (used with `CompileGraph`) extends `IDMLDevice` with graph-compilation and additional eviction/residency methods.

## Related

- [DirectML Overview](./directml-overview.md)
- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [IDMLOperatorInitializer](./idmloperatorinitializer.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [DML_GRAPH_DESC / IDMLDevice1::CompileGraph](./graphs.md)
