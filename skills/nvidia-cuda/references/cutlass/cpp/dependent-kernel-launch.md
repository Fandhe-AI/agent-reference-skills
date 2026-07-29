# Dependent Kernel Launches (PDL)

## Signature / Usage

```cpp
gemm.run(
  /* stream = */ stream,
  /* cuda_adapter = */ nullptr,
  /* launch_with_pdl = */ true
);
```

```cmake
# cmake flags enabling PDL-related instructions
-DCUTLASS_ENABLE_GDC_FOR_SM90=1
-DCUTLASS_ENABLE_GDC_FOR_SM100
```

## Options / Props

| Item | Description |
| --- | --- |
| Feature | Programmatic Dependent Launch (PDL), Hopper/Blackwell |
| Effect | Two kernels in the same stream programmatically and safely overlap portions of execution, even with a global-memory conflict, via an explicit finish-signal / wait-on-flush handshake |
| `CUTLASS_ENABLE_GDC_FOR_SM90` | Enables PDL instructions for SM90 builds |
| `CUTLASS_ENABLE_GDC_FOR_SM100` | Enables PDL instructions for SM100 (Blackwell) builds |
| `launch_with_pdl` | GEMM kernel launch parameter; `true` activates dependent launch |

## Notes

- The primary kernel signals it is about to finish; the next kernel programmatically waits on that signal (rather than the full grid-exit synchronization CUDA normally requires) before proceeding, then still waits for the memory flush to complete before consuming the primary kernel's output.
- Example use case: prefetching weights ahead of a memory-bandwidth-bound GEMM when one input matrix does not depend on the prior kernel's output — only the other input's memory-flush wait is required.

## Related

- [Pipeline](./pipeline.md)
- [Blackwell Cluster Launch Control](./blackwell-cluster-launch-control.md)
