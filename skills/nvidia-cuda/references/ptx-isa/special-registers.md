# Special Registers

Predefined, read-only registers (state space `.sreg`) that expose a thread's position in the execution hierarchy, timing counters, and lane masks.

## Signature / Usage

```ptx
mov.u32      %r1,%tid.x;  // move tid.x to %rh
mov.u32  %r, %laneid;
mov.u64  r1,%clock64;
```

## Options / Props

| Register | Purpose |
| --- | --- |
| `%tid` | Thread identifier within CTA (x, y, z components) |
| `%ntid` | Number of threads per CTA dimension |
| `%ctaid` | CTA identifier within grid |
| `%nctaid` | Number of CTAs per grid dimension |
| `%laneid` | Lane identifier within warp (0–31) |
| `%warpid` / `%nwarpid` | Warp identifier / number of warps per CTA |
| `%smid` / `%nsmid` | Streaming multiprocessor identifier / count |
| `%gridid` | Temporal grid identifier for the kernel launch |
| `%clusterid` / `%nclusterid` | Cluster identifier / dimensions within grid (sm_90+) |
| `%cluster_ctaid` / `%cluster_nctaid` | CTA identifier / dimensions within cluster |
| `%cluster_ctarank` / `%cluster_nctarank` | Linear CTA rank within cluster / total CTAs in cluster |
| `%lanemask_eq` / `%lanemask_le` / `%lanemask_lt` / `%lanemask_ge` / `%lanemask_gt` | Predicate masks relative to the calling lane's ID |
| `%clock` / `%clock_hi` / `%clock64` | Low/high 32 bits, or 64-bit, clock counter |
| `%pm0`–`%pm7` | Performance-monitoring counters |
| `%globaltimer` | Global nanosecond timer value |
| `%dynamic_smem_size` | Dynamic shared-memory size in bytes |

## Notes

- PTX ISA 9.3 — Chapter 10
- Special registers are read via `mov` and cannot be written to.

## Related

- [programming-model](./programming-model.md)
- [instructions-sync-communication](./instructions-sync-communication.md)
