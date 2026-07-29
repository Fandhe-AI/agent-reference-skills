# D3D12 resource barriers and descriptor tables

Direct3D 12 makes the driver-hidden per-resource state tracking of D3D11 an explicit application responsibility. `ID3D12GraphicsCommandList::ResourceBarrier` submits one or more barrier descriptions — transition, aliasing, or UAV — that tell the GPU when it must synchronize access to a resource. Separately, a root signature's descriptor-table root parameters bind ranges of a descriptor heap (SRV/CBV/UAV/sampler) to shader-visible registers, set per draw/dispatch with `SetGraphicsRootDescriptorTable`/`SetComputeRootDescriptorTable`.

## Signature / Usage

```cpp
// Transition barrier: back buffer PRESENT -> RENDER_TARGET before drawing.
D3D12_RESOURCE_BARRIER barrier = {};
barrier.Type = D3D12_RESOURCE_BARRIER_TYPE_TRANSITION;
barrier.Transition.pResource = renderTargets[frameIndex].Get();
barrier.Transition.Subresource = D3D12_RESOURCE_BARRIER_ALL_SUBRESOURCES;
barrier.Transition.StateBefore = D3D12_RESOURCE_STATE_PRESENT;
barrier.Transition.StateAfter = D3D12_RESOURCE_STATE_RENDER_TARGET;
commandList->ResourceBarrier(1, &barrier);

// ... record draw calls ...

// Transition back before Present.
barrier.Transition.StateBefore = D3D12_RESOURCE_STATE_RENDER_TARGET;
barrier.Transition.StateAfter = D3D12_RESOURCE_STATE_PRESENT;
commandList->ResourceBarrier(1, &barrier);

// UAV barrier: ensure a compute pass's writes are visible before the next dispatch reads them.
D3D12_RESOURCE_BARRIER uavBarrier = {};
uavBarrier.Type = D3D12_RESOURCE_BARRIER_TYPE_UAV;
uavBarrier.UAV.pResource = structuredBuffer.Get();
commandList->ResourceBarrier(1, &uavBarrier);
```

```cpp
// Descriptor table root parameter: one SRV range at shader register t0.
D3D12_DESCRIPTOR_RANGE srvRange = {};
srvRange.RangeType = D3D12_DESCRIPTOR_RANGE_TYPE_SRV;
srvRange.NumDescriptors = 1;
srvRange.BaseShaderRegister = 0;

D3D12_ROOT_PARAMETER rootParam = {};
rootParam.ParameterType = D3D12_ROOT_PARAMETER_TYPE_DESCRIPTOR_TABLE;
rootParam.DescriptorTable.NumDescriptorRanges = 1;
rootParam.DescriptorTable.pDescriptorRanges = &srvRange;
rootParam.ShaderVisibility = D3D12_SHADER_VISIBILITY_PIXEL;

// ... build root signature from rootParam, serialize, CreateRootSignature ...

// Per frame: bind a shader-visible descriptor heap, then the table's GPU handle.
ID3D12DescriptorHeap* heaps[] = { srvHeap.Get() };
commandList->SetDescriptorHeaps(1, heaps);
commandList->SetGraphicsRootSignature(rootSignature.Get());
commandList->SetGraphicsRootDescriptorTable(0, srvHeap->GetGPUDescriptorHandleForHeapStart());
```

## Options / Props

`D3D12_RESOURCE_BARRIER.Type` (`D3D12_RESOURCE_BARRIER_TYPE`):

| Value | Description |
|------|-------------|
| D3D12_RESOURCE_BARRIER_TYPE_TRANSITION | A subresource changes usage state; described by `D3D12_RESOURCE_TRANSITION_BARRIER` (`pResource`, `Subresource`, `StateBefore`, `StateAfter`). Use `D3D12_RESOURCE_BARRIER_ALL_SUBRESOURCES` to transition every subresource at once. |
| D3D12_RESOURCE_BARRIER_TYPE_ALIASING | Two resources share overlapping memory in the same heap (placed/reserved resources); described by `D3D12_RESOURCE_ALIASING_BARRIER` (`pResourceBefore`, `pResourceAfter`, either may be `NULL`). |
| D3D12_RESOURCE_BARRIER_TYPE_UAV | All prior UAV reads/writes on a resource must complete before subsequent UAV reads/writes begin; described by `D3D12_RESOURCE_BARRIER_UAV` (`pResource`, may be `NULL` to mean "any UAV"). |

| Name | Type | Description |
|------|------|-------------|
| ID3D12GraphicsCommandList::ResourceBarrier(NumBarriers, pBarriers) | method | Submits one or more barrier descriptions, applied in array order as if called once per element. |
| D3D12_RESOURCE_BARRIER_FLAG_BEGIN_ONLY / END_ONLY | flags | Split a transition barrier into two calls so GPU work can overlap the transition; the resource cannot be read/written while the barrier is pending (between begin and end). |
| D3D12_ROOT_PARAMETER_TYPE_DESCRIPTOR_TABLE | enum value | Root parameter kind whose argument is a GPU descriptor-heap handle rather than an inline constant/descriptor. |
| D3D12_DESCRIPTOR_RANGE | struct | One contiguous range within a table: `RangeType` (`SRV`/`UAV`/`CBV`/`SAMPLER`), `NumDescriptors`, `BaseShaderRegister`, `RegisterSpace`, `OffsetInDescriptorsFromTableStart`. |
| ID3D12GraphicsCommandList::SetGraphicsRootDescriptorTable / SetComputeRootDescriptorTable(RootParameterIndex, BaseDescriptor) | method | Binds a GPU descriptor handle (from a shader-visible heap) to the table at the given root-parameter slot. |

## Notes

- Resources created in (or decayed to) `D3D12_RESOURCE_STATE_COMMON` are implicitly promoted to many read states and to `COPY_DEST`/`COPY_SOURCE` on first GPU access ("common state promotion"); buffers and simultaneous-access textures decay back to `COMMON` after `ExecuteCommandLists` completes. Relying on this can eliminate many explicit transition barriers — see the "Using Resource Barriers" guide for the full promotable-state table.
- At most one write-state bit may be set on a resource state at a time; any number of read-state bits can coexist.
- Before `IDXGISwapChain::Present`, a back buffer must be in `D3D12_RESOURCE_STATE_PRESENT` (numerically identical to `D3D12_RESOURCE_STATE_COMMON`, value 0).
- Batch multiple barriers into one `ResourceBarrier` call where possible; barriers are not free — they can force cache flushes and stalls, so avoid unnecessary transitions to/from `COMMON`.
- Only `SetDescriptorHeaps`-bound, `D3D12_DESCRIPTOR_HEAP_FLAG_SHADER_VISIBLE` heaps (CBV/SRV/UAV and sampler, at most one of each type simultaneously) can be referenced by a descriptor table; RTV/DSV heaps are never shader-visible and are addressed directly (e.g. `OMSetRenderTargets`), not through root parameters.
- Namespace: Win32 COM (`d3d12.h`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [Compute shaders (ID3D11ComputeShader, Dispatch, UAV)](./d3d11-compute-shader.md)
- [DirectX Raytracing: ID3D12StateObject, acceleration structures, DispatchRays](./d3d12-raytracing.md)
