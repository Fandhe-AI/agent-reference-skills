# CuTe DSL API: pipeline

## Signature / Usage

```python
import cutlass.pipeline as pipeline

pipe = pipeline.PipelineTmaAsync(...)
producer = pipe.producer
consumer = pipe.consumer

state = pipeline.PipelineState(index=0, phase=0)
producer.acquire(state); ...; producer.commit(state); state = producer.advance(state)
consumer.wait(state);   ...; consumer.release(state); state = consumer.advance(state)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Enums | `Agent` (Thread, Warp, ThreadBlock, ThreadBlockCluster), `PipelineOp` (AsyncThread, TCGen05Mma, TmaLoad, ClcLoad, TmaStore, Composite, AsyncLoad), `MbarrierLayout` (V0), `PipelineUserType` (Producer, Consumer, ProducerConsumer) |
| Core sync classes | `SyncObject` (abstract base for hardware sync primitives), `MbarrierArray` (array of SMEM barriers with arrival/wait), `NamedBarrier` (hardware named barriers, IDs 0-15), `TmaStoreFence` (multi-stage epilogue buffer sync) |
| State management | `CooperativeGroup` (size restrictions for an `Agent`), `PipelineState` (index + phase bit for circular-buffer position), `PipelineOrder` (ordered execution across multiple groups) |
| Pipeline implementations | `PipelineAsync` (AsyncThread producer + consumer), `PipelineCpAsync` (CpAsync producer + AsyncThread consumer), `PipelineTmaAsync` (TMA producer + AsyncThread consumer), `PipelineTmaUmma` (TMA producer + UMMA consumer, Blackwell mainloops), `PipelineAsyncUmma`, `PipelineUmmaAsync`, `PipelineClcFetchAsync` (Cluster Launch Control dynamic scheduling), `PipelineTmaMultiConsumersAsync` (TMA producer + UMMA+Async consumers), `PipelineTmaStore` (epilogue TMA store sync) |
| Participants | `PipelineProducer` (acquire/commit/advance), `PipelineConsumer` (wait/release/advance) |

## Notes

- This is the Python `cutlass.pipeline` module — conceptually parallel to CUTLASS C++'s `cutlass::Pipeline*` classes (see [Pipeline (C++)](../cpp/pipeline.md)), but a distinct implementation for the CuTe DSL; it is also unrelated to the CUDA C++ standard library's `cuda::pipeline` covered under this skill's `advanced` category.

## Related

- [Pipeline (C++)](../cpp/pipeline.md)
- [MMA: tcgen05 Programming (Blackwell)](./mma-tcgen05-programming.md)
