# Pipeline (Synchronization Primitives)

## Signature / Usage

```cpp
// 4-stage async pipeline, 2 producer threads + 1 consumer thread (conceptual)
using Pipeline = cutlass::PipelineAsync<4>;

Pipeline::PipelineState producer_state;
Pipeline::PipelineState consumer_state;

// producer side
pipeline.producer_acquire(producer_state); // blocking: acquire a stage
/* ... write data into the stage ... */
pipeline.producer_commit(producer_state);  // non-blocking: signal consumers

// consumer side
pipeline.consumer_wait(consumer_state);    // blocking: wait for producer commit
/* ... consume data ... */
pipeline.consumer_release(consumer_state); // non-blocking: signal producers
```

## Options / Props

| Method | Blocking | Role |
| --- | --- | --- |
| Producer acquire | Yes | Acquires a pipeline stage before producer instructions run |
| Producer commit | No | Signals consumers that stage production completed |
| Consumer wait | Yes | Waits for producer commitment before consumption |
| Consumer release | No | Signals producers that consumption finished |

## Notes

- This is CUTLASS's own `cutlass::Pipeline*` family of synchronization primitives (e.g. `PipelineAsync`), used to coordinate producer/consumer warp groups inside a GEMM kernel without manual barrier management — it is a distinct API from the CUDA C++ standard library's `cuda::pipeline` (covered in this skill's `advanced` category under async-copy/pipelines), even though both express a producer/consumer staging pattern.
- Starting with Hopper, CUDA thread block clusters add a hierarchy level above thread blocks; CUTLASS builds cluster-level synchronization and barrier-instruction abstractions on top of that for efficient cluster-wide coordination.
- Software pipelining (this primitive) is critical to hide global-memory load latency in high-performance GEMM kernels.

## Related

- [Efficient GEMM](./efficient-gemm.md)
- [Dependent Kernel Launch](./dependent-kernel-launch.md)
