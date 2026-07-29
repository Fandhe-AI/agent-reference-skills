# Device Query

Read GPU capabilities at runtime with `hipGetDeviceProperties`, including the architecture identifier `gcnArchName` and the portable `warpSize`.

```cpp
#include <hip/hip_runtime.h>
#include <iomanip>
#include <iostream>

void print_device_properties(int device_id)
{
    hipDeviceProp_t props{};
    hipGetDeviceProperties(&props, device_id);

    // A small subset of the full hipDeviceProp_t; the full struct exposes
    // many more fields (memory bus width, cache sizes, compute mode, ...).
    std::cout << "Name: " << props.name << '\n';
    std::cout << "totalGlobalMem (GiB): " << props.totalGlobalMem / (1024.0 * 1024.0 * 1024.0) << '\n';
    std::cout << "sharedMemPerBlock (KiB): " << props.sharedMemPerBlock / 1024.0 << '\n';
    std::cout << "regsPerBlock: " << props.regsPerBlock << '\n';
    // warpSize differs by architecture generation; portable code must
    // read it here rather than assuming a fixed value.
    std::cout << "warpSize: " << props.warpSize << '\n';
    std::cout << "maxThreadsPerBlock: " << props.maxThreadsPerBlock << '\n';
    // gcnArchName identifies the GPU's compute architecture (e.g. a
    // CDNA/RDNA target name), used to select architecture-specific code
    // paths or compiler flags at runtime.
    std::cout << "gcnArchName: " << props.gcnArchName << '\n';
}

int main()
{
    int device_count = 0;
    hipGetDeviceCount(&device_count);
    for (int i = 0; i < device_count; ++i) {
        print_device_properties(i);
    }
    return 0;
}
```

## Notes

- `hipGetDeviceProperties` fills a `hipDeviceProp_t` describing the device identified by its integer ID; call `hipGetDeviceCount` first to know how many devices are present.
- `warpSize` is not a compile-time constant across AMD GPU generations (64 on CDNA, 32 on RDNA) and must always be read from the queried properties, not hard-coded.
- `gcnArchName` (e.g. used by `hiprtcCompileProgram`'s `--gpu-architecture=` option) is the AMD-specific architecture identifier; CUDA's equivalent concept is the compute capability major/minor pair, not a string name.
- This is the HIP API (`hipDeviceProp_t`, `gcnArchName`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent (`cudaDeviceProp`, compute capability) has no dedicated samples page in the nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/device_query" (MIT License), tag `therock-7.14`.
