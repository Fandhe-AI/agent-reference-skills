# Async Copy Pipeline (cuda::pipeline)

Use `cuda::memcpy_async` with a `cuda::pipeline` to move data from global to shared memory without routing it through registers, overlapping the copy with the compute of the previous stage.

```cpp
#include <cuda/pipeline>
#include <cuda_runtime.h>

#define BLOCK_SIZE 16

__global__ void matMulAsyncCopy(float *C, const float *A, const float *B, int wA, int wB)
{
    __shared__ float As[BLOCK_SIZE][BLOCK_SIZE];
    __shared__ float Bs[BLOCK_SIZE][BLOCK_SIZE];

    int aBegin = wA * BLOCK_SIZE * blockIdx.y;
    int aEnd   = aBegin + wA - 1;
    int aStep  = BLOCK_SIZE;
    int bBegin = BLOCK_SIZE * blockIdx.x;
    int bStep  = BLOCK_SIZE * wB;

    float Csub = 0.0f;

    cuda::pipeline<cuda::thread_scope_thread> pipe = cuda::make_pipeline();
    const auto shape = cuda::aligned_size_t<alignof(float)>(sizeof(float));

    for (int a = aBegin, b = bBegin; a <= aEnd; a += aStep, b += bStep) {
        // producer_acquire/commit brackets the batch of async copies that
        // make up this pipeline stage; the copy engine, not this thread,
        // performs the actual global-to-shared move.
        pipe.producer_acquire();
        cuda::memcpy_async(&As[threadIdx.y][threadIdx.x], &A[a + wA * threadIdx.y + threadIdx.x], shape, pipe);
        cuda::memcpy_async(&Bs[threadIdx.y][threadIdx.x], &B[b + wB * threadIdx.y + threadIdx.x], shape, pipe);
        pipe.producer_commit();

        // consumer_wait blocks only until this stage's copies land in
        // shared memory — it does not wait for unrelated in-flight work.
        pipe.consumer_wait();
        __syncthreads();

        for (int k = 0; k < BLOCK_SIZE; ++k) {
            Csub += As[threadIdx.y][k] * Bs[k][threadIdx.x];
        }
        __syncthreads();
        pipe.consumer_release();
    }

    int c = wB * BLOCK_SIZE * blockIdx.y + BLOCK_SIZE * blockIdx.x;
    C[c + wB * threadIdx.y + threadIdx.x] = Csub;
}
```

## Notes

- `cuda::memcpy_async` issues a copy that the async-copy hardware (or a software fallback on older architectures) executes without routing bytes through a thread's registers, freeing the issuing thread to continue other work while the copy is in flight.
- `pipe.producer_acquire()` / `producer_commit()` bracket the batch of copies belonging to one pipeline stage; `consumer_wait()` blocks the calling thread only until that specific stage's copies complete, not until all outstanding pipeline work finishes.
- `pipe.consumer_release()` must be called once the stage's consumer work (`__syncthreads()` + accumulation, above) is done, before starting the next stage's `producer_acquire()` — it signals the buffer slot is free to be reused for the next stage's data.
- A multi-stage `cuda::pipeline` (more than one buffer slot) overlaps the async copy of stage N+1 with the compute of stage N; this single-stage form only overlaps the copy with the copy engine's own latency, and is the simplest correct starting point before adding pipelining depth.
- Requires compute capability 8.0+ (Ampere) for hardware-accelerated `cuda::memcpy_async`; on earlier architectures the same code compiles but falls back to a synchronous copy.
- Derived from the official NVIDIA/cuda-samples sample "globalToShmemAsyncCopy" (`MatrixMulAsyncCopySingleStage`, cpp/3_CUDA_Features), tag `v13.3`.
