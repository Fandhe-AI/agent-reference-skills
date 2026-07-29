# IDMLBindingTable / DML_BINDING_DESC

`IDMLBindingTable` wraps a range of an application-managed CPU/GPU descriptor heap and is used to bind resources (input/output tensors, temporary/persistent buffers) to a dispatchable object (a compiled operator or operator initializer) before recording a dispatch. Created via `IDMLDevice::CreateBindingTable`. `DML_BINDING_DESC` is the generic, type-erased struct used to describe an individual binding passed to the table's `Bind*` methods.

## Signature / Usage

```cpp
struct DML_BINDING_DESC {
  DML_BINDING_TYPE Type;
  const void       *Desc;
};
```

```cpp
DML_BINDING_TABLE_DESC bindingTableDesc{
    compiledOperator.Get(), cpuHandle, gpuHandle, descriptorCount };
ComPtr<IDMLBindingTable> bindingTable;
dmlDevice->CreateBindingTable(&bindingTableDesc, IID_PPV_ARGS(&bindingTable));

DML_BUFFER_BINDING inputBufferBinding{ inputResource.Get(), 0, inputResource->GetDesc().Width };
DML_BINDING_DESC inputBinding{ DML_BINDING_TYPE_BUFFER, &inputBufferBinding };
bindingTable->BindInputs(1, &inputBinding);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Type` | `DML_BINDING_TYPE` | Whether the binding refers to a single buffer (`DML_BINDING_TYPE_BUFFER`) or an array of buffers (`DML_BINDING_TYPE_BUFFER_ARRAY`). |
| `Desc` | `const void*` | Points to a `DML_BUFFER_BINDING` when `Type` is `DML_BINDING_TYPE_BUFFER`, or a `DML_BUFFER_ARRAY_BINDING` when `Type` is `DML_BINDING_TYPE_BUFFER_ARRAY`. |

### IDMLBindingTable methods

| Name | Description |
|------|-------------|
| `BindInputs` | Binds resources as input tensors. |
| `BindOutputs` | Binds resources as output tensors. |
| `BindPersistentResource` | Binds a buffer as the persistent resource (size from `GetBindingProperties`). |
| `BindTemporaryResource` | Binds a buffer as scratch/temporary resource (size from `GetBindingProperties`). |
| `Reset` | Rebinds the table to a new descriptor range, potentially for a different dispatchable object. |

## Notes

- Inherits from `IDMLDeviceChild`; associated with exactly one dispatchable object at a time, but can be `Reset` and reused for a different one even before prior GPU work completes, since it doesn't own the descriptor heap.
- Not thread-safe — the application must not call methods on the same binding table concurrently from multiple threads.
- Doesn't hold strong references on bound resources or the descriptor heap; the application is responsible for resource lifetime and synchronization with GPU completion.

## Related

- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [IDMLOperatorInitializer](./idmloperatorinitializer.md)
- [Tensors: DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC](./tensors.md)
- [DirectML Programming Guide](./programming-guide.md)
