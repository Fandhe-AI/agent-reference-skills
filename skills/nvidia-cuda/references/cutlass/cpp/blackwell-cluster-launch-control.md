# Blackwell Cluster Launch Control

## Signature / Usage

```cpp
// Pipeline configuration for the CLC (cluster launch control) scheduler warp
constexpr int transaction_bytes = 16;   // CLC response size
// consumer_arv_count = total consumer warp threads
// producer_arv_count = 1 (scheduler warp only)
// producer_blockid   = 0 (first CTA)
```

```text
// Warp specialization roles in a Blackwell warp-specialized persistent kernel
warp 0        : MMA
warp 1        : Scheduler (issues clusterlaunchcontrol.try_cancel)
warp 2        : Mainloop Load
warp 3        : Epilogue Load
warps 4-7     : Epilogue
```

## Options / Props

| Concept | Description |
| --- | --- |
| Static scheduler | Persistent clusters ("Workers") stay resident on the GPU for the whole kernel and process multiple output tiles in series, hiding prologue/epilogue overhead |
| Dynamic scheduler (CLC) | Uses `clusterlaunchcontrol.try_cancel`, which returns a success signal with a `ClcID` (new Worker granted) or a decline signal, letting the kernel adapt to real-time SM availability instead of a fixed persistent-cluster count |
| `transaction_bytes` | 16B — expected CLC response size |
| `producer_arv_count` | 1 — only the scheduler warp produces CLC results |
| `producer_blockid` | 0 — the first CTA in the cluster issues the CLC request |

## Notes

- A GEMM workload has prologue/mainloop/epilogue phases; when output tiles greatly outnumber SMs, a naive non-persistent kernel fully exposes prologue+epilogue cost per tile — persistent (static) scheduling amortizes this, and CLC (dynamic) scheduling additionally adapts to SMs being shared with other concurrent kernels.
- This is CUTLASS's kernel-side use of cluster launch control; it is a different layer from the CUDA-level `clusterlaunchcontrol_try_cancel` primitive covered in this skill's `advanced` (cluster launch control) reference — this page documents how a CUTLASS GEMM kernel's tile scheduler consumes that primitive, not the primitive's raw semantics.

## Related

- [Blackwell](./blackwell.md)
- [Blackwell SM100 GEMM](./blackwell-sm100-gemm.md)
- [Dependent Kernel Launch](./dependent-kernel-launch.md)
