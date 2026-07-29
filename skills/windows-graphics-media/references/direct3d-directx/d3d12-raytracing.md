# DirectX Raytracing (DXR): ID3D12StateObject / acceleration structures / DispatchRays

DirectX Raytracing adds a separate GPU pipeline for tracing rays against scene geometry. A raytracing pipeline is compiled into an `ID3D12StateObject` from DXIL libraries and hit-group subobjects (rather than a single `ID3D12PipelineState`); scene geometry is pre-processed into a two-level acceleration structure — a bottom-level (BLAS) per mesh and a top-level (TLAS) of instances referencing BLASes — built with `ID3D12GraphicsCommandList4::BuildRaytracingAccelerationStructure`. Rays are launched with `DispatchRays`, which invokes ray-generation, closest-hit, any-hit, and miss shaders addressed through a shader table.

## Signature / Usage

```cpp
// Requires ID3D12Device5 / ID3D12GraphicsCommandList4 (query from the D3D12 device/command list).
ComPtr<ID3D12Device5> device5;
device.As(&device5);

// 1. Build a bottom-level acceleration structure (BLAS) over triangle geometry.
D3D12_RAYTRACING_GEOMETRY_DESC geomDesc = {};
geomDesc.Type = D3D12_RAYTRACING_GEOMETRY_TYPE_TRIANGLES;
geomDesc.Triangles.VertexBuffer.StartAddress = vertexBuffer->GetGPUVirtualAddress();
geomDesc.Triangles.VertexBuffer.StrideInBytes = sizeof(Vertex);
geomDesc.Triangles.VertexCount = vertexCount;
geomDesc.Triangles.VertexFormat = DXGI_FORMAT_R32G32B32_FLOAT;
geomDesc.Flags = D3D12_RAYTRACING_GEOMETRY_FLAG_OPAQUE;

D3D12_BUILD_RAYTRACING_ACCELERATION_STRUCTURE_INPUTS blasInputs = {};
blasInputs.Type = D3D12_RAYTRACING_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL;
blasInputs.Flags = D3D12_RAYTRACING_ACCELERATION_STRUCTURE_BUILD_FLAG_PREFER_FAST_TRACE;
blasInputs.NumDescs = 1;
blasInputs.pGeometryDescs = &geomDesc;

D3D12_RAYTRACING_ACCELERATION_STRUCTURE_PREBUILD_INFO blasPrebuild;
device5->GetRaytracingAccelerationStructurePrebuildInfo(&blasInputs, &blasPrebuild);
// ... allocate blasScratch/blasResult UAV buffers sized from blasPrebuild, then:

D3D12_BUILD_RAYTRACING_ACCELERATION_STRUCTURE_DESC blasDesc = {};
blasDesc.Inputs = blasInputs;
blasDesc.ScratchAccelerationStructureData = blasScratch->GetGPUVirtualAddress();
blasDesc.DestAccelerationStructureData = blasResult->GetGPUVirtualAddress();
commandList4->BuildRaytracingAccelerationStructure(&blasDesc, 0, nullptr);

// 2. Build the top-level acceleration structure (TLAS) referencing BLAS instances.
D3D12_RAYTRACING_INSTANCE_DESC instanceDesc = {};
instanceDesc.AccelerationStructure = blasResult->GetGPUVirtualAddress();
instanceDesc.InstanceMask = 0xFF;
// instanceDesc.Transform = ... 3x4 row-major world matrix ...
// ... upload instanceDesc(s) to a buffer, then build the TLAS the same way with
//     Type = D3D12_RAYTRACING_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL.

// 3. Bind the pipeline and TLAS, then dispatch rays.
commandList4->SetPipelineState1(stateObject.Get());
D3D12_DISPATCH_RAYS_DESC dispatchDesc = {};
dispatchDesc.RayGenerationShaderRecord = { rayGenTable->GetGPUVirtualAddress(), rayGenTableSize };
dispatchDesc.MissShaderTable = { missTable->GetGPUVirtualAddress(), missTableSize, missRecordStride };
dispatchDesc.HitGroupTable = { hitGroupTable->GetGPUVirtualAddress(), hitGroupTableSize, hitGroupRecordStride };
dispatchDesc.Width = outputWidth;
dispatchDesc.Height = outputHeight;
dispatchDesc.Depth = 1;
commandList4->DispatchRays(&dispatchDesc);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D12Device5::CreateStateObject(pDesc, riid, ppStateObject) | method | Compiles a `D3D12_STATE_OBJECT_DESC` (a list of `D3D12_STATE_SUBOBJECT`s: DXIL libraries, `D3D12_HIT_GROUP_DESC`, `D3D12_RAYTRACING_SHADER_CONFIG`, `D3D12_RAYTRACING_PIPELINE_CONFIG`, global/local root signatures) into an `ID3D12StateObject`. |
| ID3D12StateObjectProperties::GetShaderIdentifier(pExportName) | method | Returns the opaque per-shader identifier written into shader-table records so `DispatchRays` can look up ray-gen/hit/miss shaders by name. |
| ID3D12GraphicsCommandList4::BuildRaytracingAccelerationStructure(pDesc, NumPostbuildInfoDescs, pPostbuildInfoDescs) | method | Builds or updates a BLAS (from `D3D12_RAYTRACING_GEOMETRY_DESC` triangle/AABB geometry) or a TLAS (from `D3D12_RAYTRACING_INSTANCE_DESC` instances referencing BLAS GPU addresses), per `D3D12_BUILD_RAYTRACING_ACCELERATION_STRUCTURE_INPUTS.Type`. |
| ID3D12Device5::GetRaytracingAccelerationStructurePrebuildInfo(pDesc, pInfo) | method | Returns the scratch/result buffer sizes (`D3D12_RAYTRACING_ACCELERATION_STRUCTURE_PREBUILD_INFO`) required to build the given inputs. |
| ID3D12GraphicsCommandList4::DispatchRays(pDesc) | method | Launches `Width * Height * Depth` rays; `D3D12_DISPATCH_RAYS_DESC` supplies GPU-address/size/stride triples for the ray-generation, miss, hit-group, and (optionally) callable shader tables. |
| D3D12_RAYTRACING_INSTANCE_DESC | struct | One TLAS instance: `Transform` (3x4 row-major), `InstanceID`, `InstanceMask`, `InstanceContributionToHitGroupIndex`, `Flags`, `AccelerationStructure` (BLAS GPU virtual address). |

## Notes

- Requires `D3D12_RAYTRACING_TIER_1_0`+ hardware/driver support, checked via `ID3D12Device::CheckFeatureSupport(D3D12_FEATURE_D3D12_OPTIONS5, ...)`.
- Shaders are written in the raytracing subset of HLSL (ray-generation, closest-hit, any-hit, intersection, miss, callable shader stages, e.g. `[shader("raygeneration")]`) and compiled to DXIL with `dxc.exe`, not `D3DCompile`/legacy DXBC.
- A resource used as an acceleration structure (BLAS/TLAS result buffer) must be created in `D3D12_RESOURCE_STATE_RAYTRACING_ACCELERATION_STRUCTURE` and only ever transitioned via UAV barriers, never a state-transition barrier.
- The DirectX 12 Agility SDK is generally required to get DXR (and other recent D3D12 feature) support on older Windows 10 versions without waiting for an OS update.
- Namespace: Win32 COM (`d3d12.h` and the `ID3D12Device5`/`ID3D12GraphicsCommandList4` interfaces it adds). Distinct from vendor-specific raytracing extensions in other APIs (Vulkan `VK_KHR_ray_tracing_pipeline`, Metal `MTLAccelerationStructure`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
- [HLSL shader compilation](./hlsl-shader-compilation.md)
