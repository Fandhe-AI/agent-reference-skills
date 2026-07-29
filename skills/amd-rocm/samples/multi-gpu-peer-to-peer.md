# Multi-GPU Peer-to-Peer

Check peer access support with `hipDeviceCanAccessPeer` before enabling it with `hipDeviceEnablePeerAccess`, then copy device memory directly between two GPUs without staging through the host.

```cpp
#include <hip/hip_runtime.h>
#include <cstddef>
#include <cstdlib>
#include <iostream>

#define HIP_CHECK(expr)                                                    \
    {                                                                      \
        const hipError_t status = (expr);                                 \
        if (status != hipSuccess) {                                       \
            std::cerr << "HIP error " << status << ": "                   \
                      << hipGetErrorString(status) << " at " << __FILE__  \
                      << ":" << __LINE__ << std::endl;                    \
            std::exit(EXIT_FAILURE);                                     \
        }                                                                 \
    }

__global__ void simpleKernel(double* data, std::size_t elems)
{
    std::size_t idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < elems) data[idx] = idx * 2.0;
}

int main()
{
    int deviceCount;
    HIP_CHECK(hipGetDeviceCount(&deviceCount));
    if (deviceCount < 2) {
        std::cout << "This example requires at least two HIP devices.\n";
        return EXIT_SUCCESS;
    }

    constexpr std::size_t elems = 1024;
    constexpr std::size_t size  = elems * sizeof(double);
    int deviceId0 = 0, deviceId1 = 1;

    // Peer access is not guaranteed between arbitrary device pairs; it
    // must be queried explicitly before hipDeviceEnablePeerAccess is called.
    int canAccessPeer01 = 0, canAccessPeer10 = 0;
    HIP_CHECK(hipDeviceCanAccessPeer(&canAccessPeer01, deviceId0, deviceId1));
    HIP_CHECK(hipDeviceCanAccessPeer(&canAccessPeer10, deviceId1, deviceId0));
    if (!canAccessPeer01 || !canAccessPeer10) {
        hipDeviceProp_t props0{}, props1{};
        HIP_CHECK(hipGetDeviceProperties(&props0, deviceId0));
        HIP_CHECK(hipGetDeviceProperties(&props1, deviceId1));
        std::cout << "Peer-to-peer access is not supported between device " << deviceId0
                  << " (arch: " << props0.gcnArchName << ") and device " << deviceId1
                  << " (arch: " << props1.gcnArchName << "). Skipping example.\n";
        return EXIT_SUCCESS;
    }

    // Enable access to each other's memory only after confirming support.
    HIP_CHECK(hipSetDevice(deviceId0));
    HIP_CHECK(hipDeviceEnablePeerAccess(deviceId1, 0));
    HIP_CHECK(hipSetDevice(deviceId1));
    HIP_CHECK(hipDeviceEnablePeerAccess(deviceId0, 0));

    double* deviceData0;
    double* deviceData1;
    HIP_CHECK(hipSetDevice(deviceId0));
    HIP_CHECK(hipMalloc(&deviceData0, size));
    simpleKernel<<<8, 128>>>(deviceData0, elems);
    HIP_CHECK(hipDeviceSynchronize());

    HIP_CHECK(hipSetDevice(deviceId1));
    HIP_CHECK(hipMalloc(&deviceData1, size));
    simpleKernel<<<8, 128>>>(deviceData1, elems);
    HIP_CHECK(hipDeviceSynchronize());

    // A device-to-device copy across GPUs, made possible by the peer
    // access enabled above — no host staging buffer is involved.
    HIP_CHECK(hipSetDevice(deviceId0));
    HIP_CHECK(hipMemcpy(deviceData0, deviceData1, size, hipMemcpyDeviceToDevice));

    HIP_CHECK(hipFree(deviceData0));
    HIP_CHECK(hipSetDevice(deviceId1));
    HIP_CHECK(hipFree(deviceData1));
    return 0;
}
```

## Notes

- `hipDeviceCanAccessPeer` must be checked (in both directions) before calling `hipDeviceEnablePeerAccess` — unconditionally enabling peer access without this check can fail or be unsupported on architectures/topologies without a P2P link.
- `hipMemcpy(..., hipMemcpyDeviceToDevice)` between two peer-enabled devices copies directly over the interconnect, avoiding the host round-trip that a plain device-to-device copy without peer access would otherwise require via staging.
- The `hipDeviceEnablePeerAccess` second argument (flags) must be `0` in current HIP; passing anything else is reserved and considered invalid.
- This is the HIP API (`hipDeviceCanAccessPeer`, `hipDeviceEnablePeerAccess`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill's `multi-gpu-peer-to-peer.md`.
- Derived from the official ROCm/rocm-examples samples "HIP-Doc/.../Multi-Device-Management/p2p_memory_access" and "HIP-Basic/multi_gpu_data_transfer" (MIT License), tag `therock-7.14`.
