---
source: https://www.electronjs.org/docs/latest/api/structures/process-metric
---

# Process metric structures

ProcessMetric, CPUUsage, MemoryInfo, MemoryUsageDetails, ProcessMemoryInfo and GPUFeatureStatus objects returned by `app.getAppMetrics()`, `process.getCPUUsage()`, and `process.getProcessMemoryInfo()`; GPUFeatureStatus is the GPU feature status structure (see the app GPU/metrics page).

## Signature / Usage

Adapted (not in the official docs): the structure pages have no example; this loop only reads fields documented below.

```js
const { app } = require('electron')

app.whenReady().then(() => {
  const metrics = app.getAppMetrics() // ProcessMetric[]
  for (const m of metrics) {
    console.log(m.pid, m.type, m.cpu.percentCPUUsage, m.memory.workingSetSize)
  }
})
```

## ProcessMetric

| Name | Type | Description |
| --- | --- | --- |
| `pid` | Integer | Process id. |
| `type` | string | `Browser`, `Tab`, `Utility`, `Zygote`, `Sandbox helper`, `GPU`, `Pepper Plugin`, `Pepper Plugin Broker`, `Unknown`. |
| `serviceName` | string (optional) | Non-localized name of the process. |
| `name` | string (optional) | Name of the process; for utility e.g. `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`. |
| `cpu` | CPUUsage | CPU usage; `percentCPUUsage` and `idleWakeupsPerSecond` are averages since the previous call to the API returning this object. |
| `creationTime` | number | Milliseconds since epoch. `pid` can be reused, so use `pid` and `creationTime` together to identify a process. |
| `memory` | MemoryInfo | Memory information. |
| `sandboxed` | boolean (optional) _macOS_ _Windows_ | Whether the process is sandboxed on OS level. |
| `integrityLevel` | string (optional) _Windows_ | `untrusted`, `low`, `medium`, `high`, `unknown`. |

## CPUUsage

| Name | Type | Description |
| --- | --- | --- |
| `percentCPUUsage` | number | Percentage of CPU used since the last call to the API that returned this object. First call returns 0. |
| `cumulativeCPUUsage` | number (optional) | Total seconds of CPU time used since process startup. |
| `idleWakeupsPerSecond` | number | Average idle CPU wakeups per second since the last call. First call returns 0. Always 0 on Windows. |

## MemoryInfo

All statistics in Kilobytes.

| Name | Type | Description |
| --- | --- | --- |
| `workingSetSize` | Integer | Memory currently pinned to physical RAM. |
| `peakWorkingSetSize` | Integer | Maximum memory ever pinned to physical RAM. |
| `privateBytes` | Integer (optional) _Windows_ | Memory not shared by other processes (JS heap, HTML content). |

## ProcessMemoryInfo

| Name | Type | Description |
| --- | --- | --- |
| `residentSet` | Integer _Linux_ _Windows_ | Memory pinned to physical RAM, in Kilobytes. |
| `private` | Integer | Memory not shared by other processes, in Kilobytes. |
| `shared` | Integer | Memory shared between processes (typically Electron code itself), in Kilobytes. |

## MemoryUsageDetails

Fields: `count` number, `size` number, `liveSize` number.

## GPUFeatureStatus

Each of these is a string: `2d_canvas`, `flash_3d`, `flash_stage3d`, `flash_stage3d_baseline`, `gpu_compositing`, `multiple_raster_threads`, `native_gpu_memory_buffers`, `rasterization`, `video_decode`, `video_encode`, `vpx_decode`, `webgl`, `webgl2`.

Possible values: `disabled_software`, `disabled_off`, `disabled_off_ok`, `unavailable_software`, `unavailable_off`, `unavailable_off_ok`, `enabled_readback`, `enabled_force`, `enabled`, `enabled_on`, `enabled_force_on`.

## Notes

- Adapted (not in the official docs): the `app.getAppMetrics()` loop under Signature / Usage is not in the structure pages; it only reads fields documented on this page.
- `percentCPUUsage` and `idleWakeupsPerSecond` are averages, not instant samples; each call starts a fresh measurement interval. `process.getCPUUsage()` (per process) and `app.getAppMetrics()` (separate interval per process ID, all reset by one call) are independent, so the main process can report different values through each API at the same moment.
- If a dependency calls these functions it starts a new interval before you read it; to measure an interval you control use `cumulativeCPUUsage` and subtract readings (reading it still starts a new interval).
- Source files: `docs/api/structures/{process-metric,cpu-usage,memory-info,memory-usage-details,process-memory-info,gpu-feature-status}.md`.

## Related

- process
- [crashReporter](./crash-reporter.md)
