# Fine-Grained Synchronization

Per-tile producer/consumer handoff by inspecting the data itself: the buffer is initialized with a reserved bit pattern (a sentinel), the producer overwrites it with final values, and the consumer's bulk-asynchronous copy (TMA data validity reporting, compute capability 10.7) reports whether it still saw the sentinel and re-issues the copy until the data is valid.

## Signature / Usage

Sentinel, canonicalization, and initialization kernel (negative zero as a 32-bit float sentinel):

```cpp
// The sentinel is negative zero. Its bit pattern is 0x80000000 for a 32-bit
// float; valid producer output never contains this pattern (see canonicalize()).
constexpr uint32_t SENTINEL_BITS = 0x80000000u;
// The producer must never emit the sentinel. __fadd_rn() adds positive zero in
// round-to-nearest mode, which turns a negative-zero result into positive zero.
// No other value becomes the sentinel, and a NaN stays a NaN.
__device__ __forceinline__ float canonicalize(float v)
{
    return __fadd_rn(v, 0.0f);
}
// Fill a buffer with the sentinel, using 16-byte stores.
__global__ void init_sentinel_kernel(float4 *buf, int num_chunks)
{
    const float  s        = __uint_as_float(SENTINEL_BITS);
    const float4 sentinel = make_float4(s, s, s, s);
    for (int i = blockIdx.x * blockDim.x + threadIdx.x; i < num_chunks; i += gridDim.x * blockDim.x)
    {
        buf[i] = sentinel;
    }
}
```

Producer: triggers the dependent launch at its start (a separate kernel wrote the sentinel), canonicalizes results, and writes each aligned 16-byte chunk once with a single 128-bit store:

```cpp
// Relaxed, device-scope 128-bit store of one aligned 16-byte chunk.
__device__ __forceinline__ void store_chunk_relaxed_gpu(float4 *p, const float4 &v)
{
    __int128 bits;
    memcpy(&bits, &v, sizeof(bits));
    asm volatile("st.relaxed.gpu.global.b128 [%0], %1;" : : "l"(p), "q"(bits) : "memory");
}
__global__ void producer_kernel(const float4 *__restrict__ in, float4 *__restrict__ out)
{
    // Allow the consumer to launch as early as possible. The sentinel was
    // written by a separate kernel, so nothing has to precede the trigger here.
    cudaTriggerProgrammaticLaunchCompletion();
    const int chunk = blockIdx.x * blockDim.x + threadIdx.x;
    float4 v = in[chunk];
    v.x = canonicalize(2.0f * v.x);
    v.y = canonicalize(2.0f * v.y);
    v.z = canonicalize(2.0f * v.z);
    v.w = canonicalize(2.0f * v.w);
    // Each aligned 16-byte chunk is written once, with a single 128-bit store,
    // as the per-16-byte validity check requires.
    store_chunk_relaxed_gpu(&out[chunk], v);
}
```

Consumer: a copy with a validity report mechanism on a layout v1 barrier, re-issued while the report predicate is set; all threads wait on the conditional phase:

Adapted (not in the official docs): `ptx::fence_proxy_async(ptx::space_shared);` is added after `mbarrier_init` so the barrier initialization is visible to the async proxy before the bulk copy is issued.

```cpp
// Relaxed, device-scope bulk-asynchronous copy from global to shared memory
// that compares a sampled element of each aligned 16-byte chunk with the
// 32-bit negative-zero sentinel and reports whether any matched. The copy
// accesses global memory with 128-bit operations and completes on the
// layout v1 barrier `bar`.
__device__ __forceinline__ void copy_tile_report_validity(void *smem_dst, const void *gmem_src, uint32_t bytes,
                                                          uint64_t *bar)
{
    asm volatile("cp.async.bulk.relaxed.gpu.shared::cta.global.mbarrier::complete_tx::bytes"
                 ".mbarrier::report::validity::per_16bytes::80000000.b128 [%0], [%1], %2, [%3];"
                 :
                 : "r"(static_cast<uint32_t>(__cvta_generic_to_shared(smem_dst))), "l"(gmem_src), "r"(bytes),
                   "r"(static_cast<uint32_t>(__cvta_generic_to_shared(bar)))
                 : "memory");
}
__global__ void consumer_kernel(const float *produced, float *__restrict__ result)
{
    // Source and destination of a one-dimensional bulk copy must be 16-byte
    // aligned and the size a multiple of 16 bytes.
    __shared__ alignas(128) float tile[TILE_ELEMS];
    // A copy with a validity report mechanism must be tracked by a layout v1
    // barrier, which stores the payload report.
    __shared__ alignas(8) uint64_t bar;
    if (threadIdx.x == 0)
    {
        ptx::mbarrier_init(ptx::layout_v1, &bar, 1);   // one arrival per phase: the issuing thread
        ptx::fence_proxy_async(ptx::space_shared);
    }
    __syncthreads();
    const float *src = produced + blockIdx.x * TILE_ELEMS;
    if (threadIdx.x == 0)
    {
        uint32_t primary_parity = 0;
        for (;;)
        {
            // Arm the current primary phase with the expected byte count, then
            // issue the copy with validity reporting enabled.
            ptx::mbarrier_arrive_expect_tx(ptx::sem_release, ptx::scope_cta, ptx::space_shared, &bar, sizeof(tile));
            copy_tile_report_validity(tile, src, sizeof(tile), &bar);
            // Wait for the *primary* phase, which completes once all bytes have
            // landed. The report predicate tells whether a sampled element still
            // held the sentinel.
            bool sentinel_seen = false;
            while (!ptx::mbarrier_try_wait_parity(ptx::mbarrier_phase_primary, ptx::sem_acquire, ptx::scope_cta,
                                                  sentinel_seen, &bar, primary_parity))
            {
            }
            if (!sentinel_seen)
            {
                break;   // valid data: the conditional phase has advanced as well
            }
            // Not ready: some of the producer's stores to this tile were not yet
            // visible to the copy. The primary phase completed anyway, so the next
            // copy is tracked by the following primary phase.
            primary_parity ^= 1;
        }
    }
    // Every thread waits for the *conditional* phase. It advances only when a
    // copy completes with no sentinel reported, so the threads wait for parity 0
    // however many times the copy is re-issued.
    while (!ptx::mbarrier_try_wait_parity(ptx::mbarrier_phase_conditional, ptx::sem_acquire, ptx::scope_cta, &bar, 0))
    {
    }
    // The tile in shared memory is complete and valid. Consume it: each thread
    // writes four elements of the reversed tile.
    float *out = result + blockIdx.x * TILE_ELEMS;
    for (int i = 4 * threadIdx.x; i < 4 * threadIdx.x + 4; ++i)
    {
        out[i] = tile[TILE_ELEMS - 1 - i];
    }
    // A dependent grid must still call cudaGridDependencySynchronize(). Calling
    // it here, after the loaded data has been consumed, keeps the wait off the
    // critical path of the handoff.
    cudaGridDependencySynchronize();
}
```

Host side: preload the kernels, give the producer and consumer the same shared memory carveout, and launch the consumer with programmatic stream serialization:

```cpp
    // Load all three kernels before the sequence is launched. With lazy module
    // loading (the default), a kernel is otherwise loaded at its first launch,
    // which can serialize kernel execution and keep the producer and the
    // consumer from overlapping.
    cudaFuncAttributes func_attr;
    CUDA_CHECK(cudaFuncGetAttributes(&func_attr, init_sentinel_kernel));
    CUDA_CHECK(cudaFuncGetAttributes(&func_attr, producer_kernel));
    CUDA_CHECK(cudaFuncGetAttributes(&func_attr, consumer_kernel));
    // The L1 cache and the shared memory of an SM share one unified data cache,
    // and the driver configures the split per kernel. Kernels with different
    // shared memory configurations can serialize behind the reconfiguration.
    // The producer uses no shared memory and the consumer does, so both request
    // the same carveout.
    CUDA_CHECK(cudaFuncSetAttribute(producer_kernel, cudaFuncAttributePreferredSharedMemoryCarveout,
                                    cudaSharedmemCarveoutMaxShared));
    CUDA_CHECK(cudaFuncSetAttribute(consumer_kernel, cudaFuncAttributePreferredSharedMemoryCarveout,
                                    cudaSharedmemCarveoutMaxShared));
    // 1. Initialize the intermediate buffer with the sentinel. Stream order
    //    guarantees this completes, and is visible, before the producer starts.
    init_sentinel_kernel<<<NUM_TILES, THREADS, 0, stream>>>(d_mid, NUM_ELEMS / 4);
    // 2. Launch the producer normally.
    producer_kernel<<<NUM_TILES, THREADS, 0, stream>>>(d_in, d_mid);
    // 3. Launch the consumer with programmatic dependent launch so that it can
    //    start while the producer is still running.
    cudaLaunchAttribute attribute[1];
    attribute[0].id = cudaLaunchAttributeProgrammaticStreamSerialization;
    attribute[0].val.programmaticStreamSerializationAllowed = 1;
    cudaLaunchConfig_t config = {};
    config.gridDim  = NUM_TILES;
    config.blockDim = THREADS;
    config.stream   = stream;
    config.attrs    = attribute;
    config.numAttrs = 1;
    CUDA_CHECK(cudaLaunchKernelEx(&config, consumer_kernel, (const float *)d_mid, d_out));
```

Producer-side initialization alternative (sentinel written by the producer before it triggers the dependent launch):

```cpp
// Every thread of the block writes the sentinel to the block's output tile.
write_sentinel_to_output_tile();
__syncthreads();   // all sentinel stores of the block precede the fence and the trigger
if (threadIdx.x == 0) {
    cuda::atomic_thread_fence(cuda::memory_order_release, cuda::thread_scope_device);
    cudaTriggerProgrammaticLaunchCompletion();
}
// Compute and store the results; they replace the sentinel.
```

## Options / Props

### Report mechanisms for bulk-asynchronous copies (Table 15)

| PTX Qualifier | `cuda::ptx` Constant | Sentinel | Inspection |
| --- | --- | --- | --- |
| `.mbarrier::report::disabled` (default) | `mbarrier_report_disabled` (`cp_async_bulk_tensor` only) | none | none |
| `.mbarrier::report::validity::per_16bytes::80000000` | `mbarrier_report_valid_per_16bytes_80000000` | `0x80000000` (32-bit -0.0) | a sampled element per aligned 16 bytes |
| `.mbarrier::report::validity::per_16bytes::8000` | `mbarrier_report_valid_per_16bytes_8000` | `0x8000` (16-bit -0.0) | a sampled element per aligned 16 bytes |
| `.mbarrier::report::validity::per_16bytes::80` | `mbarrier_report_valid_per_16bytes_80` | `0x80` (8-bit -0.0) | a sampled element per aligned 16 bytes |
| `.mbarrier::report::validity::per_16bytes::8` | `mbarrier_report_valid_per_16bytes_8` | `0x8` (4-bit -0.0) | a sampled element per aligned 16 bytes |
| `.mbarrier::report::validity::per_element::ff` | `mbarrier_report_valid_per_element_ff` | `0xFF` (8-bit NaN) or `0xF` (4-bit all ones) | every element |

### Sentinel values by element type (Table 16)

| Element Type | Sentinel Value | Bit Pattern | Element Width |
| --- | --- | --- | --- |
| 32-bit floating point (`float`) | -0.0 | `0x80000000` | 32 bits |
| 16-bit floating point (`half`, `bfloat16`) | -0.0 | `0x8000` | 16 bits |
| 8-bit floating point (`e4m3`, `e5m2`) | -0.0 | `0x80` | 8 bits |
| 4-bit floating point (`e2m1`) | -0.0 | `0x8` | 4 bits |
| 8-bit scale factors without a sign bit (`ue8m0`, `ue5m3`) and other 8-bit data that never holds `0xFF` | NaN / all ones | `0xFF` | 8 bits |
| 4-bit metadata that never holds `0xF` (for example sparsity metadata) | All ones | `0xF` (buffers initialized with `0xFF` bytes) | 4 bits |
| Integer data | A value the producer never emits | `0x80000000`, `0x8000`, `0x80`, or `0xFF` | 32, 16, or 8 bits |

### Ordering mechanisms (Table 14)

| Mechanism | Consumer Waits For | Granularity |
| --- | --- | --- |
| Stream ordering | Completion and memory flush of the producer grid, then launch of the consumer grid | Grid |
| Programmatic dependent launch | Completion of the whole producer grid and visibility of its writes, observed by `cudaGridDependencySynchronize()` in the consumer | Grid |
| Flag protocol | A flag written by the producer after a release fence | Tile |
| Fine-grained synchronization | The data itself no longer holding the sentinel | Tile |

## Notes

- Requirements: the `.report_mechanism` qualifier is supported only on copies from global to shared memory; it requires PTX ISA 9.4 or later and the family-specific `sm_107f` or architecture-specific `sm_107a` target of compute capability 10.7 (or a later target of the same family). The `cuda::ptx` namespace of libcu++ exposes it through additional overloads of `cuda::ptx::cp_async_bulk` and `cuda::ptx::cp_async_bulk_tensor` that take a report mechanism argument.
- Barrier: a copy with a validity report mechanism must be tracked by a shared memory barrier initialized with the `layout::v1` format (`cuda::ptx::mbarrier_init(cuda::ptx::layout_v1, ...)`). `cuda::barrier` objects use layout v0 and cannot be used. Layout v1 accepts at most 511 expected arrivals per phase. Combining compute fabric transport operations with copies that use a validity report mechanism is undefined behavior.
- Phases: the primary phase advances when the pending arrival count and transaction count both reach zero; the conditional phase advances with it only if the payload report is zero. Waiting on the primary phase (`cuda::ptx::mbarrier_phase_primary` with a `bool&`) returns the report predicate; waiting on the conditional phase (`cuda::ptx::mbarrier_phase_conditional`) releases the compute threads once, when a copy completes with valid data. The predicate does not identify which copy reported; track copies whose outcomes must be told apart with separate barriers.
- If the copy reports the sentinel, the consumer must issue the copy again; the hardware does not retry automatically. The data is still written to shared memory; the report only says it must not be used yet.
- Producer rules: never write the sentinel (canonicalize results, for example `__fadd_rn(v, 0.0f)` to turn negative zero into positive zero; with the NaN sentinel never store a NaN), write each location once with its final value (split-K reductions with atomic adds do not work), and with a per-16-byte mechanism write each aligned 16-byte chunk as a unit with a single 128-bit store. For `sm_107f` / `sm_107a`, PTX `cvt` accepts a `.pzo` (positive zero only) qualifier for narrowing conversions.
- Consumer check: threads that wait on the conditional phase with acquire semantics can use the loaded tile without a further fence. Other data written by the producer still needs conventional synchronization such as `cudaGridDependencySynchronize()`. A one-dimensional copy with `.ignore_oob` cannot use a validity report mechanism.
- Buffer initialization: the sentinel must be visible to the consumer before it loads. Options are a separate earlier kernel/graph node, or the producer writing it before `cudaTriggerProgrammaticLaunchCompletion()` after a release fence. The buffer must be re-initialized before each round of data and not raced with readers; rotating two or three buffers keeps the clear off the critical path.
- Partial tiles and padding: every element a copy reads must eventually hold a non-sentinel value or the consumer can wait indefinitely; initialize with a non-sentinel value, write a canonical value such as positive zero, or restrict the copy to valid data (for example tensor-map bounds). When valid data ends inside an aligned 16-byte chunk, have the producer write the whole chunk as a unit.
- Concurrency: the producer must be able to make progress while consumers wait. Pair the technique with programmatic dependent launch (consumer launched with `cudaLaunchAttributeProgrammaticStreamSerialization`, or a programmatic edge from `cudaGraphKernelNodePortProgrammatic` in a graph); the consumer loads data before it calls `cudaGridDependencySynchronize()` and must still make that call. For separate streams use `cudaLaunchAttributeProgrammaticEvent` with an event created with `cudaEventDisableTiming`. Overlap is opportunistic; correctness does not depend on it.
- Guidelines: it can benefit chains of short kernels; long throughput-bound kernels can gain little. A leaked sentinel (unwritten padding, NaN results when NaN is the sentinel) hangs the consumer; a missing initialization gives wrong results instead of a hang because the copy reports nothing for stale data.
- Warp-specialized kernels: a retry warp can wait on each stage's primary phase (separate parity per stage) and re-issue the stage's copies, while compute warps wait only on the conditional phase.
- Source: https://docs.nvidia.com/cuda/cuda-programming-guide/04-special-topics/fine-grained-synchronization.html (CUDA Programming Guide v13.5, retrieved 2026-11-14). New in CPG 13.5.
- Adapted from the official docs: the consumer kernel adds a proxy fence (`ptx::fence_proxy_async(ptx::space_shared)`) after initializing the mbarrier, because `__syncthreads()` alone does not make a generic-proxy initialization visible to the async proxy.

## Related

- [Programmatic Dependent Launch and Synchronization](./programmatic-dependent-launch.md)
- [Asynchronous Data Copies](./async-copies.md)
- [Asynchronous Barriers](./async-barriers.md)
- [Compute Fabric Transport](./compute-fabric-transport.md)
- [Lazy Loading](./lazy-loading.md)
