# Important changes from Direct3D 11 to Direct3D 12, and hardware feature levels (D3D_FEATURE_LEVEL)

Direct3D 12 moves closer to hardware: apps take over synchronization, residency, pipeline state, work submission, and resource binding that D3D11 handled implicitly. Hardware feature levels (11_0 to 12_1) define GPU functionality sets selected at device creation.

## Signature / Usage

The source pages contain no code; the creation call (also shown in the D3D12 overview page) selects the feature level:

```cpp
ComPtr<ID3D12Device> device;
D3D12CreateDevice(nullptr, D3D_FEATURE_LEVEL_11_0, IID_PPV_ARGS(&device));
```

## Options / Props

| D3D11 | D3D12 |
|-------|-------|
| Implicit CPU-GPU sync and hazard checking | Explicit app responsibility: fences and resource barriers. |
| `Map` with `D3D11_MAP_WRITE_DISCARD` renames buffers | Manual pipelining of all dynamic updates (constant buffers, dynamic vertex buffers, textures) with fences/buffering. |
| Reference-counted lifetimes of interface dependencies | COM ref counting only for interface lifetimes; resource and description memory lifetimes are the app's responsibility. |
| Independent pipeline state objects (IA, PS, RS, OM) finalized at draw time | Immutable pipeline state objects (PSOs) finalized at creation. |
| Immediate context + deferred contexts | Self-contained command lists (no inherited state) submitted via command queues; bundles for reusable, state-inheriting work. |
| Views bound to slots per shader stage | Descriptor heaps and descriptor tables; resources can be dynamically indexed in shaders. |

Feature level support (from the source table; see the official page for all rows):

| Feature | 12_1 | 12_0 | 11_1 | 11_0 |
|---------|------|------|------|------|
| Shader Model | 6.0 | 6.0 | 6.0/5.1 | 6.0/5.1 |
| Resource Binding Tier | Tier2 | Tier2 | Tier1 | Tier1 |
| Tiled Resources | Tier2 | Tier2 | Optional | Optional |
| Conservative Rasterization | Tier1 | Optional | Optional | No |
| Rasterizer Ordered Views | Yes | Optional | Optional | No |
| Max Texture Dimension | 16384 | 16384 | 16384 | 16384 |

## Notes

- Hardware feature levels are not API versions (there is a D3D11.3 API but no 11_3 feature level). Three numbering systems: Direct3D versions use a period (12.0), shader models use a period (5.1), feature levels use an underscore (12_0). Feature levels are defined by `D3D_FEATURE_LEVEL`.
- All D3D12 drivers are feature level 11_0 or better; a feature level includes all lower levels and implies functionality, not performance. Chosen via `D3D12CreateDevice`; use `CheckFeatureSupport` for details on features marked Optional.
- Feature levels 12_0 and 12_1 require the Direct3D 11.3 or Direct3D 12 runtime; 11_1 requires the 11.1 runtime; 11_0 the 11.0 runtime. Shader model 5.1 is supported only on DirectX 12 API hardware; DirectX 11 hardware supports up to SM 5.0; the DirectX 12 API only goes down to feature level 11_0.
- Applications must keep data resident while the GPU reads it (memory is made resident at object creation) and use fences so the GPU does not access evicted objects.
- Porting is an involved process; the source points to Porting from Direct3D 11 to Direct3D 12 and Working with Direct3D 11, Direct3D 10 and Direct2D (interop options such as D3D11On12).
- Namespace: Win32 COM (`d3d12.h`, `d3dcommon.h`). Distinct from other APIs' feature-level or capability systems (Vulkan, Metal).
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/important-changes-from-directx-11-to-directx-12 and https://learn.microsoft.com/en-us/windows/win32/direct3d12/hardware-feature-levels (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [D3D12 command lists and bundles](./d3d12-command-lists-bundles.md)
- [D3D12 memory management and residency](./d3d12-memory-residency.md)
- [Direct3D 11 on 12](./d3d11on12.md)
- [D3D12 resource barriers and descriptor tables](./d3d12-barriers-descriptors.md)
