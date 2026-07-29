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

| Specification | 7.5 | 8.0 | 8.6 | 8.9 | 9.0 | 10.0 | 12.x |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FP32 to FP64 Throughput Ratio | 32:1 | 2:1 | 64:1 | 64:1 | 2:1 | 64:1 | 2:1 |
| Max Resident Blocks per SM | 16 | 32 | 16 | 32 | 24 | 32 | 32 |
| Max Resident Warps per SM | 32 | 64 | 48 | 48 | 64 | 64 | 48 |
| Max Resident Threads per SM | 1024 | 2048 | 1536 | 1536 | 2048 | 2048 | 1536 |
| Max Shared Memory per SM | 64 KB | 164 KB | 100 KB | 100 KB | 228 KB | 228 KB | 128 KB |
| Max Shared Memory per Block | 64 KB | 163 KB | 99 KB | 99 KB | 227 KB | 227 KB | 99 KB |

## Notes

- Compute capability has two components: architecture-specific features (require an exact major.minor match or higher within a family) and family-specific features (available across a whole family of compute capabilities regardless of minor version).
- The table above is a subset of the official page's full specification tables (which also cover compute capabilities 8.7, 9.0, 10.3, 11.0, and registers-per-SM); consult the official page for the complete matrix and for capabilities not listed here.
- Feature Set Compiler Targets determine which `-arch`/`-gencode` value is required to use a given feature — a kernel using a family-specific feature can target the family's baseline compute capability rather than every individual minor version.

## Related

- [The CUDA Driver API](../core/driver-api.md)
- [CUDA Environment Variables](./environment-variables.md)
