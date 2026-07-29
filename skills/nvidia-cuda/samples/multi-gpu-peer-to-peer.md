# Multi-GPU Peer-to-Peer Memory Access

Check peer access capability with `cudaDeviceCanAccessPeer` before enabling it with `cudaDeviceEnablePeerAccess`, then copy directly between two GPUs' device memory without staging through the host.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>

int main(void)
{
    int gpuCount = 0;
    cudaGetDeviceCount(&gpuCount);
    if (gpuCount < 2) {
        printf("Two or more GPUs are required for peer-to-peer access.\n");
        return 0;
    }

    int gpuid0 = 0, gpuid1 = 1;

    // Never enable peer access unconditionally — cudaDeviceEnablePeerAccess
    // fails if the pair is not actually peer-capable (e.g. not on the same
    // PCIe/NVLink domain), so the capability must be confirmed first.
    int canAccessPeer = 0;
    cudaDeviceCanAccessPeer(&canAccessPeer, gpuid0, gpuid1);
    if (!canAccessPeer) {
        printf("GPU%d cannot directly access GPU%d; falling back to a host-staged copy.\n", gpuid0, gpuid1);
        return 0;
    }

    cudaSetDevice(gpuid0);
    cudaDeviceEnablePeerAccess(gpuid1, 0);
    cudaSetDevice(gpuid1);
    cudaDeviceEnablePeerAccess(gpuid0, 0);

    const size_t bufSize = 1024 * 1024 * sizeof(float);
    cudaSetDevice(gpuid0);
    float *g0;
    cudaMalloc(&g0, bufSize);
    cudaSetDevice(gpuid1);
    float *g1;
    cudaMalloc(&g1, bufSize);

    // With peer access enabled, cudaMemcpyDefault resolves the direction
    // from the pointers themselves and routes the copy directly between
    // the two devices' memory, bypassing host memory entirely.
    cudaMemcpy(g1, g0, bufSize, cudaMemcpyDefault);

    cudaSetDevice(gpuid0);
    cudaDeviceDisablePeerAccess(gpuid1);
    cudaSetDevice(gpuid1);
    cudaDeviceDisablePeerAccess(gpuid0);

    cudaFree(g1);
    cudaSetDevice(gpuid0);
    cudaFree(g0);
    return 0;
}
```

## Notes

- `cudaDeviceCanAccessPeer` must be checked before calling `cudaDeviceEnablePeerAccess` — enabling access on a non-peer-capable pair returns `cudaErrorInvalidDevice` rather than silently falling back to a slower path.
- Peer access is directional and must be enabled from both sides for a bidirectional copy: `cudaSetDevice(gpuid0); cudaDeviceEnablePeerAccess(gpuid1, 0)` only allows GPU0 to access GPU1's memory, not the reverse.
- Once peer access is enabled, `cudaMemcpy(..., cudaMemcpyDefault)` (or `cudaMemcpyPeerAsync` for explicit stream ordering) transfers directly device-to-device over PCIe/NVLink, without allocating or copying through a host staging buffer.
- Always pair `cudaDeviceEnablePeerAccess` with `cudaDeviceDisablePeerAccess` during cleanup, and call it on the device that originally enabled access (the current device at the time of the call, via `cudaSetDevice`).
- Derived from the official NVIDIA/cuda-samples sample "simpleP2P" (cpp/0_Introduction), tag `v13.3`.
