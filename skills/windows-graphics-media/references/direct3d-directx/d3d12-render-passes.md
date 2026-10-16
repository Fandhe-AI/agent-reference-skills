# D3D12 render passes: ID3D12GraphicsCommandList4::BeginRenderPass / EndRenderPass

A render pass is a subset of the commands recorded into a command list, nested between `BeginRenderPass` and `EndRenderPass`. It lets the app declare output bindings and load/store dependencies so the driver can reduce off-chip memory traffic (notably on Tile-Based Deferred Rendering GPUs). New in Windows 10, version 1809 (10.0; Build 17763).

## Signature / Usage

```cppwinrt
void render_passes(::ID3D12GraphicsCommandList4 * pIGCL4,
    D3D12_CPU_DESCRIPTOR_HANDLE const& rtvCPUDescriptorHandle,
    D3D12_CPU_DESCRIPTOR_HANDLE const& dsvCPUDescriptorHandle)
{
    const float clearColor4[]{ 0.f, 0.f, 0.f, 0.f };
    CD3DX12_CLEAR_VALUE clearValue{ DXGI_FORMAT_R32G32B32_FLOAT, clearColor4 }; // format must match the bound RTV's format

    D3D12_RENDER_PASS_BEGINNING_ACCESS renderPassBeginningAccessClear{ D3D12_RENDER_PASS_BEGINNING_ACCESS_TYPE_CLEAR, { clearValue } };
    D3D12_RENDER_PASS_ENDING_ACCESS renderPassEndingAccessPreserve{ D3D12_RENDER_PASS_ENDING_ACCESS_TYPE_PRESERVE, {} };
    D3D12_RENDER_PASS_RENDER_TARGET_DESC renderPassRenderTargetDesc{ rtvCPUDescriptorHandle, renderPassBeginningAccessClear, renderPassEndingAccessPreserve };

    D3D12_RENDER_PASS_BEGINNING_ACCESS renderPassBeginningAccessNoAccess{ D3D12_RENDER_PASS_BEGINNING_ACCESS_TYPE_NO_ACCESS, {} };
    D3D12_RENDER_PASS_ENDING_ACCESS renderPassEndingAccessNoAccess{ D3D12_RENDER_PASS_ENDING_ACCESS_TYPE_NO_ACCESS, {} };
    D3D12_RENDER_PASS_DEPTH_STENCIL_DESC renderPassDepthStencilDesc{ dsvCPUDescriptorHandle, renderPassBeginningAccessNoAccess, renderPassBeginningAccessNoAccess, renderPassEndingAccessNoAccess, renderPassEndingAccessNoAccess };

    pIGCL4->BeginRenderPass(1, &renderPassRenderTargetDesc, &renderPassDepthStencilDesc, D3D12_RENDER_PASS_FLAG_NONE);
    // Record command list.
    pIGCL4->EndRenderPass();
    // Begin/End further render passes and then execute the command list(s).
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| D3D12_RENDER_PASS_RENDER_TARGET_DESC | struct | CPU descriptor handle for RTV(s) plus beginning and ending access. |
| D3D12_RENDER_PASS_DEPTH_STENCIL_DESC | struct | CPU descriptor handle for the DSV plus beginning and ending access. |
| D3D12_RENDER_PASS_BEGINNING_ACCESS / _TYPE | struct / enum | How the resource is accessed at pass start (e.g. `_TYPE_CLEAR`, `_TYPE_NO_ACCESS`). |
| D3D12_RENDER_PASS_ENDING_ACCESS / _TYPE | struct / enum | How the resource is accessed at pass end (e.g. `_TYPE_PRESERVE`, `_TYPE_NO_ACCESS`). |
| D3D12_RENDER_PASS_FLAG_NONE | flag (`D3D12_RENDER_PASS_FLAGS`) | `= 0`. |
| D3D12_RENDER_PASS_FLAG_ALLOW_UAV_WRITES | flag | `= 0x1`. Required to issue UAV writes within the pass, so the driver can opt out of tiling. |
| D3D12_RENDER_PASS_FLAG_SUSPENDING_PASS | flag | `= 0x2`. Pass suspends; must be followed by a resuming pass with identical views/access flags and no intervening GPU operations. |
| D3D12_RENDER_PASS_FLAG_RESUMING_PASS | flag | `= 0x4`. Pass resumes a suspended pass. A pass can be both resuming and suspending. |
| D3D12_FEATURE_DATA_D3D12_OPTIONS5::RenderPassesTier | `D3D12_RENDER_PASS_TIER` | Query via `CheckFeatureSupport(D3D12_FEATURE_D3D12_OPTIONS5, ...)` to see whether the driver/hardware efficiently supports render passes. |

## Notes

- The clear value's format must match the format of the RTV bound in `D3D12_RENDER_PASS_RENDER_TARGET_DESC`. The source sample uses `DXGI_FORMAT_R32G32B32_FLOAT` for illustration only; render-target support for that format is optional, so substitute the actual RTV format (e.g. `DXGI_FORMAT_R8G8B8A8_UNORM`).
- Must bind at least one of RTV(s) or DSV. RTVs/DSV are not inherited into the pass and are in an undefined state after it; CPU descriptors are snapped at the `BeginRenderPass` call (like `OMSetRenderTargets`).
- Render passes cannot be nested and cannot straddle command lists. Suspend/resume across command lists requires the lists to be executed in the same `ExecuteCommandLists` call.
- A write inside a render pass is not valid to read until a subsequent render pass (exception: implicit reads for depth testing and blending). Non-conformant barriers include RENDER_TARGET / DEPTH_WRITE to a read state on currently-bound RTVs/DSVs, any aliasing barrier, and UAV barriers. Conformant examples: UNORDERED_ACCESS to INDIRECT_ARGUMENT, COPY_DEST to `*_SHADER_RESOURCE`. UAV bindings are inherited into and propagated out of render passes.
- Disallowed within a pass (the core runtime removes the command list): `AtomicCopyBufferUINT`, `AtomicCopyBufferUINT64`, `BeginRenderPass`, `ClearDepthStencilView`, `ClearRenderTargetView`, `ClearState`, `ClearUnorderedAccessViewFloat/Uint`, `CopyBufferRegion`, `CopyResource`, `CopyTextureRegion`, `CopyTiles`, `DiscardResource`, `Dispatch`, `OMSetRenderTargets`, `ResolveQueryData`, `ResolveSubresource`, `ResolveSubresourceRegion`, `SetProtectedResourceSession`.
- The app is responsible for identifying dependencies, minimizing `*_PRESERVE` use, correct barriers, and avoiding unneeded copies/clears; neither runtime nor driver deduces these.
- Render passes always function (the runtime maps them onto the existing API when unsupported) but may give no benefit; check `RenderPassesTier`, especially when using D3D11On12.
- Namespace: Win32 COM (`d3d12.h`).
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/direct3d-12-render-passes (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [D3D12 command lists and bundles](./d3d12-command-lists-bundles.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
- [Variable-rate shading](./d3d12-variable-rate-shading.md)
- [Direct3D 11 on 12](./d3d11on12.md)
