# Resource Lifetime and Synchronization

DirectML follows the same resource lifetime model as Direct3D 12: CPU-to-CPU object lifetimes are managed automatically via strong references, but GPU object lifetimes and CPU/GPU synchronization are the application's responsibility.

## Options / Props

| Object | Must be kept alive until GPU work completes? | Notes |
|---|---|---|
| `IDMLCompiledOperator` / `IDMLOperatorInitializer` | Yes | Owns GPU resources directly. |
| `IDMLBindingTable` | No | Doesn't own GPU resources itself; the underlying descriptor heap does, and the heap must be kept alive instead. |
| `ID3D12Resource` (inputs/outputs, persistent/temporary) | Yes | Standard Direct3D 12 GPU resource lifetime rule. |
| `ID3D12CommandAllocator` | Yes | Owns GPU memory backing the command list. |

## Notes

- Lifetime dependencies between two CPU objects are maintained automatically by DirectML using strong reference counts (e.g. every device child holds a strong reference to its parent `IDMLDevice`); GPU-side or CPU/GPU-spanning dependencies are not automatic.
- The `IDMLDevice` is a thread-safe, stateless factory object and is not a singleton — you may create as many devices as needed, but device children (e.g. `IDMLBindingTable`, `IDMLCompiledOperator`) from different devices must not be mixed (e.g. a binding table can't bind an operator from a different device). Device removal is therefore per-device, not process-wide.
- Prematurely releasing an object still in use by the GPU is undefined behavior and can cause device removal or other errors.
- `IDMLCommandRecorder::RecordDispatch` only records the dispatch into a command list; DirectML itself never submits GPU work, creates fences, or performs CPU/GPU synchronization. The application must call `ID3D12CommandQueue::ExecuteCommandLists` and use `ID3D12Fence`/`ID3D12CommandQueue::Signal` to wait for completion when necessary.

## Related

- [UAV barriers and resource state barriers](./uav-barriers.md)
- [Handling errors and device-removal in DirectML](./errors-and-device-removal.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
