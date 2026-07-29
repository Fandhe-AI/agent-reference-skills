# Performance Optimization Guides

Architecture-driven optimization guidance for AMD RDNA GPUs, distilled from GPUOpen's public performance guides. Source: "RDNA Performance Guide" (`gpuopen.com/learn/rdna-performance-guide/`) and "Occupancy Explained" (`gpuopen.com/learn/occupancy-explained/`).

## Options / Props

| Topic | Guidance |
| --- | --- |
| Wavefront width | RDNA runs shader threads in wave32 (groups of 32) vs GCN/CDNA's fixed wave64; wave64 shaders execute over 2 cycles and have higher per-wave resource requirements |
| Workgroup size | Make workgroup size a multiple of 64 for best performance across all GPU generations; for async compute, smaller workgroups (64 threads) usually outperform larger ones because they need fewer resources and give the scheduler more launch opportunities |
| Occupancy definition | Ratio of assigned wavefronts to the maximum wavefront slots per SIMD (RDNA2/3: 16 slots/SIMD, RDNA1: 20 slots/SIMD); e.g. 4 assigned wavefronts on a 16-slot SIMD = 25% occupancy |
| Occupancy limiters | VGPR usage (most common limiter), LDS (Local Data Share) allocation per workgroup, SGPR usage (rarely limiting on RDNA) |
| Occupancy tuning | Reduce VGPR usage first; shrink compute-shader threadgroup size for finer scheduling granularity if theoretical occupancy is low; ensure enough total wavefronts exist to fill the GPU (measured occupancy can trail theoretical occupancy) |
| Occupancy caveat | Higher occupancy does not guarantee better performance — maximum occupancy can trigger cache thrashing under bandwidth-constrained workloads; profile actual performance alongside occupancy |
| LDS layout | LDS spans 32 banks of 32 bits each; bank conflicts add latency; prefer struct-of-arrays layout or padding to reduce access strides and bank conflicts (an array of `float4` can produce 8-way bank conflicts vs 2-way for an array of plain `float` for the same access pattern) |
| Cache-hierarchy usage | Write to images in coalesced 256-byte blocks per wave to maximize bandwidth (e.g. 8x8 thread groups writing 8x8 pixel blocks, with swizzled thread layout); avoid sparse/scattered resource reads, which use the cache hierarchy poorly; prefer pre-filtering or a lower MIP level to make better use of the cache hierarchy |
| Texture fetch | When sampling a single channel, use `Gather4` to reduce texture-unit traffic and improve cache efficiency |

## Notes

- This page covers AMD's RDNA-generation, graphics/compute-shader-oriented performance guidance (wave32/wave64 tradeoffs, occupancy accounting, LDS bank conflicts, cache-hierarchy usage). For HIP-runtime-side kernel tuning on ROCm (occupancy query APIs, memory coalescing for HIP kernels, control-flow divergence, asynchronous stream overlap, `rocprofv3` profiling), see the `hip` category's `performance-guidelines.md` instead — the two are complementary (architecture rationale here, HIP tuning API/workflow there).
- The GPUOpen hub page (`gpuopen.com/amd-gpu-architecture-programming-documentation/`) links only ISA references for CDNA (CDNA 1-4), with no dedicated CDNA/Instinct performance-optimization guide comparable to the RDNA one; this page is therefore RDNA-only by source-availability, not by omission.
- The source guides are written from a DirectX 12/Vulkan graphics-shader perspective, not a HIP compute-kernel perspective; the wave32/wave64 and occupancy concepts carry over to HIP compute kernels on RDNA GPUs, but LDS/cache guidance phrased around pixel/vertex shaders may not map 1:1 onto HIP kernel code.
- These are AMD RDNA hardware/optimization terms (wave32, WGP, LDS bank, Infinity Cache) distinct from NVIDIA warp / shared-memory-bank / L1-L2 terminology.

## Related

- [rdna-architecture.md](./rdna-architecture.md)
- [cdna-architecture.md](./cdna-architecture.md)
