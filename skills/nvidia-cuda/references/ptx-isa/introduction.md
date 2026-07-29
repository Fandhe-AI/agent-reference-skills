# Introduction

PTX (Parallel Thread Execution) defines a virtual machine and instruction set architecture (ISA) for general-purpose parallel thread execution. PTX programs are translated at install time to the target GPU's native instruction set by the driver (ptxas / JIT compiler).

## Signature / Usage

```ptx
// example of directive placement within a module (per PTX ISA .address_size docs)
   .version 2.3
   .target sm_20
   .address_size 64
...
.entry foo () {
...
}
```

## Options / Props

| Goal | Description |
| --- | --- |
| Stable ISA | Spans multiple GPU generations, providing forward compatibility for compiled applications |
| Native performance | Compiled PTX programs achieve performance comparable to native GPU code |
| Machine-independent target | Provides a compiler target for C/C++ and other high-level languages (CUDA, etc.) |
| Scalable programming model | Spans GPU sizes from a single unit to many parallel units (thread → CTA → cluster → grid) |

## Notes

- Distinct from `programming-model/introduction.md`: this page introduces the PTX virtual ISA specifically; the other page introduces CUDA/GPU computing at the platform level.
- PTX ISA 9.3 — Chapter 1
- The module-header example above is the doc's own illustrative placement example (from the `.address_size` directive page); the `.version`/`.target` values shown (2.3 / sm_20) are the example's, not necessarily the latest supported values — see directives for the full option lists.
- PTX is an intermediate representation between high-level compilers (e.g. NVCC) and hardware-specific machine instructions (SASS); the `ptxas` component performs the final translation.
- Every PTX module declares its ISA version (`.version`), target architecture (`.target`), and addressing mode (`.address_size`) at the top, as detailed in the `directives` and `syntax` pages.

## Related

- [programming-model](./programming-model.md)
- [syntax](./syntax.md)
