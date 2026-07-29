# PTX Machine Model

The target GPU is modeled as a scalable array of multithreaded Streaming Multiprocessors (SMs). Each SM contains scalar processor cores, a multithreaded instruction unit, and on-chip shared memory, and executes threads in groups of 32 called warps under a SIMT execution model.

## Signature / Usage

```ptx
// example of directive placement within a module (per PTX ISA .address_size docs)
   .version 2.3
   .target sm_20
   .address_size 64
```

## Options / Props

| Memory space | Scope | Description |
| --- | --- | --- |
| Local | per-thread | Private memory for a single thread |
| Shared | per-CTA (cluster-visible) | Visible to all threads of the block, and to all active blocks in the cluster |
| Global | all threads | Accessible by all threads across the grid, persists across kernel launches |
| Constant / param / texture / surface | read-only | Specialized read-only spaces; texture/surface add addressing and filtering |

## Notes

- PTX ISA 9.3 — Chapter 3
- The module-header example above is the doc's illustrative directive-placement example (`.version`/`.target` values are the example's own, see directives for current option lists).
- A warp executes one common instruction at a time; full efficiency is realized when all threads of a warp agree on their execution path.
- If threads of a warp diverge via a data-dependent conditional branch, the warp serially executes each branch path taken, disabling threads not on that path; divergence occurs only within a warp, and different warps execute independently.
- Clusters (sm_90+) let CTAs within the same cluster access each other's shared memory (distributed shared memory).

## Related

- [programming-model](./programming-model.md)
- [state-spaces-types-variables](./state-spaces-types-variables.md)
