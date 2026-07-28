# IDMLCommandRecorder

Records dispatches of DirectML work (operator initialization or execution) into an existing Direct3D 12 command list. Created via `IDMLDevice::CreateCommandRecorder`.

## Signature / Usage

```cpp
ComPtr<IDMLCommandRecorder> commandRecorder;
dmlDevice->CreateCommandRecorder(IID_PPV_ARGS(&commandRecorder));

commandRecorder->RecordDispatch(
    commandList.Get(),        // ID3D12GraphicsCommandList*
    compiledOperator.Get(),   // IDMLDispatchable* (compiled operator or initializer)
    bindingTable.Get());      // IDMLBindingTable*
```

## Options / Props

| Name | Description |
|------|-------------|
| `RecordDispatch` | Records execution of a dispatchable object (an `IDMLOperatorInitializer` or `IDMLCompiledOperator`) onto a Direct3D 12 command list, using the bindings established in the supplied `IDMLBindingTable`. |

## Notes

- Inherits from `IDMLDeviceChild`; this object is stateless and thread-safe.
- DirectML does not create command lists, allocators, or queues, nor does it submit work for execution — the application owns and manages those Direct3D 12 objects and is responsible for executing the recorded command list on a queue of its choice.

## Related

- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [IDMLOperatorInitializer](./idmloperatorinitializer.md)
- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
