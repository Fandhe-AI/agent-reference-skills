# D3D12 memory management and residency: committed / placed / reserved resources, video memory budget, residency priorities

D3D12 memory management is "classify, budget and stream". Objects are resident when the GPU can access them; GPUs do not support page faulting, so apps must stay within the video memory budget.

## Signature / Usage

The source pages contain no code sample; these are the APIs they name (arguments omitted):

```text
IDXGIAdapter3::QueryVideoMemoryInfo                          // current budget and usage (local / non-local)
IDXGIAdapter3::RegisterVideoMemoryBudgetChangeNotificationEvent
ID3D12Device::CreateCommittedResource / CreatePlacedResource / CreateReservedResource
ID3D12Device::CreateHeap
ID3D12Device::Evict
ID3D12Device1::SetResidencyPriority                          // D3D12_RESIDENCY_PRIORITY
ID3D12CommandQueue::UpdateTileMappings                       // reserved resources
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Committed resource | resource type | Creates a resource and an implicit heap sized to hold the entire resource. |
| Placed resource | resource type | A resource at a non-zero offset within a heap (typically 64KB aligned; MSAA needs 4MB, 4KB available for small textures). Must be contiguous, cannot be partially resident, cannot be remapped to another heap. Aliasing barriers allow overlapping placed resources. |
| Reserved resource | resource type | Own GPU virtual address space, sparsely mapped to heap regions via `UpdateTileMappings` (D3D11 "tiled resource"). Requires tiled resources tier 1 or greater; not on all hardware. |
| IDXGIAdapter3::QueryVideoMemoryInfo | method | Budget API. Discrete adapters: "local" is video memory, "non-local" is system memory; UMA adapters: non-local is always zero. |
| ID3D12Device::Evict | method | Evicts heaps so content can be paged out to disk. Destroying heaps is more reliable for freeing residency. |
| ID3D12Device1::SetResidencyPriority / D3D12_RESIDENCY_PRIORITY | method / enum | Coarse residency priorities (Windows 10 Creators Update). Default: heaps/resources created as render targets, depth-stencil, or UAV get `D3D12_RESIDENCY_PRIORITY_HIGH` plus size/10MB in the low 16 bits (saturating at 0xFFFF); all others get `D3D12_RESIDENCY_PRIORITY_NORMAL`. |
| D3D12_FEATURE_DATA_GPU_VIRTUAL_ADDRESS_SUPPORT / D3D12_FEATURE_DATA_ARCHITECTURE / D3D12_TILED_RESOURCES_TIER / D3D12_RESOURCE_HEAP_TIER | feature data | Adapter capabilities for residency designs. |

Classification strategy (from the source): Critical (command allocators, queues, query heaps, UI; non-pageable), Scaled/Optional (level-specific assets, swap chains), Re-used resources (shadow buffers, post-processing; overlapping placed resources + aliasing barriers), Streaming (terrain, open-world; partial residency, background copy queues).

## Notes

- Most API objects encapsulate GPU-accessible memory made resident at creation and evicted at destruction. Heaps are resident upon creation and cannot be made partially resident (reserved resources are the workaround).
- If an app exceeds its budget the process can be intermittently frozen and/or creation APIs return failure. A reservation does not raise the budget; it helps the OS kernel minimize impact under memory pressure and is not guaranteed when the app is in the background.
- Heap creation can be slow; create heaps on background threads (multiple threads may call create routines concurrently).
- `Evict` will not reliably reclaim residency on adapters where `MaxGPUVirtualAddressBitsPerProcess` is near the budget size.
- "Suballocation within heaps" is a section index page in the source linking to Memory Aliasing and Data Inheritance and Shared Heaps (multi-process / multi-adapter); it has no further content here.
- The source pages do not describe `MakeResident` in detail; see the official API reference for it.
- Namespace: Win32 COM (`d3d12.h`, `dxgi1_4.h`).
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/memory-management-strategies, https://learn.microsoft.com/en-us/windows/win32/direct3d12/residency, https://learn.microsoft.com/en-us/windows/win32/direct3d12/suballocation-within-heaps (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [IDXGIFactory2 / IDXGIAdapter](./dxgi-factory-adapter.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
