# D3D12 Enhanced Barriers: ID3D12GraphicsCommandList7::Barrier, D3D12_BARRIER_GROUP, D3D12_BARRIER_LAYOUT

Enhanced Barriers is a newer synchronization model that runs alongside the legacy `D3D12_RESOURCE_BARRIER`/`ResourceBarrier` model. Instead of one `StateBefore`/`StateAfter` pair per barrier, it splits resource state into three independent axes — GPU pipeline synchronization scope (`D3D12_BARRIER_SYNC`), memory access type (`D3D12_BARRIER_ACCESS`), and, for textures only, image layout (`D3D12_BARRIER_LAYOUT`) — and submits them in typed groups (global/texture/buffer) through `ID3D12GraphicsCommandList7::Barrier`. Enhanced Barriers is not a hardware or driver requirement; support must be queried at runtime via `D3D12_FEATURE_DATA_D3D12_OPTIONS12::EnhancedBarriersSupported` before use.

## Signature / Usage

```cpp
void ID3D12GraphicsCommandList7::Barrier(
  UINT32                     NumBarrierGroups,
  const D3D12_BARRIER_GROUP *pBarrierGroups
);
```

```cpp
// Check support before using command list Barrier APIs or InitialLayout resource creation.
D3D12_FEATURE_DATA_D3D12_OPTIONS12 options12 = {};
device->CheckFeatureSupport(D3D12_FEATURE_D3D12_OPTIONS12, &options12, sizeof(options12));
// options12.EnhancedBarriersSupported must be TRUE (requires Agility SDK 1.6+).

// Texture barrier: back buffer PRESENT -> RENDER_TARGET layout before drawing.
D3D12_TEXTURE_BARRIER texBarrier = {};
texBarrier.SyncBefore = D3D12_BARRIER_SYNC_NONE;
texBarrier.SyncAfter = D3D12_BARRIER_SYNC_RENDER_TARGET;
texBarrier.AccessBefore = D3D12_BARRIER_ACCESS_NO_ACCESS;
texBarrier.AccessAfter = D3D12_BARRIER_ACCESS_RENDER_TARGET;
texBarrier.LayoutBefore = D3D12_BARRIER_LAYOUT_PRESENT;
texBarrier.LayoutAfter = D3D12_BARRIER_LAYOUT_RENDER_TARGET;
texBarrier.pResource = renderTargets[frameIndex].Get();
texBarrier.Subresources = { 0, 0, 0, 0, 0, 0 }; // IndexOrFirstMipLevel=0, NumMipLevels=0 -> subresource index 0
texBarrier.Flags = D3D12_TEXTURE_BARRIER_FLAG_NONE;

D3D12_BARRIER_GROUP group = {};
group.Type = D3D12_BARRIER_TYPE_TEXTURE;
group.NumBarriers = 1;
group.pTextureBarriers = &texBarrier;

commandList7->Barrier(1, &group);

// Buffer barrier: whole-buffer UAV write -> subsequent shader read.
D3D12_BUFFER_BARRIER bufBarrier = {};
bufBarrier.SyncBefore = D3D12_BARRIER_SYNC_COMPUTE_SHADING;
bufBarrier.SyncAfter = D3D12_BARRIER_SYNC_PIXEL_SHADING;
bufBarrier.AccessBefore = D3D12_BARRIER_ACCESS_UNORDERED_ACCESS;
bufBarrier.AccessAfter = D3D12_BARRIER_ACCESS_SHADER_RESOURCE;
bufBarrier.pResource = structuredBuffer.Get();
bufBarrier.Offset = 0; // must be 0
bufBarrier.Size = UINT64_MAX; // or the exact buffer size in bytes

D3D12_BARRIER_GROUP bufGroup = {};
bufGroup.Type = D3D12_BARRIER_TYPE_BUFFER;
bufGroup.NumBarriers = 1;
bufGroup.pBufferBarriers = &bufBarrier;

commandList7->Barrier(1, &bufGroup);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D12GraphicsCommandList7::Barrier(NumBarrierGroups, pBarrierGroups) | method | Submits an array of `D3D12_BARRIER_GROUP` objects. Requires the DirectX 12 Agility SDK 1.608 or later. |
| D3D12_BARRIER_GROUP | struct | `Type` (`D3D12_BARRIER_TYPE`: `_GLOBAL` / `_TEXTURE` / `_BUFFER`), `NumBarriers`, and a union selected by `Type`: `pGlobalBarriers` (`D3D12_GLOBAL_BARRIER*`), `pTextureBarriers` (`D3D12_TEXTURE_BARRIER*`), or `pBufferBarriers` (`D3D12_BUFFER_BARRIER*`). |
| D3D12_GLOBAL_BARRIER | struct | `SyncBefore`, `SyncAfter` (`D3D12_BARRIER_SYNC`), `AccessBefore`, `AccessAfter` (`D3D12_BARRIER_ACCESS`) — no resource pointer or layout; applies to all resources in scope. |
| D3D12_TEXTURE_BARRIER | struct | `SyncBefore`/`SyncAfter`, `AccessBefore`/`AccessAfter`, `LayoutBefore`/`LayoutAfter` (`D3D12_BARRIER_LAYOUT`, layout transitions apply only to textures), `pResource` (`ID3D12Resource*`), `Subresources` (`D3D12_BARRIER_SUBRESOURCE_RANGE`), `Flags` (`D3D12_TEXTURE_BARRIER_FLAGS`). |
| D3D12_BUFFER_BARRIER | struct | `SyncBefore`/`SyncAfter`, `AccessBefore`/`AccessAfter`, `pResource`, `Offset` (must be `0`), `Size` (must be `UINT64_MAX` or the buffer size in bytes). |
| D3D12_BARRIER_SUBRESOURCE_RANGE | struct | `IndexOrFirstMipLevel` (a subresource index when `NumMipLevels` is `0`, using `0xffffffff` to mean all subresources; otherwise the first mip level), `NumMipLevels`, `FirstArraySlice`, `NumArraySlices`, `FirstPlane`, `NumPlanes`. |
| D3D12_BARRIER_SYNC | enum | Pipeline synchronization scope, e.g. `_NONE`, `_ALL`, `_DRAW`, `_VERTEX_SHADING`, `_PIXEL_SHADING`, `_DEPTH_STENCIL`, `_RENDER_TARGET`, `_COMPUTE_SHADING`, `_RAYTRACING`, `_COPY`, `_RESOLVE`, `_EXECUTE_INDIRECT`, `_ALL_SHADING`, `_BUILD_RAYTRACING_ACCELERATION_STRUCTURE`, `_SPLIT` (begin/end split, analogous to legacy `BEGIN_ONLY`/`END_ONLY`). |
| D3D12_BARRIER_ACCESS | enum | Memory access type, e.g. `_COMMON`, `_VERTEX_BUFFER`, `_CONSTANT_BUFFER`, `_INDEX_BUFFER`, `_RENDER_TARGET`, `_UNORDERED_ACCESS`, `_DEPTH_STENCIL_WRITE`/`_READ`, `_SHADER_RESOURCE`, `_COPY_DEST`/`_SOURCE`, `_RESOLVE_DEST`/`_SOURCE`, `_RAYTRACING_ACCELERATION_STRUCTURE_READ`/`_WRITE`, `_NO_ACCESS`. |
| D3D12_BARRIER_LAYOUT | enum | Texture image layout, e.g. `_UNDEFINED`, `_COMMON`, `_PRESENT`, `_GENERIC_READ`, `_RENDER_TARGET`, `_UNORDERED_ACCESS`, `_DEPTH_STENCIL_WRITE`/`_READ`, `_SHADER_RESOURCE`, `_COPY_SOURCE`/`_DEST`, `_RESOLVE_SOURCE`/`_DEST`, `_SHADING_RATE_SOURCE`, plus queue-scoped variants (`_DIRECT_QUEUE_*`, `_COMPUTE_QUEUE_*`, `_VIDEO_QUEUE_COMMON`). |
| D3D12_TEXTURE_BARRIER_FLAGS | enum | `_NONE`, `_DISCARD` (contents need not be preserved across the barrier). |
| D3D12_FEATURE_DATA_D3D12_OPTIONS12::EnhancedBarriersSupported | field (BOOL) | Queried via `ID3D12Device::CheckFeatureSupport(D3D12_FEATURE_D3D12_OPTIONS12, ...)`. `TRUE` if the driver supports Enhanced Barriers; always `FALSE` without Agility SDK 1.6+. Must be checked before calling `Barrier` or using the `InitialLayout` parameter of resource-creation APIs. |

## Notes

- Layout transitions (`LayoutBefore`/`LayoutAfter`) apply only to textures; `D3D12_GLOBAL_BARRIER` and `D3D12_BUFFER_BARRIER` have no layout fields.
- `D3D12_BUFFER_BARRIER.Offset` must be `0`; `Size` must be `UINT64_MAX` or the exact buffer size in bytes — partial-buffer ranges are not supported.
- Requires Windows 11, version 22H2, or the DirectX 12 Agility SDK 1.6+ for feature detection (`D3D12_FEATURE_DATA_D3D12_OPTIONS12`); `ID3D12GraphicsCommandList7::Barrier` itself requires Agility SDK 1.608+.
- This is a distinct, independently-versioned model from the legacy `D3D12_RESOURCE_BARRIER`/`ID3D12GraphicsCommandList::ResourceBarrier` transition/aliasing/UAV barriers documented on the D3D12 resource barriers and descriptor tables page; the two are not interchangeable within a single barrier call, though both operate on the same `ID3D12Resource` objects.
- Namespace: Win32 COM (`d3d12.h`).

## Related

- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
- [Direct3D 12 overview](./d3d12-overview.md)
- [DirectX Raytracing: ID3D12StateObject, acceleration structures, DispatchRays](./d3d12-raytracing.md)
