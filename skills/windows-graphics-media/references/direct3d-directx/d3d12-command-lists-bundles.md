# D3D12 command lists and bundles: CreateCommandList, ID3D12CommandAllocator, ExecuteCommandLists, ID3D12Fence

Command lists record GPU commands; bundles are a second-level, reusable group of commands executed from direct command lists. Command queues submit direct/compute/copy command lists, and fences synchronize work between queues and the CPU.

## Signature / Usage

```cpp
// Create a command list (recording state), close it, and execute it on a queue.
ThrowIfFailed(m_device->CreateCommandList(0, D3D12_COMMAND_LIST_TYPE_DIRECT, m_commandAllocator.Get(), m_pipelineState.Get(), IID_PPV_ARGS(&m_commandList)));

// Command lists are created in the recording state, but there is nothing
// to record yet. The main loop expects it to be closed, so close it now.
ThrowIfFailed(m_commandList->Close());

// Create synchronization objects.
ThrowIfFailed(m_device->CreateFence(0, D3D12_FENCE_FLAG_NONE, IID_PPV_ARGS(&m_fence)));
m_fenceValue = 1;
m_fenceEvent = CreateEvent(nullptr, FALSE, FALSE, nullptr);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D12Device::CreateCommandList | method | Creates a direct command list or bundle; takes `D3D12_COMMAND_LIST_TYPE`, an `ID3D12CommandAllocator` of the same type, and an initial `ID3D12PipelineState` (NULL uses a default state). |
| ID3D12Device4::CreateCommandList1 | method | Creates a closed command list directly, avoiding creating a list with an allocator and PSO and immediately closing it. |
| D3D12_COMMAND_LIST_TYPE | enum | Direct command list, bundle, compute command list, or copy command list. |
| ID3D12CommandAllocator::Reset | method | Reclaims allocator memory for reuse (size is not reduced). Before calling it, the app must make sure the GPU is no longer executing any command lists associated with the allocator (e.g. wait on an `ID3D12Fence`); otherwise the call will fail. Not free-threaded. |
| ID3D12GraphicsCommandList::Reset | method | Returns a list to the recording state; may be called while the list is still executing. |
| ID3D12GraphicsCommandList::Close | method | Leaves the recording state; deferred command list errors surface here. |
| ID3D12CommandQueue::ExecuteCommandLists | method | Submits recorded direct/compute/copy command lists; may be called from multiple threads (runtime serializes in submission order). |
| ID3D12CommandQueue::Signal | method | Advances an `ID3D12Fence` value. |
| ID3D12CommandQueue::CopyTileMappings / UpdateTileMappings | methods | Tiled-resource mapping methods, moved here from `ID3D11DeviceContext2`. |

## Notes

- Only one command list per allocator may be in the recording state at a time; one allocator can be used to create any number of `ID3D12GraphicsCommandList` objects. Command allocators grow but do not shrink: pool and reuse them, using a fence to know when an allocator is reusable. Suggested pool size: approximately `numCommandLists * MaxFrameLatency` allocators (or `numRecordingThreads * MaxFrameLatency` with per-thread reuse).
- Bundles do not inherit the pipeline state of their parent direct command list. All PSOs referenced by a bundle must have the same render target formats, depth buffer format, and sample descriptions. Bundles cannot be submitted directly to a queue.
- Not allowed on a bundle (the runtime drops the call; the debug layer errors): any Clear method, any Copy method, `DiscardResource`, `ExecuteBundle`, `ResourceBarrier`, `ResolveSubresource`, `SetPredication`, `BeginQuery`, `EndQuery`, `SOSetTargets`, `OMSetRenderTargets`, `RSSetViewports`, `RSSetScissorRects`. `SetDescriptorHeaps` is allowed but the heaps must match the calling command list's.
- Queue types: DIRECT accepts any command, COMPUTE accepts compute and copy commands, COPY accepts only copy commands.
- `ExecuteCommandLists` calls are dropped if: the list is a bundle; `Close` was not called; the allocator was reset since recording; the fence indicates a previous execution has not completed; query begin/end states or resource transition barrier before/after states do not match.
- Resource access across queues: a resource transitioned to a writable state is exclusively owned by that queue and must transition to a read or COMMON state before another queue accesses it; in a read state it can be read from multiple queues (including across processes).
- `ID3D12GraphicsCommandList` APIs do not hold references to the objects passed in; the app must not submit a list that references a destroyed resource.
- Most `ID3D12GraphicsCommandList` methods return no errors; errors are deferred until `Close`. `DXGI_ERROR_DEVICE_REMOVED` is deferred further and can appear in resource creation methods, `ID3D12Resource::Map`, `IDXGISwapChain1::Present1`, and `GetDeviceRemovedReason`.
- The source page includes a full table of which command list APIs are valid on Graphics / Compute / Copy / Bundle command lists and inside a render pass; see the official page for it.
- Namespace: Win32 COM (`d3d12.h`). Distinct from other frameworks' command-buffer abstractions (e.g. WebGPU/wgpu, Vulkan).
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/recording-command-lists-and-bundles and https://learn.microsoft.com/en-us/windows/win32/direct3d12/executing-and-synchronizing-command-lists (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
- [D3D12 render passes](./d3d12-render-passes.md)
- [D3D12 root signatures](./d3d12-root-signatures.md)
