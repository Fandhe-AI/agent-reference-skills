# Pipelines

`cuda::pipeline` (libcu++) stages asynchronous work into producer/consumer phases, coordinating multi-buffer producer-consumer patterns commonly paired with `cuda::memcpy_async` to overlap data movement with computation.

## Signature / Usage

```cpp
constexpr auto scope = cuda::thread_scope_thread;
cuda::pipeline<scope> pipeline = cuda::make_pipeline();

pipeline.producer_acquire();
cuda::memcpy_async(buffer, in, sizeof(float), pipeline);
pipeline.producer_commit();

pipeline.consumer_wait();
pipeline.consumer_release();
```

## Options / Props

| Name | Description |
| --- | --- |
| `cuda::pipeline<scope>` | Pipeline object scoped to `cuda::thread_scope_thread` or `cuda::thread_scope_block`. |
| `cuda::pipeline_shared_state<scope, count>` | Shared-memory state backing a block-scoped pipeline, sized for `count` in-flight stages. |
| `cuda::make_pipeline()` | Constructs a thread-scoped pipeline (or, with a shared state argument, a block-scoped one). |
| `pipeline.producer_acquire()` / `producer_commit()` | Reserve a pipeline stage for producing, then commit the asynchronous operations issued into it. |
| `pipeline.consumer_wait()` / `consumer_release()` | Wait for a committed stage to complete, then release it for reuse by the producer. |
| `cuda::pipeline_consumer_wait_prior<N>()` | Waits until at most `N` uncommitted/incomplete stages remain, allowing partial overlap instead of waiting for the full stage. |
| `cuda::pipeline::quit()` | Signals early exit from the pipeline (e.g. a thread leaving before all stages complete). |
| `cuda::pipeline_role::producer` / `consumer` | Roles a thread can hold with a block-scoped pipeline where producer and consumer threads differ. |

## Notes

- Thread-scoped pipelines (`cuda::thread_scope_thread`) are for a single thread managing its own multi-buffer overlap; block-scoped pipelines require a `cuda::pipeline_shared_state` and coordinate across threads.
- Pair `producer_acquire`/`producer_commit` around each `cuda::memcpy_async` call that targets a stage; `consumer_wait`/`consumer_release` on the other end signals it is safe to consume the data and reuse the buffer.
- Warp entanglement and early-exit constraints mirror those of `cuda::barrier` — see the official page before using pipelines with warp-divergent control flow.

## Related

- [Asynchronous Barriers](./async-barriers.md)
- [Asynchronous Data Copies](./async-copies.md)
- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
