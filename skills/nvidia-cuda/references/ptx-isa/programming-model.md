# Programming Model

PTX exposes a data-parallel SIMT (Single-Instruction, Multiple-Thread) programming model. Threads are organized hierarchically into cooperative thread arrays (CTA), optional clusters (sm_90+), and grids, each with special registers identifying a thread's position.

## Signature / Usage

```ptx
mov.u32      %r1,%tid.x;  // move tid.x to %rh
mov.u32  %r0,%ctaid.x;
```

## Options / Props

| Hierarchy level | Special register | Description |
| --- | --- | --- |
| Thread | `%tid` | Thread identifier within its CTA (x, y, z) |
| CTA (thread block) | `%ctaid`, `%ntid` | CTA identifier within grid, and CTA dimensions |
| Cluster (sm_90+) | `%clusterid`, `%nclusterid` | Cluster identifier and dimensions within grid |
| Grid | `%nctaid` | Number of CTAs per grid dimension |

## Notes

- Distinct from `programming-model/programming-model.md`: this page covers the PTX virtual-ISA thread hierarchy (CTA, cluster, grid, special registers) exposed to PTX assembly; the other page covers the higher-level CUDA C/C++ host/device programming model (host, device, kernel, thread block, grid, SM).
- PTX ISA 9.3 — Chapter 2
- A CTA is a cooperative thread array whose threads can communicate via shared memory and synchronize via `bar.sync`.
- Clusters (introduced for sm_90 / Hopper) group multiple CTAs, enabling cross-CTA synchronization and shared-memory access within the cluster.
- This scalable model lets the same PTX module run unmodified across GPUs with different numbers of physical multiprocessors.

## Related

- [machine-model](./machine-model.md)
- [special-registers](./special-registers.md)
