# Known Issues

Official summary of known issues with DGX Spark systems (NVIDIA documentation).

## Signature / Usage

Estimating allocatable memory on a unified memory architecture (UMA) system, where `cudaMemGetInfo` may under-report because DRAM can be reclaimed via SWAP:

```c
#include <stdio.h>
int getAvailableMemory(long *availableMemoryKb, long *freeSwapKb) {
    FILE *meminfoFile = NULL;
    char lineBuffer[256];
    long hugeTlbTotalPages = -1;
    long hugeTlbFreePages = -1;
    long hugeTlbPageSize = -1;
    if (availableMemoryKb == NULL || freeSwapKb == NULL) {
        return 1;
    }
    meminfoFile = fopen("/proc/meminfo", "r");
    if (meminfoFile == NULL) {
        return 1;
    }
    *availableMemoryKb = -1;
    *freeSwapKb = -1;
    while (fgets(lineBuffer, sizeof(lineBuffer), meminfoFile)) {
        long value;
        if (sscanf(lineBuffer, "MemAvailable: %ld kB", &value) == 1) {
            *availableMemoryKb = value;
        } else if (sscanf(lineBuffer, "SwapFree: %ld kB", &value) == 1) {
            *freeSwapKb = value;
        } else if (sscanf(lineBuffer, "HugePages_Total: %ld", &value) == 1) {
            hugeTlbTotalPages = value;
        } else if (sscanf(lineBuffer, "HugePages_Free: %ld", &value) == 1) {
            hugeTlbFreePages = value;
        } else if (sscanf(lineBuffer, "Hugepagesize: %ld kB", &value) == 1) {
            hugeTlbPageSize = value;
        }
        if (*availableMemoryKb != -1 &&
            *freeSwapKb != -1 &&
            hugeTlbTotalPages != -1 &&
            hugeTlbFreePages != -1 &&
            hugeTlbPageSize != -1) {
            break;
        }
    }
    fclose(meminfoFile);
    if (hugeTlbTotalPages != 0 && hugeTlbTotalPages != -1) {
        *availableMemoryKb = hugeTlbFreePages * hugeTlbPageSize;
        // Hugetlbfs pages are not swappable.
        *freeSwapKb = 0;
    }
    return 0;
}
```

Debugging workaround: flush the buffer cache manually, then restart the application.

```bash
sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'
```

## Issues

### Use the supplied power adapter for optimal performance

Using a different adapter may reduce performance, prevent boot, or cause unexpected shutdowns.

### nvidia-smi reports "Memory-Usage: Not Supported"

On iGPU platforms, nvidia-smi displays "Memory-Usage: Not Supported" even though per-process GPU memory is listed. Expected, because iGPUs do not have dedicated framebuffer memory.

### CUDA Support on DGX Spark

The CUDA version on the device was verified to work with the system hardware at the time of the software update release. The latest features and performance improvements are available through NVIDIA NGC containers (for example, PyTorch, vLLM, and TensorRT-LLM).

### Guidance for reporting memory resources with unified memory architecture

The GPU shares system memory (DRAM) with the CPU and other compute engines. On UMA systems the CPU can free DRAM by swapping pages to SWAP, but the `cudaMemGetInfo` API does not account for memory that could be reclaimed from SWAP, so its reported size may be smaller than the actual allocatable memory. CUDA application developers should not rely solely on `cudaMemGetInfo` values.

### Attached HDMI display goes into deep sleep mode

After a long period of inactivity, the attached HDMI display might go into deep sleep and not wake on key press or mouse movement. Press a physical button on the monitor to wake it.

## Notes

- Source: https://docs.nvidia.com/dgx/dgx-spark/known-issues.html (no version in URL; retrieved 2026-10).
- This is the official NVIDIA list. Community-reported issues are in the community category's known-issues page and are unofficial.

## Related

- [Release Notes](./release-notes.md)
- [Community Known Issues](../community/known-issues.md)
