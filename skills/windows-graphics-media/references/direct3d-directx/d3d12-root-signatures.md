# D3D12 root signatures: D3D12_ROOT_SIGNATURE_DESC, root constants, root descriptors, descriptor tables, static samplers

A root signature is configured by the app and links command lists to the resources shaders require. It defines the types of data shaders expect (root parameters) but not the actual memory; the runtime values are root arguments.

## Signature / Usage

```cpp
CD3DX12_DESCRIPTOR_RANGE1 DescRange[6];

DescRange[0].Init(D3D12_DESCRIPTOR_RANGE_TYPE_SRV,6,2); // t2-t7
DescRange[1].Init(D3D12_DESCRIPTOR_RANGE_TYPE_UAV,4,0); // u0-u3
DescRange[2].Init(D3D12_DESCRIPTOR_RANGE_TYPE_SAMPLER,2,0); // s0-s1
DescRange[3].Init(D3D12_DESCRIPTOR_RANGE_TYPE_SRV,-1,8, 0,
                  D3D12_DESCRIPTOR_RANGE_FLAG_DESCRIPTORS_VOLATILE); // t8-unbounded
DescRange[4].Init(D3D12_DESCRIPTOR_RANGE_TYPE_SRV,-1,0,1,
                  D3D12_DESCRIPTOR_RANGE_FLAG_DESCRIPTORS_VOLATILE);
                                                            // (t0,space1)-unbounded
DescRange[5].Init(D3D12_DESCRIPTOR_RANGE_TYPE_CBV,1,1, 0,
                  D3D12_DESCRIPTOR_RANGE_FLAG_DATA_STATIC); // b1

CD3DX12_ROOT_PARAMETER1 RP[7];

RP[0].InitAsConstants(3,2); // 3 constants at b2
RP[1].InitAsDescriptorTable(2,&DescRange[0]); // 2 ranges t2-t7 and u0-u3
RP[2].InitAsConstantBufferView(0, 0,
                               D3D12_ROOT_DESCRIPTOR_FLAG_DATA_STATIC); // b0
RP[3].InitAsDescriptorTable(1,&DescRange[2]); // s0-s1
RP[4].InitAsDescriptorTable(1,&DescRange[3]); // t8-unbounded
RP[5].InitAsDescriptorTable(1,&DescRange[4]); // (t0,space1)-unbounded
RP[6].InitAsDescriptorTable(1,&DescRange[5]); // b1

CD3DX12_STATIC_SAMPLER_DESC StaticSamplers[1];
StaticSamplers[0].Init(3, D3D12_FILTER_ANISOTROPIC); // s3
CD3DX12_VERSIONED_ROOT_SIGNATURE_DESC RootSig(7,RP,1,StaticSamplers);
ID3DBlob* pSerializedRootSig = nullptr;
CheckHR(D3D12SerializeVersionedRootSignature(&RootSig,&pSerializedRootSig,nullptr));

ID3D12RootSignature* pRootSignature;
CheckHR(pDevice->CreateRootSignature(
    0, // nodeMask (single GPU)
    pSerializedRootSig->GetBufferPointer(),pSerializedRootSig->GetBufferSize(),
    __uuidof(ID3D12RootSignature),
    reinterpret_cast<void**>(&pRootSignature)));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| D3D12_ROOT_PARAMETER_TYPE_32BIT_CONSTANTS | root parameter (`D3D12_ROOT_CONSTANTS`) | Inline 32-bit values that appear in the shader as one constant buffer; no indirection. |
| D3D12_ROOT_PARAMETER_TYPE_CBV / SRV / UAV | root parameter (`D3D12_ROOT_DESCRIPTOR`) | Inline descriptors; limited to CBVs and raw or structured SRV/UAV buffers (a 2D texture SRV cannot be a root descriptor). No size, so no out-of-bounds checking. |
| D3D12_ROOT_PARAMETER_TYPE_DESCRIPTOR_TABLE | root parameter (`D3D12_ROOT_DESCRIPTOR_TABLE`) | Pointer to a collection of `D3D12_DESCRIPTOR_RANGE`s in a descriptor heap. Samplers cannot share a table with CBV/UAV/SRVs. |
| D3D12_DESCRIPTOR_RANGE_TYPE | enum | `_SRV`, `_UAV`, `_CBV`, `_SAMPLER`. |
| D3D12_DESCRIPTOR_RANGE_OFFSET_APPEND | macro | For `OffsetInDescriptorsFromTableStart`: append after the previous range. Overlapping ranges of different types are invalid. |
| D3D12_SHADER_VISIBILITY | enum | Which shader stages see a root slot. Compute always uses `_ALL`. Visibility does not change a slot's cost. |
| D3D12_STATIC_SAMPLER_DESC | struct | Static samplers described directly in the root signature. |
| D3D12_ROOT_SIGNATURE_FLAGS | enum | Flags limiting shader access to the root signature. |
| D3D12SerializeRootSignature / D3D12SerializeVersionedRootSignature | functions | Serialize a `D3D12_ROOT_SIGNATURE_DESC`; output goes to `ID3D12Device::CreateRootSignature`. |
| D3D12CreateRootSignatureDeserializer | function | Returns `ID3D12RootSignatureDeserializer` for reflection of a serialized root signature or compiled shader. |
| `SetGraphicsRoot*` / `SetComputeRoot*` | methods | Set root arguments on `ID3D12GraphicsCommandList` (descriptor tables, 32-bit constants, CBV/SRV/UAV). |

## Notes

- A graphics command list has both a graphics and a compute root signature (independent); a compute command list has one compute root signature.
- Root signatures can be authored in HLSL (the compiler validates the layout against the shader early) or defined with the C++ structures; for driver optimizations see Root Signature Version 1.1.
- Setting a PSO does not change the root signature; use `SetGraphicsRootSignature` / `SetComputeRootSignature`. At draw/dispatch the PSO must match the current root signature or behavior is undefined. A root signature passed to `CreateGraphicsPipelineState` / `CreateComputePipelineState` overrides any root signature in the shaders.
- If multiple descriptor tables overlap in register namespace and any specifies `_ALL` visibility, the layout is invalid (creation fails). Overlapping registers across declarations with common visibility are not allowed.
- Order root parameters from most frequently changing to least; changing bindings may make the driver copy some or all root signature state. Keep the root signature as small as needed; use heaps/descriptor heaps for bulk data.
- Contents of the bound root signature are automatically versioned by the driver between draw/dispatch calls.
- Namespace: Win32 COM (`d3d12.h`).
- The official sample uses shorthand identifiers (D3D12_DESCRIPTOR_RANGE_SRV, CD3DX12_STATIC_SAMPLER, 2-argument serialize, CreateRootSignature without nodeMask, DescRange[5] passing the flag as the 4th (RegisterSpace) argument); the snippet above uses the actual d3d12.h / d3dx12.h signatures.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/root-signatures-overview and https://learn.microsoft.com/en-us/windows/win32/direct3d12/creating-a-root-signature (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
- [D3D12 command lists and bundles](./d3d12-command-lists-bundles.md)
