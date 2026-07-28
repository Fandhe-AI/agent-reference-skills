# Direct3D 12 overview: Device, CommandQueue, GraphicsCommandList, PipelineState, RootSignature, Resource, descriptor heaps, fences

Direct3D 12 exposes the GPU pipeline explicitly. `ID3D12Device` creates every other object; `ID3D12CommandQueue` submits `ID3D12GraphicsCommandList`s recorded against an `ID3D12PipelineState` and `ID3D12RootSignature`; `ID3D12Resource` is memory the GPU/CPU read and write; `ID3D12DescriptorHeap` holds the views (RTV/SRV/CBV/UAV/sampler) bound to the pipeline; `ID3D12Fence` synchronizes CPU and GPU work.

## Signature / Usage

```cpp
HRESULT D3D12CreateDevice(
  IUnknown          *pAdapter,
  D3D_FEATURE_LEVEL MinimumFeatureLevel,
  REFIID            riid,
  void              **ppDevice
);
```

```cpp
ComPtr<ID3D12Device> device;
D3D12CreateDevice(nullptr, D3D_FEATURE_LEVEL_11_0, IID_PPV_ARGS(&device));

D3D12_COMMAND_QUEUE_DESC qDesc = { D3D12_COMMAND_LIST_TYPE_DIRECT };
ComPtr<ID3D12CommandQueue> commandQueue;
device->CreateCommandQueue(&qDesc, IID_PPV_ARGS(&commandQueue));

ComPtr<ID3D12CommandAllocator> allocator;
device->CreateCommandAllocator(D3D12_COMMAND_LIST_TYPE_DIRECT, IID_PPV_ARGS(&allocator));

ComPtr<ID3D12GraphicsCommandList> commandList;
device->CreateCommandList(0, D3D12_COMMAND_LIST_TYPE_DIRECT, allocator.Get(), pso.Get(), IID_PPV_ARGS(&commandList));

// Record, close, execute.
commandList->Close();
ID3D12CommandList* lists[] = { commandList.Get() };
commandQueue->ExecuteCommandLists(1, lists);

// CPU/GPU sync with a fence.
ComPtr<ID3D12Fence> fence;
device->CreateFence(0, D3D12_FENCE_FLAG_NONE, IID_PPV_ARGS(&fence));
UINT64 fenceValue = 1;
commandQueue->Signal(fence.Get(), fenceValue);
if (fence->GetCompletedValue() < fenceValue) {
    HANDLE event = CreateEvent(nullptr, FALSE, FALSE, nullptr);
    fence->SetEventOnCompletion(fenceValue, event);
    WaitForSingleObject(event, INFINITE);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D12Device | interface | Virtual adapter; creates command allocators/lists/queues, fences, resources, pipeline state objects, heaps, root signatures, descriptor heaps, and views. |
| D3D12CreateDevice(pAdapter, MinimumFeatureLevel, riid, ppDevice) | function | Creates the device; D3D12 devices are singletons per adapter (reused across calls unless removed). |
| ID3D12CommandQueue | interface | Submits command lists (`ExecuteCommandLists`), issues GPU-side waits (`Wait`) and fence signals (`Signal`); created via `ID3D12Device::CreateCommandQueue`. |
| ID3D12GraphicsCommandList | interface | Records a list of GPU commands (draw/dispatch/copy/resource-barrier/state-setting); created via `ID3D12Device::CreateCommandList`, recorded between `Reset` and `Close`. |
| ID3D12PipelineState | interface | Encapsulates all bound shaders plus fixed-function state; created via `CreateGraphicsPipelineState` or `CreateComputePipelineState`; bound with `SetPipelineState`. |
| ID3D12RootSignature | interface | Defines what resources (descriptor tables, root constants, root descriptors) are bound to the pipeline; created via `ID3D12Device::CreateRootSignature`; bound with `SetGraphicsRootSignature`/`SetComputeRootSignature`. |
| ID3D12Resource | interface | A GPU-visible memory resource (buffer or texture); created via `CreateCommittedResource`/`CreatePlacedResource`/`CreateReservedResource`; accessed with `Map`/`Unmap`/`GetGPUVirtualAddress`. |
| ID3D12DescriptorHeap | interface | A contiguous array of descriptors (RTV/DSV/CBV/SRV/UAV/sampler); created via `CreateDescriptorHeap`; `GetCPUDescriptorHandleForHeapStart`/`GetGPUDescriptorHandleForHeapStart` locate entries. |
| ID3D12Fence | interface | CPU/GPU synchronization primitive; `Signal` sets a value, `GetCompletedValue` reads it, `SetEventOnCompletion` fires a Win32 event when the fence reaches a value; created via `ID3D12Device::CreateFence`. |

## Notes

- `pDevice` passed to `IDXGIFactory2::CreateSwapChainForHwnd`/`CreateSwapChainForComposition` for D3D12 must be the `ID3D12CommandQueue`, not the device.
- Resource state transitions are explicit: submit `ID3D12GraphicsCommandList::ResourceBarrier` before using a resource in a new state (e.g. `D3D12_RESOURCE_STATE_PRESENT` -> `RENDER_TARGET`).
- `ID3D12CommandAllocator` (backing memory for a command list) can only be reset once the GPU has finished executing the command lists recorded against it — track this with a fence.
- Namespace: Win32 COM (`d3d12.h`). Distinct from other frameworks' low-level GPU command-buffer abstractions (e.g. WebGPU/wgpu, Vulkan).

## Related

- [IDXGIFactory2 / IDXGIAdapter](./dxgi-factory-adapter.md)
- [DXGI swap chain](./dxgi-swap-chain.md)
- [HLSL shader compilation](./hlsl-shader-compilation.md)
