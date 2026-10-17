# Device Properties and Topology on CDNA

How to read HIP device properties on chiplet-based CDNA GPUs such as MI300 (CDNA3), and how XCC / XCD / L2 / HBM-NUMA topology relates to what HIP exposes.

## Signature / Usage

```cpp
hipDeviceProp_t props;
hipGetDeviceProperties(&props, 0);

printf("Device: %s\n", props.name);
printf("Global Memory: %zu\n", props.totalGlobalMem);
printf("Compute Units: %d\n", props.multiProcessorCount);
printf("L2 Cache Size: %d\n", props.l2CacheSize);
```

## Options / Props

| Term | Meaning |
| --- | --- |
| XCC (Accelerated Compute Core) | Fundamental execution unit: CUs, Command Processor (CP), Run List Controller (RLC), cache subsystem (TCC) |
| XCD | Physical compute die containing one or more XCCs |
| XCP | Logical compute partition of one or more XCCs |
| AID | Interconnect die linking XCDs |

Compute partitioning modes (configured at system initialization):

| Mode | Behavior |
| --- | --- |
| SPX (Single Partition) | All XCCs form a single GPU |
| TPX (Tile Partition) | XCDs grouped into multiple logical GPUs |
| CPX (Core Partition) | Each XCC exposed as an independent GPU (MI300X: 8 XCCs gives 8 HIP devices) |

Memory (NUMA-like HBM domains): NPS1 is fully interleaved (maximum bandwidth); NPS4 / NPS8 are localized (better latency locality).

Runtime identifiers: `Virtual_XCC_ID` (identifies an XCC instance), `NUM_XCC_IN_XCP` (XCCs per partition).

## Notes

- The upstream snippet prints `l2CacheSize` with `%zu`, but the field is declared `int` in `hip_runtime_api.h`; `%d` is used here.
- Available compute/memory partition modes vary by GPU and environment; the ROCm 10.1.0 partitioning support matrix (https://rocm.docs.amd.com/en/latest/compatibility/compatibility-matrix.html, source `docs/data/partitioning-support.yaml` @ rocm-docs 7a49af89) lists e.g. MI300X bare-metal SPX/NPS1, DPX/NPS2, CPX/NPS4 and MI350X/MI355X bare-metal SPX, DPX, QPX, CPX, and does not list TPX; check the matrix for the target GPU.
- HIP exposes only aggregate device-level properties. XCC / XCD / NUMA detail is not directly exposed; use HSA APIs or profiling tools.
- Each compute partition (XCP) appears as an independent HIP device.
- Approximate partition count via HSA:

```cpp
#include <hsa/hsa.h>

int gpu_agent_count = 0;
hsa_status_t callback(hsa_agent_t agent, void* data) {
    hsa_device_type_t type;
    hsa_agent_get_info(agent, HSA_AGENT_INFO_DEVICE, &type);
    if (type == HSA_DEVICE_TYPE_GPU) (*(int*)data)++;
    return HSA_STATUS_SUCCESS;
}
hsa_init();
hsa_iterate_agents(callback, &gpu_agent_count);
```

  In CPX mode one agent is about one XCC; in SPX mode one agent is about the full device.
- L2: HIP provides only the total `props.l2CacheSize`; per-region size must be inferred. Cross-domain accesses may increase latency.
- Memory channels are not exposed; the page estimates them as `props.memoryBusWidth / 128` (128 bits per channel is an architectural assumption).
- Atomic throughput must be measured empirically. Guidelines: avoid contention on one address, distribute atomics across locations, use hierarchical reductions.
- Multi-XCC profiling: XCCs may execute at different times, and profiling tools often report only the master XCC timing.
- Optimization strategy from the page: partition work across XCCs/XCDs, use NUMA-aware allocation, align data to cache lines, minimize cross-XCC communication, balance traffic across channels.
- Source: https://rocm.docs.amd.com/projects/HIP/en/latest/how-to/hipDeviceProperties.html (rocm-systems `projects/hip/docs`, commit `d2fcac49fed8c335ba363c1a560fd29feb71039a`).

## Related

- [device-management.md](./device-management.md)
- [hardware-implementation.md](./hardware-implementation.md)
- [execution-context.md](./execution-context.md)
- [performance-guidelines.md](./performance-guidelines.md)
