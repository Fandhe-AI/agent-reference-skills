# Stream Overlap

Use multiple `hipStream_t` streams so that per-stream memory transfers and kernel launches on independent data can overlap instead of serializing on the default stream.

```cpp
#include <hip/hip_runtime.h>
#include <vector>

// Static-shared-memory transpose, launched on the first stream.
template <unsigned int Width>
__global__ void matrix_transpose_static_shared(float* out, const float* in)
{
    // Shared memory of constant size, indexed the same way as the input.
    __shared__ float shared_mem[Width * Width];
    const unsigned int x = blockDim.x * blockIdx.x + threadIdx.x;
    const unsigned int y = blockDim.y * blockIdx.y + threadIdx.y;
    shared_mem[y * Width + x] = in[x * Width + y];
    __syncthreads();
    out[y * Width + x] = shared_mem[y * Width + x];
}

// Dynamic-shared-memory variant of the same transpose, used on the second
// stream so both kernels can run concurrently on independent buffers.
__global__ void matrix_transpose_dynamic_shared(float* out, const float* in, const int width)
{
    extern __shared__ float shared_mem[];
    const unsigned int x = blockDim.x * blockIdx.x + threadIdx.x;
    const unsigned int y = blockDim.y * blockIdx.y + threadIdx.y;
    shared_mem[y * width + x] = in[x * width + y];
    __syncthreads();
    out[y * width + x] = shared_mem[y * width + x];
}

template <unsigned int Width, unsigned int Size>
void deploy_multiple_streams(const float* h_in, std::vector<float*>& h_out)
{
    constexpr unsigned int tpb = 4;
    // Fixed at 2: the function launches exactly one kernel variant per
    // stream (static-shared and dynamic-shared transpose), so it is not
    // parameterizable to an arbitrary stream count without adding more
    // kernel variants.
    constexpr int num_streams = 2;

    std::vector<hipStream_t> streams(num_streams);
    for (int i = 0; i < num_streams; i++) {
        hipStreamCreate(&streams[i]);
    }

    std::vector<float*> d_in(num_streams), d_out(num_streams);
    const std::size_t size_bytes = sizeof(float) * Size;
    hipMalloc(&d_in[0], size_bytes);
    hipMalloc(&d_in[1], size_bytes);
    hipMalloc(&d_out[0], size_bytes);
    hipMalloc(&d_out[1], size_bytes);

    for (int i = 0; i < num_streams; i++) {
        // hipMemcpyAsync on a non-default stream does not block the host,
        // and is implicitly ordered before the kernel launched on the same
        // stream — no extra sync is needed between the two.
        hipMemcpyAsync(d_in[i], h_in, size_bytes, hipMemcpyHostToDevice, streams[i]);
    }

    // Two independent kernels on two independent streams can execute
    // concurrently on the device instead of serializing.
    matrix_transpose_static_shared<Width>
        <<<dim3(Width / tpb, Width / tpb), dim3(tpb, tpb), 0, streams[0]>>>(d_out[0], d_in[0]);
    matrix_transpose_dynamic_shared<<<dim3(Width / tpb, Width / tpb), dim3(tpb, tpb),
                                       sizeof(float) * Width * Width, streams[1]>>>(
        d_out[1], d_in[1], Width);

    for (int i = 0; i < num_streams; i++) {
        hipMemcpyAsync(h_out[i], d_out[i], size_bytes, hipMemcpyDeviceToHost, streams[i]);
    }

    // Only a device-wide sync (or per-stream hipStreamSynchronize) is
    // needed once all work has been enqueued on both streams.
    hipDeviceSynchronize();

    for (int i = 0; i < num_streams; i++) {
        hipStreamDestroy(streams[i]);
        hipFree(d_in[i]);
        hipFree(d_out[i]);
    }
}
```

## Notes

- Operations enqueued on the same `hipStream_t` execute in program order; operations on different streams have no ordering guarantee and may run concurrently, which is what enables the overlap.
- `hipMemcpyAsync` only truly overlaps with other stream work when the host buffer is pinned (`hipHostMalloc`); on pageable host memory it behaves as if synchronous, per the official sample's comment.
- A single `hipDeviceSynchronize()` (or per-stream `hipStreamSynchronize`) after all launches is enough to wait for both streams — no cross-stream synchronization is needed unless one stream's data depends on the other's output.
- This is the HIP API (`hipStream_t`, `hipMemcpyAsync`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/streams" (MIT License), tag `therock-7.14`.
