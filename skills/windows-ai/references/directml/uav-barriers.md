# UAV Barriers and Resource State Barriers

Correctness requirements for synchronizing adjacent DirectML operator dispatches on the same command list using UAV barriers, and for managing Direct3D 12 resource-state transitions around `RecordDispatch`.

## Signature / Usage

```cpp
// Data-dependent chain: conv1 -> relu1 -> batch1
dmlCommandRecorder->RecordDispatch(d3d12CommandList, conv1);
d3d12CommandList->ResourceBarrier(/* UAV barrier */);
dmlCommandRecorder->RecordDispatch(d3d12CommandList, relu1);
d3d12CommandList->ResourceBarrier(/* UAV barrier */);
dmlCommandRecorder->RecordDispatch(d3d12CommandList, batch1);
```

## Notes

- Adjacent DirectML dispatches on the same command list may execute in parallel on the GPU unless separated by a UAV barrier (`ID3D12GraphicsCommandList::ResourceBarrier`); without one, a data dependency between dispatches or overlapping UAV writes causes a race condition.
- DirectML guarantees it only ever reads input tensors (never writes to them) and never writes outside a tensor's `DML_BUFFER_TENSOR_DESC::TotalTensorSizeInBytes`; this lets data dependencies be reasoned about purely from operator input/output bindings — two operators reading the same input region need no barrier between them, and two concurrent operators writing to non-overlapping output regions of the same resource are also safe without a barrier.
- Use the minimum number of UAV barriers necessary; unnecessary barriers cost performance. Independent branches in a graph (e.g. two convolutions fed by the same pooling output) can run concurrently with only one barrier before and one after the branch.
- The caller is responsible for all resource-state transitions; DirectML performs none on your behalf. Bound resources must be transitioned to `D3D12_RESOURCE_STATE_UNORDERED_ACCESS` (or an implicitly promotable state such as `D3D12_RESOURCE_STATE_COMMON`) prior to `IDMLCommandRecorder::RecordDispatch`, and remain in `D3D12_RESOURCE_STATE_UNORDERED_ACCESS` afterward.

## Related

- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [Resource lifetime and synchronization](./resource-lifetime-sync.md)
- [DirectML Programming Guide](./programming-guide.md)
