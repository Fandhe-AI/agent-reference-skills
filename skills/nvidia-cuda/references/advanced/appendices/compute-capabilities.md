# Compute Capabilities

Per-architecture hardware limits (max resident threads/warps/blocks per SM, shared memory size, FP32:FP64 throughput ratio) indexed by compute capability, plus how to query a device's compute capability and how feature availability maps to architecture- vs. family-specific compute capabilities.

## Signature / Usage

```c
cudaDeviceProp prop;
cudaGetDeviceProperties(&prop, device);
int major = prop.major;
int minor = prop.minor;
// compute capability is major.minor, e.g. 9.0
```

## Options / Props

| Specification | 7.5 | 8.0 | 8.6 | 8.7 | 8.9 | 9.0 | 10.0 | 10.3 | 10.7 | 11.0 | 12.x |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FP32 to FP64 Throughput Ratio | 32:1 | 2:1 | 64:1 | 64:1 | 64:1 | 2:1 | 2:1 | 64:1 | 4:1 | 64:1 | 64:1 |
| Max Resident Blocks per SM | 16 | 32 | 16 | 16 | 24 | 32 | 32 | 32 | 16 | 24 | 24 |
| Max Resident Warps per SM | 32 | 64 | 48 | 48 | 48 | 64 | 64 | 64 | 32 | 48 | 48 |
| Max Resident Threads per SM | 1024 | 2048 | 1536 | 1536 | 1536 | 2048 | 2048 | 2048 | 1024 | 1536 | 1536 |
| Max Shared Memory per SM | 64 KB | 164 KB | 100 KB | 164 KB | 100 KB | 228 KB | 228 KB | 228 KB | 328 KB | 228 KB | 100 KB |
| Max Shared Memory per Block | 64 KB | 163 KB | 99 KB | 163 KB | 99 KB | 227 KB | 227 KB | 227 KB | 327 KB | 227 KB | 99 KB |
| Green contexts: min SM partition size (useFlags 0) | 2 | 4 | 4 | 4 | 4 | 8 | 8 | 8 | 8 | 8 | 8 |
| Green contexts: SM co-scheduled alignment (useFlags 0) | 2 | 2 | 2 | 2 | 2 | 8 | 8 | 8 | 8 | 8 | 8 |

Unified data cache and shared-memory carveout sizes for CC 10.7 (CPG 13.4): unified data cache 336 KB; SMEM capacity sizes 0, 8, 16, 32, 64, 100, 132, 164, 196, 228, 328 KB (CC 10.0 / 10.3 / 11.0: 256 KB cache, same list without 328). Tensor Core input types for CC 10.7: FP64, TF32, BF16, FP16, FP8, FP6, FP4 (not INT8 or INT4). Family-specific targets: `compute_100f` is compatible with CC 10.0, 10.3, and 10.7; `compute_103f` with 10.3 and 10.7; `compute_107f` with 10.7 only.

## Notes

- Compute capability has two components: architecture-specific features (require an exact major.minor match or higher within a family) and family-specific features (available across a whole family of compute capabilities regardless of minor version).
- The table above is a subset of the official page's specification tables, covering compute capabilities 7.5, 8.0, 8.6, 8.7, 8.9, 9.0, 10.0, 10.3, 10.7, 11.0, and 12.x (the full tables add grid/block limits, registers, local/constant/texture memory, etc.); consult the official page for the complete matrix.
- Correction (CPG 13.4.2, read from the HTML table with its `colspan` cells): earlier revisions of this page's table had shifted columns for several rows (e.g. FP32:FP64 for 10.0 and 12.x, resident blocks per SM for 8.9 / 9.0 / 12.x, shared memory per SM for 12.x); the table above follows the 13.4.2 HTML.
- CC 10.7: kernels using the 328 KB shared-memory configuration must explicitly enable `cudaSharedMemoryModeAllowOversizedSharedMemory` by setting either the `cudaFuncAttributeSharedMemoryMode` function attribute or the `cudaLaunchAttributeSharedMemoryMode` launch attribute.
- Feature Set Compiler Targets determine which `-arch`/`-gencode` value is required to use a given feature — a kernel using a family-specific feature can target the family's baseline compute capability rather than every individual minor version.

## Related

- [The CUDA Driver API](../core/driver-api.md)
- [CUDA Environment Variables](./environment-variables.md)
