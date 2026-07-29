# CUDA Tile Kernel Vector Add

Declare a `__tile_global__` kernel that operates on `cuda::tiles::tensor_span` / `partition_view` chunks instead of per-thread scalar indices, letting masked loads/stores handle the out-of-bounds tail automatically.

```cpp
#include "cuda_tile.h"
#include <cuda_runtime.h>
#include <cstddef>

// A regular thread-per-element SIMT kernel still initializes the inputs;
// only the addition itself is expressed as a tile operation below.
__global__ void initializeVectors(float *a, float *b, std::size_t n)
{
    auto idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        a[idx] = 0.5f * idx;
        b[idx] = 1.5f * idx;
    }
}

__tile_global__ void vectorAddTile(float *__restrict__ a, float *__restrict__ b, float *__restrict__ c, std::size_t n)
{
    namespace ct = cuda::tiles;
    using namespace ct::literals;

    auto idx = ct::bid().x;

    // A tensor_span views the flat array as a shaped tensor; a
    // partition_view then chunks that tensor into fixed-size tiles so each
    // tile block (identified by idx) owns exactly one chunk.
    ct::tensor_span a_span{a, ct::extents{n}};
    ct::tensor_span b_span{b, ct::extents{n}};
    ct::tensor_span c_span{c, ct::extents{n}};

    auto view_a = ct::partition_view{a_span, ct::shape{1024_ic}};
    auto view_b = ct::partition_view{b_span, ct::shape{1024_ic}};
    auto view_c = ct::partition_view{c_span, ct::shape{1024_ic}};

    // Masked load/store automatically clip the final partial chunk to the
    // valid range of n, so no explicit bounds-check branch is needed.
    auto tile_a = view_a.load_masked(idx);
    auto tile_b = view_b.load_masked(idx);
    auto tile_c = tile_a + tile_b;
    view_c.store_masked(tile_c, idx);
}

int main(void)
{
    const int n = 8000;
    const int chunkSize = 1024;
    const int numBlocks = 1 + ((n - 1) / chunkSize);

    float *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, n * sizeof(float));
    cudaMalloc(&d_b, n * sizeof(float));
    cudaMalloc(&d_c, n * sizeof(float));

    initializeVectors<<<numBlocks, chunkSize>>>(d_a, d_b, n);
    vectorAddTile<<<numBlocks>>>(d_a, d_b, d_c, n);
    cudaDeviceSynchronize();

    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    return 0;
}
```

## Notes

- `__tile_global__` marks a CUDA Tile kernel: instead of one scalar thread computing one element, the kernel body operates on whole tiles (`ct::tensor_span` / `ct::partition_view`) per block, launched with `<<<numBlocks>>>` (no block-dimension argument — the tile shape determines it).
- `ct::partition_view{span, ct::shape{1024_ic}}` splits a tensor into fixed 1024-element chunks; `idx = ct::bid().x` selects which chunk the current tile block processes.
- `load_masked` / `store_masked` clip accesses to the tensor's declared extent, so the last chunk (`n=8000` over 1024-element tiles leaves a 704-element remainder) is handled without a separate bounds-check code path.
- `ct::assume_aligned(ptr, 16_ic)` (omitted here for brevity) tells the compiler the pointer is 16-byte aligned, enabling wider vectorized tile loads — add it when the underlying allocation is guaranteed to be aligned.
- Derived from the official NVIDIA/cuda-samples sample "tileVectorAdd" (cpp/9_CUDA_Tile), tag `v13.3`.
