# Hardware Implementation

Describes how HIP's logical execution model (threads/warps/blocks/grids) maps onto AMD GPU compute units, across the CDNA (Instinct) and RDNA (Radeon) architecture families.

## Signature / Usage

```cpp
// Query hardware traits at runtime instead of hardcoding warp size
hipDeviceProp_t prop;
hipGetDeviceProperties(&prop, deviceId);
int warpSize = prop.warpSize; // 64 on CDNA, 32 on RDNA
```

## Options / Props

| Trait | CDNA (Instinct) | RDNA (Radeon) |
| --- | --- | --- |
| Warp/wavefront size | 64 threads | 32 threads (Wave32) |
| SIMD layout per CU | 4 SIMD units, 16 FP32 ALUs each (64 ALUs/CU) | 2×32-wide SIMD per compute unit, paired into a work group processor (WGP) |
| Specialized units | Matrix fused multiply-add (MFMA), accumulation VGPRs (AGPRs) | — |
| Cache hierarchy | L1 (per-CU) + L2 (device-wide coherence point) | L0, L1, L2 three-level hierarchy |
| LDS bandwidth | 32-64 banks, up to 128-256 bytes/cycle | same LDS model |

## Notes

- Context switching between resident warps on a CU is single-cycle with zero overhead, since all warp contexts remain resident.
- L2 cache is the coherence point for all GPU memory accesses; software-managed fences/atomics synchronize at this level.
- Warp size (`hipDeviceProp_t::warpSize`) must be queried at runtime rather than assumed, since it differs between CDNA and RDNA.

## Related

- [programming-model.md](./programming-model.md)
- [device-management.md](./device-management.md)
- [performance-guidelines.md](./performance-guidelines.md)
