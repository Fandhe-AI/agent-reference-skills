# Compute shaders (ID3D11ComputeShader, Dispatch, UAV)

Direct3D 11's compute pipeline runs general-purpose GPU work outside the graphics (vertex/pixel) pipeline. An `ID3D11ComputeShader` (compiled from HLSL with a `numthreads` attribute and a `[numthreads(x, y, z)]` entry point) is bound to the context and invoked with `Dispatch`; it reads/writes data through shader resource views and `ID3D11UnorderedAccessView`s (UAVs), which allow arbitrary read/write access (unlike read-only SRVs).

## Signature / Usage

```hlsl
// Compute shader: doubles every element of a buffer.
RWStructuredBuffer<float> buf : register(u0);

[numthreads(64, 1, 1)]
void main(uint3 dtid : SV_DispatchThreadID)
{
    buf[dtid.x] *= 2.0f;
}
```

```cpp
ComPtr<ID3D11ComputeShader> cs;
device->CreateComputeShader(csBlob->GetBufferPointer(), csBlob->GetBufferSize(), nullptr, &cs);

// UAV over a structured buffer created with D3D11_BIND_UNORDERED_ACCESS.
D3D11_UNORDERED_ACCESS_VIEW_DESC uavDesc = {};
uavDesc.Format = DXGI_FORMAT_UNKNOWN;
uavDesc.ViewDimension = D3D11_UAV_DIMENSION_BUFFER;
uavDesc.Buffer.NumElements = elementCount;

ComPtr<ID3D11UnorderedAccessView> uav;
device->CreateUnorderedAccessView(buffer.Get(), &uavDesc, &uav);

// Dispatch: one thread group per 64 elements.
context->CSSetShader(cs.Get(), nullptr, 0);
context->CSSetUnorderedAccessViews(0, 1, uav.GetAddressOf(), nullptr);
context->Dispatch((elementCount + 63) / 64, 1, 1);

// Unbind before using the buffer as a graphics-pipeline input.
ID3D11UnorderedAccessView* nullUAV = nullptr;
context->CSSetUnorderedAccessViews(0, 1, &nullUAV, nullptr);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D11Device::CreateComputeShader(pShaderBytecode, BytecodeLength, pClassLinkage, ppComputeShader) | method | Creates the compute shader from compiled HLSL bytecode (compile with target profile `cs_5_0` or higher). |
| ID3D11Device::CreateUnorderedAccessView(pResource, pDesc, ppUAV) | method | Creates a read/write view of a buffer or texture created with `D3D11_BIND_UNORDERED_ACCESS`. |
| ID3D11DeviceContext::CSSetShader(pComputeShader, ppClassInstances, NumClassInstances) | method | Binds the compute shader to the compute stage. |
| ID3D11DeviceContext::CSSetUnorderedAccessViews(StartSlot, NumUAVs, ppUAVs, pUAVInitialCounts) | method | Binds UAVs to `u#` registers; `pUAVInitialCounts` sets the hidden counter for append/consume structured buffers (pass `-1` to leave it unchanged). |
| ID3D11DeviceContext::Dispatch(ThreadGroupCountX, ThreadGroupCountY, ThreadGroupCountZ) | method | Issues `X * Y * Z` thread groups, each running `numthreads(x, y, z)` threads as declared in the shader. |
| ID3D11DeviceContext::DispatchIndirect(pBufferForArgs, AlignedByteOffsetForArgs) | method | Same as `Dispatch`, but reads the group counts from a GPU buffer (useful when the dispatch size depends on prior GPU work). |

## Notes

- A resource cannot be bound as a UAV and an SRV/render-target at the same time; unbind the UAV (pass `nullptr`) before using the resource elsewhere in the same frame.
- `RWStructuredBuffer`/`RWByteAddressBuffer`/`RWTexture2D` in HLSL correspond to UAV-bound resources; plain `StructuredBuffer`/`Texture2D` correspond to SRV-bound (read-only) resources.
- Compute shaders require feature level 11_0, or 10_0/10_1 with `D3D11_FEATURE_DATA_D3D10_X_HARDWARE_OPTIONS.ComputeShaders_Plus_RawAndStructuredBuffers_Via_Shader_4_x` support (check via `CheckFeatureSupport`).
- Results are read back to the CPU with a staging resource (`D3D11_USAGE_STAGING`) and `CopyResource` + `Map`, since UAVs themselves are not CPU-accessible.
- Namespace: Win32 COM (`d3d11.h`).

## Related

- [D3D11 resources: Buffer, Texture2D, RenderTargetView](./d3d11-resources.md)
- [ID3D11SamplerState / ID3D11ShaderResourceView (texture sampling)](./d3d11-sampler-srv.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
