# IDMLCompiledOperator

Represents a compiled, efficient form of an `IDMLOperator` (or an entire graph) suitable for execution on the GPU. Created by calling `IDMLDevice::CompileOperator` (single operator) or `IDMLDevice1::CompileGraph` (graph). A compiled operator must be initialized exactly once, via an `IDMLOperatorInitializer`, before it can be dispatched.

## Signature / Usage

```cpp
ComPtr<IDMLCompiledOperator> compiledOperator;
dmlDevice->CompileOperator(
    dmlOperator.Get(),
    DML_EXECUTION_FLAG_NONE,
    IID_PPV_ARGS(&compiledOperator));
```

## Options / Props

| Name | Description |
|------|-------------|
| `GetBindingProperties` (inherited from `IDMLDispatchable`) | Queries the required sizes, in bytes, of the temporary and persistent resources for this compiled operator. |

## Notes

- Inherits from `IDMLDispatchable`, which in turn is recorded for execution via `IDMLCommandRecorder::RecordDispatch`.
- Operators may require additional GPU memory beyond input/output tensors: a *temporary* resource (scratch memory, valid only during one dispatch) and a *persistent* resource (must live across the operator's lifetime and is opaque to the application). Bind them with `IDMLBindingTable::BindTemporaryResource` / `BindPersistentResource`.
- Does not reference the source `IDMLOperator` object(s) after compilation returns; it is safe to release them afterward.
- Also implements `IDMLPageable`, so it can be evicted from / made resident in GPU memory via `IDMLDevice::Evict` / `MakeResident`.

## Related

- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [IDMLOperatorInitializer](./idmloperatorinitializer.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [DML_GRAPH_DESC / IDMLDevice1::CompileGraph](./graphs.md)
